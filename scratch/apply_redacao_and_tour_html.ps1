$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Update Redação theme selector bar
$oldRedacaoSelect = @'
        <div class="redacao-seletor-row">
          <label for="redacao-select-tema" class="redacao-select-label">
            <i class="fa-solid fa-bookmark"></i> Escolha a Proposta de Redação:
          </label>
          <div class="redacao-select-wrapper">
            <select id="redacao-select-tema" class="form-select redacao-select">
              <!-- Preenchido via app.js -->
            </select>
          </div>
        </div>
'@

$newRedacaoSelect = @'
        <!-- Barra Moderna de Escolha de Tema & Criação com IA -->
        <div class="redacao-seletor-moderno">
          <div class="redacao-seletor-top-row">
            <div class="redacao-seletor-info-box">
              <span class="redacao-kicker"><i class="fa-solid fa-bookmark"></i> Proposta Atual Selecionada:</span>
              <span class="redacao-tema-atual-nome" id="redacao-tema-selecionado-texto">Carregando tema oficial...</span>
            </div>
            <div class="redacao-seletor-botoes-acao">
              <button type="button" class="btn-abrir-catalogo-temas" onclick="abrirCatalogoTemasRedacao()" title="Navegar e pesquisar todos os temas disponíveis">
                <i class="fa-solid fa-layer-group"></i> <span>Explorar & Trocar Tema</span>
              </button>
              <button type="button" class="btn-criar-tema-gemini" onclick="abrirModalCriarTemaRedacao()" title="Criar um tema personalizado e gerar textos motivadores com Gemini">
                <i class="fa-solid fa-wand-magic-sparkles"></i> <span>Criar Tema com IA (Gemini)</span>
              </button>
            </div>
          </div>

          <!-- Select nativo mantido oculto para sincronia completa de scripts -->
          <select id="redacao-select-tema" class="form-select redacao-select" style="display: none;">
            <!-- Preenchido via app.js -->
          </select>
        </div>
'@

if ($html.Contains($oldRedacaoSelect)) {
  $html = $html.Replace($oldRedacaoSelect, $newRedacaoSelect)
  Write-Host "Updated redacao selector bar!"
}

# 2. Update Tour step counter in header
$html = $html.Replace('<span id="tour-step-counter">Slide 1 de 6</span>', '<span id="tour-step-counter">Slide 1 de 8</span>')

# 3. Add Tour slides 7 & 8 before </div></div><!-- Rodapé com Navegação dos Slides -->
$oldSlide6End = @'
              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                  <i class="fa-solid fa-key"></i>
                </div>
                <h4>Conexão Fácil com sua API</h4>
                <p>Você pode conectar sua chave gratuita do <strong>Google AI Studio</strong> para correções ilimitadas e instantâneas!</p>
              </div>
            </div>
          </div>
'@

$newSlides78 = @'
              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                  <i class="fa-solid fa-key"></i>
                </div>
                <h4>Conexão Fácil com sua API</h4>
                <p>Você pode conectar sua chave gratuita do <strong>Google AI Studio</strong> para correções ilimitadas e instantâneas!</p>
              </div>
            </div>
          </div>

          <!-- SLIDE 7: JANELAS FLUTUANTES MÓVEIS (MULTITAREFA NA TELA) -->
          <div class="tour-slide-item" data-slide-index="7">
            <div class="tour-slide-hero">
              <div class="tour-icon-glowing" style="background: rgba(59, 130, 246, 0.18); color: #3b82f6;">
                <i class="fa-solid fa-up-down-left-right"></i>
              </div>
              <div class="tour-hero-info">
                <span class="tour-kicker">Nova Experiência Multitarefa ✨</span>
                <h2 class="tour-slide-title">Janelas Flutuantes <span>Móveis na Tela</span></h2>
                <p class="tour-slide-desc">Estude sem interrupções! Arraste a <strong>Lousa</strong>, o <strong>Tutor IA</strong>, o <strong>Bloco de Notas</strong> e o <strong>Foco Pomodoro</strong> livremente pela tela enquanto assiste a vídeo aulas ou resolve simulados.</p>
              </div>
            </div>

            <div class="tour-cards-grid">
              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(2, 132, 199, 0.15); color: #0284c7;">
                  <i class="fa-solid fa-pen-ruler"></i>
                </div>
                <h4>Lousa Móvel Livre</h4>
                <p>Faça cálculos e rabiscos em cima de qualquer tela, redimensione e minimize com um clique.</p>
              </div>

              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(99, 102, 241, 0.15); color: #6366f1;">
                  <i class="fa-solid fa-robot"></i>
                </div>
                <h4>Tutor IA em Janela</h4>
                <p>Tire dúvidas pontuais sem sair da aula do YouTube ou da folha de exercícios.</p>
              </div>

              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(249, 115, 22, 0.15); color: #f97316;">
                  <i class="fa-solid fa-fire"></i>
                </div>
                <h4>Timer de Foco Flutuante</h4>
                <p>Acompanhe seu tempo de estudo e controle sons relaxantes direto na barra flutuante.</p>
              </div>
            </div>
          </div>

          <!-- SLIDE 8: CENTRAL DE VÍDEO AULAS & SONS DE FOCO COM VOLUME -->
          <div class="tour-slide-item" data-slide-index="8">
            <div class="tour-slide-hero">
              <div class="tour-icon-glowing" style="background: rgba(239, 68, 68, 0.18); color: #ef4444;">
                <i class="fa-solid fa-headphones"></i>
              </div>
              <div class="tour-hero-info">
                <span class="tour-kicker">Aulas & Concentração Perfeita 🎧</span>
                <h2 class="tour-slide-title">Vídeo Aulas & <span>Sons Ambientes</span></h2>
                <p class="tour-slide-desc">Acesse os melhores canais do YouTube por matéria, cole qualquer link para assistir integrado com lousa de contas e estude ouvindo <strong>Ruído Marrom, Chuva Suave e Ondas Alfa</strong> com controle de volume!</p>
              </div>
            </div>

            <div class="tour-cards-grid">
              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">
                  <i class="fa-brands fa-youtube"></i>
                </div>
                <h4>3 Professores por Matéria</h4>
                <p>Recomendações dos maiores educadores do Brasil organizadas por disciplina.</p>
              </div>

              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(14, 165, 233, 0.15); color: #0ea5e9;">
                  <i class="fa-solid fa-cloud-rain"></i>
                </div>
                <h4>Ruído Marrom & Chuva</h4>
                <p>Áudio binaural sintetizado para anular distrações e turbinar sua retenção de conteúdo.</p>
              </div>

              <div class="tour-feature-card">
                <div class="tour-card-icon" style="background: rgba(234, 179, 8, 0.15); color: #eab308;">
                  <i class="fa-solid fa-sliders"></i>
                </div>
                <h4>Slider de Volume</h4>
                <p>Ajuste suave de 0% a 100% ou mute com um clique na barra superior e nos widgets.</p>
              </div>
            </div>
          </div>
'@

if ($html.Contains($oldSlide6End) -and -not $html.Contains('data-slide-index="7"')) {
  $html = $html.Replace($oldSlide6End, $newSlides78)
  Write-Host "Added tour slides 7 and 8!"
}

# 4. Update dots pagination
$oldTourDots = @'
        <div class="tour-dots-pagination" id="tour-dots-pagination">
          <button type="button" class="tour-dot active" onclick="irParaTourSlide(1)" title="Slide 1: Boas-vindas"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(2)" title="Slide 2: 10 Vestibulares"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(3)" title="Slide 3: Pomodoro & Chuva"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(4)" title="Slide 4: Quiz & Lousa"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(5)" title="Slide 5: Bloco de Notas"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(6)" title="Slide 6: Redação com IA"></button>
        </div>
'@

$newTourDots = @'
        <div class="tour-dots-pagination" id="tour-dots-pagination">
          <button type="button" class="tour-dot active" onclick="irParaTourSlide(1)" title="Slide 1: Boas-vindas"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(2)" title="Slide 2: 10 Vestibulares"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(3)" title="Slide 3: Pomodoro & Chuva"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(4)" title="Slide 4: Quiz & Lousa"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(5)" title="Slide 5: Bloco de Notas"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(6)" title="Slide 6: Redação com IA"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(7)" title="Slide 7: Janelas Móveis"></button>
          <button type="button" class="tour-dot" onclick="irParaTourSlide(8)" title="Slide 8: Vídeos & Sons"></button>
        </div>
'@

if ($html.Contains($oldTourDots)) {
  $html = $html.Replace($oldTourDots, $newTourDots)
  Write-Host "Updated tour dots pagination!"
}

# 5. Add Modals for Theme Catalogue & Gemini Theme Creator before </body>
$newModalsBlock = @'
  <!-- ========================================================
       MODAL: CATÁLOGO COMPLETO DE TEMAS DE REDAÇÃO
       ======================================================== -->
  <div class="modal-overlay" id="modal-catalogo-temas" onclick="if(event.target === this) fecharCatalogoTemasRedacao()">
    <div class="modal-card modal-catalogo-card">
      <div class="modal-header">
        <div class="modal-header-icon" style="background: #be185d; color: #fff;">
          <i class="fa-solid fa-feather-pointed"></i>
        </div>
        <div class="modal-header-text">
          <h3>Banco de Temas de Redação Oficiais & Inéditos</h3>
          <p>Escolha uma proposta para praticar ou crie um tema exclusivo com Inteligência Artificial</p>
        </div>
        <button type="button" class="modal-btn-close" onclick="fecharCatalogoTemasRedacao()" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body modal-catalogo-body">
        <!-- Barra de busca e filtros -->
        <div class="catalogo-topo-bar">
          <div class="catalogo-busca-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="input-busca-temas" placeholder="Pesquisar por tema, assunto ou palavra-chave (ex: Clima, IA, Saúde, Bets, Trabalho)..." oninput="filtrarCatalogoTemas(this.value)">
          </div>
          <button type="button" class="btn-novo-tema-ia-topo" onclick="fecharCatalogoTemasRedacao(); abrirModalCriarTemaRedacao();">
            <i class="fa-solid fa-wand-magic-sparkles"></i> <span>Criar Tema com Gemini</span>
          </button>
        </div>

        <!-- Pills de Filtro por Vestibular -->
        <div class="catalogo-filtros-pills" id="catalogo-filtros-pills">
          <button type="button" class="cat-pill-btn active" data-vest="todos" onclick="filtrarCatalogoPorVestibular('todos')">Todos os Temas</button>
          <button type="button" class="cat-pill-btn" data-vest="ENEM" onclick="filtrarCatalogoPorVestibular('ENEM')">ENEM</button>
          <button type="button" class="cat-pill-btn" data-vest="FUVEST" onclick="filtrarCatalogoPorVestibular('FUVEST')">FUVEST</button>
          <button type="button" class="cat-pill-btn" data-vest="UNICAMP" onclick="filtrarCatalogoPorVestibular('UNICAMP')">UNICAMP</button>
          <button type="button" class="cat-pill-btn" data-vest="FATEC" onclick="filtrarCatalogoPorVestibular('FATEC')">FATEC</button>
          <button type="button" class="cat-pill-btn" data-vest="UNESP" onclick="filtrarCatalogoPorVestibular('UNESP')">UNESP</button>
          <button type="button" class="cat-pill-btn" data-vest="CUSTOM" onclick="filtrarCatalogoPorVestibular('CUSTOM')">✨ Criados por Mim</button>
        </div>

        <!-- Grid de Temas -->
        <div class="catalogo-temas-grid" id="catalogo-temas-grid">
          <!-- Preenchido via app.js -->
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================
       MODAL: CRIAR TEMA INÉDITO & DESENVOLVER TEXTOS COM GEMINI
       ======================================================== -->
  <div class="modal-overlay" id="modal-criar-tema-redacao" onclick="if(event.target === this) fecharModalCriarTemaRedacao()">
    <div class="modal-card modal-criar-tema-card">
      <div class="modal-header">
        <div class="modal-header-icon" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff;">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div class="modal-header-text">
          <h3>Criar Tema & Textos Motivadores com Gemini</h3>
          <p>Digite qualquer ideia ou assunto e a IA gera a proposta oficial completa para você treinar</p>
        </div>
        <button type="button" class="modal-btn-close" onclick="fecharModalCriarTemaRedacao()" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body modal-criar-tema-body">
        <div class="form-grupo-tema">
          <label for="input-tema-custom-titulo"><strong>Qual assunto ou tema você gostaria de treinar?</strong></label>
          <div class="tema-input-com-sugestao">
            <input type="text" id="input-tema-custom-titulo" placeholder="Ex: O impacto do uso excessivo de telas na infância e na aprendizagem..." class="form-input">
            <button type="button" class="btn-sugerir-tema-rapido" onclick="sugerirTemaIneditoRapido()" title="Sortear uma ideia quente de redação">
              <i class="fa-solid fa-dice"></i> Sugerir Tema
            </button>
          </div>
        </div>

        <div class="form-row-tema">
          <div class="form-col-tema">
            <label for="select-tema-custom-vest"><strong>Banca / Estilo do Vestibular:</strong></label>
            <select id="select-tema-custom-vest" class="form-select">
              <option value="ENEM">ENEM (Dissertativo-Argumentativo com 5 Competências)</option>
              <option value="FUVEST">FUVEST / USP (Dissertação Crítica e Filosófica)</option>
              <option value="UNICAMP">UNICAMP (Gênero Textual Específico: Carta, Artigo, Manifesto)</option>
              <option value="FATEC">FATEC (Tecnologia, Sociedade e Mercado de Trabalho)</option>
              <option value="UNESP">UNESP (Pergunta Temática Argumentativa)</option>
            </select>
          </div>
        </div>

        <div class="acoes-gerar-tema-box">
          <button type="button" class="btn-gerar-tema-executar" id="btn-gerar-tema-executar" onclick="gerarTemaComGemini()">
            <i class="fa-solid fa-wand-magic-sparkles"></i> <span>Desenvolver Proposta Completa & Textos Motivadores</span>
          </button>
        </div>

        <!-- Área de Carregamento e Preview do Tema Gerado -->
        <div class="preview-tema-gerado" id="preview-tema-gerado" style="display: none;">
          <div class="preview-tema-header">
            <span class="preview-badge" id="preview-tema-badge">ENEM</span>
            <h4 id="preview-tema-titulo">Título da Proposta Gerada</h4>
          </div>
          <p class="preview-tema-instrucoes" id="preview-tema-instrucoes">Instruções...</p>
          
          <div class="preview-textos-motivadores" id="preview-textos-motivadores">
            <!-- Textos motivadores sintetizados -->
          </div>

          <div class="preview-botoes-confirmar">
            <button type="button" class="btn-aplicar-tema-gerado" onclick="aplicarTemaGeradoAoTreino()">
              <i class="fa-solid fa-pen-nib"></i> Usar Esta Proposta e Começar Redação
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
'@

if (-not $html.Contains('id="modal-catalogo-temas"')) {
  $posBodyEnd = $html.LastIndexOf('</body>')
  if ($posBodyEnd -ge 0) {
    $html = $html.Substring(0, $posBodyEnd) + $newModalsBlock + "`n" + $html.Substring($posBodyEnd)
    Write-Host "Inserted modals for theme catalogue and Gemini creator before </body>!"
  }
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
