$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

# 1. Update tab-videoaulas: Insert "Assistir Aula Aqui" section right at the top of tab-videoaulas
$targetVideoTabStart = @'
    <section id="tab-videoaulas" class="tab-content">
      
      <!-- Banner Hero da Seção de Vídeo Aulas -->
'@

$replaceVideoTabStart = @'
    <section id="tab-videoaulas" class="tab-content">

      <!-- ========================================================
           PLAYER DE VIDEOAULAS NO TOPO: ASSISTIR AULA AQUI
           ======================================================== -->
      <div class="videoaulas-player-container-topo" id="secao-assistir-aula-aqui">
        <div class="player-topo-header">
          <div class="player-topo-badge">
            <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i>
            <span>Ambiente Focado de Estudo</span>
          </div>
          <h3>🎬 Assistir Aula Aqui & Estudar</h3>
          <p>Cole o link ou URL de qualquer vídeo do YouTube que deseja assistir. Ao carregar o vídeo, a área de anotações no caderno e a lousa de contas serão ativadas logo abaixo!</p>
        </div>

        <!-- Barra de Entrada da URL do YouTube -->
        <div class="player-url-input-bar">
          <div class="player-input-wrapper">
            <i class="fa-brands fa-youtube player-input-icon"></i>
            <input type="text" id="input-video-url-topo" placeholder="Cole o link do YouTube aqui (ex: https://www.youtube.com/watch?v=... ou https://youtu.be/...)" onkeydown="if(event.key==='Enter') carregarVideoPersonalizadoTopo()" oninput="document.getElementById('btn-limpar-url-topo').style.display = this.value ? 'flex' : 'none'">
            <button type="button" class="btn-limpar-url" id="btn-limpar-url-topo" onclick="limparInputVideoTopo()" style="display: none;" title="Limpar campo">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <button type="button" class="btn-carregar-video-topo" onclick="carregarVideoPersonalizadoTopo()">
            <i class="fa-solid fa-play"></i>
            <span>Assistir Aula Aqui</span>
          </button>
        </div>

        <!-- Área do Vídeo & Ferramentas Integradas (Habilitada após carregar) -->
        <div class="player-video-ativa-area" id="area-video-ativa-topo" style="display: none;">
          <!-- Iframe do Vídeo -->
          <div class="video-player-wrapper-topo">
            <iframe id="iframe-video-player-topo" src="" title="Videoaula do YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>

          <!-- Barra de Controle do Vídeo Ativo -->
          <div class="player-video-acoes-bar">
            <div class="player-video-status">
              <span class="video-status-dot"></span>
              <strong id="label-video-carregado">Vídeo em Reprodução</strong>
            </div>
            <div class="player-video-botoes-atalho">
              <button type="button" class="btn-video-tab-tool active" id="btn-tab-tool-notas" onclick="alternarAbaFerramentaVideo('notas')">
                <i class="fa-solid fa-pen-to-square"></i> <span>Anotações no Caderno</span>
              </button>
              <button type="button" class="btn-video-tab-tool" id="btn-tab-tool-lousa" onclick="alternarAbaFerramentaVideo('lousa')">
                <i class="fa-solid fa-pen-ruler"></i> <span>Lousa de Cálculos</span>
              </button>
              <button type="button" class="btn-fechar-video-topo" onclick="fecharVideoPersonalizadoTopo()" title="Fechar vídeo e parar reprodução">
                <i class="fa-solid fa-stop"></i> <span>Parar Vídeo</span>
              </button>
            </div>
          </div>

          <!-- Painel 1: Anotações Rápidas -->
          <div class="video-tool-painel active" id="painel-video-notas">
            <div class="painel-notas-topo-row">
              <label for="input-nota-video-topo"><i class="fa-solid fa-pen-to-square"></i> Anotações da Aula (Salvas no seu Caderno Digital):</label>
              <button type="button" class="btn-salvar-nota-topo" onclick="salvarNotaVideoTopo()">
                <i class="fa-solid fa-floppy-disk"></i> Salvar no meu Bloco de Notas
              </button>
            </div>
            <textarea id="input-nota-video-topo" rows="4" placeholder="Digite pontos-chave, fórmulas ou dúvidas anotadas durante o vídeo para salvar no seu caderno..."></textarea>
          </div>

          <!-- Painel 2: Lousa de Contas Integrada ao Vídeo -->
          <div class="video-tool-painel" id="painel-video-lousa" style="display: none;">
            <div class="lousa-video-toolbar">
              <div class="lousa-video-ferramentas">
                <button type="button" class="lousa-tool-btn active" id="tool-pen-video" onclick="setLousaVideoFerramenta('pen')" title="Caneta / Lápis">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="lousa-tool-btn" id="tool-eraser-video" onclick="setLousaVideoFerramenta('eraser')" title="Borracha">
                  <i class="fa-solid fa-eraser"></i>
                </button>
                <button type="button" class="lousa-tool-btn btn-limpar-lousa" onclick="limparLousaVideo()" title="Limpar Lousa">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>

              <!-- Cores da Lousa do Vídeo -->
              <div class="lousa-cores-group" id="lousa-video-cores-container">
                <button class="lousa-cor-btn active" style="background: #ffffff; border-color: #cbd5e1;" onclick="setLousaVideoCor('#ffffff')" title="Giz Branco"></button>
                <button class="lousa-cor-btn" style="background: #1e293b;" onclick="setLousaVideoCor('#1e293b')" title="Grafite"></button>
                <button class="lousa-cor-btn" style="background: #3b82f6;" onclick="setLousaVideoCor('#3b82f6')" title="Azul Realce"></button>
                <button class="lousa-cor-btn" style="background: #06b6d4;" onclick="setLousaVideoCor('#06b6d4')" title="Ciano"></button>
                <button class="lousa-cor-btn" style="background: #10b981;" onclick="setLousaVideoCor('#10b981')" title="Verde"></button>
                <button class="lousa-cor-btn" style="background: #eab308;" onclick="setLousaVideoCor('#eab308')" title="Amarelo"></button>
                <button class="lousa-cor-btn" style="background: #f97316;" onclick="setLousaVideoCor('#f97316')" title="Laranja"></button>
                <button class="lousa-cor-btn" style="background: #ef4444;" onclick="setLousaVideoCor('#ef4444')" title="Vermelho"></button>
                <button class="lousa-cor-btn" style="background: #a855f7;" onclick="setLousaVideoCor('#a855f7')" title="Roxo"></button>
                <button class="lousa-cor-btn" style="background: #ec4899;" onclick="setLousaVideoCor('#ec4899')" title="Rosa"></button>
              </div>

              <button type="button" class="btn-abrir-lousa-flutuante" onclick="alternarLousaRascunho()" title="Abrir Lousa em Janela Flutuante">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Janela Flutuante</span>
              </button>
            </div>

            <!-- Canvas da Lousa do Vídeo com Textura Quadriculada -->
            <div class="lousa-video-canvas-wrapper" id="lousa-video-canvas-wrapper">
              <canvas id="lousa-video-canvas"></canvas>
              <span class="lousa-grid-hint">Rascunhe contas e fórmulas aqui</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner Hero da Seção de Vídeo Aulas -->
'@

if ($html.Contains($targetVideoTabStart)) {
  $html = $html.Replace($targetVideoTabStart, $replaceVideoTabStart)
  Write-Host "tab-videoaulas updated with Assistir Aula Aqui section!"
} else {
  Write-Host "Target video tab start not found!"
}

# 2. Update floating lousa color palette
$targetLousaCores = @'
      <div class="lousa-cores-group">
        <button class="lousa-cor-btn active" style="background: #1e293b;" onclick="setLousaCor('#1e293b')" title="Grafite Escuro"></button>
        <button class="lousa-cor-btn" style="background: #0c1d3b;" onclick="setLousaCor('#0c1d3b')" title="Azul Marinho"></button>
        <button class="lousa-cor-btn" style="background: #2563eb;" onclick="setLousaCor('#2563eb')" title="Azul Realce"></button>
        <button class="lousa-cor-btn" style="background: #dc2626;" onclick="setLousaCor('#dc2626')" title="Vermelho"></button>
        <button class="lousa-cor-btn" style="background: #16a34a;" onclick="setLousaCor('#16a34a')" title="Verde"></button>
      </div>
'@

$replaceLousaCores = @'
      <div class="lousa-cores-group">
        <button class="lousa-cor-btn active" style="background: #ffffff; border-color: #cbd5e1;" onclick="setLousaCor('#ffffff')" title="Branco / Giz (Ideal no Modo Escuro)"></button>
        <button class="lousa-cor-btn" style="background: #1e293b;" onclick="setLousaCor('#1e293b')" title="Grafite Escuro"></button>
        <button class="lousa-cor-btn" style="background: #3b82f6;" onclick="setLousaCor('#3b82f6')" title="Azul Realce"></button>
        <button class="lousa-cor-btn" style="background: #06b6d4;" onclick="setLousaCor('#06b6d4')" title="Ciano / Aqua"></button>
        <button class="lousa-cor-btn" style="background: #10b981;" onclick="setLousaCor('#10b981')" title="Verde Esmeralda"></button>
        <button class="lousa-cor-btn" style="background: #eab308;" onclick="setLousaCor('#eab308')" title="Amarelo / Destaque"></button>
        <button class="lousa-cor-btn" style="background: #f97316;" onclick="setLousaCor('#f97316')" title="Laranja"></button>
        <button class="lousa-cor-btn" style="background: #ef4444;" onclick="setLousaCor('#ef4444')" title="Vermelho"></button>
        <button class="lousa-cor-btn" style="background: #a855f7;" onclick="setLousaCor('#a855f7')" title="Roxo"></button>
        <button class="lousa-cor-btn" style="background: #ec4899;" onclick="setLousaCor('#ec4899')" title="Rosa Marca-Texto"></button>
      </div>
'@

if ($html.Contains($targetLousaCores)) {
  $html = $html.Replace($targetLousaCores, $replaceLousaCores)
  Write-Host "Floating lousa color palette updated!"
} else {
  Write-Host "Target lousa cores not found!"
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
