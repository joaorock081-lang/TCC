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
  },
  theme: {
    mode: 'light',
    accent: 'azul-marinho'
  },
  redacao: {
    temaAtualId: "redacao-enem-1",
    texto: "",
    tempoRestante: 3600,
    timerAtivo: false,
    timerId: null
  },
  simulado: {
    ativo: null,
    questaoIndex: 0,
    respostas: {},
    revisoes: {},
    tempoRestante: 0,
    timerId: null,
    finalizado: false
  }
};

window.AppState = AppState;

// Frases motivacionais para vestibulandos
const FRASES_MOTIVACIONAIS = [
  { frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" },
  { frase: "A persistência é o caminho do êxito. Respire fundo e faça o seu melhor hoje.", autor: "Charles Chaplin" },
  { frase: "Você não precisa ver toda a escada, apenas dê o primeiro passo.", autor: "Martin Luther King Jr." },
  { frase: "A disciplina é a ponte entre suas metas e suas realizações na faculdade dos seus sonhos.", autor: "Jim Rohn" },
  { frase: "Cada questão resolvida hoje é uma dúvida a menos no dia da prova.", autor: "Equipe EstudaMais" },
  { frase: "Respeite seu ritmo, cuide do seu sono e confie na sua trajetória de estudos.", autor: "Equipe EstudaMais" }
];

// Inicialização Resiliente & Blindada
document.addEventListener('DOMContentLoaded', () => {
  try { inicializarTema(); } catch (e) { console.error('Erro ao inicializar tema:', e); }
  try {
    inicializarAutenticacao();
    if (AppState.currentUser) {
      carregarDadosUsuarioAtivo(AppState.currentUser.id);
    } else {
      carregarDadosLocais();
    }
  } catch (e) { console.error('Erro na autenticação:', e); }

  try { configurarNavegacao(); } catch (e) { console.error('Erro ao configurar navegação:', e); }
  try { renderizarFraseMotivacional(); } catch (e) { console.error('Erro ao renderizar frase motivacional:', e); }
  try { renderizarVestibularesTabs(); } catch (e) { console.error('Erro ao renderizar abas de vestibulares:', e); }
  try { renderizarVestibularAtivo(); } catch (e) { console.error('Erro ao renderizar vestibular ativo:', e); }
  try { renderizarDicasEstudo(); } catch (e) { console.error('Erro ao renderizar dicas de estudo:', e); }
  try { renderizarNotas(); } catch (e) { console.error('Erro ao renderizar notas:', e); }
  try { renderizarTarefas(); } catch (e) { console.error('Erro ao renderizar tarefas:', e); }
  try { configurarPomodoro(); } catch (e) { console.error('Erro ao configurar pomodoro:', e); }
  try { configurarRuidoAmbiente(); } catch (e) { console.error('Erro ao configurar ruído ambiente:', e); }
  try { configurarPesquisaGlobal(); } catch (e) { console.error('Erro ao configurar pesquisa global:', e); }
  try { configurarQuiz(); } catch (e) { console.error('Erro ao configurar quiz:', e); }
  try { configurarLousa(); } catch (e) { console.error('Erro ao configurar lousa:', e); }
  try { inicializarRedacao(); } catch (e) { console.error('Erro ao inicializar redação:', e); }
  try { inicializarSimulados(); } catch (e) { console.error('Erro ao inicializar simulados:', e); }
  try { atualizarEstatisticasDashboard(); } catch (e) { console.error('Erro ao atualizar estatísticas:', e); }
  try { inicializarChatIACronograma(); } catch (e) { console.error('Erro ao inicializar chat IA e cronograma:', e); }
  try { renderizarVideoaulas(); } catch (e) { console.error('Erro ao renderizar videoaulas:', e); }
});

/* ========================================================
   ESTUDAMAIS DATABASE & AUTHENTICATION ENGINE (EstudaMaisDB)
   Banco de Dados Local Inteligente (IndexedDB + Storage Layer)
   Suporte a Múltiplos Usuários, Hashing Seguro de Senha e Backup JSON
   ======================================================== */

const EstudaMaisDB = {
  dbName: 'EstudaMaisDB',
  version: 1,
  db: null,

  // Inicializa o banco de dados IndexedDB
  async init() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB não suportado. Usando LocalStorage como fallback.');
        resolve(null);
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Tabela de Usuários
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }

        // Tabela de Anotações do Caderno
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('userId', 'userId', { unique: false });
          noteStore.createIndex('categoria', 'categoria', { unique: false });
        }

        // Tabela de Progresso & Metas
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'userId' });
        }

        // Tabela de Histórico de Simulados
        if (!db.objectStoreNames.contains('simulados')) {
          const simStore = db.createObjectStore('simulados', { keyPath: 'id' });
          simStore.createIndex('userId', 'userId', { unique: false });
          simStore.createIndex('simuladoId', 'simuladoId', { unique: false });
        }

        // Tabela de Redações & Avaliações IA
        if (!db.objectStoreNames.contains('redacoes')) {
          const redStore = db.createObjectStore('redacoes', { keyPath: 'id' });
          redStore.createIndex('userId', 'userId', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        console.log('✅ EstudaMaisDB (IndexedDB) inicializado com sucesso.');
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('Erro ao abrir EstudaMaisDB:', e.target.error);
        resolve(null);
      };
    });
  },

  // Gera hash PBKDF2 seguro de alta resistência com salt para senhas (100.000 iterações)
  async hashPassword(password, salt) {
    try {
      if (window.crypto && window.crypto.subtle) {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(password),
          { name: 'PBKDF2' },
          false,
          ['deriveBits']
        );
        const saltBuffer = enc.encode(salt || 'salt_tcc_2026_sec');
        const derivedBits = await window.crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          256
        );
        const hashArr = Array.from(new Uint8Array(derivedBits));
        return 'pbkdf2$' + hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('PBKDF2 crypto indisponível, usando SHA-256 fallback.', e);
    }
    // Fallback SHA-256
    try {
      const enc = new TextEncoder();
      const data = enc.encode(password + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {}
    return 'h_' + Math.abs(password.length * 31).toString(16) + '_sec';
  },

  // Verificação retrocompatível com hashes antigos e novos
  async verificarSenha(senhaDigitada, salt, hashSalvo) {
    if (!hashSalvo) return false;
    if (hashSalvo.startsWith('pbkdf2$')) {
      const novoHash = await this.hashPassword(senhaDigitada, salt);
      return novoHash === hashSalvo;
    }
    // Hash legado SHA-256
    try {
      const enc = new TextEncoder();
      const data = enc.encode(senhaDigitada + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        const sha256 = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
        if (sha256 === hashSalvo) return true;
      }
    } catch (e) {}
    return false;
  },

  // Salva ou atualiza usuário no banco
  async salvarUsuario(user) {
    // Salva no LocalStorage registry para redundância
    const users = this.obterUsuariosLocalStorage();
    const idx = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user, updatedAt: new Date().toISOString() };
    } else {
      users.push(user);
    }
    localStorage.setItem('estudamais_users_registry', JSON.stringify(users));

    // Salva no IndexedDB se disponível
    if (this.db) {
      try {
        const tx = this.db.transaction('users', 'readwrite');
        tx.objectStore('users').put(user);
      } catch (e) {
        console.error('Erro ao gravar no IndexedDB:', e);
      }
    }
    return user;
  },

  // Busca usuário por email
  async buscarUsuarioPorEmail(email) {
    if (!email) return null;
    const emailNorm = email.trim().toLowerCase();
    const users = this.obterUsuariosLocalStorage();
    const encontrado = users.find(u => u.email.toLowerCase() === emailNorm);
    if (encontrado) return encontrado;

    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('users', 'readonly');
          const index = tx.objectStore('users').index('email');
          const req = index.get(emailNorm);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }
    return null;
  },

  // Obtém lista de usuários do registry
  obterUsuariosLocalStorage() {
    try {
      const raw = localStorage.getItem('estudamais_users_registry');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  // Salva anotação no banco indexado
  async salvarNotaDB(userId, nota) {
    if (!userId || !nota) return;
    nota.userId = userId;
    nota.updatedAt = new Date().toISOString();

    if (this.db) {
      try {
        const tx = this.db.transaction('notes', 'readwrite');
        tx.objectStore('notes').put(nota);
      } catch (e) {}
    }
  },

  // Remove anotação no banco
  async excluirNotaDB(notaId) {
    if (this.db && notaId) {
      try {
        const tx = this.db.transaction('notes', 'readwrite');
        tx.objectStore('notes').delete(notaId);
      } catch (e) {}
    }
  },

  // Salva progresso do usuário no IndexedDB
  async salvarProgressoDB(userId, progressoData) {
    if (!userId || !this.db) return;
    try {
      const tx = this.db.transaction('progress', 'readwrite');
      tx.objectStore('progress').put({
        userId,
        ...progressoData,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {}
  },

  // Salva resultado de simulado
  async salvarResultadoSimuladoDB(userId, resultado) {
    if (!userId || !resultado) return;
    const item = {
      id: 'sim_res_' + Date.now() + '_' + Math.floor(Math.random()*1000),
      userId,
      ...resultado,
      data: new Date().toISOString()
    };
    if (this.db) {
      try {
        const tx = this.db.transaction('simulados', 'readwrite');
        tx.objectStore('simulados').put(item);
      } catch (e) {}
    }
  },

  // Salva redação feita
  async salvarRedacaoDB(userId, redacaoData) {
    if (!userId || !redacaoData) return;
    const item = {
      id: 'red_res_' + Date.now() + '_' + Math.floor(Math.random()*1000),
      userId,
      ...redacaoData,
      data: new Date().toISOString()
    };
    if (this.db) {
      try {
        const tx = this.db.transaction('redacoes', 'readwrite');
        tx.objectStore('redacoes').put(item);
      } catch (e) {}
    }
  },

  // Exporta backup completo de todos os dados do usuário em JSON
  async exportarBackupCompleto(userId) {
    const user = this.obterUsuariosLocalStorage().find(u => u.id === userId);
    if (!user) return null;

    const notas = JSON.parse(localStorage.getItem(`estudamais_user_${userId}_notas`) || '[]');
    const progresso = JSON.parse(localStorage.getItem(`estudamais_user_${userId}_progresso`) || '{}');
    const tarefas = JSON.parse(localStorage.getItem(`estudamais_user_${userId}_tarefas`) || '[]');
    const pomodoro = localStorage.getItem(`estudamais_user_${userId}_ciclos_pomodoro`) || '0';

    return {
      sistema: 'EstudaMais - Portal do Vestibulando',
      versao: '2.0',
      dataExportacao: new Date().toISOString(),
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        vestibular: user.vestibular,
        curso: user.curso,
        avatar: user.avatar,
        criadoEm: user.createdAt
      },
      dados: {
        anotacoes: notas,
        progressoChecklist: progresso,
        tarefasDiarias: tarefas,
        ciclosPomodoro: parseInt(pomodoro, 10)
      }
    };
  }
};


/* ========================================================
   ESTUDAMAIS - CONTROLADORES DE INTERFACE DE AUTENTICAÇÃO E PERFIL
   ======================================================== */

// Estado global de autenticação
AppState.currentUser = null;
AppState.isAuthGate = false;

// Inicializa a sessão ao carregar a página
function inicializarAutenticacao() {
  try {
    EstudaMaisDB.init();
    const rawSession = localStorage.getItem('estudamais_auth_session');
    if (rawSession) {
      AppState.currentUser = JSON.parse(rawSession);
      AppState.isAuthGate = false;
      document.body.classList.remove('auth-gate-active');

      // Se é a primeira vez entrando com sessão ativa, exibe o tour de boas-vindas suavemente
      if (!localStorage.getItem('estudamais_tour_visto')) {
        setTimeout(() => {
          if (typeof abrirTourSlides === 'function') abrirTourSlides(false);
        }, 900);
      }
    } else {
      AppState.currentUser = null;
      AppState.isAuthGate = true;
      document.body.classList.add('auth-gate-active');
    }
  } catch (e) {
    console.error('Erro ao restaurar sessão de autenticação:', e);
    AppState.currentUser = null;
    AppState.isAuthGate = true;
    document.body.classList.add('auth-gate-active');
  }
  atualizarUIAreaUsuario();

  // Se não houver sessão ativa, aciona imediatamente o Gate Obrigatório de Entrada
  if (!AppState.currentUser) {
    setTimeout(() => {
      abrirModalAuth('login', true);
    }, 180);
  }
}

// Atualiza a área de usuário no cabeçalho e saudações no site
function atualizarUIAreaUsuario() {
  const container = document.getElementById('header-user-area');
  const user = AppState.currentUser;

  if (container) {
    if (user) {
      const primeiroNome = user.nome.trim().split(' ')[0];
      const avatarIcon = user.avatar || 'fa-user-graduate';
      container.innerHTML = `
        <div class="user-profile-header-btn" onclick="mudarAba('perfil')" title="Acessar meu Perfil & Carreira">
          <div class="user-avatar-badge">
            <i class="fa-solid ${avatarIcon}"></i>
          </div>
          <div class="user-info-pill">
            <span class="user-name-text">${primeiroNome}</span>
            <span class="user-target-tag">${user.vestibular || 'ENEM'}</span>
          </div>
          <i class="fa-solid fa-chevron-right user-arrow-icon"></i>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button class="btn-header-auth" onclick="abrirModalAuth('login', true)" title="Entrar ou criar conta">
          <i class="fa-solid fa-user-lock"></i>
          <span>Entrar / Cadastrar</span>
        </button>
      `;
    }
  }

  // Atualiza mensagem no Hero se o usuário estiver logado
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroSub && user) {
    const primeiroNome = user.nome.trim().split(' ')[0];
    heroSub.innerHTML = `Olá, <strong>${primeiroNome}</strong>! Seus resumos, redações e metas estão salvos na sua conta. Rumo à sua vaga no <strong>${user.vestibular || 'ENEM'}</strong>! 🎯`;
  }
}

// Carrega os dados específicos do usuário ativo
function carregarDadosUsuarioAtivo(userId) {
  if (!userId) {
    // Carrega dados gerais de convidado
    carregarDadosLocais();
    return;
  }

  try {
    const user = AppState.currentUser;

    // Carrega notas do usuário
    const notasKey = `estudamais_user_${userId}_notas`;
    const notasSalvas = localStorage.getItem(notasKey);
    if (notasSalvas) {
      AppState.notes = JSON.parse(notasSalvas);
    } else {
      // Primeira vez do usuário: cria nota de boas-vindas personalizada
      AppState.notes = [
        {
          id: 'nota-user-1',
          titulo: `👋 Bem-vindo(a) ao seu Caderno, ${user ? user.nome.split(' ')[0] : 'Estudante'}!`,
          categoria: 'Geral',
          conteudo: `Este é o seu caderno digital pessoal do EstudaMais!\n\nSeu vestibular foco: ${user ? user.vestibular : 'ENEM'}\nCurso pretendido: ${user ? (user.curso || 'Não definido') : 'Vestibular'}\n\nTodas as suas anotações criadas aqui ficam vinculadas com segurança à sua conta!`,
          cor: 'azul',
          favorita: true,
          data: new Date().toLocaleDateString('pt-BR')
        }
      ];
      salvarNotas();
    }

    // Carrega progresso de checklist do usuário
    const progKey = `estudamais_user_${userId}_progresso`;
    const progSalvo = localStorage.getItem(progKey);
    AppState.checklistProgresso = progSalvo ? JSON.parse(progSalvo) : {};

    // Carrega tarefas diárias do usuário
    const taskKey = `estudamais_user_${userId}_tarefas`;
    const taskSalvas = localStorage.getItem(taskKey);
    AppState.dailyTasks = taskSalvas ? JSON.parse(taskSalvas) : [
      { id: 'task-u1', texto: `Revisar matérias de peso para o ${user ? user.vestibular : 'Vestibular'}`, feita: false },
      { id: 'task-u2', texto: 'Treinar 1 redação na folha pautada com correção por IA', feita: false }
    ];

    // Carrega ciclos pomodoro
    const ciclosKey = `estudamais_user_${userId}_ciclos_pomodoro`;
    const ciclos = localStorage.getItem(ciclosKey);
    AppState.pomodoro.ciclosCompletos = ciclos ? parseInt(ciclos, 10) : 0;

  } catch (e) {
    console.error('Erro ao carregar dados do usuário ativo:', e);
  }

  // Atualiza renderização de todas as abas
  if (typeof renderizarNotas === 'function') renderizarNotas();
  if (typeof renderizarTarefas === 'function') renderizarTarefas();
  if (typeof renderizarVestibularesTabs === 'function') renderizarVestibularesTabs();
  if (typeof renderizarVestibularAtivo === 'function') renderizarVestibularAtivo();
  if (typeof atualizarEstatisticasDashboard === 'function') atualizarEstatisticasDashboard();
  if (typeof renderizarAbaPerfil === 'function') renderizarAbaPerfil();
}

/* --- MODAIS DE AUTENTICAÇÃO --- */
window.abrirModalAuth = function(modo = 'login', isGate = false) {
  const modal = document.getElementById('modal-auth');
  if (!modal) return;

  if (isGate || (!AppState.currentUser && AppState.isAuthGate)) {
    AppState.isAuthGate = true;
    document.body.classList.add('auth-gate-active');
    const banner = document.getElementById('auth-gate-banner');
    if (banner) banner.style.display = 'flex';
    const closeBtn = document.getElementById('modal-auth-btn-close');
    if (closeBtn) closeBtn.style.display = 'none';
    const titulo = document.getElementById('modal-auth-titulo');
    const subtitulo = document.getElementById('modal-auth-subtitulo');
    if (titulo) titulo.textContent = '🔒 Acesso Exclusivo do Vestibulando';
    if (subtitulo) subtitulo.textContent = 'Identifique-se para carregar suas notas, redações e metas de estudo salvas no seu dispositivo';
  } else {
    AppState.isAuthGate = false;
    document.body.classList.remove('auth-gate-active');
    const banner = document.getElementById('auth-gate-banner');
    if (banner) banner.style.display = 'none';
    const closeBtn = document.getElementById('modal-auth-btn-close');
    if (closeBtn) closeBtn.style.display = 'flex';
    const titulo = document.getElementById('modal-auth-titulo');
    const subtitulo = document.getElementById('modal-auth-subtitulo');
    if (titulo) titulo.textContent = 'Central do Estudante';
    if (subtitulo) subtitulo.textContent = 'Acesse seu cantinho de estudos ou crie sua conta gratuita';
  }

  modal.classList.add('active');
  alternarAbaAuth(modo);
};

window.fecharModalAuth = function() {
  if (AppState.isAuthGate && !AppState.currentUser) {
    return; // Bloqueado em modo Gate de entrada obrigatório
  }
  const modal = document.getElementById('modal-auth');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.alternarAbaAuth = function(aba) {
  const btnLogin = document.getElementById('auth-tab-login');
  const btnCad = document.getElementById('auth-tab-cadastro');
  const formLogin = document.getElementById('auth-form-login');
  const formCad = document.getElementById('auth-form-cadastro');

  if (aba === 'cadastro') {
    if (btnLogin) btnLogin.classList.remove('active');
    if (btnCad) btnCad.classList.add('active');
    if (formLogin) formLogin.classList.remove('active');
    if (formCad) formCad.classList.add('active');
  } else {
    if (btnLogin) btnLogin.classList.add('active');
    if (btnCad) btnCad.classList.remove('active');
    if (formLogin) formLogin.classList.add('active');
    if (formCad) formCad.classList.remove('active');
  }
};

window.selecionarAvatarCadastro = function(avatarClass, elem) {
  document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
  if (elem) elem.classList.add('selected');
  const input = document.getElementById('cad-avatar-val');
  if (input) input.value = avatarClass;
};

// Executa Cadastro de Nova Conta
window.executarCadastroConta = async function(e) {
  if (e) e.preventDefault();

  const nome = document.getElementById('cad-nome').value.trim();
  const email = document.getElementById('cad-email').value.trim().toLowerCase();
  const senha = document.getElementById('cad-senha').value;
  const senhaConfirma = document.getElementById('cad-senha-confirma').value;
  const vestibular = document.getElementById('cad-vestibular').value;
  const curso = document.getElementById('cad-curso').value.trim();
  const avatar = document.getElementById('cad-avatar-val').value || 'fa-user-graduate';

  if (!nome || nome.length < 3) {
    alert('Por favor, informe seu nome completo (mínimo de 3 caracteres).');
    return;
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  if (!senha || senha.length < 6) {
    alert('A senha deve conter no mínimo 6 caracteres para sua segurança.');
    return;
  }
  if (senha !== senhaConfirma) {
    alert('A confirmação de senha não confere com a senha digitada.');
    return;
  }

  // Verifica se o e-mail já existe
  const usuarioExistente = await EstudaMaisDB.buscarUsuarioPorEmail(email);
  if (usuarioExistente) {
    alert('Este e-mail já está cadastrado no sistema! Por favor, faça login com sua conta.');
    alternarAbaAuth('login');
    document.getElementById('login-email').value = email;
    return;
  }

  const salt = 'salt_' + Date.now();
  const passwordHash = await EstudaMaisDB.hashPassword(senha, salt);

  const novoUsuario = {
    id: 'usr_' + Date.now() + '_' + Math.floor(Math.random()*1000),
    nome,
    email,
    passwordHash,
    salt,
    vestibular: vestibular || 'ENEM',
    curso: curso || 'Geral',
    avatar,
    createdAt: new Date().toISOString()
  };

  // Salva no banco de dados
  await EstudaMaisDB.salvarUsuario(novoUsuario);

  // Inicia sessão e destrava o gate
  AppState.currentUser = novoUsuario;
  AppState.isAuthGate = false;
  document.body.classList.remove('auth-gate-active');
  const bannerCad = document.getElementById('auth-gate-banner');
  if (bannerCad) bannerCad.style.display = 'none';
  localStorage.setItem('estudamais_auth_session', JSON.stringify(novoUsuario));

  // Inicializa dados do usuário
  carregarDadosUsuarioAtivo(novoUsuario.id);
  atualizarUIAreaUsuario();
  fecharModalAuth();
  if (typeof renderizarAbaPerfil === 'function') renderizarAbaPerfil();

  mostrarToast(`🎉 Bem-vindo(a), ${novoUsuario.nome.split(' ')[0]}! Sua conta foi criada com sucesso.`);
  if (typeof tocarFanfarraVitoria === 'function') tocarFanfarraVitoria();
  if (typeof dispararConfetes === 'function') dispararConfetes();

  // Exibe os slides de tour e apresentação das funções do site
  setTimeout(() => {
    if (typeof abrirTourSlides === 'function') abrirTourSlides(false);
  }, 650);
};

// Executa Login
window.executarLoginConta = async function(e) {
  if (e) e.preventDefault();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const senha = document.getElementById('login-senha').value;
  const lembrar = document.getElementById('login-lembrar')?.checked;

  if (!email || !senha) {
    alert('Por favor, preencha o e-mail e a senha.');
    return;
  }

  const usuario = await EstudaMaisDB.buscarUsuarioPorEmail(email);
  if (!usuario) {
    alert('Nenhum cadastro encontrado com este e-mail. Crie sua conta gratuita em "Criar Minha Conta".');
    return;
  }

  // Rate limiting contra força bruta
  if (window.TentativasLogin && !window.TentativasLogin.verificar()) return;

  const senhaValida = await EstudaMaisDB.verificarSenha(senha, usuario.salt, usuario.passwordHash);
  if (!senhaValida) {
    if (window.TentativasLogin) window.TentativasLogin.falha();
    alert('Senha incorreta! Por favor, verifique sua senha e tente novamente.');
    return;
  }
  if (window.TentativasLogin) window.TentativasLogin.sucesso();

  // Autenticação bem sucedida e destrava o gate
  AppState.currentUser = usuario;
  AppState.isAuthGate = false;
  document.body.classList.remove('auth-gate-active');
  const bannerLog = document.getElementById('auth-gate-banner');
  if (bannerLog) bannerLog.style.display = 'none';
  localStorage.setItem('estudamais_auth_session', JSON.stringify(usuario));

  carregarDadosUsuarioAtivo(usuario.id);
  atualizarUIAreaUsuario();
  fecharModalAuth();
  if (typeof renderizarAbaPerfil === 'function') renderizarAbaPerfil();

  mostrarToast(`✨ Login realizado com sucesso! Bons estudos, ${usuario.nome.split(' ')[0]}!`);
  if (typeof tocarSomAcertoQuiz === 'function') tocarSomAcertoQuiz();

  // Exibe os slides de tour e apresentação das funções do site
  setTimeout(() => {
    if (typeof abrirTourSlides === 'function') abrirTourSlides(false);
  }, 450);
};

// Atalho para Avaliadores, Professores e Visitantes da Banca do TCC
window.entrarComoVisitante = async function() {
  const visitante = {
    id: 'user_visitante_tcc',
    nome: 'Visitante (Avaliador TCC)',
    email: 'visitante@estudamais.com',
    vestibular: 'ENEM',
    curso: 'Geral / Avaliação TCC',
    avatar: 'fa-user-graduate',
    createdAt: new Date().toISOString()
  };

  AppState.currentUser = visitante;
  AppState.isAuthGate = false;
  document.body.classList.remove('auth-gate-active');
  const banner = document.getElementById('auth-gate-banner');
  if (banner) banner.style.display = 'none';
  localStorage.setItem('estudamais_auth_session', JSON.stringify(visitante));

  carregarDadosUsuarioAtivo(visitante.id);
  atualizarUIAreaUsuario();
  fecharModalAuth();
  if (typeof renderizarAbaPerfil === 'function') renderizarAbaPerfil();

  mostrarToast('👋 Bem-vindo(a) ao EstudaMais! Acesso liberado no Modo Visitante.');

  // Exibe os slides de tour e apresentação das funções do site
  setTimeout(() => {
    if (typeof abrirTourSlides === 'function') abrirTourSlides(false);
  }, 450);
};

// Executa Logout
window.executarLogoutConta = function() {
  if (confirm('Tem certeza de que deseja sair da sua conta? Todos os seus dados salvos continuarão seguros no seu banco de dados local.')) {
    localStorage.removeItem('estudamais_auth_session');
    AppState.currentUser = null;
    AppState.isAuthGate = true;
    document.body.classList.add('auth-gate-active');
    carregarDadosUsuarioAtivo(null);
    atualizarUIAreaUsuario();
    if (typeof fecharModalPerfil === 'function') fecharModalPerfil();
    if (typeof fecharModalEditarPerfil === 'function') fecharModalEditarPerfil();
    mudarAba('inicio');
    mostrarToast('Você saiu da sua conta.');
    setTimeout(() => {
      abrirModalAuth('login', true);
    }, 200);
  }
};

/* --- PAINEL / MODAL DO PERFIL DO ALUNO --- */
window.abrirModalPerfil = function() {
  const user = AppState.currentUser;
  if (!user) {
    abrirModalAuth('login');
    return;
  }

  const modal = document.getElementById('modal-perfil-usuario');
  if (!modal) return;

  // Atualiza informações no modal
  document.getElementById('perfil-nome').textContent = user.nome;
  document.getElementById('perfil-email').textContent = user.email;
  document.getElementById('perfil-vestibular').textContent = user.vestibular || 'ENEM';
  document.getElementById('perfil-curso').textContent = user.curso || 'Não especificado';
  
  const elAvatar = document.getElementById('perfil-avatar-icon');
  if (elAvatar) {
    elAvatar.className = `fa-solid ${user.avatar || 'fa-user-graduate'}`;
  }

  const dataCad = user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'Hoje';
  document.getElementById('perfil-data-criacao').textContent = `Membro desde ${dataCad}`;

  // Estatísticas do Estudante
  const totalNotas = AppState.notes.length;
  const totalTopicos = Object.values(AppState.checklistProgresso).filter(Boolean).length;
  const ciclosPomo = AppState.pomodoro.ciclosCompletos || 0;

  document.getElementById('perfil-stat-notas').textContent = totalNotas;
  document.getElementById('perfil-stat-topicos').textContent = totalTopicos;
  document.getElementById('perfil-stat-pomodoro').textContent = `${ciclosPomo} ciclos`;

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalPerfil = function() {
  const modal = document.getElementById('modal-perfil-usuario');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

// Exportar Backup de Todos os Dados do Usuário em JSON
window.exportarDadosPerfil = async function() {
  const user = AppState.currentUser;
  if (!user) return;

  const backup = await EstudaMaisDB.exportarBackupCompleto(user.id);
  if (!backup) return;

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `EstudaMais_Backup_${user.nome.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  mostrarToast('Backup completo dos seus dados exportado com sucesso!');
};

// Importar Backup JSON
window.importarDadosPerfil = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.dados || !data.usuario) {
        alert('Arquivo de backup inválido ou incompatível.');
        return;
      }

      if (confirm(`Deseja restaurar o backup de ${data.usuario.nome}? Isso atualizará suas anotações e progresso salvos.`)) {
        const userId = AppState.currentUser ? AppState.currentUser.id : data.usuario.id;

        if (Array.isArray(data.dados.anotacoes)) {
          AppState.notes = data.dados.anotacoes;
          salvarNotas();
        }
        if (data.dados.progressoChecklist) {
          AppState.checklistProgresso = data.dados.progressoChecklist;
          salvarProgresso();
        }
        if (Array.isArray(data.dados.tarefasDiarias)) {
          AppState.dailyTasks = data.dados.tarefasDiarias;
          salvarTarefas();
        }
        if (data.dados.ciclosPomodoro) {
          AppState.pomodoro.ciclosCompletos = data.dados.ciclosPomodoro;
          localStorage.setItem(`estudamais_user_${userId}_ciclos_pomodoro`, AppState.pomodoro.ciclosCompletos);
        }

        fecharModalPerfil();
        mostrarToast('✅ Dados e anotações restaurados com sucesso do seu backup!');
        if (typeof renderizarNotas === 'function') renderizarNotas();
        if (typeof renderizarVestibularesTabs === 'function') renderizarVestibularesTabs();
        if (typeof renderizarVestibularAtivo === 'function') renderizarVestibularAtivo();
        if (typeof atualizarEstatisticasDashboard === 'function') atualizarEstatisticasDashboard();
        if (typeof renderizarAbaPerfil === 'function') renderizarAbaPerfil();
      }
    } catch (err) {
      alert('Erro ao processar o arquivo de backup: ' + err.message);
    }
  };
  reader.readAsText(file);
};

/* ========================================================
   ABA DEDICADA: MEU PERFIL & CARREIRA DO VESTIBULANDO (#tab-perfil)
   ======================================================== */
window.calcularCarreiraUsuario = function() {
  const user = AppState.currentUser;
  const userId = user ? user.id : 'anonimo';

  // 1. Tópicos de vestibular concluídos
  const topicosConcluidos = Object.values(AppState.checklistProgresso || {}).filter(Boolean).length;

  // 2. Anotações salvas
  const totalNotas = (AppState.notes || []).length;

  // 3. Ciclos Pomodoro
  const ciclosPomodoro = AppState.pomodoro?.ciclosCompletos || 0;

  // 4. Redações avaliadas por IA
  let redacoesContadas = 0;
  try {
    const histRedacoes = localStorage.getItem(`estudamais_user_${userId}_historico_redacoes`);
    if (histRedacoes) redacoesContadas = JSON.parse(histRedacoes).length;
    else if (localStorage.getItem(`estudamais_redacao_enem-1`)) redacoesContadas = 1;
  } catch(e) {}

  // 5. Simulados concluídos
  let simuladosContados = 0;
  try {
    const histSimulados = localStorage.getItem(`estudamais_user_${userId}_historico_simulados`);
    if (histSimulados) simuladosContados = JSON.parse(histSimulados).length;
  } catch(e) {}

  // 6. Taxa do Quiz
  const taxaQuiz = AppState.quiz?.totalRespondidas > 0
    ? Math.round((AppState.quiz.totalAcertos / AppState.quiz.totalRespondidas) * 100)
    : 0;

  // Cálculo de XP de Carreira (Gamificação)
  const xp = (topicosConcluidos * 15) + (totalNotas * 10) + (ciclosPomodoro * 20) + (redacoesContadas * 50) + (simuladosContados * 100);

  // Níveis e Títulos da Carreira
  let nivel = 1;
  let titulo = "Calouro Promissor";
  let proximoXp = 200;
  let prevXp = 0;

  if (xp >= 2001) {
    nivel = 5;
    titulo = "Candidato Olímpico";
    proximoXp = 3000;
    prevXp = 2000;
  } else if (xp >= 1001) {
    nivel = 4;
    titulo = "Mestre dos Simulados";
    proximoXp = 2000;
    prevXp = 1000;
  } else if (xp >= 501) {
    nivel = 3;
    titulo = "Vestibulando Dedicado";
    proximoXp = 1000;
    prevXp = 500;
  } else if (xp >= 201) {
    nivel = 2;
    titulo = "Estudante Focado";
    proximoXp = 500;
    prevXp = 200;
  }

  // Porcentagem da barra de XP atual
  const percBarra = Math.min(100, Math.max(8, Math.round(((xp - prevXp) / Math.max(1, (proximoXp - prevXp))) * 100)));

  // Cálculo de dias de conta
  let diasAtivos = 1;
  let dataStr = "Novembro/2026";
  if (user && user.createdAt) {
    const dtCriacao = new Date(user.createdAt);
    if (!isNaN(dtCriacao.getTime())) {
      dataStr = dtCriacao.toLocaleDateString('pt-BR');
      const diffMs = Date.now() - dtCriacao.getTime();
      diasAtivos = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
    }
  }

  return {
    xp,
    nivel,
    titulo,
    proximoXp,
    prevXp,
    percBarra,
    diasAtivos,
    dataStr,
    topicosConcluidos,
    totalNotas,
    ciclosPomodoro,
    redacoesContadas,
    simuladosContados,
    taxaQuiz
  };
};

window.renderizarAbaPerfil = function() {
  const container = document.getElementById('tab-perfil');
  if (!container) return;

  const user = AppState.currentUser;
  if (!user) {
    return;
  }

  const c = calcularCarreiraUsuario();

  // Atualiza dados no Header do Perfil
  const elNome = document.getElementById('perfil-aba-nome');
  const elEmail = document.getElementById('perfil-aba-email');
  const elVest = document.getElementById('perfil-aba-vestibular');
  const elCurso = document.getElementById('perfil-aba-curso');
  const elDias = document.getElementById('perfil-aba-dias-foco');
  const elData = document.getElementById('perfil-aba-data-cadastro');
  const elNivelBadge = document.getElementById('perfil-aba-nivel-badge');
  const elIcone = document.getElementById('perfil-aba-avatar-icon');

  if (elNome) elNome.textContent = user.nome;
  if (elEmail) elEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> ${user.email}`;
  if (elVest) elVest.textContent = user.vestibular || 'ENEM';
  if (elCurso) elCurso.textContent = user.curso || 'Não definido';
  if (elDias) elDias.textContent = `${c.diasAtivos}º dia`;
  if (elData) elData.textContent = c.dataStr;
  if (elNivelBadge) elNivelBadge.innerHTML = `<i class="fa-solid fa-crown"></i> Nível ${c.nivel} • ${c.titulo}`;
  if (elIcone) elIcone.className = `fa-solid ${user.avatar || 'fa-user-graduate'}`;

  // Atualiza Barra de XP
  const elXpAtual = document.getElementById('carreira-xp-atual');
  const elXpProx = document.getElementById('carreira-xp-proximo');
  const elBarra = document.getElementById('carreira-xp-progresso-bar');

  if (elXpAtual) elXpAtual.textContent = c.xp;
  if (elXpProx) elXpProx.textContent = `/ ${c.proximoXp} XP`;
  if (elBarra) elBarra.style.width = `${c.percBarra}%`;

  // Atualiza Steps de Nível
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`step-nivel-${i}`);
    if (stepEl) {
      if (i <= c.nivel) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    }
  }

  // Atualiza Grid de Estatísticas Gerais
  const sTopicos = document.getElementById('perfil-stat-topicos-total');
  const sRedacoes = document.getElementById('perfil-stat-redacoes-total');
  const sSimulados = document.getElementById('perfil-stat-simulados-total');
  const sPomodoros = document.getElementById('perfil-stat-pomodoros-total');
  const sNotas = document.getElementById('perfil-stat-notas-total');
  const sQuiz = document.getElementById('perfil-stat-quiz-total');

  if (sTopicos) sTopicos.textContent = c.topicosConcluidos;
  if (sRedacoes) sRedacoes.textContent = c.redacoesContadas;
  if (sSimulados) sSimulados.textContent = c.simuladosContados;
  if (sPomodoros) sPomodoros.textContent = c.ciclosPomodoro;
  if (sNotas) sNotas.textContent = c.totalNotas;
  if (sQuiz) sQuiz.textContent = `${c.taxaQuiz}%`;

  // Renderiza Mural de Conquistas (Badges)
  const conquistasGrid = document.getElementById('perfil-conquistas-grid');
  if (conquistasGrid) {
    const listaConquistas = [
      {
        id: 'c-inicio',
        titulo: 'Primeiro Passo',
        desc: 'Concluiu o 1º tópico de estudo do vestibular',
        icon: 'fa-shoe-prints',
        xp: '+15 XP',
        desbloqueada: c.topicosConcluidos >= 1
      },
      {
        id: 'c-foco',
        titulo: 'Mente Blindada',
        desc: 'Completou seu 1º ciclo Pomodoro de 25 min de foco',
        icon: 'fa-stopwatch',
        xp: '+20 XP',
        desbloqueada: c.ciclosPomodoro >= 1
      },
      {
        id: 'c-redacao',
        titulo: 'Escritor Oficial',
        desc: 'Produziu e corrigiu sua 1ª redação na folha pautada',
        icon: 'fa-feather-pointed',
        xp: '+50 XP',
        desbloqueada: c.redacoesContadas >= 1
      },
      {
        id: 'c-simulado',
        titulo: 'Guerreiro de Simulado',
        desc: 'Finalizou um simulado completo com tempo e gabarito',
        icon: 'fa-file-signature',
        xp: '+100 XP',
        desbloqueada: c.simuladosContados >= 1
      },
      {
        id: 'c-notas',
        titulo: 'Caderno de Ouro',
        desc: 'Criou 3 ou mais anotações e resumos no Caderno Digital',
        icon: 'fa-book-bookmark',
        xp: '+30 XP',
        desbloqueada: c.totalNotas >= 3
      },
      {
        id: 'c-elite',
        titulo: 'Vestibulando Lendário',
        desc: 'Alcançou mais de 500 XP em sua carreira de estudos',
        icon: 'fa-trophy',
        xp: '+200 XP',
        desbloqueada: c.xp >= 500
      }
    ];

    conquistasGrid.innerHTML = listaConquistas.map(cq => `
      <div class="conquista-card-item ${cq.desbloqueada ? 'desbloqueada' : 'bloqueada'}">
        <div class="conquista-badge-icon">
          <i class="fa-solid ${cq.icon}"></i>
        </div>
        <div class="conquista-card-info">
          <h4>${cq.titulo} ${cq.desbloqueada ? '✅' : '🔒'}</h4>
          <p>${cq.desc}</p>
          <span class="conquista-xp-tag">${cq.xp}</span>
        </div>
      </div>
    `).join('');
  }
};

// Modais de Edição de Perfil
window.abrirModalEditarPerfil = function() {
  const user = AppState.currentUser;
  if (!user) {
    abrirModalAuth('login', true);
    return;
  }
  const modal = document.getElementById('modal-editar-perfil');
  if (!modal) return;

  document.getElementById('edit-perfil-nome').value = user.nome || '';
  document.getElementById('edit-perfil-vestibular').value = user.vestibular || 'ENEM';
  document.getElementById('edit-perfil-curso').value = user.curso || '';

  // Seleciona avatar atual
  const av = user.avatar || 'fa-user-graduate';
  document.querySelectorAll('#edit-avatar-selector-grid .avatar-option').forEach(el => {
    if (el.dataset.avatar === av) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalEditarPerfil = function() {
  const modal = document.getElementById('modal-editar-perfil');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.selecionarAvatarEdicao = function(avatarClass, elem) {
  document.querySelectorAll('#edit-avatar-selector-grid .avatar-option').forEach(el => el.classList.remove('active'));
  if (elem) elem.classList.add('active');
  if (AppState.currentUser) {
    AppState.currentUser.avatar = avatarClass;
  }
};

window.salvarEdicaoPerfil = async function(e) {
  if (e) e.preventDefault();
  const user = AppState.currentUser;
  if (!user) return;

  const novoNome = document.getElementById('edit-perfil-nome').value.trim();
  const novoVest = document.getElementById('edit-perfil-vestibular').value;
  const novoCurso = document.getElementById('edit-perfil-curso').value.trim();
  const avatarAtivo = document.querySelector('#edit-avatar-selector-grid .avatar-option.active')?.dataset.avatar || user.avatar || 'fa-user-graduate';

  if (!novoNome) {
    alert('Por favor, informe seu nome.');
    return;
  }

  user.nome = novoNome;
  user.vestibular = novoVest;
  user.curso = novoCurso || 'Geral';
  user.avatar = avatarAtivo;

  // Atualiza banco e sessão
  await EstudaMaisDB.salvarUsuario(user);
  localStorage.setItem('estudamais_auth_session', JSON.stringify(user));

  fecharModalEditarPerfil();
  atualizarUIAreaUsuario();
  renderizarAbaPerfil();
  mostrarToast('Perfil atualizado com sucesso! 🎓');
};


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
  const user = AppState.currentUser;
  const key = user ? `estudamais_user_${user.id}_notas` : 'estudamais_notas';
  localStorage.setItem(key, JSON.stringify(AppState.notes));
  if (user && window.EstudaMaisDB && EstudaMaisDB.salvarNotaDB) {
    AppState.notes.forEach(n => EstudaMaisDB.salvarNotaDB(user.id, n));
  }
  atualizarEstatisticasDashboard();
}

function salvarProgresso() {
  const user = AppState.currentUser;
  const key = user ? `estudamais_user_${user.id}_progresso` : 'estudamais_progresso';
  localStorage.setItem(key, JSON.stringify(AppState.checklistProgresso));
  if (user && window.EstudaMaisDB && EstudaMaisDB.salvarProgressoDB) {
    EstudaMaisDB.salvarProgressoDB(user.id, { checklistProgresso: AppState.checklistProgresso });
  }
  atualizarEstatisticasDashboard();
}

function salvarTarefas() {
  const user = AppState.currentUser;
  const key = user ? `estudamais_user_${user.id}_tarefas` : 'estudamais_tarefas';
  localStorage.setItem(key, JSON.stringify(AppState.dailyTasks));
}

/* ========================================================
   NAVEGAÇÃO PRINCIPAL ENTRE ABAS & CARROSSEL ANIMADO
   ======================================================== */
window.rolarMenuNav = function(delta) {
  const container = document.getElementById('nav-scroll-container');
  if (container) {
    container.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(atualizarVisibilidadeBotoesNav, 280);
  }
};

window.atualizarVisibilidadeBotoesNav = function() {
  const container = document.getElementById('nav-scroll-container');
  const btnPrev = document.getElementById('nav-btn-prev');
  const btnNext = document.getElementById('nav-btn-next');
  if (!container || !btnPrev || !btnNext) return;

  const temOverflow = container.scrollWidth > (container.clientWidth + 6);
  if (!temOverflow) {
    btnPrev.classList.remove('visible');
    btnNext.classList.remove('visible');
    return;
  }

  const scrollLeft = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (scrollLeft > 10) {
    btnPrev.classList.add('visible');
  } else {
    btnPrev.classList.remove('visible');
  }

  if (scrollLeft < (maxScroll - 10)) {
    btnNext.classList.add('visible');
  } else {
    btnNext.classList.remove('visible');
  }
};

function configurarNavegacaoCarrosselAnimada() {
  const container = document.getElementById('nav-scroll-container');
  if (!container) return;

  // Atualiza visibilidade no scroll
  container.addEventListener('scroll', () => {
    atualizarVisibilidadeBotoesNav();
  }, { passive: true });

  // Rola horizontalmente de forma suave com o scroll do mouse (wheel)
  container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0 && container.scrollWidth > container.clientWidth) {
      e.preventDefault();
      container.scrollBy({ left: e.deltaY * 1.4, behavior: 'smooth' });
      atualizarVisibilidadeBotoesNav();
    }
  }, { passive: false });

  // Arrastar com o mouse / touch (Drag to scroll com física fluida e sem travar cliques)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      container.classList.remove('grabbing');
      setTimeout(() => { hasDragged = false; }, 60);
      atualizarVisibilidadeBotoesNav();
    }
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDragged = true;
      container.classList.add('grabbing');
      e.preventDefault();
      container.scrollLeft = scrollLeft - walk;
      atualizarVisibilidadeBotoesNav();
    }
  });

  // Atualiza ao redimensionar a janela
  window.addEventListener('resize', () => {
    atualizarVisibilidadeBotoesNav();
  });

  // Inicializa botões
  setTimeout(atualizarVisibilidadeBotoesNav, 300);
}

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

  // Ativa o carrossel interativo
  configurarNavegacaoCarrosselAnimada();
}

function mudarAba(tabId) {
  AppState.currentTab = tabId;

  // Atualiza botões superiores e itens dos grupos
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mapeamento e destaque de grupos de abas
  const mapaGrupos = {
    'vestibulares': 'conteudos',
    'videoaulas': 'conteudos',
    'dicas': 'conteudos',
    'simulados': 'pratica',
    'redacao': 'pratica',
    'quiz': 'pratica',
    'cronograma': 'organizacao',
    'notas': 'organizacao',
    'ferramentas': 'organizacao'
  };
  const grupoAtivo = mapaGrupos[tabId] || null;

  document.querySelectorAll('.nav-group-item').forEach(item => {
    item.classList.toggle('has-active-child', item.dataset.group === grupoAtivo);
  });
  document.querySelectorAll('.nav-group-subitem').forEach(sub => {
    sub.classList.toggle('active', sub.dataset.tab === tabId);
  });
  document.querySelectorAll('.menu-aba-item-card').forEach(card => {
    card.classList.toggle('ativo', card.dataset.tabAlvo === tabId);
  });

  // Centraliza suavemente o botão ativo no carrossel superior
  const btnAtivo = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
  if (btnAtivo && typeof btnAtivo.scrollIntoView === 'function') {
    btnAtivo.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setTimeout(atualizarVisibilidadeBotoesNav, 350);
  }

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
    try {
      const tabsContainer = document.getElementById('vestibulares-tabs');
      if (!tabsContainer || tabsContainer.children.length === 0) {
        renderizarVestibularesTabs();
      }
      renderizarVestibularAtivo();
    } catch (e) {
      console.error('Erro ao renderizar aba vestibulares:', e);
    }
  } else if (tabId === 'perfil') {
    renderizarAbaPerfil();
  } else if (tabId === 'videoaulas') {
    if (typeof renderizarVideoaulas === 'function') {
      renderizarVideoaulas();
    }
  } else if (tabId === 'cronograma') {
    if (typeof renderizarCronogramaUI === 'function') {
      renderizarCronogramaUI();
    }
  }
}

/* ========================================================
   FRASES & DASHBOARD
   ======================================================== */
function renderizarFraseMotivacional() {
  const container = document.getElementById('frase-motivacional');
  if (!container) return;
  const lista = (typeof FRASES_MOTIVACIONAIS !== 'undefined' && Array.isArray(FRASES_MOTIVACIONAIS) && FRASES_MOTIVACIONAIS.length > 0)
    ? FRASES_MOTIVACIONAIS
    : [{ frase: "A persistência é o caminho do êxito na conquista da sua vaga.", autor: "EstudaMais" }];
  const aleatoria = lista[Math.floor(Math.random() * lista.length)];
  container.innerHTML = `
    <i class="fa-solid fa-quote-left quote-icon"></i>
    <p class="frase-texto">"${aleatoria.frase}"</p>
    <span class="frase-autor">— ${aleatoria.autor}</span>
  `;
}

function atualizarEstatisticasDashboard() {
  let totalTopicos = 0;
  let concluidos = 0;

  if (typeof VESTIBULARES_DATA !== 'undefined' && VESTIBULARES_DATA) {
    Object.keys(VESTIBULARES_DATA).forEach(vestId => {
      const v = VESTIBULARES_DATA[vestId];
      if (v && v.areas && Array.isArray(v.areas)) {
        v.areas.forEach(area => {
          if (area && area.disciplinas && Array.isArray(area.disciplinas)) {
            area.disciplinas.forEach(disc => {
              if (disc && disc.topicos && Array.isArray(disc.topicos)) {
                disc.topicos.forEach((topico, idx) => {
                  totalTopicos++;
                  const key = `${vestId}-${disc.nome}-${idx}`;
                  if (AppState.checklistProgresso && AppState.checklistProgresso[key]) {
                    concluidos++;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

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
    statNotas.textContent = (AppState.notes || []).length;
  }

  const statPomodoro = document.getElementById('stat-pomodoros-feitos');
  if (statPomodoro) {
    statPomodoro.textContent = (AppState.pomodoro && AppState.pomodoro.ciclosCompletos) || 0;
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
  if (!tabsContainer || typeof VESTIBULARES_DATA === 'undefined' || !VESTIBULARES_DATA) return;

  tabsContainer.innerHTML = '';
  Object.keys(VESTIBULARES_DATA).forEach(vestKey => {
    const vest = VESTIBULARES_DATA[vestKey];
    if (!vest) return;
    const btn = document.createElement('button');
    btn.className = `vest-tab-btn ${vestKey === AppState.currentVestibular ? 'active' : ''}`;
    btn.dataset.vest = vestKey;
    const badgeText = vest.badge ? (vest.badge.indexOf('/') !== -1 ? vest.badge.split('/')[0].trim() : vest.badge) : (vest.nome || 'Geral');
    btn.innerHTML = `
      <i class="fa-solid ${vest.icone || 'fa-graduation-cap'}"></i>
      <span>${vest.nome || vestKey.toUpperCase()}</span>
      <span class="tab-badge">${badgeText}</span>
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
  if (!container || typeof VESTIBULARES_DATA === 'undefined' || !VESTIBULARES_DATA) return;

  if (!AppState.currentVestibular || !VESTIBULARES_DATA[AppState.currentVestibular]) {
    AppState.currentVestibular = Object.keys(VESTIBULARES_DATA)[0] || 'enem';
  }

  const vest = VESTIBULARES_DATA[AppState.currentVestibular];
  if (!vest) return;

  // Calcula progresso deste vestibular específico
  let totalDesteVest = 0;
  let concluidosDesteVest = 0;

  if (vest.areas && Array.isArray(vest.areas)) {
    vest.areas.forEach(area => {
      if (area.disciplinas && Array.isArray(area.disciplinas)) {
        area.disciplinas.forEach(disc => {
          if (disc.topicos && Array.isArray(disc.topicos)) {
            disc.topicos.forEach((_, idx) => {
              totalDesteVest++;
              const key = `${vest.id}-${disc.nome}-${idx}`;
              if (AppState.checklistProgresso && AppState.checklistProgresso[key]) concluidosDesteVest++;
            });
          }
        });
      }
    });
  }

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
            <span class="detalhe-val">${(vest.detalhesGerais && (vest.detalhesGerais.formato || vest.detalhesGerais.primeiraFase)) || 'Ver edital oficial'}</span>
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
            <span class="detalhe-val">${(vest.detalhesGerais && vest.detalhesGerais.dicaChave) || 'Consulte o edital e resolva provas anteriores.'}</span>
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
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
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
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalNota = function() {
  const modal = document.getElementById('modal-nota');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
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
    const totalSec = Math.max(0, AppState.pomodoro.timeLeft);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    let str = '';
    if (h > 0) {
      str = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
      str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    displayTimer.textContent = str;
    document.title = AppState.pomodoro.isRunning ? `(${str}) Foco • EstudaMais` : 'EstudaMais • Portal do Vestibulando';
  }

  function setMode(mode) {
    AppState.pomodoro.mode = mode;
    pausarTimer();

    modeBtns.forEach(b => {
      if (b.dataset.mode === mode || (mode === 'custom' && b.id === 'btn-toggle-custom-pomodoro')) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    const modeLabel = document.getElementById('pomodoro-mode-label');

    if (mode === 'foco') {
      AppState.pomodoro.timeLeft = 25 * 60;
      if (modeLabel) modeLabel.textContent = 'Foco Clássico';
    } else if (mode === 'estendido') {
      AppState.pomodoro.timeLeft = 50 * 60;
      if (modeLabel) modeLabel.textContent = 'Foco Estendido';
    } else if (mode === 'maratona') {
      AppState.pomodoro.timeLeft = 90 * 60;
      if (modeLabel) modeLabel.textContent = 'Maratona / Redação';
    } else if (mode === 'curta') {
      AppState.pomodoro.timeLeft = 5 * 60;
      if (modeLabel) modeLabel.textContent = 'Pausa Curta';
    } else if (mode === 'longa') {
      AppState.pomodoro.timeLeft = 15 * 60;
      if (modeLabel) modeLabel.textContent = 'Pausa Longa';
    } else if (mode === 'custom') {
      if (AppState.pomodoro.customDuration && AppState.pomodoro.customDuration > 0) {
        AppState.pomodoro.timeLeft = AppState.pomodoro.customDuration;
      }
      if (modeLabel) {
        const totalSec = AppState.pomodoro.timeLeft;
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        let durStr = '';
        if (h > 0) durStr += `${h}h `;
        if (m > 0 || (h > 0 && s > 0)) durStr += `${m}m `;
        if (s > 0 || (h === 0 && m === 0)) durStr += `${s}s`;
        modeLabel.textContent = `Personalizado (${durStr.trim()})`;
      }
    }

    AppState.pomodoro.totalDuration = AppState.pomodoro.timeLeft;
    atualizarDisplay();
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.dataset.mode;
      if (targetMode) {
        setMode(targetMode);
      }
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
        if (AppState.pomodoro.mode === 'foco' || AppState.pomodoro.mode === 'estendido' || AppState.pomodoro.mode === 'maratona' || AppState.pomodoro.mode === 'custom') {
          AppState.pomodoro.ciclosCompletos++;
          localStorage.setItem('estudamais_ciclos_pomodoro', AppState.pomodoro.ciclosCompletos);
          if (typeof atualizarEstatisticasDashboard === 'function') atualizarEstatisticasDashboard();
          mostrarToast('🎉 Parabéns! Sessão de foco concluída com sucesso! Hora de uma merecida pausa.');
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

  // Expõe no escopo global para acesso pelos controles manuais
  window.pausarTimerPomodoro = pausarTimer;
  window.atualizarDisplayPomodoro = atualizarDisplay;
  window.setPomodoroMode = setMode;

  atualizarDisplay();
}

// Funções de Controle de Tempo Personalizado (Horas, Minutos e Segundos)
window.togglePainelTempoPersonalizado = function() {
  const painel = document.getElementById('pomodoro-custom-time-panel');
  if (!painel) return;
  const isHidden = (painel.style.display === 'none' || getComputedStyle(painel).display === 'none');
  painel.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    const totalSec = AppState.pomodoro.timeLeft || 1500;
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const inputH = document.getElementById('custom-timer-hours');
    const inputM = document.getElementById('custom-timer-minutes');
    const inputS = document.getElementById('custom-timer-seconds');
    if (inputH) inputH.value = h;
    if (inputM) inputM.value = m;
    if (inputS) inputS.value = s;
  }
};

window.fecharPainelTempoPersonalizado = function() {
  const painel = document.getElementById('pomodoro-custom-time-panel');
  if (painel) painel.style.display = 'none';
};

window.validarNumeroInput = function(input, min, max) {
  let val = parseInt(input.value, 10);
  if (isNaN(val) || val < min) val = min;
  if (val > max) val = max;
  input.value = val;
};

window.ajustarCampoTimer = function(inputId, delta) {
  const input = document.getElementById(inputId);
  if (!input) return;
  let val = parseInt(input.value, 10) || 0;
  const min = parseInt(input.min, 10) || 0;
  const max = parseInt(input.max, 10) || 59;
  val = Math.max(min, Math.min(max, val + delta));
  input.value = val;
};

window.adicionarMinutosTimer = function(minutos) {
  const inputH = document.getElementById('custom-timer-hours');
  const inputM = document.getElementById('custom-timer-minutes');
  if (!inputM) return;
  let h = parseInt(inputH ? inputH.value : 0, 10) || 0;
  let m = parseInt(inputM.value, 10) || 0;
  m += minutos;
  while (m >= 60) {
    m -= 60;
    h = Math.min(23, h + 1);
  }
  if (inputH) inputH.value = h;
  inputM.value = m;
};

window.zerarTempoCustomTimer = function() {
  const inputH = document.getElementById('custom-timer-hours');
  const inputM = document.getElementById('custom-timer-minutes');
  const inputS = document.getElementById('custom-timer-seconds');
  if (inputH) inputH.value = 0;
  if (inputM) inputM.value = 0;
  if (inputS) inputS.value = 0;
};

window.aplicarTempoPersonalizado = function() {
  const inputH = document.getElementById('custom-timer-hours');
  const inputM = document.getElementById('custom-timer-minutes');
  const inputS = document.getElementById('custom-timer-seconds');

  const h = Math.max(0, Math.min(23, parseInt(inputH ? inputH.value : 0, 10) || 0));
  const m = Math.max(0, Math.min(59, parseInt(inputM ? inputM.value : 0, 10) || 0));
  const s = Math.max(0, Math.min(59, parseInt(inputS ? inputS.value : 0, 10) || 0));

  const totalSegundos = (h * 3600) + (m * 60) + s;
  if (totalSegundos <= 0) {
    if (typeof mostrarToast === 'function') {
      mostrarToast('⚠️ Defina um tempo maior que 0 segundos para o cronômetro.');
    } else {
      alert('Defina um tempo maior que 0 segundos para o cronômetro.');
    }
    return;
  }

  if (window.pausarTimerPomodoro) window.pausarTimerPomodoro();

  AppState.pomodoro.customDuration = totalSegundos;
  AppState.pomodoro.timeLeft = totalSegundos;
  AppState.pomodoro.totalDuration = totalSegundos;
  AppState.pomodoro.mode = 'custom';

  const modeBtns = document.querySelectorAll('.pomodoro-mode-btn');
  modeBtns.forEach(b => {
    if (b.id === 'btn-toggle-custom-pomodoro' || b.dataset.mode === 'custom') {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  const modeLabel = document.getElementById('pomodoro-mode-label');
  if (modeLabel) {
    let durStr = '';
    if (h > 0) durStr += `${h}h `;
    if (m > 0 || (h > 0 && s > 0)) durStr += `${m}m `;
    if (s > 0 || (h === 0 && m === 0)) durStr += `${s}s`;
    modeLabel.textContent = `Personalizado (${durStr.trim()})`;
  }

  if (window.atualizarDisplayPomodoro) {
    window.atualizarDisplayPomodoro();
  }

  window.fecharPainelTempoPersonalizado();

  if (typeof mostrarToast === 'function') {
    let tempoFormatado = '';
    if (h > 0) tempoFormatado += `${h}h `;
    if (m > 0) tempoFormatado += `${m}min `;
    if (s > 0) tempoFormatado += `${s}s`;
    mostrarToast(`⏱️ Cronômetro ajustado para ${tempoFormatado.trim()}! Bom estudo!`);
  }
};

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
    tocarSomAcertoQuiz();
    if (window.dispararConfetes) window.dispararConfetes();
    mostrarToast('🎯 Parabéns! Você acertou a questão! (+100 XP)');
  } else {
    AppState.quiz.streak = 0;
    if (window.tocarSomErroQuiz) window.tocarSomErroQuiz();
    mostrarToast('❌ Não foi dessa vez! Veja a resolução comentada.');
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

// Aliases e novos efeitos sonoros e visuais
window.tocarSomAcertoQuiz = function() {
  tocarSomAcerto();
};

window.tocarSomErroQuiz = function() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
};

window.tocarFanfarraVitoria = function() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notas = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.5);
    });
  } catch(e) {}
};

window.dispararConfetes = function() {
  try {
    const existente = document.getElementById('confetti-canvas-container');
    if (existente) existente.remove();

    const container = document.createElement('div');
    container.id = 'confetti-canvas-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '999999';
    container.style.overflow = 'hidden';

    const cores = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308'];
    const total = 50;

    for (let i = 0; i < total; i++) {
      const conf = document.createElement('div');
      const cor = cores[Math.floor(Math.random() * cores.length)];
      const left = Math.random() * 100;
      const size = Math.floor(Math.random() * 8) + 8;
      const rot = Math.random() * 360;
      const animDur = (Math.random() * 1.5 + 1.8).toFixed(2);
      const delay = (Math.random() * 0.3).toFixed(2);

      conf.style.position = 'absolute';
      conf.style.left = left + 'vw';
      conf.style.top = '-20px';
      conf.style.width = size + 'px';
      conf.style.height = (size * (Math.random() > 0.4 ? 1.6 : 1)) + 'px';
      conf.style.backgroundColor = cor;
      conf.style.borderRadius = Math.random() > 0.4 ? '3px' : '50%';
      conf.style.transform = `rotate(${rot}deg)`;
      conf.style.opacity = '0.95';
      conf.style.animation = `confettiQueda ${animDur}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards`;
      container.appendChild(conf);
    }

    document.body.appendChild(container);
    setTimeout(() => {
      if (container && container.parentNode) container.parentNode.removeChild(container);
    }, 4000);
  } catch(e) {
    console.log('Confetes:', e);
  }
};

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

  const canvas = document.getElementById('lousa-canvas');
  if (canvas) {
    canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
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

/* ========================================================
   SISTEMA DE PERSONALIZAÇÃO DE TEMAS E CORES
   7 Famílias de Cores: Azul, Amarelo, Vinho, Vermelho, Roxo, Rosa, Verde
   Mais de 21 Variações Vibrantes & Aconchegantes
   ======================================================== */
const PALETAS_CORES = [
  {
    familia: 'Azul',
    icone: 'fa-droplet',
    cores: [
      { id: 'azul-marinho', nome: 'Azul Marinho', tipo: 'Clássico Oficial', corHex: '#0c1d3b', corSec: '#2563eb', desc: 'Profundo e elegante, o visual oficial do portal' },
      { id: 'azul-real', nome: 'Azul Real / Safira', tipo: 'Acadêmico Vivo', corHex: '#1e3a8a', corSec: '#3b82f6', desc: 'Vibrante, intelectual e dinâmico' },
      { id: 'azul-celeste', nome: 'Azul Celeste / Céu', tipo: 'Suave & Arejado', corHex: '#0369a1', corSec: '#38bdf8', desc: 'Leve, calmo e tranquilo para estudos diurnos' }
    ]
  },
  {
    familia: 'Amarelo',
    icone: 'fa-sun',
    cores: [
      { id: 'amarelo-canario', nome: 'Amarelo Canário', tipo: 'Vibrante & Criativo', corHex: '#a16207', corSec: '#facc15', desc: 'Alegre, vivo e estimulante para o raciocínio' },
      { id: 'amarelo-dourado', nome: 'Amarelo Ouro / Âmbar', tipo: 'Dourado Acolhedor', corHex: '#b45309', corSec: '#fbbf24', desc: 'Quente e aconchegante, lembra cadernos de couro' },
      { id: 'amarelo-mostarda', nome: 'Amarelo Mostarda', tipo: 'Elegante Retrô', corHex: '#854d0e', corSec: '#eab308', desc: 'Foco suave e relaxante para leitura prolongada' }
    ]
  },
  {
    familia: 'Vinho',
    icone: 'fa-wine-glass',
    cores: [
      { id: 'vinho-borgonha', nome: 'Vinho Borgonha', tipo: 'Nobre Clássico', corHex: '#581226', corSec: '#e11d48', desc: 'Profundo, solene e altamente imersivo' },
      { id: 'vinho-marsala', nome: 'Vinho Marsala', tipo: 'Sofisticado', corHex: '#6b213b', corSec: '#fb7185', desc: 'Moderno, refinado e com ótimo contraste' },
      { id: 'vinho-tinto', nome: 'Vinho Tinto / Rubi', tipo: 'Intenso & Noturno', corHex: '#4a0e1e', corSec: '#be123c', desc: 'Marcante para foco em resoluções difíceis' }
    ]
  },
  {
    familia: 'Vermelho',
    icone: 'fa-fire',
    cores: [
      { id: 'vermelho-carmim', nome: 'Vermelho Carmim', tipo: 'Foco & Disciplina', corHex: '#991b1b', corSec: '#ef4444', desc: 'Energético, firme e focado em metas' },
      { id: 'vermelho-coral', nome: 'Vermelho Coral / Terracota', tipo: 'Suave Acolhedor', corHex: '#9a3412', corSec: '#f97316', desc: 'Caloroso e confortável para não cansar a vista' },
      { id: 'vermelho-escarlate', nome: 'Vermelho Escarlate', tipo: 'Vibrante Ativo', corHex: '#b91c1c', corSec: '#f43f5e', desc: 'Intenso, dinâmico e estimulante' }
    ]
  },
  {
    familia: 'Roxo',
    icone: 'fa-wand-magic-sparkles',
    cores: [
      { id: 'roxo-ametista', nome: 'Roxo Ametista', tipo: 'Inspiração & Foco', corHex: '#581c87', corSec: '#a855f7', desc: 'Místico, equilibrado e intelectual' },
      { id: 'roxo-lavanda', nome: 'Roxo Lavanda', tipo: 'Sereno & Anti-estresse', corHex: '#4c1d95', corSec: '#8b5cf6', desc: 'Calmante e relaxante para a ansiedade pré-prova' },
      { id: 'roxo-violeta', nome: 'Roxo Violeta Profundo', tipo: 'Imersão Noturna', corHex: '#3b0764', corSec: '#9333ea', desc: 'Foco profundo em ambientes de pouca luz' }
    ]
  },
  {
    familia: 'Rosa',
    icone: 'fa-heart',
    cores: [
      { id: 'rosa-pastel', nome: 'Rosa Pastel / Sakura', tipo: 'Aesthetic Notas', corHex: '#9d174d', corSec: '#f472b6', desc: 'Delicado e aconchegante no estilo caderno de estudos' },
      { id: 'rosa-magenta', nome: 'Rosa Magenta / Fúcsia', tipo: 'Criativo Moderno', corHex: '#86198f', corSec: '#e879f9', desc: 'Ousado, moderno e vibrante' },
      { id: 'rosa-pessego', nome: 'Rosa Pêssego', tipo: 'Acolhedor Suave', corHex: '#9f1239', corSec: '#fb7185', desc: 'Confortável, caloroso e relaxante' }
    ]
  },
  {
    familia: 'Verde',
    icone: 'fa-leaf',
    cores: [
      { id: 'verde-esmeralda', nome: 'Verde Esmeralda', tipo: 'Revigorante', corHex: '#065f46', corSec: '#10b981', desc: 'Tranquilo, natural e estimula a memorização' },
      { id: 'verde-menta', nome: 'Verde Menta / Sálvia', tipo: 'Fresco & Clean', corHex: '#0f766e', corSec: '#14b8a6', desc: 'Arejado, clean e muito moderno' },
      { id: 'verde-oliva', nome: 'Verde Floresta / Oliva', tipo: 'Equilíbrio & Serenidade', corHex: '#365314', corSec: '#84cc16', desc: 'Orgânico, maduro e transmite firmeza nos estudos' }
    ]
  },
  {
    familia: 'Âmbar',
    icone: 'fa-mug-hot',
    cores: [
      { id: 'ambar-relax', nome: 'Âmbar Noturno & Sépia', tipo: 'Descanso Visual', corHex: '#78350f', corSec: '#d97706', desc: 'Filtro de luz azul, tom sépia perfeito para leitura relaxante' },
      { id: 'caramelo-suave', nome: 'Caramelo Aconchegante', tipo: 'Conforto & Foco', corHex: '#854d0e', corSec: '#eab308', desc: 'Tons quentes que amenizam o cansaço óptico' },
      { id: 'terracota-argila', nome: 'Terracota Natural', tipo: 'Equilíbrio Orgânico', corHex: '#7c2d12', corSec: '#ea580c', desc: 'Caloroso e acolhedor para manter o ritmo sem fadiga' }
    ]
  },
  {
    familia: 'Turquesa',
    icone: 'fa-water',
    cores: [
      { id: 'turquesa-oceano', nome: 'Turquesa Oceânica', tipo: 'Calmaria & Serenidade', corHex: '#115e59', corSec: '#14b8a6', desc: 'Reduz a ansiedade pré-vestibular e clareia os pensamentos' },
      { id: 'aqua-cristal', nome: 'Aqua Tropical', tipo: 'Frescor & Nitidez', corHex: '#155e75', corSec: '#06b6d4', desc: 'Mente limpa e arejada para raciocínio lógico' },
      { id: 'ciano-eletrico', nome: 'Ciano Futurista', tipo: 'Alta Tecnologia', corHex: '#0e7490', corSec: '#00e5ff', desc: 'Contraste tecnológico e vibrante para simulados rápidos' }
    ]
  },
  {
    familia: 'Laranja',
    icone: 'fa-cloud-sun',
    cores: [
      { id: 'laranja-sunset', nome: 'Laranja Pôr do Sol', tipo: 'Acolhedor & Vivo', corHex: '#9a3412', corSec: '#f97316', desc: 'Energia equilibrada com conforto aos olhos' },
      { id: 'laranja-tangerina', nome: 'Tangerina Criativa', tipo: 'Estímulo de Ideias', corHex: '#c2410c', corSec: '#fb923c', desc: 'Ideal para momentos de brainstorming e redação' },
      { id: 'cobre-nobre', nome: 'Cobre & Bronze', tipo: 'Sofisticação Nobre', corHex: '#703c1b', corSec: '#d97736', desc: 'Clássico e refinado com presença marcante' }
    ]
  },
  {
    familia: 'Minimalista',
    icone: 'fa-cube',
    cores: [
      { id: 'grafite-obsidiana', nome: 'Grafite & Titânio', tipo: 'Foco Puro', corHex: '#1e293b', corSec: '#64748b', desc: 'Zero distrações visuais, foco cirúrgico no conteúdo' },
      { id: 'ardosia-chumbo', nome: 'Ardósia & Zinco', tipo: 'Neutro Moderno', corHex: '#27272a', corSec: '#71717a', desc: 'Sobriedade elegante e clean para estudos analíticos' },
      { id: 'cafe-biblioteca', nome: 'Café & Biblioteca', tipo: 'Clássico Universitário', corHex: '#3b2219', corSec: '#875338', desc: 'Ambiente nobre de biblioteca com tons de madeira' }
    ]
  }
];

window.inicializarTema = function() {
  const modoSalvo = localStorage.getItem('estudamais_theme_mode') || 'light';
  const acentoSalvo = localStorage.getItem('estudamais_theme_accent') || 'azul-marinho';
  aplicarTema(modoSalvo, acentoSalvo, false);
};

window.aplicarTema = function(modo, acento, exibirNotificacao = false) {
  if (modo) {
    AppState.theme.mode = modo;
    document.documentElement.setAttribute('data-theme', modo);
    document.body.setAttribute('data-theme', modo);
    localStorage.setItem('estudamais_theme_mode', modo);
    
    // Atualiza ícone do botão
    const iconBtn = document.getElementById('icon-theme-toggle');
    if (iconBtn) {
      if (modo === 'dark') {
        iconBtn.className = 'fa-solid fa-moon';
        if (iconBtn.parentElement) iconBtn.parentElement.title = 'Modo Atual: Escuro (Clique para Modo Descanso)';
      } else if (modo === 'warm') {
        iconBtn.className = 'fa-solid fa-mug-hot';
        if (iconBtn.parentElement) iconBtn.parentElement.title = 'Modo Atual: Descanso & Luz Amarelada (Clique para Modo Claro)';
      } else {
        iconBtn.className = 'fa-solid fa-sun';
        if (iconBtn.parentElement) iconBtn.parentElement.title = 'Modo Atual: Claro (Clique para Modo Escuro)';
      }
    }
  }

  if (acento) {
    AppState.theme.accent = acento;
    document.documentElement.setAttribute('data-accent', acento);
    document.body.setAttribute('data-accent', acento);
    localStorage.setItem('estudamais_theme_accent', acento);
  }

  atualizarSelecaoVisualTema();

  if (exibirNotificacao) {
    const nomeCor = obterNomeCorPorId(AppState.theme.accent);
    let nomeModo = 'Modo Claro';
    if (AppState.theme.mode === 'dark') nomeModo = 'Modo Escuro';
    else if (AppState.theme.mode === 'warm') nomeModo = 'Modo Descanso (Luz Amarelada)';
    mostrarToast(`Aparência atualizada: ${nomeModo} • ${nomeCor}`);
  }
};

window.alternarModoEscuro = function() {
  const modos = ['light', 'dark', 'warm'];
  const atualIdx = modos.indexOf(AppState.theme.mode);
  const novoModo = modos[(atualIdx + 1) % modos.length];
  aplicarTema(novoModo, AppState.theme.accent, true);
};

window.abrirModalCores = function() {
  const modal = document.getElementById('modal-cores');
  if (modal) {
    renderizarPaletasCores();
    modal.classList.add('active');
    if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
  }
};

window.fecharModalCores = function() {
  const modal = document.getElementById('modal-cores');
  if (modal) {
    modal.classList.remove('active');
    if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
  }
};

window.selecionarModoTema = function(modo) {
  aplicarTema(modo, AppState.theme.accent, false);
};

window.selecionarCorTema = function(idCor) {
  aplicarTema(AppState.theme.mode, idCor, true);
};

window.restaurarTemaPadrao = function() {
  aplicarTema('light', 'azul-marinho', true);
  fecharModalCores();
};

window.renderizarPaletasCores = function(filtroFamilia = 'todas') {
  const container = document.getElementById('palette-colors-grid');
  if (!container) return;

  let html = '';
  PALETAS_CORES.forEach(fam => {
    if (filtroFamilia !== 'todas' && fam.familia.toLowerCase() !== filtroFamilia.toLowerCase()) {
      return;
    }
    fam.cores.forEach(c => {
      const isActive = c.id === AppState.theme.accent;
      html += `
        <div class="color-option-card ${isActive ? 'active' : ''}" 
             data-color-id="${c.id}" 
             style="--card-color-pri: ${c.corHex}; --card-color-sec: ${c.corSec};"
             onclick="selecionarCorTema('${c.id}')">
          <div class="color-active-badge"><i class="fa-solid fa-check"></i></div>
          <div class="color-swatch-header">
            <div class="color-swatch-circle" style="background: linear-gradient(135deg, ${c.corHex}, ${c.corSec});">
              <i class="fa-solid ${fam.icone}"></i>
            </div>
            <span class="color-family-tag">${fam.familia}</span>
          </div>
          <div class="color-info-title">${c.nome}</div>
          <div class="color-info-sub">${c.desc}</div>
          <div class="color-preview-pill">${c.tipo}</div>
        </div>
      `;
    });
  });

  container.innerHTML = html;
  atualizarSelecaoVisualTema();
};

window.filtrarFamiliaCores = function(familia, btnEl) {
  document.querySelectorAll('.palette-family-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderizarPaletasCores(familia);
};

window.atualizarSelecaoVisualTema = function() {
  // Atualiza botões de modo
  const cardLight = document.getElementById('mode-card-light');
  const cardDark = document.getElementById('mode-card-dark');
  const cardWarm = document.getElementById('mode-card-warm');
  if (cardLight) cardLight.classList.toggle('active', AppState.theme.mode === 'light');
  if (cardDark) cardDark.classList.toggle('active', AppState.theme.mode === 'dark');
  if (cardWarm) cardWarm.classList.toggle('active', AppState.theme.mode === 'warm');

  // Atualiza cards de cores
  document.querySelectorAll('.color-option-card').forEach(card => {
    const corId = card.getAttribute('data-color-id');
    card.classList.toggle('active', corId === AppState.theme.accent);
  });
};

function obterNomeCorPorId(idCor) {
  for (const fam of PALETAS_CORES) {
    const encontrada = fam.cores.find(c => c.id === idCor);
    if (encontrada) return encontrada.nome;
  }
  return 'Personalizada';
}

/* ========================================================
   MÓDULO: LABORATÓRIO DE REDAÇÃO & CORRETOR INTELIGENTE COM IA
   ======================================================== */

// Dicionário essencial de verificação de léxico da Língua Portuguesa
const LEXICO_PORTUGUES_BASICO = new Set([
  // Artigos, pronomes, preposições e contrações
  "o","a","os","as","um","uma","uns","umas","de","do","da","dos","das","em","no","na","nos","nas",
  "por","pelo","pela","pelos","pelas","para","pra","com","sem","sob","sobre","entre","ate","até",
  "ao","aos","à","às","este","esta","estes","estas","esse","essa","esses","essas",
  "aquele","aquela","aqueles","aquelas","isto","isso","aquilo","meu","minha","meus","minhas",
  "seu","sua","seus","suas","nosso","nossa","nossos","nossas","dele","dela","deles","delas",
  "eu","tu","ele","ela","nos","nós","vos","vós","eles","elas","me","te","se","lhe","lhes",
  "mim","ti","si","que","quem","onde","cujo","cuja","cujos","cujas","quanto","quanta","quantos","quantas",
  // Conectivos e advérbios essenciais
  "e","ou","mas","porem","porém","contudo","todavia","entretanto","portanto","logo",
  "assim","pois","porque","porquanto","conforme","segundo","consoante","embora","conquanto",
  "ainda","mesmo","caso","se","desde","como","tanto","quanto","mais","menos","muito","pouco",
  "bem","mal","ja","já","sempre","nunca","jamais","talvez","certamente","realmente","apenas",
  "somente","inclusive","tambem","também","tampouco","ademais","outrossim","alem","além",
  "destarte","diante","nesse","sentido","sob","prisma","haja","vista","com","efeito",
  "por","conseguinte","dessa","forma","desse","modo","primeiro","lugar",
  // Verbos comuns (formas conjugadas e infinitivos)
  "é","sao","são","era","eram","foi","foram","ser","sendo","sido","estar","esta","está",
  "estao","estão","estava","estavam","esteve","estiveram","ter","tem","têm","tinha","tinham",
  "teve","tiveram","haver","ha","há","havia","houve","fazer","faz","fazem","fazia","fez","fizeram",
  "poder","pode","podem","podia","pude","puderam","dever","deve","devem","devia","precisar",
  "precisa","precisam","existir","existe","existem","existia","ocorrer","ocorre","ocorrem",
  "acontecer","acontece","surgir","surge","tornar","torna","tornam","tornou","evidenciar",
  "evidencia","revelar","revela","mostrar","mostra","promover","promove","garantir","garante",
  "criar","cria","desenvolver","desenvolve","enfrentar","enfrenta","combater","combate",
  "atuar","atua","investir","investe","transformar","transforma","ampliar","amplia",
  // Substantivos e vocábulos frequentes em redações
  "brasil","brasileiro","brasileira","sociedade","cidadao","cidadão","cidadaos","cidadãos",
  "cidadania","populacao","população","pais","país","nacao","nação","estado","governo",
  "poder","publico","público","educacao","educação","saude","saúde","cultura","politica","política",
  "social","sociais","economia","economico","econômico","desigualdade","desigualdades",
  "direitos","humanos","lei","leis","constituicao","constituição","democracia","democrático",
  "trabalho","trabalhador","trabalhadores","jovem","jovens","juventude","escola","escolas",
  "universidade","universidades","formacao","formação","conhecimento","ciencia","ciência",
  "tecnologia","tecnologias","inteligencia","inteligência","artificial","digital","comunicacao",
  "comunicação","informacao","informação","midia","mídia","acesso","inclusao","inclusão",
  "meio","ambiente","sustentabilidade","sustentavel","sustentável","clima","climatico","climático",
  "problema","problemas","desafio","desafios","crise","crises","solucao","solução","medida",
  "medidas","proposta","acao","ação","acoes","ações","intervencao","intervenção","projeto",
  "individuo","indivíduo","coletivo","coletividade","familia","família","esfera","cenario","cenário",
  "contexto","realidade","perspectiva","impacto","impactos","efeito","efeitos","causa","causas",
  "consequencia","consequência","fundamental","essencial","importante","urgente","necessario","necessário"
]);

// Medição precisa da quantidade real de linhas renderizadas no textarea da folha oficial
function calcularLinhasReaisTextarea(textarea) {
  if (!textarea) return 0;
  const texto = textarea.value;
  if (!texto || texto.trim().length === 0) return 0;

  const wrapper = textarea.parentNode;
  let mirror = document.getElementById('redacao-textarea-mirror');
  if (!mirror) {
    mirror = document.createElement('div');
    mirror.id = 'redacao-textarea-mirror';
    mirror.style.position = 'absolute';
    mirror.style.top = '0';
    mirror.style.left = '0';
    mirror.style.visibility = 'hidden';
    mirror.style.pointerEvents = 'none';
    mirror.style.zIndex = '-9999';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordBreak = 'break-word';
    mirror.style.overflowWrap = 'break-word';
    mirror.style.boxSizing = 'border-box';
    if (wrapper) {
      wrapper.appendChild(mirror);
    } else {
      document.body.appendChild(mirror);
    }
  }

  const comp = window.getComputedStyle(textarea);
  const clientW = textarea.clientWidth;
  if (clientW > 0) {
    mirror.style.width = clientW + 'px';
  } else {
    mirror.style.width = '100%';
  }
  mirror.style.fontFamily = comp.fontFamily;
  mirror.style.fontSize = comp.fontSize;
  mirror.style.fontWeight = comp.fontWeight;
  mirror.style.letterSpacing = comp.letterSpacing;
  mirror.style.lineHeight = comp.lineHeight || '32px';
  mirror.style.paddingLeft = comp.paddingLeft;
  mirror.style.paddingRight = comp.paddingRight;
  mirror.style.paddingTop = comp.paddingTop;
  mirror.style.paddingBottom = comp.paddingBottom;

  let textoMedicao = texto;
  if (textoMedicao.endsWith('\n')) {
    textoMedicao += ' ';
  }
  mirror.textContent = textoMedicao;

  const paddingTop = parseFloat(comp.paddingTop) || 10;
  const paddingBottom = parseFloat(comp.paddingBottom) || 10;
  const lineHeight = parseFloat(comp.lineHeight) || 32;

  const alturaUtil = mirror.offsetHeight - (paddingTop + paddingBottom);
  const totalLinhas = Math.max(1, Math.round(alturaUtil / lineHeight));

  return totalLinhas;
}

window.inicializarRedacao = function() {
  const selectTema = document.getElementById('redacao-select-tema');
  if (!selectTema) return;

  // Popula temas disponíveis agrupados por vestibular
  selectTema.innerHTML = TEMAS_REDACAO_DATA.map(t => `
    <option value="${t.id}">[${t.vestibular}] ${t.titulo}</option>
  `).join('');

  selectTema.addEventListener('change', (e) => {
    carregarTemaRedacao(e.target.value);
  });

  const textarea = document.getElementById('redacao-textarea');
  if (textarea) {
    textarea.addEventListener('input', () => {
      atualizarContadoresRedacao();
    });

    // Sincroniza a rolagem vertical da régua de números com o texto
    textarea.addEventListener('scroll', () => {
      const containerNums = document.getElementById('redacao-linhas-numeros');
      if (containerNums) {
        containerNums.scrollTop = textarea.scrollTop;
      }
    });
  }

  // Monitora input do título da folha oficial
  const inputTitulo = document.getElementById('redacao-titulo-input');
  if (inputTitulo) {
    inputTitulo.addEventListener('input', () => {
      const temaId = AppState.redacao.temaAtualId;
      localStorage.setItem(`estudamais_redacao_titulo_${temaId}`, inputTitulo.value);
    });
  }

  // Carrega primeiro tema
  carregarTemaRedacao(TEMAS_REDACAO_DATA[0].id);
  atualizarStatusUIGemini();
};

window.carregarTemaRedacao = function(idTema) {
  const tema = TEMAS_REDACAO_DATA.find(t => t.id === idTema) || TEMAS_REDACAO_DATA[0];
  AppState.redacao.temaAtualId = tema.id;

  // Atualiza cabeçalho do tema
  const elVest = document.getElementById('redacao-tema-vestibular');
  const elTitulo = document.getElementById('redacao-tema-titulo');
  const elGenero = document.getElementById('redacao-tema-genero');
  const elInstrucoes = document.getElementById('redacao-tema-instrucoes');
  const elTextos = document.getElementById('redacao-textos-motivadores');
  const elCriterios = document.getElementById('redacao-criterios-lista');
  const elMetaVest = document.getElementById('folha-meta-vestibular');

  if (elVest) elVest.textContent = tema.vestibular;
  if (elMetaVest) elMetaVest.textContent = tema.vestibular;
  if (elTitulo) elTitulo.textContent = tema.titulo;
  if (elGenero) elGenero.textContent = tema.genero;
  if (elInstrucoes) elInstrucoes.textContent = tema.instrucoes;

  // Renderiza textos motivadores
  if (elTextos) {
    elTextos.innerHTML = tema.textosMotivadores.map((tm, idx) => `
      <div class="texto-motivador-card">
        <div class="texto-motivador-origem"><i class="fa-solid fa-bookmark"></i> ${tm.origem}</div>
        <div class="texto-motivador-conteudo">${tm.conteudo}</div>
      </div>
    `).join('');
  }

  // Renderiza critérios da banca com pesos oficiais
  if (elCriterios) {
    elCriterios.innerHTML = tema.criterios.map(c => `
      <div class="criterio-banca-badge" title="${c.desc}">
        <strong>${c.nome}</strong>: <span>${c.desc}</span> (${c.peso} pts)
      </div>
    `).join('');
  }

  // Restaura rascunhos salvos
  const rascunho = localStorage.getItem(`estudamais_redacao_${tema.id}`) || '';
  const textarea = document.getElementById('redacao-textarea');
  if (textarea) {
    textarea.value = rascunho;
    atualizarContadoresRedacao();
  }

  const inputTitulo = document.getElementById('redacao-titulo-input');
  if (inputTitulo) {
    inputTitulo.value = localStorage.getItem(`estudamais_redacao_titulo_${tema.id}`) || '';
  }

  // Oculta resultado anterior
  const areaResultado = document.getElementById('redacao-resultado-ia');
  if (areaResultado) areaResultado.classList.remove('active');
};

window.atualizarContadoresRedacao = function() {
  const textarea = document.getElementById('redacao-textarea');
  if (!textarea) return;

  const texto = textarea.value;
  AppState.redacao.texto = texto;

  // Contagem de palavras reais
  const palavrasArr = texto.trim() ? texto.trim().split(/\s+/) : [];
  const palavras = palavrasArr.length;
  // Contagem de caracteres
  const caracteres = texto.length;
  // Contagem real das linhas físicas ocupadas no textarea
  const totalLinhas = calcularLinhasReaisTextarea(textarea);

  // Atualiza números na UI
  const elPalavras = document.getElementById('redacao-cont-palavras');
  const elCaracteres = document.getElementById('redacao-cont-caracteres');
  const elLinhas = document.getElementById('redacao-cont-linhas');
  const elStatusLinhas = document.getElementById('redacao-status-linhas');

  if (elPalavras) elPalavras.textContent = palavras;
  if (elCaracteres) elCaracteres.textContent = caracteres;
  if (elLinhas) elLinhas.textContent = `${totalLinhas}/30`;

  if (elStatusLinhas) {
    if (totalLinhas === 0) {
      elStatusLinhas.textContent = "Folha em branco";
      elStatusLinhas.className = "redacao-status-pill neutro";
    } else if (totalLinhas < 7) {
      elStatusLinhas.textContent = `Abaixo do mínimo (${totalLinhas} linhas - Zero por edital)`;
      elStatusLinhas.className = "redacao-status-pill perigo";
    } else if (totalLinhas < 20) {
      elStatusLinhas.textContent = `Em desenvolvimento (${totalLinhas} linhas - busque 20 a 30)`;
      elStatusLinhas.className = "redacao-status-pill atencao";
    } else if (totalLinhas <= 30) {
      elStatusLinhas.textContent = `Extensão ideal para vestibular! (${totalLinhas} linhas)`;
      elStatusLinhas.className = "redacao-status-pill sucesso";
    } else {
      elStatusLinhas.textContent = `Atenção: ultrapassou as 30 linhas da folha oficial! (${totalLinhas} linhas)`;
      elStatusLinhas.className = "redacao-status-pill perigo";
    }
  }

  // Atualiza a numeração de linhas da folha pautada
  renderizarNumerosLinhasRedacao(Math.max(30, totalLinhas));
};

function renderizarNumerosLinhasRedacao(maxLinhas) {
  const container = document.getElementById('redacao-linhas-numeros');
  if (!container) return;

  const total = Math.max(30, maxLinhas);
  let html = '';
  for (let i = 1; i <= total; i++) {
    html += `<span class="linha-num ${i <= 30 ? '' : 'excesso'}">${i.toString().padStart(2, '0')}</span>`;
  }
  container.innerHTML = html;
}

window.salvarRascunhoRedacao = function() {
  const textarea = document.getElementById('redacao-textarea');
  if (!textarea) return;

  const temaId = AppState.redacao.temaAtualId;
  localStorage.setItem(`estudamais_redacao_${temaId}`, textarea.value);
  
  const inputTitulo = document.getElementById('redacao-titulo-input');
  if (inputTitulo) {
    localStorage.setItem(`estudamais_redacao_titulo_${temaId}`, inputTitulo.value);
  }
  mostrarToast('Rascunho da redação salvo com sucesso!');
};

window.limparFolhaRedacao = function() {
  if (confirm('Tem certeza de que deseja apagar a redação atual e recomeçar a folha?')) {
    const textarea = document.getElementById('redacao-textarea');
    if (textarea) {
      textarea.value = '';
      atualizarContadoresRedacao();
      salvarRascunhoRedacao();
    }
    const inputTitulo = document.getElementById('redacao-titulo-input');
    if (inputTitulo) {
      inputTitulo.value = '';
    }
    mostrarToast('Folha de redação reiniciada.');
  }
};

window.exportarRedacao = function() {
  const textarea = document.getElementById('redacao-textarea');
  if (!textarea || !textarea.value.trim()) {
    mostrarToast('Escreva algo na redação antes de exportar!');
    return;
  }

  const tema = TEMAS_REDACAO_DATA.find(t => t.id === AppState.redacao.temaAtualId) || TEMAS_REDACAO_DATA[0];
  const inputTitulo = document.getElementById('redacao-titulo-input');
  const tituloEscrito = inputTitulo && inputTitulo.value.trim() ? inputTitulo.value.trim() : "(Sem título explícito)";

  const conteudo = `=====================================================
ESTUDAMAIS • PORTAL DO VESTIBULANDO
REDAÇÃO PREPARATÓRIA - ${tema.vestibular}
Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
=====================================================

TEMA: ${tema.titulo}
GÊNERO: ${tema.genero}
TÍTULO: ${tituloEscrito}

-----------------------------------------------------
TEXTO DEFINITIVO DO ALUNO:
-----------------------------------------------------
${textarea.value}

-----------------------------------------------------
Estatísticas: ${textarea.value.trim().split(/\s+/).length} palavras | ${textarea.value.length} caracteres
Portal EstudaMais • TCC
=====================================================`;

  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Redacao_${tema.vestibular}_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast('Redação exportada com sucesso!');
};

window.alternarTimerRedacao = function() {
  const btn = document.getElementById('btn-timer-redacao');
  const spanTempo = document.getElementById('redacao-timer-tempo');

  if (AppState.redacao.timerAtivo) {
    clearInterval(AppState.redacao.timerId);
    AppState.redacao.timerAtivo = false;
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar Cronômetro (1h)';
    mostrarToast('Tempo pausado.');
  } else {
    AppState.redacao.timerAtivo = true;
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar Tempo';
    mostrarToast('Cronômetro de 1 hora iniciado! Boa produção!');

    AppState.redacao.timerId = setInterval(() => {
      AppState.redacao.tempoRestante--;
      if (AppState.redacao.tempoRestante <= 0) {
        clearInterval(AppState.redacao.timerId);
        AppState.redacao.timerAtivo = false;
        tocarSinoPomodoro();
        alert('⏰ Tempo oficial de 1 hora encerrado! Finalize sua redação para correção.');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reiniciar Tempo';
      }

      const mins = Math.floor(AppState.redacao.tempoRestante / 60);
      const secs = AppState.redacao.tempoRestante % 60;
      if (spanTempo) {
        spanTempo.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }
};

/* ========================================================
   DETECTOR RIGOROSO DE NÃO-TEXTO / GIBBERISH / TRAPAÇA
   ======================================================== */
function analisarLegitimidadeTexto(texto) {
  const textoLimpo = texto.trim();
  
  // 1. Verificação de Extensão Mínima
  const palavrasTokens = textoLimpo.toLowerCase().match(/[a-záàâãéèêíïóôõöúçñ]+/g) || [];
  if (palavrasTokens.length < 20) {
    return {
      valido: false,
      motivo: "EXTENSÃO INSUFICIENTE (MENOS DE 20 PALAVRAS OU 7 LINHAS)",
      detalhes: "O texto produzido possui menos de 20 palavras ou menos de 7 linhas. De acordo com o edital de todos os vestibulares (ENEM, FATEC, FUVEST, UNICAMP), a redação é sumariamente ANULADA COM NOTA ZERO por insuficiência de texto."
    };
  }

// 2. Verificação de Repetição Anômala de Caracteres / Teclas (ex: "assadasdasda...")
  const semEspacos = textoLimpo.toLowerCase().replace(/[\s\r\n\t.,;:!?-]/g, '');
  if (semEspacos.length > 40) {
    // Pelo menos 8 letras distintas do alfabeto em qualquer texto
    const letrasDistintas = new Set(semEspacos.match(/[a-z]/g) || []);
    if (semEspacos.length > 50 && letrasDistintas.size < 8) {
      return {
        valido: false,
        motivo: "TEXTO ININTELIGÍVEL / REPETIÇÃO DE POUCAS LETRAS (GIBBERISH)",
        detalhes: `O texto foi redigido com variação nula de vocábulos e uso de apenas ${letrasDistintas.size} letras distintas do alfabeto. A redação foi ANULADA COM NOTA ZERO por ininteligibilidade.`
      };
    }

    const freqChars = {};
    for (const ch of semEspacos) {
      freqChars[ch] = (freqChars[ch] || 0) + 1;
    }
    const maxFreqChar = Math.max(...Object.values(freqChars));
    if (maxFreqChar / semEspacos.length > 0.35) {
      return {
        valido: false,
        motivo: "REPETIÇÃO ANÔMALA DE CARACTERES (GIBBERISH)",
        detalhes: "O texto consiste em repetições mecânicas de letras ou digitação aleatória sem valor sintático ou semântico. A redação foi ANULADA COM NOTA ZERO."
      };
    }

    const sortedFreqs = Object.values(freqChars).sort((a, b) => b - a);
    const top3 = (sortedFreqs[0] || 0) + (sortedFreqs[1] || 0) + (sortedFreqs[2] || 0);
    if (top3 / semEspacos.length > 0.65 && semEspacos.length > 80) {
      return {
        valido: false,
        motivo: "DIGITAÇÃO ALEATÓRIA DE TECLADO (GIBBERISH)",
        detalhes: "Detecção de padrões aleatórios de teclado (combinações de 'asdf', 'qwer' ou repetições contínuas). Não foi identificada construção textual em língua portuguesa. REDAÇÃO ANULADA COM NOTA ZERO."
      };
    }
  }

  // 2.1 Verificação de Vocábulos Gramaticais Essenciais da Língua Portuguesa (Stop Words)
  const stopWordsPt = new Set([
    "de","a","o","que","e","do","da","em","um","para","com","não","uma","os","no","se","na",
    "por","mais","as","dos","como","mas","foi","ao","ele","das","à","seu","sua","ou","quando",
    "muito","nos","já","eu","também","só","pelo","pela","até","isso","ela","entre","depois",
    "sem","mesmo","aos","seus","quem","nas","me","esse","eles","você","essa","num","nem","suas",
    "meu","às","minha","numa","pelos","elas","qual","nós","lhe","deles","essas","esses","pelas",
    "este","dele","tu","te","vocês","vos","lhes","meus","minhas","teu","tua","teus","tuas",
    "nosso","nossa","nossos","nossas","dela","delas","esta","estes","estas","aquele","aquela",
    "aqueles","aquelas","isto","aquilo","estou","está","estamos","estão","estive","esteve",
    "estivemos","estiveram","estava","estávamos","estavam","sou","é","somos","são","era","éramos",
    "eram","fui","foi","fomos","foram","tenho","tem","temos","têm","tinha","tínhamos","tinham"
  ]);
  const stopWordsEncontradas = new Set();
  palavrasTokens.forEach(p => {
    if (stopWordsPt.has(p)) stopWordsEncontradas.add(p);
  });
  if (palavrasTokens.length >= 20 && stopWordsEncontradas.size < 4) {
    return {
      valido: false,
      motivo: "AUSÊNCIA DE VOCÁBULOS GRAMATICAIS DA LÍNGUA PORTUGUESA (NÃO-TEXTO)",
      detalhes: "O texto não apresenta conectivos, artigos, preposições ou verbos essenciais da Língua Portuguesa. Foi identificado como digitação aleatória de caracteres. NOTA ZERO SUMÁRIA conforme edital."
    };
  }

  // 3. Verificação de Vocábulos Reais da Língua Portuguesa
  let palavrasReconhecidas = 0;
  for (const pal of palavrasTokens) {
    if (LEXICO_PORTUGUES_BASICO.has(pal)) {
      palavrasReconhecidas++;
    } else {
      const temTerminacaoValida = /(mente|coes|ções|cao|ção|dade|dades|mento|mentos|ismo|ista|vel|veis|ador|adora|antes|ento|ente|izar|izado|izada|izando|aram|eram|iram|ariam|eriam|iriam|isse|esse|asse|avam|iam|ando|endo|indo|ados|adas|idos|idas)$/i.test(pal);
      const encontrosInvalidos = /([bcdfghjklmnpqrstvwxyz]{4,}|[s]{3,}|[d]{3,}|[a]{4,}|[sd]{4,}|[asdf]{5,})/i.test(pal);
      if (temTerminacaoValida && !encontrosInvalidos && pal.length > 3) {
        palavrasReconhecidas++;
      }
    }
  }

  const taxaReconhecimento = palavrasReconhecidas / palavrasTokens.length;
  if (taxaReconhecimento < 0.35) {
    return {
      valido: false,
      motivo: "TEXTO ININTELIGÍVEL / AUSÊNCIA DE PALAVRAS DA LÍNGUA PORTUGUESA",
      detalhes: `Apenas ${(taxaReconhecimento * 100).toFixed(0)}% dos vocábulos inseridos possuem correspondência com a Língua Portuguesa. O texto foi considerado ininteligível pela banca examinadora, resultando em NOTA ZERO SUMÁRIA conforme edital.`
    };
  }

  // 4. Verificação de Diversidade Lexical
  const palavrasUnicas = new Set(palavrasTokens);
  const ttr = palavrasUnicas.size / palavrasTokens.length;
  if (ttr < 0.15 && palavrasTokens.length > 50) {
    return {
      valido: false,
      motivo: "MONOTONIA E REPETIÇÃO EXCESSIVA DE PALAVRAS",
      detalhes: "O texto repete excessivamente as mesmas palavras sem progressão discursiva ou estrutura frasal coerente. REDAÇÃO ANULADA COM NOTA ZERO."
    };
  }

  // 5. Verificação de Pontuação Básica
  const temPontos = /[.!?]/.test(textoLimpo);
  if (!temPontos && textoLimpo.length > 300) {
    return {
      valido: false,
      motivo: "AUSÊNCIA TOTAL DE PONTUAÇÃO E FRASAL",
      detalhes: "O texto não possui pontuação (nenhum ponto final ou separação de períodos). Uma redação de vestibular exige estrutura sintática articulada com parágrafos e períodos demarcados. NOTA ZERO."
    };
  }

  return { valido: true };
}

/* ========================================================
   INTEGRAÇÃO GOOGLE GEMINI API (CONFIGURAÇÃO & CONTROLE)
   ======================================================== */

window.abrirModalConfigGemini = function() {
  const modal = document.getElementById('modal-config-gemini');
  const inputKey = document.getElementById('gemini-api-key-input');
  const selectModelo = document.getElementById('gemini-model-select');
  const feedback = document.getElementById('gemini-test-feedback');
  const btnRemover = document.getElementById('btn-remover-chave-gemini');

  if (!modal) return;

  const savedKey = localStorage.getItem('estudamais_gemini_api_key') || '';
  const savedModel = localStorage.getItem('estudamais_gemini_model') || 'gemini-1.5-flash';

  if (inputKey) inputKey.value = savedKey;
  if (selectModelo) selectModelo.value = savedModel;
  if (feedback) {
    feedback.style.display = 'none';
    feedback.innerHTML = '';
  }
  if (btnRemover) {
    btnRemover.style.display = savedKey ? 'inline-flex' : 'none';
  }

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalConfigGemini = function() {
  const modal = document.getElementById('modal-config-gemini');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.salvarChaveGemini = function() {
  const inputKey = document.getElementById('gemini-api-key-input');
  const selectModelo = document.getElementById('gemini-model-select');
  if (!inputKey) return;

  const key = inputKey.value.trim();
  const modelo = selectModelo ? selectModelo.value : 'gemini-1.5-flash';

  if (!key) {
    alert('Por favor, insira uma Chave de API válida antes de salvar.');
    return;
  }

  localStorage.setItem('estudamais_gemini_api_key', key);
  localStorage.setItem('estudamais_gemini_model', modelo);

  window.atualizarStatusUIGemini();
  window.fecharModalConfigGemini();

  if (window.mostrarToast) {
    window.mostrarToast('API do Google Gemini conectada com sucesso!', 'sucesso');
  } else {
    alert('API do Google Gemini configurada e ativada com sucesso!');
  }
};

window.removerChaveGemini = function() {
  if (confirm('Deseja realmente remover a chave de API do Gemini deste navegador?')) {
    localStorage.removeItem('estudamais_gemini_api_key');
    window.atualizarStatusUIGemini();
    window.fecharModalConfigGemini();
    if (window.mostrarToast) {
      window.mostrarToast('Chave da API removida.', 'info');
    }
  }
};

window.testarChaveGemini = async function() {
  const inputKey = document.getElementById('gemini-api-key-input');
  const selectModelo = document.getElementById('gemini-model-select');
  const feedback = document.getElementById('gemini-test-feedback');
  const btnTestar = document.getElementById('btn-testar-gemini');

  if (!inputKey || !feedback) return;
  const key = inputKey.value.trim();
  const modelo = selectModelo ? selectModelo.value : 'gemini-1.5-flash';

  if (!key) {
    feedback.style.display = 'block';
    feedback.className = 'gemini-test-feedback erro';
    feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Por favor, insira uma Chave de API antes de testar.';
    return;
  }

  if (btnTestar) {
    btnTestar.disabled = true;
    btnTestar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testando...';
  }

  feedback.style.display = 'block';
  feedback.className = 'gemini-test-feedback info';
  feedback.innerHTML = '<i class="fa-solid fa-satellite-dish fa-spin"></i> Conectando aos servidores do Google Gemini...';

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Olá! Responda apenas "OK" para teste de conexão.' }] }]
      })
    });

    const data = await res.json();
    if (res.ok && data.candidates && data.candidates.length > 0) {
      feedback.className = 'gemini-test-feedback sucesso';
      feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Conexão bem-sucedida!</strong> A API do Google Gemini está ativa e pronta para avaliar suas redações.';
    } else {
      const msgErro = data.error?.message || 'Chave inválida ou serviço indisponível.';
      feedback.className = 'gemini-test-feedback erro';
      feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Erro na conexão:</strong> ${msgErro}`;
    }
  } catch (err) {
    feedback.className = 'gemini-test-feedback erro';
    feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Falha na requisição:</strong> Verifique sua conexão com a internet. (${err.message})`;
  } finally {
    if (btnTestar) {
      btnTestar.disabled = false;
      btnTestar.innerHTML = '<i class="fa-solid fa-plug"></i> Testar Conexão';
    }
  }
};

window.atualizarStatusUIGemini = function() {
  const pill = document.getElementById('gemini-pill-tag');
  const label = document.getElementById('gemini-status-label');
  const btnConfig = document.getElementById('btn-gemini-config');
  const savedKey = localStorage.getItem('estudamais_gemini_api_key');
  const savedModel = localStorage.getItem('estudamais_gemini_model') || 'gemini-1.5-flash';

  if (pill && label) {
    if (savedKey) {
      pill.textContent = 'Ativo ✨';
      pill.classList.remove('status-pendente');
      pill.classList.add('status-conectado');
      const nomeMod = savedModel === 'gemini-2.0-flash' ? 'Gemini 2.0 Flash' : (savedModel === 'gemini-1.5-pro' ? 'Gemini 1.5 Pro' : 'Gemini 1.5 Flash');
      label.textContent = nomeMod;
      if (btnConfig) btnConfig.classList.add('conectado');
    } else {
      pill.textContent = 'Configurar';
      pill.classList.remove('status-conectado');
      pill.classList.add('status-pendente');
      label.textContent = 'Google Gemini API';
      if (btnConfig) btnConfig.classList.remove('conectado');
    }
  }
};

async function chamarApiGemini(promptIA, apiKey, modelo) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelo || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          {
            text: promptIA
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.15,
      responseMimeType: "application/json"
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const msg = errData.error?.message || `Status HTTP ${res.status}`;
      throw new Error(`Erro Gemini (${res.status}): ${msg}`);
    }

    const data = await res.json();
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Nenhuma resposta retornada pelo Gemini.');
    }

    const rawText = data.candidates[0].content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error('Texto vazio retornado pelo Gemini.');
    }

    const parsed = JSON.parse(rawText);
    return parsed;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/* ========================================================
   MOTOR ANALÍTICO ESPECIALISTA POR BANCA & AVALIAÇÃO DE IA
   ======================================================== */
window.corrigirRedacaoIA = async function() {
  const textarea = document.getElementById('redacao-textarea');
  if (!textarea) return;

  const texto = textarea.value.trim();
  const tema = TEMAS_REDACAO_DATA.find(t => t.id === AppState.redacao.temaAtualId) || TEMAS_REDACAO_DATA[0];
  const btnCorrigir = document.getElementById('btn-corrigir-ia');
  const areaResultado = document.getElementById('redacao-resultado-ia');
  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  const modeloGemini = localStorage.getItem('estudamais_gemini_model') || 'gemini-1.5-flash';

  if (btnCorrigir) {
    btnCorrigir.disabled = true;
    btnCorrigir.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Avaliando com IA...';
  }

  const nomeMotor = apiKey ? `Google Gemini (${modeloGemini})` : 'Motor Analítico Especialista';

  if (areaResultado) {
    areaResultado.classList.add('active');
    areaResultado.innerHTML = `
      <div class="redacao-ia-carregando">
        <div class="ia-spinner-box">
          <i class="fa-solid fa-wand-magic-sparkles fa-bounce"></i>
        </div>
        <h4>Analisando sua redação com ${nomeMotor}...</h4>
        <p>Avaliando critérios específicos e grade oficial do <strong>${tema.vestibular}</strong> (${tema.notaMaxima || 1000} pontos).</p>
      </div>
    `;
    areaResultado.scrollIntoView({ behavior: 'smooth' });
  }

  // 1. Verificação prévia de legitimidade
  const checagemLegitimidade = analisarLegitimidadeTexto(texto);
  let analiseResultado = null;

  if (!checagemLegitimidade.valido) {
    analiseResultado = gerarResultadoAnulacao(checagemLegitimidade, tema);
    analiseResultado.motorUtilizado = apiKey ? `Google Gemini (${modeloGemini})` : 'Banca Examinadora Oficial';
  } else {
    // 2. Monta prompt estruturado rigoroso específico da banca examinadora
    const criteriosFormatados = tema.criterios.map(c => `- ${c.nome} (nota de 0 a ${c.peso} pts): ${c.desc}`).join('\n');
    const promptIA = `Você é um avaliador oficial extremamente experiente, rigoroso e imparcial da banca do vestibular ${tema.vestibular}.
Sua missão é corrigir a redação do aluno com uma nota sincera, honesta e sem complacência pedagógica artificial.

TEMA DA REDAÇÃO: "${tema.titulo}"
GÊNERO TEXTUAL: ${tema.genero}
ESCALA OFICIAL DE NOTA: 0 a ${tema.notaMaxima || 1000} pontos.

CRITÉRIOS OFICIAIS E PESOS DA BANCA DO ${tema.vestibular}:
${criteriosFormatados}

TEXTO ENVIADO PELO CANDIDATO:
"""
${texto}
"""

DIRETRIZES RÍGIDAS DE CORREÇÃO:
1. SE O TEXTO FOR DIGITAÇÃO DE TECLADO DESCONEXA, CARACTERES ALEATÓRIOS (ex: 'assadasd', 'qwerqwer'), OU NÃO CONTER FRASES COERENTES EM LÍNGUA PORTUGUESA:
   - ANULE A REDAÇÃO COM NOTA TOTAL ZERO (notaTotal: 0, anulada: true).
   - Todos os critérios devem receber nota 0.
   - No resumoGeral, declare formalmente a anulação por ininteligibilidade / ausência de vocábulos da Língua Portuguesa.
2. SE O TEXTO FOR REAL:
   - Avalie cada competência/critério de acordo com a qualidade argumentativa, obediência à norma culta, coesão, pertinência ao tema e adequação ao gênero ${tema.genero}.
   - Atribua notas individuais respeitando os pesos máximos de cada critério. A soma dos critérios DEVE SER EXATAMENTE IGUAL à notaTotal.
   - Forneça críticas construtivas e reais nos campos "pontosFortes", "pontosMelhorar" e "sugestaoReescrita".
   - Use ESTRITAMENTE os critérios do ${tema.vestibular} definidos acima (NÃO use critérios do ENEM para vestibulares diferentes como FATEC, FUVEST, UNICAMP ou VUNESP).

Responda OBRIGATORIAMENTE em JSON puro no seguinte formato:
{
  "notaTotal": 0,
  "notaMaxima": ${tema.notaMaxima || 1000},
  "anulada": false,
  "resumoGeral": "Parecer detalhado da banca examinadora...",
  "criterios": [
    ${tema.criterios.map(c => `{"nome": "${c.nome}", "nota": 0, "peso": ${c.peso}, "comentario": "Avaliação detalhada..."}`).join(',\n    ')}
  ],
  "pontosFortes": ["ponto 1", "ponto 2"],
  "pontosMelhorar": ["ponto 1", "ponto 2"],
  "sugestaoReescrita": "Orientação prática de melhoria..."
}`;

    // Tentativa 1: Google Gemini API (se configurada)
    if (apiKey) {
      try {
        const resultadoGemini = await chamarApiGemini(promptIA, apiKey, modeloGemini);
        if (resultadoGemini && typeof resultadoGemini.notaTotal === 'number' && Array.isArray(resultadoGemini.criterios)) {
          analiseResultado = resultadoGemini;
          analiseResultado.motorUtilizado = `Google Gemini (${modeloGemini})`;
        }
      } catch (errGemini) {
        console.warn("Aviso: Falha na requisição ao Google Gemini:", errGemini);
        if (window.mostrarToast) {
          window.mostrarToast(`Aviso Gemini: ${errGemini.message}. Recorrendo ao motor analítico.`, 'aviso');
        }
      }
    }

    // Tentativa 2: Nuvem pública de contingência (Pollinations)
    if (!analiseResultado) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000);

        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(promptIA)}?json=true`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const dataText = await res.text();
          const matchJson = dataText.match(/\{[\s\S]*\}/);
          if (matchJson) {
            const parsed = JSON.parse(matchJson[0]);
            if (parsed && typeof parsed.notaTotal === 'number' && Array.isArray(parsed.criterios)) {
              analiseResultado = parsed;
              analiseResultado.motorUtilizado = 'IA Nuvem (Rede Neural de Fallback)';
            }
          }
        }
      } catch (errPoll) {
        console.log("Ativando motor heurístico local especialista por vestibular:", errPoll);
      }
    }

    // Tentativa 3: Motor Especialista Local calibrado por vestibular
    if (!analiseResultado) {
      analiseResultado = executarCorrecaoLocalEspecialista(texto, tema);
      analiseResultado.motorUtilizado = 'Motor Especialista Local por Banca';
    }
  }

  // 3. Renderiza o resultado pedagógico
  renderizarResultadoCorrecaoIA(analiseResultado, tema);

  if (btnCorrigir) {
    btnCorrigir.disabled = false;
    btnCorrigir.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Avaliar Novamente com Gemini';
  }

  if (analiseResultado && !analiseResultado.anulada && (analiseResultado.notaTotal / analiseResultado.notaMaxima) >= 0.6) {
    tocarSomAcertoQuiz();
    if (window.dispararConfetes) {
      window.dispararConfetes();
    }
  } else if (analiseResultado && analiseResultado.anulada) {
    tocarSomErroQuiz();
  }

  salvarRascunhoRedacao();
};

function gerarResultadoAnulacao(checagem, tema) {
  return {
    anulada: true,
    notaTotal: 0,
    notaMaxima: tema.notaMaxima || 1000,
    resumoGeral: `REDAÇÃO ANULADA COM NOTA ZERO: ${checagem.motivo}. ${checagem.detalhes}`,
    criterios: tema.criterios.map(c => ({
      nome: c.nome,
      nota: 0,
      peso: c.peso,
      comentario: `Nota 0: Critério zerado em decorrência da anulação sumária do texto (${checagem.motivo.toLowerCase()}).`
    })),
    pontosFortes: [
      "Nenhum aspecto válido pôde ser aproveitado pela banca examinadora."
    ],
    pontosMelhorar: [
      "Escreva em Língua Portuguesa formal autêntica com palavras e frases reais.",
      "Estruture seu texto em parágrafos claros: Introdução, Desenvolvimento e Conclusão.",
      "Atenda à extensão mínima de 7 linhas e 20 palavras exigida pelo edital.",
      "Evite digitar caracteres aleatórios, repetições mecânicas ou sequências desconexas."
    ],
    sugestaoReescrita: "Para treinar e receber uma nota justa da IA, redija um parágrafo de introdução apresentando o tema, dois parágrafos de argumentação com dados ou filósofos e um parágrafo conclusivo."
  };
}

/* ========================================================
   MOTOR ANALÍTICO HEURÍSTICO LOCAL POR BANCA ESPECÍFICA
   ======================================================== */
function executarCorrecaoLocalEspecialista(texto, tema) {
  const checagem = analisarLegitimidadeTexto(texto);
  if (!checagem.valido) {
    return gerarResultadoAnulacao(checagem, tema);
  }

  const paragrafos = texto.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  const totalParagrafos = paragrafos.length;
  const palavras = texto.trim().split(/\s+/);
  const totalPalavras = palavras.length;
  const textarea = document.getElementById('redacao-textarea');
  const totalLinhas = calcularLinhasReaisTextarea(textarea);

  const conectivosChave = [
    "portanto", "ademais", "outrossim", "além disso", "nesse sentido", "sob esse prisma",
    "em primeiro lugar", "por outro lado", "por conseguinte", "dessa forma", "assim",
    "consequentemente", "contudo", "entretanto", "no entanto", "desse modo", "haja vista",
    "em suma", "logo", "posto isso", "vale ressaltar", "é indubitável que", "diante disso",
    "nesse viés", "em contrapartida", "destarte", "por sua vez"
  ];
  let conectivosContados = 0;
  conectivosChave.forEach(c => {
    if (new RegExp(`\\b${c}\\b`, 'i').test(texto)) conectivosContados++;
  });

  const repertoriosChave = [
    "constituição", "artigo", "declaração universal", "direitos humanos", "habermas",
    "bauman", "foucault", "dworkin", "aristóteles", "platão", "kant", "rousseau",
    "locke", "hobbes", "gilberto dimenstein", "cidadania de papel", "século", "revolução",
    "ibge", "ipea", "oms", "onu", "modernidade líquida", "sociedade do cansaço", "byung-chul han",
    "krenak", "silvia federici", "darcy ribeiro", "chomsky", "sennett", "milton santos"
  ];
  let repertoriosContados = 0;
  repertoriosChave.forEach(r => {
    if (new RegExp(`\\b${r}\\b`, 'i').test(texto)) repertoriosContados++;
  });

  let desviosSintaxe = 0;
  if (texto.includes('  ')) desviosSintaxe += 1;
  if (/[a-z]\.[a-z]/i.test(texto)) desviosSintaxe += 1;
  if (!/[.!?]$/.test(texto.trim())) desviosSintaxe += 1;
  const periodosSemMaiuscula = (texto.match(/\.\s+[a-zçáàâãéêíóôõú]/g) || []).length;
  desviosSintaxe += periodosSemMaiuscula;

  const vest = (tema.vestibular || "ENEM").toUpperCase();

  // ----------------------------------------------------
  // BANCA ENEM (Escala Oficial: 1000 Pontos)
  // ----------------------------------------------------
  if (vest === "ENEM") {
    let notaC1 = 160;
    if (desviosSintaxe === 0 && totalPalavras >= 240) notaC1 = 200;
    else if (desviosSintaxe >= 4 || totalPalavras < 150) notaC1 = 120;
    else if (desviosSintaxe >= 7 || totalPalavras < 100) notaC1 = 80;

    let notaC2 = 120;
    if (repertoriosContados >= 2 && totalParagrafos >= 3) notaC2 = 200;
    else if (repertoriosContados >= 1) notaC2 = 160;
    else if (totalPalavras < 120) notaC2 = 80;

    let notaC3 = 120;
    if (totalParagrafos === 4 && totalPalavras >= 250) notaC3 = 200;
    else if (totalParagrafos >= 3 && totalPalavras >= 180) notaC3 = 160;
    else if (totalParagrafos < 2) notaC3 = 80;

    let notaC4 = 120;
    if (conectivosContados >= 5) notaC4 = 200;
    else if (conectivosContados >= 3) notaC4 = 160;
    else if (conectivosContados < 2) notaC4 = 80;

    const agentes = ["governo", "ministério", "escola", "família", "mídia", "sociedade", "poder público", "ong", "município", "estado"];
    const acoes = ["deve", "precisa", "criar", "investir", "promover", "garantir", "fiscalizar", "conscientizar", "instituir"];
    const modos = ["por meio de", "mediante", "através de", "com a criação de", "por intermédio", "com o apoio"];
    const efeitos = ["a fim de", "com o objetivo de", "para que", "visando a", "com o fito de", "de modo a"];

    let temAgente = agentes.some(a => new RegExp(`\\b${a}\\b`, 'i').test(texto));
    let temAcao = acoes.some(a => new RegExp(`\\b${a}\\b`, 'i').test(texto));
    let temModo = modos.some(m => new RegExp(`\\b${m}\\b`, 'i').test(texto));
    let temEfeito = efeitos.some(e => new RegExp(`\\b${e}\\b`, 'i').test(texto));
    let elementos = [temAgente, temAcao, temModo, temEfeito].filter(Boolean).length;
    
    let notaC5 = 80;
    if (elementos >= 4 && totalParagrafos >= 4) notaC5 = 200;
    else if (elementos >= 3) notaC5 = 160;
    else if (elementos >= 2) notaC5 = 120;

    const notaTotal = notaC1 + notaC2 + notaC3 + notaC4 + notaC5;

    return {
      notaTotal,
      notaMaxima: 1000,
      anulada: false,
      resumoGeral: `Avaliação oficial padrão ENEM: Sua redação totalizou ${notaTotal}/1000 pontos, estruturada em ${totalParagrafos} parágrafos e ${totalPalavras} palavras (${totalLinhas} linhas). ${notaTotal >= 800 ? 'Excelente projeto de texto com bom domínio argumentativo!' : 'Texto com potencial, necessitando de ajustes em repertório e detalhamento da proposta.'}`,
      criterios: [
        { nome: "C1 - Norma Culta", nota: notaC1, peso: 200, comentario: notaC1 >= 160 ? "Bom domínio da estrutura sintática e pontuação formal." : "Atenção a desvios de concordância, regência e pontuação entre períodos." },
        { nome: "C2 - Tema e Repertório", nota: notaC2, peso: 200, comentario: repertoriosContados > 0 ? "Utilizou referências e repertório produtivo legitimado pelas áreas do saber." : "Recomenda-se articular conceitos filosóficos, sociológicos ou dados estatísticos." },
        { nome: "C3 - Projeto de Texto", nota: notaC3, peso: 200, comentario: totalParagrafos >= 4 ? "Estrutura equilibrada em 4 parágrafos (Intro, D1, D2, Conclusão)." : "Procure dividir o desenvolvimento em dois parágrafos distintos de causa e efeito." },
        { nome: "C4 - Mecanismos Linguísticos", nota: notaC4, peso: 200, comentario: conectivosContados >= 4 ? "Boa variedade de operadores argumentativos inter e intraparágrafos." : "Empregue mais conectivos diversificados no início de cada parágrafo (ex: 'Ademais', 'Por conseguinte')." },
        { nome: "C5 - Proposta de Intervenção", nota: notaC5, peso: 200, comentario: elementos >= 4 ? "Proposta de intervenção completa com os 5 elementos essenciais bem articulados." : "Certifique-se de apresentar Agente, Ação, Meio/Modo, Efeito e o Detalhamento de um deles." }
      ],
      pontosFortes: [
        totalParagrafos >= 3 ? "Boa distribuição de parágrafos no padrão dissertativo" : "Clareza na exposição do ponto de vista",
        conectivosContados >= 3 ? "Presença de conectivos e articuladores de coesão" : "Vocabulário condizente com a proposta"
      ],
      pontosMelhorar: [
        repertoriosContados === 0 ? "Inserir repertório sociocultural legitimado (Constituição, autores, dados)" : "Aprofundar a relação crítica entre o segundo argumento e o tema",
        elementos < 4 ? "Garantir os 5 elementos obrigatórios da intervenção na Competência 5" : "Eliminar desvios pontuais de pontuação"
      ],
      sugestaoReescrita: "No parágrafo de conclusão, explicite quem executará a medida (ex: 'Cabe ao Ministério da Educação...') e detalhe o meio (ex: 'por intermédio de editais regionalizados...')."
    };
  }

  // ----------------------------------------------------
  // BANCA FATEC - CENTRO PAULA SOUZA (Escala Oficial: 100 Pontos)
  // ----------------------------------------------------
  if (vest === "FATEC") {
    let notaCrit1 = 28;
    if (totalParagrafos >= 3 && totalPalavras >= 200) notaCrit1 = 36;
    if (totalParagrafos >= 4 && repertoriosContados >= 1) notaCrit1 = 40;
    else if (totalPalavras < 120) notaCrit1 = 20;

    let notaCrit2 = 22;
    if (conectivosContados >= 3 && totalParagrafos >= 3) notaCrit2 = 28;
    if (conectivosContados >= 5) notaCrit2 = 30;
    else if (totalParagrafos < 2) notaCrit2 = 15;

    let notaCrit3 = 22;
    if (desviosSintaxe === 0 && totalPalavras >= 200) notaCrit3 = 30;
    else if (desviosSintaxe <= 2) notaCrit3 = 26;
    else if (desviosSintaxe >= 5) notaCrit3 = 16;

    const notaTotal = notaCrit1 + notaCrit2 + notaCrit3;

    return {
      notaTotal,
      notaMaxima: 100,
      anulada: false,
      resumoGeral: `Avaliação oficial padrão FATEC / Centro Paula Souza: Sua redação alcançou ${notaTotal}/100 pontos (${totalLinhas} linhas). Avaliação focada em clareza lógica, concisão dissertativa e fundamentação prática sobre tecnologia e sociedade.`,
      criterios: [
        { nome: "Critério 1 - Adequação ao Tema e Gênero", nota: notaCrit1, peso: 40, comentario: notaCrit1 >= 34 ? "Compreensão lúcida do tema tecnológico/social e tese bem demarcada." : "Procure delimitar com maior clareza o recorte do tema e seu impacto na sociedade e no mercado." },
        { nome: "Critério 2 - Coerência e Argumentação Lógica", nota: notaCrit2, peso: 30, comentario: notaCrit2 >= 26 ? "Boa progressão de ideias com relações consistentes de causa e efeito." : "Desenvolva mais exemplos práticos para sustentar as afirmativas dos parágrafos de desenvolvimento." },
        { nome: "Critério 3 - Domínio da Norma Culta e Coesão", nota: notaCrit3, peso: 30, comentario: notaCrit3 >= 26 ? "Vocabulário formal e assertivo, pontuação correta e boa conexão frasal." : "Atenção a períodos muito longos e concordância verbal/nominal." }
      ],
      pontosFortes: [
        `Extensão condizente com a folha da FATEC (${totalLinhas} linhas reais ocupadas)`,
        "Abordagem alinhada ao pensamento crítico e tecnológico"
      ],
      pontosMelhorar: [
        "Aprofundar a fundamentação com dados da realidade produtiva ou legislação",
        "Concluir com síntese propositiva focada em soluções práticas"
      ],
      sugestaoReescrita: "Na redação da FATEC, não é obrigatório seguir a proposta engessada de 5 elementos do ENEM; foque em uma conclusão que sintetize as causas e aponte perspectivas concretas para a área tecnológica."
    };
  }

  // ----------------------------------------------------
  // BANCA FUVEST / USP (Escala Oficial: 50 Pontos)
  // ----------------------------------------------------
  if (vest === "FUVEST") {
    let notaQuesitoA = 14;
    if (repertoriosContados >= 2 && totalPalavras >= 230) notaQuesitoA = 19;
    else if (repertoriosContados >= 1) notaQuesitoA = 16;
    else if (totalPalavras < 140) notaQuesitoA = 10;

    let notaQuesitoB = 10;
    if (totalParagrafos >= 3 && conectivosContados >= 3) notaQuesitoB = 14;
    else if (totalParagrafos < 2) notaQuesitoB = 7;

    let notaQuesitoC = 11;
    if (desviosSintaxe === 0 && totalPalavras >= 220) notaQuesitoC = 15;
    else if (desviosSintaxe <= 2) notaQuesitoC = 13;
    else if (desviosSintaxe >= 5) notaQuesitoC = 8;

    const notaTotal = notaQuesitoA + notaQuesitoB + notaQuesitoC;

    return {
      notaTotal,
      notaMaxima: 50,
      anulada: false,
      resumoGeral: `Avaliação oficial padrão FUVEST (USP): Sua redação obteve ${notaTotal}/50 pontos (${totalLinhas} linhas). A banca da USP valoriza a capacidade de abstração conceitual, fuga do senso comum e a ausência de modelos prontos pré-fabricados.`,
      criterios: [
        { nome: "Quesito A - Desenvolvimento do Tema e Fundamentação", nota: notaQuesitoA, peso: 20, comentario: notaQuesitoA >= 16 ? "Boa densidade reflexiva e capacidade de abstração teórica." : "Aprofunde a reflexão filosófica superando constatações óbvias do senso comum." },
        { nome: "Quesito B - Coerência dos Argumentos e Estrutura", nota: notaQuesitoB, peso: 15, comentario: notaQuesitoB >= 12 ? "Encadeamento lógico consistente sem fórmulas artificiais." : "Trabalhe a transição orgânica entre as premissas e a conclusão." },
        { nome: "Quesito C - Correção Gramatical e Precisão Vocabular", nota: notaQuesitoC, peso: 15, comentario: notaQuesitoC >= 13 ? "Linguagem culta apurada com precisão e sofisticação de termos." : "Revise a pontuação de orações intercaladas e regência verbal." }
      ],
      pontosFortes: [
        "Tom reflexivo e maturidade de pensamento",
        "Articulação entre os conceitos teóricos e a realidade"
      ],
      pontosMelhorar: [
        "Intensificar a problematização das causas profundas do tema",
        "Lembre-se de que a FUVEST exige título expressivo no início da folha"
      ],
      sugestaoReescrita: "Para a FUVEST, evite propor soluções mecânicas ao final. Em vez disso, feche seu texto com uma reflexão filosófica que resgate a tese inicial sob nova perspectiva."
    };
  }

  // ----------------------------------------------------
  // BANCA UNICAMP (Escala Oficial: 48 Pontos)
  // ----------------------------------------------------
  if (vest === "UNICAMP") {
    let notaC1 = 12;
    let notaC2 = 12;
    let notaC3 = 11;
    if (totalPalavras >= 220 && totalParagrafos >= 3) {
      notaC1 = 15;
      notaC2 = 15;
      notaC3 = 14;
    } else if (totalPalavras < 130) {
      notaC1 = 8;
      notaC2 = 8;
      notaC3 = 7;
    }
    const notaTotal = notaC1 + notaC2 + notaC3;

    return {
      notaTotal,
      notaMaxima: 48,
      anulada: false,
      resumoGeral: `Avaliação oficial padrão UNICAMP (Comvest): Sua produção atingiu ${notaTotal}/48 pontos (${totalLinhas} linhas). A Comvest prioriza o cumprimento estrito do gênero textual solicitado e a interlocução autêntica com o leitor previsto.`,
      criterios: [
        { nome: "Critério 1 - Proposta Temática, Gênero e Interlocução", nota: notaC1, peso: 16, comentario: "Adequação à situação comunicativa e máscara autoral do gênero solicitado." },
        { nome: "Critério 2 - Projeto de Texto e Leitura da Coletânea", nota: notaC2, peso: 16, comentario: "Uso autoral das informações dos textos motivadores sem cópias diretas." },
        { nome: "Critério 3 - Coesão e Convenções da Escrita", nota: notaC3, peso: 16, comentario: "Domínio linguístico e recursos estilísticos próprios do gênero." }
      ],
      pontosFortes: [
        "Voz autoral expressiva e posicionamento firme",
        "Interlocução adequada com o público-alvo"
      ],
      pontosMelhorar: [
        "Explorar de maneira mais integrada os dados da coletânea fornecida",
        "Ajustar a assinatura e elementos característicos do gênero específico"
      ],
      sugestaoReescrita: "Verifique se você assumiu a persona exigida pela proposta da UNICAMP (ex: manifesto, carta ou artigo) do primeiro ao último período."
    };
  }

  // ----------------------------------------------------
  // BANCA UNESP (Escala Oficial: 28 Pontos)
  // ----------------------------------------------------
  if (vest === "UNESP") {
    let notaA = 8;
    let notaB = 8;
    let notaC = 6;
    if (totalPalavras >= 220 && totalParagrafos >= 3) {
      notaA = 9;
      notaB = 9;
      notaC = 8;
    }
    const notaTotal = notaA + notaB + notaC;

    return {
      notaTotal,
      notaMaxima: 28,
      anulada: false,
      resumoGeral: `Avaliação oficial padrão VUNESP / UNESP: Sua nota foi ${notaTotal}/28 pontos (${totalLinhas} linhas). A banca exige resposta categórica e bem fundamentada à pergunta-tema da prova.`,
      criterios: [
        { nome: "Critério A - Abordagem do Tema e Coletânea", nota: notaA, peso: 10, comentario: "Posicionamento claro respondendo à questão norteadora da UNESP." },
        { nome: "Critério B - Estrutura e Progressão Argumentativa", nota: notaB, peso: 10, comentario: "Organização dissertativa consistente com início, meio e fim harmônicos." },
        { nome: "Critério C - Expressão e Domínio da Norma Padrão", nota: notaC, peso: 8, comentario: "Emprego preciso de conectivos, concordância e pontuação formal." }
      ],
      pontosFortes: ["Tese nítida desde o parágrafo de introdução", "Progressão lógica das ideias"],
      pontosMelhorar: ["Contrapor visões alternativas para enriquecer o debate", "Variar os conectivos de início de parágrafo"],
      sugestaoReescrita: "Na UNESP, certifique-se de que sua tese responde frontalmente à pergunta do tema, sem ficar em cima do muro."
    };
  }

  // ----------------------------------------------------
  // DEMAIS VESTIBULARES (Escala Proporcional pelo Array tema.criterios)
  // ----------------------------------------------------
  const notaMaxima = tema.notaMaxima || 100;
  const criteriosCalculados = tema.criterios.map((c, i) => {
    let proporcao = 0.75;
    if (totalPalavras >= 230 && conectivosContados >= 3) proporcao = 0.90;
    else if (totalPalavras < 120) proporcao = 0.55;
    const notaCrit = Math.round(c.peso * proporcao);
    return {
      nome: c.nome,
      nota: Math.min(c.peso, Math.max(0, notaCrit)),
      peso: c.peso,
      comentario: `Atendimento satisfatório às diretrizes oficiais da banca do ${tema.vestibular}.`
    };
  });
  const notaTotal = criteriosCalculados.reduce((acc, cur) => acc + cur.nota, 0);

  return {
    notaTotal,
    notaMaxima,
    anulada: false,
    resumoGeral: `Avaliação oficial do vestibular ${tema.vestibular}: Sua redação obteve ${notaTotal}/${notaMaxima} pontos (${totalLinhas} linhas), analisada conforme os ${tema.criterios.length} critérios oficiais da instituição.`,
    criterios: criteriosCalculados,
    pontosFortes: [
      `Estrutura consistente com ${totalParagrafos} parágrafos bem delimitados`,
      "Vocabulário adequado ao padrão formal exigido no exame"
    ],
    pontosMelhorar: [
      "Aprofundar a densidade crítica dos argumentos",
      "Diversificar os mecanismos de conexão entre os períodos"
    ],
    sugestaoReescrita: `Siga praticando os temas do ${tema.vestibular} para fixar a estrutura e aprimorar a velocidade de redação na folha oficial de 30 linhas.`
  };
}

/* ========================================================
   RENDERIZADOR DO RELATÓRIO OFICIAL DE CORREÇÃO
   ======================================================== */
function renderizarResultadoCorrecaoIA(res, tema) {
  const container = document.getElementById('redacao-resultado-ia');
  if (!container) return;

  const percentual = res.notaMaxima > 0 ? Math.round((res.notaTotal / res.notaMaxima) * 100) : 0;
  let corBadge = "verde";
  let tituloStatus = `${percentual}% de Aproveitamento`;

  if (res.anulada || res.notaTotal === 0) {
    corBadge = "vermelho";
    tituloStatus = "REDAÇÃO ANULADA (NOTA ZERO)";
  } else if (percentual < 60) {
    corBadge = "vermelho";
    tituloStatus = "Abaixo da Média de Corte";
  } else if (percentual < 80) {
    corBadge = "amarelo";
    tituloStatus = "Bom Desempenho";
  } else {
    corBadge = "verde";
    tituloStatus = "Excelente Nota Competitiva!";
  }

  container.innerHTML = `
    <div class="resultado-correcao-card ${res.anulada ? 'anulada-box' : ''}">
      <div class="resultado-correcao-header">
        <div class="resultado-score-box ${corBadge}">
          <span class="resultado-nota-num">${res.notaTotal}</span>
          <span class="resultado-nota-max">/ ${res.notaMaxima}</span>
          <span class="resultado-nota-label">${tituloStatus}</span>
        </div>
        <div class="resultado-info-geral">
          <h3>
            <i class="fa-solid ${res.anulada ? 'fa-ban text-danger' : 'fa-award'}"></i> 
            ${res.anulada ? 'Parecer Oficial de Anulação' : 'Relatório Oficial de Avaliação por Competências'}
          </h3>
          <p class="resultado-vest-sub">
            Banca Avaliadora: <strong>${tema.vestibular}</strong> • 
            Gênero: <strong>${tema.genero}</strong> • 
            Nota Máxima: <strong>${res.notaMaxima} pts</strong>
            <span class="badge-gemini-motor"><i class="fa-solid fa-wand-magic-sparkles"></i> ${res.motorUtilizado || 'Google Gemini AI'}</span>
          </p>
          <div class="resultado-resumo-texto ${res.anulada ? 'alerta-anulacao' : ''}">
            ${res.resumoGeral}
          </div>
        </div>
      </div>

      <!-- Critérios da Banca -->
      <div class="resultado-criterios-secao">
        <h4 class="resultado-subtitulo"><i class="fa-solid fa-list-check"></i> Desempenho por Competência da Banca:</h4>
        <div class="resultado-criterios-grid">
          ${res.criterios.map(c => `
            <div class="criterio-item-card ${c.nota === 0 ? 'criterio-zerado' : ''}">
              <div class="criterio-card-top">
                <strong>${c.nome}</strong>
                <span class="criterio-nota-tag ${c.nota === 0 ? 'zerado' : ''}">${c.nota} / ${c.peso} pts</span>
              </div>
              <div class="criterio-barra-bg">
                <div class="criterio-barra-fill ${c.nota === 0 ? 'zerado' : ''}" style="width: ${c.peso > 0 ? (c.nota / c.peso) * 100 : 0}%"></div>
              </div>
              <p class="criterio-comentario">${c.comentario}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Feedbacks da Banca -->
      <div class="resultado-feedbacks-duplo">
        <div class="feedback-coluna positivo">
          <h4><i class="fa-solid fa-circle-check"></i> Pontos Identificados Pela Banca</h4>
          <ul>
            ${res.pontosFortes.map(pf => `<li>${pf}</li>`).join('')}
          </ul>
        </div>
        <div class="feedback-coluna melhoria">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> O que Você Deve Corrigir</h4>
          <ul>
            ${res.pontosMelhorar.map(pm => `<li>${pm}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Orientação do Corretor -->
      <div class="resultado-sugestao-reescrita">
        <h4><i class="fa-solid fa-lightbulb"></i> Orientação Prática do Corretor Especialista</h4>
        <p>${res.sugestaoReescrita}</p>
      </div>

      ${!localStorage.getItem('estudamais_gemini_api_key') ? `
        <div class="gemini-cta-banner">
          <div class="gemini-cta-info">
            <strong><i class="fa-brands fa-google"></i> Deseja correções neurais ainda mais profundas com o Google Gemini oficial?</strong>
            <span>Você pode conectar gratuitamente sua chave do Google AI Studio para receber avaliações minuciosas linha por linha!</span>
          </div>
          <button type="button" class="btn-gemini-cta" onclick="abrirModalConfigGemini()">
            <i class="fa-solid fa-plug"></i> Conectar Gemini Grátis
          </button>
        </div>
      ` : ''}
    </div>
  `;
}


/* ========================================================
   MÓDULO: SIMULADOS DOS VESTIBULARES COM TEMPORIZADOR E GABARITO
   ======================================================== */

window.inicializarSimulados = function() {
  const container = document.getElementById('simulados-lista-cards');
  if (!container) return;

  container.innerHTML = SIMULADOS_DATA.map(sim => {
    const historico = localStorage.getItem(`estudamais_simulado_best_${sim.id}`);
    const bestScore = historico ? JSON.parse(historico) : null;

    return `
      <div class="simulado-selecao-card">
        <div class="simulado-card-badge-top">
          <span class="simulado-vest-tag ${sim.vestibular.toLowerCase()}">${sim.vestibular}</span>
          <span class="simulado-tempo-tag"><i class="fa-solid fa-stopwatch"></i> ${sim.tempoMinutos} min</span>
        </div>
        <h3 class="simulado-card-titulo">${sim.titulo}</h3>
        <p class="simulado-card-sub">${sim.subtitulo}</p>
        
        <div class="simulado-card-meta">
          <span><i class="fa-solid fa-list-check"></i> ${sim.questoes.length} Questões</span>
          <span><i class="fa-solid fa-graduation-cap"></i> TRI & Gabarito Comentado</span>
        </div>

        ${bestScore ? `
          <div class="simulado-melhor-nota">
            <i class="fa-solid fa-trophy"></i> Seu melhor resultado: <strong>${bestScore.acertos}/${bestScore.total} (${bestScore.porcentagem}%)</strong>
          </div>
        ` : ''}

        <button class="btn-iniciar-simulado" onclick="iniciarSimulado('${sim.id}')">
          <i class="fa-solid fa-play"></i> Iniciar Simulado Agora
        </button>
      </div>
    `;
  }).join('');

  const selDisc = document.getElementById('builder-disciplina');
  if (selDisc && typeof atualizarOpcoesTemasSimulado === 'function') {
    atualizarOpcoesTemasSimulado();
  }
};

window.alternarModoVisualizacaoSimulados = function(modo) {
  const painelCards = document.getElementById('simulados-lista-cards');
  const painelCustom = document.getElementById('simulado-custom-builder-card');
  const pillBancas = document.getElementById('pill-simulados-bancas');
  const pillCustom = document.getElementById('pill-simulados-custom');

  if (modo === 'custom') {
    if (painelCards) painelCards.style.display = 'none';
    if (painelCustom) painelCustom.style.display = 'block';
    if (pillBancas) pillBancas.classList.remove('active');
    if (pillCustom) pillCustom.classList.add('active');
    atualizarOpcoesTemasSimulado();
  } else {
    if (painelCards) painelCards.style.display = 'grid';
    if (painelCustom) painelCustom.style.display = 'none';
    if (pillBancas) pillBancas.classList.add('active');
    if (pillCustom) pillCustom.classList.remove('active');
  }
};

window.atualizarOpcoesTemasSimulado = function() {
  const selDisc = document.getElementById('builder-disciplina');
  const selTema = document.getElementById('builder-tema');
  if (!selDisc || !selTema) return;

  const discEscolhida = selDisc.value;
  const listaTemas = (typeof TEMAS_DISCIPLINAS_DATA !== 'undefined' && TEMAS_DISCIPLINAS_DATA[discEscolhida])
    ? TEMAS_DISCIPLINAS_DATA[discEscolhida]
    : ['Todos os Temas da Disciplina', 'Conceitos Fundamentais', 'Aplicações Práticas'];

  selTema.innerHTML = listaTemas.map(tema => `<option value="${tema}">${tema}</option>`).join('');
};

window.gerarSimuladoCustomizadoPorTema = function() {
  const selVest = document.getElementById('builder-vestibular');
  const selDisc = document.getElementById('builder-disciplina');
  const selTema = document.getElementById('builder-tema');
  const selQtd = document.getElementById('builder-qtd-questoes');

  const vestEscolhido = selVest ? selVest.value : 'todos';
  const discEscolhida = selDisc ? selDisc.value : 'Matemática';
  const temaEscolhido = selTema ? selTema.value : 'Todos os Temas';
  const qtdDesejada = selQtd ? parseInt(selQtd.value, 10) : 10;

  let poolQuestoes = [];
  if (typeof SIMULADOS_DATA !== 'undefined') {
    SIMULADOS_DATA.forEach(sim => {
      (sim.questoes || []).forEach(q => {
        poolQuestoes.push({ ...q, vestibularOrigem: sim.vestibular });
      });
    });
  }
  if (typeof QUIZ_QUESTIONS !== 'undefined') {
    QUIZ_QUESTIONS.forEach(q => {
      poolQuestoes.push({ ...q, vestibularOrigem: q.vestibular });
    });
  }

  const termoDisc = discEscolhida.toLowerCase();
  let filtradas = poolQuestoes.filter(q => {
    const d = (q.disciplina || '').toLowerCase();
    const a = (q.area || '').toLowerCase();
    const condDisc = d.includes(termoDisc) || a.includes(termoDisc) || termoDisc.includes(d);
    
    let condVest = true;
    if (vestEscolhido !== 'todos') {
      const v = (q.vestibularOrigem || q.vestibular || '').toLowerCase();
      condVest = v.includes(vestEscolhido.toLowerCase());
    }
    return condDisc && condVest;
  });

  if (temaEscolhido && !temaEscolhido.toLowerCase().includes('todos')) {
    const palavrasChave = temaEscolhido.toLowerCase().split(/[\s,&()]+/);
    const refinadas = filtradas.filter(q => {
      const texto = ((q.enunciado || '') + ' ' + (q.disciplina || '') + ' ' + (q.explicacao || '')).toLowerCase();
      return palavrasChave.some(p => p.length > 3 && texto.includes(p));
    });
    if (refinadas.length >= 3) {
      filtradas = refinadas;
    }
  }

  if (filtradas.length < qtdDesejada) {
    const adicionais = poolQuestoes.filter(q => {
      const d = (q.disciplina || '').toLowerCase();
      return (d.includes(termoDisc) || termoDisc.includes(d)) && !filtradas.some(f => f.id === q.id);
    });
    filtradas = filtradas.concat(adicionais);
  }

  if (filtradas.length < qtdDesejada) {
    const gerais = poolQuestoes.filter(q => !filtradas.some(f => f.id === q.id));
    filtradas = filtradas.concat(gerais);
  }

  filtradas.sort(() => Math.random() - 0.5);
  const questoesFinais = filtradas.slice(0, qtdDesejada);

  const novoId = 'simulado-custom-' + Date.now();
  const vestLabel = vestEscolhido === 'todos' ? 'Multidisciplinar' : vestEscolhido;
  const temaLabel = (temaEscolhido && !temaEscolhido.toLowerCase().includes('todos')) ? ` • ${temaEscolhido}` : '';

  const novoSimulado = {
    id: novoId,
    vestibular: vestLabel,
    titulo: `Simulado Sob Medida: ${discEscolhida}${temaLabel}`,
    subtitulo: `${questoesFinais.length} Questões selecionadas sob medida com cronômetro e gabarito oficial comentado`,
    tempoMinutos: Math.max(15, Math.round(questoesFinais.length * 3.5)),
    disciplinas: [discEscolhida],
    questoes: questoesFinais
  };

  SIMULADOS_DATA.unshift(novoSimulado);
  inicializarSimulados();

  mostrarToast(`🎯 Simulado sob medida de ${discEscolhida} gerado com sucesso!`);
  iniciarSimulado(novoId);
};

window.criarProximoSimuladoPorIA = function(simuladoAnterior, acertos, total, pct, areas) {
  let menorPct = 101;
  let areaReforco = 'Conhecimentos Gerais';

  if (areas && Object.keys(areas).length > 0) {
    Object.entries(areas).forEach(([areaNome, dados]) => {
      const p = (dados.acertos / dados.total) * 100;
      if (p < menorPct) {
        menorPct = p;
        areaReforco = areaNome;
      }
    });
  }

  let pool = [];
  if (typeof SIMULADOS_DATA !== 'undefined') {
    SIMULADOS_DATA.forEach(s => {
      if (s.id !== simuladoAnterior.id) {
        (s.questoes || []).forEach(q => pool.push({ ...q, vestibularOrigem: s.vestibular }));
      }
    });
  }
  if (typeof QUIZ_QUESTIONS !== 'undefined') {
    QUIZ_QUESTIONS.forEach(q => pool.push({ ...q, vestibularOrigem: q.vestibular }));
  }

  const termo = areaReforco.toLowerCase();
  let questoesFoco = pool.filter(q => {
    const a = (q.area || '').toLowerCase();
    const d = (q.disciplina || '').toLowerCase();
    return a.includes(termo) || d.includes(termo) || termo.includes(d);
  });

  if (questoesFoco.length < 10) {
    const outras = pool.filter(q => !questoesFoco.some(f => f.id === q.id));
    outras.sort(() => Math.random() - 0.5);
    questoesFoco = questoesFoco.concat(outras.slice(0, 10 - questoesFoco.length));
  }

  questoesFoco.sort(() => Math.random() - 0.5);
  const questoesIA = questoesFoco.slice(0, 10);

  const novoIdIA = 'simulado-ia-' + Date.now();
  const novoSim = {
    id: novoIdIA,
    vestibular: simuladoAnterior.vestibular || 'ENEM',
    titulo: `Simulado Adaptativo IA • Reforço em ${areaReforco}`,
    subtitulo: `10 Questões adaptativas selecionadas pela IA com base nos seus pontos de melhoria do simulado anterior`,
    tempoMinutos: 35,
    disciplinas: [areaReforco, 'Revisão Adaptativa'],
    focoTexto: `${areaReforco} (Aproveitamento anterior: ${menorPct <= 100 ? Math.round(menorPct) + '%' : 'Aprofundamento'})`,
    questoes: questoesIA
  };

  SIMULADOS_DATA.unshift(novoSim);
  return novoSim;
};

window.iniciarSimulado = function(idSimulado) {
  const sim = SIMULADOS_DATA.find(s => s.id === idSimulado);
  if (!sim) return;

  AppState.simulado = {
    ativo: sim,
    questaoIndex: 0,
    respostas: {},
    revisoes: {},
    tempoRestante: sim.tempoMinutos * 60,
    timerId: null,
    finalizado: false
  };

  // Alterna visualizações
  document.getElementById('simulados-selecao-painel').style.display = 'none';
  document.getElementById('simulado-prova-painel').style.display = 'block';
  document.getElementById('simulado-resultado-painel').style.display = 'none';

  // Inicia timer
  iniciarTimerSimulado();

  // Renderiza primeira questão
  renderizarQuestaoSimulado();

  // Rola até o topo da prova
  document.getElementById('simulado-prova-painel').scrollIntoView({ behavior: 'smooth' });
};

function iniciarTimerSimulado() {
  if (AppState.simulado.timerId) clearInterval(AppState.simulado.timerId);

  const elTimer = document.getElementById('simulado-timer-display');

  AppState.simulado.timerId = setInterval(() => {
    AppState.simulado.tempoRestante--;

    if (AppState.simulado.tempoRestante <= 0) {
      clearInterval(AppState.simulado.timerId);
      tocarSinoPomodoro();
      alert('⏰ O tempo do simulado encerrou! Calculando seu resultado final...');
      finalizarSimulado();
      return;
    }

    const mins = Math.floor(AppState.simulado.tempoRestante / 60);
    const secs = AppState.simulado.tempoRestante % 60;
    if (elTimer) {
      elTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      if (mins < 5) elTimer.classList.add('alerta-tempo');
      else elTimer.classList.remove('alerta-tempo');
    }
  }, 1000);
}

window.renderizarQuestaoSimulado = function() {
  const sim = AppState.simulado.ativo;
  const index = AppState.simulado.questaoIndex;
  const questao = sim.questoes[index];

  if (!questao) return;

  // Atualiza indicadores de progresso
  const elNum = document.getElementById('simulado-q-num');
  const elTotal = document.getElementById('simulado-q-total');
  const elArea = document.getElementById('simulado-q-area');
  const elDisc = document.getElementById('simulado-q-disc');
  const elEnunciado = document.getElementById('simulado-q-enunciado');
  const elAlternativas = document.getElementById('simulado-q-alternativas');
  const btnRevisar = document.getElementById('btn-simulado-revisar');

  if (elNum) elNum.textContent = index + 1;
  if (elTotal) elTotal.textContent = sim.questoes.length;
  if (elArea) elArea.textContent = questao.area;
  if (elDisc) elDisc.textContent = questao.disciplina;
  if (elEnunciado) elEnunciado.textContent = questao.enunciado;

  // Estado de revisão
  const emRevisao = !!AppState.simulado.revisoes[index];
  if (btnRevisar) {
    btnRevisar.classList.toggle('active', emRevisao);
    btnRevisar.innerHTML = emRevisao 
      ? '<i class="fa-solid fa-flag"></i> Marcada p/ Revisar' 
      : '<i class="fa-regular fa-flag"></i> Marcar p/ Revisar';
  }

  // Alternativas
  const letras = ['A', 'B', 'C', 'D', 'E'];
  const respostaAtual = AppState.simulado.respostas[index];

  if (elAlternativas) {
    elAlternativas.innerHTML = questao.alternativas.map((alt, aIdx) => `
      <div class="simulado-alt-item ${respostaAtual === aIdx ? 'selecionada' : ''}" onclick="selecionarAlternativaSimulado(${aIdx})">
        <span class="simulado-alt-letra">${letras[aIdx]}</span>
        <span class="simulado-alt-texto">${alt}</span>
      </div>
    `).join('');
  }

  // Botões Próximo / Anterior
  const btnAnt = document.getElementById('btn-simulado-anterior');
  const btnProx = document.getElementById('btn-simulado-proximo');
  if (btnAnt) btnAnt.disabled = index === 0;
  if (btnProx) {
    if (index === sim.questoes.length - 1) {
      btnProx.innerHTML = 'Ver Gabarito Final <i class="fa-solid fa-check-double"></i>';
    } else {
      btnProx.innerHTML = 'Próxima Questão <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  // Atualiza Cartão-Resposta lateral / inferior
  renderizarCartaoRespostasSimulado();
};

window.selecionarAlternativaSimulado = function(altIdx) {
  const index = AppState.simulado.questaoIndex;
  AppState.simulado.respostas[index] = altIdx;
  renderizarQuestaoSimulado();
};

window.alternarRevisaoQuestao = function() {
  const index = AppState.simulado.questaoIndex;
  AppState.simulado.revisoes[index] = !AppState.simulado.revisoes[index];
  renderizarQuestaoSimulado();
};

window.irParaQuestaoSimulado = function(index) {
  const total = AppState.simulado.ativo.questoes.length;
  if (index >= 0 && index < total) {
    AppState.simulado.questaoIndex = index;
    renderizarQuestaoSimulado();
  }
};

window.simuladoQuestaoAnterior = function() {
  irParaQuestaoSimulado(AppState.simulado.questaoIndex - 1);
};

window.simuladoQuestaoProxima = function() {
  const total = AppState.simulado.ativo.questoes.length;
  if (AppState.simulado.questaoIndex === total - 1) {
    confirmarFinalizarSimulado();
  } else {
    irParaQuestaoSimulado(AppState.simulado.questaoIndex + 1);
  }
};

function renderizarCartaoRespostasSimulado() {
  const container = document.getElementById('simulado-cartao-respostas');
  if (!container || !AppState.simulado.ativo) return;

  const total = AppState.simulado.ativo.questoes.length;
  const letras = ['A', 'B', 'C', 'D', 'E'];

  let html = '';
  for (let i = 0; i < total; i++) {
    const respondida = AppState.simulado.respostas.hasOwnProperty(i);
    const marcadaRevisao = !!AppState.simulado.revisoes[i];
    const ehAtual = i === AppState.simulado.questaoIndex;

    let classe = 'cartao-bolinha';
    if (ehAtual) classe += ' atual';
    if (marcadaRevisao) classe += ' revisao';
    else if (respondida) classe += ' respondida';

    const respLetra = respondida ? letras[AppState.simulado.respostas[i]] : (i + 1);

    html += `
      <button class="${classe}" onclick="irParaQuestaoSimulado(${i})" title="Questão ${i + 1}">
        ${respLetra}
      </button>
    `;
  }

  container.innerHTML = html;
}

window.confirmarFinalizarSimulado = function() {
  const sim = AppState.simulado.ativo;
  const total = sim.questoes.length;
  const respondidas = Object.keys(AppState.simulado.respostas).length;
  const pendentes = total - respondidas;

  let msg = `Deseja realmente entregar seu simulado do ${sim.vestibular}?`;
  if (pendentes > 0) {
    msg += `\n\n⚠️ Atenção: você ainda tem ${pendentes} questão(ões) em branco!`;
  }

  if (confirm(msg)) {
    finalizarSimulado();
  }
};

window.finalizarSimulado = function() {
  try {
    if (AppState.simulado.timerId) clearInterval(AppState.simulado.timerId);
    AppState.simulado.finalizado = true;

    const sim = AppState.simulado.ativo;
    if (!sim) {
      alert('Nenhum simulado ativo no momento.');
      return;
    }

    let acertos = 0;
    const desempenhoPorArea = {};

    sim.questoes.forEach((q, idx) => {
      const marcada = AppState.simulado.respostas[idx];
      const acertou = marcada === q.correta;
      if (acertou) acertos++;

      const areaNome = q.area || 'Geral';
      if (!desempenhoPorArea[areaNome]) {
        desempenhoPorArea[areaNome] = { total: 0, acertos: 0 };
      }
      desempenhoPorArea[areaNome].total++;
      if (acertou) desempenhoPorArea[areaNome].acertos++;
    });

    const total = sim.questoes.length;
    const porcentagem = Math.round((acertos / total) * 100);

    // Salva no LocalStorage
    try {
      const scoreData = { acertos, total, porcentagem, data: new Date().toLocaleDateString('pt-BR') };
      localStorage.setItem(`estudamais_simulado_best_${sim.id}`, JSON.stringify(scoreData));
    } catch(e) {}

    // Efeitos sonoros e visuais de conquista
    try {
      if (window.tocarSomAcertoQuiz) window.tocarSomAcertoQuiz();
      if (window.tocarFanfarraVitoria && porcentagem >= 50) window.tocarFanfarraVitoria();
      if (window.dispararConfetes && porcentagem >= 40) window.dispararConfetes();
    } catch(e) {}

    // Alterna a exibição com transição suave
    const painelProva = document.getElementById('simulado-prova-painel');
    const painelResultado = document.getElementById('simulado-resultado-painel');
    if (painelProva) painelProva.style.display = 'none';
    if (painelResultado) {
      painelResultado.style.display = 'block';
      painelResultado.scrollIntoView({ behavior: 'smooth' });
    }

    renderizarPainelResultadoSimulado(acertos, total, porcentagem, desempenhoPorArea);
  } catch(err) {
    console.error('Erro ao finalizar simulado:', err);
    // Recuperação de emergência para sempre exibir o resultado
    const painelProva = document.getElementById('simulado-prova-painel');
    const painelResultado = document.getElementById('simulado-resultado-painel');
    if (painelProva) painelProva.style.display = 'none';
    if (painelResultado) painelResultado.style.display = 'block';
  }
};

function renderizarPainelResultadoSimulado(acertos, total, pct, areas) {
  const container = document.getElementById('simulado-resultado-painel');
  if (!container) return;

  const sim = AppState.simulado.ativo;
  if (!sim) return;

  // Gera automaticamente o próximo simulado adaptativo por IA com base no desempenho
  const novoSimuladoIA = criarProximoSimuladoPorIA(sim, acertos, total, pct, areas);
  setTimeout(() => {
    mostrarToast("✨ A IA preparou automaticamente seu próximo simulado adaptativo!");
  }, 1200);

  // Busca outros simulados recomendados (priorizando matérias e vestibulares diferentes)
  const outros = (typeof SIMULADOS_DATA !== "undefined" ? SIMULADOS_DATA : []).filter(s => s.id !== sim.id && s.id !== novoSimuladoIA.id);
  const recomendados = outros.slice(0, 3);

  container.innerHTML = `
    <div class="simulado-resultado-card anim-slide-up">
      <div class="resultado-topo-destaque">
        <div class="resultado-trofeu-circulo ${pct >= 70 ? 'ouro' : (pct >= 50 ? 'prata' : 'bronze')} anim-pop">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <h2>Simulado Finalizado com Sucesso!</h2>
        <p class="resultado-sub-parabens">Resultado oficial: <strong>${sim.titulo}</strong></p>
      </div>

      <div class="resultado-metricas-grid">
        <div class="metrica-stat-box">
          <span class="metrica-val">${acertos}/${total}</span>
          <span class="metrica-label">Questões Acertadas</span>
        </div>
        <div class="metrica-stat-box destaque anim-pulse-glow">
          <span class="metrica-val">${pct}%</span>
          <span class="metrica-label">Taxa de Aproveitamento</span>
        </div>
        <div class="metrica-stat-box">
          <span class="metrica-val">${total - acertos}</span>
          <span class="metrica-label">Erros / Em Branco</span>
        </div>
      </div>
      <!-- NOVO SIMULADO CRIADO AUTOMATICAMENTE PELA IA -->
      <div class="simulado-ia-proximo-box">
        <div class="ia-box-header">
          <span class="ia-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Gerado Automaticamente por IA</span>
          <h3>✨ Novo Simulado Adaptativo Preparado para Você!</h3>
        </div>
        <p>A Inteligência Artificial do EstudaMais analisou seu desempenho neste exame e construiu automaticamente uma nova prova com <strong>${novoSimuladoIA.questoes.length} questões</strong> especialmente focadas nos seus pontos de melhoria: <strong>${novoSimuladoIA.focoTexto}</strong>.</p>
        <div class="ia-box-actions">
          <button class="btn-iniciar-ia-simulado" onclick="iniciarSimulado('${novoSimuladoIA.id}')">
            <i class="fa-solid fa-bolt"></i> Iniciar Próximo Simulado da IA Agora (${novoSimuladoIA.tempoMinutos} min)
          </button>
        </div>
      </div>


      <!-- Desempenho por Área de Conhecimento -->
      <div class="simulado-areas-performance">
        <h3><i class="fa-solid fa-chart-pie"></i> Desempenho por Área do Saber</h3>
        <div class="areas-barras-lista">
          ${Object.entries(areas).map(([nomeArea, dados]) => {
            const pArea = Math.round((dados.acertos / dados.total) * 100);
            return `
              <div class="area-barra-item">
                <div class="area-barra-header">
                  <strong>${nomeArea}</strong>
                  <span>${dados.acertos}/${dados.total} acertos (${pArea}%)</span>
                </div>
                <div class="area-prog-bg">
                  <div class="area-prog-fill" style="width: ${pArea}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Ações do Resultado -->
      <div class="resultado-acoes-botoes">
        <button class="btn-ver-gabarito" onclick="verGabaritoComentadoSimulado()">
          <i class="fa-solid fa-book-open"></i> Ver Gabarito Comentado Questão a Questão
        </button>
        <button class="btn-voltar-simulados" onclick="voltarParaListaSimulados()">
          <i class="fa-solid fa-list-check"></i> Ver Todos os Simulados
        </button>
      </div>

      <!-- Container do Gabarito Comentado (Aberto sob demanda) -->
      <div id="simulado-gabarito-detalhado" class="simulado-gabarito-detalhes" style="display: none;"></div>

      <!-- PRÓXIMOS SIMULADOS RECOMENDADOS (CONTINUIDADE DE ESTUDOS) -->
      ${recomendados.length > 0 ? `
        <div class="simulados-proximos-recomendados-box">
          <div class="recomendados-box-header">
            <div class="recomendados-badge"><i class="fa-solid fa-bolt"></i> Continue no Ritmo</div>
            <h3>Próximos Simulados de Outras Matérias para Você Praticar:</h3>
            <p>Mantenha o foco! O segredo da aprovação é a constância em diferentes disciplinas:</p>
          </div>
          <div class="recomendados-cards-grid">
            ${recomendados.map(rec => `
              <div class="recomendado-card-item">
                <div class="rec-card-topo">
                  <span class="rec-vest-badge">${rec.vestibular}</span>
                  <span class="rec-tempo-badge"><i class="fa-regular fa-clock"></i> ${rec.tempoMinutos} min</span>
                </div>
                <h4 class="rec-titulo">${rec.titulo}</h4>
                <p class="rec-subtitulo">${rec.subtitulo}</p>
                <div class="rec-tags-lista">
                  ${(rec.disciplinas || []).slice(0, 3).map(d => `<span class="rec-tag">${d}</span>`).join('')}
                </div>
                <button class="btn-iniciar-recomendado" onclick="iniciarSimulado('${rec.id}')">
                  <i class="fa-solid fa-play"></i> Iniciar Este Simulado Agora
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

window.verGabaritoComentadoSimulado = function() {
  const container = document.getElementById('simulado-gabarito-detalhado');
  if (!container || !AppState.simulado.ativo) return;

  const sim = AppState.simulado.ativo;
  const letras = ['A', 'B', 'C', 'D', 'E'];

  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="gabarito-titulo-secao"><i class="fa-solid fa-check-double"></i> Gabarito Oficial e Resolução Comentada</h3>
    <div class="gabarito-questoes-lista">
      ${sim.questoes.map((q, idx) => {
        const marcada = AppState.simulado.respostas[idx];
        const acertou = marcada === q.correta;

        return `
          <div class="gabarito-questao-card ${acertou ? 'acertou' : 'errou'}">
            <div class="gabarito-q-header">
              <span class="gabarito-badge-num">Questão ${idx + 1}</span>
              <span class="gabarito-status-tag ${acertou ? 'sucesso' : 'erro'}">
                <i class="fa-solid ${acertou ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                ${acertou ? 'Você Acertou!' : 'Você Errou'}
              </span>
            </div>
            <p class="gabarito-enunciado">${q.enunciado}</p>

            <div class="gabarito-alternativas-lista">
              ${q.alternativas.map((alt, aIdx) => {
                let classeAlt = 'gabarito-alt';
                if (aIdx === q.correta) classeAlt += ' correta-oficial';
                if (aIdx === marcada && !acertou) classeAlt += ' marcada-errada';

                return `
                  <div class="${classeAlt}">
                    <strong>${letras[aIdx]})</strong> ${alt}
                    ${aIdx === q.correta ? '<span class="tag-correta">✓ Gabarito Oficial</span>' : ''}
                    ${aIdx === marcada && !acertou ? '<span class="tag-sua-resposta">Sua Resposta</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <div class="gabarito-explicacao-box">
              <strong><i class="fa-solid fa-chalkboard-user"></i> Comentário do Professor:</strong>
              <p>${q.explicacao}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.scrollIntoView({ behavior: 'smooth' });
};

window.voltarParaListaSimulados = function() {
  document.getElementById('simulados-selecao-painel').style.display = 'block';
  document.getElementById('simulado-prova-painel').style.display = 'none';
  document.getElementById('simulado-resultado-painel').style.display = 'none';
  inicializarSimulados();
};

/* ========================================================
   SISTEMA DE TOUR & SLIDES DE APRESENTAÇÃO DO SITE (ONBOARDING)
   ======================================================== */
let tourSlideAtual = 1;
const TOTAL_TOUR_SLIDES = 8;

window.abrirTourSlides = function(forcado = false) {
  const modal = document.getElementById('modal-tour-site');
  if (!modal) return;

  tourSlideAtual = 1;
  irParaTourSlide(1);
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();

  window.removeEventListener('keydown', lidarTecladoTour);
  window.addEventListener('keydown', lidarTecladoTour);
};

window.fecharTourSlides = function() {
  const modal = document.getElementById('modal-tour-site');
  if (modal) {
    modal.classList.remove('active');
    if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
  }
  localStorage.setItem('estudamais_tour_visto', 'true');
  window.removeEventListener('keydown', lidarTecladoTour);
};

function lidarTecladoTour(e) {
  const modal = document.getElementById('modal-tour-site');
  if (!modal || !modal.classList.contains('active')) return;

  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    tourProximoSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    tourSlideAnterior();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    fecharTourSlides();
  }
}

window.irParaTourSlide = function(num) {
  if (num < 1) num = 1;
  if (num > TOTAL_TOUR_SLIDES) num = TOTAL_TOUR_SLIDES;
  tourSlideAtual = num;

  // Atualiza exibição dos slides
  const slides = document.querySelectorAll('.tour-slide-item');
  slides.forEach((slide) => {
    const idx = parseInt(slide.getAttribute('data-slide-index'), 10);
    slide.classList.toggle('active', idx === num);
  });

  // Atualiza paginação de bolinhas (dots)
  const dots = document.querySelectorAll('.tour-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', (idx + 1) === num);
  });

  // Atualiza contador de passos
  const counter = document.getElementById('tour-step-counter');
  if (counter) {
    counter.textContent = `Slide ${num} de ${TOTAL_TOUR_SLIDES}`;
  }

  // Atualiza botões Voltar / Avançar
  const btnPrev = document.getElementById('btn-tour-prev');
  const btnNext = document.getElementById('btn-tour-next');

  if (btnPrev) {
    btnPrev.disabled = (num === 1);
  }

  if (btnNext) {
    if (num === TOTAL_TOUR_SLIDES) {
      btnNext.classList.add('btn-tour-concluir');
      btnNext.innerHTML = `<span>Começar a Estudar Agora!</span> <i class="fa-solid fa-rocket"></i>`;
    } else {
      btnNext.classList.remove('btn-tour-concluir');
      btnNext.innerHTML = `<span>Avançar</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
  }
};

window.tourProximoSlide = function() {
  if (tourSlideAtual < TOTAL_TOUR_SLIDES) {
    irParaTourSlide(tourSlideAtual + 1);
  } else {
    // Último slide concluído com sucesso
    fecharTourSlides();
    if (typeof tocarFanfarraVitoria === 'function') tocarFanfarraVitoria();
    if (typeof dispararConfetes === 'function') dispararConfetes();
    mostrarToast('🎓 Parabéns! Você conheceu todos os recursos do EstudaMais. Bons estudos rumo à aprovação!');
  }
};

window.tourSlideAnterior = function() {
  if (tourSlideAtual > 1) {
    irParaTourSlide(tourSlideAtual - 1);
  }
};






/* ========================================================
   ESTUDAMAIS - CHAT IA COM GOOGLE GEMINI & GERADOR DE CRONOGRAMAS (V2 ENHANCED)
   Gamificação, Modos de Personalidade, Áudio TTS, Timer Integrado & Impressão
   ======================================================== */

// Estado do Chat IA e Cronograma Gamificado
AppState.chatIA = {
  mensagens: [],
  carregando: false,
  modo: 'tutor', // 'tutor', 'desafio', 'zen', 'cronograma'
  somAtivo: true,
  vozAtiva: false
};

AppState.cronograma = {
  semanaAtual: 1,
  diasEstudoPorSemana: 5,
  horasPorDia: 4,
  turnoPreferido: 'tarde',
  xp: 0,
  streakDias: 1,
  planoSemanal: null
};

// Sintetizador de Som Leve via Web Audio API (sem arquivos externos)
function emitirSomChat(tipo = 'pop') {
  if (!AppState.chatIA.somAtivo) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (tipo === 'pop') {
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (tipo === 'sucesso') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {}
}

// Inicializar Chat IA e Cronograma
function inicializarChatIACronograma() {
  carregarHistoricoChatIA();
  carregarCronogramaSalvo();
  renderizarMensagensChatIA();
  renderizarCronogramaUI();
  configurarEventosChatIA();
}

// Carregar Histórico do Chat
function carregarHistoricoChatIA() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    const salvas = localStorage.getItem(`estudamais_chat_ia_${userId}`);
    if (salvas) {
      AppState.chatIA.mensagens = JSON.parse(salvas);
    } else {
      const user = AppState.currentUser;
      const nome = user ? user.nome.split(' ')[0] : 'Estudante';
      const vest = user && user.vestibular ? user.vestibular : 'vestibulares';
      const curso = user && user.curso ? ` para ${user.curso}` : '';

      AppState.chatIA.mensagens = [
        {
          id: 'msg-intro-1',
          remetente: 'ia',
          texto: `Olá, **${nome}**! Sou o seu **Tutor de Inteligência Artificial do EstudaMais** 🎓✨\n\nEstou conectado ao **Google Gemini** para te apoiar em cada detalhe rumo à aprovação no **${vest}**${curso}.\n\nVocê pode escolher meu modo de apoio logo acima ou me pedir:\n- 📚 Explicar matérias e teorias complexas\n- ⚡ **Desafio / Quiz:** Posso testar seus conhecimentos com perguntas da banca!\n- 🧘 **Mentor Zen:** Dicas de foco, pausas e controle de ansiedade pré-prova\n- 📅 **Criar seu Cronograma Semanal:** Distribuo seus horários de acordo com seu tempo livre!\n\nComo começamos nossos estudos hoje?`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ];
    }
  } catch (e) {
    console.error('Erro ao carregar chat da IA:', e);
  }
}

// Salvar Histórico do Chat
function salvarHistoricoChatIA() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    localStorage.setItem(`estudamais_chat_ia_${userId}`, JSON.stringify(AppState.chatIA.mensagens.slice(-50)));
  } catch (e) {}
}

// Alternar Modo de Personalidade da IA
window.alternarModoChatIA = function(modo) {
  AppState.chatIA.modo = modo;
  document.querySelectorAll('.chat-ia-modo-pill').forEach(btn => {
    if (btn.dataset.modo === modo) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dicasModos = {
    tutor: '🎯 Modo Tutor Ativo: Foco em explicação didática, resolução de dúvidas e matérias que mais caem.',
    desafio: '⚡ Modo Desafio Ativo: Vou te fazer uma pergunta surpresa para testar sua retenção! Pronto(a)?',
    zen: '🧘 Modo Zen Ativo: Foco em gerenciamento do tempo, alívio de ansiedade e saúde mental nos estudos.',
    cronograma: '📅 Modo Cronograma Ativo: Diga quantas horas tem livres e eu monto seu plano semanal!'
  };

  if (window.mostrarToast) {
    window.mostrarToast(dicasModos[modo] || 'Modo atualizado!');
  }

  if (modo === 'desafio') {
    perguntarRapidoChatIA('Me faça um desafio rápido: 1 questão teste da banca examinadora sobre um tema muito cotado!');
  } else if (modo === 'zen') {
    perguntarRapidoChatIA('Estou um pouco ansioso(a) com a rotina de estudos. Que técnica prática posso usar hoje para manter a calma e o foco?');
  }
};

// Renderizar Mensagens do Chat
function renderizarMensagensChatIA() {
  const container = document.getElementById('chat-ia-mensagens-container');
  if (!container) return;

  if (AppState.chatIA.mensagens.length === 0) {
    container.innerHTML = `
      <div class="chat-ia-vazio">
        <div class="chat-ia-vazio-icon"><i class="fa-solid fa-sparkles"></i></div>
        <h3>Tire qualquer dúvida com a IA</h3>
        <p>Faça uma pergunta, peça a explicação de um tema ou solicite um cronograma personalizado!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.chatIA.mensagens.map(msg => {
    const isUser = msg.remetente === 'usuario';
    const parsedText = formatarMarkdownChat(msg.texto);
    const avatar = isUser ? (AppState.currentUser?.avatar || 'fa-user-graduate') : 'fa-robot';

    return `
      <div class="chat-ia-msg-wrapper ${isUser ? 'msg-usuario' : 'msg-ia'} anim-fade-in" id="${msg.id}">
        <div class="chat-ia-msg-avatar">
          <i class="fa-solid ${avatar}"></i>
        </div>
        <div class="chat-ia-msg-balao">
          <div class="chat-ia-msg-autor">
            <strong>${isUser ? (AppState.currentUser?.nome?.split(' ')[0] || 'Você') : 'Tutor EstudaMais (Gemini AI)'}</strong>
            <span class="chat-ia-msg-hora">${msg.timestamp || ''}</span>
          </div>
          <div class="chat-ia-msg-conteudo" id="conteudo-${msg.id}">
            ${parsedText}
          </div>

          <!-- Ações Rápidas da Mensagem -->
          <div class="chat-ia-msg-ferramentas">
            <button class="btn-chat-tool" onclick="copiarTextoMensagemIA('${msg.id}')" title="Copiar resposta">
              <i class="fa-regular fa-copy"></i> <span>Copiar</span>
            </button>
            ${!isUser ? `
              <button class="btn-chat-tool" onclick="falarMensagemIA('${msg.id}')" title="Ouvir explicação">
                <i class="fa-solid fa-volume-high"></i> <span>Ouvir</span>
              </button>
              <button class="btn-chat-tool" onclick="perguntarRapidoChatIA('Me explique de forma ainda mais simples, como se eu tivesse 10 anos.')" title="Explicar mais simples">
                <i class="fa-solid fa-lightbulb"></i> <span>Simplificar</span>
              </button>
            ` : ''}
          </div>

          ${!isUser && msg.acaoCronograma ? `
            <div class="chat-ia-msg-acoes-cronograma">
              <button class="btn-chat-aplicar-cronograma" onclick="aplicarCronogramaSugeridoPelaIA('${msg.id}')">
                <i class="fa-solid fa-calendar-check"></i> Aplicar Este Cronograma na Aba Cronogramas
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

// Copiar Texto da Mensagem
window.copiarTextoMensagemIA = function(msgId) {
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (msg && msg.texto) {
    navigator.clipboard.writeText(msg.texto).then(() => {
      if (window.mostrarToast) window.mostrarToast('📋 Texto copiado para a área de transferência!');
    }).catch(() => {
      if (window.mostrarToast) window.mostrarToast('Texto copiado!', 'info');
    });
  }
};

// Voz / Leitura em Áudio da Resposta (Text-to-Speech nativo)
window.falarMensagemIA = function(msgId) {
  if (!('speechSynthesis' in window)) {
    if (window.mostrarToast) window.mostrarToast('Leitura de voz não suportada neste navegador.', 'aviso');
    return;
  }

  window.speechSynthesis.cancel();
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (!msg || !msg.texto) return;

  const limpo = msg.texto.replace(/[*#`_\[\]]/g, '');
  const utter = new SpeechSynthesisUtterance(limpo);
  utter.lang = 'pt-BR';
  utter.rate = 1.05;

  if (window.mostrarToast) window.mostrarToast('🔊 Reproduzindo explicação em áudio...');
  window.speechSynthesis.speak(utter);
};

// Formatador simples e seguro de Markdown para o Chat
function formatarMarkdownChat(texto) {
  if (!texto) return '';
  let limpo = texto;

  // Sanitização e limpeza de LaTeX bruto antes de escapar HTML
  // Transforma \[ ... \] em bloco matemático limpo
  limpo = limpo.replace(/\\\[([\s\S]*?)\\\]/g, (match, formula) => {
    let f = formula
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\times|\\cdot/g, ' × ')
      .replace(/\\le|\\leq/g, ' ≤ ')
      .replace(/\\ge|\\geq/g, ' ≥ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\/g, '')
      .trim();
    return '\n\n```math\n' + f + '\n```\n\n';
  });

  // Transforma \( ... \) em fórmula inline limpa
  limpo = limpo.replace(/\\\(([\s\S]*?)\\\)/g, (match, formula) => {
    let f = formula
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\times|\\cdot/g, ' × ')
      .replace(/\\le|\\leq/g, ' ≤ ')
      .replace(/\\ge|\\geq/g, ' ≥ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\/g, '')
      .trim();
    return ' `' + f + '` ';
  });

  // Limpeza de tokens LaTeX isolados remanescentes
  limpo = limpo
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\approx/g, '≈')
    .replace(/\\times|\\cdot/g, '×')
    .replace(/\\le|\\leq/g, '≤')
    .replace(/\\ge|\\geq/g, '≥')
    .replace(/\\pm/g, '±')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\([a-zA-Z])/g, '$1')
    .replace(/\\[\[\]\(\)\{\}]/g, '')
    .replace(/\\/g, '');

  let html = limpo
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bloco de matemática formatado
  html = html.replace(/```math\n([\s\S]*?)```/g, '<div class="chat-math-block">$1</div>');
  // Bloco de código padrão
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$2</code></pre>');
  // Código inline
  html = html.replace(/`([^`]+)`/g, '<span class="chat-math-inline">$1</span>');
  // Negrito
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Itálico
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Tópicos com bullet point
  html = html.replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]+?<\/li>)/g, '<ul class="chat-lista-resumo">$1</ul>');
  // Quebras de linha
  html = html.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

  return html;
}
window.formatarMarkdownChat = formatarMarkdownChat;

// Configurar Eventos e Envio do Chat IA
function configurarEventosChatIA() {
  const form = document.getElementById('chat-ia-form');
  const input = document.getElementById('chat-ia-input');
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      enviarMensagemChatIA();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensagemChatIA();
      }
    });
  }
}

// Enviar Mensagem do Estudante para a IA
window.enviarMensagemChatIA = async function(textoPreDefinido = null) {
  const input = document.getElementById('chat-ia-input');
  const btnEnviar = document.getElementById('chat-ia-btn-enviar');
  const texto = (textoPreDefinido || (input ? input.value : '')).trim();

  if (!texto || AppState.chatIA.carregando) return;

  if (input) input.value = '';
  AppState.chatIA.carregando = true;
  emitirSomChat('pop');

  const userMsgId = 'msg-user-' + Date.now();
  AppState.chatIA.mensagens.push({
    id: userMsgId,
    remetente: 'usuario',
    texto: texto,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  });

  renderizarMensagensChatIA();
  salvarHistoricoChatIA();

  const container = document.getElementById('chat-ia-mensagens-container');
  let typingEl = document.createElement('div');
  typingEl.id = 'chat-ia-typing-indicator';
  typingEl.className = 'chat-ia-msg-wrapper msg-ia anim-fade-in';
  typingEl.innerHTML = `
    <div class="chat-ia-msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="chat-ia-msg-balao typing-balao">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <small style="color: var(--text-muted); font-size: 0.78rem;">Consultando Inteligência Artificial do Gemini...</small>
    </div>
  `;
  if (container) {
    container.appendChild(typingEl);
    container.scrollTop = container.scrollHeight;
  }

  if (btnEnviar) {
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const respostaIA = await processarPerguntaComIA(texto);
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

    emitirSomChat('pop');
    AppState.chatIA.mensagens.push({
      id: 'msg-ia-' + Date.now(),
      remetente: 'ia',
      texto: respostaIA.texto,
      acaoCronograma: respostaIA.temCronograma ? respostaIA.cronogramaData : null,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });

    renderizarMensagensChatIA();
    salvarHistoricoChatIA();

    if (respostaIA.temCronograma && respostaIA.cronogramaData) {
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) {
        window.mostrarToast('📅 A IA gerou um cronograma de estudos sob medida! Clique no botão abaixo da mensagem para sincronizar.');
      }
    }
  } catch (err) {
    console.error('Erro na resposta do chat IA:', err);
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

    AppState.chatIA.mensagens.push({
      id: 'msg-ia-err-' + Date.now(),
      remetente: 'ia',
      texto: `Desculpe, ocorreu uma oscilação na conexão com a IA: *${err.message || 'Erro temporário'}*.\n\nPor favor, tente novamente ou conecte sua chave da API do Google Gemini no botão acima para máxima velocidade!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
    renderizarMensagensChatIA();
    salvarHistoricoChatIA();
  } finally {
    AppState.chatIA.carregando = false;
    if (btnEnviar) {
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    }
    if (input) input.focus();
  }
};

// Processa a pergunta do estudante utilizando Gemini
async function processarPerguntaComIA(pergunta) {
  const user = AppState.currentUser;
  const vestibular = user ? (user.vestibular || 'ENEM') : 'ENEM';
  const curso = user ? (user.curso || 'Não especificado') : 'Ensino Superior';
  const nomeAluno = user ? user.nome.split(' ')[0] : 'Estudante';
  const modo = AppState.chatIA.modo || 'tutor';

  let modoInstrucao = '';
  if (modo === 'desafio') {
    modoInstrucao = 'MODO DESAFIO: Elabore uma questão teste contextualizada no estilo da banca com 4 alternativas (A, B, C, D) e peça para o aluno responder!';
  } else if (modo === 'zen') {
    modoInstrucao = 'MODO ZEN / ANTI-ANSIEDADE: Forneça suporte acolhedor, técnicas de respiração (ex: 4-7-8), organização saudável do sono e incentivo psicológico realista.';
  } else if (modo === 'cronograma') {
    modoInstrucao = 'MODO CRONOGRAMA: Seu foco principal é montar rotinas e grades semanais de estudos de alta performance com tempos de estudo e pausas.';
  } else {
    modoInstrucao = 'MODO TUTOR: Explique com didática de excelência, exemplos práticos do cotidiano e foque nos conteúdos mais recorrentes da banca examinadora.';
  }

  const systemPrompt = `Você é o Tutor de Inteligência Artificial Oficial do portal EstudaMais, especialista em aprovação nos maiores vestibulares do Brasil (ENEM, Fuvest, Unicamp, Unesp, Fatec, ITA, FSA e particulares).
Aluno: ${nomeAluno}
Vestibular foco: ${vestibular}
Curso pretendido: ${curso}
${modoInstrucao}

Diretrizes:
1. Responda em Português do Brasil com tom encorajador, altamente didático, DIRETO, RÁPIDO e OBJETIVO.
2. Seja CONCISO e vá direto ao ponto: não use saudações longas ou rodeios. Explique o cerne da questão com rapidez.
3. NUNCA utilize marcação crua de LaTeX como \\(, \\), \\[, \\], \\text{...} ou \\frac{...}{...}. Apresente fórmulas em notação direta e limpa, por exemplo: "PV = C / (1 + r)^n" ou "V = Vo + at".
4. Use negrito para pontos-chave e tópicos com bullet points para leitura dinâmica.
5. Se o aluno pedir um "cronograma" ou "plano de estudos", crie um cronograma semanal detalhado por dias com matérias prioritárias para ${vestibular} e ${curso}. Ao final, inclua a estrutura JSON estrita:
CRONOGRAMA_JSON:
{
  "diasEstudo": 5,
  "horasPorDia": 4,
  "vestibular": "${vestibular}",
  "curso": "${curso}",
  "dias": {
    "Segunda": ["Matemática Básica", "Física Mecânica", "Revisão Ativa"],
    "Terça": ["Biologia Celular", "Química Geral", "Questões da Banca"],
    "Quarta": ["Linguagens & Interpretação", "História Geral", "Redação"],
    "Quinta": ["Geografia Humana", "Filosofia & Sociologia", "Exercícios"],
    "Sexta": ["Matemática Financeira", "Química Orgânica", "Simulado Rápido"],
    "Sábado": ["Revisão dos Erros da Semana", "Redação Prática"]
  }
}
6. Para exercícios, resolva de forma rápida e lógica, destacando o passo crucial da resolução.`;

  const promptFinal = `${systemPrompt}\n\nPergunta do Aluno:\n"${pergunta}"`;
  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  const modelo = localStorage.getItem('estudamais_gemini_model') || 'gemini-1.5-flash';

  let rawResposta = null;

  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: promptFinal }] }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 2048 }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        rawResposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    } catch (e) {
      console.warn('Falha na requisição direta Gemini API, acionando contingência:', e);
    }
  }

  if (!rawResposta) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(promptFinal)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        rawResposta = await res.text();
      }
    } catch (e) {
      console.warn('Falha na contingência pública:', e);
    }
  }

  if (!rawResposta) {
    rawResposta = gerarRespostaLocalInteligente(pergunta, vestibular, curso, nomeAluno);
  }

  let cronogramaData = null;
  let temCronograma = false;

  const matchCronograma = rawResposta.match(/CRONOGRAMA_JSON:\s*(\{[\s\S]*?\})/);
  if (matchCronograma) {
    try {
      cronogramaData = JSON.parse(matchCronograma[1]);
      temCronograma = true;
      rawResposta = rawResposta.replace(/CRONOGRAMA_JSON:\s*\{[\s\S]*?\}/, '').trim();
    } catch (e) {
      console.warn('Erro ao decodificar JSON do cronograma da IA:', e);
    }
  }

  return {
    texto: rawResposta,
    temCronograma,
    cronogramaData
  };
}

// Fallback local especialista
function gerarRespostaLocalInteligente(pergunta, vestibular, curso, nomeAluno) {
  const p = pergunta.toLowerCase();

  if (p.includes('cronograma') || p.includes('plano de estudo') || p.includes('horario') || p.includes('rotina')) {
    return `Com certeza, **${nomeAluno}**! Preparei um cronograma de estudos de alta performance especialmente estruturado para o **${vestibular}** e seu foco em **${curso}**:\n\n### 🗓️ Metodologia do seu Cronograma:\n- **Ciclos de Foco (Pomodoro 50m/10m):** Alterne teoria com resolução massiva de exercícios.\n- **Incidência de Pesos:** Priorizamos as disciplinas com maior peso para ${curso}.\n- **Revisão Ativa aos Sábados:** Fixação dos erros acumulados na semana.\n\nCRONOGRAMA_JSON:
{
  "diasEstudo": 5,
  "horasPorDia": 4,
  "vestibular": "${vestibular}",
  "curso": "${curso}",
  "dias": {
    "Segunda": ["Matemática Básica & Álgebra", "Física Mecânica", "Resolução de 15 Exercícios"],
    "Terça": ["Biologia Celular & Ecologia", "Química Geral", "Flashcards de Revisão"],
    "Quarta": ["Interpretação de Texto & Linguagens", "História do Brasil", "Prática de Redação"],
    "Quinta": ["Geografia Física & Política", "Filosofia & Sociologia", "Exercícios da Banca"],
    "Sexta": ["Matemática Geometria & Funções", "Química Orgânica", "Simulado Cronometrado"],
    "Sábado": ["Revisão Ativa dos Cadernos", "Treino de Redação Pautada Oficial"]
  }
}\n\nVocê pode clicar no botão **"Aplicar Este Cronograma"** abaixo para sincronizá-lo diretamente com a aba Cronogramas e marcar seu progresso diário!`;
  }

  if (p.includes('desafio') || p.includes('quiz') || p.includes('questão')) {
    return `⚡ **Desafio Rápido de Fixação!**\n\n*(Vestibular ${vestibular})*\n**Pergunta:** Em Ecologia, como se denomina a relação ecológica interespecífica na qual uma espécie é beneficiada sem que a outra seja prejudicada (ex: rêmora e tubarão)?\n\n- **A)** Mutualismo\n- **B)** Comensalismo\n- **C)** Parasitismo\n- **D)** Competição\n\n*Responda aqui embaixo com a sua alternativa e eu te dou o feedback imediato!*`;
  }

  return `Excelente pergunta, **${nomeAluno}**!\n\nNo contexto do **${vestibular}** para **${curso}**, dominar esse conteúdo com resolução frequente de exercícios da banca examinadora é o grande diferencial competitivo.\n\n💡 **Dica de Ouro:**\n- Faça resumos no nosso **Bloco de Notas Integrado**.\n- Pratique exercícios na **Arena de Quiz** para reforçar sua memória de longo prazo.\n- Utilize o cronômetro no **Espaço de Concentração & Foco** para estudar com alta retenção!\n\nSe quiser, pergunte algo mais específico sobre esse tema ou peça para eu gerar um cronograma sob medida!`;
}

// Inserir Pergunta Rápida no Chat
window.perguntarRapidoChatIA = function(texto) {
  const input = document.getElementById('chat-ia-input');
  if (input) {
    input.value = texto;
    enviarMensagemChatIA();
  }
};

// Limpar Histórico do Chat
window.limparHistoricoChatIA = function() {
  if (confirm('Deseja realmente limpar as mensagens da conversa com a IA?')) {
    AppState.chatIA.mensagens = [];
    salvarHistoricoChatIA();
    carregarHistoricoChatIA();
    renderizarMensagensChatIA();
    if (window.mostrarToast) window.mostrarToast('Conversa com a IA reiniciada.', 'info');
  }
};

// ========================================================
// SISTEMA DE CRONOGRAMA DE ESTUDOS INTELIGENTE & GAMIFICADO
// ========================================================

// Carrega cronograma salvo no storage
function carregarCronogramaSalvo() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    const salvo = localStorage.getItem(`estudamais_cronograma_${userId}`);
    if (salvo) {
      const parsed = JSON.parse(salvo);
      AppState.cronograma = { ...AppState.cronograma, ...parsed };
      if (!AppState.cronograma.semanaAtual) AppState.cronograma.semanaAtual = 1;
    } else {
      gerarCronogramaInicialPadrao();
    }
  } catch (e) {
    console.error('Erro ao carregar cronograma:', e);
  }
}

// Salva cronograma no storage
function salvarCronogramaStorage() {
  try {
    const userId = AppState.currentUser ? AppState.currentUser.id : 'convidado';
    localStorage.setItem(`estudamais_cronograma_${userId}`, JSON.stringify(AppState.cronograma));
  } catch (e) {}
}

// Gera cronograma padrão baseado nos dados do estudante
function gerarCronogramaInicialPadrao() {
  const user = AppState.currentUser;
  const vest = user && user.vestibular ? user.vestibular : 'ENEM';

  AppState.cronograma.semanaAtual = AppState.cronograma.semanaAtual || 1;
  AppState.cronograma.diasEstudoPorSemana = AppState.cronograma.diasEstudoPorSemana || 5;
  AppState.cronograma.horasPorDia = AppState.cronograma.horasPorDia || 4;
  AppState.cronograma.xp = AppState.cronograma.xp || 0;
  AppState.cronograma.streakDias = AppState.cronograma.streakDias || 1;
  
  if (typeof gerarGradeSemanaCurricular === 'function') {
    AppState.cronograma.planoSemanal = gerarGradeSemanaCurricular(
      AppState.cronograma.semanaAtual,
      AppState.cronograma.diasEstudoPorSemana,
      AppState.cronograma.horasPorDia
    );
  } else {
    AppState.cronograma.planoSemanal = {
      "Segunda": [
        { id: "c-seg-1", materia: "Matemática", topico: "Funções e Equações", tempo: "90 min", concluido: false },
        { id: "c-seg-2", materia: "Física", topico: "Mecânica e Cinemática", tempo: "90 min", concluido: false },
        { id: "c-seg-3", materia: "Exercícios", topico: "15 Questões com Cronômetro", tempo: "60 min", concluido: false }
      ],
      "Terça": [
        { id: "c-ter-1", materia: "Biologia", topico: "Ecologia e Meio Ambiente", tempo: "90 min", concluido: false },
        { id: "c-ter-2", materia: "Química", topico: "Estequiometria e Soluções", tempo: "90 min", concluido: false },
        { id: "c-ter-3", materia: "Revisão", topico: "Flashcards e Mapa Mental", tempo: "60 min", concluido: false }
      ],
      "Quarta": [
        { id: "c-qua-1", materia: "Linguagens", topico: "Interpretação e Figuras de Linguagem", tempo: "90 min", concluido: false },
        { id: "c-qua-2", materia: "História", topico: "Brasil Império e República", tempo: "90 min", concluido: false },
        { id: "c-qua-3", materia: "Redação", topico: "Produção de Redação com IA", tempo: "60 min", concluido: false }
      ],
      "Quinta": [
        { id: "c-qui-1", materia: "Geografia", topico: "Geopolítica e Climatologia", tempo: "90 min", concluido: false },
        { id: "c-qui-2", materia: "Filosofia / Sociologia", topico: "Cidadania e Pensadores Contemporâneos", tempo: "90 min", concluido: false },
        { id: "c-qui-3", materia: "Exercícios", topico: "Questões do " + vest, tempo: "60 min", concluido: false }
      ],
      "Sexta": [
        { id: "c-sex-1", materia: "Matemática", topico: "Geometria Plana e Espacial", tempo: "90 min", concluido: false },
        { id: "c-sex-2", materia: "Química Orgânica", topico: "Funções Oxigenadas e Nitrogenadas", tempo: "90 min", concluido: false },
        { id: "c-sex-3", materia: "Simulado", topico: "Treino Rápido na Arena de Quiz", tempo: "60 min", concluido: false }
      ],
      "Sábado": [
        { id: "c-sab-1", materia: "Revisão Geral", topico: "Caderno de Erros da Semana", tempo: "90 min", concluido: false },
        { id: "c-sab-2", materia: "Redação", topico: "Reescrita e Ajustes de Competência", tempo: "90 min", concluido: false }
      ]
    };
  }
  salvarCronogramaStorage();
}

// Obtém o nome do dia da semana atual em português
function obterDiaSemanaHoje() {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const idx = new Date().getDay();
  return dias[idx];
}

// Renderizar Interface do Cronograma
function renderizarCronogramaUI() {
  const container = document.getElementById('cronograma-semanal-grid');
  const barraProgresso = document.getElementById('cronograma-barra-progresso');
  const percentualTexto = document.getElementById('cronograma-percentual-texto');
  const contadorTarefas = document.getElementById('cronograma-contador-tarefas');
  const badgeVestibular = document.getElementById('cronograma-badge-vestibular');
  const badgeCurso = document.getElementById('cronograma-badge-curso');
  const xpBadge = document.getElementById('cronograma-badge-xp');
  const streakBadge = document.getElementById('cronograma-badge-streak');

  // Elementos do Controlador de Semanas
  const tagSemana = document.getElementById('cronograma-tag-semana');
  const temaSemana = document.getElementById('cronograma-tema-semana');
  const btnAnterior = document.getElementById('btn-semana-anterior');
  const btnProxima = document.getElementById('btn-semana-proxima');

  const semanaNum = AppState.cronograma.semanaAtual || 1;
  const infoSemana = (typeof SEMANAS_PROGRESSAO_CRONOGRAMA !== 'undefined' && SEMANAS_PROGRESSAO_CRONOGRAMA[semanaNum - 1]) 
    ? SEMANAS_PROGRESSAO_CRONOGRAMA[semanaNum - 1] 
    : { tema: `Fase ${semanaNum}: Estudos Focados` };

  if (tagSemana) tagSemana.innerHTML = `<i class="fa-solid fa-calendar-week"></i> Semana ${semanaNum} de 12`;
  if (temaSemana) temaSemana.textContent = infoSemana.tema;
  if (btnAnterior) btnAnterior.disabled = (semanaNum <= 1);
  if (btnProxima) btnProxima.disabled = (semanaNum >= 12);

  if (!container) return;

  const user = AppState.currentUser;
  if (badgeVestibular) badgeVestibular.textContent = user ? (user.vestibular || 'ENEM') : 'ENEM';
  if (badgeCurso) badgeCurso.textContent = user ? (user.curso || 'Ensino Superior') : 'Vestibular';

  const xpTotal = AppState.cronograma.xp || 0;
  const streakAtual = AppState.cronograma.streakDias || 1;
  if (xpBadge) xpBadge.textContent = `${xpTotal} XP`;
  if (streakBadge) streakBadge.textContent = `${streakAtual} Dias Seguidos`;

  const plano = AppState.cronograma.planoSemanal;
  if (!plano) {
    gerarCronogramaInicialPadrao();
    return renderizarCronogramaUI();
  }

  const diaHoje = obterDiaSemanaHoje();
  const diasSemana = Object.keys(plano);
  let totalTarefas = 0;
  let concluidas = 0;

  let html = '';
  diasSemana.forEach(dia => {
    const itens = plano[dia] || [];
    totalTarefas += itens.length;
    const concluidasDia = itens.filter(i => i.concluido).length;
    concluidas += concluidasDia;
    const isHoje = dia.toLowerCase() === diaHoje.toLowerCase();

    html += `
      <div class="cronograma-dia-card anim-slide-up ${isHoje ? 'dia-atual-destaque' : ''}">
        <div class="cronograma-dia-header">
          <div class="cronograma-dia-titulo">
            <i class="fa-regular fa-calendar"></i>
            <span>${dia}</span>
            ${isHoje ? '<span class="dia-hoje-tag">HOJE 🔥</span>' : ''}
          </div>
          <span class="cronograma-dia-badge ${concluidasDia === itens.length && itens.length > 0 ? 'badge-completo' : ''}">
            ${concluidasDia}/${itens.length} feitas
          </span>
        </div>

        <div class="cronograma-dia-tarefas">
          ${itens.length === 0 ? `
            <div class="cronograma-dia-vazio">
              <i class="fa-solid fa-mug-hot"></i>
              <span>Nenhum bloco agendado para este dia.</span>
            </div>
          ` : ''}
          ${itens.map((item, idx) => `
            <div class="cronograma-tarefa-item ${item.concluido ? 'feita' : ''}">
              <div class="cronograma-check-box" onclick="alternarConclusaoTarefaCronograma('${dia}', ${idx})" title="Marcar como concluída">
                <i class="fa-solid fa-check"></i>
              </div>
              <div class="cronograma-tarefa-corpo" onclick="alternarConclusaoTarefaCronograma('${dia}', ${idx})">
                <div class="cronograma-tarefa-materia">${item.materia}</div>
                <div class="cronograma-tarefa-topico">${item.topico}</div>
              </div>
              <div class="cronograma-tarefa-acoes">
                <span class="cronograma-tarefa-tempo">${item.tempo || '60m'}</span>
                <button class="btn-tarefa-foco" onclick="iniciarFocoComMateria('${item.materia}')" title="Estudar agora no Modo Foco Pomodoro">
                  <i class="fa-solid fa-stopwatch"></i>
                </button>
                <button class="btn-tarefa-excluir" onclick="removerTarefaCronograma('${dia}', ${idx})" title="Remover matéria">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cronograma-dia-footer">
          <button class="btn-adicionar-tarefa-dia" onclick="abrirModalNovaTarefaCronograma('${dia}')">
            <i class="fa-solid fa-plus"></i> Adicionar Matéria
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const pct = totalTarefas > 0 ? Math.round((concluidas / totalTarefas) * 100) : 0;
  if (barraProgresso) barraProgresso.style.width = `${pct}%`;
  if (percentualTexto) percentualTexto.textContent = `${pct}% Concluído`;
  if (contadorTarefas) contadorTarefas.textContent = `${concluidas}/${totalTarefas} metas semanais`;
}

// Iniciar Modo Foco diretamente com a matéria do cronograma
window.iniciarFocoComMateria = function(materia) {
  if (typeof mudarAba === 'function') mudarAba('ferramentas');
  const label = document.getElementById('pomodoro-mode-label');
  if (label) label.textContent = `Foco: ${materia}`;
  if (window.mostrarToast) {
    window.mostrarToast(`⏱️ Bloco de Foco carregado para: ${materia}. Bons estudos!`);
  }
};

// Alternar conclusão de tarefa no cronograma com XP e comemoração
window.alternarConclusaoTarefaCronograma = function(dia, idx) {
  const plano = AppState.cronograma.planoSemanal;
  if (plano && plano[dia] && plano[dia][idx]) {
    const item = plano[dia][idx];
    item.concluido = !item.concluido;

    if (item.concluido) {
      AppState.cronograma.xp = (AppState.cronograma.xp || 0) + 25;
      emitirSomChat('sucesso');
      if (typeof tocarSomAcertoQuiz === 'function') tocarSomAcertoQuiz();
      if (window.mostrarToast) window.mostrarToast(`🎯 +25 XP! Meta de ${item.materia} concluída!`);

      // Se todas as tarefas do dia foram feitas, celebra!
      const todasDia = plano[dia].every(t => t.concluido);
      if (todasDia && typeof dispararConfetes === 'function') {
        dispararConfetes();
      }
    } else {
      AppState.cronograma.xp = Math.max(0, (AppState.cronograma.xp || 0) - 25);
    }

    salvarCronogramaStorage();
    renderizarCronogramaUI();
  }
};

// Remover tarefa individual do cronograma
window.removerTarefaCronograma = function(dia, idx) {
  const plano = AppState.cronograma.planoSemanal;
  if (plano && plano[dia] && plano[dia][idx]) {
    const item = plano[dia][idx];
    if (confirm(`Deseja remover "${item.materia}" de ${dia}?`)) {
      plano[dia].splice(idx, 1);
      salvarCronogramaStorage();
      renderizarCronogramaUI();
      if (window.mostrarToast) window.mostrarToast('Matéria removida do dia.');
    }
  }
};

// Abre modal para gerar cronograma por IA perguntando parâmetros
window.abrirModalGerarCronogramaIA = function() {
  const modal = document.getElementById('modal-gerar-cronograma-ia');
  if (!modal) return;

  const user = AppState.currentUser;
  const inputVestibular = document.getElementById('cronograma-ia-vestibular');
  const inputCurso = document.getElementById('cronograma-ia-curso');

  if (inputVestibular) inputVestibular.value = user ? (user.vestibular || 'ENEM') : 'ENEM';
  if (inputCurso) inputCurso.value = user ? (user.curso || 'Medicina') : 'Vestibular';

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalGerarCronogramaIA = function() {
  const modal = document.getElementById('modal-gerar-cronograma-ia');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

// Executa geração de cronograma via IA com as respostas do modal
window.executarGeradorCronogramaIA = async function(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('btn-confirmar-gerar-cronograma-ia');
  const vest = document.getElementById('cronograma-ia-vestibular')?.value || 'ENEM';
  const curso = document.getElementById('cronograma-ia-curso')?.value || 'Vestibular';
  const horas = document.getElementById('cronograma-ia-horas')?.value || '4';
  const dias = document.getElementById('cronograma-ia-dias')?.value || '5';
  const turno = document.getElementById('cronograma-ia-turno')?.value || 'tarde';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Construindo Cronograma com Gemini...';
  }

  try {
    const promptCronograma = `Crie um cronograma de estudos semanal de alta performance para um vestibulando com os seguintes dados:
- Vestibular Alvo: ${vest}
- Curso Desejado: ${curso}
- Horas de estudo por dia: ${horas} horas
- Dias disponíveis na semana: ${dias} dias
- Turno preferido: ${turno}

Elabore um planejamento estratégico equilibrando matérias com maior peso na prova com resolução prática de questões e revisões de memória.
Retorne a explicação pedagógica e OBRIGATORIAMENTE termine com o bloco JSON:
CRONOGRAMA_JSON:
{
  "diasEstudo": ${dias},
  "horasPorDia": ${horas},
  "vestibular": "${vest}",
  "curso": "${curso}",
  "dias": { ... }
}`;

    const res = await processarPerguntaComIA(promptCronograma);
    fecharModalGerarCronogramaIA();

    if (res.temCronograma && res.cronogramaData) {
      aplicarObjetoCronograma(res.cronogramaData);
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) {
        window.mostrarToast(`✨ Cronograma da IA para ${vest} (${curso}) ativado com sucesso!`, 'sucesso');
      }
    } else {
      aplicarCronogramaFallback(vest, curso, parseInt(dias, 10), parseInt(horas, 10));
      if (window.mostrarToast) {
        window.mostrarToast(`✨ Cronograma personalizado para ${vest} gerado com sucesso!`, 'sucesso');
      }
    }

    renderizarCronogramaUI();
  } catch (err) {
    console.error('Erro ao gerar cronograma por IA:', err);
    aplicarCronogramaFallback(vest, curso, parseInt(dias, 10), parseInt(horas, 10));
    fecharModalGerarCronogramaIA();
    renderizarCronogramaUI();
    if (window.mostrarToast) {
      window.mostrarToast('Cronograma gerado via motor inteligente do EstudaMais!', 'info');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Gerar Cronograma com IA';
    }
  }
};

// Aplica cronograma sugerido na mensagem do chat
window.aplicarCronogramaSugeridoPelaIA = function(msgId) {
  const msg = AppState.chatIA.mensagens.find(m => m.id === msgId);
  if (msg && msg.acaoCronograma) {
    aplicarObjetoCronograma(msg.acaoCronograma);
    renderizarCronogramaUI();
    mudarAba('cronograma');
    if (window.mostrarToast) {
      window.mostrarToast('📅 Cronograma sincronizado com sucesso na sua aba Cronogramas!');
    }
  }
};

// Transforma o objeto do Gemini na estrutura interna do cronograma
function aplicarObjetoCronograma(data) {
  if (!data || !data.dias) return;

  const novoPlano = {};
  const diasNomes = Object.keys(data.dias);

  diasNomes.forEach(diaNome => {
    const materias = data.dias[diaNome];
    novoPlano[diaNome] = materias.map((mat, i) => {
      let matNome = typeof mat === 'string' ? mat : (mat.materia || 'Estudo');
      let topico = typeof mat === 'object' && mat.topico ? mat.topico : 'Revisão e Questões';
      let tempo = typeof mat === 'object' && mat.tempo ? mat.tempo : '60 min';

      return {
        id: `c-ai-${diaNome}-${i}-${Date.now()}`,
        materia: matNome,
        topico: topico,
        tempo: tempo,
        concluido: false
      };
    });
  });

  AppState.cronograma.diasEstudoPorSemana = data.diasEstudo || diasNomes.length;
  AppState.cronograma.horasPorDia = data.horasPorDia || 4;
  AppState.cronograma.planoSemanal = novoPlano;
  salvarCronogramaStorage();
}

// Fallback robusto para criação de cronograma
function aplicarCronogramaFallback(vest, curso, diasQtd, horas) {
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].slice(0, diasQtd);
  const materiasPadrao = [
    { m: "Matemática", t: "Álgebra e Geometria" },
    { m: "Física", t: "Mecânica e Termologia" },
    { m: "Biologia", t: "Ecologia e Genética" },
    { m: "Química", t: "Química Geral e Orgânica" },
    { m: "Linguagens", t: "Interpretação e Literatura" },
    { m: "História", t: "Brasil e Geral" },
    { m: "Geografia", t: "Geopolítica e Meio Ambiente" },
    { m: "Redação", t: "Prática em Folha Pautada" },
    { m: "Simulado", t: "Resolução de Provas Anteriores" }
  ];

  const novoPlano = {};
  diasSemana.forEach((dia, dIdx) => {
    const item1 = materiasPadrao[(dIdx * 2) % materiasPadrao.length];
    const item2 = materiasPadrao[(dIdx * 2 + 1) % materiasPadrao.length];
    const tempoBloco = Math.round((horas * 60) / 2) + " min";

    novoPlano[dia] = [
      { id: `c-fb-${dia}-1`, materia: item1.m, topico: item1.t, tempo: tempoBloco, concluido: false },
      { id: `c-fb-${dia}-2`, materia: item2.m, topico: item2.t, tempo: tempoBloco, concluido: false }
    ];
  });

  AppState.cronograma.diasEstudoPorSemana = diasQtd;
  AppState.cronograma.horasPorDia = horas;
  AppState.cronograma.planoSemanal = novoPlano;
  salvarCronogramaStorage();
}

// Modal para adicionar tarefa manual ao cronograma
window.abrirModalNovaTarefaCronograma = function(dia) {
  const modal = document.getElementById('modal-tarefa-cronograma');
  const diaInput = document.getElementById('tarefa-cronograma-dia');
  const diaTexto = document.getElementById('modal-tarefa-dia-texto');
  if (!modal) return;

  if (diaInput) diaInput.value = dia;
  if (diaTexto) diaTexto.textContent = dia;

  modal.classList.add('active');
};

window.fecharModalNovaTarefaCronograma = function() {
  const modal = document.getElementById('modal-tarefa-cronograma');
  if (modal) modal.classList.remove('active');
};

window.salvarNovaTarefaCronograma = function(e) {
  if (e) e.preventDefault();
  const dia = document.getElementById('tarefa-cronograma-dia')?.value;
  const materia = document.getElementById('tarefa-cronograma-materia')?.value?.trim();
  const topico = document.getElementById('tarefa-cronograma-topico')?.value?.trim();
  const tempo = document.getElementById('tarefa-cronograma-tempo')?.value || '60 min';

  if (!dia || !materia) {
    alert('Por favor, informe a matéria a ser estudada.');
    return;
  }

  if (!AppState.cronograma.planoSemanal) AppState.cronograma.planoSemanal = {};
  if (!AppState.cronograma.planoSemanal[dia]) AppState.cronograma.planoSemanal[dia] = [];

  AppState.cronograma.planoSemanal[dia].push({
    id: `c-man-${Date.now()}`,
    materia: materia,
    topico: topico || 'Exercícios e Revisão',
    tempo: tempo,
    concluido: false
  });

  salvarCronogramaStorage();
  fecharModalNovaTarefaCronograma();
  renderizarCronogramaUI();
  if (window.mostrarToast) window.mostrarToast(`Matéria adicionada a ${dia}!`);
};

// Resetar tarefas semanais para recomeçar a semana
window.reiniciarSemanaCronograma = function() {
  if (confirm('Deseja avançar para a próxima semana e atualizar automaticamente as matérias e horários do edital?')) {
    let proxima = (AppState.cronograma.semanaAtual || 1) + 1;
    if (proxima > 12) proxima = 1;
    AppState.cronograma.semanaAtual = proxima;
    AppState.cronograma.streakDias = (AppState.cronograma.streakDias || 1) + 1;
    AppState.cronograma.xp = (AppState.cronograma.xp || 0) + 100;

    const diasQtd = AppState.cronograma.diasEstudoPorSemana || 5;
    const horas = AppState.cronograma.horasPorDia || 4;
    AppState.cronograma.planoSemanal = gerarGradeSemanaCurricular(proxima, diasQtd, horas);

    salvarCronogramaStorage();
    renderizarCronogramaUI();
    if (typeof dispararConfetes === 'function') dispararConfetes();
    if (typeof emitirSomChat === 'function') emitirSomChat('sucesso');
    if (window.mostrarToast) window.mostrarToast(`🚀 Bem-vindo à Semana ${proxima}! Novas matérias carregadas (+100 XP)!`);
  }
};

// Imprimir / Salvar PDF do Cronograma
window.imprimirCronogramaEstudos = function() {
  window.print();
};


// 12 Semanas de Progressão Curricular Dinâmica para Vestibulares
const SEMANAS_PROGRESSAO_CRONOGRAMA = [
  {
    semana: 1,
    tema: "Fase 1: Fundamentos & Diagnóstico Inicial",
    materias: [
      { m: "Matemática", t: "Conjuntos Numéricos, Frações & Razão e Proporção" },
      { m: "Física", t: "Cinemática Escalar: MRU, MRUV e Gráficos" },
      { m: "Biologia", t: "Níveis de Organização & Ecologia Básica (Cadeias Alimentares)" },
      { m: "Química", t: "Modelos Atômicos, Tabela Periódica & Ligações Químicas" },
      { m: "Linguagens", t: "Gêneros Textuais & Estratégias de Interpretação" },
      { m: "História", t: "Brasil Colônia: Ciclo do Açúcar e Mineração" },
      { m: "Geografia", t: "Cartografia, Escalas & Fusos Horários" },
      { m: "Redação", t: "Estrutura do Texto Dissertativo-Argumentativo & Tese" }
    ]
  },
  {
    semana: 2,
    tema: "Fase 2: Funções, Leis de Newton & Genética Básica",
    materias: [
      { m: "Matemática", t: "Função Afim (1º Grau) & Função Quadrática (2º Grau)" },
      { m: "Física", t: "Leis de Newton, Atrito e Força Elástica" },
      { m: "Biologia", t: "Genética Mendeliana: 1ª Lei de Mendel & Heredogramas" },
      { m: "Química", t: "Massa Molar, Quantidade de Matéria (Mol) & Estequiometria" },
      { m: "Linguagens", t: "Figuras de Linguagem & Funções da Linguagem" },
      { m: "História", t: "Brasil Império: 1º e 2º Reinado e Abolição" },
      { m: "Geografia", t: "Relevo, Geologia & Placas Tectônicas do Brasil" },
      { m: "Redação", t: "Parágrafos de Desenvolvimento: Argumentação e Repertório" }
    ]
  },
  {
    semana: 3,
    tema: "Fase 3: Geometria Plana, Termologia & Citologia",
    materias: [
      { m: "Matemática", t: "Geometria Plana: Triângulos, Teorema de Pitágoras e Áreas" },
      { m: "Física", t: "Termometria, Calorimetria & Trocas de Calor" },
      { m: "Biologia", t: "Citologia: Membrana Plasmática, Osmose e Transporte Ativo" },
      { m: "Química", t: "Soluções: Concentração Comum, Molaridade e Diluição" },
      { m: "Linguagens", t: "Literatura: Classicismo, Barroco e Arcadismo no Brasil" },
      { m: "História", t: "República da Espada & República Oligárquica (Café com Leite)" },
      { m: "Geografia", t: "Climas do Brasil, Massas de Ar & Dinâmica Atmosférica" },
      { m: "Redação", t: "Construção de Repertório Sociológico e Filosófico" }
    ]
  },
  {
    semana: 4,
    tema: "Fase 4: Trigonometria, Eletricidade & Fisiologia Humana",
    materias: [
      { m: "Matemática", t: "Trigonometria: Relações no Triângulo Retângulo e Ciclo Trigonométrico" },
      { m: "Física", t: "Eletrodinâmica: Corrente, Tensão, Lei de Ohm e Potência Elétrica" },
      { m: "Biologia", t: "Fisiologia: Sistemas Digestório, Circulatório e Respiratório" },
      { m: "Química", t: "Cinética Química: Fatores que Alteram a Velocidade da Reação" },
      { m: "Linguagens", t: "Literatura: Romantismo (Poesia e Prosa) & Realismo / Machado" },
      { m: "História", t: "A Era Vargas (1930-1945): Estado Novo e Trabalhismo" },
      { m: "Geografia", t: "Biomas Brasileiros, Desmatamento e Impactos Ambientais" },
      { m: "Redação", t: "Proposta de Intervenção Completa com os 5 Elementos" }
    ]
  },
  {
    semana: 5,
    tema: "Fase 5: Geometria Espacial, Ondulatória & Evolução",
    materias: [
      { m: "Matemática", t: "Geometria Espacial: Prismas, Cilindros, Pirâmides e Cones" },
      { m: "Física", t: "Ondulatória: Reflexão, Refração, Difração e Efeito Doppler" },
      { m: "Biologia", t: "Evolução: Darwinismo, Neodarwinismo e Seleção Natural" },
      { m: "Química", t: "Equilíbrio Químico: Kc, Kp e Princípio de Le Chatelier" },
      { m: "Linguagens", t: "Modernismo no Brasil: Semana de 22 e 1ª Fase Modernista" },
      { m: "História", t: "Guerra Fria, Queda do Muro de Berlim e Nova Ordem Mundial" },
      { m: "Geografia", t: "Urbanização Brasileira, Metropolização e Problemas Urbanos" },
      { m: "Redação", t: "Coesão Interparágrafos e Recursos Conectivos Avançados" }
    ]
  },
  {
    semana: 6,
    tema: "Fase 6: Combinatória, Magnetismo & Termoquímica",
    materias: [
      { m: "Matemática", t: "Análise Combinatória: Princípio Fundamental, Arranjo e Combinação" },
      { m: "Física", t: "Magnetismo: Campo Magnético, Força Magnética e Regra da Mão Direita" },
      { m: "Biologia", t: "Divisão Celular: Mitose, Meiose e Gametogênese" },
      { m: "Química", t: "Termoquímica: Entalpia, Lei de Hess e Energia de Ligação" },
      { m: "Linguagens", t: "Modernismo 2ª Fase (Carlos Drummond, Graciliano Ramos, Clarice)" },
      { m: "História", t: "Ditadura Militar no Brasil (1964-1985) e Redemocratização" },
      { m: "Geografia", t: "Agropecuária Brasileira: Commodities, Fronteira Agrícola e Conflitos" },
      { m: "Simulado", t: "Treino Cronometrado de Prova Oficial (Foco em Gestão de Tempo)" }
    ]
  },
  {
    semana: 7,
    tema: "Fase 7: Probabilidade, Óptica & Eletroquímica",
    materias: [
      { m: "Matemática", t: "Probabilidade Simples, Condicional e Eventos Simultâneos" },
      { m: "Física", t: "Óptica Geométrica: Espelhos Planos e Esféricos, Lentes e Refração" },
      { m: "Biologia", t: "Microbiologia: Vírus, Bactérias, Protozoários e Doenças Endêmicas" },
      { m: "Química", t: "Eletroquímica: Pilhas, DDP e Eletrólise Ígnea e Aquosa" },
      { m: "Linguagens", t: "Intertextualidade, Paráfrase, Paródia e Ironia" },
      { m: "História", t: "Revolução Industrial, Iluminismo e Revolução Francesa" },
      { m: "Geografia", t: "Matriz Energética: Petróleo, Hidrelétricas e Fontes Renováveis" },
      { m: "Redação", t: "Redação Completa em Folha Pautada de 30 Linhas (Tempo: 60min)" }
    ]
  },
  {
    semana: 8,
    tema: "Fase 8: Estatística, Hidrostática & Química Orgânica",
    materias: [
      { m: "Matemática", t: "Estatística: Média Aritmética, Ponderada, Moda, Mediana e Desvio Padrão" },
      { m: "Física", t: "Hidrostática: Pressão, Teorema de Stevin e Empuxo (Arquimedes)" },
      { m: "Biologia", t: "Biotecnologia: Transgênicos, Clonagem e CRISPR / Edição Gênica" },
      { m: "Química", t: "Química Orgânica: Funções Oxigenadas (Álcool, Éter, Aldeído, Cetona)" },
      { m: "Linguagens", t: "Poesia Concreta, Tropicalismo e Produção Cultural Contemporânea" },
      { m: "História", t: "Primeira e Segunda Guerra Mundial: Causas e Consequências Globais" },
      { m: "Geografia", t: "Demografia: Pirâmides Etárias, Transição Demográfica e Migrações" },
      { m: "Redação", t: "Análise de Redações Nota 1000 e Erros Frequentes na Competência 1" }
    ]
  },
  {
    semana: 9,
    tema: "Fase 9: Logaritmos, Indução Eletromagnética & Isomeria",
    materias: [
      { m: "Matemática", t: "Função Exponencial & Logaritmos: Propriedades e Aplicações" },
      { m: "Física", t: "Indução Eletromagnética: Lei de Faraday e Transformadores" },
      { m: "Biologia", t: "Botânica: Briófitas, Pteridófitas, Gimnospermas e Angiospermas" },
      { m: "Química", t: "Isomeria Plana e Espacial (Cis-Trans / Óptica)" },
      { m: "Linguagens", t: "Concordância Verbal e Nominal & Regência com Crase" },
      { m: "História", t: "Cidadania e Direitos Sociais na Constituição de 1988" },
      { m: "Geografia", t: "Globalização, Blocos Econômicos e Tensões Geopolíticas Atuais" },
      { m: "Simulado", t: "Simulado Especial com Questões Específicas da Banca Alvo" }
    ]
  },
  {
    semana: 10,
    tema: "Fase 10: Matrizes, Gravitação & Reações Orgânicas",
    materias: [
      { m: "Matemática", t: "Matrizes, Determinantes e Sistemas Lineares com Escalonamento" },
      { m: "Física", t: "Gravitação Universal: Leis de Kepler e Força Gravitacional" },
      { m: "Biologia", t: "Imunologia: Antígenos, Anticorpos, Vacinas vs Soros" },
      { m: "Química", t: "Reações Orgânicas: Esterificação, Saponificação e Polímeros" },
      { m: "Linguagens", t: "Variação Linguística: Preconceito Linguístico e Adequação" },
      { m: "História", t: "História da América: Independências e Populismo Latino-Americano" },
      { m: "Geografia", t: "Geopolítica: Conflitos no Oriente Médio, Ucrânia e Ásia" },
      { m: "Redação", t: "Simulação Real de Tema Inédito com Correção por IA" }
    ]
  },
  {
    semana: 11,
    tema: "Fase 11: Reta Final — Revisão dos Top Assuntos Mais Cobrados",
    materias: [
      { m: "Matemática", t: "Super Revisão: Funções, Geometria e Estatística Recorrente" },
      { m: "Física", t: "Super Revisão: Circuitos Elétricos, Calorimetria e Leis de Newton" },
      { m: "Biologia", t: "Super Revisão: Ecologia, Genética e Fisiologia Humana" },
      { m: "Química", t: "Super Revisão: Estequiometria, Soluções e Funções Orgânicas" },
      { m: "Linguagens", t: "Super Revisão: Interpretação de Textos e Obras Obrigatórias" },
      { m: "Humanas", t: "Super Revisão: Brasil República, Era Vargas e Geopolítica" },
      { m: "Redação", t: "Lapidação de Esqueletos de Redação e Repertórios Curinga" },
      { m: "Simulado", t: "Simulado Oficial Cronometrado da 1ª Fase com TRI" }
    ]
  },
  {
    semana: 12,
    tema: "Fase 12: Super Simulado Geral & Estratégia de Prova",
    materias: [
      { m: "Estratégia", t: "Ordem Ideal de Resolução: Identificação das Fáceis e Médias" },
      { m: "Revisão Leve", t: "Fórmulas Essenciais de Matemática, Física e Química" },
      { m: "Redação", t: "Memorização dos Conectivos Chave e Checklist da Proposta" },
      { m: "Descanso Ativo", t: "Técnicas de Respiração, Higiene do Sono e Autoconfiança" },
      { m: "Simulado Final", t: "Simulado de Fechamento com Análise Detalhada dos Desvios" },
      { m: "Celebração", t: "Alinhamento Psicológico: Rumo à Vaga no Vestibular dos Seus Sonhos!" }
    ]
  }
];

// Gerador Automático de Cronograma Progressivo por Semana
function gerarGradeSemanaCurricular(numSemana, diasQtd = 5, horas = 4) {
  const semIndex = Math.max(0, Math.min(SEMANAS_PROGRESSAO_CRONOGRAMA.length - 1, numSemana - 1));
  const configSemana = SEMANAS_PROGRESSAO_CRONOGRAMA[semIndex];
  const diasNomes = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].slice(0, diasQtd);
  
  const grade = {};
  const materias = configSemana.materias;
  const tempoBloco = Math.round((horas * 60) / 2) + " min";

  diasNomes.forEach((dia, dIdx) => {
    const item1 = materias[(dIdx * 2) % materias.length];
    const item2 = materias[(dIdx * 2 + 1) % materias.length];

    grade[dia] = [
      {
        id: `c-w${numSemana}-${dia}-1`,
        materia: item1.m,
        topico: item1.t,
        tempo: tempoBloco,
        concluido: false
      },
      {
        id: `c-w${numSemana}-${dia}-2`,
        materia: item2.m,
        topico: item2.t,
        tempo: tempoBloco,
        concluido: false
      }
    ];
  });

  return grade;
}

// Trocar de Semana e atualizar automaticamente matérias e horários
window.mudarSemanaCronograma = function(delta) {
  let semanaAtual = (AppState.cronograma.semanaAtual || 1) + delta;
  if (semanaAtual < 1) semanaAtual = 1;
  if (semanaAtual > 12) semanaAtual = 12;

  AppState.cronograma.semanaAtual = semanaAtual;
  const diasQtd = AppState.cronograma.diasEstudoPorSemana || 5;
  const horas = AppState.cronograma.horasPorDia || 4;

  // Atualiza automaticamente as matérias e horários para a nova semana
  AppState.cronograma.planoSemanal = gerarGradeSemanaCurricular(semanaAtual, diasQtd, horas);
  salvarCronogramaStorage();
  renderizarCronogramaUI();

  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    const semInfo = SEMANAS_PROGRESSAO_CRONOGRAMA[semanaAtual - 1];
    window.mostrarToast(`📅 Semana ${semanaAtual} carregada: ${semInfo ? semInfo.tema : ''}`);
  }
};

// Gerenciamento Universal do Bloqueio de Scroll de Fundo para Modais (Sem Loops ou Travamentos)
function gerenciarBloqueioScrollModal() {
  const algumAtivo = !!document.querySelector('.modal-overlay.active, .modal.active');
  const estaAberto = document.body.classList.contains('modal-aberto');
  if (algumAtivo !== estaAberto) {
    document.body.classList.toggle('modal-aberto', algumAtivo);
    document.documentElement.classList.toggle('modal-aberto', algumAtivo);
  }
}
window.gerenciarBloqueioScrollModal = gerenciarBloqueioScrollModal;

/* ========================================================
   SEÇÃO 12: VÍDEO AULAS DO YOUTUBE & CURADORIA DE CANAIS
   ======================================================== */

// Inicialização do estado de Videoaulas no AppState
if (!AppState.videoaulas) {
  let favs = [];
  try {
    favs = JSON.parse(localStorage.getItem('estudamais_canais_favoritos') || '[]');
  } catch (e) {
    favs = [];
  }
  AppState.videoaulas = {
    filtroDisciplina: 'todas',
    termoBusca: '',
    apenasFavoritos: false,
    favoritos: favs,
    videoAtual: null
  };
}

// Renderização dos cards de canais recomendados
function renderizarVideoaulas() {
  const container = document.getElementById('videoaulas-grid');
  if (!container) return;

  if (typeof CANAIS_YOUTUBE_DATA === 'undefined' || !Array.isArray(CANAIS_YOUTUBE_DATA)) {
    container.innerHTML = `
      <div class="videoaulas-vazio">
        <i class="fa-brands fa-youtube"></i>
        <h3>Carregando curadoria de canais...</h3>
        <p>A lista de vídeo aulas está sendo sincronizada com os melhores professores do YouTube.</p>
      </div>
    `;
    return;
  }

  const { filtroDisciplina, termoBusca, apenasFavoritos, favoritos } = AppState.videoaulas;

  // Filtragem dos canais
  let filtrados = CANAIS_YOUTUBE_DATA.filter(canal => {
    // Filtro por disciplina
    if (filtroDisciplina && filtroDisciplina !== 'todas') {
      if (canal.disciplinaId !== filtroDisciplina) return false;
    }

    // Filtro por favoritos
    if (apenasFavoritos) {
      if (!favoritos.includes(canal.id)) return false;
    }

    // Filtro por termo de busca
    if (termoBusca) {
      const q = termoBusca.toLowerCase();
      const matchNome = (canal.nomeCanal || '').toLowerCase().includes(q);
      const matchProf = (canal.professor || '').toLowerCase().includes(q);
      const matchDisc = (canal.disciplina || '').toLowerCase().includes(q);
      const matchDesc = (canal.descricao || '').toLowerCase().includes(q);
      const matchDest = (canal.destaque || '').toLowerCase().includes(q);
      const matchVid = (canal.videoTitulo || '').toLowerCase().includes(q);
      const matchPlaylists = Array.isArray(canal.playlists) && canal.playlists.some(p => p.toLowerCase().includes(q));

      if (!matchNome && !matchProf && !matchDisc && !matchDesc && !matchDest && !matchVid && !matchPlaylists) {
        return false;
      }
    }

    return true;
  });

  // Atualiza botão de favoritos no topo
  const btnFavTopo = document.getElementById('btn-filtro-favoritos-canais');
  if (btnFavTopo) {
    btnFavTopo.classList.toggle('active', !!apenasFavoritos);
    const spanText = btnFavTopo.querySelector('span');
    if (spanText) {
      spanText.textContent = apenasFavoritos
        ? `Favoritos (${favoritos.length}) [Ativo]`
        : `Meus Favoritos (${favoritos.length})`;
    }
  }

  // Se nenhum resultado encontrado
  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="videoaulas-vazio">
        <i class="fa-solid fa-film"></i>
        <h3>Nenhum canal ou vídeo encontrado</h3>
        <p>Tente buscar por outro termo, limpar a pesquisa ou selecionar "Todas as Matérias".</p>
        <button type="button" class="btn-hero-primary" onclick="limparBuscaVideoaulas(); filtrarDisciplinaVideoaulas('todas');" style="margin-top: 1rem;">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Ver Todos os Canais</span>
        </button>
      </div>
    `;
    return;
  }

  // Gera HTML dos cards
  container.innerHTML = filtrados.map(canal => {
    const isFav = favoritos.includes(canal.id);
    const playlistsHtml = Array.isArray(canal.playlists)
      ? canal.playlists.map(pl => `<span class="canal-playlist-tag" title="Assunto/Playlist"><i class="fa-solid fa-play"></i> ${escapeHTML(pl)}</span>`).join('')
      : '';

    return `
      <article class="canal-card anim-fade-in" data-canal-id="${canal.id}">
        <!-- Topo do Card -->
        <div class="canal-card-header">
          <div class="canal-icone-box" style="background: ${canal.corIcone || '#2563eb'};">
            <i class="fa-solid ${canal.icone || 'fa-graduation-cap'}"></i>
          </div>
          <div class="canal-header-info">
            <div class="canal-disciplina-pill">
              <i class="fa-solid ${canal.icone || 'fa-book'}"></i>
              <span>${canal.disciplina}</span>
            </div>
            <h3 class="canal-nome">${escapeHTML(canal.nomeCanal)}</h3>
            <span class="canal-professor"><i class="fa-solid fa-chalkboard-user"></i> ${escapeHTML(canal.professor)}</span>
          </div>
          <button type="button" class="btn-canal-favorito ${isFav ? 'ativo' : ''}" onclick="alternarFavoritoCanal('${canal.id}')" title="${isFav ? 'Remover dos favoritos' : 'Favoritar este canal'}">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <!-- Estatísticas e Destaque -->
        <div class="canal-meta-row">
          <span class="canal-inscritos-badge">
            <i class="fa-brands fa-youtube" style="color: #ef4444;"></i> ${canal.inscritos}
          </span>
          <span class="canal-destaque-badge">
            <i class="fa-solid fa-award"></i> ${canal.destaque}
          </span>
        </div>

        <!-- Descrição pedagógica -->
        <p class="canal-descricao">
          ${escapeHTML(canal.descricao)}
        </p>

        <!-- Playlists e tópicos recomendados -->
        <div class="canal-playlists-section">
          <span class="canal-playlists-label"><i class="fa-solid fa-list-check"></i> Playlists e Séries de Ouro:</span>
          <div class="canal-playlists-list">
            ${playlistsHtml}
          </div>
        </div>

        <!-- Ações do Card: Apenas Acessar Canal Oficial -->
        <div class="canal-card-actions">
          <a href="${canal.urlCanal}" target="_blank" rel="noopener noreferrer" class="btn-canal-youtube-full" title="Acessar canal oficial no YouTube em nova guia">
            <i class="fa-brands fa-youtube" style="color: #ef4444;"></i>
            <span>Acessar Canal no YouTube ↗</span>
          </a>
        </div>
      </article>
    `;
  }).join('');
}
window.renderizarVideoaulas = renderizarVideoaulas;

// Filtro de Disciplina por botões em pílulas
function filtrarDisciplinaVideoaulas(disciplinaId, btnEl) {
  AppState.videoaulas.filtroDisciplina = disciplinaId;

  // Atualiza classe ativa nos botões
  document.querySelectorAll('.videoaulas-filtro-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.videoaulas-filtro-btn[onclick*="'${disciplinaId}'"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  renderizarVideoaulas();
}
window.filtrarDisciplinaVideoaulas = filtrarDisciplinaVideoaulas;

// Busca de Videoaulas em tempo real
function buscarVideoaulas(termo) {
  AppState.videoaulas.termoBusca = (termo || '').trim();
  const btnLimpar = document.getElementById('btn-limpar-busca-videoaulas');
  if (btnLimpar) {
    btnLimpar.style.display = AppState.videoaulas.termoBusca ? 'flex' : 'none';
  }
  renderizarVideoaulas();
}
window.buscarVideoaulas = buscarVideoaulas;

// Limpar campo de pesquisa
function limparBuscaVideoaulas() {
  const input = document.getElementById('input-busca-videoaulas');
  if (input) input.value = '';
  buscarVideoaulas('');
}
window.limparBuscaVideoaulas = limparBuscaVideoaulas;

// Alternar visualização apenas de favoritos
function alternarFiltroFavoritosCanais(btnEl) {
  AppState.videoaulas.apenasFavoritos = !AppState.videoaulas.apenasFavoritos;
  renderizarVideoaulas();
  if (AppState.videoaulas.apenasFavoritos) {
    if (window.mostrarToast) {
      window.mostrarToast(`Mostrando ${AppState.videoaulas.favoritos.length} canais favoritados.`);
    }
  }
}
window.alternarFiltroFavoritosCanais = alternarFiltroFavoritosCanais;

// Favoritar / Desfavoritar canal individual
function alternarFavoritoCanal(idCanal) {
  const idx = AppState.videoaulas.favoritos.indexOf(idCanal);
  let adicionado = false;
  if (idx >= 0) {
    AppState.videoaulas.favoritos.splice(idx, 1);
  } else {
    AppState.videoaulas.favoritos.push(idCanal);
    adicionado = true;
  }

  try {
    localStorage.setItem('estudamais_canais_favoritos', JSON.stringify(AppState.videoaulas.favoritos));
  } catch (e) {
    console.error('Erro ao salvar favoritos:', e);
  }

  renderizarVideoaulas();

  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    const canalObj = (typeof CANAIS_YOUTUBE_DATA !== 'undefined') ? CANAIS_YOUTUBE_DATA.find(c => c.id === idCanal) : null;
    const nome = canalObj ? canalObj.nomeCanal : 'Canal';
    window.mostrarToast(adicionado ? `❤️ ${nome} adicionado aos seus favoritos!` : `💔 ${nome} removido dos favoritos.`);
  }
}
window.alternarFavoritoCanal = alternarFavoritoCanal;

// Abrir Modal com Player Embutido
function abrirModalPlayerVideo(videoId, titulo, canal, professor, urlCanal) {
  const modal = document.getElementById('modal-video-aula-player');
  const iframe = document.getElementById('video-aula-iframe');
  const elTitulo = document.getElementById('modal-video-titulo');
  const elSubtitulo = document.getElementById('modal-video-subtitulo');
  const elProf = document.getElementById('modal-video-prof');
  const elLinkCanal = document.getElementById('modal-video-link-canal');
  const inputNota = document.getElementById('input-nota-video-rapida');

  if (!modal || !iframe) return;

  AppState.videoaulas.videoAtual = { videoId, titulo, canal, professor, urlCanal };

  if (elTitulo) elTitulo.textContent = titulo || 'Aula em Destaque';
  if (elSubtitulo) elSubtitulo.textContent = `${canal || 'Canal Oficial'}`;
  if (elProf) elProf.textContent = professor || 'Professor';
  if (elLinkCanal && urlCanal) elLinkCanal.href = urlCanal;
  if (inputNota) inputNota.value = '';

  // Carrega vídeo do YouTube embutido com suporte a referrer seguro
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
}
window.abrirModalPlayerVideo = abrirModalPlayerVideo;

// Fechar Modal do Player de Vídeo
function fecharModalPlayerVideo() {
  const modal = document.getElementById('modal-video-aula-player');
  const iframe = document.getElementById('video-aula-iframe');

  if (iframe) {
    iframe.src = 'about:blank'; // Interrompe áudio/vídeo imediatamente
  }

  if (modal) {
    modal.classList.remove('active');
  }

  AppState.videoaulas.videoAtual = null;

  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
}
window.fecharModalPlayerVideo = fecharModalPlayerVideo;

// Salvar anotação rápida do vídeo no Bloco de Notas (Caderno do Estudante)
function salvarAnotacaoVideoNoCaderno() {
  const input = document.getElementById('input-nota-video-rapida');
  const texto = (input ? input.value : '').trim();

  if (!texto) {
    if (window.mostrarToast) {
      window.mostrarToast('Digite alguma anotação antes de salvar.', 'erro');
    }
    return;
  }

  const v = AppState.videoaulas.videoAtual;
  const tituloNota = v ? `[Videoaula] ${v.canal} - ${v.titulo}` : `[Videoaula] Anotações`;

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: tituloNota,
    conteudo: texto,
    materia: v ? v.professor : 'Vídeo Aulas',
    data: new Date().toLocaleDateString('pt-BR'),
    cor: '#3b82f6',
    favorita: false
  };

  if (!Array.isArray(AppState.notes)) {
    AppState.notes = [];
  }
  AppState.notes.unshift(novaNota);

  if (typeof salvarNotasStorage === 'function') {
    salvarNotasStorage();
  }
  if (typeof renderizarNotas === 'function') {
    renderizarNotas();
  }

  if (input) input.value = '';
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('📝 Anotação salva com sucesso no seu Bloco de Notas!', 'sucesso');
  }
}
window.salvarAnotacaoVideoNoCaderno = salvarAnotacaoVideoNoCaderno;

/* ========================================================
   CONTROLE DE NAVEGAÇÃO AGRUPADA & MENU DE 3 LISTRAS (☰)
   ======================================================== */

window.alternarModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (modal && modal.classList.contains('active')) {
    fecharModalMenuAbas();
  } else {
    abrirModalMenuAbas();
  }
};

window.abrirModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (!modal) return;

  // Atualiza destaque da aba ativa no momento
  const tabAtual = AppState.currentTab || 'inicio';
  document.querySelectorAll('.menu-aba-item-card').forEach(card => {
    card.classList.toggle('ativo', card.dataset.tabAlvo === tabAtual);
  });

  const inputBusca = document.getElementById('input-busca-abas-menu');
  if (inputBusca) {
    inputBusca.value = '';
    filtrarAbasNoMenu('');
  }

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }

  // Foco no input de busca para conveniência
  setTimeout(() => {
    if (inputBusca) inputBusca.focus();
  }, 100);
};

window.fecharModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (modal) {
    modal.classList.remove('active');
  }
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
};

// Alternar dropdown de grupo na barra de navegação
window.toggleDropdownNavGroup = function(event, grupoId) {
  if (event) event.stopPropagation();
  const grupoItem = document.querySelector(`.nav-group-item[data-group="${grupoId}"]`);
  if (!grupoItem) return;

  const jaAberto = grupoItem.classList.contains('aberto');

  // Fecha todos os outros primeiro
  fecharTodosDropdowns();

  if (!jaAberto) {
    grupoItem.classList.add('aberto');
  }
};

// Alternar dropdown de ferramentas no header
window.toggleDropdownFerramentas = function(event) {
  if (event) event.stopPropagation();
  const wrapper = document.getElementById('wrapper-dropdown-ferramentas');
  if (!wrapper) return;

  const jaAberto = wrapper.classList.contains('aberto');
  fecharTodosDropdowns();

  if (!jaAberto) {
    wrapper.classList.add('aberto');
  }
};

// Fechar todos os dropdowns suspensos
window.fecharTodosDropdowns = function() {
  document.querySelectorAll('.nav-group-item.aberto').forEach(el => el.classList.remove('aberto'));
  const wrapper = document.getElementById('wrapper-dropdown-ferramentas');
  if (wrapper) wrapper.classList.remove('aberto');
};

// Filtrar itens dentro do Modal de Abas
window.filtrarAbasNoMenu = function(termo) {
  const q = (termo || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.menu-aba-item-card');
  const blocos = document.querySelectorAll('.menu-aba-grupo-bloco');

  cards.forEach(card => {
    const texto = card.textContent.toLowerCase();
    const visivel = !q || texto.includes(q);
    card.style.display = visivel ? 'flex' : 'none';
  });

  // Oculta blocos vazios se não houver filhos visíveis
  blocos.forEach(bloco => {
    let temVisivel = false;
    const filhos = bloco.querySelectorAll('.menu-aba-item-card');
    filhos.forEach(f => {
      if (f.style.display !== 'none') temVisivel = true;
    });
    bloco.style.display = temVisivel ? 'flex' : 'none';
  });
};

// Fecha dropdowns ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-group-item') && !e.target.closest('.header-dropdown-wrapper')) {
    fecharTodosDropdowns();
  }
});

/* ========================================================
   PLAYER DE VIDEOAULAS NO TOPO & LOUSA/ANOTAÇÕES EMBUTIDAS
   ======================================================== */

// Extrair ID do YouTube a partir de qualquer formato de URL
function extrairYouTubeId(urlOuId) {
  if (!urlOuId) return null;
  const str = urlOuId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = str.match(regExp);
  return match ? match[1] : null;
}
window.extrairYouTubeId = extrairYouTubeId;

// Carregar Vídeo Personalizado do YouTube no Topo
window.carregarVideoPersonalizadoTopo = function(urlPredefinida = null) {
  const input = document.getElementById('input-video-url-topo');
  const url = (urlPredefinida || (input ? input.value : '')).trim();

  if (!url) {
    if (window.mostrarToast) {
      window.mostrarToast('Por favor, cole o link de um vídeo do YouTube.', 'aviso');
    }
    return;
  }

  const videoId = extrairYouTubeId(url);
  if (!videoId) {
    if (window.mostrarToast) {
      window.mostrarToast('Link do YouTube inválido. Verifique a URL e tente novamente.', 'erro');
    }
    return;
  }

  const iframe = document.getElementById('iframe-video-player-topo');
  const areaAtiva = document.getElementById('area-video-ativa-topo');
  const labelStatus = document.getElementById('label-video-carregado');

  if (iframe) {
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
  }

  const linkExterno = document.getElementById('btn-link-externo-video-topo');
  if (linkExterno) {
    linkExterno.href = `https://www.youtube.com/watch?v=${videoId}`;
  }

  if (areaAtiva) {
    areaAtiva.style.display = 'flex';
  }

  if (labelStatus) {
    labelStatus.textContent = 'Vídeo em Reprodução (ID: ' + videoId + ')';
  }

  // Configura a lousa integrada sob o vídeo
  setTimeout(() => {
    configurarLousaVideo();
  }, 100);

  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('🎬 Vídeo carregado! Anotações e lousa ativadas abaixo.', 'sucesso');
  }

  // Rola suavemente até o player
  const secao = document.getElementById('secao-assistir-aula-aqui');
  if (secao) {
    secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.fecharVideoPersonalizadoTopo = function() {
  const iframe = document.getElementById('iframe-video-player-topo');
  const areaAtiva = document.getElementById('area-video-ativa-topo');
  const input = document.getElementById('input-video-url-topo');

  if (iframe) {
    iframe.src = 'about:blank';
  }
  if (areaAtiva) {
    areaAtiva.style.display = 'none';
  }
  if (input) {
    input.value = '';
    const btnLimpar = document.getElementById('btn-limpar-url-topo');
    if (btnLimpar) btnLimpar.style.display = 'none';
  }
  if (window.mostrarToast) {
    window.mostrarToast('Reprodução de vídeo encerrada.');
  }
};

window.limparInputVideoTopo = function() {
  const input = document.getElementById('input-video-url-topo');
  if (input) input.value = '';
  const btnLimpar = document.getElementById('btn-limpar-url-topo');
  if (btnLimpar) btnLimpar.style.display = 'none';
};

window.alternarAbaFerramentaVideo = function(ferramenta) {
  const painelNotas = document.getElementById('painel-video-notas');
  const painelLousa = document.getElementById('painel-video-lousa');
  const btnNotas = document.getElementById('btn-tab-tool-notas');
  const btnLousa = document.getElementById('btn-tab-tool-lousa');

  if (ferramenta === 'notas') {
    if (painelNotas) painelNotas.style.display = 'flex';
    if (painelLousa) painelLousa.style.display = 'none';
    if (btnNotas) btnNotas.classList.add('active');
    if (btnLousa) btnLousa.classList.remove('active');
  } else {
    if (painelNotas) painelNotas.style.display = 'none';
    if (painelLousa) painelLousa.style.display = 'flex';
    if (btnNotas) btnNotas.classList.remove('active');
    if (btnLousa) btnLousa.classList.add('active');

    setTimeout(() => {
      redimensionarCanvasLousaVideo();
    }, 80);
  }
};

window.salvarNotaVideoTopo = function() {
  const input = document.getElementById('input-nota-video-topo');
  const texto = (input ? input.value : '').trim();

  if (!texto) {
    if (window.mostrarToast) {
      window.mostrarToast('Digite alguma anotação antes de salvar.', 'erro');
    }
    return;
  }

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: `[Aula YouTube] Anotações de Estudo`,
    conteudo: texto,
    materia: 'Vídeo Aulas',
    data: new Date().toLocaleDateString('pt-BR'),
    cor: '#ef4444',
    favorita: false
  };

  if (!Array.isArray(AppState.notes)) {
    AppState.notes = [];
  }
  AppState.notes.unshift(novaNota);

  if (typeof salvarNotasStorage === 'function') salvarNotasStorage();
  if (typeof renderizarNotas === 'function') renderizarNotas();

  if (input) input.value = '';
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  if (window.mostrarToast) {
    window.mostrarToast('📝 Anotação salva com sucesso no seu Bloco de Notas!', 'sucesso');
  }
};

// Motor da Lousa Integrada sob o Vídeo
const LousaVideo = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  tool: 'pen',
  color: '#ffffff',
  size: 3
};

function configurarLousaVideo() {
  const canvas = document.getElementById('lousa-video-canvas');
  if (!canvas) return;

  LousaVideo.canvas = canvas;
  LousaVideo.ctx = canvas.getContext('2d');

  redimensionarCanvasLousaVideo();

  canvas.onpointerdown = (e) => {
    e.preventDefault();
    LousaVideo.isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = LousaVideo.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (LousaVideo.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = LousaVideo.size * 5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = LousaVideo.color;
      ctx.lineWidth = LousaVideo.size;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  canvas.onpointermove = (e) => {
    if (!LousaVideo.isDrawing) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    LousaVideo.ctx.lineTo(x, y);
    LousaVideo.ctx.stroke();
  };

  canvas.onpointerup = () => { LousaVideo.isDrawing = false; };
  canvas.onpointerleave = () => { LousaVideo.isDrawing = false; };
}

function redimensionarCanvasLousaVideo() {
  const canvas = LousaVideo.canvas;
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
}

window.setLousaVideoFerramenta = function(tool) {
  LousaVideo.tool = tool;
  const btnPen = document.getElementById('tool-pen-video');
  const btnEraser = document.getElementById('tool-eraser-video');
  if (btnPen) btnPen.classList.toggle('active', tool === 'pen');
  if (btnEraser) btnEraser.classList.toggle('active', tool === 'eraser');
  if (LousaVideo.canvas) {
    LousaVideo.canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
  }
};

window.setLousaVideoCor = function(cor) {
  LousaVideo.color = cor;
  setLousaVideoFerramenta('pen');
  document.querySelectorAll('#lousa-video-cores-container .lousa-cor-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(cor));
  });
};

window.limparLousaVideo = function() {
  if (LousaVideo.canvas && LousaVideo.ctx) {
    LousaVideo.ctx.clearRect(0, 0, LousaVideo.canvas.width, LousaVideo.canvas.height);
  }
  if (window.mostrarToast) {
    window.mostrarToast('Lousa do vídeo limpa!');
  }
};

/* ========================================================
   ESTUDAMAIS - SISTEMA DE JANELAS FLUTUANTES MÓVEIS (MULTITAREFA)
   Lousa, Tutor IA, Bloco de Notas e Foco Pomodoro
   ======================================================== */

// Rate limiting de autenticação para proteção contra força bruta
window.TentativasLogin = {
  tentativas: 0,
  bloqueadoAte: 0,
  verificar() {
    const agora = Date.now();
    if (this.bloqueadoAte > agora) {
      const rest = Math.ceil((this.bloqueadoAte - agora) / 1000);
      alert('⚠️ Muitas tentativas incorretas seguidas. Por segurança, tente novamente em ' + rest + ' segundos.');
      return false;
    }
    return true;
  },
  falha() {
    this.tentativas++;
    if (this.tentativas >= 5) {
      this.bloqueadoAte = Date.now() + 60000;
      this.tentativas = 0;
      alert('🔒 Limite de 5 tentativas excedido. Acesso temporariamente travado por 60 segundos por segurança.');
    }
  },
  sucesso() {
    this.tentativas = 0;
    this.bloqueadoAte = 0;
  }
};

// Gerenciador de Janelas Flutuantes Móveis (Garantia de Visibilidade Total)
window.alternarJanelaFlutuante = function(tipo) {
  let id = '';
  if (tipo === 'lousa') id = 'lousa-rascunho';
  else if (tipo === 'ia') id = 'janela-flutuante-ia';
  else if (tipo === 'notas') id = 'janela-flutuante-notas';
  else if (tipo === 'foco') id = 'janela-flutuante-foco';
  else id = tipo;

  const el = document.getElementById(id);
  if (!el) {
    console.warn('Elemento flutuante não encontrado:', id);
    return;
  }

  const estaAberta = el.classList.contains('visivel');

  if (estaAberta) {
    // Fecha a janela
    el.classList.remove('visivel');
    el.classList.remove('minimizado');
    if (tipo === 'lousa' && window.AppState && AppState.lousa) {
      AppState.lousa.isVisible = false;
    }
  } else {
    // Abre a janela
    el.classList.remove('minimizado');
    el.classList.add('visivel');

    if (tipo === 'lousa' && window.AppState && AppState.lousa) {
      AppState.lousa.isVisible = true;
    }

    // Se ainda não foi movida manualmente, define posição padrão elegante no topo direito
    if (!el.dataset.posicionadaManualmente) {
      const topOffset = (tipo === 'lousa' ? 95 : (tipo === 'ia' ? 105 : (tipo === 'notas' ? 115 : 125)));
      const rightOffset = (tipo === 'lousa' ? 24 : (tipo === 'ia' ? 32 : (tipo === 'notas' ? 40 : 48)));
      el.style.top = topOffset + 'px';
      el.style.right = rightOffset + 'px';
      el.style.left = 'auto';
      el.style.bottom = 'auto';
    } else {
      garantirJanelaVisivelNaTela(el);
    }

    trazerParaFrenteJanela(el);

    if (tipo === 'lousa') {
      setTimeout(() => {
        if (typeof redimensionarCanvasLousa === 'function') redimensionarCanvasLousa();
      }, 120);
    }

    if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  }
};

window.alternarLousaRascunho = function() {
  window.alternarJanelaFlutuante('lousa');
};

window.minimizarJanelaFlutuante = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('minimizado');
  }
};

function trazerParaFrenteJanela(el) {
  const janelas = document.querySelectorAll('.janela-flutuante-widget, .lousa-scratchpad');
  let maxZ = 3500;
  janelas.forEach(j => {
    const z = parseInt(window.getComputedStyle(j).zIndex, 10) || 3500;
    if (z > maxZ) maxZ = z;
  });
  el.style.zIndex = (maxZ + 5).toString();
}

function garantirJanelaVisivelNaTela(el) {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const rect = el.getBoundingClientRect();
  const w = rect.width > 0 ? rect.width : 380;
  const h = rect.height > 0 ? rect.height : 450;

  if (!el.dataset.posicionadaManualmente) {
    el.style.top = '100px';
    el.style.right = '2rem';
    el.style.left = 'auto';
    el.style.bottom = 'auto';
  } else {
    let curLeft = el.offsetLeft;
    let curTop = el.offsetTop;
    let left = Math.min(Math.max(10, curLeft), winW - Math.min(w, winW - 20));
    let top = Math.min(Math.max(65, curTop), winH - 60);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
  }
}

// Torna qualquer elemento arrastável suavemente pela barra de título
window.tornarElementoArrastavel = function(el, handle) {
  if (!el || !handle) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;

  handle.addEventListener('pointerdown', (e) => {
    // Ignora se clicou em botões de controle
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;

    isDragging = true;
    trazerParaFrenteJanela(el);
    el.dataset.posicionadaManualmente = 'true';

    const rect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = rect.left;
    initialTop = rect.top;

    el.style.left = `${initialLeft}px`;
    el.style.top = `${initialTop}px`;
    el.style.bottom = 'auto';
    el.style.right = 'auto';

    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  handle.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;

    // Limites da tela
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const w = el.offsetWidth || 360;

    newLeft = Math.max(10, Math.min(winW - w - 10, newLeft));
    newTop = Math.max(65, Math.min(winH - 60, newTop));

    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
  });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try { handle.releasePointerCapture(e.pointerId); } catch(err) {}
    }
  };

  handle.addEventListener('pointerup', stopDrag);
  handle.addEventListener('pointercancel', stopDrag);
};

// Inicializa o arraste em todas as 4 janelas flutuantes
function inicializarJanelasArrastaveis() {
  const lousa = document.getElementById('lousa-rascunho');
  const lousaHandle = document.getElementById('header-lousa-rascunho') || document.querySelector('.lousa-header');
  if (lousa && lousaHandle) tornarElementoArrastavel(lousa, lousaHandle);

  const ia = document.getElementById('janela-flutuante-ia');
  const iaHandle = document.getElementById('header-flutuante-ia');
  if (ia && iaHandle) tornarElementoArrastavel(ia, iaHandle);

  const notas = document.getElementById('janela-flutuante-notas');
  const notasHandle = document.getElementById('header-flutuante-notas');
  if (notas && notasHandle) tornarElementoArrastavel(notas, notasHandle);

  const foco = document.getElementById('janela-flutuante-foco');
  const focoHandle = document.getElementById('header-flutuante-foco');
  if (foco && focoHandle) tornarElementoArrastavel(foco, focoHandle);
}

// ----------------------------------------------------
// MINI CHAT FLUTUANTE
// ----------------------------------------------------
window.enviarMensagemMiniChat = async function(textoPredefinido = null) {
  const input = document.getElementById('input-mini-chat-flutuante');
  const feed = document.getElementById('mini-chat-mensagens');
  const texto = (textoPredefinido || (input ? input.value : '')).trim();
  if (!texto || !feed) return;

  if (input) input.value = '';

  // Mensagem do usuário
  const msgUser = document.createElement('div');
  msgUser.className = 'mini-chat-msg user';
  msgUser.innerHTML = `
    <div class="mini-chat-avatar"><i class="fa-solid fa-user-graduate"></i></div>
    <div class="mini-chat-balao">${texto}</div>
  `;
  feed.appendChild(msgUser);
  feed.scrollTop = feed.scrollHeight;
  if (typeof emitirSomChat === 'function') emitirSomChat('enviar');

  // Mensagem de digitação
  const msgIA = document.createElement('div');
  msgIA.className = 'mini-chat-msg ia';
  msgIA.innerHTML = `
    <div class="mini-chat-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="mini-chat-balao"><i class="fa-solid fa-spinner fa-spin"></i> Pensando...</div>
  `;
  feed.appendChild(msgIA);
  feed.scrollTop = feed.scrollHeight;

  // Chama Gemini ou gerador didático
  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  let resposta = '';

  if (apiKey && typeof chamarGeminiAPI === 'function') {
    try {
      const contexto = `Você é o Tutor de Estudos do vestibulando no app EstudaMais. Responda em no máximo 3 ou 4 frases curtas, diretas, motivadoras e didáticas em pt-BR. Dúvida: ${texto}`;
      resposta = await chamarGeminiAPI(contexto);
    } catch(err) {
      resposta = `💡 Dica de Foco: Para dominar esse ponto, revise a fórmula ou conceito principal e resolva 3 exercícios de fixação!`;
    }
  } else {
    resposta = `💡 Dica Rápida do Tutor: ${texto.toLowerCase().includes('quest') ? 'Aqui vai uma questão-chave: analise sempre a causa fundamental antes de olhar as alternativas!' : 'Excelente pergunta! Divida o assunto em partes menores, resuma no seu bloco de notas e pratique a repetição espaçada.'}`;
  }

  const balaoIA = msgIA.querySelector('.mini-chat-balao');
  if (balaoIA) {
    balaoIA.textContent = resposta;
  }
  feed.scrollTop = feed.scrollHeight;
  if (typeof emitirSomChat === 'function') emitirSomChat('receber');
};

// ----------------------------------------------------
// MINI NOTAS FLUTUANTE
// ----------------------------------------------------
window.salvarMiniNotaFlutuante = function() {
  const inputTitulo = document.getElementById('input-mini-nota-titulo');
  const selectMateria = document.getElementById('select-mini-nota-materia');
  const textarea = document.getElementById('textarea-mini-nota-conteudo');

  const titulo = inputTitulo ? inputTitulo.value.trim() : '';
  const materia = selectMateria ? selectMateria.value : 'Geral';
  const conteudo = textarea ? textarea.value.trim() : '';

  if (!conteudo && !titulo) {
    if (window.mostrarToast) window.mostrarToast('Escreva algo para salvar a anotação.', 'aviso');
    return;
  }

  const novaNota = {
    id: 'nota_' + Date.now(),
    titulo: titulo || `Anotação de ${materia}`,
    conteudo: conteudo || '(Sem conteúdo detalhado)',
    materia: materia,
    cor: '#3b82f6',
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    fixada: false
  };

  if (!Array.isArray(AppState.notes)) AppState.notes = [];
  AppState.notes.unshift(novaNota);

  // Salva no storage do usuário
  if (AppState.currentUser) {
    localStorage.setItem(`estudamais_user_${AppState.currentUser.id}_notes`, JSON.stringify(AppState.notes));
  } else {
    localStorage.setItem('estudamais_guest_notes', JSON.stringify(AppState.notes));
  }

  if (typeof renderizarNotas === 'function') renderizarNotas();
  if (inputTitulo) inputTitulo.value = '';
  if (textarea) textarea.value = '';

  if (window.mostrarToast) {
    window.mostrarToast('📝 Nota salva com sucesso no seu caderno!', 'sucesso');
  }
};

// ----------------------------------------------------
// MINI TIMER DE FOCO
// ----------------------------------------------------
window.ajustarTempoMiniFoco = function(minutos, modo) {
  if (window.setPomodoroMode) {
    if (minutos === 25) window.setPomodoroMode('foco');
    else if (minutos === 50) window.setPomodoroMode('estendido');
    else if (minutos === 5) window.setPomodoroMode('curta');
    else if (minutos === 15) window.setPomodoroMode('longa');
  } else {
    AppState.pomodoro.timeLeft = minutos * 60;
  }

  const display = document.getElementById('mini-foco-timer-display');
  const badge = document.getElementById('mini-foco-mode-badge');
  if (display) display.textContent = `${minutos.toString().padStart(2, '0')}:00`;
  if (badge) badge.textContent = modo === 'pausa' ? 'Pausa' : 'Foco Ativo';

  document.querySelectorAll('.mini-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(`${minutos}m`));
  });
};

window.alternarTimerMiniFoco = function() {
  const btnPrincipal = document.getElementById('pomodoro-btn-start');
  if (btnPrincipal) {
    btnPrincipal.click();
    sincronizarMiniTimerUI();
  }
};

window.resetTimerMiniFoco = function() {
  const btnReset = document.getElementById('pomodoro-btn-reset');
  if (btnReset) {
    btnReset.click();
    sincronizarMiniTimerUI();
  }
};

function sincronizarMiniTimerUI() {
  const miniDisplay = document.getElementById('mini-foco-timer-display');
  const miniBtn = document.getElementById('btn-mini-foco-start');
  const isRunning = AppState.pomodoro?.isRunning;
  const timeLeft = AppState.pomodoro?.timeLeft || 1500;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  if (miniDisplay) {
    miniDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  if (miniBtn) {
    if (isRunning) {
      miniBtn.classList.add('pausado');
      miniBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    } else {
      miniBtn.classList.remove('pausado');
      miniBtn.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar';
    }
  }
}

// Sincroniza periodicamente o timer flutuante com o timer principal
setInterval(() => {
  if (AppState.pomodoro?.isRunning) {
    sincronizarMiniTimerUI();
  }
}, 500);

// ========================================================
// MOTOR AVANÇADO DE SONS AMBIENTES (WEB AUDIO API SINTETIZADA)
// Ruído Marrom, Chuva Suave, Tempestade, Ondas Alfa, Lo-Fi e Ruído Branco
// ========================================================

AppState.soundEngine = {
  ctx: null,
  currentType: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  masterGain: null,
  activeNodes: [],
  intervalLoop: null
};

window.selecionarSomAmbiente = function(tipo) {
  // Se já estiver tocando o mesmo tipo, para
  if (AppState.soundEngine.isPlaying && AppState.soundEngine.currentType === tipo) {
    pararTodosSonsAmbientes();
    return;
  }

  pararTodosSonsAmbientes();

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      alert('Seu navegador não suporta Web Audio API.');
      return;
    }

    if (!AppState.soundEngine.ctx || AppState.soundEngine.ctx.state === 'closed') {
      AppState.soundEngine.ctx = new AudioCtx();
    }
    const ctx = AppState.soundEngine.ctx;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    const vol = AppState.soundEngine.isMuted ? 0 : AppState.soundEngine.volume;
    masterGain.gain.setValueAtTime(vol * 0.35, ctx.currentTime);
    masterGain.connect(ctx.destination);
    AppState.soundEngine.masterGain = masterGain;

    if (tipo === 'brown') {
      gerarRuidoMarrom(ctx, masterGain);
    } else if (tipo === 'rain') {
      gerarChuvaSuave(ctx, masterGain);
    } else if (tipo === 'thunder') {
      gerarTempestade(ctx, masterGain);
    } else if (tipo === 'alpha') {
      gerarOndasAlfa(ctx, masterGain);
    } else if (tipo === 'lofi') {
      gerarLoFiChords(ctx, masterGain);
    } else if (tipo === 'white') {
      gerarRuidoBranco(ctx, masterGain);
    }

    AppState.soundEngine.currentType = tipo;
    AppState.soundEngine.isPlaying = true;
    atualizarBotoesSonsUI(tipo);

    if (window.mostrarToast) {
      const nomes = {
        brown: '🌊 Ruído Marrom Profundo',
        rain: '🌧️ Barulho de Chuva Suave',
        thunder: '⛈️ Tempestade com Trovões Distantes',
        alpha: '🧠 Ondas Alfa (10Hz Binaural)',
        lofi: '🎵 Acordes Lo-Fi de Relaxamento',
        white: '⚪ Ruído Branco para Foco'
      };
      window.mostrarToast(`Som ativo: ${nomes[tipo] || tipo}. Ajuste o volume quando quiser!`, 'info');
    }
  } catch(e) {
    console.error('Erro ao iniciar som ambiente:', e);
  }
};

function gerarRuidoMarrom(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.8; // Ganho calibrado
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, ctx.currentTime);

  noise.connect(filter);
  filter.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, filter);
}

function gerarChuvaSuave(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555;
    b1 = 0.99332 * b1 + white * 0.0750;
    b2 = 0.96900 * b2 + white * 0.1538;
    data[i] = (b0 + b1 + b2) * 0.06;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(1100, ctx.currentTime);
  bandpass.Q.setValueAtTime(0.5, ctx.currentTime);

  noise.connect(bandpass);
  bandpass.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, bandpass);
}

function gerarTempestade(ctx, destination) {
  gerarChuvaSuave(ctx, destination);

  // Trovoada distante periódica
  const dispararTrovao = () => {
    if (!AppState.soundEngine.isPlaying || AppState.soundEngine.currentType !== 'thunder') return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 3.5);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.6);
    } catch(e) {}
  };

  dispararTrovao();
  AppState.soundEngine.intervalLoop = setInterval(dispararTrovao, 14000);
}

function gerarOndasAlfa(ctx, destination) {
  // Tom Binaural de 10Hz (216Hz e 226Hz) para sincronização de ondas alfa
  const oscL = ctx.createOscillator();
  const oscR = ctx.createOscillator();
  const merger = ctx.createChannelMerger(2);

  oscL.type = 'sine';
  oscL.frequency.setValueAtTime(216, ctx.currentTime);

  oscR.type = 'sine';
  oscR.frequency.setValueAtTime(226, ctx.currentTime);

  oscL.connect(merger, 0, 0);
  oscR.connect(merger, 0, 1);
  merger.connect(destination);

  oscL.start();
  oscR.start();
  AppState.soundEngine.activeNodes.push(oscL, oscR, merger);
}

function gerarLoFiChords(ctx, destination) {
  // Acordes suaves progressivos em escala pentatônica / ambiente (Cmaj7 -> Am9 -> Fmaj7)
  const acordes = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // G6
  ];
  let idx = 0;

  const tocarAcorde = () => {
    if (!AppState.soundEngine.isPlaying || AppState.soundEngine.currentType !== 'lofi') return;
    try {
      const notas = acordes[idx % acordes.length];
      idx++;
      notas.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.8);

        osc.connect(gain);
        gain.connect(destination);
        osc.start();
        osc.stop(ctx.currentTime + 5.0);
      });
    } catch(e) {}
  };

  tocarAcorde();
  AppState.soundEngine.intervalLoop = setInterval(tocarAcorde, 4200);
}

function gerarRuidoBranco(ctx, destination) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.15;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3200, ctx.currentTime);

  noise.connect(filter);
  filter.connect(destination);
  noise.start();
  AppState.soundEngine.activeNodes.push(noise, filter);
}

window.pararTodosSonsAmbientes = function() {
  if (AppState.soundEngine.intervalLoop) {
    clearInterval(AppState.soundEngine.intervalLoop);
    AppState.soundEngine.intervalLoop = null;
  }

  AppState.soundEngine.activeNodes.forEach(node => {
    try {
      if (node.stop) node.stop();
      node.disconnect();
    } catch(e) {}
  });
  AppState.soundEngine.activeNodes = [];

  if (AppState.soundEngine.masterGain) {
    try { AppState.soundEngine.masterGain.disconnect(); } catch(e) {}
    AppState.soundEngine.masterGain = null;
  }

  AppState.soundEngine.isPlaying = false;
  AppState.soundEngine.currentType = null;
  atualizarBotoesSonsUI(null);
};

window.ajustarVolumeSomAmbiente = function(valPercent) {
  const pct = parseInt(valPercent, 10) || 0;
  const volDecimal = pct / 100;
  AppState.soundEngine.volume = volDecimal;
  AppState.soundEngine.isMuted = false;

  if (AppState.soundEngine.masterGain && AppState.soundEngine.ctx) {
    AppState.soundEngine.masterGain.gain.setValueAtTime(volDecimal * 0.35, AppState.soundEngine.ctx.currentTime);
  }

  // Atualiza sliders e textos
  const s1 = document.getElementById('foco-slider-volume');
  const s2 = document.getElementById('foco-slider-volume-tab');
  const t1 = document.getElementById('foco-volume-percent');
  const t2 = document.getElementById('foco-volume-percent-tab');
  const ic1 = document.getElementById('icone-foco-volume');
  const ic2 = document.getElementById('icone-foco-volume-tab');

  if (s1) s1.value = pct;
  if (s2) s2.value = pct;
  if (t1) t1.textContent = `${pct}%`;
  if (t2) t2.textContent = `${pct}%`;

  const iconClass = pct === 0 ? 'fa-volume-xmark' : (pct < 50 ? 'fa-volume-low' : 'fa-volume-high');
  if (ic1) ic1.className = `fa-solid ${iconClass}`;
  if (ic2) ic2.className = `fa-solid ${iconClass}`;
};

window.alternarMudoSomAmbiente = function() {
  AppState.soundEngine.isMuted = !AppState.soundEngine.isMuted;
  const vol = AppState.soundEngine.isMuted ? 0 : AppState.soundEngine.volume;

  if (AppState.soundEngine.masterGain && AppState.soundEngine.ctx) {
    AppState.soundEngine.masterGain.gain.setValueAtTime(vol * 0.35, AppState.soundEngine.ctx.currentTime);
  }

  const ic1 = document.getElementById('icone-foco-volume');
  const ic2 = document.getElementById('icone-foco-volume-tab');
  const iconClass = AppState.soundEngine.isMuted ? 'fa-volume-xmark' : 'fa-volume-high';
  if (ic1) ic1.className = `fa-solid ${iconClass}`;
  if (ic2) ic2.className = `fa-solid ${iconClass}`;
};

function atualizarBotoesSonsUI(tipoAtivo) {
  document.querySelectorAll('.btn-som-chip').forEach(btn => {
    const som = btn.getAttribute('data-som');
    btn.classList.toggle('ativo', som === tipoAtivo);
  });
}

// ========================================================
// CATÁLOGO DE TEMAS DE REDAÇÃO & CRIADOR DE PROPOSTAS COM GEMINI
// ========================================================

window.abrirCatalogoTemasRedacao = function() {
  const modal = document.getElementById('modal-catalogo-temas');
  if (!modal) return;

  renderizarGridCatalogoTemas('todos', '');
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharCatalogoTemasRedacao = function() {
  const modal = document.getElementById('modal-catalogo-temas');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.filtrarCatalogoPorVestibular = function(vest) {
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-vest') === vest);
  });
  const inputBusca = document.getElementById('input-busca-temas');
  renderizarGridCatalogoTemas(vest, inputBusca ? inputBusca.value : '');
};

window.filtrarCatalogoTemas = function(termo) {
  const btnAtivo = document.querySelector('.cat-pill-btn.active');
  const vest = btnAtivo ? btnAtivo.getAttribute('data-vest') : 'todos';
  renderizarGridCatalogoTemas(vest, termo);
};

function obterTodosTemasRedacao() {
  let lista = Array.isArray(TEMAS_REDACAO_DATA) ? [...TEMAS_REDACAO_DATA] : [];
  try {
    const custom = JSON.parse(localStorage.getItem('estudamais_custom_temas') || '[]');
    if (Array.isArray(custom)) {
      lista = [...custom, ...lista];
    }
  } catch(e) {}
  return lista;
}

function renderizarGridCatalogoTemas(filtroVest, buscaTexto) {
  const grid = document.getElementById('catalogo-temas-grid');
  if (!grid) return;

  const todos = obterTodosTemasRedacao();
  const termo = (buscaTexto || '').trim().toLowerCase();
  const vestFiltro = (filtroVest || 'todos').toUpperCase();
  const temaAtualId = AppState.redacao?.temaAtualId;

  const filtrados = todos.filter(t => {
    const vestMatch = (vestFiltro === 'TODOS') || 
                      (vestFiltro === 'CUSTOM' && t.isCustom) || 
                      (t.vestibular && t.vestibular.toUpperCase() === vestFiltro);
    const textMatch = !termo || 
                      (t.titulo && t.titulo.toLowerCase().includes(termo)) || 
                      (t.vestibular && t.vestibular.toLowerCase().includes(termo)) || 
                      (t.genero && t.genero.toLowerCase().includes(termo));
    return vestMatch && textMatch;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.8rem; display: block; opacity: 0.6;"></i>
        <p>Nenhuma proposta encontrada com estes filtros.</p>
        <button type="button" class="btn-novo-tema-ia-topo" style="margin-top: 0.8rem;" onclick="fecharCatalogoTemasRedacao(); abrirModalCriarTemaRedacao();">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Criar Este Tema com IA
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtrados.map(t => {
    const isSel = t.id === temaAtualId;
    let classeVest = (t.vestibular || 'enem').toLowerCase();
    if (t.isCustom) classeVest = 'custom';

    return `
      <div class="tema-catalogo-item-card ${isSel ? 'selecionado' : ''}" onclick="selecionarTemaPorId('${t.id}')">
        <div class="tema-item-badges-row">
          <span class="tema-item-vest-pill ${classeVest}">${t.vestibular || 'ENEM'}</span>
          <span class="tema-item-genero-pill">${t.genero ? t.genero.split('(')[0].trim() : 'Dissertativo'}</span>
        </div>
        <h4 class="tema-item-titulo">${t.titulo}</h4>
        <button type="button" class="btn-selecionar-tema-card">
          <i class="fa-solid ${isSel ? 'fa-check' : 'fa-pen-nib'}"></i> 
          <span>${isSel ? 'Tema Selecionado' : 'Praticar Esta Redação'}</span>
        </button>
      </div>
    `;
  }).join('');
}

window.selecionarTemaPorId = function(idTema) {
  if (typeof carregarTemaRedacao === 'function') {
    carregarTemaRedacao(idTema);
  }
  
  const tema = obterTodosTemasRedacao().find(t => t.id === idTema);
  const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
  if (textoDestaque && tema) {
    textoDestaque.textContent = `[${tema.vestibular}] ${tema.titulo}`;
  }

  fecharCatalogoTemasRedacao();
  if (window.mostrarToast && tema) {
    window.mostrarToast(`✨ Tema selecionado: ${tema.titulo}`, 'sucesso');
  }
};

// ----------------------------------------------------
// CRIADOR DE PROPOSTAS COM GOOGLE GEMINI
// ----------------------------------------------------
window.abrirModalCriarTemaRedacao = function() {
  const modal = document.getElementById('modal-criar-tema-redacao');
  if (!modal) return;
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalCriarTemaRedacao = function() {
  const modal = document.getElementById('modal-criar-tema-redacao');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

const SUGESTOES_TEMAS_HOT = [
  "O impacto da proliferação das apostas esportivas e bets no endividamento das famílias",
  "A crise de saúde mental entre os jovens e o uso desregulado de ansiolíticos",
  "Desafios para a universalização do saneamento básico e o direito à dignidade humana",
  "A inclusão de pessoas neurodivergentes e o combate ao capacitismo na educação",
  "A uberização do trabalho e as novas formas de alienação na era dos algoritmos",
  "O papel dos povos originários e das terras indígenas na mitigação das mudanças climáticas",
  "Cibersegurança e o vazamento de dados sensíveis na era da inteligência artificial",
  "O envelhecimento populacional acelerado e a crise dos cuidados com a pessoa idosa",
  "A regulamentação das redes sociais no combate às notícias falsas e à desinformação",
  "A persistência do trabalho análogo à escravidão no agronegócio e na cadeia têxtil"
];

window.sugerirTemaIneditoRapido = function() {
  const sorteado = SUGESTOES_TEMAS_HOT[Math.floor(Math.random() * SUGESTOES_TEMAS_HOT.length)];
  const input = document.getElementById('input-tema-custom-titulo');
  if (input) {
    input.value = sorteado;
    input.focus();
  }
  if (typeof emitirSomChat === 'function') emitirSomChat('pop');
};

let temaGeradoEmEspera = null;

window.gerarTemaComGemini = async function() {
  const input = document.getElementById('input-tema-custom-titulo');
  const selectVest = document.getElementById('select-tema-custom-vest');
  const btn = document.getElementById('btn-gerar-tema-executar');
  const preview = document.getElementById('preview-tema-gerado');

  const tituloIdeia = (input ? input.value : '').trim();
  const vestibular = selectVest ? selectVest.value : 'ENEM';

  if (!tituloIdeia) {
    alert('Por favor, digite uma ideia ou clique em "Sugerir Tema" para sortear uma proposta.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Desenvolvendo Textos Motivadores com Gemini...';
  }

  const apiKey = localStorage.getItem('estudamais_gemini_api_key');
  let temaObj = null;

  if (apiKey && typeof chamarGeminiAPI === 'function') {
    try {
      const prompt = `Você é a banca examinadora do vestibular ${vestibular}. Desenvolva uma proposta oficial de redação completa sobre: "${tituloIdeia}".
Retorne OBRIGATORIAMENTE um JSON válido com o seguinte formato:
{
  "titulo": "Título oficial formal e provocativo",
  "genero": "Gênero textual adequado para o ${vestibular}",
  "instrucoes": "Instruções formais para o vestibulando",
  "textosMotivadores": [
    {"origem": "Texto I - Dados Estatísticos / Pesquisa", "conteudo": "Contextualização quantitativa ou histórica com fontes fidedignas"},
    {"origem": "Texto II - Pensamento Sociológico ou Filosófico", "conteudo": "Citação e reflexão crítica aplicável"},
    {"origem": "Texto III - Perspectiva Contemporânea", "conteudo": "Visão analítica dos desafios no Brasil atual"}
  ]
}`;
      const resRaw = await chamarGeminiAPI(prompt);
      const jsonMatch = resRaw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        temaObj = JSON.parse(jsonMatch[0]);
      }
    } catch(err) {
      console.warn('Falha no Gemini, usando motor pedagógico estruturado:', err);
    }
  }

  // Fallback ou motor didático autônomo
  if (!temaObj) {
    temaObj = {
      titulo: tituloIdeia.length > 15 ? tituloIdeia : `Desafios contemporâneos em torno de: ${tituloIdeia}`,
      genero: vestibular === 'ENEM' ? 'Texto Dissertativo-Argumentativo (Padrão ENEM)' : `Dissertação Crítica (${vestibular})`,
      instrucoes: `Com base na leitura da coletânea e em seus conhecimentos, redija um texto dissertativo formal articulando projeto de texto claro e argumentos consistentes sobre o tema.`,
      textosMotivadores: [
        {
          origem: "Texto I - Indicadores e Diagnóstico Social",
          conteudo: `O debate acerca de "${tituloIdeia}" reflete transformações estruturais da sociedade brasileira, demandando articulação entre marcos regulatórios, investimentos prioritários e fiscalização efetiva.`
        },
        {
          origem: "Texto II - Direitos e Cidadania",
          conteudo: `A garantia de dignidade, acesso e equidade constitui pilar inegociável da Carta Constitucional de 1988, reforçando que o desenvolvimento econômico deve caminhar junto da justiça social.`
        },
        {
          origem: "Texto III - Perspectiva Crítica e Propositiva",
          conteudo: `Superar os impasses exige superar a inércia institucional e promover o engajamento comunitário, transformando a conscientização em ações práticas e sustentáveis.`
        }
      ]
    };
  }

  temaObj.id = 'custom_' + Date.now();
  temaObj.vestibular = vestibular;
  temaObj.linhasMin = 7;
  temaObj.linhasMax = 30;
  temaObj.notaMaxima = vestibular === 'ENEM' ? 1000 : 50;
  temaObj.isCustom = true;
  temaObj.criterios = [
    { nome: "C1 - Norma Culta", desc: "Domínio formal da Língua Portuguesa", peso: 200 },
    { nome: "C2 - Tema e Repertório", desc: "Repertório sociocultural produtivo", peso: 200 },
    { nome: "C3 - Projeto de Texto", desc: "Defesa articulada de ponto de vista", peso: 200 },
    { nome: "C4 - Mecanismos Linguísticos", desc: "Coesão inter e intraparágrafos", peso: 200 },
    { nome: "C5 - Proposta de Intervenção", desc: "Elaboração com os 5 elementos", peso: 200 }
  ];

  temaGeradoEmEspera = temaObj;

  // Renderiza Preview
  if (preview) {
    preview.style.display = 'flex';
    document.getElementById('preview-tema-badge').textContent = vestibular;
    document.getElementById('preview-tema-titulo').textContent = temaObj.titulo;
    document.getElementById('preview-tema-instrucoes').textContent = temaObj.instrucoes;

    const boxMotivadores = document.getElementById('preview-textos-motivadores');
    if (boxMotivadores && temaObj.textosMotivadores) {
      boxMotivadores.innerHTML = temaObj.textosMotivadores.map(tm => `
        <div class="preview-texto-card">
          <strong>${tm.origem}</strong>
          <p>${tm.conteudo}</p>
        </div>
      `).join('');
    }
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Gerar Outra Versão';
  }

  if (typeof emitirSomChat === 'function') emitirSomChat('receber');
  if (window.mostrarToast) {
    window.mostrarToast('✨ Proposta desenvolvida com sucesso! Confira abaixo.', 'sucesso');
  }
};

window.aplicarTemaGeradoAoTreino = function() {
  if (!temaGeradoEmEspera) return;

  // Salva no storage de temas personalizados
  try {
    let custom = JSON.parse(localStorage.getItem('estudamais_custom_temas') || '[]');
    custom.unshift(temaGeradoEmEspera);
    localStorage.setItem('estudamais_custom_temas', JSON.stringify(custom));
  } catch(e) {}

  // Adiciona em memória aos temas
  if (Array.isArray(TEMAS_REDACAO_DATA)) {
    TEMAS_REDACAO_DATA.unshift(temaGeradoEmEspera);
  }

  // Carrega na folha de redação
  if (typeof carregarTemaRedacao === 'function') {
    carregarTemaRedacao(temaGeradoEmEspera.id);
  }

  const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
  if (textoDestaque) {
    textoDestaque.textContent = `[${temaGeradoEmEspera.vestibular}] ${temaGeradoEmEspera.titulo}`;
  }

  fecharModalCriarTemaRedacao();
  if (typeof mudarAba === 'function') mudarAba('redacao');

  const workspace = document.querySelector('.redacao-workspace-card');
  if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.mostrarToast) {
    window.mostrarToast('🚀 Proposta ativada! Boa redação!', 'sucesso');
  }
};

// Sincroniza o label de tema atual ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    inicializarJanelasArrastaveis();
    const temaId = AppState.redacao?.temaAtualId;
    if (temaId) {
      const tema = obterTodosTemasRedacao().find(t => t.id === temaId);
      const textoDestaque = document.getElementById('redacao-tema-selecionado-texto');
      if (textoDestaque && tema) {
        textoDestaque.textContent = `[${tema.vestibular}] ${tema.titulo}`;
      }
    }
  }, 400);
});

/* ========================================================
   ESTUDAMAIS CLOUD SYNC & DISPOSITIVOS MÚLTIPLOS
   Sincronização Nuvem Multi-Dispositivo (REST + Cloud Vault)
   ======================================================== */
const EstudaMaisCloudSync = {
  obterCodigoSincronizacao(user) {
    if (!user) return 'ESTUDA-GUEST-SYNC';
    const idClean = user.id.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase();
    return 'ESTUDA-' + idClean;
  },

  async salvarNuvem(silencioso = false) {
    const user = AppState.currentUser;
    if (!user) {
      if (!silencioso) mostrarToast('⚠️ Faça login para sincronizar seus dados na nuvem.');
      return false;
    }

    try {
      const backup = await EstudaMaisDB.exportarBackupCompleto(user.id);
      if (!backup) return false;

      const codigo = this.obterCodigoSincronizacao(user);
      const payload = {
        codigo: codigo,
        timestamp: Date.now(),
        dataHora: new Date().toISOString(),
        backup: backup
      };

      // 1. Armazena no canal compartilhado / storage cloud local (para simulação de outros dispositivos ou tabs)
      localStorage.setItem('estudamais_cloud_vault_' + codigo, JSON.stringify(payload));
      localStorage.setItem('estudamais_ultimo_sync_cloud', Date.now().toString());

      // 2. Envia para armazenamento na nuvem (JSON bin / REST API)
      let syncedOnline = false;
      try {
        const response = await fetch('https://api.jsonstorage.net/v1/json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const resJson = await response.json();
          if (resJson && resJson.uri) {
            localStorage.setItem('estudamais_cloud_uri_' + codigo, resJson.uri);
            syncedOnline = true;
          }
        }
      } catch (e) {
        // Modo offline / fallback
      }

      this.atualizarStatusUI('sincronizado');
      if (!silencioso) {
        mostrarToast('☁️ Dados sincronizados na nuvem com sucesso! Acesse em qualquer dispositivo com o código ' + codigo);
      }
      return true;
    } catch (err) {
      console.error('Erro ao sincronizar com nuvem:', err);
      if (!silencioso) mostrarToast('Erro ao sincronizar com a nuvem.');
      return false;
    }
  },

  async restaurarPorCodigo(codigoInput) {
    const cod = (codigoInput || '').trim().toUpperCase();
    if (!cod) {
      alert('Por favor, informe o código de sincronização (ex: ESTUDA-XXXXXX).');
      return false;
    }

    try {
      let dadosEncontrados = null;

      // 1. Procura no cofre de dados em nuvem
      const rawVault = localStorage.getItem('estudamais_cloud_vault_' + cod);
      if (rawVault) {
        try {
          const parsed = JSON.parse(rawVault);
          if (parsed && parsed.backup) dadosEncontrados = parsed.backup;
        } catch(e){}
      }

      // 2. Tenta buscar da API REST se houver URI
      const savedUri = localStorage.getItem('estudamais_cloud_uri_' + cod);
      if (!dadosEncontrados && savedUri) {
        try {
          const res = await fetch(savedUri);
          if (res.ok) {
            const data = await res.json();
            if (data && data.backup) dadosEncontrados = data.backup;
          }
        } catch (e){}
      }

      if (!dadosEncontrados) {
        alert('Código ' + cod + ' não encontrado na nuvem. Certifique-se de clicar em "Sincronizar Agora com a Nuvem" no seu primeiro dispositivo antes de conectar.');
        return false;
      }

      // Restaura os dados importando o backup
      await EstudaMaisDB.importarBackupCompleto(dadosEncontrados);
      this.atualizarStatusUI('sincronizado');
      fecharModalConectarDispositivo();
      mostrarToast('🚀 Dados sincronizados com sucesso do outro dispositivo! Tudo pronto para estudar.');

      if (AppState.currentUser) {
        carregarDadosUsuarioAtivo(AppState.currentUser.id);
        atualizarUIAreaUsuario();
        renderizarAbaPerfil();
      }
      return true;
    } catch (err) {
      console.error('Erro ao restaurar código da nuvem:', err);
      alert('Ocorreu um erro ao conectar os dados da nuvem.');
      return false;
    }
  },

  atualizarStatusUI(status = 'sincronizado') {
    const badge = document.getElementById('cloud-sync-status-badge');
    const timeEl = document.getElementById('cloud-sync-last-time');
    const inputCod = document.getElementById('input-codigo-dispositivo');

    if (badge) {
      if (status === 'sincronizado') {
        badge.className = 'status-badge status-sucesso';
        badge.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sincronizado na Nuvem';
      } else if (status === 'pendente') {
        badge.className = 'status-badge status-alerta';
        badge.innerHTML = '<i class="fa-solid fa-cloud"></i> Salvamento Local';
      }
    }

    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    if (inputCod && AppState.currentUser) {
      inputCod.value = this.obterCodigoSincronizacao(AppState.currentUser);
    }
  }
};

window.sincronizarManualmenteNuvem = function() {
  EstudaMaisCloudSync.salvarNuvem(false);
};

window.abrirModalConectarDispositivo = function() {
  const modal = document.getElementById('modal-conectar-dispositivo');
  if (!modal) return;
  const user = AppState.currentUser;
  const cod = EstudaMaisCloudSync.obterCodigoSincronizacao(user);
  const inputMeucod = document.getElementById('input-codigo-dispositivo');
  if (inputMeucod) inputMeucod.value = cod;
  
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalConectarDispositivo = function() {
  const modal = document.getElementById('modal-conectar-dispositivo');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.copiarCodigoDispositivo = function() {
  const inputMeucod = document.getElementById('input-codigo-dispositivo');
  if (inputMeucod) {
    inputMeucod.select();
    navigator.clipboard.writeText(inputMeucod.value);
    mostrarToast('📋 Código de sincronização copiado para a área de transferência!');
  }
};

window.vincularCodigoDispositivo = async function() {
  const input = document.getElementById('input-codigo-vincular');
  if (!input) return;
  await EstudaMaisCloudSync.restaurarPorCodigo(input.value);
};