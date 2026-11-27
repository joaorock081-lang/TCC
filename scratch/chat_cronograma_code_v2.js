/* ========================================================
   ESTUDAMAIS - CHAT IA COM GOOGLE GEMINI & GERADOR DE CRONOGRAMAS (V2 ENHANCED)
   Gamificação, Modos de Personalidade, Áudio TTS, Timer Integrado & Impressão
   ======================================================== */

// Estado do Chat IA e Cronograma Gamificado
AppState.chatIA = {
  mensagens: [],
  carregando: false,
  modo: 'tutor', // 'tutor', 'desafio', 'zen', 'cronograma'
  somAtivo: true,
  vozAtiva: false
};

AppState.cronograma = {
  diasEstudoPorSemana: 5,
  horasPorDia: 4,
  turnoPreferido: 'tarde',
  xp: 0,
  streakDias: 1,
  planoSemanal: null
};

// Sintetizador de Som Leve via Web Audio API (sem arquivos externos)
function emitirSomChat(tipo = 'pop') {
  if (!AppState.chatIA.somAtivo) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (tipo === 'pop') {
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (tipo === 'sucesso') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {}
}

// Inicializar Chat IA e Cronograma
function inicializarChatIACronograma() {
  carregarHistoricoChatIA();
  carregarCronogramaSalvo();
  renderizarMensagensChatIA();
  renderizarCronogramaUI();
  configurarEventosChatIA();
}

// Carregar Histórico do Chat
function carregarHistoricoChatIA() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    const salvas = localStorage.getItem(`estudamais_chat_ia_${userId}`);
    if (salvas) {
      AppState.chatIA.mensagens = JSON.parse(salvas);
    } else {
      const user = AppState.currentUser;
      const nome = user ? user.nome.split(' ')[0] : 'Estudante';
      const vest = user && user.vestibular ? user.vestibular : 'vestibulares';
      const curso = user && user.curso ? ` para ${user.curso}` : '';

      AppState.chatIA.mensagens = [
        {
          id: 'msg-intro-1',
          remetente: 'ia',
          texto: `Olá, **${nome}**! Sou o seu **Tutor de Inteligência Artificial do EstudaMais** 🎓✨\n\nEstou conectado ao **Google Gemini** para te apoiar em cada detalhe rumo à aprovação no **${vest}**${curso}.\n\nVocê pode escolher meu modo de apoio logo acima ou me pedir:\n- 📚 Explicar matérias e teorias complexas\n- ⚡ **Desafio / Quiz:** Posso testar seus conhecimentos com perguntas da banca!\n- 🧘 **Mentor Zen:** Dicas de foco, pausas e controle de ansiedade pré-prova\n- 📅 **Criar seu Cronograma Semanal:** Distribuo seus horários de acordo com seu tempo livre!\n\nComo começamos nossos estudos hoje?`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ];
    }
  } catch (e) {
    console.error('Erro ao carregar chat da IA:', e);
  }
}

// Salvar Histórico do Chat
function salvarHistoricoChatIA() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    localStorage.setItem(`estudamais_chat_ia_${userId}`, JSON.stringify(AppState.chatIA.mensagens.slice(-50)));
  } catch (e) {}
}

// Alternar Modo de Personalidade da IA
window.alternarModoChatIA = function(modo) {
  AppState.chatIA.modo = modo;
  document.querySelectorAll('.chat-ia-modo-pill').forEach(btn => {
    if (btn.dataset.modo === modo) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dicasModos = {
    tutor: '🎯 Modo Tutor Ativo: Foco em explicação didática, resolução de dúvidas e matérias que mais caem.',
    desafio: '⚡ Modo Desafio Ativo: Vou te fazer uma pergunta surpresa para testar sua retenção! Pronto(a)?',
    zen: '🧘 Modo Zen Ativo: Foco em gerenciamento do tempo, alívio de ansiedade e saúde mental nos estudos.',
    cronograma: '📅 Modo Cronograma Ativo: Diga quantas horas tem livres e eu monto seu plano semanal!'
  };

  if (window.mostrarToast) {
    window.mostrarToast(dicasModos[modo] || 'Modo atualizado!');
  }

  if (modo === 'desafio') {
    perguntarRapidoChatIA('Me faça um desafio rápido: 1 questão teste da banca examinadora sobre um tema muito cotado!');
  } else if (modo === 'zen') {
    perguntarRapidoChatIA('Estou um pouco ansioso(a) com a rotina de estudos. Que técnica prática posso usar hoje para manter a calma e o foco?');
  }
};

// Renderizar Mensagens do Chat
function renderizarMensagensChatIA() {
  const container = document.getElementById('chat-ia-mensagens-container');
  if (!container) return;

  if (AppState.chatIA.mensagens.length === 0) {
    container.innerHTML = `
      <div class="chat-ia-vazio">
        <div class="chat-ia-vazio-icon"><i class="fa-solid fa-sparkles"></i></div>
        <h3>Tire qualquer dúvida com a IA</h3>
        <p>Faça uma pergunta, peça a explicação de um tema ou solicite um cronograma personalizado!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.chatIA.mensagens.map(msg => {
    const isUser = msg.remetente === 'usuario';
    const parsedText = formatarMarkdownChat(msg.texto);
    const avatar = isUser ? (AppState.currentUser?.avatar || 'fa-user-graduate') : 'fa-brain-circuit';

    return `
      <div class="chat-ia-msg-wrapper ${isUser ? 'msg-usuario' : 'msg-ia'} anim-fade-in" id="${msg.id}">
        <div class="chat-ia-msg-avatar">
          <i class="fa-solid ${avatar}"></i>
        </div>
        <div class="chat-ia-msg-balao">
          <div class="chat-ia-msg-autor">
            <strong>${isUser ? (AppState.currentUser?.nome?.split(' ')[0] || 'Você') : 'Tutor EstudaMais (Gemini AI)'}</strong>
            <span class="chat-ia-msg-hora">${msg.timestamp || ''}</span>
          </div>
          <div class="chat-ia-msg-conteudo" id="conteudo-${msg.id}">
            ${parsedText}
          </div>

          <!-- Ações Rápidas da Mensagem -->
          <div class="chat-ia-msg-ferramentas">
            <button class="btn-chat-tool" onclick="copiarTextoMensagemIA('${msg.id}')" title="Copiar resposta">
              <i class="fa-regular fa-copy"></i> <span>Copiar</span>
            </button>
            ${!isUser ? `
              <button class="btn-chat-tool" onclick="falarMensagemIA('${msg.id}')" title="Ouvir explicação">
                <i class="fa-solid fa-volume-high"></i> <span>Ouvir</span>
              </button>
              <button class="btn-chat-tool" onclick="perguntarRapidoChatIA('Me explique de forma ainda mais simples, como se eu tivesse 10 anos.')" title="Explicar mais simples">
                <i class="fa-solid fa-lightbulb"></i> <span>Simplificar</span>
              </button>
            ` : ''}
          </div>

          ${!isUser && msg.acaoCronograma ? `
            <div class="chat-ia-msg-acoes-cronograma">
              <button class="btn-chat-aplicar-cronograma" onclick="aplicarCronogramaSugeridoPelaIA('${msg.id}')">
                <i class="fa-solid fa-calendar-check"></i> Aplicar Este Cronograma na Aba Cronogramas
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

// Copiar Texto da Mensagem
window.copiarTextoMensagemIA = function(msgId) {
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (msg && msg.texto) {
    navigator.clipboard.writeText(msg.texto).then(() => {
      if (window.mostrarToast) window.mostrarToast('📋 Texto copiado para a área de transferência!');
    }).catch(() => {
      if (window.mostrarToast) window.mostrarToast('Texto copiado!', 'info');
    });
  }
};

// Voz / Leitura em Áudio da Resposta (Text-to-Speech nativo)
window.falarMensagemIA = function(msgId) {
  if (!('speechSynthesis' in window)) {
    if (window.mostrarToast) window.mostrarToast('Leitura de voz não suportada neste navegador.', 'aviso');
    return;
  }

  window.speechSynthesis.cancel();
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (!msg || !msg.texto) return;

  const limpo = msg.texto.replace(/[*#`_\[\]]/g, '');
  const utter = new SpeechSynthesisUtterance(limpo);
  utter.lang = 'pt-BR';
  utter.rate = 1.05;

  if (window.mostrarToast) window.mostrarToast('🔊 Reproduzindo explicação em áudio...');
  window.speechSynthesis.speak(utter);
};

// Formatador simples e seguro de Markdown para o Chat
function formatarMarkdownChat(texto) {
  if (!texto) return '';
  let html = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bloco de código
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$2</code></pre>');
  // Código inline
  html = html.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');
  // Negrito
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Itálico
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Tópicos com bullet point
  html = html.replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]+?<\/li>)/g, '<ul class="chat-lista-resumo">$1</ul>');
  // Quebras de linha
  html = html.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

  return html;
}

// Configurar Eventos e Envio do Chat IA
function configurarEventosChatIA() {
  const form = document.getElementById('chat-ia-form');
  const input = document.getElementById('chat-ia-input');
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      enviarMensagemChatIA();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensagemChatIA();
      }
    });
  }
}

// Enviar Mensagem do Estudante para a IA
window.enviarMensagemChatIA = async function(textoPreDefinido = null) {
  const input = document.getElementById('chat-ia-input');
  const btnEnviar = document.getElementById('chat-ia-btn-enviar');
  const texto = (textoPreDefinido || (input ? input.value : '')).trim();

  if (!texto || AppState.chatIA.carregando) return;

  if (input) input.value = '';
  AppState.chatIA.carregando = true;
  emitirSomChat('pop');

  const userMsgId = 'msg-user-' + Date.now();
  AppState.chatIA.mensagens.push({
    id: userMsgId,
    remetente: 'usuario',
    texto: texto,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  });

  renderizarMensagensChatIA();
  salvarHistoricoChatIA();

  const container = document.getElementById('chat-ia-mensagens-container');
  let typingEl = document.createElement('div');
  typingEl.id = 'chat-ia-typing-indicator';
  typingEl.className = 'chat-ia-msg-wrapper msg-ia anim-fade-in';
  typingEl.innerHTML = `
    <div class="chat-ia-msg-avatar"><i class="fa-solid fa-brain-circuit"></i></div>
    <div class="chat-ia-msg-balao typing-balao">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <small style="color: var(--text-muted); font-size: 0.78rem;">Consultando Inteligência Artificial do Gemini...</small>
    </div>
  `;
  if (container) {
    container.appendChild(typingEl);
    container.scrollTop = container.scrollHeight;
  }

  if (btnEnviar) {
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const respostaIA = await processarPerguntaComIA(texto);
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

    emitirSomChat('pop');
    AppState.chatIA.mensagens.push({
      id: 'msg-ia-' + Date.now(),
      remetente: 'ia',
      texto: respostaIA.texto,
      acaoCronograma: respostaIA.temCronograma ? respostaIA.cronogramaData : null,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });

    renderizarMensagensChatIA();
    salvarHistoricoChatIA();

    if (respostaIA.temCronograma && respostaIA.cronogramaData) {
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) {
        window.mostrarToast('📅 A IA gerou um cronograma de estudos sob medida! Clique no botão abaixo da mensagem para sincronizar.');
      }
    }
  } catch (err) {
    console.error('Erro na resposta do chat IA:', err);
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

    AppState.chatIA.mensagens.push({
      id: 'msg-ia-err-' + Date.now(),
      remetente: 'ia',
      texto: `Desculpe, ocorreu uma oscilação na conexão com a IA: *${err.message || 'Erro temporário'}*.\n\nPor favor, tente novamente ou conecte sua chave da API do Google Gemini no botão acima para máxima velocidade!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
    renderizarMensagensChatIA();
    salvarHistoricoChatIA();
  } finally {
    AppState.chatIA.carregando = false;
    if (btnEnviar) {
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    }
    if (input) input.focus();
  }
};

// Processa a pergunta do estudante utilizando Gemini
async function processarPerguntaComIA(pergunta) {
  const user = AppState.currentUser;
  const vestibular = user ? (user.vestibular || 'ENEM') : 'ENEM';
  const curso = user ? (user.curso || 'Não especificado') : 'Ensino Superior';
  const nomeAluno = user ? user.nome.split(' ')[0] : 'Estudante';
  const modo = AppState.chatIA.modo || 'tutor';

  let modoInstrucao = '';
  if (modo === 'desafio') {
    modoInstrucao = 'MODO DESAFIO: Elabore uma questão teste contextualizada no estilo da banca com 4 alternativas (A, B, C, D) e peça para o aluno responder!';
  } else if (modo === 'zen') {
    modoInstrucao = 'MODO ZEN / ANTI-ANSIEDADE: Forneça suporte acolhedor, técnicas de respiração (ex: 4-7-8), organização saudável do sono e incentivo psicológico realista.';
  } else if (modo === 'cronograma') {
    modoInstrucao = 'MODO CRONOGRAMA: Seu foco principal é montar rotinas e grades semanais de estudos de alta performance com tempos de estudo e pausas.';
  } else {
    modoInstrucao = 'MODO TUTOR: Explique com didática de excelência, exemplos práticos do cotidiano e foque nos conteúdos mais recorrentes da banca examinadora.';
  }

  const systemPrompt = `Você é o Tutor de Inteligência Artificial Oficial do portal EstudaMais, especialista em aprovação nos maiores vestibulares do Brasil (ENEM, Fuvest, Unicamp, Unesp, Fatec, ITA, FSA e particulares).
Aluno: ${nomeAluno}
Vestibular foco: ${vestibular}
Curso pretendido: ${curso}
${modoInstrucao}

Diretrizes:
1. Responda em Português do Brasil com tom encorajador, altamente didático, dinâmico e acolhedor.
2. Use negrito para palavras-chave e tópicos com bullet points para facilitar a leitura.
3. Se o aluno pedir um "cronograma" ou "plano de estudos", crie um cronograma semanal detalhado por dias com matérias prioritárias para ${vestibular} e ${curso}. Ao final, inclua a estrutura JSON estrita:
CRONOGRAMA_JSON:
{
  "diasEstudo": 5,
  "horasPorDia": 4,
  "vestibular": "${vestibular}",
  "curso": "${curso}",
  "dias": {
    "Segunda": ["Matemática Básica", "Física Mecânica", "Revisão Ativa"],
    "Terça": ["Biologia Celular", "Química Geral", "Questões da Banca"],
    "Quarta": ["Linguagens & Interpretação", "História Geral", "Redação"],
    "Quinta": ["Geografia Humana", "Filosofia & Sociologia", "Exercícios"],
    "Sexta": ["Matemática Financeira", "Química Orgânica", "Simulado Rápido"],
    "Sábado": ["Revisão dos Erros da Semana", "Redação Prática"]
  }
}
4. Se o aluno pedir para tirar dúvidas de exercícios, resolva passo a passo com raciocínio lógico claro antes das fórmulas.`;

  const promptFinal = `${systemPrompt}\n\nPergunta do Aluno:\n"${pergunta}"`;
  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  const modelo = localStorage.getItem('estudamais_gemini_model') || 'gemini-1.5-flash';

  let rawResposta = null;

  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: promptFinal }] }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 2048 }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        rawResposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    } catch (e) {
      console.warn('Falha na requisição direta Gemini API, acionando contingência:', e);
    }
  }

  if (!rawResposta) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(promptFinal)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        rawResposta = await res.text();
      }
    } catch (e) {
      console.warn('Falha na contingência pública:', e);
    }
  }

  if (!rawResposta) {
    rawResposta = gerarRespostaLocalInteligente(pergunta, vestibular, curso, nomeAluno);
  }

  let cronogramaData = null;
  let temCronograma = false;

  const matchCronograma = rawResposta.match(/CRONOGRAMA_JSON:\s*(\{[\s\S]*?\})/);
  if (matchCronograma) {
    try {
      cronogramaData = JSON.parse(matchCronograma[1]);
      temCronograma = true;
      rawResposta = rawResposta.replace(/CRONOGRAMA_JSON:\s*\{[\s\S]*?\}/, '').trim();
    } catch (e) {
      console.warn('Erro ao decodificar JSON do cronograma da IA:', e);
    }
  }

  return {
    texto: rawResposta,
    temCronograma,
    cronogramaData
  };
}

// Fallback local especialista
function gerarRespostaLocalInteligente(pergunta, vestibular, curso, nomeAluno) {
  const p = pergunta.toLowerCase();

  if (p.includes('cronograma') || p.includes('plano de estudo') || p.includes('horario') || p.includes('rotina')) {
    return `Com certeza, **${nomeAluno}**! Preparei um cronograma de estudos de alta performance especialmente estruturado para o **${vestibular}** e seu foco em **${curso}**:\n\n### 🗓️ Metodologia do seu Cronograma:\n- **Ciclos de Foco (Pomodoro 50m/10m):** Alterne teoria com resolução massiva de exercícios.\n- **Incidência de Pesos:** Priorizamos as disciplinas com maior peso para ${curso}.\n- **Revisão Ativa aos Sábados:** Fixação dos erros acumulados na semana.\n\nCRONOGRAMA_JSON:
{
  "diasEstudo": 5,
  "horasPorDia": 4,
  "vestibular": "${vestibular}",
  "curso": "${curso}",
  "dias": {
    "Segunda": ["Matemática Básica & Álgebra", "Física Mecânica", "Resolução de 15 Exercícios"],
    "Terça": ["Biologia Celular & Ecologia", "Química Geral", "Flashcards de Revisão"],
    "Quarta": ["Interpretação de Texto & Linguagens", "História do Brasil", "Prática de Redação"],
    "Quinta": ["Geografia Física & Política", "Filosofia & Sociologia", "Exercícios da Banca"],
    "Sexta": ["Matemática Geometria & Funções", "Química Orgânica", "Simulado Cronometrado"],
    "Sábado": ["Revisão Ativa dos Cadernos", "Treino de Redação Pautada Oficial"]
  }
}\n\nVocê pode clicar no botão **"Aplicar Este Cronograma"** abaixo para sincronizá-lo diretamente com a aba Cronogramas e marcar seu progresso diário!`;
  }

  if (p.includes('desafio') || p.includes('quiz') || p.includes('questão')) {
    return `⚡ **Desafio Rápido de Fixação!**\n\n*(Vestibular ${vestibular})*\n**Pergunta:** Em Ecologia, como se denomina a relação ecológica interespecífica na qual uma espécie é beneficiada sem que a outra seja prejudicada (ex: rêmora e tubarão)?\n\n- **A)** Mutualismo\n- **B)** Comensalismo\n- **C)** Parasitismo\n- **D)** Competição\n\n*Responda aqui embaixo com a sua alternativa e eu te dou o feedback imediato!*`;
  }

  return `Excelente pergunta, **${nomeAluno}**!\n\nNo contexto do **${vestibular}** para **${curso}**, dominar esse conteúdo com resolução frequente de exercícios da banca examinadora é o grande diferencial competitivo.\n\n💡 **Dica de Ouro:**\n- Faça resumos no nosso **Bloco de Notas Integrado**.\n- Pratique exercícios na **Arena de Quiz** para reforçar sua memória de longo prazo.\n- Utilize o cronômetro no **Espaço de Concentração & Foco** para estudar com alta retenção!\n\nSe quiser, pergunte algo mais específico sobre esse tema ou peça para eu gerar um cronograma sob medida!`;
}

// Inserir Pergunta Rápida no Chat
window.perguntarRapidoChatIA = function(texto) {
  const input = document.getElementById('chat-ia-input');
  if (input) {
    input.value = texto;
    enviarMensagemChatIA();
  }
};

// Limpar Histórico do Chat
window.limparHistoricoChatIA = function() {
  if (confirm('Deseja realmente limpar as mensagens da conversa com a IA?')) {
    AppState.chatIA.mensagens = [];
    salvarHistoricoChatIA();
    carregarHistoricoChatIA();
    renderizarMensagensChatIA();
    if (window.mostrarToast) window.mostrarToast('Conversa com a IA reiniciada.', 'info');
  }
};

// ========================================================
// SISTEMA DE CRONOGRAMA DE ESTUDOS INTELIGENTE & GAMIFICADO
// ========================================================

// Carrega cronograma salvo no storage
function carregarCronogramaSalvo() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    const salvo = localStorage.getItem(`estudamais_cronograma_${userId}`);
    if (salvo) {
      const parsed = JSON.parse(salvo);
      AppState.cronograma = { ...AppState.cronograma, ...parsed };
    } else {
      gerarCronogramaInicialPadrao();
    }
  } catch (e) {
    console.error('Erro ao carregar cronograma:', e);
  }
}

// Salva cronograma no storage
function salvarCronogramaStorage() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    localStorage.setItem(`estudamais_cronograma_${userId}`, JSON.stringify(AppState.cronograma));
  } catch (e) {}
}

// Gera cronograma padrão baseado nos dados do estudante
function gerarCronogramaInicialPadrao() {
  const user = AppState.currentUser;
  const vest = user && user.vestibular ? user.vestibular : 'ENEM';

  AppState.cronograma.diasEstudoPorSemana = 5;
  AppState.cronograma.horasPorDia = 4;
  AppState.cronograma.xp = AppState.cronograma.xp || 0;
  AppState.cronograma.streakDias = AppState.cronograma.streakDias || 1;
  AppState.cronograma.planoSemanal = {
    "Segunda": [
      { id: "c-seg-1", materia: "Matemática", topico: "Funções e Equações", tempo: "90 min", concluido: false },
      { id: "c-seg-2", materia: "Física", topico: "Mecânica e Cinemática", tempo: "90 min", concluido: false },
      { id: "c-seg-3", materia: "Exercícios", topico: "15 Questões com Cronômetro", tempo: "60 min", concluido: false }
    ],
    "Terça": [
      { id: "c-ter-1", materia: "Biologia", topico: "Ecologia e Meio Ambiente", tempo: "90 min", concluido: false },
      { id: "c-ter-2", materia: "Química", topico: "Estequiometria e Soluções", tempo: "90 min", concluido: false },
      { id: "c-ter-3", materia: "Revisão", topico: "Flashcards e Mapa Mental", tempo: "60 min", concluido: false }
    ],
    "Quarta": [
      { id: "c-qua-1", materia: "Linguagens", topico: "Interpretação e Figuras de Linguagem", tempo: "90 min", concluido: false },
      { id: "c-qua-2", materia: "História", topico: "Brasil Império e República", tempo: "90 min", concluido: false },
      { id: "c-qua-3", materia: "Redação", topico: "Produção de Redação com IA", tempo: "60 min", concluido: false }
    ],
    "Quinta": [
      { id: "c-qui-1", materia: "Geografia", topico: "Geopolítica e Climatologia", tempo: "90 min", concluido: false },
      { id: "c-qui-2", materia: "Filosofia / Sociologia", topico: "Cidadania e Pensadores Contemporâneos", tempo: "90 min", concluido: false },
      { id: "c-qui-3", materia: "Exercícios", topico: "Questões do " + vest, tempo: "60 min", concluido: false }
    ],
    "Sexta": [
      { id: "c-sex-1", materia: "Matemática", topico: "Geometria Plana e Espacial", tempo: "90 min", concluido: false },
      { id: "c-sex-2", materia: "Química Orgânica", topico: "Funções Oxigenadas e Nitrogenadas", tempo: "90 min", concluido: false },
      { id: "c-sex-3", materia: "Simulado", topico: "Treino Rápido na Arena de Quiz", tempo: "60 min", concluido: false }
    ],
    "Sábado": [
      { id: "c-sab-1", materia: "Revisão Geral", topico: "Caderno de Erros da Semana", tempo: "90 min", concluido: false },
      { id: "c-sab-2", materia: "Redação", topico: "Reescrita e Ajustes de Competência", tempo: "90 min", concluido: false }
    ]
  };
  salvarCronogramaStorage();
}

// Obtém o nome do dia da semana atual em português
function obterDiaSemanaHoje() {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const idx = new Date().getDay();
  return dias[idx];
}

// Renderizar Interface do Cronograma
function renderizarCronogramaUI() {
  const container = document.getElementById('cronograma-semanal-grid');
  const barraProgresso = document.getElementById('cronograma-barra-progresso');
  const percentualTexto = document.getElementById('cronograma-percentual-texto');
  const contadorTarefas = document.getElementById('cronograma-contador-tarefas');
  const badgeVestibular = document.getElementById('cronograma-badge-vestibular');
  const badgeCurso = document.getElementById('cronograma-badge-curso');
  const xpBadge = document.getElementById('cronograma-badge-xp');
  const streakBadge = document.getElementById('cronograma-badge-streak');

  if (!container) return;

  const user = AppState.currentUser;
  if (badgeVestibular) badgeVestibular.textContent = user ? (user.vestibular || 'ENEM') : 'ENEM';
  if (badgeCurso) badgeCurso.textContent = user ? (user.curso || 'Ensino Superior') : 'Vestibular';

  const xpTotal = AppState.cronograma.xp || 0;
  const streakAtual = AppState.cronograma.streakDias || 1;
  if (xpBadge) xpBadge.textContent = `${xpTotal} XP`;
  if (streakBadge) streakBadge.textContent = `${streakAtual} Dias Seguidos`;

  const plano = AppState.cronograma.planoSemanal;
  if (!plano) {
    gerarCronogramaInicialPadrao();
    return renderizarCronogramaUI();
  }

  const diaHoje = obterDiaSemanaHoje();
  const diasSemana = Object.keys(plano);
  let totalTarefas = 0;
  let concluidas = 0;

  let html = '';
  diasSemana.forEach(dia => {
    const itens = plano[dia] || [];
    totalTarefas += itens.length;
    const concluidasDia = itens.filter(i => i.concluido).length;
    concluidas += concluidasDia;
    const isHoje = dia.toLowerCase() === diaHoje.toLowerCase();

    html += `
      <div class="cronograma-dia-card anim-slide-up ${isHoje ? 'dia-atual-destaque' : ''}">
        <div class="cronograma-dia-header">
          <div class="cronograma-dia-titulo">
            <i class="fa-regular fa-calendar"></i>
            <span>${dia}</span>
            ${isHoje ? '<span class="dia-hoje-tag">HOJE 🔥</span>' : ''}
          </div>
          <span class="cronograma-dia-badge ${concluidasDia === itens.length && itens.length > 0 ? 'badge-completo' : ''}">
            ${concluidasDia}/${itens.length} feitas
          </span>
        </div>

        <div class="cronograma-dia-tarefas">
          ${itens.length === 0 ? `
            <div class="cronograma-dia-vazio">
              <i class="fa-solid fa-mug-hot"></i>
              <span>Nenhum bloco agendado para este dia.</span>
            </div>
          ` : ''}
          ${itens.map((item, idx) => `
            <div class="cronograma-tarefa-item ${item.concluido ? 'feita' : ''}">
              <div class="cronograma-check-box" onclick="alternarConclusaoTarefaCronograma('${dia}', ${idx})" title="Marcar como concluída">
                <i class="fa-solid fa-check"></i>
              </div>
              <div class="cronograma-tarefa-corpo" onclick="alternarConclusaoTarefaCronograma('${dia}', ${idx})">
                <div class="cronograma-tarefa-materia">${item.materia}</div>
                <div class="cronograma-tarefa-topico">${item.topico}</div>
              </div>
              <div class="cronograma-tarefa-acoes">
                <span class="cronograma-tarefa-tempo">${item.tempo || '60m'}</span>
                <button class="btn-tarefa-foco" onclick="iniciarFocoComMateria('${item.materia}')" title="Estudar agora no Modo Foco Pomodoro">
                  <i class="fa-solid fa-stopwatch"></i>
                </button>
                <button class="btn-tarefa-excluir" onclick="removerTarefaCronograma('${dia}', ${idx})" title="Remover matéria">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cronograma-dia-footer">
          <button class="btn-adicionar-tarefa-dia" onclick="abrirModalNovaTarefaCronograma('${dia}')">
            <i class="fa-solid fa-plus"></i> Adicionar Matéria
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const pct = totalTarefas > 0 ? Math.round((concluidas / totalTarefas) * 100) : 0;
  if (barraProgresso) barraProgresso.style.width = `${pct}%`;
  if (percentualTexto) percentualTexto.textContent = `${pct}% Concluído`;
  if (contadorTarefas) contadorTarefas.textContent = `${concluidas}/${totalTarefas} metas semanais`;
}

// Iniciar Modo Foco diretamente com a matéria do cronograma
window.iniciarFocoComMateria = function(materia) {
  if (typeof mudarAba === 'function') mudarAba('ferramentas');
  const label = document.getElementById('pomodoro-mode-label');
  if (label) label.textContent = `Foco: ${materia}`;
  if (window.mostrarToast) {
    window.mostrarToast(`⏱️ Bloco de Foco carregado para: ${materia}. Bons estudos!`);
  }
};

// Alternar conclusão de tarefa no cronograma com XP e comemoração
window.alternarConclusaoTarefaCronograma = function(dia, idx) {
  const plano = AppState.cronograma.planoSemanal;
  if (plano && plano[dia] && plano[dia][idx]) {
    const item = plano[dia][idx];
    item.concluido = !item.concluido;

    if (item.concluido) {
      AppState.cronograma.xp = (AppState.cronograma.xp || 0) + 25;
      emitirSomChat('sucesso');
      if (typeof tocarSomAcertoQuiz === 'function') tocarSomAcertoQuiz();
      if (window.mostrarToast) window.mostrarToast(`🎯 +25 XP! Meta de ${item.materia} concluída!`);

      // Se todas as tarefas do dia foram feitas, celebra!
      const todasDia = plano[dia].every(t => t.concluido);
      if (todasDia && typeof dispararConfetes === 'function') {
        dispararConfetes();
      }
    } else {
      AppState.cronograma.xp = Math.max(0, (AppState.cronograma.xp || 0) - 25);
    }

    salvarCronogramaStorage();
    renderizarCronogramaUI();
  }
};

// Remover tarefa individual do cronograma
window.removerTarefaCronograma = function(dia, idx) {
  const plano = AppState.cronograma.planoSemanal;
  if (plano && plano[dia] && plano[dia][idx]) {
    const item = plano[dia][idx];
    if (confirm(`Deseja remover "${item.materia}" de ${dia}?`)) {
      plano[dia].splice(idx, 1);
      salvarCronogramaStorage();
      renderizarCronogramaUI();
      if (window.mostrarToast) window.mostrarToast('Matéria removida do dia.');
    }
  }
};

// Abre modal para gerar cronograma por IA perguntando parâmetros
window.abrirModalGerarCronogramaIA = function() {
  const modal = document.getElementById('modal-gerar-cronograma-ia');
  if (!modal) return;

  const user = AppState.currentUser;
  const inputVestibular = document.getElementById('cronograma-ia-vestibular');
  const inputCurso = document.getElementById('cronograma-ia-curso');

  if (inputVestibular) inputVestibular.value = user ? (user.vestibular || 'ENEM') : 'ENEM';
  if (inputCurso) inputCurso.value = user ? (user.curso || 'Medicina') : 'Vestibular';

  modal.classList.add('active');
};

window.fecharModalGerarCronogramaIA = function() {
  const modal = document.getElementById('modal-gerar-cronograma-ia');
  if (modal) modal.classList.remove('active');
};

// Executa geração de cronograma via IA com as respostas do modal
window.executarGeradorCronogramaIA = async function(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('btn-confirmar-gerar-cronograma-ia');
  const vest = document.getElementById('cronograma-ia-vestibular')?.value || 'ENEM';
  const curso = document.getElementById('cronograma-ia-curso')?.value || 'Vestibular';
  const horas = document.getElementById('cronograma-ia-horas')?.value || '4';
  const dias = document.getElementById('cronograma-ia-dias')?.value || '5';
  const turno = document.getElementById('cronograma-ia-turno')?.value || 'tarde';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Construindo Cronograma com Gemini...';
  }

  try {
    const promptCronograma = `Crie um cronograma de estudos semanal de alta performance para um vestibulando com os seguintes dados:
- Vestibular Alvo: ${vest}
- Curso Desejado: ${curso}
- Horas de estudo por dia: ${horas} horas
- Dias disponíveis na semana: ${dias} dias
- Turno preferido: ${turno}

Elabore um planejamento estratégico equilibrando matérias com maior peso na prova com resolução prática de questões e revisões de memória.
Retorne a explicação pedagógica e OBRIGATORIAMENTE termine com o bloco JSON:
CRONOGRAMA_JSON:
{
  "diasEstudo": ${dias},
  "horasPorDia": ${horas},
  "vestibular": "${vest}",
  "curso": "${curso}",
  "dias": { ... }
}`;

    const res = await processarPerguntaComIA(promptCronograma);
    fecharModalGerarCronogramaIA();

    if (res.temCronograma && res.cronogramaData) {
      aplicarObjetoCronograma(res.cronogramaData);
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) {
        window.mostrarToast(`✨ Cronograma da IA para ${vest} (${curso}) ativado com sucesso!`, 'sucesso');
      }
    } else {
      aplicarCronogramaFallback(vest, curso, parseInt(dias, 10), parseInt(horas, 10));
      if (window.mostrarToast) {
        window.mostrarToast(`✨ Cronograma personalizado para ${vest} gerado com sucesso!`, 'sucesso');
      }
    }

    renderizarCronogramaUI();
  } catch (err) {
    console.error('Erro ao gerar cronograma por IA:', err);
    aplicarCronogramaFallback(vest, curso, parseInt(dias, 10), parseInt(horas, 10));
    fecharModalGerarCronogramaIA();
    renderizarCronogramaUI();
    if (window.mostrarToast) {
      window.mostrarToast('Cronograma gerado via motor inteligente do EstudaMais!', 'info');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Gerar Cronograma com IA';
    }
  }
};

// Aplica cronograma sugerido na mensagem do chat
window.aplicarCronogramaSugeridoPelaIA = function(msgId) {
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (msg && msg.acaoCronograma) {
    aplicarObjetoCronograma(msg.acaoCronograma);
    renderizarCronogramaUI();
    mudarAba('cronograma');
    if (window.mostrarToast) {
      window.mostrarToast('📅 Cronograma sincronizado com sucesso na sua aba Cronogramas!');
    }
  }
};

// Transforma o objeto do Gemini na estrutura interna do cronograma
function aplicarObjetoCronograma(data) {
  if (!data || !data.dias) return;

  const novoPlano = {};
  const diasNomes = Object.keys(data.dias);

  diasNomes.forEach(diaNome => {
    const materias = data.dias[diaNome];
    novoPlano[diaNome] = materias.map((mat, i) => {
      let matNome = typeof mat === 'string' ? mat : (mat.materia || 'Estudo');
      let topico = typeof mat === 'object' && mat.topico ? mat.topico : 'Revisão e Questões';
      let tempo = typeof mat === 'object' && mat.tempo ? mat.tempo : '60 min';

      return {
        id: `c-ai-${diaNome}-${i}-${Date.now()}`,
        materia: matNome,
        topico: topico,
        tempo: tempo,
        concluido: false
      };
    });
  });

  AppState.cronograma.diasEstudoPorSemana = data.diasEstudo || diasNomes.length;
  AppState.cronograma.horasPorDia = data.horasPorDia || 4;
  AppState.cronograma.planoSemanal = novoPlano;
  salvarCronogramaStorage();
}

// Fallback robusto para criação de cronograma
function aplicarCronogramaFallback(vest, curso, diasQtd, horas) {
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].slice(0, diasQtd);
  const materiasPadrao = [
    { m: "Matemática", t: "Álgebra e Geometria" },
    { m: "Física", t: "Mecânica e Termologia" },
    { m: "Biologia", t: "Ecologia e Genética" },
    { m: "Química", t: "Química Geral e Orgânica" },
    { m: "Linguagens", t: "Interpretação e Literatura" },
    { m: "História", t: "Brasil e Geral" },
    { m: "Geografia", t: "Geopolítica e Meio Ambiente" },
    { m: "Redação", t: "Prática em Folha Pautada" },
    { m: "Simulado", t: "Resolução de Provas Anteriores" }
  ];

  const novoPlano = {};
  diasSemana.forEach((dia, dIdx) => {
    const item1 = materiasPadrao[(dIdx * 2) % materiasPadrao.length];
    const item2 = materiasPadrao[(dIdx * 2 + 1) % materiasPadrao.length];
    const tempoBloco = Math.round((horas * 60) / 2) + " min";

    novoPlano[dia] = [
      { id: `c-fb-${dia}-1`, materia: item1.m, topico: item1.t, tempo: tempoBloco, concluido: false },
      { id: `c-fb-${dia}-2`, materia: item2.m, topico: item2.t, tempo: tempoBloco, concluido: false }
    ];
  });

  AppState.cronograma.diasEstudoPorSemana = diasQtd;
  AppState.cronograma.horasPorDia = horas;
  AppState.cronograma.planoSemanal = novoPlano;
  salvarCronogramaStorage();
}

// Modal para adicionar tarefa manual ao cronograma
window.abrirModalNovaTarefaCronograma = function(dia) {
  const modal = document.getElementById('modal-tarefa-cronograma');
  const diaInput = document.getElementById('tarefa-cronograma-dia');
  const diaTexto = document.getElementById('modal-tarefa-dia-texto');
  if (!modal) return;

  if (diaInput) diaInput.value = dia;
  if (diaTexto) diaTexto.textContent = dia;

  modal.classList.add('active');
};

window.fecharModalNovaTarefaCronograma = function() {
  const modal = document.getElementById('modal-tarefa-cronograma');
  if (modal) modal.classList.remove('active');
};

window.salvarNovaTarefaCronograma = function(e) {
  if (e) e.preventDefault();
  const dia = document.getElementById('tarefa-cronograma-dia')?.value;
  const materia = document.getElementById('tarefa-cronograma-materia')?.value?.trim();
  const topico = document.getElementById('tarefa-cronograma-topico')?.value?.trim();
  const tempo = document.getElementById('tarefa-cronograma-tempo')?.value || '60 min';

  if (!dia || !materia) {
    alert('Por favor, informe a matéria a ser estudada.');
    return;
  }

  if (!AppState.cronograma.planoSemanal) AppState.cronograma.planoSemanal = {};
  if (!AppState.cronograma.planoSemanal[dia]) AppState.cronograma.planoSemanal[dia] = [];

  AppState.cronograma.planoSemanal[dia].push({
    id: `c-man-${Date.now()}`,
    materia: materia,
    topico: topico || 'Exercícios e Revisão',
    tempo: tempo,
    concluido: false
  });

  salvarCronogramaStorage();
  fecharModalNovaTarefaCronograma();
  renderizarCronogramaUI();
  if (window.mostrarToast) window.mostrarToast(`Matéria adicionada a ${dia}!`);
};

// Resetar tarefas semanais para recomeçar a semana
window.reiniciarSemanaCronograma = function() {
  if (confirm('Deseja desmarcar todas as tarefas concluídas para iniciar uma nova semana de estudos?')) {
    const plano = AppState.cronograma.planoSemanal;
    if (plano) {
      Object.keys(plano).forEach(dia => {
        plano[dia].forEach(t => t.concluido = false);
      });
      AppState.cronograma.streakDias = (AppState.cronograma.streakDias || 1) + 1;
      salvarCronogramaStorage();
      renderizarCronogramaUI();
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) window.mostrarToast('🚀 Nova semana iniciada! Sua constância aumentou!');
    }
  }
};

// Imprimir / Salvar PDF do Cronograma
window.imprimirCronogramaEstudos = function() {
  window.print();
};
