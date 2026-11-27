$js = [System.IO.File]::ReadAllText('js/app.js', [System.Text.Encoding]::UTF8)

# 1. Update DOMContentLoaded
$targetDom = "  try { inicializarChatIACronograma(); } catch (e) { console.error('Erro ao inicializar chat IA e cronograma:', e); }"
$replaceDom = @"
  try { inicializarChatIACronograma(); } catch (e) { console.error('Erro ao inicializar chat IA e cronograma:', e); }
  try { renderizarVideoaulas(); } catch (e) { console.error('Erro ao renderizar videoaulas:', e); }
"@
if ($js.Contains($targetDom)) {
  $js = $js.Replace($targetDom, $replaceDom)
  Write-Host "DOMContentLoaded updated successfully."
} else {
  Write-Host "Target DOMContentLoaded not found!"
}

# 2. Update mudarAba
$targetMudarAba = @"
  } else if (tabId === 'perfil') {
    renderizarAbaPerfil();
  }
"@
$replaceMudarAba = @"
  } else if (tabId === 'perfil') {
    renderizarAbaPerfil();
  } else if (tabId === 'videoaulas') {
    if (typeof renderizarVideoaulas === 'function') {
      renderizarVideoaulas();
    }
  } else if (tabId === 'cronograma') {
    if (typeof renderizarCronogramaUI === 'function') {
      renderizarCronogramaUI();
    }
  }
"@
if ($js.Contains($targetMudarAba)) {
  $js = $js.Replace($targetMudarAba, $replaceMudarAba)
  Write-Host "mudarAba updated successfully."
} else {
  Write-Host "Target mudarAba not found!"
}

# 3. Enhance formatarMarkdownChat
$targetCleanLatex = "    .replace(/\\([a-zA-Z])/g, '`$1');"
$replaceCleanLatex = @"
    .replace(/\\([a-zA-Z])/g, '`$1')
    .replace(/\\[\[\]\(\)\{\}]/g, '')
    .replace(/\\/g, '');
"@
if ($js.Contains($targetCleanLatex)) {
  $js = $js.Replace($targetCleanLatex, $replaceCleanLatex)
  Write-Host "formatarMarkdownChat enhanced successfully."
} else {
  Write-Host "Target clean latex not found!"
}

# 4. Append Videoaulas Implementation
$videoaulasCode = @'

/* ========================================================
   SEÇÃO 12: VÍDEO AULAS DO YOUTUBE & CURADORIA DE CANAIS
   ======================================================== */

// Inicialização do estado de Videoaulas no AppState
if (!AppState.videoaulas) {
  let favs = [];
  try {
    favs = JSON.parse(localStorage.getItem('estudamais_canais_favoritos') || '[]');
  } catch (e) {
    favs = [];
  }
  AppState.videoaulas = {
    filtroDisciplina: 'todas',
    termoBusca: '',
    apenasFavoritos: false,
    favoritos: favs,
    videoAtual: null
  };
}

// Renderização dos cards de canais recomendados
function renderizarVideoaulas() {
  const container = document.getElementById('videoaulas-grid');
  if (!container) return;

  if (typeof CANAIS_YOUTUBE_DATA === 'undefined' || !Array.isArray(CANAIS_YOUTUBE_DATA)) {
    container.innerHTML = `
      <div class="videoaulas-vazio">
        <i class="fa-brands fa-youtube"></i>
        <h3>Carregando curadoria de canais...</h3>
        <p>A lista de vídeo aulas está sendo sincronizada com os melhores professores do YouTube.</p>
      </div>
    `;
    return;
  }

  const { filtroDisciplina, termoBusca, apenasFavoritos, favoritos } = AppState.videoaulas;

  // Filtragem dos canais
  let filtrados = CANAIS_YOUTUBE_DATA.filter(canal => {
    // Filtro por disciplina
    if (filtroDisciplina && filtroDisciplina !== 'todas') {
      if (canal.disciplinaId !== filtroDisciplina) return false;
    }

    // Filtro por favoritos
    if (apenasFavoritos) {
      if (!favoritos.includes(canal.id)) return false;
    }

    // Filtro por termo de busca
    if (termoBusca) {
      const q = termoBusca.toLowerCase();
      const matchNome = (canal.nomeCanal || '').toLowerCase().includes(q);
      const matchProf = (canal.professor || '').toLowerCase().includes(q);
      const matchDisc = (canal.disciplina || '').toLowerCase().includes(q);
      const matchDesc = (canal.descricao || '').toLowerCase().includes(q);
      const matchDest = (canal.destaque || '').toLowerCase().includes(q);
      const matchVid = (canal.videoTitulo || '').toLowerCase().includes(q);
      const matchPlaylists = Array.isArray(canal.playlists) && canal.playlists.some(p => p.toLowerCase().includes(q));

      if (!matchNome && !matchProf && !matchDisc && !matchDesc && !matchDest && !matchVid && !matchPlaylists) {
        return false;
      }
    }

    return true;
  });

  // Atualiza botão de favoritos no topo
  const btnFavTopo = document.getElementById('btn-filtro-favoritos-canais');
  if (btnFavTopo) {
    btnFavTopo.classList.toggle('active', !!apenasFavoritos);
    const spanText = btnFavTopo.querySelector('span');
    if (spanText) {
      spanText.textContent = apenasFavoritos
        ? `Favoritos (${favoritos.length}) [Ativo]`
        : `Meus Favoritos (${favoritos.length})`;
    }
  }

  // Se nenhum resultado encontrado
  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="videoaulas-vazio">
        <i class="fa-solid fa-film"></i>
        <h3>Nenhum canal ou vídeo encontrado</h3>
        <p>Tente buscar por outro termo, limpar a pesquisa ou selecionar "Todas as Matérias".</p>
        <button type="button" class="btn-hero-primary" onclick="limparBuscaVideoaulas(); filtrarDisciplinaVideoaulas('todas');" style="margin-top: 1rem;">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Ver Todos os Canais</span>
        </button>
      </div>
    `;
    return;
  }

  // Gera HTML dos cards
  container.innerHTML = filtrados.map(canal => {
    const isFav = favoritos.includes(canal.id);
    const playlistsHtml = Array.isArray(canal.playlists)
      ? canal.playlists.map(pl => `<span class="canal-playlist-tag" title="Assunto/Playlist"><i class="fa-solid fa-play"></i> ${escapeHTML(pl)}</span>`).join('')
      : '';

    return `
      <article class="canal-card anim-fade-in" data-canal-id="${canal.id}">
        <!-- Topo do Card -->
        <div class="canal-card-header">
          <div class="canal-icone-box" style="background: ${canal.corIcone || '#2563eb'};">
            <i class="fa-solid ${canal.icone || 'fa-graduation-cap'}"></i>
          </div>
          <div class="canal-header-info">
            <div class="canal-disciplina-pill">
              <i class="fa-solid ${canal.icone || 'fa-book'}"></i>
              <span>${canal.disciplina}</span>
            </div>
            <h3 class="canal-nome">${escapeHTML(canal.nomeCanal)}</h3>
            <span class="canal-professor"><i class="fa-solid fa-chalkboard-user"></i> ${escapeHTML(canal.professor)}</span>
          </div>
          <button type="button" class="btn-canal-favorito ${isFav ? 'ativo' : ''}" onclick="alternarFavoritoCanal('${canal.id}')" title="${isFav ? 'Remover dos favoritos' : 'Favoritar este canal'}">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <!-- Estatísticas e Destaque -->
        <div class="canal-meta-row">
          <span class="canal-inscritos-badge">
            <i class="fa-brands fa-youtube" style="color: #ef4444;"></i> ${canal.inscritos}
          </span>
          <span class="canal-destaque-badge">
            <i class="fa-solid fa-award"></i> ${canal.destaque}
          </span>
        </div>

        <!-- Descrição pedagógica -->
        <p class="canal-descricao">
          ${escapeHTML(canal.descricao)}
        </p>

        <!-- Playlists e tópicos recomendados -->
        <div class="canal-playlists-section">
          <span class="canal-playlists-label"><i class="fa-solid fa-list-check"></i> Playlists e Séries de Ouro:</span>
          <div class="canal-playlists-list">
            ${playlistsHtml}
          </div>
        </div>

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
      </article>
    `;
  }).join('');
}
window.renderizarVideoaulas = renderizarVideoaulas;

// Filtro de Disciplina por botões em pílulas
function filtrarDisciplinaVideoaulas(disciplinaId, btnEl) {
  AppState.videoaulas.filtroDisciplina = disciplinaId;

  // Atualiza classe ativa nos botões
  document.querySelectorAll('.videoaulas-filtro-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.videoaulas-filtro-btn[onclick*="'${disciplinaId}'"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  renderizarVideoaulas();
}
window.filtrarDisciplinaVideoaulas = filtrarDisciplinaVideoaulas;

// Busca de Videoaulas em tempo real
function buscarVideoaulas(termo) {
  AppState.videoaulas.termoBusca = (termo || '').trim();
  const btnLimpar = document.getElementById('btn-limpar-busca-videoaulas');
  if (btnLimpar) {
    btnLimpar.style.display = AppState.videoaulas.termoBusca ? 'flex' : 'none';
  }
  renderizarVideoaulas();
}
window.buscarVideoaulas = buscarVideoaulas;

// Limpar campo de pesquisa
function limparBuscaVideoaulas() {
  const input = document.getElementById('input-busca-videoaulas');
  if (input) input.value = '';
  buscarVideoaulas('');
}
window.limparBuscaVideoaulas = limparBuscaVideoaulas;

// Alternar visualização apenas de favoritos
function alternarFiltroFavoritosCanais(btnEl) {
  AppState.videoaulas.apenasFavoritos = !AppState.videoaulas.apenasFavoritos;
  renderizarVideoaulas();
  if (AppState.videoaulas.apenasFavoritos) {
    if (window.mostrarToast) {
      window.mostrarToast(`Mostrando ${AppState.videoaulas.favoritos.length} canais favoritados.`);
    }
  }
}
window.alternarFiltroFavoritosCanais = alternarFiltroFavoritosCanais;

// Favoritar / Desfavoritar canal individual
function alternarFavoritoCanal(idCanal) {
  const idx = AppState.videoaulas.favoritos.indexOf(idCanal);
  let adicionado = false;
  if (idx >= 0) {
    AppState.videoaulas.favoritos.splice(idx, 1);
  } else {
    AppState.videoaulas.favoritos.push(idCanal);
    adicionado = true;
  }

  try {
    localStorage.setItem('estudamais_canais_favoritos', JSON.stringify(AppState.videoaulas.favoritos));
  } catch (e) {
    console.error('Erro ao salvar favoritos:', e);
  }

  renderizarVideoaulas();

  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    const canalObj = (typeof CANAIS_YOUTUBE_DATA !== 'undefined') ? CANAIS_YOUTUBE_DATA.find(c => c.id === idCanal) : null;
    const nome = canalObj ? canalObj.nomeCanal : 'Canal';
    window.mostrarToast(adicionado ? `❤️ ${nome} adicionado aos seus favoritos!` : `💔 ${nome} removido dos favoritos.`);
  }
}
window.alternarFavoritoCanal = alternarFavoritoCanal;

// Abrir Modal com Player Embutido
function abrirModalPlayerVideo(videoId, titulo, canal, professor, urlCanal) {
  const modal = document.getElementById('modal-video-aula-player');
  const iframe = document.getElementById('video-aula-iframe');
  const elTitulo = document.getElementById('modal-video-titulo');
  const elSubtitulo = document.getElementById('modal-video-subtitulo');
  const elProf = document.getElementById('modal-video-prof');
  const elLinkCanal = document.getElementById('modal-video-link-canal');
  const inputNota = document.getElementById('input-nota-video-rapida');

  if (!modal || !iframe) return;

  AppState.videoaulas.videoAtual = { videoId, titulo, canal, professor, urlCanal };

  if (elTitulo) elTitulo.textContent = titulo || 'Aula em Destaque';
  if (elSubtitulo) elSubtitulo.textContent = `${canal || 'Canal Oficial'}`;
  if (elProf) elProf.textContent = professor || 'Professor';
  if (elLinkCanal && urlCanal) elLinkCanal.href = urlCanal;
  if (inputNota) inputNota.value = '';

  // Carrega vídeo do YouTube embutido (com nocookie para privacidade e segurança)
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
}
window.abrirModalPlayerVideo = abrirModalPlayerVideo;

// Fechar Modal do Player de Vídeo
function fecharModalPlayerVideo() {
  const modal = document.getElementById('modal-video-aula-player');
  const iframe = document.getElementById('video-aula-iframe');

  if (iframe) {
    iframe.src = 'about:blank'; // Interrompe áudio/vídeo imediatamente
  }

  if (modal) {
    modal.classList.remove('active');
  }

  AppState.videoaulas.videoAtual = null;

  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
}
window.fecharModalPlayerVideo = fecharModalPlayerVideo;

// Salvar anotação rápida do vídeo no Bloco de Notas (Caderno do Estudante)
function salvarAnotacaoVideoNoCaderno() {
  const input = document.getElementById('input-nota-video-rapida');
  const texto = (input ? input.value : '').trim();

  if (!texto) {
    if (window.mostrarToast) {
      window.mostrarToast('Digite alguma anotação antes de salvar.', 'erro');
    }
    return;
  }

  const v = AppState.videoaulas.videoAtual;
  const tituloNota = v ? `[Videoaula] ${v.canal} - ${v.titulo}` : `[Videoaula] Anotações`;

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: tituloNota,
    conteudo: texto,
    materia: v ? v.professor : 'Vídeo Aulas',
    data: new Date().toLocaleDateString('pt-BR'),
    cor: '#3b82f6',
    favorita: false
  };

  if (!Array.isArray(AppState.notes)) {
    AppState.notes = [];
  }
  AppState.notes.unshift(novaNota);

  if (typeof salvarNotasStorage === 'function') {
    salvarNotasStorage();
  }
  if (typeof renderizarNotas === 'function') {
    renderizarNotas();
  }

  if (input) input.value = '';
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('📝 Anotação salva com sucesso no seu Bloco de Notas!', 'sucesso');
  }
}
window.salvarAnotacaoVideoNoCaderno = salvarAnotacaoVideoNoCaderno;
'@

$js = $js + "`n" + $videoaulasCode

[System.IO.File]::WriteAllText('js/app.js', $js, [System.Text.Encoding]::UTF8)
Write-Host "js/app.js updated successfully! New length: $($js.Length)"
