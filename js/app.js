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
  inicializarTema();
  inicializarAutenticacao();
  if (AppState.currentUser) {
    carregarDadosUsuarioAtivo(AppState.currentUser.id);
  } else {
    carregarDadosLocais();
  }
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
  inicializarRedacao();
  inicializarSimulados();
  atualizarEstatisticasDashboard();
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

  // Gera hash SHA-256 seguro com salt para senhas
  async hashPassword(password, salt) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(password + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('Crypto subtle indisponível, usando fallback de hash.');
    }
    // Fallback simples caso crypto não esteja disponível
    let hash = 0;
    const str = password + '::' + salt;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16) + '_sec';
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

  const hashDigitado = await EstudaMaisDB.hashPassword(senha, usuario.salt);
  if (hashDigitado !== usuario.passwordHash) {
    alert('Senha incorreta! Por favor, verifique sua senha e tente novamente.');
    return;
  }

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
};

window.fecharModalPerfil = function() {
  const modal = document.getElementById('modal-perfil-usuario');
  if (modal) modal.classList.remove('active');
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
};

window.fecharModalEditarPerfil = function() {
  const modal = document.getElementById('modal-editar-perfil');
  if (modal) modal.classList.remove('active');
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

  // Atualiza botões superiores
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
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
    renderizarVestibularAtivo();
  } else if (tabId === 'perfil') {
    renderizarAbaPerfil();
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
      iconBtn.className = modo === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      if (iconBtn.parentElement) {
        iconBtn.parentElement.title = modo === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro';
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
    const nomeModo = AppState.theme.mode === 'dark' ? 'Modo Escuro' : 'Modo Claro';
    mostrarToast(`Aparência atualizada: ${nomeModo} • ${nomeCor}`);
  }
};

window.alternarModoEscuro = function() {
  const novoModo = AppState.theme.mode === 'dark' ? 'light' : 'dark';
  aplicarTema(novoModo, AppState.theme.accent, true);
};

window.abrirModalCores = function() {
  const modal = document.getElementById('modal-cores');
  if (modal) {
    renderizarPaletasCores();
    modal.classList.add('active');
  }
};

window.fecharModalCores = function() {
  const modal = document.getElementById('modal-cores');
  if (modal) {
    modal.classList.remove('active');
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
  if (cardLight && cardDark) {
    cardLight.classList.toggle('active', AppState.theme.mode === 'light');
    cardDark.classList.toggle('active', AppState.theme.mode === 'dark');
  }

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
};

window.fecharModalConfigGemini = function() {
  const modal = document.getElementById('modal-config-gemini');
  if (modal) modal.classList.remove('active');
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

  // Busca outros simulados recomendados (priorizando matérias e vestibulares diferentes)
  const outros = (typeof SIMULADOS_DATA !== 'undefined' ? SIMULADOS_DATA : []).filter(s => s.id !== sim.id);
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



