$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Update the Lousa header in index_template.html so it has the drag class and tooltip
$oldLousaHeader = @'
    <div class="lousa-header">
      <div class="lousa-header-title">
        <i class="fa-solid fa-pen-ruler"></i>
        <span>Lousa de Rascunho para Cálculos</span>
        <span class="lousa-status-tag" id="lousa-ferramenta-status">Lápis</span>
      </div>
      <div class="lousa-header-controls">
        <button class="lousa-btn-control" id="btn-minimizar-lousa" onclick="alternarMinimizarLousa()" title="Minimizar / Expandir Lousa">
          <i class="fa-solid fa-window-minimize"></i>
        </button>
        <button class="lousa-btn-control" onclick="alternarLousaRascunho()" title="Fechar Lousa">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
'@

$newLousaHeader = @'
    <div class="lousa-header janela-arrastavel-header" id="header-lousa-rascunho" title="Clique e arraste para mover a lousa pela tela">
      <div class="lousa-header-title">
        <i class="fa-solid fa-pen-ruler"></i>
        <span>Lousa de Rascunho Móvel</span>
        <span class="lousa-status-tag" id="lousa-ferramenta-status">Lápis</span>
      </div>
      <div class="lousa-header-controls">
        <button class="lousa-btn-control" id="btn-minimizar-lousa" onclick="alternarMinimizarLousa()" title="Minimizar / Expandir Lousa">
          <i class="fa-solid fa-minus"></i>
        </button>
        <button class="lousa-btn-control" onclick="alternarJanelaFlutuante('lousa')" title="Fechar Lousa">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
'@

if ($html.Contains($oldLousaHeader)) {
  $html = $html.Replace($oldLousaHeader, $newLousaHeader)
  Write-Host "Updated lousa header for dragging."
}

# 2. Add the 3 new floating windows right after </aside> (after lousa-rascunho)
$oldAfterLousa = '</aside>'
$newFloatingWidgets = @'
</aside>

  <!-- ========================================================
       JANELA FLUTUANTE & MÓVEL: TUTOR IA & GEMINI
       ======================================================== -->
  <aside id="janela-flutuante-ia" class="janela-flutuante-widget" style="display: none;">
    <div class="janela-flutuante-header janela-arrastavel-header" id="header-flutuante-ia" title="Clique e arraste para mover o Tutor IA pela tela">
      <div class="janela-flutuante-title">
        <i class="fa-solid fa-robot" style="color: #60a5fa;"></i>
        <span>Tutor IA & Gemini Móvel</span>
      </div>
      <div class="janela-flutuante-controls">
        <button type="button" class="janela-btn-ctrl" onclick="mudarAba('chat-ia'); alternarJanelaFlutuante('ia');" title="Expandir para Aba Completa">
          <i class="fa-solid fa-up-right-from-square"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="minimizarJanelaFlutuante('janela-flutuante-ia')" title="Minimizar">
          <i class="fa-solid fa-minus"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="alternarJanelaFlutuante('ia')" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="janela-flutuante-body">
      <!-- Mensagens Mini Chat -->
      <div class="mini-chat-mensagens" id="mini-chat-mensagens">
        <div class="mini-chat-msg ia">
          <div class="mini-chat-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="mini-chat-balao">Olá! Sou seu Tutor IA. Tire dúvidas sobre matérias, fórmulas, exercícios ou redação enquanto estuda! ✨</div>
        </div>
      </div>
      <!-- Sugestões Rápidas -->
      <div class="mini-chat-chips">
        <button type="button" class="mini-chip-btn" onclick="enviarMensagemMiniChat('Explique este assunto de forma simples e direta')">💡 Explicar Simples</button>
        <button type="button" class="mini-chip-btn" onclick="enviarMensagemMiniChat('Crie 2 questões de fixação com gabarito')">📝 Criar Questões</button>
        <button type="button" class="mini-chip-btn" onclick="enviarMensagemMiniChat('Dê uma dica mnemônica para memorizar')">🧠 Macete/Dica</button>
      </div>
      <!-- Input Mini Chat -->
      <div class="mini-chat-input-bar">
        <input type="text" id="input-mini-chat-flutuante" placeholder="Digite sua dúvida aqui..." onkeydown="if(event.key === 'Enter') enviarMensagemMiniChat()">
        <button type="button" id="btn-enviar-mini-chat" onclick="enviarMensagemMiniChat()" title="Enviar Pergunta">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </aside>

  <!-- ========================================================
       JANELA FLUTUANTE & MÓVEL: BLOCO DE ANOTAÇÕES RÁPIDAS
       ======================================================== -->
  <aside id="janela-flutuante-notas" class="janela-flutuante-widget" style="display: none;">
    <div class="janela-flutuante-header janela-arrastavel-header" id="header-flutuante-notas" title="Clique e arraste para mover as Anotações pela tela">
      <div class="janela-flutuante-title">
        <i class="fa-solid fa-pen-to-square" style="color: #a78bfa;"></i>
        <span>Anotações Rápidas Móvel</span>
      </div>
      <div class="janela-flutuante-controls">
        <button type="button" class="janela-btn-ctrl" onclick="mudarAba('notas'); alternarJanelaFlutuante('notas');" title="Ir para o Caderno Completo">
          <i class="fa-solid fa-up-right-from-square"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="minimizarJanelaFlutuante('janela-flutuante-notas')" title="Minimizar">
          <i class="fa-solid fa-minus"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="alternarJanelaFlutuante('notas')" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="janela-flutuante-body">
      <div class="mini-nota-campos">
        <input type="text" id="input-mini-nota-titulo" placeholder="Título do resumo ou fórmula..." class="mini-nota-input">
        <div class="mini-nota-row">
          <select id="select-mini-nota-materia" class="mini-nota-select">
            <option value="Geral">📌 Geral</option>
            <option value="Matemática">📐 Matemática</option>
            <option value="Física">⚡ Física</option>
            <option value="Química">🧪 Química</option>
            <option value="Biologia">🧬 Biologia</option>
            <option value="História">🏛️ História</option>
            <option value="Geografia">🌍 Geografia</option>
            <option value="Redação">✍️ Redação</option>
          </select>
          <button type="button" class="btn-mini-nota-salvar" onclick="salvarMiniNotaFlutuante()">
            <i class="fa-solid fa-floppy-disk"></i> Salvar no Caderno
          </button>
        </div>
        <textarea id="textarea-mini-nota-conteudo" placeholder="Digite suas anotações, fórmulas ou resumos aqui enquanto assiste às aulas..." rows="5" class="mini-nota-textarea"></textarea>
      </div>
    </div>
  </aside>

  <!-- ========================================================
       JANELA FLUTUANTE & MÓVEL: FOCO, POMODORO & SONS AMBIENTES
       ======================================================== -->
  <aside id="janela-flutuante-foco" class="janela-flutuante-widget" style="display: none;">
    <div class="janela-flutuante-header janela-arrastavel-header" id="header-flutuante-foco" title="Clique e arraste para mover o Foco pela tela">
      <div class="janela-flutuante-title">
        <i class="fa-solid fa-fire" style="color: #fb923c;"></i>
        <span>Modo Foco & Sons Móvel</span>
      </div>
      <div class="janela-flutuante-controls">
        <button type="button" class="janela-btn-ctrl" onclick="mudarAba('ferramentas'); alternarJanelaFlutuante('foco');" title="Ir para Aba de Foco Completa">
          <i class="fa-solid fa-up-right-from-square"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="minimizarJanelaFlutuante('janela-flutuante-foco')" title="Minimizar">
          <i class="fa-solid fa-minus"></i>
        </button>
        <button type="button" class="janela-btn-ctrl" onclick="alternarJanelaFlutuante('foco')" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="janela-flutuante-body">
      <!-- Timer Miniatura -->
      <div class="mini-foco-timer-box">
        <span class="mini-foco-tempo" id="mini-foco-timer-display">25:00</span>
        <span class="mini-foco-mode-badge" id="mini-foco-mode-badge">Foco Ativo</span>
      </div>
      <div class="mini-foco-timer-presets">
        <button type="button" class="mini-preset-btn active" onclick="ajustarTempoMiniFoco(25, 'foco')">25m Foco</button>
        <button type="button" class="mini-preset-btn" onclick="ajustarTempoMiniFoco(50, 'foco')">50m Foco</button>
        <button type="button" class="mini-preset-btn" onclick="ajustarTempoMiniFoco(5, 'pausa')">5m Pausa</button>
        <button type="button" class="mini-preset-btn" onclick="ajustarTempoMiniFoco(15, 'pausa')">15m Pausa</button>
      </div>
      <div class="mini-foco-timer-actions">
        <button type="button" class="btn-mini-foco-start" id="btn-mini-foco-start" onclick="alternarTimerMiniFoco()">
          <i class="fa-solid fa-play"></i> Iniciar
        </button>
        <button type="button" class="btn-mini-foco-reset" onclick="resetTimerMiniFoco()">
          <i class="fa-solid fa-rotate-left"></i> Zerar
        </button>
      </div>

      <!-- Seletor de Sons Ambientes -->
      <div class="mini-foco-sons-section">
        <label class="mini-foco-section-label"><i class="fa-solid fa-headphones"></i> Sons para Relaxamento e Foco:</label>
        <div class="mini-foco-sons-grid">
          <button type="button" class="btn-som-chip" data-som="brown" onclick="selecionarSomAmbiente('brown')">
            <i class="fa-solid fa-water"></i> Ruído Marrom
          </button>
          <button type="button" class="btn-som-chip" data-som="rain" onclick="selecionarSomAmbiente('rain')">
            <i class="fa-solid fa-cloud-rain"></i> Chuva Suave
          </button>
          <button type="button" class="btn-som-chip" data-som="thunder" onclick="selecionarSomAmbiente('thunder')">
            <i class="fa-solid fa-cloud-bolt"></i> Tempestade
          </button>
          <button type="button" class="btn-som-chip" data-som="alpha" onclick="selecionarSomAmbiente('alpha')">
            <i class="fa-solid fa-brain"></i> Ondas Alfa
          </button>
          <button type="button" class="btn-som-chip" data-som="lofi" onclick="selecionarSomAmbiente('lofi')">
            <i class="fa-solid fa-music"></i> Sintetizador Lo-Fi
          </button>
          <button type="button" class="btn-som-chip" data-som="white" onclick="selecionarSomAmbiente('white')">
            <i class="fa-solid fa-wind"></i> Ruído Branco
          </button>
        </div>

        <!-- Controle de Volume -->
        <div class="mini-foco-volume-row">
          <button type="button" class="btn-foco-mute" id="btn-foco-mute" onclick="alternarMudoSomAmbiente()" title="Mutar / Desmutar">
            <i class="fa-solid fa-volume-high" id="icone-foco-volume"></i>
          </button>
          <input type="range" class="foco-slider-volume" id="foco-slider-volume" min="0" max="100" value="70" oninput="ajustarVolumeSomAmbiente(this.value)">
          <span class="foco-volume-percent" id="foco-volume-percent">70%</span>
          <button type="button" class="btn-som-parar" onclick="pararTodosSonsAmbientes()" title="Parar Som">
            <i class="fa-solid fa-stop"></i> Parar
          </button>
        </div>
      </div>
    </div>
  </aside>
'@

# We search for the first occurrence of </aside> (which closes #lousa-rascunho)
$posLousaEnd = $html.IndexOf('</aside>')
if ($posLousaEnd -ge 0 -and -not $html.Contains('id="janela-flutuante-ia"')) {
  $html = $html.Substring(0, $posLousaEnd) + $newFloatingWidgets + $html.Substring($posLousaEnd + 8)
  Write-Host "Inserted the 3 new floating widgets after lousa-rascunho!"
} else {
  Write-Host "Already contains floating widgets or lousa not found."
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
