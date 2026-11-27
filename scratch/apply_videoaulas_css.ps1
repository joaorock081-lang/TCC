$cssStyles = @"

/* ========================================================
   MÓDULO: VÍDEO AULAS DO YOUTUBE & MELHORES CANAIS (ESTUDAMAIS)
   ======================================================== */

.videoaulas-hero-card {
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary-base) 92%, #000) 0%, color-mix(in srgb, var(--primary-base-alt) 88%, #ef4444 12%) 100%);
  border: 1px solid color-mix(in srgb, var(--primary-accent) 25%, var(--border-light));
  border-radius: var(--radius-xl);
  padding: 2.2rem 2.4rem;
  color: #ffffff;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.videoaulas-hero-card::after {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.videoaulas-hero-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.videoaulas-hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.videoaulas-badge-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.btn-videoaulas-favoritos {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  padding: 0.55rem 1.15rem;
  font-size: 0.86rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
}

.btn-videoaulas-favoritos:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.btn-videoaulas-favoritos.active {
  background: #ec4899;
  border-color: #f472b6;
  box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
}

.videoaulas-hero-titulo {
  font-size: 1.85rem;
  font-weight: 800;
  margin-bottom: 0.65rem;
  line-height: 1.25;
}

.videoaulas-hero-desc {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 820px;
  line-height: 1.6;
  margin-bottom: 1.6rem;
}

.videoaulas-busca-box {
  position: relative;
  max-width: 680px;
}

.videoaulas-busca-box i.fa-magnifying-glass {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
  pointer-events: none;
}

.videoaulas-busca-box input {
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  border-radius: var(--radius-full);
  padding: 0.85rem 3rem 0.85rem 3rem;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  backdrop-filter: blur(8px);
  transition: all var(--transition-fast);
}

.videoaulas-busca-box input::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.videoaulas-busca-box input:focus {
  background: rgba(255, 255, 255, 0.22);
  border-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

.videoaulas-busca-box button#btn-limpar-busca-videoaulas {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Filtros Rápidos de Disciplina */
.videoaulas-filtros-bar {
  margin-bottom: 1.8rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  -webkit-overflow-scrolling: touch;
}

.videoaulas-filtros-scroll {
  display: flex;
  gap: 0.65rem;
  min-width: max-content;
}

.videoaulas-filtro-btn {
  background: var(--bg-paper);
  color: var(--text-secondary);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-full);
  padding: 0.6rem 1.15rem;
  font-size: 0.88rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.videoaulas-filtro-btn:hover {
  background: var(--primary-subtle);
  border-color: var(--primary-accent);
  color: var(--primary-accent);
  transform: translateY(-1px);
}

.videoaulas-filtro-btn.active {
  background: var(--primary-accent);
  border-color: var(--primary-accent);
  color: #ffffff !important;
  box-shadow: 0 4px 14px var(--primary-glow);
}

.videoaulas-filtro-btn.active i {
  color: #ffffff !important;
}

/* Dica Pedagógica */
.videoaulas-dica-banner {
  background: color-mix(in srgb, var(--primary-accent) 10%, var(--bg-paper));
  border: 1.5px solid color-mix(in srgb, var(--primary-accent) 30%, transparent);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.4rem;
  display: flex;
  gap: 1.1rem;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.videoaulas-dica-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--primary-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
}

.videoaulas-dica-texto h4 {
  font-size: 0.96rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.videoaulas-dica-texto p {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Grid de Canais */
.videoaulas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.4rem;
  margin-bottom: 3rem;
}

@media (max-width: 640px) {
  .videoaulas-grid {
    grid-template-columns: 1fr;
  }
}

.canal-card {
  background: var(--card-bg, #ffffff);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  position: relative;
}

.canal-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-accent);
}

.canal-card-topo {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.canal-icone-box {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.canal-ident-box {
  flex: 1;
}

.canal-nome-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

.canal-nome {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.25;
}

.canal-prof {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.45rem;
}

.canal-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.canal-badge-inscritos {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: var(--radius-full);
  padding: 0.18rem 0.65rem;
  font-size: 0.76rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.canal-badge-destaque {
  background: color-mix(in srgb, var(--primary-accent) 15%, transparent);
  color: var(--primary-accent);
  border: 1px solid color-mix(in srgb, var(--primary-accent) 30%, transparent);
  border-radius: var(--radius-full);
  padding: 0.18rem 0.65rem;
  font-size: 0.76rem;
  font-weight: 700;
}

.canal-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.1rem;
  flex: 1;
}

.canal-playlists-section {
  background: var(--bg-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  margin-bottom: 1.2rem;
}

.canal-playlists-titulo {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.55rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.canal-playlists-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.canal-playlist-pill {
  background: var(--bg-paper);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  padding: 0.2rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.canal-acoes-footer {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.55rem;
  align-items: center;
  margin-top: auto;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border-light);
}

.btn-canal-assistir {
  background: linear-gradient(135deg, var(--primary-accent), var(--primary-light));
  color: #ffffff;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.65rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
}

.btn-canal-assistir:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px var(--primary-glow);
}

.btn-canal-youtube {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
}

.btn-canal-youtube:hover {
  background: #ef4444;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.btn-canal-fav {
  background: var(--bg-paper);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  transition: all var(--transition-fast);
}

.btn-canal-fav:hover {
  color: #ec4899;
  border-color: #ec4899;
  transform: scale(1.08);
}

.btn-canal-fav.favoritado {
  color: #ec4899;
  border-color: #ec4899;
  background: rgba(236, 72, 153, 0.12);
}

/* Modal Player de Videoaula */
.modal-video-card {
  max-width: 860px !important;
  width: 95% !important;
  padding: 0 !important;
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #000000;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.video-player-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-player-footer {
  padding: 1.4rem;
}

.video-player-canal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--border-light);
}

.video-badge-canal {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-canal-externo {
  color: #ef4444;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
}

.btn-canal-externo:hover {
  text-decoration: underline;
}

.video-quick-notes-box {
  background: var(--bg-subtle);
  border-radius: var(--radius-md);
  padding: 1rem 1.2rem;
}

.notes-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.notes-header-row label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.btn-salvar-nota-video {
  background: var(--primary-accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-full);
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all var(--transition-fast);
}

.btn-salvar-nota-video:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.video-quick-notes-box textarea {
  width: 100%;
  background: var(--bg-paper);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
  font-size: 0.88rem;
  font-family: inherit;
  color: var(--text-main);
  outline: none;
  resize: vertical;
}

.video-quick-notes-box textarea:focus {
  border-color: var(--primary-accent);
}

/* Overrides Modo Escuro */
[data-theme="dark"] .canal-card {
  background: #131f37 !important;
  border-color: #273b61 !important;
}

[data-theme="dark"] .canal-playlists-section {
  background: #182744 !important;
}

[data-theme="dark"] .canal-playlist-pill {
  background: #1e3156 !important;
  border-color: #324976 !important;
  color: #cbd5e1 !important;
}

[data-theme="dark"] .videoaulas-dica-banner {
  background: #15233e !important;
  border-color: #2b426e !important;
}

/* Overrides Modo Descanso (Luz Amarelada) */
[data-theme="warm"] .canal-card {
  background: #f7efe2 !important;
  border-color: #dfd1b8 !important;
}

[data-theme="warm"] .canal-playlists-section {
  background: #efe4d0 !important;
}

[data-theme="warm"] .canal-playlist-pill {
  background: #fbf7ee !important;
  border-color: #dccdb0 !important;
  color: #5a452c !important;
}

[data-theme="warm"] .videoaulas-dica-banner {
  background: #f4ecdc !important;
  border-color: #decfae !important;
}
"@

[System.IO.File]::AppendAllText('css/style.css', $cssStyles, [System.Text.Encoding]::UTF8)
Write-Host "Videoaulas CSS styles appended successfully!"
