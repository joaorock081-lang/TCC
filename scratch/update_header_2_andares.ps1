$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

$oldHeaderStart = '<header class="site-header">'
$oldHeaderEnd = '</header>'

$posStart = $html.IndexOf($oldHeaderStart)
$posEnd = $html.IndexOf($oldHeaderEnd, $posStart)

$newHeader = @'
  <header class="site-header site-header-2-andares">
    <!-- ANDAR 1 (SUPERIOR): Marca / Logo à esquerda | Ferramentas Rápidas, Temas e Usuário à direita -->
    <div class="header-andar-superior">
      <div class="brand-logo" onclick="mudarAba('inicio')" title="Página Inicial">
        <!-- Logo Oficial Estuda Mais -->
        <div class="logo-icon-box logo-img-box">
          <img src="assets/logo_estudamais.jpg" alt="Estuda Mais" class="logo-img-header" width="46" height="46">
        </div>
        <div class="brand-info">
          <div class="brand-title-row">
            <span class="brand-name">Estuda <span class="brand-accent">Mais</span></span>
            <span class="brand-sparkle">✨</span>
          </div>
          <span class="brand-tagline">Portal do Vestibulando • TCC 🎓</span>
        </div>
      </div>

      <div class="header-actions">
        <!-- Abas Fixas Rápidas: Lousa, Notas, Tutor IA e Foco (Móveis e Flutuantes) -->
        <button type="button" class="btn-header-quick-fixo" onclick="alternarJanelaFlutuante('lousa')" title="Abrir Lousa de Contas & Cálculos Móvel">
          <i class="fa-solid fa-pen-ruler" style="color: #0284c7;"></i>
          <span>Lousa</span>
        </button>
        <button type="button" class="btn-header-quick-fixo" onclick="alternarJanelaFlutuante('notas')" title="Abrir Bloco de Anotações Móvel">
          <i class="fa-solid fa-pen-to-square" style="color: #7c3aed;"></i>
          <span>Notas</span>
        </button>
        <button type="button" class="btn-header-quick-fixo btn-header-ia" onclick="alternarJanelaFlutuante('ia')" title="Abrir Tutor IA & Gemini Móvel">
          <i class="fa-solid fa-robot" style="color: #3b82f6;"></i>
          <span>Tutor IA</span>
        </button>
        <button type="button" class="btn-header-quick-fixo btn-header-foco" onclick="alternarJanelaFlutuante('foco')" title="Abrir Foco Pomodoro & Sons Ambientes Móvel">
          <i class="fa-solid fa-fire" style="color: #f97316;"></i>
          <span>Foco</span>
        </button>

        <span class="header-divider-v"></span>

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
        <div class="header-user-area" id="header-user-area">
          <button class="btn-header-auth" onclick="abrirModalAuth('login')" title="Entrar ou criar conta">
            <i class="fa-solid fa-user-lock"></i>
            <span>Entrar / Cadastrar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ANDAR 2 (INFERIOR): Barra de Abas Completa e Espaçosa com Rolagem -->
    <div class="header-andar-inferior">
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
        <button type="button" class="nav-scroll-btn prev visible" id="nav-btn-prev" onclick="rolarMenuNav(-200)" title="Rolar abas para a esquerda" aria-label="Rolar abas para a esquerda">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Abas Principais em Linha Direta com Rolagem Ampla -->
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
              <button type="button" class="nav-btn" data-tab="ferramentas" onclick="mudarAba('ferramentas')">
                <i class="fa-solid fa-fire" style="color: #f97316;"></i>
                <span>Foco & Pomodoro</span>
              </button>
            </li>
            <li>
              <button type="button" class="nav-btn" data-tab="notas" onclick="mudarAba('notas')">
                <i class="fa-solid fa-book"></i>
                <span>Caderno</span>
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
        <button type="button" class="nav-scroll-btn next visible" id="nav-btn-next" onclick="rolarMenuNav(200)" title="Rolar abas para a direita" aria-label="Rolar abas para a direita">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </header>
'@

if ($posStart -ge 0 -and $posEnd -gt $posStart) {
  $html = $html.Substring(0, $posStart) + $newHeader + $html.Substring($posEnd + $oldHeaderEnd.Length)
  [System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
  Write-Host "Updated index_template.html with 2-andares header!"
} else {
  Write-Host "Header boundaries not found in index_template.html!"
}
