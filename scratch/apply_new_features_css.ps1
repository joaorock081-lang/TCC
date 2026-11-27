$css = @"

/* ========================================================
   JANELAS FLUTUANTES MÓVEIS (LOUSA, TUTOR IA, NOTAS, FOCO)
   Sistema Multitarefa Arrastável pela Tela com Mouse e Touch
   ======================================================== */

.janela-flutuante-widget {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  width: 380px !important;
  max-width: 95vw !important;
  max-height: 82vh !important;
  background: var(--bg-card, #ffffff) !important;
  border-radius: var(--radius-lg, 16px) !important;
  border: 2px solid var(--border-light, #e2e8f0) !important;
  box-shadow: 0 20px 48px rgba(12, 29, 59, 0.35) !important;
  display: flex !important;
  flex-direction: column !important;
  z-index: 2900 !important;
  overflow: hidden !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important;
}

.janela-flutuante-widget.minimizado {
  height: 48px !important;
  max-height: 48px !important;
  overflow: hidden !important;
}

.janela-flutuante-widget.minimizado .janela-flutuante-body {
  display: none !important;
}

.janela-arrastavel-header,
.janela-flutuante-header {
  background: var(--navy-900, #0f172a) !important;
  color: #ffffff !important;
  padding: 0.75rem 1.1rem !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  user-select: none !important;
  cursor: grab !important;
  touch-action: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.janela-arrastavel-header:active,
.janela-flutuante-header:active {
  cursor: grabbing !important;
}

.janela-flutuante-title {
  display: flex !important;
  align-items: center !important;
  gap: 0.55rem !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: #ffffff !important;
}

.janela-flutuante-controls {
  display: flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
}

.janela-btn-ctrl {
  background: rgba(255, 255, 255, 0.12) !important;
  border: none !important;
  color: #cbd5e1 !important;
  width: 28px !important;
  height: 28px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.75rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.janela-btn-ctrl:hover {
  background: var(--primary-accent, #3b82f6) !important;
  color: #ffffff !important;
  transform: scale(1.1) !important;
}

.janela-flutuante-body {
  padding: 0.95rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.8rem !important;
  overflow-y: auto !important;
  max-height: calc(82vh - 48px) !important;
  background: var(--bg-card, #ffffff) !important;
}

/* Mini Chat IA Flutuante */
.mini-chat-mensagens {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.6rem !important;
  max-height: 240px !important;
  overflow-y: auto !important;
  padding-right: 0.3rem !important;
}

.mini-chat-msg {
  display: flex !important;
  align-items: flex-start !important;
  gap: 0.5rem !important;
}

.mini-chat-avatar {
  width: 28px !important;
  height: 28px !important;
  border-radius: 50% !important;
  background: rgba(59, 130, 246, 0.18) !important;
  color: var(--primary-accent, #3b82f6) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.78rem !important;
  flex-shrink: 0 !important;
}

.mini-chat-msg.user {
  flex-direction: row-reverse !important;
}

.mini-chat-msg.user .mini-chat-avatar {
  background: rgba(16, 185, 129, 0.18) !important;
  color: #10b981 !important;
}

.mini-chat-balao {
  background: var(--bg-subtle, #f1f5f9) !important;
  color: var(--text-main, #0f172a) !important;
  padding: 0.6rem 0.85rem !important;
  border-radius: 12px !important;
  font-size: 0.84rem !important;
  line-height: 1.4 !important;
  max-width: 82% !important;
  border: 1px solid var(--border-light, #e2e8f0) !important;
}

.mini-chat-msg.user .mini-chat-balao {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #2563eb) !important;
}

.mini-chat-chips {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.4rem !important;
}

.mini-chip-btn {
  background: var(--bg-subtle, #f1f5f9) !important;
  color: var(--text-main, #334155) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
  padding: 0.3rem 0.65rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.74rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.mini-chip-btn:hover {
  background: var(--primary-accent, #3b82f6) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #3b82f6) !important;
}

.mini-chat-input-bar {
  display: flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
}

.mini-chat-input-bar input {
  flex: 1 !important;
  padding: 0.55rem 0.85rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.84rem !important;
}

.mini-chat-input-bar button {
  width: 34px !important;
  height: 34px !important;
  border-radius: 50% !important;
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.84rem !important;
  transition: all 0.2s ease !important;
}

.mini-chat-input-bar button:hover {
  transform: scale(1.08) !important;
}

/* Mini Notas Flutuante */
.mini-nota-campos {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.65rem !important;
}

.mini-nota-input,
.mini-nota-select,
.mini-nota-textarea {
  width: 100% !important;
  padding: 0.55rem 0.8rem !important;
  border-radius: var(--radius-md, 8px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  font-family: inherit !important;
  font-size: 0.84rem !important;
}

.mini-nota-row {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
}

.btn-mini-nota-salvar {
  background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.55rem 0.95rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  transition: all 0.2s ease !important;
}

.btn-mini-nota-salvar:hover {
  opacity: 0.92 !important;
  transform: translateY(-1px) !important;
}

/* Mini Foco Flutuante */
.mini-foco-timer-box {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 10%, var(--bg-card, #ffffff)) !important;
  padding: 0.75rem 1rem !important;
  border-radius: var(--radius-md, 10px) !important;
  border: 1px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 25%, transparent) !important;
}

.mini-foco-tempo {
  font-size: 1.8rem !important;
  font-weight: 800 !important;
  font-variant-numeric: tabular-nums !important;
  color: var(--text-main, #0f172a) !important;
  letter-spacing: 1px !important;
}

.mini-foco-mode-badge {
  background: #f97316 !important;
  color: #ffffff !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  padding: 0.25rem 0.65rem !important;
  border-radius: var(--radius-full, 9999px) !important;
}

.mini-foco-timer-presets {
  display: flex !important;
  gap: 0.4rem !important;
}

.mini-preset-btn {
  flex: 1 !important;
  background: var(--bg-subtle, #f1f5f9) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #334155) !important;
  padding: 0.4rem 0.5rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.mini-preset-btn.active,
.mini-preset-btn:hover {
  background: var(--primary-accent, #3b82f6) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #3b82f6) !important;
}

.mini-foco-timer-actions {
  display: flex !important;
  gap: 0.5rem !important;
}

.btn-mini-foco-start {
  flex: 2 !important;
  background: linear-gradient(135deg, #10b981, #059669) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.6rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.45rem !important;
  transition: all 0.2s ease !important;
}

.btn-mini-foco-start.pausado {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
}

.btn-mini-foco-reset {
  flex: 1 !important;
  background: var(--bg-subtle, #f1f5f9) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #334155) !important;
  padding: 0.6rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-size: 0.84rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

/* Seção de Sons Ambientes de Foco & Relaxamento */
.mini-foco-sons-section,
.ambient-sound-station {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.65rem !important;
  margin-top: 0.4rem !important;
}

.ambient-sound-station {
  background: var(--bg-subtle, #f8fafc) !important;
  border: 1.5px solid var(--border-light, #e2e8f0) !important;
  border-radius: var(--radius-lg, 14px) !important;
  padding: 1.3rem !important;
  margin-top: 1.2rem !important;
}

.sound-station-header {
  display: flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
  color: var(--primary-accent, #3b82f6) !important;
  font-size: 1.05rem !important;
}

.sound-station-header h4 {
  margin: 0 !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 1.02rem !important;
  font-weight: 800 !important;
}

.sound-station-desc {
  font-size: 0.86rem !important;
  color: var(--text-secondary, #64748b) !important;
  margin: 0 !important;
}

.mini-foco-section-label {
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  color: var(--text-main, #0f172a) !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
}

.mini-foco-sons-grid,
.sound-station-chips-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 0.45rem !important;
}

.sound-station-chips-grid {
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) !important;
  gap: 0.65rem !important;
}

.btn-som-chip {
  background: var(--bg-card, #ffffff) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #334155) !important;
  padding: 0.55rem 0.75rem !important;
  border-radius: var(--radius-md, 10px) !important;
  font-family: inherit !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  text-align: left !important;
}

.btn-som-chip:hover {
  border-color: var(--primary-accent, #3b82f6) !important;
  color: var(--primary-accent, #3b82f6) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}

.btn-som-chip.ativo {
  background: linear-gradient(135deg, var(--primary-accent, #2563eb), #1d4ed8) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #2563eb) !important;
  box-shadow: 0 4px 14px var(--primary-glow, rgba(37, 99, 235, 0.4)) !important;
}

.btn-som-chip.ativo i {
  color: #ffffff !important;
}

.mini-foco-volume-row,
.sound-station-volume-bar {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  padding: 0.55rem 0.8rem !important;
  background: var(--bg-card, #ffffff) !important;
  border-radius: var(--radius-md, 8px) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
}

.sound-station-volume-bar {
  margin-top: 0.4rem !important;
  justify-content: space-between !important;
  flex-wrap: wrap !important;
}

.volume-control-group {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  flex: 1 !important;
  min-width: 220px !important;
}

.btn-foco-mute,
.btn-volume-icon {
  background: transparent !important;
  border: none !important;
  color: var(--text-main, #334155) !important;
  cursor: pointer !important;
  font-size: 0.95rem !important;
  padding: 0.2rem !important;
}

.foco-slider-volume {
  flex: 1 !important;
  accent-color: var(--primary-accent, #2563eb) !important;
  cursor: pointer !important;
  height: 6px !important;
}

.foco-volume-percent,
.volume-val-badge {
  font-size: 0.78rem !important;
  font-weight: 800 !important;
  color: var(--text-muted, #64748b) !important;
  min-width: 34px !important;
}

.btn-som-parar,
.btn-som-stop-global {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #ef4444 !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  padding: 0.4rem 0.75rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  transition: all 0.2s ease !important;
}

.btn-som-parar:hover,
.btn-som-stop-global:hover {
  background: #ef4444 !important;
  color: #ffffff !important;
}

/* ========================================================
   REDAÇÃO - SELETOR MODERNO & CATÁLOGO DE TEMAS
   ======================================================== */

.redacao-seletor-moderno {
  background: var(--bg-subtle, #f8fafc) !important;
  border: 1.5px solid var(--border-light, #e2e8f0) !important;
  border-radius: var(--radius-lg, 12px) !important;
  padding: 1.1rem 1.4rem !important;
  margin-bottom: 1.2rem !important;
}

.redacao-seletor-top-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 1rem !important;
}

.redacao-seletor-info-box {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.25rem !important;
  flex: 1 !important;
  min-width: 260px !important;
}

.redacao-kicker {
  font-size: 0.8rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  color: var(--primary-accent, #2563eb) !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
}

.redacao-tema-atual-nome {
  font-size: 1.08rem !important;
  font-weight: 800 !important;
  color: var(--text-main, #0f172a) !important;
  line-height: 1.35 !important;
}

.redacao-seletor-botoes-acao {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  flex-wrap: wrap !important;
}

.btn-abrir-catalogo-temas {
  background: var(--bg-card, #ffffff) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #0f172a) !important;
  padding: 0.6rem 1.1rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-family: inherit !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
}

.btn-abrir-catalogo-temas:hover {
  border-color: var(--primary-accent, #3b82f6) !important;
  color: var(--primary-accent, #3b82f6) !important;
  transform: translateY(-1px) !important;
}

.btn-criar-tema-gemini {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
  padding: 0.6rem 1.15rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-family: inherit !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35) !important;
}

.btn-criar-tema-gemini:hover {
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5) !important;
}

/* Modal Catálogo de Temas */
.modal-catalogo-card {
  max-width: 920px !important;
  width: 94vw !important;
  max-height: 88vh !important;
}

.modal-catalogo-body {
  padding: 1.4rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 1.2rem !important;
  max-height: calc(88vh - 85px) !important;
  overflow-y: auto !important;
}

.catalogo-topo-bar {
  display: flex !important;
  align-items: center !important;
  gap: 0.8rem !important;
  flex-wrap: wrap !important;
}

.catalogo-busca-box {
  flex: 1 !important;
  min-width: 260px !important;
  position: relative !important;
}

.catalogo-busca-box i {
  position: absolute !important;
  left: 1rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: var(--text-muted, #94a3b8) !important;
}

.catalogo-busca-box input {
  width: 100% !important;
  padding: 0.75rem 1rem 0.75rem 2.6rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.92rem !important;
}

.btn-novo-tema-ia-topo {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.75rem 1.2rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}

.catalogo-filtros-pills {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.45rem !important;
}

.cat-pill-btn {
  background: var(--bg-subtle, #f1f5f9) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #334155) !important;
  padding: 0.4rem 0.85rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.cat-pill-btn.active,
.cat-pill-btn:hover {
  background: var(--primary-accent, #3b82f6) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #3b82f6) !important;
}

.catalogo-temas-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)) !important;
  gap: 1rem !important;
}

.tema-catalogo-item-card {
  background: var(--bg-card, #ffffff) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  border-radius: var(--radius-md, 12px) !important;
  padding: 1.1rem !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  gap: 0.85rem !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer !important;
}

.tema-catalogo-item-card:hover {
  border-color: var(--primary-accent, #3b82f6) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.tema-catalogo-item-card.selecionado {
  border-color: var(--primary-accent, #2563eb) !important;
  background: color-mix(in srgb, var(--primary-accent, #2563eb) 8%, var(--bg-card, #ffffff)) !important;
}

.tema-item-badges-row {
  display: flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  flex-wrap: wrap !important;
}

.tema-item-vest-pill {
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  padding: 0.2rem 0.55rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  text-transform: uppercase !important;
  background: rgba(37, 99, 235, 0.15) !important;
  color: #2563eb !important;
}

.tema-item-vest-pill.fuvest { background: rgba(16, 185, 129, 0.15) !important; color: #059669 !important; }
.tema-item-vest-pill.unicamp { background: rgba(168, 85, 247, 0.15) !important; color: #7c3aed !important; }
.tema-item-vest-pill.fatec { background: rgba(245, 158, 11, 0.15) !important; color: #d97706 !important; }
.tema-item-vest-pill.custom { background: linear-gradient(135deg, #ec4899, #8b5cf6) !important; color: #ffffff !important; }

.tema-item-genero-pill {
  font-size: 0.72rem !important;
  color: var(--text-muted, #64748b) !important;
  font-weight: 600 !important;
}

.tema-item-titulo {
  font-size: 0.94rem !important;
  font-weight: 700 !important;
  color: var(--text-main, #0f172a) !important;
  line-height: 1.4 !important;
  margin: 0 !important;
}

.btn-selecionar-tema-card {
  width: 100% !important;
  padding: 0.55rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  background: var(--bg-subtle, #f1f5f9) !important;
  border: 1px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.4rem !important;
}

.tema-catalogo-item-card:hover .btn-selecionar-tema-card,
.tema-catalogo-item-card.selecionado .btn-selecionar-tema-card {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent, #2563eb) !important;
}

/* Modal Criar Tema com Gemini */
.modal-criar-tema-card {
  max-width: 780px !important;
  width: 94vw !important;
  max-height: 90vh !important;
}

.modal-criar-tema-body {
  padding: 1.4rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 1.1rem !important;
  max-height: calc(90vh - 85px) !important;
  overflow-y: auto !important;
}

.tema-input-com-sugestao {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
}

.tema-input-com-sugestao input {
  flex: 1 !important;
  padding: 0.75rem 1rem !important;
  border-radius: var(--radius-md, 8px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.94rem !important;
}

.btn-sugerir-tema-rapido {
  background: var(--bg-subtle, #f1f5f9) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  color: var(--text-main, #334155) !important;
  padding: 0.75rem 1rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-size: 0.84rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  transition: all 0.2s ease !important;
}

.btn-sugerir-tema-rapido:hover {
  background: var(--primary-accent, #3b82f6) !important;
  color: #ffffff !important;
}

.btn-gerar-tema-executar {
  width: 100% !important;
  padding: 0.85rem !important;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.96rem !important;
  font-weight: 800 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.6rem !important;
  box-shadow: 0 4px 18px rgba(139, 92, 246, 0.4) !important;
  transition: all 0.2s ease !important;
}

.btn-gerar-tema-executar:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.55) !important;
}

.preview-tema-gerado {
  background: var(--bg-subtle, #f8fafc) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  border-radius: var(--radius-lg, 12px) !important;
  padding: 1.25rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.85rem !important;
  margin-top: 0.5rem !important;
}

.preview-tema-header {
  display: flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
}

.preview-badge {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  padding: 0.2rem 0.55rem !important;
  border-radius: var(--radius-full, 9999px) !important;
}

.preview-tema-header h4 {
  margin: 0 !important;
  font-size: 1.05rem !important;
  color: var(--text-main, #0f172a) !important;
}

.preview-textos-motivadores {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
}

.preview-texto-card {
  background: var(--bg-card, #ffffff) !important;
  border: 1px solid var(--border-light, #e2e8f0) !important;
  border-radius: var(--radius-md, 8px) !important;
  padding: 0.85rem !important;
}

.preview-texto-card strong {
  display: block !important;
  color: var(--primary-accent, #2563eb) !important;
  font-size: 0.82rem !important;
  margin-bottom: 0.35rem !important;
}

.preview-texto-card p {
  margin: 0 !important;
  font-size: 0.84rem !important;
  color: var(--text-main, #334155) !important;
  line-height: 1.45 !important;
}

.btn-aplicar-tema-gerado {
  width: 100% !important;
  padding: 0.8rem !important;
  background: linear-gradient(135deg, #10b981, #059669) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-size: 0.92rem !important;
  font-weight: 800 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  transition: all 0.2s ease !important;
}

.btn-aplicar-tema-gerado:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4) !important;
}

/* Modo Escuro para Janelas Flutuantes e Novos Modais */
[data-theme="dark"] .janela-flutuante-widget {
  background: #0f172a !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .janela-flutuante-body {
  background: #0f172a !important;
}

[data-theme="dark"] .mini-chat-balao {
  background: #1e293b !important;
  color: #f1f5f9 !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .mini-chip-btn {
  background: #1e293b !important;
  color: #cbd5e1 !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .mini-chat-input-bar input,
[data-theme="dark"] .mini-nota-input,
[data-theme="dark"] .mini-nota-select,
[data-theme="dark"] .mini-nota-textarea {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .mini-foco-tempo {
  color: #ffffff !important;
}

[data-theme="dark"] .btn-som-chip {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .mini-foco-volume-row,
[data-theme="dark"] .ambient-sound-station,
[data-theme="dark"] .sound-station-volume-bar,
[data-theme="dark"] .redacao-seletor-moderno {
  background: #0b132b !important;
  border-color: #1e293b !important;
}

[data-theme="dark"] .redacao-tema-atual-nome,
[data-theme="dark"] .sound-station-header h4 {
  color: #ffffff !important;
}

[data-theme="dark"] .btn-abrir-catalogo-temas {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .catalogo-busca-box input,
[data-theme="dark"] .tema-input-com-sugestao input,
[data-theme="dark"] .cat-pill-btn {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .tema-catalogo-item-card {
  background: #1e293b !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .tema-item-titulo {
  color: #ffffff !important;
}

[data-theme="dark"] .btn-selecionar-tema-card,
[data-theme="dark"] .btn-sugerir-tema-rapido {
  background: #0f172a !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .preview-tema-gerado {
  background: #0b132b !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .preview-texto-card {
  background: #1e293b !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .preview-texto-card p {
  color: #cbd5e1 !important;
}

/* Modo Descanso / Luz Amarela para Janelas Flutuantes */
[data-theme="warm"] .janela-flutuante-widget {
  background: #fdf6ec !important;
  border-color: #ebd5b3 !important;
}

[data-theme="warm"] .janela-flutuante-body {
  background: #fdf6ec !important;
}

[data-theme="warm"] .janela-arrastavel-header,
[data-theme="warm"] .janela-flutuante-header {
  background: #4a2810 !important;
}

[data-theme="warm"] .redacao-seletor-moderno,
[data-theme="warm"] .ambient-sound-station {
  background: #fff8ef !important;
  border-color: #ebd5b3 !important;
}
"@

[System.IO.File]::AppendAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
Write-Host "Appended floating windows, sound station and redacao CSS to css/style.css"
