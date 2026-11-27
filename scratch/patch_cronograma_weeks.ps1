$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 12 Semanas completas de progressão curricular
$cronogramaCode = @'

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

// Gerenciamento Universal do Bloqueio de Scroll de Fundo para Modais
function gerenciarBloqueioScrollModal() {
  const algumAtivo = document.querySelector('.modal-overlay.active, .modal.active');
  if (algumAtivo) {
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
  } else {
    document.body.classList.remove('modal-aberto');
    document.documentElement.classList.remove('modal-aberto');
  }
}

// Observador global para travar o scroll da página ao abrir qualquer modal
window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    gerenciarBloqueioScrollModal();
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // Previne que o scroll dentro dos modais escape para o fundo
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('wheel', (e) => {
      // Permite rolagem apenas dentro do modal, impedindo o fundo de mexer
      const card = overlay.querySelector('.modal-card, .cronograma-ia-modal-card, .modal-palette-box, .modal-tour-card');
      if (card) {
        const atingiuTopo = e.deltaY < 0 && card.scrollTop <= 0;
        const atingiuFim = e.deltaY > 0 && (card.scrollTop + card.clientHeight >= card.scrollHeight - 1);
        if (atingiuTopo || atingiuFim) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  });
});
'@

$content = $content + "`r`n" + $cronogramaCode

# Also update renderizarCronogramaUI to display the week controller info
$oldRenderCronogramaHeader = @'
function renderizarCronogramaUI() {
  const container = document.getElementById('cronograma-semanal-grid');
  const barraProgresso = document.getElementById('cronograma-barra-progresso');
  const percentualTexto = document.getElementById('cronograma-percentual-texto');
  const contadorTarefas = document.getElementById('cronograma-contador-tarefas');
  const badgeVestibular = document.getElementById('cronograma-badge-vestibular');
  const badgeCurso = document.getElementById('cronograma-badge-curso');
  const xpBadge = document.getElementById('cronograma-badge-xp');
  const streakBadge = document.getElementById('cronograma-badge-streak');

  if (!container) return;
'@

$newRenderCronogramaHeader = @'
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
'@

if ($content.Contains($oldRenderCronogramaHeader)) {
    $content = $content.Replace($oldRenderCronogramaHeader, $newRenderCronogramaHeader)
    Write-Host "renderizarCronogramaUI atualizado com suporte ao controlador de semanas!"
} else {
    Write-Host "Aviso: oldRenderCronogramaHeader não encontrado em app.js"
}

# Update reiniciarSemanaCronograma to advance week automatically
$oldReiniciarSemana = @'
window.reiniciarSemanaCronograma = function() {
  if (confirm('Deseja desmarcar todas as tarefas concluídas para iniciar uma nova semana de estudos?')) {
    const plano = AppState.cronograma.planoSemanal;
    if (plano) {
      Object.keys(plano).forEach(dia => {
        plano[dia].forEach(t => t.concluido = false);
      });
      AppState.cronograma.streakDias = (AppState.cronograma.streakDias || 1) + 1;
      salvarCronogramaStorage();
      renderizarCronogramaUI();
      if (typeof dispararConfetes === 'function') dispararConfetes();
      if (window.mostrarToast) window.mostrarToast('🚀 Nova semana iniciada! Sua constância aumentou!');
    }
  }
};
'@

$newReiniciarSemana = @'
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
'@

if ($content.Contains($oldReiniciarSemana)) {
    $content = $content.Replace($oldReiniciarSemana, $newReiniciarSemana)
    Write-Host "reiniciarSemanaCronograma atualizado com avanço dinâmico de matérias!"
} else {
    Write-Host "Aviso: oldReiniciarSemana não encontrado em app.js"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
