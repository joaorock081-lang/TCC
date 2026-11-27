$js = [System.IO.File]::ReadAllText('js/app.js', [System.Text.Encoding]::UTF8)

# 1. Update renderizarVideoaulas cards: remove sample lesson and remove Assistir Aula Aqui from cards
$targetCardActions = @'
        <!-- Aula Modelo Recomendada -->
        <div class="canal-aula-modelo-box">
          <div class="canal-aula-info">
            <span class="aula-badge-destaque"><i class="fa-solid fa-fire"></i> Aula Modelo Recomendada:</span>
            <span class="aula-modelo-titulo" title="${escapeHTML(canal.videoTitulo)}">${escapeHTML(canal.videoTitulo)}</span>
          </div>
        </div>

        <!-- Ações do Card -->
        <div class="canal-card-actions">
          <button type="button" class="btn-canal-assistir" onclick="abrirModalPlayerVideo('${canal.videoId}', '${escapeHTML(canal.videoTitulo).replace(/'/g, "\\'")}', '${escapeHTML(canal.nomeCanal).replace(/'/g, "\\'")}', '${escapeHTML(canal.professor).replace(/'/g, "\\'")}', '${canal.urlCanal}')">
            <i class="fa-solid fa-circle-play"></i>
            <span>Assistir Aula Aqui</span>
          </button>
          <a href="${canal.urlCanal}" target="_blank" rel="noopener noreferrer" class="btn-canal-youtube" title="Abrir canal oficial no YouTube em nova guia">
            <i class="fa-brands fa-youtube"></i>
            <span>Canal ↗</span>
          </a>
        </div>
'@

$replaceCardActions = @'
        <!-- Ações do Card: Apenas Acessar Canal Oficial -->
        <div class="canal-card-actions">
          <a href="${canal.urlCanal}" target="_blank" rel="noopener noreferrer" class="btn-canal-youtube-full" title="Acessar canal oficial no YouTube em nova guia">
            <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
            <span>Acessar Canal no YouTube ↗</span>
          </a>
        </div>
'@

if ($js.Contains($targetCardActions)) {
  $js = $js.Replace($targetCardActions, $replaceCardActions)
  Write-Host "Card actions updated to single YouTube button!"
} else {
  Write-Host "Target card actions not found!"
}

# 2. Update setLousaFerramenta to adjust cursor
$targetSetLousa = @'
window.setLousaFerramenta = function(tool) {
  AppState.lousa.tool = tool;
  document.getElementById('tool-pen').classList.toggle('active', tool === 'pen');
  document.getElementById('tool-eraser').classList.toggle('active', tool === 'eraser');

  const status = document.getElementById('lousa-ferramenta-status');
  if (status) {
    status.textContent = tool === 'pen' ? 'Lápis' : 'Borracha';
  }
};
'@

$replaceSetLousa = @'
window.setLousaFerramenta = function(tool) {
  AppState.lousa.tool = tool;
  document.getElementById('tool-pen').classList.toggle('active', tool === 'pen');
  document.getElementById('tool-eraser').classList.toggle('active', tool === 'eraser');

  const status = document.getElementById('lousa-ferramenta-status');
  if (status) {
    status.textContent = tool === 'pen' ? 'Lápis' : 'Borracha';
  }

  const canvas = document.getElementById('lousa-canvas');
  if (canvas) {
    canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
  }
};
'@

if ($js.Contains($targetSetLousa)) {
  $js = $js.Replace($targetSetLousa, $replaceSetLousa)
  Write-Host "setLousaFerramenta updated!"
} else {
  Write-Host "Target setLousaFerramenta not found!"
}

# 3. Append video player topo controllers and video lousa engine
$newCode = @'

/* ========================================================
   PLAYER DE VIDEOAULAS NO TOPO & LOUSA/ANOTAÇÕES EMBUTIDAS
   ======================================================== */

// Extrair ID do YouTube a partir de qualquer formato de URL
function extrairYouTubeId(urlOuId) {
  if (!urlOuId) return null;
  const str = urlOuId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = str.match(regExp);
  return match ? match[1] : null;
}
window.extrairYouTubeId = extrairYouTubeId;

// Carregar Vídeo Personalizado do YouTube no Topo
window.carregarVideoPersonalizadoTopo = function(urlPredefinida = null) {
  const input = document.getElementById('input-video-url-topo');
  const url = (urlPredefinida || (input ? input.value : '')).trim();

  if (!url) {
    if (window.mostrarToast) {
      window.mostrarToast('Por favor, cole o link de um vídeo do YouTube.', 'aviso');
    }
    return;
  }

  const videoId = extrairYouTubeId(url);
  if (!videoId) {
    if (window.mostrarToast) {
      window.mostrarToast('Link do YouTube inválido. Verifique a URL e tente novamente.', 'erro');
    }
    return;
  }

  const iframe = document.getElementById('iframe-video-player-topo');
  const areaAtiva = document.getElementById('area-video-ativa-topo');
  const labelStatus = document.getElementById('label-video-carregado');

  if (iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  }

  if (areaAtiva) {
    areaAtiva.style.display = 'flex';
  }

  if (labelStatus) {
    labelStatus.textContent = 'Vídeo em Reprodução (ID: ' + videoId + ')';
  }

  // Configura a lousa integrada sob o vídeo
  setTimeout(() => {
    configurarLousaVideo();
  }, 100);

  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('🎬 Vídeo carregado! Anotações e lousa ativadas abaixo.', 'sucesso');
  }

  // Rola suavemente até o player
  const secao = document.getElementById('secao-assistir-aula-aqui');
  if (secao) {
    secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.fecharVideoPersonalizadoTopo = function() {
  const iframe = document.getElementById('iframe-video-player-topo');
  const areaAtiva = document.getElementById('area-video-ativa-topo');
  const input = document.getElementById('input-video-url-topo');

  if (iframe) {
    iframe.src = 'about:blank';
  }
  if (areaAtiva) {
    areaAtiva.style.display = 'none';
  }
  if (input) {
    input.value = '';
    const btnLimpar = document.getElementById('btn-limpar-url-topo');
    if (btnLimpar) btnLimpar.style.display = 'none';
  }
  if (window.mostrarToast) {
    window.mostrarToast('Reprodução de vídeo encerrada.');
  }
};

window.limparInputVideoTopo = function() {
  const input = document.getElementById('input-video-url-topo');
  if (input) input.value = '';
  const btnLimpar = document.getElementById('btn-limpar-url-topo');
  if (btnLimpar) btnLimpar.style.display = 'none';
};

window.alternarAbaFerramentaVideo = function(ferramenta) {
  const painelNotas = document.getElementById('painel-video-notas');
  const painelLousa = document.getElementById('painel-video-lousa');
  const btnNotas = document.getElementById('btn-tab-tool-notas');
  const btnLousa = document.getElementById('btn-tab-tool-lousa');

  if (ferramenta === 'notas') {
    if (painelNotas) painelNotas.style.display = 'flex';
    if (painelLousa) painelLousa.style.display = 'none';
    if (btnNotas) btnNotas.classList.add('active');
    if (btnLousa) btnLousa.classList.remove('active');
  } else {
    if (painelNotas) painelNotas.style.display = 'none';
    if (painelLousa) painelLousa.style.display = 'flex';
    if (btnNotas) btnNotas.classList.remove('active');
    if (btnLousa) btnLousa.classList.add('active');

    setTimeout(() => {
      redimensionarCanvasLousaVideo();
    }, 80);
  }
};

window.salvarNotaVideoTopo = function() {
  const input = document.getElementById('input-nota-video-topo');
  const texto = (input ? input.value : '').trim();

  if (!texto) {
    if (window.mostrarToast) {
      window.mostrarToast('Digite alguma anotação antes de salvar.', 'erro');
    }
    return;
  }

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: `[Aula YouTube] Anotações de Estudo`,
    conteudo: texto,
    materia: 'Vídeo Aulas',
    data: new Date().toLocaleDateString('pt-BR'),
    cor: '#ef4444',
    favorita: false
  };

  if (!Array.isArray(AppState.notes)) {
    AppState.notes = [];
  }
  AppState.notes.unshift(novaNota);

  if (typeof salvarNotasStorage === 'function') salvarNotasStorage();
  if (typeof renderizarNotas === 'function') renderizarNotas();

  if (input) input.value = '';
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('📝 Anotação salva com sucesso no seu Bloco de Notas!', 'sucesso');
  }
};

// Motor da Lousa Integrada sob o Vídeo
const LousaVideo = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  tool: 'pen',
  color: '#ffffff',
  size: 3
};

function configurarLousaVideo() {
  const canvas = document.getElementById('lousa-video-canvas');
  if (!canvas) return;

  LousaVideo.canvas = canvas;
  LousaVideo.ctx = canvas.getContext('2d');

  redimensionarCanvasLousaVideo();

  canvas.onpointerdown = (e) => {
    e.preventDefault();
    LousaVideo.isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = LousaVideo.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (LousaVideo.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = LousaVideo.size * 5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = LousaVideo.color;
      ctx.lineWidth = LousaVideo.size;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  canvas.onpointermove = (e) => {
    if (!LousaVideo.isDrawing) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    LousaVideo.ctx.lineTo(x, y);
    LousaVideo.ctx.stroke();
  };

  canvas.onpointerup = () => { LousaVideo.isDrawing = false; };
  canvas.onpointerleave = () => { LousaVideo.isDrawing = false; };
}

function redimensionarCanvasLousaVideo() {
  const canvas = LousaVideo.canvas;
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
}

window.setLousaVideoFerramenta = function(tool) {
  LousaVideo.tool = tool;
  const btnPen = document.getElementById('tool-pen-video');
  const btnEraser = document.getElementById('tool-eraser-video');
  if (btnPen) btnPen.classList.toggle('active', tool === 'pen');
  if (btnEraser) btnEraser.classList.toggle('active', tool === 'eraser');
  if (LousaVideo.canvas) {
    LousaVideo.canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
  }
};

window.setLousaVideoCor = function(cor) {
  LousaVideo.color = cor;
  setLousaVideoFerramenta('pen');
  document.querySelectorAll('#lousa-video-cores-container .lousa-cor-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(cor));
  });
};

window.limparLousaVideo = function() {
  if (LousaVideo.canvas && LousaVideo.ctx) {
    LousaVideo.ctx.clearRect(0, 0, LousaVideo.canvas.width, LousaVideo.canvas.height);
  }
  if (window.mostrarToast) {
    window.mostrarToast('Lousa do vídeo limpa!');
  }
};
'@

$js = $js + "`n" + $newCode
[System.IO.File]::WriteAllText('js/app.js', $js, [System.Text.Encoding]::UTF8)
Write-Host "js/app.js updated successfully with top video player and video lousa engine!"
