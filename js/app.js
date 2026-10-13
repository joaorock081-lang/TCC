/**
 * APLICAÇÃO PRINCIPAL - ESTUDAMAIS PORTAL DO VESTIBULANDO
 * TCC: Plataforma de Apoio aos Estudos
 */

// Estado da Aplicação
const AppState = {
  currentTab: 'inicio',
  currentVestibular: 'enem',
  searchQuery: '',
  notes: [],
  checklistProgresso: {},
  dailyTasks: [],
  pomodoro: {
    timerId: null,
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    mode: 'foco', // 'foco', 'curta', 'longa'
    isRunning: false,
    ciclosCompletos: 0
  },
  soundGenerator: {
    audioCtx: null,
    noiseNode: null,
    isPlaying: false
  },
  quiz: {
    currentCategory: 'todas',
    currentIndex: 0,
    score: 0,
    streak: 0,
    totalRespondidas: 0,
    totalAcertos: 0,
    activeQuestions: [],
    answered: false,
    escolhida: null
  },
  lousa: {
    canvas: null,
    ctx: null,
    tool: 'pen', // 'pen', 'eraser'
    color: '#1e293b',
    size: 4,
    isDrawing: false,
    history: [],
    maxHistory: 15,
    isVisible: false,
    isMinimizado: false
  }
};

// Frases motivacionais para vestibulandos
const FRASES_MOTIVACIONAIS = [
  { frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" },
  { frase: "A persistência é o caminho do êxito. Respire fundo e faça o seu melhor hoje.", autor: "Charles Chaplin" },
  { frase: "Você não precisa ver toda a escada, apenas dê o primeiro passo.", autor: "Martin Luther King Jr." },
  { frase: "A disciplina é a ponte entre suas metas e suas realizações na faculdade dos seus sonhos.", autor: "Jim Rohn" },
  { frase: "Cada questão resolvida hoje é uma dúvida a menos no dia da prova.", autor: "Equipe EstudaMais" },
  { frase: "Respeite seu ritmo, cuide do seu sono e confie na sua trajetória de estudos.", autor: "Equipe EstudaMais" }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarDadosLocais();
  configurarNavegacao();
  renderizarFraseMotivacional();
  renderizarVestibularesTabs();
  renderizarVestibularAtivo();
  renderizarDicasEstudo();
  renderizarNotas();
  renderizarTarefas();
  configurarPomodoro();
  configurarRuidoAmbiente();
  configurarPesquisaGlobal();
  configurarQuiz();
  configurarLousa();
  atualizarEstatisticasDashboard();
});

/* ========================================================
   LOCAL STORAGE & PERSISTÊNCIA
   ======================================================== */
function carregarDadosLocais() {
  try {
    const notasSalvas = localStorage.getItem('estudamais_notas');
    if (notasSalvas) {
      AppState.notes = JSON.parse(notasSalvas);
    } else {
      // Notas padrão de boas-vindas
      AppState.notes = [
        {
          id: 'nota-1',
          titulo: '📌 Dica de Ouro: Como Usar este Site',
          categoria: 'Geral',
          conteudo: 'Bem-vindo ao seu portal de estudos do TCC!\n\n1. Use a aba "Vestibulares" para ver os conteúdos mais cobrados e marcar o que já estudou.\n2. No "Bloco de Notas", você pode registrar resumos de fórmulas e repertórios socioculturais.\n3. Ative o "Pomodoro" e o som de chuva suave para manter foco total.',
          cor: 'azul',
          favorita: true,
          data: new Date().toLocaleDateString('pt-BR')
        },
        {
          id: 'nota-2',
          titulo: '✍️ Repertório Coringa para Redação',
          categoria: 'Redação',
          conteudo: 'Conceito: Cidadania de Papel (Gilberto Dimenstein).\nIdeia central: Os direitos sociais estão garantidos na Constituição Federal de 1988, mas ainda não se concretizam plenamente na vida real do cidadão comum.',
          cor: 'marinho',
          favorita: false,
          data: new Date().toLocaleDateString('pt-BR')
        }
      ];
      salvarNotas();
    }

    const progressoSalvo = localStorage.getItem('estudamais_progresso');
    if (progressoSalvo) {
      AppState.checklistProgresso = JSON.parse(progressoSalvo);
    }

    const tarefasSalvas = localStorage.getItem('estudamais_tarefas');
    if (tarefasSalvas) {
      AppState.dailyTasks = JSON.parse(tarefasSalvas);
    } else {
      AppState.dailyTasks = [
        { id: 'task-1', texto: 'Revisar ecologia e teias alimentares', feita: true },
        { id: 'task-2', texto: 'Fazer 5 exercícios de Matemática Básica (razão/proporção)', feita: false },
        { id: 'task-3', texto: 'Escrever introdução da redação da semana', feita: false }
      ];
      salvarTarefas();
    }

    const ciclos = localStorage.getItem('estudamais_ciclos_pomodoro');
    if (ciclos) {
      AppState.pomodoro.ciclosCompletos = parseInt(ciclos, 10) || 0;
    }
  } catch (e) {
    console.error('Erro ao carregar dados do LocalStorage:', e);
  }
}

function salvarNotas() {
  localStorage.setItem('estudamais_notas', JSON.stringify(AppState.notes));
  atualizarEstatisticasDashboard();
}

function salvarProgresso() {
  localStorage.setItem('estudamais_progresso', JSON.stringify(AppState.checklistProgresso));
  atualizarEstatisticasDashboard();
}

function salvarTarefas() {
  localStorage.setItem('estudamais_tarefas', JSON.stringify(AppState.dailyTasks));
}

/* ========================================================
   NAVEGAÇÃO PRINCIPAL ENTRE ABAS
   ======================================================== */
function configurarNavegacao() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.dataset.tab;
      mudarAba(targetTab);
    });
  });

  // Botões de ação rápida no Hero
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      mudarAba(btn.dataset.goto);
    });
  });
}

function mudarAba(tabId) {
  AppState.currentTab = tabId;

  // Atualiza botões superiores
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Atualiza botões da barra inferior no celular
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Atualiza seções
  document.querySelectorAll('.tab-content').forEach(section => {
    if (section.id === `tab-${tabId}`) {
      section.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      section.classList.remove('active');
    }
  });

  if (tabId === 'vestibulares') {
    renderizarVestibularAtivo();
  }
}

/* ========================================================
   FRASES & DASHBOARD
   ======================================================== */
function renderizarFraseMotivacional() {
  const container = document.getElementById('frase-motivacional');
  if (!container) return;
  const aleatoria = FRASES_MOTIVACIONAIS[Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)];
  container.innerHTML = `
    <i class="fa-solid fa-quote-left quote-icon"></i>
    <p class="frase-texto">"${aleatoria.frase}"</p>
    <span class="frase-autor">— ${aleatoria.autor}</span>
  `;
}

function atualizarEstatisticasDashboard() {
  // Total de tópicos e concluídos
  let totalTopicos = 0;
  let concluidos = 0;

  Object.keys(VESTIBULARES_DATA).forEach(vestId => {
    const v = VESTIBULARES_DATA[vestId];
    v.areas.forEach(area => {
      area.disciplinas.forEach(disc => {
        disc.topicos.forEach((topico, idx) => {
          totalTopicos++;
          const key = `${vestId}-${disc.nome}-${idx}`;
          if (AppState.checklistProgresso[key]) {
            concluidos++;
          }
        });
      });
    });
  });

  const percGeral = totalTopicos > 0 ? Math.round((concluidos / totalTopicos) * 100) : 0;

  const statProgresso = document.getElementById('stat-progresso-total');
  if (statProgresso) {
    statProgresso.textContent = `${percGeral}%`;
  }

  const statTopicos = document.getElementById('stat-topicos-concluidos');
  if (statTopicos) {
    statTopicos.textContent = `${concluidos}/${totalTopicos}`;
  }

  const statNotas = document.getElementById('stat-total-notas');
  if (statNotas) {
    statNotas.textContent = AppState.notes.length;
  }

  const statPomodoro = document.getElementById('stat-pomodoros-feitos');
  if (statPomodoro) {
    statPomodoro.textContent = AppState.pomodoro.ciclosCompletos;
  }

  const barraGeral = document.getElementById('barra-progresso-geral');
  if (barraGeral) {
    barraGeral.style.width = `${percGeral}%`;
  }
}

/* ========================================================
   SEÇÃO VESTIBULARES (ENEM, FUVEST, FATEC, UNICAMP)
   ======================================================== */
function renderizarVestibularesTabs() {
  const tabsContainer = document.getElementById('vestibulares-tabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = '';
  Object.keys(VESTIBULARES_DATA).forEach(vestKey => {
    const vest = VESTIBULARES_DATA[vestKey];
    const btn = document.createElement('button');
    btn.className = `vest-tab-btn ${vestKey === AppState.currentVestibular ? 'active' : ''}`;
    btn.dataset.vest = vestKey;
    btn.innerHTML = `
      <i class="fa-solid ${vest.icone}"></i>
      <span>${vest.nome}</span>
      <span class="tab-badge">${vest.badge.split('/')[0].trim()}</span>
    `;
    btn.addEventListener('click', () => {
      AppState.currentVestibular = vestKey;
      document.querySelectorAll('.vest-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderizarVestibularAtivo();
    });
    tabsContainer.appendChild(btn);
  });
}

function renderizarVestibularAtivo() {
  const container = document.getElementById('vestibular-conteudo-detalhado');
  if (!container) return;

  const vest = VESTIBULARES_DATA[AppState.currentVestibular];
  if (!vest) return;

  // Calcula progresso deste vestibular específico
  let totalDesteVest = 0;
  let concluidosDesteVest = 0;

  vest.areas.forEach(area => {
    area.disciplinas.forEach(disc => {
      disc.topicos.forEach((_, idx) => {
        totalDesteVest++;
        const key = `${vest.id}-${disc.nome}-${idx}`;
        if (AppState.checklistProgresso[key]) concluidosDesteVest++;
      });
    });
  });

  const perc = totalDesteVest > 0 ? Math.round((concluidosDesteVest / totalDesteVest) * 100) : 0;

  let html = `
    <div class="vest-header-card">
      <div class="vest-header-info">
        <div class="vest-badge-tag"><i class="fa-solid ${vest.icone}"></i> ${vest.badge}</div>
        <h2 class="vest-title">${vest.tituloCompleto} (${vest.nome})</h2>
        <p class="vest-resumo">${vest.resumo}</p>
        
        <div class="vest-detalhes-grid">
          <div class="vest-detalhe-item">
            <span class="detalhe-label"><i class="fa-regular fa-clock"></i> Formato da Prova:</span>
            <span class="detalhe-val">${vest.detalhesGerais.formato || vest.detalhesGerais.primeiraFase}</span>
          </div>
          ${vest.detalhesGerais.segundaFase ? `
            <div class="vest-detalhe-item">
              <span class="detalhe-label"><i class="fa-solid fa-pen-ruler"></i> 2ª Fase:</span>
              <span class="detalhe-val">${vest.detalhesGerais.segundaFase}</span>
            </div>
          ` : ''}
          ${vest.detalhesGerais.totalQuestoes ? `
            <div class="vest-detalhe-item">
              <span class="detalhe-label"><i class="fa-solid fa-list-check"></i> Questões:</span>
              <span class="detalhe-val">${vest.detalhesGerais.totalQuestoes}</span>
            </div>
          ` : ''}
          <div class="vest-detalhe-item dica-ouro">
            <span class="detalhe-label"><i class="fa-solid fa-lightbulb"></i> Dica Estratégica:</span>
            <span class="detalhe-val">${vest.detalhesGerais.dicaChave}</span>
          </div>
        </div>
      </div>

      <div class="vest-progresso-box">
        <div class="progresso-radial-text">
          <span class="perc-num">${perc}%</span>
          <span class="perc-label">Estudado</span>
        </div>
        <div class="progresso-barra-fundo">
          <div class="progresso-barra-preenchimento" style="width: ${perc}%"></div>
        </div>
        <span class="progresso-contagem">${concluidosDesteVest} de ${totalDesteVest} tópicos concluídos</span>
      </div>
    </div>
  `;

  // Se tiver Obras Obrigatórias (Fuvest e Unicamp)
  if (vest.obrasObrigatorias) {
    html += `
      <div class="vest-secao-especial obras-container">
        <div class="secao-header">
          <div class="secao-icon-badge"><i class="fa-solid fa-book-bookmark"></i></div>
          <div>
            <h3 class="secao-titulo">Leituras e Obras Obrigatórias (${vest.obrasObrigatorias.ano})</h3>
            <p class="secao-sub">${vest.obrasObrigatorias.descricao}</p>
          </div>
        </div>
        <div class="obras-grid">
          ${vest.obrasObrigatorias.lista.map((item, idx) => {
            const keyObra = `obra-${vest.id}-${idx}`;
            const lida = AppState.checklistProgresso[keyObra] || false;
            return `
              <div class="obra-card ${lida ? 'obra-lida' : ''}">
                <div class="obra-card-top">
                  <span class="obra-autor"><i class="fa-solid fa-user-pen"></i> ${item.autor}</span>
                  <label class="custom-checkbox-container" title="Marcar leitura como concluída">
                    <input type="checkbox" ${lida ? 'checked' : ''} onchange="alternarProgresso('${keyObra}')">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <h4 class="obra-titulo">${item.obra}</h4>
                <p class="obra-genero">${item.genero}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Se tiver seção especial de Redação (Enem ou Fatec)
  if (vest.redacao) {
    html += `
      <div class="vest-secao-especial redacao-container">
        <div class="secao-header">
          <div class="secao-icon-badge"><i class="fa-solid fa-feather-pointed"></i></div>
          <div>
            <h3 class="secao-titulo">${vest.redacao.titulo}</h3>
            <p class="secao-sub">${vest.redacao.descricao || vest.redacao.foco}</p>
          </div>
        </div>
        ${vest.redacao.competencias ? `
          <div class="competencias-grid">
            ${vest.redacao.competencias.map(comp => `
              <div class="competencia-card">
                <div class="comp-badge">Competência ${comp.num}</div>
                <h4 class="comp-nome">${comp.nome}</h4>
                <p class="comp-desc">${comp.desc}</p>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="fatec-redacao-box">
            <p><strong>Formato:</strong> ${vest.redacao.formato}</p>
            <p><strong>Dica da banca:</strong> ${vest.redacao.dica}</p>
          </div>
        `}
      </div>
    `;
  }

  // Áreas e Disciplinas
  html += `
    <div class="areas-disciplinas-container">
      <div class="areas-header-bar">
        <h3><i class="fa-solid fa-layer-group"></i> Conteúdos e Matérias que Mais Caem</h3>
        <span class="dica-checklist"><i class="fa-regular fa-square-check"></i> Clique no checkbox para marcar o que você já estudou!</span>
      </div>

      <div class="areas-accordion">
        ${vest.areas.map(area => `
          <div class="area-accordion-item open">
            <div class="area-accordion-header">
              <h4><i class="fa-solid ${area.icone}"></i> ${area.nome}</h4>
              <span class="toggle-icon"><i class="fa-solid fa-chevron-down"></i></span>
            </div>
            <div class="area-accordion-body">
              <div class="disciplinas-grid">
                ${area.disciplinas.map(disc => `
                  <div class="disciplina-card">
                    <h5 class="disciplina-titulo"><i class="fa-solid fa-book"></i> ${disc.nome}</h5>
                    <ul class="topicos-lista">
                      ${disc.topicos.map((topico, idx) => {
                        const key = `${vest.id}-${disc.nome}-${idx}`;
                        const marcado = AppState.checklistProgresso[key] || false;
                        return `
                          <li class="topico-item ${marcado ? 'concluido' : ''}">
                            <label class="custom-checkbox-container">
                              <input type="checkbox" ${marcado ? 'checked' : ''} onchange="alternarProgresso('${key}')">
                              <span class="checkmark"></span>
                              <span class="topico-texto">${topico}</span>
                            </label>
                          </li>
                        `;
                      }).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Configura accordion toggle
  container.querySelectorAll('.area-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      parent.classList.toggle('open');
    });
  });
}

window.alternarProgresso = function(chave) {
  if (AppState.checklistProgresso[chave]) {
    delete AppState.checklistProgresso[chave];
  } else {
    AppState.checklistProgresso[chave] = true;
  }
  salvarProgresso();
  renderizarVestibularAtivo();
  atualizarEstatisticasDashboard();
};

/* ========================================================
   PESQUISA GLOBAL DE CONTEÚDOS
   ======================================================== */
function configurarPesquisaGlobal() {
  const inputBusca = document.getElementById('busca-materias');
  const resultadosBusca = document.getElementById('resultados-busca');
  if (!inputBusca || !resultadosBusca) return;

  inputBusca.addEventListener('input', (e) => {
    const termo = e.target.value.trim().toLowerCase();
    AppState.searchQuery = termo;

    if (termo.length < 2) {
      resultadosBusca.classList.remove('active');
      resultadosBusca.innerHTML = '';
      return;
    }

    const matches = [];

    // Varre todos os vestibulares
    Object.keys(VESTIBULARES_DATA).forEach(vestKey => {
      const vest = VESTIBULARES_DATA[vestKey];
      vest.areas.forEach(area => {
        area.disciplinas.forEach(disc => {
          disc.topicos.forEach(topico => {
            if (topico.toLowerCase().includes(termo) || disc.nome.toLowerCase().includes(termo)) {
              matches.push({
                vestibular: vest.nome,
                vestId: vest.id,
                area: area.nome,
                disciplina: disc.nome,
                topico: topico
              });
            }
          });
        });
      });

      // Varre obras se existirem
      if (vest.obrasObrigatorias) {
        vest.obrasObrigatorias.lista.forEach(obra => {
          if (obra.obra.toLowerCase().includes(termo) || obra.autor.toLowerCase().includes(termo) || obra.genero.toLowerCase().includes(termo)) {
            matches.push({
              vestibular: vest.nome,
              vestId: vest.id,
              area: 'Obras Literárias Obrigatórias',
              disciplina: obra.autor,
              topico: `${obra.obra} (${obra.genero})`
            });
          }
        });
      }
    });

    if (matches.length === 0) {
      resultadosBusca.innerHTML = `
        <div class="busca-sem-resultado">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>Nenhum conteúdo encontrado para "<strong>${termo}</strong>". Tente buscar por palavras como <em>Ecologia</em>, <em>Geometria</em>, <em>Era Vargas</em> ou <em>Redação</em>.</p>
        </div>
      `;
    } else {
      resultadosBusca.innerHTML = `
        <div class="busca-header-info">
          <span>Encontrados <strong>${matches.length}</strong> tópicos relacionados</span>
        </div>
        <div class="busca-lista-cards">
          ${matches.slice(0, 10).map(m => `
            <div class="busca-card-item" onclick="irParaVestibular('${m.vestId}')">
              <span class="busca-badge-vest">${m.vestibular}</span>
              <div class="busca-info-item">
                <span class="busca-disc">${m.disciplina}</span>
                <p class="busca-topico">${destacarTermo(m.topico, termo)}</p>
              </div>
              <i class="fa-solid fa-arrow-right busca-seta"></i>
            </div>
          `).join('')}
        </div>
      `;
    }

    resultadosBusca.classList.add('active');
  });

  // Fecha busca ao clicar fora
  document.addEventListener('click', (e) => {
    if (!inputBusca.contains(e.target) && !resultadosBusca.contains(e.target)) {
      resultadosBusca.classList.remove('active');
    }
  });
}

function destacarTermo(texto, termo) {
  const regex = new RegExp(`(${termo})`, 'gi');
  return texto.replace(regex, '<mark>$1</mark>');
}

window.irParaVestibular = function(vestId) {
  AppState.currentVestibular = vestId;
  mudarAba('vestibulares');
  const res = document.getElementById('resultados-busca');
  if (res) res.classList.remove('active');
  const input = document.getElementById('busca-materias');
  if (input) input.value = '';
};

/* ========================================================
   DICAS DE ESTUDO
   ======================================================== */
function renderizarDicasEstudo() {
  const container = document.getElementById('dicas-estudo-grid');
  if (!container) return;

  container.innerHTML = DICAS_ESTUDO_DATA.map(dica => `
    <div class="dica-card">
      <div class="dica-top">
        <span class="dica-categoria-badge">${dica.categoria}</span>
        <div class="dica-icon"><i class="fa-solid ${dica.icone}"></i></div>
      </div>
      <h3 class="dica-titulo">${dica.titulo}</h3>
      <p class="dica-resumo">${dica.resumo}</p>
      <div class="dica-passos">
        <ul>
          ${dica.conteudo.map(p => `<li><i class="fa-solid fa-check"></i> ${p}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* ========================================================
   BLOCO DE NOTAS INTEGRADO (COM LOCALSTORAGE E DOWNLOAD)
   ======================================================== */
function renderizarNotas(filtro = '') {
  const container = document.getElementById('lista-notas');
  if (!container) return;

  const notasFiltradas = AppState.notes.filter(n => {
    if (!filtro) return true;
    return n.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
           n.conteudo.toLowerCase().includes(filtro.toLowerCase()) ||
           n.categoria.toLowerCase().includes(filtro.toLowerCase());
  });

  // Ordena favoritas primeiro
  notasFiltradas.sort((a, b) => (b.favorita ? 1 : 0) - (a.favorita ? 1 : 0));

  if (notasFiltradas.length === 0) {
    container.innerHTML = `
      <div class="notas-vazia">
        <i class="fa-regular fa-clipboard"></i>
        <p>Nenhuma anotação encontrada.</p>
        <span>Clique no botão "Nova Anotação" acima para criar seus resumos e lembretes de estudo!</span>
      </div>
    `;
    return;
  }

  container.innerHTML = notasFiltradas.map(nota => `
    <div class="nota-card nota-cor-${nota.cor || 'azul'} ${nota.favorita ? 'favorita' : ''}">
      <div class="nota-card-header">
        <span class="nota-tag">${nota.categoria || 'Geral'}</span>
        <div class="nota-acoes">
          <button class="nota-btn-icon" onclick="alternarFavoritoNota('${nota.id}')" title="${nota.favorita ? 'Desafixar nota' : 'Fixar nota'}">
            <i class="fa-${nota.favorita ? 'solid' : 'regular'} fa-thumbtack"></i>
          </button>
          <button class="nota-btn-icon" onclick="copiarNota('${nota.id}')" title="Copiar texto">
            <i class="fa-regular fa-copy"></i>
          </button>
          <button class="nota-btn-icon" onclick="baixarNota('${nota.id}')" title="Baixar como arquivo .txt">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="nota-btn-icon btn-excluir" onclick="excluirNota('${nota.id}')" title="Excluir nota">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <h4 class="nota-titulo">${nota.titulo}</h4>
      <div class="nota-corpo">${formatarTextoNota(nota.conteudo)}</div>
      <div class="nota-rodape">
        <span class="nota-data"><i class="fa-regular fa-calendar"></i> ${nota.data}</span>
        <button class="nota-btn-editar" onclick="abrirModalEditarNota('${nota.id}')">
          <i class="fa-solid fa-pen"></i> Editar
        </button>
      </div>
    </div>
  `).join('');
}

function formatarTextoNota(texto) {
  if (!texto) return '';
  return texto.split('\n').map(l => l.trim() ? `<p>${escapeHTML(l)}</p>` : '<br>').join('');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Modal de Criação / Edição de Notas
window.abrirModalNovaNota = function() {
  const modal = document.getElementById('modal-nota');
  if (!modal) return;
  document.getElementById('modal-nota-titulo').textContent = 'Nova Anotação de Estudos';
  document.getElementById('nota-id-input').value = '';
  document.getElementById('nota-titulo-input').value = '';
  document.getElementById('nota-categoria-input').value = 'Geral';
  document.getElementById('nota-conteudo-input').value = '';
  document.getElementById('nota-cor-input').value = 'azul';
  modal.classList.add('active');
};

window.abrirModalEditarNota = function(id) {
  const nota = AppState.notes.find(n => n.id === id);
  if (!nota) return;
  const modal = document.getElementById('modal-nota');
  if (!modal) return;
  document.getElementById('modal-nota-titulo').textContent = 'Editar Anotação';
  document.getElementById('nota-id-input').value = nota.id;
  document.getElementById('nota-titulo-input').value = nota.titulo;
  document.getElementById('nota-categoria-input').value = nota.categoria;
  document.getElementById('nota-conteudo-input').value = nota.conteudo;
  document.getElementById('nota-cor-input').value = nota.cor || 'azul';
  modal.classList.add('active');
};

window.fecharModalNota = function() {
  const modal = document.getElementById('modal-nota');
  if (modal) modal.classList.remove('active');
};

window.salvarNotaModal = function() {
  const idInput = document.getElementById('nota-id-input').value;
  const titulo = document.getElementById('nota-titulo-input').value.trim();
  const categoria = document.getElementById('nota-categoria-input').value.trim();
  const conteudo = document.getElementById('nota-conteudo-input').value.trim();
  const cor = document.getElementById('nota-cor-input').value;

  if (!titulo) {
    alert('Por favor, dê um título para a sua anotação!');
    return;
  }

  if (idInput) {
    // Edição
    const idx = AppState.notes.findIndex(n => n.id === idInput);
    if (idx !== -1) {
      AppState.notes[idx].titulo = titulo;
      AppState.notes[idx].categoria = categoria || 'Geral';
      AppState.notes[idx].conteudo = conteudo;
      AppState.notes[idx].cor = cor;
      AppState.notes[idx].data = new Date().toLocaleDateString('pt-BR');
    }
  } else {
    // Nova Nota
    const novaNota = {
      id: 'nota-' + Date.now(),
      titulo: titulo,
      categoria: categoria || 'Geral',
      conteudo: conteudo,
      cor: cor,
      favorita: false,
      data: new Date().toLocaleDateString('pt-BR')
    };
    AppState.notes.unshift(novaNota);
  }

  salvarNotas();
  renderizarNotas();
  fecharModalNota();
  mostrarToast('Anotação salva com sucesso no seu caderno digital!');
};

window.excluirNota = function(id) {
  if (confirm('Tem certeza que deseja excluir esta anotação?')) {
    AppState.notes = AppState.notes.filter(n => n.id !== id);
    salvarNotas();
    renderizarNotas();
    mostrarToast('Anotação removida.');
  }
};

window.alternarFavoritoNota = function(id) {
  const nota = AppState.notes.find(n => n.id === id);
  if (nota) {
    nota.favorita = !nota.favorita;
    salvarNotas();
    renderizarNotas();
  }
};

window.copiarNota = function(id) {
  const nota = AppState.notes.find(n => n.id === id);
  if (nota) {
    const textoCompleto = `${nota.titulo}\n[${nota.categoria}] - ${nota.data}\n\n${nota.conteudo}`;
    navigator.clipboard.writeText(textoCompleto).then(() => {
      mostrarToast('Anotação copiada para a área de transferência!');
    });
  }
};

window.baixarNota = function(id) {
  const nota = AppState.notes.find(n => n.id === id);
  if (!nota) return;
  const texto = `CADERNO DIGITAL - ESTUDAMAIS TCC\n=================================\nTítulo: ${nota.titulo}\nMatéria/Categoria: ${nota.categoria}\nData: ${nota.data}\n\nCONTEÚDO:\n${nota.conteudo}\n`;
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nota.titulo.replace(/[^a-zA-Z0-9]/g, '_')}_Anotacao.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast('Download da anotação concluído!');
};

// Pesquisa rápida dentro do bloco de notas
document.addEventListener('DOMContentLoaded', () => {
  const buscaNotasInput = document.getElementById('busca-notas-input');
  if (buscaNotasInput) {
    buscaNotasInput.addEventListener('input', (e) => {
      renderizarNotas(e.target.value.trim());
    });
  }
});

/* ========================================================
   POMODORO TIMER INTERATIVO COM SÍNTESE DE ÁUDIO WEB
   ======================================================== */
function configurarPomodoro() {
  const displayTimer = document.getElementById('pomodoro-timer-display');
  const btnStart = document.getElementById('pomodoro-btn-start');
  const btnReset = document.getElementById('pomodoro-btn-reset');
  const modeBtns = document.querySelectorAll('.pomodoro-mode-btn');

  if (!displayTimer || !btnStart) return;

  function atualizarDisplay() {
    const m = Math.floor(AppState.pomodoro.timeLeft / 60);
    const s = AppState.pomodoro.timeLeft % 60;
    const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    displayTimer.textContent = str;
    document.title = AppState.pomodoro.isRunning ? `(${str}) Foco • EstudaMais` : 'EstudaMais • Portal do Vestibulando';
  }

  function setMode(mode) {
    AppState.pomodoro.mode = mode;
    pausarTimer();
    modeBtns.forEach(b => {
      if (b.dataset.mode === mode) b.classList.add('active');
      else b.classList.remove('active');
    });

    if (mode === 'foco') AppState.pomodoro.timeLeft = 25 * 60;
    else if (mode === 'curta') AppState.pomodoro.timeLeft = 5 * 60;
    else if (mode === 'longa') AppState.pomodoro.timeLeft = 15 * 60;

    AppState.pomodoro.totalDuration = AppState.pomodoro.timeLeft;
    atualizarDisplay();
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });

  function iniciarTimer() {
    if (AppState.pomodoro.isRunning) return;
    AppState.pomodoro.isRunning = true;
    btnStart.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    btnStart.classList.add('btn-pausado');

    AppState.pomodoro.timerId = setInterval(() => {
      if (AppState.pomodoro.timeLeft > 0) {
        AppState.pomodoro.timeLeft--;
        atualizarDisplay();
      } else {
        tocarSinoSuave();
        pausarTimer();
        if (AppState.pomodoro.mode === 'foco') {
          AppState.pomodoro.ciclosCompletos++;
          localStorage.setItem('estudamais_ciclos_pomodoro', AppState.pomodoro.ciclosCompletos);
          atualizarEstatisticasDashboard();
          mostrarToast('🎉 Parabéns! Ciclo de foco de 25min concluído! Hora de uma pausa para relaxar.');
          setMode('curta');
        } else {
          mostrarToast('⏰ Pausa concluída! Pronto para voltar ao foco nos estudos?');
          setMode('foco');
        }
      }
    }, 1000);
  }

  function pausarTimer() {
    if (AppState.pomodoro.timerId) {
      clearInterval(AppState.pomodoro.timerId);
      AppState.pomodoro.timerId = null;
    }
    AppState.pomodoro.isRunning = false;
    btnStart.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar Foco';
    btnStart.classList.remove('btn-pausado');
  }

  btnStart.addEventListener('click', () => {
    if (AppState.pomodoro.isRunning) {
      pausarTimer();
    } else {
      iniciarTimer();
    }
  });

  btnReset.addEventListener('click', () => {
    setMode(AppState.pomodoro.mode);
  });

  atualizarDisplay();
}

// Emite um sino de meditação/estudo agradável sem precisar de arquivos externos
function tocarSinoSuave() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // Tom Ré5 suave

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, ctx.currentTime); // Tom Lá5 harmônico

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 3.0);
    osc2.stop(ctx.currentTime + 3.0);
  } catch (e) {
    console.log('Áudio web não suportado ou bloqueado', e);
  }
}

/* ========================================================
   SOM AMBIENTE DE CHUVA / RUÍDO MARROM SUAVE PARA ESTUDO
   ======================================================== */
function configurarRuidoAmbiente() {
  const btnChuva = document.getElementById('btn-som-ambiente');
  if (!btnChuva) return;

  btnChuva.addEventListener('click', () => {
    if (AppState.soundGenerator.isPlaying) {
      pararRuido();
      btnChuva.innerHTML = '<i class="fa-solid fa-cloud-rain"></i> Ativar Som de Chuva Suave';
      btnChuva.classList.remove('som-ativo');
    } else {
      iniciarRuido();
      btnChuva.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Desativar Som de Chuva';
      btnChuva.classList.add('som-ativo');
    }
  });

  function iniciarRuido() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      AppState.soundGenerator.audioCtx = ctx;

      // Cria buffer de ruído rosa/marrom para sensação aconchegante de chuva/vento
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.05;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filtro passa-baixa para deixar acolhedor e aveludado
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      AppState.soundGenerator.noiseNode = whiteNoise;
      AppState.soundGenerator.isPlaying = true;
    } catch (e) {
      console.error('Erro ao iniciar som ambiente:', e);
    }
  }

  function pararRuido() {
    if (AppState.soundGenerator.noiseNode) {
      AppState.soundGenerator.noiseNode.stop();
      AppState.soundGenerator.noiseNode.disconnect();
    }
    if (AppState.soundGenerator.audioCtx) {
      AppState.soundGenerator.audioCtx.close();
    }
    AppState.soundGenerator.isPlaying = false;
  }
}

/* ========================================================
   CHECKLIST DE METAS DIÁRIAS DO ALUNO
   ======================================================== */
function renderizarTarefas() {
  const container = document.getElementById('lista-tarefas-diarias');
  if (!container) return;

  if (AppState.dailyTasks.length === 0) {
    container.innerHTML = '<li class="tarefa-vazia">Nenhuma meta pendente para hoje! Adicione suas prioridades abaixo.</li>';
    return;
  }

  container.innerHTML = AppState.dailyTasks.map(t => `
    <li class="tarefa-item ${t.feita ? 'feita' : ''}">
      <label class="custom-checkbox-container">
        <input type="checkbox" ${t.feita ? 'checked' : ''} onchange="alternarTarefa('${t.id}')">
        <span class="checkmark"></span>
        <span class="tarefa-texto">${escapeHTML(t.texto)}</span>
      </label>
      <button class="tarefa-btn-remover" onclick="removerTarefa('${t.id}')" title="Remover meta">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </li>
  `).join('');
}

window.adicionarNovaTarefa = function() {
  const input = document.getElementById('input-nova-tarefa');
  if (!input) return;
  const texto = input.value.trim();
  if (!texto) return;

  const nova = {
    id: 'task-' + Date.now(),
    texto: texto,
    feita: false
  };

  AppState.dailyTasks.push(nova);
  salvarTarefas();
  renderizarTarefas();
  input.value = '';
};

window.alternarTarefa = function(id) {
  const t = AppState.dailyTasks.find(x => x.id === id);
  if (t) {
    t.feita = !t.feita;
    salvarTarefas();
    renderizarTarefas();
  }
};

window.removerTarefa = function(id) {
  AppState.dailyTasks = AppState.dailyTasks.filter(x => x.id !== id);
  salvarTarefas();
  renderizarTarefas();
};

/* ========================================================
   TOAST NOTIFICAÇÃO
   ======================================================== */
function mostrarToast(mensagem) {
  let toast = document.getElementById('toast-notificacao');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notificacao';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${mensagem}</span>`;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

/* ========================================================
   ARENA DE ESTUDOS - QUIZ & EXERCÍCIOS DE VESTIBULAR
   ======================================================== */
function configurarQuiz() {
  const containerFiltros = document.getElementById('quiz-filtros-container');
  if (containerFiltros) {
    containerFiltros.querySelectorAll('.quiz-filtro-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        containerFiltros.querySelectorAll('.quiz-filtro-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtrarQuiz(btn.dataset.cat);
      });
    });
  }

  filtrarQuiz('todas');
}

function filtrarQuiz(categoria) {
  AppState.quiz.currentCategory = categoria;
  AppState.quiz.currentIndex = 0;
  AppState.quiz.answered = false;
  AppState.quiz.escolhida = null;

  if (categoria === 'todas') {
    AppState.quiz.activeQuestions = [...QUIZ_QUESTIONS];
  } else {
    AppState.quiz.activeQuestions = QUIZ_QUESTIONS.filter(q => q.categoria === categoria);
  }

  // Embaralha suavemente as questões para dinamismo
  AppState.quiz.activeQuestions.sort(() => Math.random() - 0.5);

  atualizarPlacarQuiz();
  renderizarQuestaoQuiz();
}

function atualizarPlacarQuiz() {
  const elPontos = document.getElementById('quiz-pontos');
  const elStreak = document.getElementById('quiz-streak');
  const elContador = document.getElementById('quiz-contador-questao');
  const elTaxa = document.getElementById('quiz-taxa-acerto');

  if (elPontos) elPontos.textContent = `${AppState.quiz.score} XP`;
  if (elStreak) elStreak.textContent = `${AppState.quiz.streak} 🔥`;

  if (elContador) {
    const total = AppState.quiz.activeQuestions.length;
    const atual = Math.min(AppState.quiz.currentIndex + 1, total);
    elContador.textContent = `Questão ${atual} de ${total}`;
  }

  if (elTaxa) {
    if (AppState.quiz.totalRespondidas > 0) {
      const perc = Math.round((AppState.quiz.totalAcertos / AppState.quiz.totalRespondidas) * 100);
      elTaxa.textContent = `${perc}%`;
    } else {
      elTaxa.textContent = '100%';
    }
  }
}

function renderizarQuestaoQuiz() {
  const container = document.getElementById('quiz-questao-container');
  if (!container) return;

  const total = AppState.quiz.activeQuestions.length;

  // Fim da rodada
  if (AppState.quiz.currentIndex >= total || total === 0) {
    const aproveitamento = total > 0 ? Math.round((AppState.quiz.totalAcertos / Math.max(AppState.quiz.totalRespondidas, 1)) * 100) : 0;
    container.innerHTML = `
      <div class="quiz-final-card">
        <span class="quiz-final-icon">🎉</span>
        <h3 class="quiz-final-titulo">Rodada Concluída com Sucesso!</h3>
        <p class="quiz-final-sub">Você completou todas as questões desta matéria. Veja o seu resultado:</p>
        
        <div class="quiz-score-big">
          <strong>${AppState.quiz.score} XP</strong>
          <span>Aproveitamento: ${aproveitamento}% de Acertos</span>
        </div>

        <br>
        <button class="btn-reiniciar-quiz" onclick="filtrarQuiz('${AppState.quiz.currentCategory}')">
          <i class="fa-solid fa-rotate-right"></i>
          <span>Jogar Novamente / Praticar Mais</span>
        </button>
      </div>
    `;
    return;
  }

  const q = AppState.quiz.activeQuestions[AppState.quiz.currentIndex];
  const letras = ['A', 'B', 'C', 'D', 'E'];

  let classeDif = 'badge-dif-media';
  if (q.dificuldade === 'Fácil') classeDif = 'badge-dif-facil';
  if (q.dificuldade === 'Difícil') classeDif = 'badge-dif-dificil';

  let html = `
    <div class="quiz-card-topo">
      <div class="quiz-badges-grupo">
        <span class="badge-vest-q"><i class="fa-solid fa-landmark"></i> ${q.vestibular}</span>
        <span class="badge-disc-q">${q.disciplina}</span>
        <span class="badge-dif-q ${classeDif}">${q.dificuldade}</span>
      </div>
      <button class="btn-rascunho-inline" onclick="alternarLousaRascunho()" title="Abrir Lousa para Rabiscar Cálculos">
        <i class="fa-solid fa-pen-ruler"></i>
        <span>${q.dicaConta ? '📐 Rabiscar Cálculos' : '✏️ Abrir Rascunho'}</span>
      </button>
    </div>

    <p class="quiz-enunciado">${q.enunciado}</p>

    <div class="quiz-alternativas-lista">
      ${q.alternativas.map((alt, idx) => {
        let classeEstado = '';
        if (AppState.quiz.answered) {
          if (idx === q.correta) {
            classeEstado = 'correta';
          } else if (idx === AppState.quiz.escolhida) {
            classeEstado = 'errada';
          }
        }
        return `
          <button class="quiz-alternativa-btn ${classeEstado}" 
            ${AppState.quiz.answered ? 'disabled' : ''} 
            onclick="responderQuestaoQuiz(${idx})">
            <span class="alt-letra-badge">${letras[idx]}</span>
            <span class="alt-texto">${alt}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  // Se já respondeu, adiciona painel de feedback explicativo
  if (AppState.quiz.answered) {
    const acertou = AppState.quiz.escolhida === q.correta;
    html += `
      <div class="quiz-feedback-box ${acertou ? 'feedback-correto' : 'feedback-errado'}">
        <div class="feedback-status-line">
          <i class="fa-solid ${acertou ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
          <span>${acertou ? 'Excelente! Resposta Correta! (+100 XP)' : 'Não foi dessa vez, mas veja a resolução detalhada:'}</span>
        </div>
        <p class="feedback-explicacao"><strong>Explicação do Professor:</strong> ${q.explicacao}</p>
        <div class="feedback-rodape">
          <button class="btn-proxima-questao" onclick="proximaQuestaoQuiz()">
            <span>Próxima Questão</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

window.responderQuestaoQuiz = function(idx) {
  if (AppState.quiz.answered) return;

  const q = AppState.quiz.activeQuestions[AppState.quiz.currentIndex];
  AppState.quiz.answered = true;
  AppState.quiz.escolhida = idx;
  AppState.quiz.totalRespondidas++;

  if (idx === q.correta) {
    AppState.quiz.score += 100;
    AppState.quiz.streak++;
    AppState.quiz.totalAcertos++;
    tocarSomAcerto();
    mostrarToast('🎯 Parabéns! Você acertou a questão!');
  } else {
    AppState.quiz.streak = 0;
  }

  atualizarPlacarQuiz();
  renderizarQuestaoQuiz();
};

window.proximaQuestaoQuiz = function() {
  AppState.quiz.currentIndex++;
  AppState.quiz.answered = false;
  AppState.quiz.escolhida = null;
  atualizarPlacarQuiz();
  renderizarQuestaoQuiz();
};

function tocarSomAcerto() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // Dó5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // Mi5
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // Sol5
    osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // Dó6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    console.log('Áudio de acerto não suportado:', e);
  }
}

/* ========================================================
   LOUSA DE RASCUNHO INTERATIVA (CANVAS PARA CONTAS E RABISCOS)
   ======================================================== */
function configurarLousa() {
  const canvas = document.getElementById('lousa-canvas');
  if (!canvas) return;

  AppState.lousa.canvas = canvas;
  AppState.lousa.ctx = canvas.getContext('2d', { willReadFrequently: true });

  redimensionarCanvasLousa();

  window.addEventListener('resize', () => {
    redimensionarCanvasLousa();
  });

  // Eventos de Desenho com suporte a Touch Stylus e Mouse (Pointer Events)
  canvas.addEventListener('pointerdown', iniciarDesenhoLousa);
  canvas.addEventListener('pointermove', desenharLousa);
  canvas.addEventListener('pointerup', finalizarDesenhoLousa);
  canvas.addEventListener('pointercancel', finalizarDesenhoLousa);
  canvas.addEventListener('pointerleave', finalizarDesenhoLousa);
}

function redimensionarCanvasLousa() {
  const canvas = AppState.lousa.canvas;
  const ctx = AppState.lousa.ctx;
  if (!canvas || !ctx) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  // Salva o desenho atual antes de redimensionar
  let tempImage = null;
  if (canvas.width > 0 && canvas.height > 0) {
    try {
      tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {}
  }

  canvas.width = rect.width;
  canvas.height = rect.height;

  if (tempImage) {
    try {
      ctx.putImageData(tempImage, 0, 0);
    } catch (e) {}
  }
}

function salvarEstadoLousa() {
  const canvas = AppState.lousa.canvas;
  const ctx = AppState.lousa.ctx;
  if (!canvas || !ctx) return;

  try {
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    AppState.lousa.history.push(snapshot);
    if (AppState.lousa.history.length > AppState.lousa.maxHistory) {
      AppState.lousa.history.shift();
    }
  } catch (e) {}
}

function iniciarDesenhoLousa(e) {
  e.preventDefault();
  salvarEstadoLousa();

  AppState.lousa.isDrawing = true;
  const rect = AppState.lousa.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ctx = AppState.lousa.ctx;
  ctx.beginPath();
  ctx.moveTo(x, y);

  if (AppState.lousa.tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = AppState.lousa.size * 3;
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = AppState.lousa.color;
    ctx.lineWidth = AppState.lousa.size;
  }

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

function desenharLousa(e) {
  if (!AppState.lousa.isDrawing) return;
  e.preventDefault();

  const rect = AppState.lousa.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ctx = AppState.lousa.ctx;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function finalizarDesenhoLousa(e) {
  if (!AppState.lousa.isDrawing) return;
  AppState.lousa.isDrawing = false;
  AppState.lousa.ctx.closePath();
}

window.alternarLousaRascunho = function() {
  const painel = document.getElementById('lousa-rascunho');
  if (!painel) return;

  AppState.lousa.isVisible = !AppState.lousa.isVisible;

  if (AppState.lousa.isVisible) {
    painel.classList.add('visivel');
    painel.classList.remove('minimizado');
    setTimeout(() => {
      redimensionarCanvasLousa();
    }, 150);
  } else {
    painel.classList.remove('visivel');
  }
};

window.alternarMinimizarLousa = function() {
  const painel = document.getElementById('lousa-rascunho');
  if (!painel) return;

  AppState.lousa.isMinimizado = !AppState.lousa.isMinimizado;
  if (AppState.lousa.isMinimizado) {
    painel.classList.add('minimizado');
    document.getElementById('btn-minimizar-lousa').innerHTML = '<i class="fa-solid fa-window-restore"></i>';
  } else {
    painel.classList.remove('minimizado');
    document.getElementById('btn-minimizar-lousa').innerHTML = '<i class="fa-solid fa-window-minimize"></i>';
    setTimeout(() => {
      redimensionarCanvasLousa();
    }, 150);
  }
};

window.setLousaFerramenta = function(tool) {
  AppState.lousa.tool = tool;
  document.getElementById('tool-pen').classList.toggle('active', tool === 'pen');
  document.getElementById('tool-eraser').classList.toggle('active', tool === 'eraser');

  const status = document.getElementById('lousa-ferramenta-status');
  if (status) {
    status.textContent = tool === 'pen' ? 'Lápis' : 'Borracha';
  }
};

window.setLousaCor = function(cor) {
  AppState.lousa.color = cor;
  setLousaFerramenta('pen');

  document.querySelectorAll('.lousa-cor-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(cor));
  });
};

window.setLousaEspessura = function(tam) {
  AppState.lousa.size = tam;
  document.querySelectorAll('.lousa-size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(tam.toString()));
  });
};

window.desfazerLousa = function() {
  if (AppState.lousa.history.length === 0) return;
  const snapshot = AppState.lousa.history.pop();
  AppState.lousa.ctx.putImageData(snapshot, 0, 0);
};

window.limparLousa = function() {
  salvarEstadoLousa();
  const canvas = AppState.lousa.canvas;
  const ctx = AppState.lousa.ctx;
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  mostrarToast('Lousa de rascunho limpa!');
};

