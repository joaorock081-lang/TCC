$css = @"

/* ========================================================
   ATUALIZAÇÕES DE CABEÇALHO, SETAS DE NAVEGAÇÃO E PLAYER DE VÍDEO
   ======================================================== */

.nav-scroll-btn {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  border-radius: 50% !important;
  background: var(--bg-card) !important;
  border: 1.5px solid var(--border-light) !important;
  color: var(--text-main) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.8rem !important;
  cursor: pointer !important;
  z-index: 5 !important;
  flex-shrink: 0 !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  transform: scale(1) !important;
  transition: all 0.2s ease !important;
}

.nav-scroll-btn:hover {
  background: var(--primary-accent) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent) !important;
  transform: scale(1.15) !important;
  box-shadow: 0 4px 14px var(--primary-glow, rgba(37, 99, 235, 0.35)) !important;
}

[data-theme="dark"] .nav-scroll-btn {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .nav-scroll-btn:hover {
  background: var(--primary-accent) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent) !important;
}

[data-theme="warm"] .nav-scroll-btn {
  background: #fff8ef !important;
  border-color: #ebd5b3 !important;
  color: #5c3b1e !important;
}

/* Botões Fixos Compactos do Cabeçalho: Lousa, Notas, Tutor IA */
.btn-header-quick-fixo {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  padding: 0.42rem 0.75rem !important;
  border-radius: var(--radius-full) !important;
  background: var(--bg-card) !important;
  border: 1.5px solid var(--border-light) !important;
  color: var(--text-main) !important;
  font-family: inherit !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  white-space: nowrap !important;
  transition: all var(--transition-fast) !important;
  text-decoration: none !important;
  box-shadow: var(--shadow-xs) !important;
}

.btn-header-quick-fixo:hover {
  border-color: var(--primary-accent) !important;
  color: var(--primary-accent) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1) !important;
}

.btn-header-quick-fixo.btn-header-ia {
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 12%, var(--bg-card, #ffffff)) !important;
  border-color: color-mix(in srgb, var(--primary-accent, #3b82f6) 35%, transparent) !important;
}

[data-theme="dark"] .btn-header-quick-fixo {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

[data-theme="dark"] .btn-header-quick-fixo:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  border-color: var(--primary-accent) !important;
}

[data-theme="warm"] .btn-header-quick-fixo {
  background: #fff8ef !important;
  border-color: #ebd5b3 !important;
  color: #5c3b1e !important;
}

#btn-link-externo-video-topo {
  text-decoration: none !important;
}
"@

[System.IO.File]::AppendAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
Write-Host "Appended styles to css/style.css"
