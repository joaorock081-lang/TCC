$css = [System.IO.File]::ReadAllText('css/style.css', [System.Text.Encoding]::UTF8)

$newCss = @'

/* ========================================================
   PLAYER DE VIDEOAULAS NO TOPO & LOUSA/ANOTAÇÕES EMBUTIDAS
   ======================================================== */

.videoaulas-player-container-topo {
  background: var(--bg-card);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 1.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
}

[data-theme="dark"] .videoaulas-player-container-topo {
  background: var(--navy-900);
  border-color: var(--navy-700);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35);
}

.player-topo-header {
  margin-bottom: 1.4rem;
}

.player-topo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.28);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.player-topo-header h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.4rem;
}

.player-topo-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 850px;
}

/* Barra de Entrada da URL */
.player-url-input-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.player-input-wrapper {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
}

.player-input-icon {
  position: absolute;
  left: 1.1rem;
  font-size: 1.25rem;
  color: #ef4444;
  pointer-events: none;
}

.player-input-wrapper input {
  width: 100%;
  padding: 0.88rem 2.8rem 0.88rem 3rem;
  background: var(--bg-subtle);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.96rem;
  outline: none;
  transition: all var(--transition-fast);
}

.player-input-wrapper input:focus {
  border-color: var(--primary-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-accent) 25%, transparent);
}

.btn-limpar-url {
  position: absolute;
  right: 0.85rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.btn-limpar-url:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.btn-carregar-video-topo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  padding: 0.88rem 1.6rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
  transition: all var(--transition-fast);
}

.btn-carregar-video-topo:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.55);
  filter: brightness(1.1);
}

/* Container do Vídeo Ativo no Topo */
.player-video-ativa-area {
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: animFadeIn 0.3s ease-out;
}

.video-player-wrapper-topo {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

.video-player-wrapper-topo iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Barra de Ações & Alternador de Ferramentas sob o Vídeo */
.player-video-acoes-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.65rem 0.95rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.player-video-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-main);
}

.video-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse 2s infinite;
}

.player-video-botoes-atalho {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.btn-video-tab-tool {
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-light);
  padding: 0.48rem 0.95rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
}

.btn-video-tab-tool:hover {
  border-color: var(--primary-accent);
  color: var(--primary-accent);
}

.btn-video-tab-tool.active {
  background: var(--primary-accent);
  color: #ffffff;
  border-color: var(--primary-accent);
  box-shadow: 0 2px 10px var(--primary-glow);
}

.btn-fechar-video-topo {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.48rem 0.85rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
}

.btn-fechar-video-topo:hover {
  background: #ef4444;
  color: #ffffff;
}

/* Painel de Anotações sob o Vídeo */
.video-tool-painel {
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.painel-notas-topo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.painel-notas-topo-row label {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-salvar-nota-topo {
  background: linear-gradient(135deg, var(--primary-accent, #2563eb) 0%, var(--primary-light, #1d4ed8) 100%);
  color: #fff;
  border: none;
  padding: 0.52rem 1.1rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px var(--primary-glow);
}

.btn-salvar-nota-topo:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

.video-tool-painel textarea {
  width: 100%;
  background: var(--bg-subtle);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.94rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: border-color var(--transition-fast);
}

.video-tool-painel textarea:focus {
  border-color: var(--primary-accent);
}

/* Painel da Lousa Embutida no Vídeo */
.lousa-video-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-light);
}

.lousa-video-ferramentas {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.lousa-video-canvas-wrapper {
  position: relative;
  width: 100%;
  height: 380px;
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: crosshair;
}

#lousa-video-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

.btn-abrir-lousa-flutuante {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-light);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all var(--transition-fast);
}

.btn-abrir-lousa-flutuante:hover {
  color: var(--primary-accent);
  border-color: var(--primary-accent);
}

/* ========================================================
   QUADRADINHOS DA LOUSA (MODO CLARO, ESCURO E DESCANSO)
   ======================================================== */

.lousa-canvas-wrapper,
.lousa-video-canvas-wrapper {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#e2e8f0 1px, transparent 1px),
    linear-gradient(90deg, #e2e8f0 1px, transparent 1px) !important;
  background-size: 22px 22px !important;
}

[data-theme="dark"] .lousa-canvas-wrapper,
[data-theme="dark"] .lousa-video-canvas-wrapper {
  background-color: #0c182b !important;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px) !important;
  background-size: 22px 22px !important;
}

[data-theme="warm"] .lousa-canvas-wrapper,
[data-theme="warm"] .lousa-video-canvas-wrapper {
  background-color: #fef7ee !important;
  background-image: 
    linear-gradient(#f0dfc8 1px, transparent 1px),
    linear-gradient(90deg, #f0dfc8 1px, transparent 1px) !important;
  background-size: 22px 22px !important;
}

/* Botão de Canal Único no Card do Professor */
.btn-canal-youtube-full {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.75rem 1.2rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 12%, var(--bg-card, #ffffff));
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 30%, transparent);
  color: var(--text-main, #0f172a);
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-canal-youtube-full:hover {
  background: #ef4444 !important;
  border-color: #ef4444 !important;
  color: #ffffff !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.45);
}

.btn-canal-youtube-full:hover i {
  color: #ffffff !important;
}

[data-theme="dark"] .btn-canal-youtube-full {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}
'@

$css = $css + "`n" + $newCss
[System.IO.File]::WriteAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
Write-Host "css/style.css updated with player and lousa grid styles!"
