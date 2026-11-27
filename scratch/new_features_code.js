
/* ========================================================
   ESTUDAMAIS - SISTEMA DE JANELAS FLUTUANTES MÓVEIS (MULTITAREFA)
   Lousa, Tutor IA, Bloco de Notas e Foco Pomodoro
   ======================================================== */

// Gerenciador de Janelas Flutuantes Móveis
window.alternarJanelaFlutuante = function(tipo) {
  let id = '';
  if (tipo === 'lousa') id = 'lousa-rascunho';
  else if (tipo === 'ia') id = 'janela-flutuante-ia';
  else if (tipo === 'notas') id = 'janela-flutuante-notas';
  else if (tipo === 'foco') id = 'janela-flutuante-foco';
  else id = tipo;

  const el = document.getElementById(id);
  if (!el) return;

  const estaVisivel = el.style.display !== 'none' && !el.classList.contains('oculto-flutuante') && (el.classList.contains('visivel') || el.style.display === 'flex');

  if (estaVisivel) {
    if (tipo === 'lousa') {
      el.classList.remove('visivel');
    } else {
      el.style.display = 'none';
    }
  } else {
    // Traz para a frente e exibe
    trazerParaFrenteJanela(el);
    if (tipo === 'lousa') {
      el.classList.add('visivel');
      el.classList.remove('minimizado');
      setTimeout(() => {
        if (typeof redimensionarCanvasLousa === 'function') redimensionarCanvasLousa();
      }, 100);
    } else {
      el.style.display = 'flex';
      el.classList.remove('minimizado');
    }

    if (typeof emitirSomChat === 'function') emitirSomChat('pop');
    
    // Centraliza se não tiver posicionado antes
    garantirJanelaVisivelNaTela(el);
  }
};

window.minimizarJanelaFlutuante = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('minimizado');
  }
};

function trazerParaFrenteJanela(el) {
  const janelas = document.querySelectorAll('.janela-flutuante-widget, .lousa-scratchpad');
  let maxZ = 2900;
  janelas.forEach(j => {
    const z = parseInt(window.getComputedStyle(j).zIndex, 10) || 2900;
    if (z > maxZ) maxZ = z;
  });
  el.style.zIndex = (maxZ + 5).toString();
}

function garantirJanelaVisivelNaTela(el) {
  const rect = el.getBoundingClientRect();
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  if (!el.dataset.posicionadaManualmente) {
    // Posiciona em local acessível no canto direito
    let top = Math.max(70, winH - rect.height - 30);
    let left = Math.max(10, winW - rect.width - 30);
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.bottom = 'auto';
    el.style.right = 'auto';
  } else {
    // Garante que não saiu da tela
    let left = Math.min(Math.max(0, rect.left), winW - 60);
    let top = Math.min(Math.max(0, rect.top), winH - 45);
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }
}

// Torna qualquer elemento arrastável suavemente pela barra de título
window.tornarElementoArrastavel = function(el, handle) {
  if (!el || !handle) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;

  handle.addEventListener('pointerdown', (e) => {
    // Ignora se clicou em botões de controle
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;

    isDragging = true;
    trazerParaFrenteJanela(el);
    el.dataset.posicionadaManualmente = 'true';

    const rect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = rect.left;
    initialTop = rect.top;

    el.style.left = `${initialLeft}px`;
    el.style.top = `${initialTop}px`;
    el.style.bottom = 'auto';
    el.style.right = 'auto';

    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  handle.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;

    // Limites da tela
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const w = el.offsetWidth || 360;

    newLeft = Math.max(10, Math.min(winW - w - 10, newLeft));
    newTop = Math.max(65, Math.min(winH - 60, newTop));

    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
  });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try { handle.releasePointerCapture(e.pointerId); } catch(err) {}
    }
  };

  handle.addEventListener('pointerup', stopDrag);
  handle.addEventListener('pointercancel', stopDrag);
};

// Inicializa o arraste em todas as 4 janelas flutuantes
function inicializarJanelasArrastaveis() {
  const lousa = document.getElementById('lousa-rascunho');
  const lousaHandle = document.getElementById('header-lousa-rascunho') || document.querySelector('.lousa-header');
  if (lousa && lousaHandle) tornarElementoArrastavel(lousa, lousaHandle);

  const ia = document.getElementById('janela-flutuante-ia');
  const iaHandle = document.getElementById('header-flutuante-ia');
  if (ia && iaHandle) tornarElementoArrastavel(ia, iaHandle);

  const notas = document.getElementById('janela-flutuante-notas');
  const notasHandle = document.getElementById('header-flutuante-notas');
  if (notas && notasHandle) tornarElementoArrastavel(notas, notasHandle);

  const foco = document.getElementById('janela-flutuante-foco');
  const focoHandle = document.getElementById('header-flutuante-foco');
  if (foco && focoHandle) tornarElementoArrastavel(foco, focoHandle);
}

// ----------------------------------------------------
// MINI CHAT FLUTUANTE
// ----------------------------------------------------
window.enviarMensagemMiniChat = async function(textoPredefinido = null) {
  const input = document.getElementById('input-mini-chat-flutuante');
  const feed = document.getElementById('mini-chat-mensagens');
  const texto = (textoPredefinido || (input ? input.value : '')).trim();
  if (!texto || !feed) return;

  if (input) input.value = '';

  // Mensagem do usuário
  const msgUser = document.createElement('div');
  msgUser.className = 'mini-chat-msg user';
  msgUser.innerHTML = `
    <div class="mini-chat-avatar"><i class="fa-solid fa-user-graduate"></i></div>
    <div class="mini-chat-balao">${texto}</div>
  `;
  feed.appendChild(msgUser);
  feed.scrollTop = feed.scrollHeight;
  if (typeof emitirSomChat === 'function') emitirSomChat('enviar');

  // Mensagem de digitação
  const msgIA = document.createElement('div');
  msgIA.className = 'mini-chat-msg ia';
  msgIA.innerHTML = `
    <div class="mini-chat-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="mini-chat-balao"><i class="fa-solid fa-spinner fa-spin"></i> Pensando...</div>
  `;
  feed.appendChild(msgIA);
  feed.scrollTop = feed.scrollHeight;

  // Chama Gemini ou gerador didático
  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  let resposta = '';

  if (apiKey && typeof chamarGeminiAPI === 'function') {
    try {
      const contexto = `Você é o Tutor de Estudos do vestibulando no app EstudaMais. Responda em no máximo 3 ou 4 frases curtas, diretas, motivadoras e didáticas em pt-BR. Dúvida: ${texto}`;
      resposta = await chamarGeminiAPI(contexto);
    } catch(err) {
      resposta = `💡 Dica de Foco: Para dominar esse ponto, revise a fórmula ou conceito principal e resolva 3 exercícios de fixação!`;
    }
  } else {
    resposta = `💡 Dica Rápida do Tutor: ${texto.toLowerCase().includes('quest') ? 'Aqui vai uma questão-chave: analise sempre a causa fundamental antes de olhar as alternativas!' : 'Excelente pergunta! Divida o assunto em partes menores, resuma no seu bloco de notas e pratique a repetição espaçada.'}`;
  }

  const balaoIA = msgIA.querySelector('.mini-chat-balao');
  if (balaoIA) {
    balaoIA.textContent = resposta;
  }
  feed.scrollTop = feed.scrollHeight;
  if (typeof emitirSomChat === 'function') emitirSomChat('receber');
};

// ----------------------------------------------------
// MINI NOTAS FLUTUANTE
// ----------------------------------------------------
window.salvarMiniNotaFlutuante = function() {
  const inputTitulo = document.getElementById('input-mini-nota-titulo');
  const selectMateria = document.getElementById('select-mini-nota-materia');
  const textarea = document.getElementById('textarea-mini-nota-conteudo');

  const titulo = inputTitulo ? inputTitulo.value.trim() : '';
  const materia = selectMateria ? selectMateria.value : 'Geral';
  const conteudo = textarea ? textarea.value.trim() : '';

  if (!conteudo && !titulo) {
    if (window.mostrarToast) window.mostrarToast('Escreva algo para salvar a anotação.', 'aviso');
    return;
  }

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: titulo || `Anotação de ${materia}`,
    conteudo: conteudo || '(Sem conteúdo detalhado)',
    materia: materia,
    cor: '#3b82f6',
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    fixada: false
  };

  if (!Array.isArray(AppState.notes)) AppState.notes = [];
  AppState.notes.unshift(novaNota);

  // Salva no storage do usuário
  if (AppState.currentUser) {
    localStorage.setItem(`estudamais_user_${AppState.currentUser.id}_notes`, JSON.stringify(AppState.notes));
  } else {
    localStorage.setItem('estudamais_guest_notes', JSON.stringify(AppState.notes));
  }

  if (typeof renderizarNotas === 'function') renderizarNotas();
  if (inputTitulo) inputTitulo.value = '';
  if (textarea) textarea.value = '';

  if (window.mostrarToast) {
    window.mostrarToast('📝 Nota salva com sucesso no seu caderno!', 'sucesso');
  }
};

// ----------------------------------------------------
// MINI TIMER DE FOCO
// ----------------------------------------------------
window.ajustarTempoMiniFoco = function(minutos, modo) {
  if (window.setPomodoroMode) {
    if (minutos === 25) window.setPomodoroMode('foco');
    else if (minutos === 50) window.setPomodoroMode('estendido');
    else if (minutos === 5) window.setPomodoroMode('curta');
    else if (minutos === 15) window.setPomodoroMode('longa');
  } else {
    AppState.pomodoro.timeLeft = minutos * 60;
  }

  const display = document.getElementById('mini-foco-timer-display');
  const badge = document.getElementById('mini-foco-mode-badge');
  if (display) display.textContent = `${minutos.toString().padStart(2, '0')}:00`;
  if (badge) badge.textContent = modo === 'pausa' ? 'Pausa' : 'Foco Ativo';

  document.querySelectorAll('.mini-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(`${minutos}m`));
  });
};

window.alternarTimerMiniFoco = function() {
  const btnPrincipal = document.getElementById('pomodoro-btn-start');
  if (btnPrincipal) {
    btnPrincipal.click();
    sincronizarMiniTimerUI();
  }
};

window.resetTimerMiniFoco = function() {
  const btnReset = document.getElementById('pomodoro-btn-reset');
  if (btnReset) {
    btnReset.click();
    sincronizarMiniTimerUI();
  }
};

function sincronizarMiniTimerUI() {
  const miniDisplay = document.getElementById('mini-foco-timer-display');
  const miniBtn = document.getElementById('btn-mini-foco-start');
  const isRunning = AppState.pomodoro?.isRunning;
  const timeLeft = AppState.pomodoro?.timeLeft || 1500;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  if (miniDisplay) {
    miniDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  if (miniBtn) {
    if (isRunning) {
      miniBtn.classList.add('pausado');
      miniBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    } else {
      miniBtn.classList.remove('pausado');
      miniBtn.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar';
    }
  }
}

// Sincroniza periodicamente o timer flutuante com o timer principal
setInterval(() => {
  if (AppState.pomodoro?.isRunning) {
    sincronizarMiniTimerUI();
  }
}, 500);

// ========================================================
// MOTOR AVANÇADO DE SONS AMBIENTES (WEB AUDIO API SINTETIZADA)
// Ruído Marrom, Chuva Suave, Tempestade, Ondas Alfa, Lo-Fi e Ruído Branco
// ========================================================

AppState.soundEngine = {
  ctx: null,
  currentType: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  masterGain: null,
  activeNodes: [],
  intervalLoop: null
};

window.selecionarSomAmbiente = function(tipo) {
  // Se já estiver tocando o mesmo tipo, para
  if (AppState.soundEngine.isPlaying && AppState.soundEngine.currentType === tipo) {
    pararTodosSonsAmbientes();
    return;
  }

  pararTodosSonsAmbientes();

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      alert('Seu navegador não suporta Web Audio API.');
      return;
    }

    if (!AppState.soundEngine.ctx || AppState.soundEngine.ctx.state === 'closed') {
      AppState.soundEngine.ctx = new AudioCtx();
    }
    const ctx = AppState.soundEngine.ctx;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    const vol = AppState.soundEngine.isMuted ? 0 : AppState.soundEngine.volume;
    masterGain.gain.setValueAtTime(vol * 0.35, ctx.currentTime);
    masterGain.connect(ctx.destination);
    AppState.soundEngine.masterGain = masterGain;

    if (tipo === 'brown') {
      gerarRuidoMarrom(ctx, masterGain);
    } else if (tipo === 'rain') {
      gerarChuvaSuave(ctx, masterGain);
    } else if (tipo === 'thunder') {
      gerarTempestade(ctx, masterGain);
    } else if (tipo === 'alpha') {
      gerarOndasAlfa(ctx, masterGain);
    } else if (tipo === 'lofi') {
      gerarLoFiChords(ctx, masterGain);
    } else if (tipo === 'white') {
      gerarRuidoBranco(ctx, masterGain);
    }

    AppState.soundEngine.currentType = tipo;
    AppState.soundEngine.isPlaying = true;
    atualizarBotoesSonsUI(tipo);

    if (window.mostrarToast) {
      const nomes = {
        brown: '🌊 Ruído Marrom Profundo',
        rain: '🌧️ Barulho de Chuva Suave',
        thunder: '⛈️ Tempestade com Trovões Distantes',
        alpha: '🧠 Ondas Alfa (10Hz Binaural)',
        lofi: '🎵 Acordes Lo-Fi de Relaxamento',
        white: '⚪ Ruído Branco para Foco'
      };
      window.mostrarToast(`Som ativo: ${nomes[tipo] || tipo}. Ajuste o volume quando quiser!`, 'info');
    }
  } catch(e) {
    console.error('Erro ao iniciar som ambiente:', e);
  }
};

function gerarRuidoMarrom(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.8; // Ganho calibrado
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, ctx.currentTime);

  noise.connect(filter);
  filter.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, filter);
}

function gerarChuvaSuave(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555;
    b1 = 0.99332 * b1 + white * 0.0750;
    b2 = 0.96900 * b2 + white * 0.1538;
    data[i] = (b0 + b1 + b2) * 0.06;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(1100, ctx.currentTime);
  bandpass.Q.setValueAtTime(0.5, ctx.currentTime);

  noise.connect(bandpass);
  bandpass.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, bandpass);
}

function gerarTempestade(ctx, destination) {
  gerarChuvaSuave(ctx, destination);

  // Trovoada distante periódica
  const dispararTrovao = () => {
    if (!AppState.soundEngine.isPlaying || AppState.soundEngine.currentType !== 'thunder') return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 3.5);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.6);
    } catch(e) {}
  };

  dispararTrovao();
  AppState.soundEngine.intervalLoop = setInterval(dispararTrovao, 14000);
}

function gerarOndasAlfa(ctx, destination) {
  // Tom Binaural de 10Hz (216Hz e 226Hz) para sincronização de ondas alfa
  const oscL = ctx.createOscillator();
  const oscR = ctx.createOscillator();
  const merger = ctx.createChannelMerger(2);

  oscL.type = 'sine';
  oscL.frequency.setValueAtTime(216, ctx.currentTime);

  oscR.type = 'sine';
  oscR.frequency.setValueAtTime(226, ctx.currentTime);

  oscL.connect(merger, 0, 0);
  oscR.connect(merger, 0, 1);
  merger.connect(destination);

  oscL.start();
  oscR.start();
  AppState.soundEngine.activeNodes.push(oscL, oscR, merger);
}

function gerarLoFiChords(ctx, destination) {
  // Acordes suaves progressivos em escala pentatônica / ambiente (Cmaj7 -> Am9 -> Fmaj7)
  const acordes = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // G6
  ];
  let idx = 0;

  const tocarAcorde = () => {
    if (!AppState.soundEngine.isPlaying || AppState.soundEngine.currentType !== 'lofi') return;
    try {
      const notas = acordes[idx % acordes.length];
      idx++;
      notas.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.8);

        osc.connect(gain);
        gain.connect(destination);
        osc.start();
        osc.stop(ctx.currentTime + 5.0);
      });
    } catch(e) {}
  };

  tocarAcorde();
  AppState.soundEngine.intervalLoop = setInterval(tocarAcorde, 4200);
}

function gerarRuidoBranco(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.15;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3200, ctx.currentTime);

  noise.connect(filter);
  filter.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, filter);
}

window.pararTodosSonsAmbientes = function() {
  if (AppState.soundEngine.intervalLoop) {
    clearInterval(AppState.soundEngine.intervalLoop);
    AppState.soundEngine.intervalLoop = null;
  }

  AppState.soundEngine.activeNodes.forEach(node => {
    try {
      if (node.stop) node.stop();
      node.disconnect();
    } catch(e) {}
  });
  AppState.soundEngine.activeNodes = [];

  if (AppState.soundEngine.masterGain) {
    try { AppState.soundEngine.masterGain.disconnect(); } catch(e) {}
    AppState.soundEngine.masterGain = null;
  }

  AppState.soundEngine.isPlaying = false;
  AppState.soundEngine.currentType = null;
  atualizarBotoesSonsUI(null);
};

window.ajustarVolumeSomAmbiente = function(valPercent) {
  const pct = parseInt(valPercent, 10) || 0;
  const volDecimal = pct / 100;
  AppState.soundEngine.volume = volDecimal;
  AppState.soundEngine.isMuted = false;

  if (AppState.soundEngine.masterGain && AppState.soundEngine.ctx) {
    AppState.soundEngine.masterGain.gain.setValueAtTime(volDecimal * 0.35, AppState.soundEngine.ctx.currentTime);
  }

  // Atualiza sliders e textos
  const s1 = document.getElementById('foco-slider-volume');
  const s2 = document.getElementById('foco-slider-volume-tab');
  const t1 = document.getElementById('foco-volume-percent');
  const t2 = document.getElementById('foco-volume-percent-tab');
  const ic1 = document.getElementById('icone-foco-volume');
  const ic2 = document.getElementById('icone-foco-volume-tab');

  if (s1) s1.value = pct;
  if (s2) s2.value = pct;
  if (t1) t1.textContent = `${pct}%`;
  if (t2) t2.textContent = `${pct}%`;

  const iconClass = pct === 0 ? 'fa-volume-xmark' : (pct < 50 ? 'fa-volume-low' : 'fa-volume-high');
  if (ic1) ic1.className = `fa-solid ${iconClass}`;
  if (ic2) ic2.className = `fa-solid ${iconClass}`;
};

window.alternarMudoSomAmbiente = function() {
  AppState.soundEngine.isMuted = !AppState.soundEngine.isMuted;
  const vol = AppState.soundEngine.isMuted ? 0 : AppState.soundEngine.volume;

  if (AppState.soundEngine.masterGain && AppState.soundEngine.ctx) {
    AppState.soundEngine.masterGain.gain.setValueAtTime(vol * 0.35, AppState.soundEngine.ctx.currentTime);
  }

  const ic1 = document.getElementById('icone-foco-volume');
  const ic2 = document.getElementById('icone-foco-volume-tab');
  const iconClass = AppState.soundEngine.isMuted ? 'fa-volume-xmark' : 'fa-volume-high';
  if (ic1) ic1.className = `fa-solid ${iconClass}`;
  if (ic2) ic2.className = `fa-solid ${iconClass}`;
};

function atualizarBotoesSonsUI(tipoAtivo) {
  document.querySelectorAll('.btn-som-chip').forEach(btn => {
    const som = btn.getAttribute('data-som');
    btn.classList.toggle('ativo', som === tipoAtivo);
  });
}

// ========================================================
// CATÁLOGO DE TEMAS DE REDAÇÃO & CRIADOR DE PROPOSTAS COM GEMINI
// ========================================================

window.abrirCatalogoTemasRedacao = function() {
  const modal = document.getElementById('modal-catalogo-temas');
  if (!modal) return;

  renderizarGridCatalogoTemas('todos', '');
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharCatalogoTemasRedacao = function() {
  const modal = document.getElementById('modal-catalogo-temas');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.filtrarCatalogoPorVestibular = function(vest) {
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-vest') === vest);
  });
  const inputBusca = document.getElementById('input-busca-temas');
  renderizarGridCatalogoTemas(vest, inputBusca ? inputBusca.value : '');
};

window.filtrarCatalogoTemas = function(termo) {
  const btnAtivo = document.querySelector('.cat-pill-btn.active');
  const vest = btnAtivo ? btnAtivo.getAttribute('data-vest') : 'todos';
  renderizarGridCatalogoTemas(vest, termo);
};

function obterTodosTemasRedacao() {
  let lista = Array.isArray(TEMAS_REDACAO_DATA) ? [...TEMAS_REDACAO_DATA] : [];
  try {
    const custom = JSON.parse(localStorage.getItem('estudamais_custom_temas') || '[]');
    if (Array.isArray(custom)) {
      lista = [...custom, ...lista];
    }
  } catch(e) {}
  return lista;
}

function renderizarGridCatalogoTemas(filtroVest, buscaTexto) {
  const grid = document.getElementById('catalogo-temas-grid');
  if (!grid) return;

  const todos = obterTodosTemasRedacao();
  const termo = (buscaTexto || '').trim().toLowerCase();
  const vestFiltro = (filtroVest || 'todos').toUpperCase();
  const temaAtualId = AppState.redacao?.temaAtualId;

  const filtrados = todos.filter(t => {
    const vestMatch = (vestFiltro === 'TODOS') || 
                      (vestFiltro === 'CUSTOM' && t.isCustom) || 
                      (t.vestibular && t.vestibular.toUpperCase() === vestFiltro);
    const textMatch = !termo || 
                      (t.titulo && t.titulo.toLowerCase().includes(termo)) || 
                      (t.vestibular && t.vestibular.toLowerCase().includes(termo)) || 
                      (t.genero && t.genero.toLowerCase().includes(termo));
    return vestMatch && textMatch;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.8rem; display: block; opacity: 0.6;"></i>
        <p>Nenhuma proposta encontrada com estes filtros.</p>
        <button type="button" class="btn-novo-tema-ia-topo" style="margin-top: 0.8rem;" onclick="fecharCatalogoTemasRedacao(); abrirModalCriarTemaRedacao();">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Criar Este Tema com IA
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtrados.map(t => {
    const isSel = t.id === temaAtualId;
    let classeVest = (t.vestibular || 'enem').toLowerCase();
    if (t.isCustom) classeVest = 'custom';

    return `
      <div class="tema-catalogo-item-card ${isSel ? 'selecionado' : ''}" onclick="selecionarTemaPorId('${t.id}')">
        <div class="tema-item-badges-row">
          <span class="tema-item-vest-pill ${classeVest}">${t.vestibular || 'ENEM'}</span>
          <span class="tema-item-genero-pill">${t.genero ? t.genero.split('(')[0].trim() : 'Dissertativo'}</span>
        </div>
        <h4 class="tema-item-titulo">${t.titulo}</h4>
        <button type="button" class="btn-selecionar-tema-card">
          <i class="fa-solid ${isSel ? 'fa-check' : 'fa-pen-nib'}"></i> 
          <span>${isSel ? 'Tema Selecionado' : 'Praticar Esta Redação'}</span>
        </button>
      </div>
    `;
  }).join('');
}

window.selecionarTemaPorId = function(idTema) {
  if (typeof carregarTemaRedacao === 'function') {
    carregarTemaRedacao(idTema);
  }
  
  const tema = obterTodosTemasRedacao().find(t => t.id === idTema);
  const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
  if (textoDestaque && tema) {
    textoDestaque.textContent = `[${tema.vestibular}] ${tema.titulo}`;
  }

  fecharCatalogoTemasRedacao();
  if (window.mostrarToast && tema) {
    window.mostrarToast(`✨ Tema selecionado: ${tema.titulo}`, 'sucesso');
  }
};

// ----------------------------------------------------
// CRIADOR DE PROPOSTAS COM GOOGLE GEMINI
// ----------------------------------------------------
window.abrirModalCriarTemaRedacao = function() {
  const modal = document.getElementById('modal-criar-tema-redacao');
  if (!modal) return;
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalCriarTemaRedacao = function() {
  const modal = document.getElementById('modal-criar-tema-redacao');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

const SUGESTOES_TEMAS_HOT = [
  "O impacto da proliferação das apostas esportivas e bets no endividamento das famílias",
  "A crise de saúde mental entre os jovens e o uso desregulado de ansiolíticos",
  "Desafios para a universalização do saneamento básico e o direito à dignidade humana",
  "A inclusão de pessoas neurodivergentes e o combate ao capacitismo na educação",
  "A uberização do trabalho e as novas formas de alienação na era dos algoritmos",
  "O papel dos povos originários e das terras indígenas na mitigação das mudanças climáticas",
  "Cibersegurança e o vazamento de dados sensíveis na era da inteligência artificial",
  "O envelhecimento populacional acelerado e a crise dos cuidados com a pessoa idosa",
  "A regulamentação das redes sociais no combate às notícias falsas e à desinformação",
  "A persistência do trabalho análogo à escravidão no agronegócio e na cadeia têxtil"
];

window.sugerirTemaIneditoRapido = function() {
  const sorteado = SUGESTOES_TEMAS_HOT[Math.floor(Math.random() * SUGESTOES_TEMAS_HOT.length)];
  const input = document.getElementById('input-tema-custom-titulo');
  if (input) {
    input.value = sorteado;
    input.focus();
  }
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
};

let temaGeradoEmEspera = null;

window.gerarTemaComGemini = async function() {
  const input = document.getElementById('input-tema-custom-titulo');
  const selectVest = document.getElementById('select-tema-custom-vest');
  const btn = document.getElementById('btn-gerar-tema-executar');
  const preview = document.getElementById('preview-tema-gerado');

  const tituloIdeia = (input ? input.value : '').trim();
  const vestibular = selectVest ? selectVest.value : 'ENEM';

  if (!tituloIdeia) {
    alert('Por favor, digite uma ideia ou clique em "Sugerir Tema" para sortear uma proposta.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Desenvolvendo Textos Motivadores com Gemini...';
  }

  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  let temaObj = null;

  if (apiKey && typeof chamarGeminiAPI === 'function') {
    try {
      const prompt = `Você é a banca examinadora do vestibular ${vestibular}. Desenvolva uma proposta oficial de redação completa sobre: "${tituloIdeia}".
Retorne OBRIGATORIAMENTE um JSON válido com o seguinte formato:
{
  "titulo": "Título oficial formal e provocativo",
  "genero": "Gênero textual adequado para o ${vestibular}",
  "instrucoes": "Instruções formais para o vestibulando",
  "textosMotivadores": [
    {"origem": "Texto I - Dados Estatísticos / Pesquisa", "conteudo": "Contextualização quantitativa ou histórica com fontes fidedignas"},
    {"origem": "Texto II - Pensamento Sociológico ou Filosófico", "conteudo": "Citação e reflexão crítica aplicável"},
    {"origem": "Texto III - Perspectiva Contemporânea", "conteudo": "Visão analítica dos desafios no Brasil atual"}
  ]
}`;
      const resRaw = await chamarGeminiAPI(prompt);
      const jsonMatch = resRaw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        temaObj = JSON.parse(jsonMatch[0]);
      }
    } catch(err) {
      console.warn('Falha no Gemini, usando motor pedagógico estruturado:', err);
    }
  }

  // Fallback ou motor didático autônomo
  if (!temaObj) {
    temaObj = {
      titulo: tituloIdeia.length > 15 ? tituloIdeia : `Desafios contemporâneos em torno de: ${tituloIdeia}`,
      genero: vestibular === 'ENEM' ? 'Texto Dissertativo-Argumentativo (Padrão ENEM)' : `Dissertação Crítica (${vestibular})`,
      instrucoes: `Com base na leitura da coletânea e em seus conhecimentos, redija um texto dissertativo formal articulando projeto de texto claro e argumentos consistentes sobre o tema.`,
      textosMotivadores: [
        {
          origem: "Texto I - Indicadores e Diagnóstico Social",
          conteudo: `O debate acerca de "${tituloIdeia}" reflete transformações estruturais da sociedade brasileira, demandando articulação entre marcos regulatórios, investimentos prioritários e fiscalização efetiva.`
        },
        {
          origem: "Texto II - Direitos e Cidadania",
          conteudo: `A garantia de dignidade, acesso e equidade constitui pilar inegociável da Carta Constitucional de 1988, reforçando que o desenvolvimento econômico deve caminhar junto da justiça social.`
        },
        {
          origem: "Texto III - Perspectiva Crítica e Propositiva",
          conteudo: `Superar os impasses exige superar a inércia institucional e promover o engajamento comunitário, transformando a conscientização em ações práticas e sustentáveis.`
        }
      ]
    };
  }

  temaObj.id = 'custom_' + Date.now();
  temaObj.vestibular = vestibular;
  temaObj.linhasMin = 7;
  temaObj.linhasMax = 30;
  temaObj.notaMaxima = vestibular === 'ENEM' ? 1000 : 50;
  temaObj.isCustom = true;
  temaObj.criterios = [
    { nome: "C1 - Norma Culta", desc: "Domínio formal da Língua Portuguesa", peso: 200 },
    { nome: "C2 - Tema e Repertório", desc: "Repertório sociocultural produtivo", peso: 200 },
    { nome: "C3 - Projeto de Texto", desc: "Defesa articulada de ponto de vista", peso: 200 },
    { nome: "C4 - Mecanismos Linguísticos", desc: "Coesão inter e intraparágrafos", peso: 200 },
    { nome: "C5 - Proposta de Intervenção", desc: "Elaboração com os 5 elementos", peso: 200 }
  ];

  temaGeradoEmEspera = temaObj;

  // Renderiza Preview
  if (preview) {
    preview.style.display = 'flex';
    document.getElementById('preview-tema-badge').textContent = vestibular;
    document.getElementById('preview-tema-titulo').textContent = temaObj.titulo;
    document.getElementById('preview-tema-instrucoes').textContent = temaObj.instrucoes;

    const boxMotivadores = document.getElementById('preview-textos-motivadores');
    if (boxMotivadores && temaObj.textosMotivadores) {
      boxMotivadores.innerHTML = temaObj.textosMotivadores.map(tm => `
        <div class="preview-texto-card">
          <strong>${tm.origem}</strong>
          <p>${tm.conteudo}</p>
        </div>
      `).join('');
    }
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Gerar Outra Versão';
  }

  if (typeof emitirSomChat === 'function') emitirSomChat('receber');
  if (window.mostrarToast) {
    window.mostrarToast('✨ Proposta desenvolvida com sucesso! Confira abaixo.', 'sucesso');
  }
};

window.aplicarTemaGeradoAoTreino = function() {
  if (!temaGeradoEmEspera) return;

  // Salva no storage de temas personalizados
  try {
    let custom = JSON.parse(localStorage.getItem('estudamais_custom_temas') || '[]');
    custom.unshift(temaGeradoEmEspera);
    localStorage.setItem('estudamais_custom_temas', JSON.stringify(custom));
  } catch(e) {}

  // Adiciona em memória aos temas
  if (Array.isArray(TEMAS_REDACAO_DATA)) {
    TEMAS_REDACAO_DATA.unshift(temaGeradoEmEspera);
  }

  // Carrega na folha de redação
  if (typeof carregarTemaRedacao === 'function') {
    carregarTemaRedacao(temaGeradoEmEspera.id);
  }

  const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
  if (textoDestaque) {
    textoDestaque.textContent = `[${temaGeradoEmEspera.vestibular}] ${temaGeradoEmEspera.titulo}`;
  }

  fecharModalCriarTemaRedacao();
  if (typeof mudarAba === 'function') mudarAba('redacao');

  const workspace = document.querySelector('.redacao-workspace-card');
  if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.mostrarToast) {
    window.mostrarToast('🚀 Proposta ativada! Boa redação!', 'sucesso');
  }
};

// Sincroniza o label de tema atual ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    inicializarJanelasArrastaveis();
    const temaId = AppState.redacao?.temaAtualId;
    if (temaId) {
      const tema = obterTodosTemasRedacao().find(t => t.id === temaId);
      const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
      if (textoDestaque && tema) {
        textoDestaque.textContent = `[${tema.vestibular}] ${tema.titulo}`;
      }
    }
  }, 400);
});
