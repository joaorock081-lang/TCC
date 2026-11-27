$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Replace nav-carousel and header buttons
$targetHeader = @'
      <!-- Barra de Navegação Horizontal Dinâmica & Animada com Rolagem Fluida -->
      <div class="nav-carousel-wrapper">
        <button class="nav-scroll-btn prev" id="nav-btn-prev" onclick="rolarMenuNav(-180)" title="Rolar abas para a esquerda" aria-label="Rolar abas para a esquerda">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <nav class="nav-scroll-container" id="nav-scroll-container">
          <ul class="nav-menu" id="nav-menu-list">
            <li>
              <button class="nav-btn active" data-tab="inicio">
                <i class="fa-solid fa-house"></i>
                <span>Início</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="vestibulares">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Vestibulares</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="simulados">
                <i class="fa-solid fa-file-signature"></i>
                <span>Simulados</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="redacao">
                <i class="fa-solid fa-feather-pointed"></i>
                <span class="nav-clean-2lines">Redação<br>& IA</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="quiz">
                <i class="fa-solid fa-gamepad"></i>
                <span>Quiz</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="notas">
                <i class="fa-solid fa-pen-to-square"></i>
                <span class="nav-clean-2lines">Bloco de<br>Notas</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="ferramentas">
                <i class="fa-solid fa-stopwatch"></i>
                <span>Foco</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="dicas">
                <i class="fa-solid fa-lightbulb"></i>
                <span>Dicas</span>
              </button>
            </li>
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
            <li>
              <button class="nav-btn" data-tab="chat-ia">
                <i class="fa-solid fa-brain-circuit"></i>
                <span class="nav-clean-2lines">Tutor IA<br>& Gemini</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="perfil">
                <i class="fa-solid fa-user-graduate"></i>
                <span class="nav-clean-2lines">Meu Perfil<br>& Carreira</span>
              </button>
            </li>
          </ul>
        </nav>

        <button class="nav-scroll-btn next" id="nav-btn-next" onclick="rolarMenuNav(180)" title="Rolar abas para a direita" aria-label="Rolar abas para a direita">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
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

        <button class="btn-header-scratchpad" onclick="alternarLousaRascunho()" title="Abrir Lousa para Rabiscar e Fazer Contas">
          <i class="fa-solid fa-pen-ruler"></i>
          <span>Lousa de Contas</span>
        </button>
        <button class="btn-header-cta" onclick="abrirModalNovaNota()">
          <i class="fa-solid fa-plus"></i>
          <span>Nova Nota</span>
        </button>
        <button class="btn-header-tour" onclick="abrirTourSlides(true)" title="Ver Apresentação e Tour das Funções do Site" aria-label="Tour do Site">
          <i class="fa-solid fa-play"></i>
          <span>Tour do Site</span>
        </button>

        <!-- Área de Usuário / Login / Cadastro -->
'@

$replaceHeader = @'
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

if ($html.Contains($targetHeader)) {
  $html = $html.Replace($targetHeader, $replaceHeader)
  Write-Host "Header nav replaced successfully."
} else {
  Write-Host "Target header not found!"
}

# 2. Add #modal-menu-abas before </body>
$modalMenuAbas = @'
  <!-- ========================================================
       MODAL: CENTRAL DE ABAS AGRUPADAS (MENU COM 3 LISTRAS ☰)
       ======================================================== -->
  <div class="modal-overlay" id="modal-menu-abas" onclick="if(event.target === this) fecharModalMenuAbas()">
    <div class="modal-card modal-menu-abas-card">
      <div class="modal-header">
        <div class="modal-header-icon" style="background: var(--primary-accent, #2563eb); color: #fff;">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="modal-header-text">
          <h3>Central de Abas & Grupos de Estudo</h3>
          <p>Todas as ferramentas e matérias organizadas para sua preparação</p>
        </div>
        <button type="button" class="modal-btn-close" onclick="fecharModalMenuAbas()" title="Fechar Menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body modal-menu-abas-body">
        <!-- Busca rápida no menu -->
        <div class="menu-abas-busca-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="input-busca-abas-menu" placeholder="Filtrar abas, matérias ou ferramentas (ex: Simulado, Vídeo, Lousa, Redação)..." oninput="filtrarAbasNoMenu(this.value)">
        </div>

        <!-- Grid de Grupos -->
        <div class="menu-abas-grupos-grid" id="menu-abas-grupos-grid">
          <!-- Grupo 1: Conteúdos & Aulas -->
          <div class="menu-aba-grupo-bloco">
            <div class="grupo-bloco-titulo">
              <i class="fa-solid fa-graduation-cap" style="color: #2563eb;"></i>
              <h4>Conteúdos & Aulas</h4>
            </div>
            <div class="grupo-bloco-itens">
              <button type="button" class="menu-aba-item-card" data-tab-alvo="inicio" onclick="mudarAba('inicio'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
                  <i class="fa-solid fa-house"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Início / Dashboard</strong>
                  <span>Visão geral do progresso, atalhos e frase do dia</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="vestibulares" onclick="mudarAba('vestibulares'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
                  <i class="fa-solid fa-book-bookmark"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Vestibulares & Matérias</strong>
                  <span>ENEM, FUVEST, FATEC, FSA, UNICAMP com edital completo</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="videoaulas" onclick="mudarAba('videoaulas'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(239, 68, 68, 0.12); color: #ef4444;">
                  <i class="fa-brands fa-youtube"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Vídeo Aulas & Melhores Canais</strong>
                  <span>3 professores recomendados por matéria + player embutido</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="dicas" onclick="mudarAba('dicas'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(234, 179, 8, 0.12); color: #eab308;">
                  <i class="fa-solid fa-lightbulb"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Dicas & Métodos de Estudo</strong>
                  <span>Técnicas de memorização, revisão espaçada e rotina</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Grupo 2: Prática & Simulados -->
          <div class="menu-aba-grupo-bloco">
            <div class="grupo-bloco-titulo">
              <i class="fa-solid fa-pencil" style="color: #be185d;"></i>
              <h4>Prática & Treino</h4>
            </div>
            <div class="grupo-bloco-itens">
              <button type="button" class="menu-aba-item-card" data-tab-alvo="simulados" onclick="mudarAba('simulados'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
                  <i class="fa-solid fa-file-signature"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Simulados Oficiais</strong>
                  <span>Treine no formato real com tempo cronometrado e gabarito</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="redacao" onclick="mudarAba('redacao'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(190, 24, 93, 0.12); color: #be185d;">
                  <i class="fa-solid fa-feather-pointed"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Redação & Corretor IA</strong>
                  <span>Espelho oficial ENEM com correção em 5 competências</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="quiz" onclick="mudarAba('quiz'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(16, 185, 129, 0.12); color: #10b981;">
                  <i class="fa-solid fa-gamepad"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Quiz & Exercícios de Fixação</strong>
                  <span>Perguntas rápidas com pontuação de XP e ranking</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Grupo 3: Organização & Ferramentas -->
          <div class="menu-aba-grupo-bloco">
            <div class="grupo-bloco-titulo">
              <i class="fa-solid fa-calendar-check" style="color: #0284c7;"></i>
              <h4>Organização & Ferramentas</h4>
            </div>
            <div class="grupo-bloco-itens">
              <button type="button" class="menu-aba-item-card" data-tab-alvo="cronograma" onclick="mudarAba('cronograma'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(2, 132, 199, 0.12); color: #0284c7;">
                  <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Cronogramas & Metas</strong>
                  <span>Planejamento semanal inteligente criado por IA ou manual</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="notas" onclick="mudarAba('notas'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(124, 58, 237, 0.12); color: #7c3aed;">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Bloco de Notas / Caderno</strong>
                  <span>Seus resumos, fórmulas e anotações salvos por matéria</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="ferramentas" onclick="mudarAba('ferramentas'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(234, 88, 12, 0.12); color: #ea580c;">
                  <i class="fa-solid fa-stopwatch"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Foco & Pomodoro</strong>
                  <span>Temporizador com sons de chuva, cafeteria e biblioteca</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" onclick="alternarLousaRascunho(); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(16, 185, 129, 0.12); color: #10b981;">
                  <i class="fa-solid fa-pen-ruler"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Lousa de Contas (Rascunho)</strong>
                  <span>Rabisco digital para cálculos e resoluções rápidas</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Grupo 4: Inteligência & Recursos -->
          <div class="menu-aba-grupo-bloco">
            <div class="grupo-bloco-titulo">
              <i class="fa-solid fa-brain-circuit" style="color: #6366f1;"></i>
              <h4>Inteligência & Recursos</h4>
            </div>
            <div class="grupo-bloco-itens">
              <button type="button" class="menu-aba-item-card" data-tab-alvo="chat-ia" onclick="mudarAba('chat-ia'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(99, 102, 241, 0.12); color: #6366f1;">
                  <i class="fa-solid fa-brain-circuit"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Tutor IA & Gemini</strong>
                  <span>Tire dúvidas, peça resumos, pesquisas e resoluções</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" data-tab-alvo="perfil" onclick="mudarAba('perfil'); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
                  <i class="fa-solid fa-user-graduate"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Meu Perfil & Carreira</strong>
                  <span>Vestibular alvo, curso dos sonhos, progresso e conquistas</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" onclick="abrirModalCores(); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(234, 179, 8, 0.12); color: #ca8a04;">
                  <i class="fa-solid fa-palette"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Personalizar Cores</strong>
                  <span>Escolha entre 30+ tons e modo descanso (luz amarela)</span>
                </div>
              </button>
              <button type="button" class="menu-aba-item-card" onclick="abrirTourSlides(true); fecharModalMenuAbas();">
                <div class="menu-item-icon" style="background: rgba(236, 72, 153, 0.12); color: #ec4899;">
                  <i class="fa-solid fa-play"></i>
                </div>
                <div class="menu-item-desc">
                  <strong>Tour Interativo do Site</strong>
                  <span>Guia passo a passo para aproveitar ao máximo a plataforma</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
'@

$html = $html.Replace('</body>', $modalMenuAbas)

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
Write-Host "index_template.html updated with grouped navigation and modal menu!"
