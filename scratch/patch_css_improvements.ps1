$path = "$PWD\css\style.css"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Fix @media (max-width: 1300px) that was hiding button text on laptop/desktop screens
$target1300 = @'
@media (max-width: 1300px) {
  .btn-header-scratchpad span,
  .btn-header-cta span,
  .btn-header-palette span {
    display: none;
  }
  .btn-header-scratchpad,
  .btn-header-cta,
  .btn-header-palette {
    padding: 0.55rem;
    min-width: 38px;
    justify-content: center;
  }
}
'@

$replacement768 = @'
@media (max-width: 768px) {
  .btn-header-scratchpad span,
  .btn-header-cta span,
  .btn-header-palette span {
    display: none;
  }
  .btn-header-scratchpad,
  .btn-header-cta,
  .btn-header-palette {
    padding: 0.55rem;
    min-width: 38px;
    justify-content: center;
  }
}
'@

if ($content.Contains($target1300)) {
    $content = $content.Replace($target1300, $replacement768)
    Write-Host "1. Media query 1300px atualizada para 768px!"
}

# 2. Fix .btn-header-tour span text color in light and dark mode
$targetTourBtn = @'
.btn-header-tour {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 14%, transparent) !important;
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 38%, transparent) !important;
  color: var(--primary-accent, #3b82f6) !important;
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 10px var(--primary-glow, rgba(37, 99, 235, 0.2));
}

.btn-header-tour i {
  color: var(--primary-accent, #3b82f6) !important;
}

.btn-header-tour span {
  color: #e2e8f0 !important;
  -webkit-text-fill-color: #e2e8f0 !important;
}
'@

$replacementTourBtn = @'
.btn-header-tour {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 14%, #ffffff) !important;
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 40%, var(--border-light, #cbd5e1)) !important;
  color: var(--text-main, #0f172a) !important;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 10px var(--primary-glow, rgba(37, 99, 235, 0.2));
}

.btn-header-tour i {
  color: var(--primary-accent, #3b82f6) !important;
}

.btn-header-tour span {
  color: var(--text-main, #0f172a) !important;
  -webkit-text-fill-color: var(--text-main, #0f172a) !important;
  font-weight: 700 !important;
}
'@

if ($content.Contains($targetTourBtn)) {
    $content = $content.Replace($targetTourBtn, $replacementTourBtn)
    Write-Host "2. .btn-header-tour atualizado para alto contraste!"
}

# 3. Add scroll lock and solid dark backgrounds and LaTeX formatting CSS
$additionalCss = @'

/* ========================================================
   BLOQUEIO DE SCROLL DO FUNDO (BACKGROUND SCROLL-LOCK EM MODAIS)
   ======================================================== */
html.modal-aberto,
body.modal-aberto,
html:has(.modal-overlay.active),
body:has(.modal-overlay.active) {
  overflow: hidden !important;
  overscroll-behavior: none !important;
  touch-action: none !important;
}

.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: rgba(8, 16, 32, 0.78) !important;
  backdrop-filter: blur(8px) !important;
  z-index: 99999 !important;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.2rem !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  -webkit-overflow-scrolling: touch;
}

.modal-overlay.active {
  display: flex !important;
}

.modal-card,
.modal-palette-box,
.modal-tour-card,
.cronograma-ia-modal-card {
  max-height: calc(100vh - 4rem) !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5) !important;
}

/* ========================================================
   MODO ESCURO: FUNDOS SÓLIDOS, NITIDEZ E PROFUNDIDADE
   ======================================================== */
[data-theme="dark"] .cronograma-dia-card,
[data-theme="dark"] .chat-ia-box,
[data-theme="dark"] .simulado-card-item,
[data-theme="dark"] .dica-card,
[data-theme="dark"] .nota-card,
[data-theme="dark"] .vest-card-preview,
[data-theme="dark"] .vest-header-card,
[data-theme="dark"] .obra-card,
[data-theme="dark"] .disciplina-card,
[data-theme="dark"] .stat-card,
[data-theme="dark"] .quiz-arena-card,
[data-theme="dark"] .pomodoro-card-cozy,
[data-theme="dark"] .perfil-card {
  background: #131f37 !important;
  border: 1px solid #273b61 !important;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.55) !important;
}

[data-theme="dark"] .cronograma-tarefa-item {
  background: #1c2b4c !important;
  border: 1px solid #324976 !important;
}

[data-theme="dark"] .cronograma-tarefa-item:hover {
  background: #22355e !important;
  border-color: var(--primary-accent) !important;
}

[data-theme="dark"] .chat-ia-mensagens {
  background: #0f182c !important;
}

[data-theme="dark"] .msg-ia .chat-ia-msg-balao {
  background: #182642 !important;
  border: 1px solid #2b406b !important;
  color: #f8fafc !important;
}

[data-theme="dark"] .cronograma-semana-controller {
  background: #141f37 !important;
  border: 1px solid #273b61 !important;
}

/* ========================================================
   ESTILOS DO CONTROLADOR DE SEMANAS DO CRONOGRAMA
   ======================================================== */
.cronograma-semana-controller {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 0.9rem 1.4rem;
  margin-bottom: 1.6rem;
  gap: 1rem;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
}

.cronograma-semana-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.cronograma-semana-tag {
  background: linear-gradient(135deg, var(--primary-accent), var(--primary-light));
  color: #ffffff;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px var(--primary-glow);
}

.cronograma-semana-tema {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--text-main);
}

.cronograma-semana-acoes {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.btn-semana-nav {
  background: var(--bg-paper);
  border: 1.5px solid var(--border-light);
  color: var(--text-main);
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
}

.btn-semana-nav:hover {
  background: var(--primary-accent);
  color: #ffffff;
  border-color: var(--primary-accent);
  transform: translateY(-1px);
}

.btn-semana-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* ========================================================
   FORMATAÇÃO DE FÓRMULAS & MATEMÁTICA LIMPA NO CHAT IA
   ======================================================== */
.chat-math-block {
  background: rgba(37, 99, 235, 0.08);
  border-left: 4px solid var(--primary-accent);
  padding: 0.8rem 1.1rem;
  margin: 0.75rem 0;
  border-radius: 6px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--primary-accent-lighter, #60a5fa);
  overflow-x: auto;
}

.chat-math-inline {
  background: rgba(37, 99, 235, 0.12);
  color: var(--primary-accent, #3b82f6);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.94em;
}

[data-theme="dark"] .chat-math-block {
  background: rgba(2, 6, 23, 0.55);
  color: #93c5fd;
  border-left-color: #38bdf8;
}

[data-theme="dark"] .chat-math-inline {
  background: rgba(30, 58, 138, 0.4);
  color: #93c5fd;
}
'@

$content = $content + "`r`n" + $additionalCss

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "CSS atualizado com sucesso!"
