$css = [System.IO.File]::ReadAllText('css/style.css', [System.Text.Encoding]::UTF8)

$cssReplacement = @'
/* ========================================================
   MENU DE ABAS (☰ 3 LISTRAS) & CENTRAL DE NAVEGAÇÃO
   ======================================================== */

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.7rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  overflow: visible;
}

.nav-grouped-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

/* Botão das 3 Listras (Menu de Abas & Grupos) - Alto Contraste & 100% Legível */
.btn-menu-hamburguer {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  background: linear-gradient(135deg, var(--primary-accent, #2563eb) 0%, var(--primary-light, #1d4ed8) 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
  padding: 0.55rem 1.15rem !important;
  border-radius: var(--radius-full) !important;
  font-family: inherit !important;
  font-size: 0.94rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
  box-shadow: 0 4px 16px var(--primary-glow, rgba(37, 99, 235, 0.45)) !important;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

.btn-menu-hamburguer span,
.btn-menu-hamburguer strong,
.btn-menu-hamburguer i {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.icone-hamburguer-listras {
  display: inline-flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  width: 18px !important;
  height: 13px !important;
  flex-shrink: 0 !important;
}

.icone-hamburguer-listras span {
  display: block !important;
  width: 100% !important;
  height: 2.3px !important;
  background-color: #ffffff !important;
  border-radius: 2px !important;
  transition: transform 0.2s ease, opacity 0.2s ease !important;
}

.btn-menu-hamburguer:hover {
  transform: translateY(-2px) scale(1.03) !important;
  box-shadow: 0 6px 24px var(--primary-glow, rgba(37, 99, 235, 0.65)) !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
}

.btn-menu-hamburguer:hover .icone-hamburguer-listras span:nth-child(2) {
  transform: translateX(3px) !important;
}

[data-theme="dark"] .btn-menu-hamburguer {
  background: linear-gradient(135deg, var(--primary-accent, #2563eb) 0%, #1e3a8a 100%) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
  box-shadow: 0 4px 18px var(--primary-glow, rgba(37, 99, 235, 0.55)) !important;
}

[data-theme="warm"] .btn-menu-hamburguer {
  background: linear-gradient(135deg, var(--primary-accent, #b45309) 0%, #78350f 100%) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
}

/* Área de ações do cabeçalho - Nunca cortada à direita */
.header-actions {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  flex-shrink: 0 !important;
  z-index: 10;
}

.btn-header-ferramentas {
  background: var(--bg-card);
  color: var(--text-main);
  border: 1.5px solid var(--border-light);
  padding: 0.52rem 0.95rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-xs);
  white-space: nowrap;
}

.btn-header-ferramentas:hover {
  border-color: var(--primary-accent);
  color: var(--primary-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

[data-theme="dark"] .btn-header-ferramentas {
  background: var(--navy-800);
  border-color: var(--navy-600);
  color: #ffffff;
}

[data-theme="dark"] .btn-header-ferramentas:hover {
  background: var(--navy-700);
  border-color: var(--primary-accent);
}

/* Modal Central de Abas por Grupos (☰) */
.modal-menu-abas-card {
  max-width: 960px;
  width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
}

.modal-menu-abas-body {
  overflow-y: auto;
  padding: 1.2rem 1.6rem 2rem;
}

.menu-abas-busca-box {
  position: relative;
  margin-bottom: 1.4rem;
}

.menu-abas-busca-box i {
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1rem;
}

.menu-abas-busca-box input {
  width: 100%;
  padding: 0.85rem 1.2rem 0.85rem 2.8rem;
  background: var(--bg-subtle);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-main);
  font-size: 0.95rem;
  outline: none;
  transition: all var(--transition-fast);
}

.menu-abas-busca-box input:focus {
  border-color: var(--primary-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-accent) 25%, transparent);
}

.menu-abas-grupos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

@media (max-width: 768px) {
  .menu-abas-grupos-grid {
    grid-template-columns: 1fr;
  }
}

.menu-aba-grupo-bloco {
  background: color-mix(in srgb, var(--bg-subtle) 60%, transparent);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.grupo-bloco-titulo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
}

.grupo-bloco-titulo h4 {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.grupo-bloco-itens {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.menu-aba-item-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 0.7rem 0.95rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: var(--text-main);
  position: relative;
}

.menu-aba-item-card:hover {
  transform: translateY(-2px) scale(1.01);
  border-color: var(--primary-accent);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.menu-aba-item-card.ativo {
  border-color: var(--primary-accent);
  background: color-mix(in srgb, var(--primary-accent) 14%, var(--bg-card));
  box-shadow: 0 0 0 2px var(--primary-accent);
}

.menu-aba-item-card.ativo::after {
  content: '✓ Aberta';
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  font-size: 0.7rem;
  font-weight: 800;
  background: var(--primary-accent);
  color: #fff;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}

.menu-item-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.menu-item-desc {
  display: flex;
  flex-direction: column;
  padding-right: 1.5rem;
}

.menu-item-desc strong {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
}

.menu-item-desc span {
  font-size: 0.76rem;
  color: var(--text-muted);
  line-height: 1.25;
}
'@

# We replace the previous section of /* MENU DE ABAS AGRUPADAS (☰ TRÊS LISTRAS) & DROPDOWNS */
$startMarker = "/* ========================================================" + "`n" + "   MENU DE ABAS AGRUPADAS (☰ TRÊS LISTRAS) & DROPDOWNS"
if ($css.Contains($startMarker)) {
  $idx = $css.IndexOf($startMarker)
  $css = $css.Substring(0, $idx) + $cssReplacement
  Write-Host "Replaced existing nav grouped CSS block."
} else {
  $css = $css + "`n" + $cssReplacement
  Write-Host "Appended new nav grouped CSS block."
}

[System.IO.File]::WriteAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
