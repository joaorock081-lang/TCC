$css = [System.IO.File]::ReadAllText('css/style.css', [System.Text.Encoding]::UTF8)

$navGroupedCss = @'

/* ========================================================
   MENU DE ABAS AGRUPADAS (☰ TRÊS LISTRAS) & DROPDOWNS
   ======================================================== */

/* Botão das 3 Listras (Menu de Abas & Grupos) */
.btn-menu-hamburguer {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 16%, var(--bg-card, #ffffff));
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 38%, transparent);
  color: var(--text-main, #0f172a);
  padding: 0.52rem 1.05rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-menu-hamburguer:hover {
  background: var(--primary-accent, #2563eb);
  color: #ffffff;
  border-color: var(--primary-accent, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px var(--primary-glow, rgba(37, 99, 235, 0.45));
}

.icone-hamburguer-listras {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17px;
  height: 13px;
  flex-shrink: 0;
}

.icone-hamburguer-listras span {
  display: block;
  width: 100%;
  height: 2.3px;
  background-color: currentColor;
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-menu-hamburguer:hover .icone-hamburguer-listras span:nth-child(2) {
  transform: translateX(3px);
}

/* Itens de Grupo e Menus Suspensos no Topo */
.nav-group-item {
  position: relative;
  list-style: none;
}

.nav-group-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.flecha-grupo, .flecha-dropdown {
  font-size: 0.72rem;
  transition: transform 0.22s ease;
  opacity: 0.8;
  margin-left: 0.15rem;
}

.nav-group-item:hover .flecha-grupo,
.nav-group-item.aberto .flecha-grupo,
.header-dropdown-wrapper.aberto .flecha-dropdown {
  transform: rotate(180deg);
  opacity: 1;
}

.nav-group-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 300px;
  background: var(--bg-card, #ffffff);
  border: 1.5px solid var(--border-light, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-lg, 16px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.32);
  padding: 0.6rem;
  display: none;
  flex-direction: column;
  gap: 0.4rem;
  z-index: 1050;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: animDropdownPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes animDropdownPop {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.nav-group-item.aberto .nav-group-dropdown,
.nav-group-item:hover .nav-group-dropdown {
  display: flex;
}

.nav-group-subitem {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.65rem 0.85rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md, 10px);
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
  color: var(--text-main, #0f172a);
}

.nav-group-subitem:hover {
  background: var(--bg-subtle, rgba(255, 255, 255, 0.08));
  border-color: var(--border-light);
  transform: translateX(3px);
}

.nav-group-subitem.active {
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 18%, var(--bg-subtle));
  border-left: 3.5px solid var(--primary-accent, #3b82f6);
}

.nav-group-subitem .subitem-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  flex-shrink: 0;
}

.nav-group-subitem .subitem-texto {
  display: flex;
  flex-direction: column;
}

.nav-group-subitem .subitem-texto strong {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-main, #0f172a);
}

.nav-group-subitem .subitem-texto span {
  font-size: 0.76rem;
  color: var(--text-muted, #64748b);
  white-space: normal;
  line-height: 1.25;
}

/* Dropdown de Ferramentas no Header */
.header-dropdown-wrapper {
  position: relative;
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
}

.btn-header-ferramentas:hover {
  border-color: var(--primary-accent);
  color: var(--primary-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.header-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 280px;
  background: var(--bg-card);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.32);
  padding: 0.55rem;
  display: none;
  flex-direction: column;
  gap: 0.35rem;
  z-index: 1050;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: animDropdownPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.header-dropdown-wrapper.aberto .header-dropdown-menu,
.header-dropdown-wrapper:hover .header-dropdown-menu {
  display: flex;
}

.header-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.65rem 0.85rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
  color: var(--text-main);
}

.header-dropdown-item:hover {
  background: var(--bg-subtle);
  border-color: var(--border-light);
  transform: translateX(3px);
}

.header-dropdown-item i {
  font-size: 1.15rem;
  width: 26px;
  text-align: center;
  flex-shrink: 0;
}

.dropdown-item-info {
  display: flex;
  flex-direction: column;
}

.dropdown-item-info strong {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-main);
}

.dropdown-item-info span {
  font-size: 0.76rem;
  color: var(--text-muted);
  line-height: 1.25;
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
  padding: 0.65rem 0.85rem;
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
  background: color-mix(in srgb, var(--primary-accent) 12%, var(--bg-card));
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

/* Indicador de grupo ativo quando uma de suas abas estiver aberta */
.nav-group-item.has-active-child .nav-group-btn {
  background: var(--navy-900);
  color: #fff;
  box-shadow: 0 4px 14px rgba(12, 29, 59, 0.25);
}

[data-theme="dark"] .nav-group-item.has-active-child .nav-group-btn {
  background: linear-gradient(135deg, var(--primary-accent, #2563eb) 0%, var(--primary-light, #1d4ed8) 100%);
  color: #fff;
}
'@

$css = $css + "`n" + $navGroupedCss
[System.IO.File]::WriteAllText('css/style.css', $css, [System.Text.Encoding]::UTF8)
Write-Host "css/style.css updated with grouped nav styles!"
