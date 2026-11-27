$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# Replace nav-grouped-wrapper and header-actions with clean, non-overflowing version
$targetHeader = @'
      <!-- Barra de Navegação Horizontal Agrupada com Botão de 3 Listras (☰) -->
      <div class="nav-grouped-wrapper" style="display: flex; align-items: center; gap: 0.65rem;">
        <!-- Botão com as 3 Listras Clássicas (☰) para Visualizar Todas as Abas Agrupadas -->
        <button type="button" class="btn-menu-hamburguer" id="btn-menu-hamburguer" onclick="alternarModalMenuAbas()" title="Ver todas as abas agrupadas (☰)" aria-label="Menu de Abas">
          <span class="icone-hamburguer-listras" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="texto-menu-hamburguer">Todas as Abas</span>
        </button>

        <!-- Menu Superior por Grupos Organizados -->
        <nav class="nav-scroll-container" id="nav-scroll-container">
          <ul class="nav-menu" id="nav-menu-list">
            <li>
              <button class="nav-btn active" data-tab="inicio" onclick="mudarAba('inicio')">
                <i class="fa-solid fa-house"></i>
                <span>Início</span>
              </button>
            </li>

            <!-- Grupo 1: Conteúdos & Aulas ▾ -->
            <li class="nav-group-item" data-group="conteudos">
              <button type="button" class="nav-btn nav-group-btn" onclick="toggleDropdownNavGroup(event, 'conteudos')">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Conteúdos</span>
                <i class="fa-solid fa-chevron-down flecha-grupo"></i>
              </button>
              <div class="nav-group-dropdown" id="dropdown-group-conteudos">
                <button type="button" class="nav-group-subitem" data-tab="vestibulares" onclick="mudarAba('vestibulares'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(37, 99, 235, 0.15); color: #2563eb;">
                    <i class="fa-solid fa-book-bookmark"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Vestibulares & Matérias</strong>
                    <span>ENEM, FUVEST, FATEC, FSA e mais</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="videoaulas" onclick="mudarAba('videoaulas'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">
                    <i class="fa-brands fa-youtube"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Vídeo Aulas & Canais</strong>
                    <span>3 melhores canais por matéria</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="dicas" onclick="mudarAba('dicas'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(234, 179, 8, 0.15); color: #eab308;">
                    <i class="fa-solid fa-lightbulb"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Dicas de Estudo</strong>
                    <span>Técnicas e métodos pedagógicos</span>
                  </div>
                </button>
              </div>
            </li>

            <!-- Grupo 2: Prática & Treino ▾ -->
            <li class="nav-group-item" data-group="pratica">
              <button type="button" class="nav-btn nav-group-btn" onclick="toggleDropdownNavGroup(event, 'pratica')">
                <i class="fa-solid fa-pencil"></i>
                <span>Prática</span>
                <i class="fa-solid fa-chevron-down flecha-grupo"></i>
              </button>
              <div class="nav-group-dropdown" id="dropdown-group-pratica">
                <button type="button" class="nav-group-subitem" data-tab="simulados" onclick="mudarAba('simulados'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(37, 99, 235, 0.15); color: #2563eb;">
                    <i class="fa-solid fa-file-signature"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Simulados Oficiais</strong>
                    <span>Provas com tempo e gabarito</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="redacao" onclick="mudarAba('redacao'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(190, 24, 93, 0.15); color: #be185d;">
                    <i class="fa-solid fa-feather-pointed"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Redação & Corretor IA</strong>
                    <span>Espelho ENEM e nota instantânea</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="quiz" onclick="mudarAba('quiz'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                    <i class="fa-solid fa-gamepad"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Quiz & Exercícios</strong>
                    <span>Desafios rápidos com pontos de XP</span>
                  </div>
                </button>
              </div>
            </li>

            <!-- Grupo 3: Organização & Foco ▾ -->
            <li class="nav-group-item" data-group="organizacao">
              <button type="button" class="nav-btn nav-group-btn" onclick="toggleDropdownNavGroup(event, 'organizacao')">
                <i class="fa-solid fa-calendar-check"></i>
                <span>Organização</span>
                <i class="fa-solid fa-chevron-down flecha-grupo"></i>
              </button>
              <div class="nav-group-dropdown" id="dropdown-group-organizacao">
                <button type="button" class="nav-group-subitem" data-tab="cronograma" onclick="mudarAba('cronograma'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(2, 132, 199, 0.15); color: #0284c7;">
                    <i class="fa-solid fa-calendar-days"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Cronogramas & Metas</strong>
                    <span>Grade semanal personalizada</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="notas" onclick="mudarAba('notas'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(124, 58, 237, 0.15); color: #7c3aed;">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Bloco de Notas</strong>
                    <span>Resumos e fórmulas salvas</span>
                  </div>
                </button>
                <button type="button" class="nav-group-subitem" data-tab="ferramentas" onclick="mudarAba('ferramentas'); fecharTodosDropdowns();">
                  <div class="subitem-icon" style="background: rgba(234, 88, 12, 0.15); color: #ea580c;">
                    <i class="fa-solid fa-stopwatch"></i>
                  </div>
                  <div class="subitem-texto">
                    <strong>Foco & Pomodoro</strong>
                    <span>Timer e sons de chuva/cafeteria</span>
                  </div>
                </button>
              </div>
            </li>

            <!-- Tutor IA -->
            <li>
              <button class="nav-btn" data-tab="chat-ia" onclick="mudarAba('chat-ia')">
                <i class="fa-solid fa-brain-circuit"></i>
                <span>Tutor IA</span>
              </button>
            </li>

            <!-- Meu Perfil -->
            <li>
              <button class="nav-btn" data-tab="perfil" onclick="mudarAba('perfil')">
                <i class="fa-solid fa-user-graduate"></i>
                <span>Perfil</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header-actions">
        <!-- Alternador Rápido Claro / Escuro -->
        <button class="btn-header-theme-toggle" id="btn-theme-toggle" onclick="alternarModoEscuro()" title="Alternar Modo Claro / Escuro" aria-label="Modo Claro ou Escuro">
          <i class="fa-solid fa-moon" id="icon-theme-toggle"></i>
        </button>

        <!-- Seletor de Cores do Tema -->
        <button class="btn-header-palette" onclick="abrirModalCores()" title="Personalizar Cores do Tema" aria-label="Cores do Tema">
          <i class="fa-solid fa-palette"></i>
          <span>Cores</span>
        </button>

        <!-- Dropdown de Ferramentas Agrupadas (Lousa de Contas, Nova Nota, Tour do Site) -->
        <div class="header-dropdown-wrapper" id="wrapper-dropdown-ferramentas">
          <button type="button" class="btn-header-ferramentas" id="btn-header-ferramentas" onclick="toggleDropdownFerramentas(event)" title="Acessar Lousa de Contas, Nova Nota e Tour">
            <i class="fa-solid fa-toolbox"></i>
            <span>Ferramentas</span>
            <i class="fa-solid fa-chevron-down flecha-dropdown"></i>
          </button>
          <div class="header-dropdown-menu" id="dropdown-menu-ferramentas">
            <button type="button" class="header-dropdown-item" onclick="alternarLousaRascunho(); fecharTodosDropdowns();">
              <i class="fa-solid fa-pen-ruler" style="color: #0284c7;"></i>
              <div class="dropdown-item-info">
                <strong>Lousa de Contas</strong>
                <span>Rascunho interativo para cálculos</span>
              </div>
            </button>
            <button type="button" class="header-dropdown-item" onclick="abrirModalNovaNota(); fecharTodosDropdowns();">
              <i class="fa-solid fa-plus" style="color: #10b981;"></i>
              <div class="dropdown-item-info">
                <strong>Nova Nota</strong>
                <span>Adicionar anotação rápida ao caderno</span>
              </div>
            </button>
            <button type="button" class="header-dropdown-item" onclick="abrirTourSlides(true); fecharTodosDropdowns();">
              <i class="fa-solid fa-play" style="color: #ec4899;"></i>
              <div class="dropdown-item-info">
                <strong>Tour do Site</strong>
                <span>Apresentação das funções</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Área de Usuário / Login / Cadastro -->
'@

$replaceHeader = @'
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

if ($html.Contains($targetHeader)) {
  $html = $html.Replace($targetHeader, $replaceHeader)
  Write-Host "Header nav cleanly replaced!"
} else {
  Write-Host "Target header not found for replacement!"
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
