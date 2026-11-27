$css = @"

/* ========================================================
   CABEÇALHO EM 2 ANDARES (SUPERIOR + INFERIOR COMPLETO)
   Espaçoso, sem amontoamento, elegante e compacto
   ======================================================== */
.site-header-2-andares {
  padding: 0 !important;
  background: var(--bg-card, #ffffff) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
  border-bottom: 1.5px solid var(--border-light, #e2e8f0) !important;
}

[data-theme="dark"] .site-header-2-andares {
  background: #0c182b !important;
  border-bottom-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35) !important;
}

[data-theme="warm"] .site-header-2-andares {
  background: #fdf6ec !important;
  border-bottom-color: #ebd5b3 !important;
}

.header-andar-superior {
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 0.45rem 1.4rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 1.2rem !important;
}

.header-andar-inferior {
  background: color-mix(in srgb, var(--bg-card, #ffffff) 93%, var(--navy-900, #0f172a)) !important;
  border-top: 1px solid var(--border-light, #e2e8f0) !important;
  padding: 0.3rem 1.4rem !important;
}

[data-theme="dark"] .header-andar-inferior {
  background: #08111e !important;
  border-top-color: rgba(255, 255, 255, 0.08) !important;
}

[data-theme="warm"] .header-andar-inferior {
  background: #fbf0df !important;
  border-top-color: #ebd5b3 !important;
}

.header-andar-inferior .nav-grouped-wrapper {
  max-width: 1440px !important;
  margin: 0 auto !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
}

.header-divider-v {
  display: inline-block !important;
  width: 1px !important;
  height: 24px !important;
  background: var(--border-light, #cbd5e1) !important;
  margin: 0 0.25rem !important;
}

[data-theme="dark"] .header-divider-v {
  background: rgba(255, 255, 255, 0.18) !important;
}

/* ========================================================
   BANCO DE DADOS EM NUVEM & SINCRONIZAÇÃO MULTI-DISPOSITIVOS
   ======================================================== */
.btn-db-cloud {
  background: linear-gradient(135deg, #0284c7, #2563eb) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.7rem 1.25rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-family: inherit !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35) !important;
}

.btn-db-cloud:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5) !important;
}

.btn-db-devices {
  background: color-mix(in srgb, var(--primary-accent, #2563eb) 12%, var(--bg-card, #ffffff)) !important;
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #2563eb) 35%, transparent) !important;
  color: var(--primary-accent, #2563eb) !important;
  padding: 0.7rem 1.25rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-family: inherit !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  transition: all 0.2s ease !important;
}

.btn-db-devices:hover {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
}

[data-theme="dark"] .btn-db-devices {
  background: rgba(37, 99, 235, 0.2) !important;
  color: #93c5fd !important;
  border-color: rgba(37, 99, 235, 0.45) !important;
}

[data-theme="dark"] .btn-db-devices:hover {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
}

/* Modal Conectar Outros Dispositivos */
.modal-dispositivo-card {
  max-width: 640px !important;
  width: 94vw !important;
}

.modal-dispositivo-body {
  padding: 1.4rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 1.2rem !important;
}

.disp-metodo-box {
  background: var(--bg-subtle, #f8fafc) !important;
  border: 1.5px solid var(--border-light, #e2e8f0) !important;
  border-radius: var(--radius-md, 12px) !important;
  padding: 1.1rem !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 1rem !important;
}

[data-theme="dark"] .disp-metodo-box {
  background: #0f172a !important;
  border-color: #334155 !important;
}

.disp-metodo-icon {
  width: 44px !important;
  height: 44px !important;
  border-radius: 50% !important;
  background: rgba(2, 132, 199, 0.15) !important;
  color: #0284c7 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.2rem !important;
  flex-shrink: 0 !important;
}

.disp-metodo-info h4 {
  margin: 0 0 0.35rem 0 !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.98rem !important;
}

.disp-metodo-info p {
  margin: 0 !important;
  font-size: 0.85rem !important;
  color: var(--text-secondary, #64748b) !important;
  line-height: 1.45 !important;
}

.disp-codigo-wrapper {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  margin-top: 0.65rem !important;
}

.disp-codigo-input {
  flex: 1 !important;
  padding: 0.6rem 0.85rem !important;
  border-radius: var(--radius-md, 8px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--primary-accent, #2563eb) !important;
  font-family: monospace !important;
  font-size: 1rem !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
}

[data-theme="dark"] .disp-codigo-input {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #93c5fd !important;
}

.btn-copiar-codigo-disp {
  background: var(--primary-accent, #2563eb) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.6rem 1rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  transition: all 0.2s ease !important;
}

.disp-restaurar-box {
  background: color-mix(in srgb, var(--primary-accent, #2563eb) 8%, var(--bg-card, #ffffff)) !important;
  border: 1.5px dashed color-mix(in srgb, var(--primary-accent, #2563eb) 35%, transparent) !important;
  border-radius: var(--radius-md, 12px) !important;
  padding: 1.1rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
}

.disp-restaurar-box h4 {
  margin: 0 !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.95rem !important;
}

.disp-restaurar-box p {
  margin: 0 !important;
  font-size: 0.84rem !important;
  color: var(--text-secondary, #64748b) !important;
}

.disp-restaurar-row {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  flex-wrap: wrap !important;
  margin-top: 0.35rem !important;
}

.disp-input-restaurar {
  flex: 1 !important;
  min-width: 220px !important;
  padding: 0.6rem 0.85rem !important;
  border-radius: var(--radius-md, 8px) !important;
  border: 1.5px solid var(--border-light, #cbd5e1) !important;
  background: var(--bg-surface, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  font-size: 0.88rem !important;
}

[data-theme="dark"] .disp-input-restaurar {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

.btn-executar-sync-codigo {
  background: linear-gradient(135deg, #10b981, #059669) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0.65rem 1.1rem !important;
  border-radius: var(--radius-md, 8px) !important;
  font-weight: 700 !important;
  font-size: 0.84rem !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  transition: all 0.2s ease !important;
}

.btn-executar-sync-codigo:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4) !important;
}
"@

[System.IO.File]::AppendAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
Write-Host "Appended cloud sync and 2-andares header CSS!"
