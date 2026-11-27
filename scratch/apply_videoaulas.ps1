$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Add nav button to #nav-menu-list right after tab cronograma
$navTarget = @"
            <li>
              <button class="nav-btn" data-tab="cronograma">
                <i class="fa-solid fa-calendar-days"></i>
                <span class="nav-clean-2lines">Cronogramas<br>& Metas</span>
              </button>
            </li>
"@

$navReplacement = @"
            <li>
              <button class="nav-btn" data-tab="cronograma">
                <i class="fa-solid fa-calendar-days"></i>
                <span class="nav-clean-2lines">Cronogramas<br>& Metas</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="videoaulas">
                <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
                <span class="nav-clean-2lines">Vídeo Aulas<br>& Canais</span>
              </button>
            </li>
"@

# 2. Add hero quick action in tab-inicio
$heroTarget = @"
            <button class="btn-hero-secondary" data-goto="cronograma">
              <i class="fa-solid fa-calendar-days"></i>
              <span>Cronograma Semanal</span>
            </button>
"@

$heroReplacement = @"
            <button class="btn-hero-secondary" data-goto="cronograma">
              <i class="fa-solid fa-calendar-days"></i>
              <span>Cronograma Semanal</span>
            </button>
            <button class="btn-hero-secondary" data-goto="videoaulas">
              <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
              <span>Vídeo Aulas & Canais</span>
            </button>
"@

# 3. Add section tab-videoaulas right before </main>
$sectionHtml = @"
    <!-- ========================================================
         SEÇÃO 12: VÍDEO AULAS DO YOUTUBE & MELHORES CANAIS
         ======================================================== -->
    <section id="tab-videoaulas" class="tab-content">
      
      <!-- Banner Hero da Seção de Vídeo Aulas -->
      <div class="videoaulas-hero-card">
        <div class="videoaulas-hero-topo">
          <div class="videoaulas-hero-badges">
            <span class="videoaulas-badge-item"><i class="fa-brands fa-youtube" style="color: #ef4444;"></i> +30 Canais Recomendados</span>
            <span class="videoaulas-badge-item"><i class="fa-solid fa-graduation-cap"></i> 10 Disciplinas dos Vestibulares</span>
            <span class="videoaulas-badge-item"><i class="fa-solid fa-star" style="color: #eab308;"></i> 3 Melhores por Matéria</span>
            <span class="videoaulas-badge-item"><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> 100% Gratuitos</span>
          </div>
          <div class="videoaulas-hero-acoes">
            <button type="button" class="btn-videoaulas-favoritos" id="btn-filtro-favoritos-canais" onclick="alternarFiltroFavoritosCanais(this)" title="Ver apenas canais que favoritei">
              <i class="fa-solid fa-heart" style="color: #ec4899;"></i>
              <span>Meus Canais Favoritos</span>
            </button>
          </div>
        </div>

        <h2 class="videoaulas-hero-titulo">
          Hub de Videoaulas & <span class="highlight">Melhores Canais do YouTube</span> 🎬
        </h2>
        <p class="videoaulas-hero-desc">
          Uma curadoria de excelência com os <strong>3 professores e canais mais renomados e didáticos</strong> para cada disciplina do ENEM, FUVEST, UNICAMP e vestibulares. Acesse aulas completas, resoluções de questões, macetes e maratonas de estudo gratuitas.
        </p>

        <!-- Barra de Busca Rápida de Videoaulas e Professores -->
        <div class="videoaulas-busca-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="input-busca-videoaulas" placeholder="Pesquise por matéria, professor, canal ou assunto (ex: Ferretto, Estequiometria, Jubilut, Redação, Termodinâmica)..." oninput="buscarVideoaulas(this.value)">
          <button type="button" id="btn-limpar-busca-videoaulas" onclick="limparBuscaVideoaulas()" style="display: none;" title="Limpar pesquisa">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Filtros Rápidos de Disciplina em Pílulas -->
      <div class="videoaulas-filtros-bar">
        <div class="videoaulas-filtros-scroll">
          <button type="button" class="videoaulas-filtro-btn active" onclick="filtrarDisciplinaVideoaulas('todas', this)">
            <i class="fa-solid fa-border-all"></i> Todas as Matérias
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('matematica', this)">
            <i class="fa-solid fa-calculator" style="color: #2563eb;"></i> Matemática
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('fisica', this)">
            <i class="fa-solid fa-atom" style="color: #0284c7;"></i> Física
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('quimica', this)">
            <i class="fa-solid fa-flask-vial" style="color: #16a34a;"></i> Química
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('biologia', this)">
            <i class="fa-solid fa-dna" style="color: #059669;"></i> Biologia
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('historia', this)">
            <i class="fa-solid fa-landmark" style="color: #b45309;"></i> História
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('geografia', this)">
            <i class="fa-solid fa-earth-americas" style="color: #0284c7;"></i> Geografia
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('portugues', this)">
            <i class="fa-solid fa-book-open" style="color: #7c3aed;"></i> Português & Literatura
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('redacao', this)">
            <i class="fa-solid fa-feather-pointed" style="color: #be185d;"></i> Redação
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('filosofia', this)">
            <i class="fa-solid fa-brain" style="color: #6366f1;"></i> Filosofia & Sociologia
          </button>
          <button type="button" class="videoaulas-filtro-btn" onclick="filtrarDisciplinaVideoaulas('idiomas', this)">
            <i class="fa-solid fa-language" style="color: #ea580c;"></i> Idiomas
          </button>
        </div>
      </div>

      <!-- Dica Pedagógica de Como Estudar por Videoaulas -->
      <div class="videoaulas-dica-banner">
        <div class="videoaulas-dica-icon">
          <i class="fa-solid fa-lightbulb"></i>
        </div>
        <div class="videoaulas-dica-texto">
          <h4>Dica de Ouro: Como estudar por videoaulas sem ser um espectador passivo</h4>
          <p>Não apenas assista: pause o vídeo antes da resolução dos exercícios e tente resolver por conta própria na nossa <strong>Lousa de Rascunho</strong>. Faça anotações ativas com suas próprias palavras no <strong>Bloco de Notas</strong> e resolva pelo menos 10 questões daquele assunto na nossa <strong>Arena de Quiz</strong>!</p>
        </div>
      </div>

      <!-- Grid dos Canais de Videoaulas -->
      <div class="videoaulas-grid" id="videoaulas-grid">
        <!-- Renderizado dinamicamente via app.js a partir de CANAIS_YOUTUBE_DATA -->
      </div>

    </section>
"@

# 4. Add modal player
$modalHtml = @"

  <!-- ========================================================
       MODAL: PLAYER DE VÍDEO AULA EMBUTIDO COM ANOTAÇÕES
       ======================================================== -->
  <div class="modal-overlay" id="modal-video-aula-player" onclick="if(event.target === this) fecharModalPlayerVideo()">
    <div class="modal-card modal-video-card">
      <div class="modal-header">
        <div class="modal-header-icon" style="background: #ef4444; color: #fff;">
          <i class="fa-brands fa-youtube"></i>
        </div>
        <div class="modal-header-text">
          <h3 id="modal-video-titulo">Aula em Destaque</h3>
          <p id="modal-video-subtitulo">Canal Recomendado</p>
        </div>
        <button type="button" class="modal-btn-close" onclick="fecharModalPlayerVideo()" title="Fechar Player">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body modal-video-body">
        <!-- Container do Vídeo Responsivo -->
        <div class="video-player-wrapper">
          <iframe id="video-aula-iframe" src="" title="Videoaula do YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <!-- Área de Ações e Anotações Rápidas -->
        <div class="video-player-footer">
          <div class="video-player-canal-info">
            <span class="video-badge-canal"><i class="fa-solid fa-chalkboard-user"></i> <strong id="modal-video-prof">Professor</strong></span>
            <a id="modal-video-link-canal" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" class="btn-canal-externo">
              <i class="fa-brands fa-youtube"></i> Acessar Canal Oficial no YouTube ↗
            </a>
          </div>

          <div class="video-quick-notes-box">
            <div class="notes-header-row">
              <label for="input-nota-video-rapida"><i class="fa-solid fa-pen-to-square"></i> Anotações Rápidas desta Aula:</label>
              <button type="button" class="btn-salvar-nota-video" onclick="salvarAnotacaoVideoNoCaderno()">
                <i class="fa-solid fa-floppy-disk"></i> Salvar no meu Bloco de Notas
              </button>
            </div>
            <textarea id="input-nota-video-rapida" rows="3" placeholder="Digite pontos-chave, fórmulas ou dúvidas anotadas durante o vídeo para salvar no seu caderno..."></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
"@

$normHtml = $html.Replace("`r`n", "`n")
$normNavTarget = $navTarget.Replace("`r`n", "`n")
$normNavReplacement = $navReplacement.Replace("`r`n", "`n")
$normHeroTarget = $heroTarget.Replace("`r`n", "`n")
$normHeroReplacement = $heroReplacement.Replace("`r`n", "`n")

if ($normHtml.Contains($normNavTarget)) {
    $normHtml = $normHtml.Replace($normNavTarget, $normNavReplacement)
    Write-Host "Nav button added!"
} else {
    Write-Host "Nav target not found"
}

if ($normHtml.Contains($normHeroTarget)) {
    $normHtml = $normHtml.Replace($normHeroTarget, $normHeroReplacement)
    Write-Host "Hero quick action added!"
} else {
    Write-Host "Hero target not found"
}

$mainEndIdx = $normHtml.LastIndexOf("</main>")
if ($mainEndIdx -ge 0) {
    $normHtml = $normHtml.Insert($mainEndIdx, "$sectionHtml`n")
    Write-Host "Section tab-videoaulas inserted before </main>!"
} else {
    Write-Host "</main> not found"
}

$bodyEndIdx = $normHtml.LastIndexOf("</body>")
if ($bodyEndIdx -ge 0) {
    $normHtml = $normHtml.Insert($bodyEndIdx, "$modalHtml`n")
    Write-Host "Modal player inserted before </body>!"
} else {
    Write-Host "</body> not found"
}

[System.IO.File]::WriteAllText('index_template.html', $normHtml, [System.Text.Encoding]::UTF8)
Write-Host "index_template.html updated successfully!"
