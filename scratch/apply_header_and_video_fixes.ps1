$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Add meta referrer in head if not present
$metaSearch = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">'
$metaReplace = @'
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
'@
if (-not $html.Contains('name="referrer"')) {
  $html = $html.Replace($metaSearch, $metaReplace)
  Write-Host "Added meta referrer to head."
}

# 2. Update Header: Add scroll arrows, full tabs list, and replace Ferramentas with Lousa, Notas, Tutor IA
$targetHeaderNav = @'
      <!-- Barra de Navegação Superior Otimizada com Menu de 3 Listras (☰) -->
      <div class="nav-grouped-wrapper">
        <!-- Botão com as 3 Listras Clássicas (☰) em Alto Contraste & Destaque -->
        <button type="button" class="btn-menu-hamburguer" id="btn-menu-hamburguer" onclick="alternarModalMenuAbas()" title="Ver todas as abas organizadas em grupos (☰)" aria-label="Menu de Abas">
          <span class="icone-hamburguer-listras" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="texto-menu-hamburguer">Todas as Abas</span>
        </button>

        <!-- Abas Principais em Linha Direta (Sem menus suspensos colidindo) -->
        <nav class="nav-scroll-container" id="nav-scroll-container">
          <ul class="nav-menu" id="nav-menu-list">
            <li>
              <button type="button" class="nav-btn active" data-tab="inicio" onclick="mudarAba('inicio')">
                <i class="fa-solid fa-house"></i>
                <span>Início</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="vestibulares" onclick="mudarAba('vestibulares')">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Vestibulares</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="videoaulas" onclick="mudarAba('videoaulas')">
                <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
                <span>Vídeo Aulas</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="simulados" onclick="mudarAba('simulados')">
                <i class="fa-solid fa-file-signature"></i>
                <span>Simulados</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="cronograma" onclick="mudarAba('cronograma')">
                <i class="fa-solid fa-calendar-days"></i>
                <span>Cronograma</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="chat-ia" onclick="mudarAba('chat-ia')">
                <i class="fa-solid fa-brain-circuit"></i>
                <span>Tutor IA</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header-actions">
        <!-- Alternador Rápido Claro / Escuro / Descanso -->
        <button class="btn-header-theme-toggle" id="btn-theme-toggle" onclick="alternarModoEscuro()" title="Alternar Modo Claro / Escuro" aria-label="Modo Claro ou Escuro">
          <i class="fa-solid fa-moon" id="icon-theme-toggle"></i>
        </button>

        <!-- Seletor de Cores do Tema -->
        <button class="btn-header-palette" onclick="abrirModalCores()" title="Personalizar Cores do Tema" aria-label="Cores do Tema">
          <i class="fa-solid fa-palette"></i>
          <span>Cores</span>
        </button>

        <!-- Botão Direto para Abrir Central de Ferramentas & Todas as Abas -->
        <button type="button" class="btn-header-ferramentas" id="btn-header-ferramentas" onclick="alternarModalMenuAbas()" title="Ver ferramentas e todas as abas">
          <i class="fa-solid fa-toolbox"></i>
          <span>Ferramentas</span>
        </button>

        <!-- Área de Usuário / Login / Cadastro -->
'@

$replaceHeaderNav = @'
      <!-- Barra de Navegação com Menu de 3 Listras (☰) e Setas de Rolagem Fluida -->
      <div class="nav-grouped-wrapper">
        <!-- Botão com as 3 Listras Clássicas (☰) em Alto Contraste & Destaque -->
        <button type="button" class="btn-menu-hamburguer" id="btn-menu-hamburguer" onclick="alternarModalMenuAbas()" title="Ver todas as abas organizadas em grupos (☰)" aria-label="Menu de Abas">
          <span class="icone-hamburguer-listras" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="texto-menu-hamburguer">Todas as Abas</span>
        </button>

        <!-- Seta Esquerda para Rolar Abas -->
        <button type="button" class="nav-scroll-btn prev visible" id="nav-btn-prev" onclick="rolarMenuNav(-180)" title="Rolar abas para a esquerda" aria-label="Rolar abas para a esquerda">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Abas Principais em Linha Direta com Rolagem -->
        <nav class="nav-scroll-container" id="nav-scroll-container">
          <ul class="nav-menu" id="nav-menu-list">
            <li>
              <button type="button" class="nav-btn active" data-tab="inicio" onclick="mudarAba('inicio')">
                <i class="fa-solid fa-house"></i>
                <span>Início</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="vestibulares" onclick="mudarAba('vestibulares')">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Vestibulares</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="videoaulas" onclick="mudarAba('videoaulas')">
                <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
                <span>Vídeo Aulas</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="simulados" onclick="mudarAba('simulados')">
                <i class="fa-solid fa-file-signature"></i>
                <span>Simulados</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="redacao" onclick="mudarAba('redacao')">
                <i class="fa-solid fa-feather-pointed"></i>
                <span>Redação</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="quiz" onclick="mudarAba('quiz')">
                <i class="fa-solid fa-gamepad"></i>
                <span>Quiz</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="cronograma" onclick="mudarAba('cronograma')">
                <i class="fa-solid fa-calendar-days"></i>
                <span>Cronograma</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="dicas" onclick="mudarAba('dicas')">
                <i class="fa-solid fa-lightbulb"></i>
                <span>Dicas</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="perfil" onclick="mudarAba('perfil')">
                <i class="fa-solid fa-user-graduate"></i>
                <span>Perfil</span>
              </button>
            </li>
          </ul>
        </nav>

        <!-- Seta Direita para Rolar Abas -->
        <button type="button" class="nav-scroll-btn next visible" id="nav-btn-next" onclick="rolarMenuNav(180)" title="Rolar abas para a direita" aria-label="Rolar abas para a direita">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="header-actions">
        <!-- Abas Fixas Rápidas Solicitadas: Lousa, Bloco de Notas e Tutor IA -->
        <button type="button" class="btn-header-quick-fixo" onclick="alternarLousaRascunho()" title="Abrir Lousa de Contas & Cálculos">
          <i class="fa-solid fa-pen-ruler" style="color: #0284c7;"></i>
          <span>Lousa</span>
        </button>
        <button type="button" class="btn-header-quick-fixo" onclick="mudarAba('notas')" title="Acessar Bloco de Notas">
          <i class="fa-solid fa-pen-to-square" style="color: #7c3aed;"></i>
          <span>Notas</span>
        </button>
        <button type="button" class="btn-header-quick-fixo btn-header-ia" onclick="mudarAba('chat-ia')" title="Conversar com o Tutor IA & Gemini">
          <i class="fa-solid fa-brain-circuit" style="color: #3b82f6;"></i>
          <span>Tutor IA</span>
        </button>

        <!-- Alternador Rápido Claro / Escuro / Descanso -->
        <button class="btn-header-theme-toggle" id="btn-theme-toggle" onclick="alternarModoEscuro()" title="Alternar Modo Claro / Escuro" aria-label="Modo Claro ou Escuro">
          <i class="fa-solid fa-moon" id="icon-theme-toggle"></i>
        </button>

        <!-- Seletor de Cores do Tema -->
        <button class="btn-header-palette" onclick="abrirModalCores()" title="Personalizar Cores do Tema" aria-label="Cores do Tema">
          <i class="fa-solid fa-palette"></i>
          <span>Cores</span>
        </button>

        <!-- Área de Usuário / Login / Cadastro -->
'@

if ($html.Contains($targetHeaderNav)) {
  $html = $html.Replace($targetHeaderNav, $replaceHeaderNav)
  Write-Host "Updated header with arrows, full tabs and fixed Lousa/Notas/Tutor IA!"
} else {
  Write-Host "Target header nav not found!"
}

# 3. Update top video player iframe with referrerpolicy and add YouTube direct button
$targetVideoIframe = @'
          <!-- Iframe do Vídeo -->
          <div class="video-player-wrapper-topo">
            <iframe id="iframe-video-player-topo" src="" title="Videoaula do YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
'@

$replaceVideoIframe = @'
          <!-- Iframe do Vídeo com Referrer Policy para Evitar Erro 153 -->
          <div class="video-player-wrapper-topo">
            <iframe id="iframe-video-player-topo" src="" title="Videoaula do YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
'@

if ($html.Contains($targetVideoIframe)) {
  $html = $html.Replace($targetVideoIframe, $replaceVideoIframe)
  Write-Host "Updated video player iframe with referrerpolicy!"
} else {
  Write-Host "Target video iframe not found!"
}

# 4. Add direct YouTube button in video toolbar
$targetVideoToolbar = @'
              <button type="button" class="btn-fechar-video-topo" onclick="fecharVideoPersonalizadoTopo()" title="Fechar vídeo e parar reprodução">
                <i class="fa-solid fa-stop"></i> <span>Parar Vídeo</span>
              </button>
'@

$replaceVideoToolbar = @'
              <a id="btn-link-externo-video-topo" href="#" target="_blank" rel="noopener noreferrer" class="btn-video-tab-tool" title="Assistir diretamente no site do YouTube">
                <i class="fa-brands fa-youtube" style="color: #ef4444;"></i> <span>Abrir no YouTube ↗</span>
              </a>
              <button type="button" class="btn-fechar-video-topo" onclick="fecharVideoPersonalizadoTopo()" title="Fechar vídeo e parar reprodução">
                <i class="fa-solid fa-stop"></i> <span>Parar Vídeo</span>
              </button>
'@

if ($html.Contains($targetVideoToolbar)) {
  $html = $html.Replace($targetVideoToolbar, $replaceVideoToolbar)
  Write-Host "Added direct YouTube button to video toolbar!"
} else {
  Write-Host "Target video toolbar not found!"
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
