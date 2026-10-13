/**
 * BASE DE DADOS DOS VESTIBULARES E DICAS DE ESTUDO
 * Projeto de TCC: Plataforma de Apoio aos Estudos para Vestibulandos
 */

const VESTIBULARES_DATA = {
  enem: {
    id: "enem",
    nome: "ENEM",
    tituloCompleto: "Exame Nacional do Ensino Médio",
    badge: "Nacional / Sisu / Prouni",
    corBadge: "#1e3a8a",
    icone: "fa-graduation-cap",
    resumo: "O maior exame educacional do país. A prova avalia competências e habilidades através da TRI (Teoria de Resposta ao Item), valorizando a coerência pedagógica nas 4 áreas do conhecimento e na Redação.",
    detalhesGerais: {
      formato: "2 Domingos consecutivos (5h30 no 1º dia e 5h no 2º dia)",
      totalQuestoes: "180 questões de múltipla escolha (45 por área) + Redação dissertativa",
      criterioCorrecao: "TRI (Teoria de Resposta ao Item) - acertar questões fáceis e médias garante mais pontos que chutar difíceis",
      dicaChave: "Priorize interpretação rápida, leitura de gráficos e a coerência do seu padrão de respostas. Redação vale até 1000 pontos e tem peso decisivo."
    },
    redacao: {
      titulo: "Redação Nota 1000 no ENEM",
      descricao: "Texto dissertativo-argumentativo em até 30 linhas com temática de ordem social, científica, cultural ou política brasileira. Avaliada através de 5 competências rígidas (200 pontos cada):",
      competencias: [
        {
          num: 1,
          nome: "Domínio da Norma Culta",
          desc: "Demonstrar domínio da modalidade escrita formal da Língua Portuguesa (atenção à concordância, regência, crase e ortografia)."
        },
        {
          num: 2,
          nome: "Compreensão do Tema e Repertório",
          desc: "Compreender a proposta, não tangenciar o tema e aplicar conceitos de várias áreas do saber com repertório legítimo e produtivo."
        },
        {
          num: 3,
          nome: "Projeto de Texto e Argumentação",
          desc: "Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista bem definido."
        },
        {
          num: 4,
          nome: "Coesão Textual e Conectivos",
          desc: "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação (conectivos interparágrafos e intraparágrafos)."
        },
        {
          num: 5,
          nome: "Proposta de Intervenção Social",
          desc: "Elaborar proposta detalhada com os 5 elementos obrigatórios: Agente, Ação, Meio/Modo, Efeito e Detalhamento de um dos elementos, respeitando os Direitos Humanos."
        }
      ]
    },
    areas: [
      {
        id: "enem-linguagens",
        nome: "1. Linguagens, Códigos e suas Tecnologias",
        icone: "fa-book-open",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Interpretação de texto (o conteúdo com maior incidência da prova inteira)",
              "Gêneros textuais (crônicas, notícias, tirinhas, cartas e manifestos)",
              "Funções da linguagem (emotiva, referencial, conativa, metalinguística, fática e poética)",
              "Variação linguística e norma padrão vs. variedades regionais/sociais",
              "Modernismo brasileiro (Fase Heroica, Geração de 30 e Concretismo)",
              "Literatura contemporânea e diálogo com questões sociais"
            ]
          },
          {
            nome: "Língua Estrangeira (Inglês ou Espanhol)",
            topicos: [
              "Interpretação de textos autênticos (notícias, campanhas e cartuns)",
              "Vocabulário contextualizado e falsos cognatos",
              "Identificação de tom, tese e objetivo comunicativo do autor"
            ]
          },
          {
            nome: "Artes e Educação Física",
            topicos: [
              "Arte contemporânea e vanguardas modernistas",
              "Mídias, tecnologia e o papel social da arte",
              "Cultura corporal, esportes como fenômeno social e saúde pública",
              "Manifestações culturais populares e patrimônio imaterial brasileiro"
            ]
          }
        ]
      },
      {
        id: "enem-humanas",
        nome: "2. Ciências Humanas e suas Tecnologias",
        icone: "fa-landmark",
        disciplinas: [
          {
            nome: "História",
            topicos: [
              "Brasil Colônia: Ciclos econômicos (açúcar, ouro) e escravidão",
              "Segundo Reinado e processo de Proclamação da República",
              "Era Vargas (leis trabalhistas, Estado Novo e industrialização)",
              "Ditadura Militar (golpe de 64, AI-5, milagre econômico e redemocratização)",
              "Idade Moderna: Renascimento, Reformas Religiosas e Absolutismo",
              "Idade Contemporânea: Iluminismo, Guerras Mundiais e Guerra Fria"
            ]
          },
          {
            nome: "Geografia",
            topicos: [
              "Espaço agrário brasileiro (agronegócio, concentração fundiária e MST)",
              "Espaço urbano: Metropolização, segregação socioespacial e gentrificação",
              "Geopolítica: Conflitos contemporâneos, globalização e blocos econômicos",
              "Meio ambiente: Desmatamento, queimadas, aquecimento global e matriz energética",
              "Climatologia e geologia: Placas tectônicas, solos e tipos climáticos do Brasil"
            ]
          },
          {
            nome: "Filosofia",
            topicos: [
              "Filosofia Antiga: Sócrates (maiêutica), Platão (mundo das ideias) e Aristóteles (ética e política)",
              "Filosofia Política Moderna: Maquiavel, Hobbes, Locke e Rousseau (contratualismo)",
              "Ética e Moral: Kant (imperativo categórico) e Utilitarismo",
              "Filosofia Contemporânea: Escola de Frankfurt, Foucault e poder"
            ]
          },
          {
            nome: "Sociologia",
            topicos: [
              "Clássicos da Sociologia: Karl Marx, Émile Durkheim e Max Weber",
              "Cidadania, Direitos Humanos e constituição brasileira",
              "Movimentos sociais (negro, feminista, LGBTQIA+, ambiental)",
              "Mundo do trabalho: Fordismo, Taylorismo, Toyotismo e precarização/uberização",
              "Cultura: Indústria cultural, etnocentrismo e relativismo cultural"
            ]
          }
        ]
      },
      {
        id: "enem-natureza",
        nome: "3. Ciências da Natureza e suas Tecnologias",
        icone: "fa-dna",
        disciplinas: [
          {
            nome: "Biologia",
            topicos: [
              "Ecologia (o tema mais cobrado): Relações ecológicas, teias tróficas, ciclos biogeoquímicos e biomas brasileiros",
              "Impactos ambientais: Eutrofização, bioacumulação, desmatamento e efeito estufa",
              "Citologia: Membrana plasmática, organelas celulares, respiração celular e fotossíntese",
              "Genética e Biotecnologia: Hereditariedade, transgênicos e tecnologia do DNA",
              "Fisiologia Humana: Sistema imunitário (soros vs. vacinas), digestório e circulatório",
              "Evolução biológica: Lamarckismo vs. Darwinismo e seleção natural"
            ]
          },
          {
            nome: "Química",
            topicos: [
              "Físico-Química: Soluções (concentração), termoquímica e cinética química",
              "Eletroquímica: Pilhas, potencial de redução e eletrólise",
              "Equilíbrio químico: Deslocamento de Le Chatelier e cálculo de pH",
              "Química Orgânica: Funções orgânicas, hidrocarbonetos, isomeria e polímeros",
              "Estequiometria e cálculos químicos (rendimento e pureza de reações)",
              "Química Ambiental: Tratamento de água, chuva ácida e camada de ozônio"
            ]
          },
          {
            nome: "Física",
            topicos: [
              "Mecânica: Cinemática básica (velocidade, aceleração), Leis de Newton, energia e trabalho",
              "Eletrodinâmica: Circuitos elétricos, associação de resistores, potência e consumo de energia (kWh)",
              "Termologia: Calorimetria, trocas de calor, dilatação e propagação de calor",
              "Ondulatória: Fenômenos ondulatórios (eco, difração, refração, polarização) e velocidade de ondas",
              "Óptica geométrica: Espelhos planos e esféricos, refração e defeitos da visão"
            ]
          }
        ]
      },
      {
        id: "enem-matematica",
        nome: "4. Matemática e suas Tecnologias",
        icone: "fa-calculator",
        disciplinas: [
          {
            nome: "Matemática Básica (Campeã da TRI)",
            topicos: [
              "Porcentagem, acréscimos e descontos sucessivos",
              "Razão e proporção, grandezas direta e inversamente proporcionais",
              "Regra de três simples e composta",
              "Escalas numéricas e conversão de unidades de medida (comprimento, área e volume)"
            ]
          },
          {
            nome: "Estatística e Probabilidade",
            topicos: [
              "Leitura e interpretação crítica de gráficos de barras, linhas e setores",
              "Medidas de tendência central: Média aritmética, média ponderada, mediana e moda",
              "Cálculo de probabilidade simples e condicional"
            ]
          },
          {
            nome: "Geometria Plana e Espacial",
            topicos: [
              "Cálculo de áreas (triângulos, retângulos, círculos e trapézios)",
              "Teorema de Pitágoras e trigonometria básica no triângulo retângulo",
              "Geometria espacial: Volumes e áreas de prismas, cubos, paralelepípedos e cilindros",
              "Projeção ortogonal e visão tridimensional"
            ]
          },
          {
            nome: "Álgebra e Funções",
            topicos: [
              "Função do 1º grau (afim): Gráfico de retas e coeficiente angular",
              "Função do 2º grau (quadrática): Vértice da parábola (pontos de máximo e mínimo)",
              "Funções exponenciais e noções de logaritmos aplicadas a juros e crescimento"
            ]
          }
        ]
      }
    ]
  },

  fuvest: {
    id: "fuvest",
    nome: "FUVEST",
    tituloCompleto: "Vestibular da Universidade de São Paulo (USP)",
    badge: "USP / Tradicional & Aprofundada",
    corBadge: "#0d2040",
    icone: "fa-building-columns",
    resumo: "Um dos vestibulares mais concorridos e tradicionais da América Latina. É exigente em fundamentação teórica, raciocínio aprofundado, rigor formal e obras literárias obrigatórias.",
    detalhesGerais: {
      formato: "2 Fases distintas (1ª Fase com 80 questões e 2ª Fase em dois dias dissertativos)",
      primeiraFase: "80 questões de múltipla escolha (duração de 5 horas). Abrange Linguagens, Matemática, Natureza e Humanas com forte interdisciplinaridade.",
      segundaFase: "1º Dia: 10 questões dissertativas de Português e Redação (comum a todos). 2º Dia: 12 questões dissertativas específicas de 2 a 4 disciplinas conforme a carreira escolhida.",
      dicaChave: "Na 1ª fase, velocidade com precisão conceitual. Na 2ª fase, clareza na escrita dissertativa, desenvolvimento lógico dos passos de cálculo e domínio profundo das leituras obrigatórias."
    },
    obrasObrigatorias: {
      ano: "Fuvest 2027",
      descricao: "A lista oficial valoriza grandes autoras e vozes históricas, exigindo leitura analítica que conecte o enredo com seu momento histórico, estilo de época e pautas contemporâneas:",
      lista: [
        { autor: "Nísia Floresta", obra: "Opúsculo Humanitário / Direitos das Mulheres e Injustiça dos Homens", genero: "Ensaio e pioneirismo feminista no Brasil do século XIX" },
        { autor: "Narcisa Amália", obra: "Nebulosas", genero: "Poesia romântica e questionamento social" },
        { autor: "Julia Lopes de Almeida", obra: "A Falência", genero: "Romance naturalista / realismo e decadência da cafeicultura" },
        { autor: "Rachel de Queiroz", obra: "O Quinze", genero: "Regionalismo modernista de 30 e a seca nordestina" },
        { autor: "Clarice Lispector", obra: "A Paixão Segundo G.H. / Laços de Família", genero: "Introspecção psicológica e epifania existencial" },
        { autor: "Sophia de Mello Breyner Andresen", obra: "Coral / Obra Poética Selecionada", genero: "Lirismo português, temas marítimos, liberdade e justiça" },
        { autor: "Paulina Chiziane", obra: "Balada de Amor ao Vento / Niketche", genero: "Literatura moçambicana, polifonia feminina e crítica patriarcal" },
        { autor: "Conceição Evaristo", obra: "Ponciá Vicêncio / Olhos d'Água", genero: "Escrevivência, ancestralidade e memória afro-brasileira" },
        { autor: "Djaimilia Pereira de Almeida", obra: "Esse Cabelo / Luanda, Lisboa, Paraíso", genero: "Autoficção, diáspora, identidade e pós-colonialismo" }
      ]
    },
    areas: [
      {
        id: "fuvest-matematica",
        nome: "Matemática e suas Tecnologias",
        icone: "fa-square-root-variable",
        disciplinas: [
          {
            nome: "Matemática Básica e Funções",
            topicos: [
              "Razão, proporção, porcentagem, regra de três e equações do 1º e 2º graus",
              "Funções: Afim, quadrática, exponencial, logarítmica e modular (gráficos e domínios)",
              "Progressão Aritmética (PA) e Progressão Geométrica (PG)"
            ]
          },
          {
            nome: "Geometria e Trigonometria",
            topicos: [
              "Geometria Plana: Áreas de figuras planas, semelhança de triângulos e teoremas clássicos",
              "Geometria Espacial: Prismas, pirâmides, cilindros, cones, esferas e troncos",
              "Trigonometria: Ciclo trigonométrico, funções sen, cos e tg, identidades e leis dos senos e cossenos",
              "Geometria Analítica: Distância entre pontos, equações da reta e da circunferência"
            ]
          },
          {
            nome: "Probabilidade e Estatística",
            topicos: [
              "Análise combinatória: Princípio fundamental da contagem, arranjos, permutações e combinações",
              "Probabilidade condicional e eventos independentes",
              "Média, moda, mediana e dispersão estatística"
            ]
          }
        ]
      },
      {
        id: "fuvest-natureza",
        nome: "Ciências da Natureza",
        icone: "fa-flask",
        disciplinas: [
          {
            nome: "Biologia",
            topicos: [
              "Ecologia (tema mais cobrado): Fluxo de energia, teias alimentares, ciclos biogeoquímicos, biomas brasileiros e impactos ambientais",
              "Genética e Evolução: Leis de Mendel, DNA, RNA, síntese proteica, teorias evolutivas (Darwinismo e Neodarwinismo)",
              "Fisiologia Humana e Comparada: Sistemas digestório, circulatório, respiratório e imunologia (vacinas e soros)",
              "Citologia: Organelas celulares, respiração celular, fotossíntese e divisão celular (mitose e meiose)"
            ]
          },
          {
            nome: "Física",
            topicos: [
              "Mecânica (Cinemática e Dinâmica): MU, MUV, Leis de Newton, trabalho, potência e conservação da energia mecânica",
              "Termologia: Calorimetria (calor sensível e latente), termodinâmica (1ª e 2ª leis) e gases perfeitos",
              "Eletrodinâmica: Circuitos elétricos, associação de resistores, geradores, potência elétrica e Leis de Ohm",
              "Ondulatória e Óptica: Equação fundamental das ondas (v = λ · f), refração, reflexão total e fenômenos de interferência"
            ]
          },
          {
            nome: "Química",
            topicos: [
              "Físico-Química: Equilíbrio químico (cálculo de pH e pOH), termoquímica, soluções, cinética e eletroquímica (pilhas/eletrólise)",
              "Química Geral: Estrutura atômica, tabela periódica, forças intermoleculares e estequiometria com pureza e rendimento",
              "Química Orgânica: Identificação de funções orgânicas, isomeria plana e espacial, reações de adição, substituição e oxidação"
            ]
          }
        ]
      },
      {
        id: "fuvest-humanas",
        nome: "Ciências Humanas e Sociais Aplicadas",
        icone: "fa-earth-americas",
        disciplinas: [
          {
            nome: "História",
            topicos: [
              "História do Brasil: Brasil Colônia (economia açucareira e escravidão), Império, República Velha, Era Vargas e Ditadura Militar",
              "História Geral: Antiguidade Clássica (democracia em Atenas e República Romana), Idade Moderna (Renascimento e Absolutismo)",
              "Idade Contemporânea: Revolução Francesa, Guerras Mundiais, Guerra Fria e descolonização afro-asiática"
            ]
          },
          {
            nome: "Geografia e Cartografia",
            topicos: [
              "Geografia Física: Climatologia, relevo, hidrografia, solos, biomas brasileiros e dinâmica ambiental global",
              "Geografia Humana e Econômica: Demografia, urbanização brasileira, globalização, geopolítica e agronegócio",
              "Cartografia: Fusos horários, cálculo de escalas e projeções cartográficas (Mercator vs. Peters)"
            ]
          },
          {
            nome: "Filosofia e Sociologia",
            topicos: [
              "Pensamento Filosófico: Filosofia Antiga (Sócrates, Platão e Aristóteles), Racionalismo, Empirismo e Filosofia Contemporânea",
              "Conceitos Sociológicos: Clássicos da Sociologia (Marx, Durkheim e Weber), cultura, cidadania, movimentos sociais, desigualdade e Indústria Cultural"
            ]
          }
        ]
      },
      {
        id: "fuvest-linguagens",
        nome: "Linguagens e suas Tecnologias",
        icone: "fa-pen-fancy",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Interpretação e análise crítica de textos de múltiplos gêneros",
              "Variação linguística, figuras de linguagem, sintaxe e regência",
              "Literatura: Análise profunda das obras literárias obrigatórias nos seus contextos históricos e estéticos (Modernismo, Realismo, Romantismo)"
            ]
          },
          {
            nome: "Língua Inglesa, Arte e Educação Física",
            topicos: [
              "Inglês: Leitura crítica de artigos de atualidades, charges e textos de divulgação científica com vocabulário contextual",
              "História da Arte: Vanguardas europeias e modernismo brasileiro",
              "Educação Física: Patrimônio cultural corporal, mídias e esportes"
            ]
          }
        ]
      }
    ]
  },

  fatec: {
    id: "fatec",
    nome: "FATEC",
    tituloCompleto: "Faculdade de Tecnologia do Estado de São Paulo (Centro Paula Souza)",
    badge: "Tecnologia / Prática / Mercado",
    corBadge: "#1e40af",
    icone: "fa-microchip",
    resumo: "Vestibular voltado à formação tecnológica superior gratuita e aplicada. A prova destaca raciocínio lógico, situações-problema do cotidiano, mercado de trabalho e forte integração de conteúdos.",
    detalhesGerais: {
      formato: "Fase Única (com duração de 5 horas)",
      totalQuestoes: "60 questões de múltipla escolha + 1 Proposta de Redação",
      caracteristicaPrincipal: "Foco intenso em interpretação de textos, dados reais, raciocínio lógico e resolução de problemas práticos.",
      dicaChave: "Atenção ao sistema de PESOS (Peso 1 ou Peso 2) do seu curso: cursos de Tecnologia da Informação dão peso 2 em Matemática e Raciocínio Lógico, enquanto cursos de Gestão podem valorizar Humanas ou Português!"
    },
    redacao: {
      titulo: "Redação da FATEC",
      formato: "Texto dissertativo-argumentativo ou narrativo",
      foco: "Temáticas atuais envolvendo tecnologia, transformação digital, mercado de trabalho, meio ambiente ou comportamento social na era digital.",
      dica: "Apresente argumentos embasados em dados do cotidiano, conectando a teoria à solução de desafios práticos da sociedade contemporânea."
    },
    areas: [
      {
        id: "fatec-especifico",
        nome: "🧩 Núcleo Específico da Prova",
        icone: "fa-brain",
        disciplinas: [
          {
            nome: "Raciocínio Lógico (5 questões)",
            topicos: [
              "Estruturas lógicas e proposições simples e compostas",
              "Conectivos lógicos fundamentais: 'e', 'ou', 'se... então', 'se e somente se'",
              "Negações e equivalências lógicas",
              "Sequências lógicas (numéricas, figurativas e alfabéticas)",
              "Problemas de dedução, associação e verdade/mentira"
            ]
          },
          {
            nome: "Situações-Problema / Interdisciplinares (9 questões)",
            topicos: [
              "Questões transversais que unem Ciências da Natureza, Geografia e Matemática em um mesmo contexto prático",
              "Temas do cotidiano: Consumo energético doméstico e industrial, reciclagem, matrizes sustentáveis",
              "Análise de gráficos multidimensionais e tabelas estatísticas aplicadas à tecnologia e mercado"
            ]
          }
        ]
      },
      {
        id: "fatec-exatas",
        nome: "📐 Exatas e Tecnologias",
        icone: "fa-calculator",
        disciplinas: [
          {
            nome: "Matemática (8 questões)",
            topicos: [
              "Porcentagem, acréscimos e juros simples e compostos",
              "Razão e proporção, regra de três direta e inversa",
              "Expressões algébricas, produtos notáveis e técnicas de fatoração",
              "Funções de 1º e 2º graus e análise comportamental de gráficos",
              "Estatística básica: Médias aritmética e ponderada, leitura de tabelas e gráficos",
              "Geometria plana e espacial: Cálculo de perímetros, áreas de polígonos e volumes de sólidos"
            ]
          },
          {
            nome: "Física (5 questões)",
            topicos: [
              "Cinemática básica: Velocidade média, aceleração escalar, movimento uniforme (MU) e uniformemente variado (MUV)",
              "Leis de Newton e aplicações práticas no cotidiano mecânico",
              "Energia cinética, energia potencial gravitacional e princípio de conservação de energia",
              "Termologia: Calorimetria, capacidade térmica e trocas de calor",
              "Eletrodinâmica básica: Circuitos elétricos residenciais, potência elétrica e cálculo de consumo de energia em kWh"
            ]
          },
          {
            nome: "Química (5 questões)",
            topicos: [
              "Transformações e reações químicas (evidências, conservação de massa e balanceamento)",
              "Estados físicos da matéria e processos de separação de misturas (destilação, filtração, decantação)",
              "Tabela periódica e tipos de ligações químicas (iônica, covalente e metálica)",
              "Estequiometria elementar com proporções em massa",
              "Química Orgânica básica: Reconhecimento prático de funções orgânicas (álcool, éster, ácido carboxílico e hidrocarbonetos)"
            ]
          }
        ]
      },
      {
        id: "fatec-humanas",
        nome: "📜 Ciências Humanas",
        icone: "fa-landmark",
        disciplinas: [
          {
            nome: "História (5 questões)",
            topicos: [
              "Grandes períodos históricos com ênfase na Idade Moderna e Idade Contemporânea",
              "Revoluções Industriais (1ª, 2ª e 3ª/4ª) e seus impactos profundos no mundo do trabalho",
              "História do Brasil: Período Colonial, ciclo cafeeiro, Era Vargas e Ditadura Militar"
            ]
          },
          {
            nome: "Geografia (5 questões)",
            topicos: [
              "Cartografia prática: Escalas, fusos horários e interpretação de plantas/mapas",
              "Território brasileiro: Divisões regionais, biomas e formas de uso e ocupação do solo",
              "Globalização, blocos econômicos e comércio internacional",
              "Fontes de energia convencionais e renováveis e gestão de impactos ambientais"
            ]
          }
        ]
      },
      {
        id: "fatec-linguagens",
        nome: "✍️ Linguagens e Códigos",
        icone: "fa-comments",
        disciplinas: [
          {
            nome: "Língua Portuguesa (8 questões)",
            topicos: [
              "Gêneros e tipos textuais: Interpretação apurada de crônicas, notícias, tirinhas e infográficos",
              "Coesão e coerência textual (uso de conectivos e elipses)",
              "Classes gramaticais e concordâncias nominal e verbal essenciais",
              "Significado de palavras em contexto (polissemia, sinônimos, antônimos e linguagem figurada)"
            ]
          },
          {
            nome: "Língua Inglesa (5 questões)",
            topicos: [
              "Leitura e interpretação de textos do mundo contemporâneo e globalizado (manuais técnicos, e-mails, anúncios e notícias)",
              "Vocabulário técnico voltado a ambientes de inovação, tecnologia e negócios digitais",
              "Compreensão de ideias principais e localização de informações pontuais"
            ]
          }
        ]
      }
    ]
  },

  unicamp: {
    id: "unicamp",
    nome: "UNICAMP",
    tituloCompleto: "Universidade Estadual de Campinas (Comvest)",
    badge: "Crítica / Humanizada / Inovadora",
    corBadge: "#1e3a8a",
    icone: "fa-compass-drafting",
    resumo: "Conhecida por ser um exame moderno, reflexivo, humanizado e socialmente engajado. A prova privilegia a capacidade crítica, a leitura analítica e a sólida articulação de ideias em vez de memorização mecânica de fórmulas.",
    detalhesGerais: {
      formato: "2 Fases estruturadas pela Comvest",
      primeiraFase: "72 questões de múltipla escolha com 4 alternativas cada (distribuídas rigorosamente: 12 Linguagens, 7 História, 7 Geo, 3 Filo, 3 Soc, 7 Fís, 7 Quím, 7 Bio, 12 Mat, 7 Inglês).",
      segundaFase: "1º Dia: Redação (escolha entre 2 propostas de gêneros textuais variados) + 6 questões de Português/Literatura + 2 questões interdisciplinares de Inglês. 2º Dia: Matemática + específicas da área escolhida.",
      dicaChave: "Na Redação, atenção redobrada ao gênero textual solicitado (uma carta aberta, um manifesto, um podcast transcrito ou um discurso têm estruturas distintas!). Em exatas, contextualização e rigor no raciocínio."
    },
    obrasObrigatorias: {
      ano: "Leituras e Obras da Unicamp",
      descricao: "Marca registrada da Unicamp: inclusão de canções, álbuns musicais e textos fundamentais de combate ao racismo e colonialismo, com 9 obras selecionadas:",
      lista: [
        { autor: "Ailton Krenak", obra: "Ideias para adiar o fim do mundo", genero: "Ensaio e cosmovisão indígena contemporânea" },
        { autor: "Machado de Assis", obra: "Casa Velha / Contos consagrados", genero: "Realismo e ironia crítica da elite brasileira" },
        { autor: "Conceição Evaristo", obra: "Olhos d'Água", genero: "Contos de escrevivência e memória negra brasileira" },
        { autor: "Caio Fernando Abreu", obra: "Morangos Mofados", genero: "Contos, contracultura, afetividade e isolamento urbano" },
        { autor: "Lima Barreto", obra: "Vida e Morte de M. J. Gonzaga de Sá / Triste Fim de Policarpo Quaresma", genero: "Pré-modernismo e crítica social feroz do início da República" },
        { autor: "Chimamanda Ngozi Adichie", obra: "No Seu Pescoço", genero: "Contos e reflexões sobre imigração, gênero e identidades" },
        { autor: "Gabriel García Márquez", obra: "Crônica de uma Morte Anunciada", genero: "Realismo mágico e romance trágico hispano-americano" },
        { autor: "José Paulo Paes", obra: "Prosas Seguidas de Quase Poemas", genero: "Poesia moderna e concisão reflexiva" },
        { autor: "Paulo César Pinheiro (Álbum Musical)", obra: "O Canto das Três Raças / Canções Selecionadas", genero: "Música popular brasileira, ancestralidade indígena, africana e branca" }
      ]
    },
    areas: [
      {
        id: "unicamp-estatistica",
        nome: "📚 O que Mais Cai por Disciplina (Estatística da Prova)",
        icone: "fa-chart-pie",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Gêneros textuais diversos (charges, editoriais, cartas, postagens de redes sociais)",
              "Análise profunda das escolas literárias integradas com conflitos sociais e contemporâneos",
              "Intertextualidade e diálogo crítico entre obras literárias e momentos históricos"
            ]
          },
          {
            nome: "Matemática",
            topicos: [
              "Matemática Básica: Razão, proporção, porcentagem e matemática financeira prática",
              "Funções: Comportamento de funções afim, quadrática, modular e exponencial",
              "Probabilidade, contagem e análise minuciosa de gráficos estatísticos",
              "Geometria plana e espacial ligada a problemas da arquitetura ou da natureza"
            ]
          },
          {
            nome: "Ciências Humanas (História, Geografia, Filosofia e Sociologia)",
            topicos: [
              "História do Brasil: Enfoque marcante em escravidão, resistência negra e indígena e Ditadura Militar",
              "História Geral: Idade Moderna e Contemporânea (cidadania, colonialismo e direitos civis)",
              "Geografia: Geopolítica global, problemas socioambientais contemporâneos, urbanização e cartografia analítica",
              "Filosofia e Sociologia: Movimentos sociais, cidadania, Platão e Aristóteles, e pensadores modernos da liberdade e poder"
            ]
          },
          {
            nome: "Ciências da Natureza (Biologia, Física e Química)",
            topicos: [
              "Biologia: Ecologia (relações ecológicas e biomas), Teorias da Evolução e Fisiologia Humana ligada a desafios de saúde pública",
              "Física: Cinemática e movimentos, Eletrodinâmica (circuitos e conservação), Trabalho e Energia no dia a dia",
              "Química: Química Ambiental (poluição, ciclos atmosféricos), Estequiometria aplicada, soluções e reações orgânicas básicas"
            ]
          },
          {
            nome: "Língua Inglesa",
            topicos: [
              "Interpretação de textos autênticos de circulação real (jornais internacionais como The Guardian, publicações científicas e tirinhas)",
              "Capacidade de inferir intenção do autor, ironia e implicações sociais do texto em língua inglesa"
            ]
          }
        ]
      }
    ]
  },

  unesp: {
    id: "unesp",
    nome: "UNESP",
    tituloCompleto: "Universidade Estadual Paulista (Vunesp)",
    badge: "Vunesp / Estadual SP / Interior",
    corBadge: "#0284c7",
    icone: "fa-sun",
    resumo: "Aplicado pela Vunesp, seleciona candidatos para a Universidade Estadual Paulista, com campus espalhados por diversas cidades do estado. Conhecida pela clareza dos enunciados, abordagem interdisciplinar e forte reflexão crítica.",
    detalhesGerais: {
      formato: "2 Fases estruturadas pela Fundação Vunesp",
      primeiraFase: "90 questões objetivas de múltipla escolha com 5 alternativas (30 de Linguagens, 30 de Ciências Humanas e 30 de Ciências da Natureza e Matemática) em 5 horas.",
      segundaFase: "36 questões dissertativas de conhecimentos específicos + 1 Redação dissertativa-argumentativa em Língua Portuguesa.",
      dicaChave: "A Vunesp valoriza respostas objetivas e embasadas. Na redação, a banca sempre propõe uma reflexão profunda e autoral a partir de uma pergunta temática."
    },
    redacao: {
      titulo: "Redação da UNESP (Padrão Vunesp)",
      formato: "Texto dissertativo-argumentativo em até 33 linhas",
      foco: "Temas filosóficos, comportamentais e socioculturais com coletânea rica de textos motivadores.",
      dica: "Apresente tese explícita no primeiro parágrafo, responda com clareza à questão-tema proposta pela banca e utilize repertório diversificado com excelente coesão interparágrafos."
    },
    areas: [
      {
        id: "unesp-linguagens",
        nome: "✍️ Linguagens e Códigos",
        icone: "fa-book-open",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Interpretação minuciosa de crônicas, poemas, tirinhas e editoriais de opinião",
              "Semântica e sintaxe: Orações coordenadas e subordinadas, concordância e regência",
              "Literatura brasileira e portuguesa: Romantismo, Realismo machadiano e Modernismo (Semana de 22 e geração de 30/45)"
            ]
          },
          {
            nome: "Língua Inglesa e Artes",
            topicos: [
              "Leitura crítica de notícias, charges e artigos de divulgação científica",
              "Arte brasileira moderna, vanguardas europeias e patrimônio histórico-cultural"
            ]
          }
        ]
      },
      {
        id: "unesp-humanas",
        nome: "📜 Ciências Humanas",
        icone: "fa-landmark",
        disciplinas: [
          {
            nome: "História",
            topicos: [
              "Brasil Colônia (ciclos econômicos e escravidão), Segundo Reinado, Era Vargas e Ditadura Militar",
              "História Geral: Antiguidade Clássica (Grécia e Roma), Iluminismo, Revolução Industrial e Guerras Mundiais"
            ]
          },
          {
            nome: "Geografia, Filosofia e Sociologia",
            topicos: [
              "Geografia Física: Relevo, climas brasileiros, hidrografia e domínios morfoclimáticos",
              "Geografia Humana: Urbanização, agronegócio e impactos socioambientais no Brasil",
              "Filosofia e Sociologia: Cidadania, ética contemporânea, movimentos sociais e mundo do trabalho"
            ]
          }
        ]
      },
      {
        id: "unesp-exatas-natureza",
        nome: "📐 Ciências da Natureza e Matemática",
        icone: "fa-flask-vial",
        disciplinas: [
          {
            nome: "Matemática",
            topicos: [
              "Matemática Básica: Porcentagem, razão, proporção, regra de três e matemática financeira",
              "Funções (afim, quadrática e exponencial), Geometria Plana e Espacial (áreas e volumes)",
              "Trigonometria, Análise Combinatória e cálculo de probabilidades"
            ]
          },
          {
            nome: "Biologia, Física e Química",
            topicos: [
              "Biologia: Ecologia (biomas e poluição), citologia celular, genética mendeliana e fisiologia humana",
              "Física: Cinemática, Leis de Newton, Conservação de Energia, Circuitos Elétricos e Termologia",
              "Química: Estequiometria, equilíbrio químico, soluções, termoquímica e química orgânica fundamental"
            ]
          }
        ]
      }
    ]
  },

  ita: {
    id: "ita",
    nome: "ITA",
    tituloCompleto: "Instituto Tecnológico de Aeronáutica (DCTA)",
    badge: "Militar / Alta Concorrência / Engenharia",
    corBadge: "#0f172a",
    icone: "fa-jet-fighter",
    resumo: "Focado em carreiras de engenharia de ponta aeroespacial, aeronáutica, mecânica e computação. É considerado um dos vestibulares mais difíceis, rigorosos e concorridos do Brasil, com nível de profundidade e abstração comparável ao ensino superior.",
    detalhesGerais: {
      formato: "2 Fases com altíssimo rigor acadêmico em São José dos Campos e polos nacionais",
      primeiraFase: "60 questões objetivas de múltipla escolha (12 de Matemática, 12 de Física, 12 de Química, 12 de Português e 12 de Inglês - com nota mínima eliminatória de 5,0 em inglês).",
      segundaFase: "Dois dias dissertativos com 10 questões discursivas de Matemática, 10 de Física, 10 de Química e 1 Redação dissertativa.",
      dicaChave: "No ITA, não basta saber a fórmula: é preciso deduzir propriedades e ter base sólida em álgebra vetorial, termodinâmica avançada e eletromagnetismo. Praticar com provas anteriores dos últimos 15 anos é obrigatório."
    },
    redacao: {
      titulo: "Redação do ITA",
      formato: "Texto dissertativo-argumentativo formal",
      foco: "Temáticas de reflexão ética, impactos da ciência e tecnologia na humanidade, filosofia e cidadania.",
      dica: "A banca do ITA preza por raciocínio lógico impecável, maturidade de pensamento, vocabulário refinado e estrutura dissertativa sem clichês."
    },
    areas: [
      {
        id: "ita-matematica",
        nome: "📐 Matemática Avançada ITA",
        icone: "fa-square-root-variable",
        disciplinas: [
          {
            nome: "Álgebra, Geometria e Análise",
            topicos: [
              "Polinômios complexos, relações de Girard e equações algébricas avançadas",
              "Matrizes, determinantes, sistemas lineares com discussão de parâmetros e vetores no R³",
              "Geometria Analítica: Cônicas (elipse, hipérbole, parábola), retas e planos no espaço",
              "Trigonometria avançada: Fórmulas de transformação, arcos múltiplos e equações transcendentais",
              "Análise Combinatória avançada, Princípio da Inclusão-Exclusão e Binômio de Newton"
            ]
          }
        ]
      },
      {
        id: "ita-fisica",
        nome: "⚡ Física Avançada ITA",
        icone: "fa-atom",
        disciplinas: [
          {
            nome: "Mecânica, Termodinâmica e Eletromagnetismo",
            topicos: [
              "Mecânica Clássica: Estática, dinâmica rotacional (momento de inércia e torque), colisões bidimensionais e MHS",
              "Termodinâmica: Ciclo de Carnot, entropia, máquinas térmicas e teoria cinética dos gases ideais",
              "Eletromagnetismo: Lei de Gauss, potencial eletrostático, circuitos R-C, Lei de Faraday-Lenz e indução magnética",
              "Óptica Física e Ondulatória: Interferência de Young, difração, efeito Doppler relativístico e lentes espessas"
            ]
          }
        ]
      },
      {
        id: "ita-quimica",
        nome: "🧪 Química Avançada ITA",
        icone: "fa-flask",
        disciplinas: [
          {
            nome: "Físico-Química e Química Geral",
            topicos: [
              "Termodinâmica Química: Entalpia, energia livre de Gibbs (ΔG) e espontaneidade de processos",
              "Cinética Química: Mecanismos de reação, lei de velocidade integrada e catálise homogênea/heterogênea",
              "Eletroquímica avançada: Equação de Nernst, potenciais de eletrodo e eletrólise quantitativa",
              "Química Quântica básica e estrutura atômica: Hibridização, geometria molecular e orbitais moleculares",
              "Química Orgânica: Mecanismos de reação (SN1, SN2, E1, E2), isomeria óptica e polímeros avançados"
            ]
          }
        ]
      },
      {
        id: "ita-linguagens",
        nome: "✍️ Português, Inglês e Literatura",
        icone: "fa-book",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Obras Literárias",
            topicos: [
              "Interpretação e crítica textual refinada de textos clássicos e acadêmicos",
              "Obras literárias obrigatórias indicadas no edital anual do ITA",
              "Língua Inglesa: Leitura fluente e compreensão profunda de textos técnicos e de atualidades (eliminatória)"
            ]
          }
        ]
      }
    ]
  },

  unb: {
    id: "unb",
    nome: "UnB",
    tituloCompleto: "Universidade de Brasília (Cebraspe)",
    badge: "Centro-Oeste / Modelo Cebraspe / Federal",
    corBadge: "#15803d",
    icone: "fa-landmark-flag",
    resumo: "O vestibular da Universidade de Brasília é a principal porta de entrada para a instituição no Centro-Oeste. Organizado pelo Cebraspe, destaca-se pelo modelo avaliativo de itens (Certo/Errado com anulação) e intensa valorização de temas sociopolíticos e ambientais do Brasil.",
    detalhesGerais: {
      formato: "Dois dias consecutivos de provas no final de semana (Cebraspe)",
      primeiraFase: "Dia 1: Língua Portuguesa, Literatura, Língua Estrangeira e Ciências Humanas + Redação dissertativa em 5 horas.",
      segundaFase: "Dia 2: Matemática, Física, Química e Biologia (Ciências da Natureza e Exatas) em 5 horas.",
      criterioCorrecao: "Itens do Tipo A (Certo/Errado com fator de penalização: uma resposta errada anula uma certa), Tipo B (cálculo de 000 a 999), Tipo C (múltipla escolha tradicional) e Tipo D (resposta discursiva curta).",
      dicaChave: "Nunca chute itens do Tipo A na dúvida! O gerenciamento de risco e a interpretação contextual com foco na cidadania e no cerrado são marcas registradas da UnB."
    },
    redacao: {
      titulo: "Redação da UnB",
      formato: "Texto dissertativo-argumentativo em até 30 linhas",
      foco: "Cidadania, Direitos Humanos, meio ambiente, cultura brasileira e transformações sociais contemporâneas.",
      dica: "Apresente repertório produtivo e demonstre domínio formal da norma culta, articulando causas, consequências e posicionamento crítico maduro."
    },
    areas: [
      {
        id: "unb-dia1",
        nome: "📜 Dia 1: Humanas, Linguagens e Redação",
        icone: "fa-earth-americas",
        disciplinas: [
          {
            nome: "Ciências Humanas e Sociais",
            topicos: [
              "História do Brasil: Formação do Centro-Oeste, construção de Brasília, Ditadura Militar e movimentos sociais",
              "Geografia: O bioma Cerrado (biodiversidade, expansão agropecuária e bacias hidrográficas), geopolítica e urbanização",
              "Filosofia e Sociologia: Direitos Humanos, contratualismo, ética do cuidado e pensadores contemporâneos"
            ]
          },
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Interpretação e coerência textual crítica de múltiplos gêneros (charges, manifestos e artigos)",
              "Leitura analítica e intertextualidade de textos canônicos e contemporâneos da literatura brasileira e universal"
            ]
          }
        ]
      },
      {
        id: "unb-dia2",
        nome: "🧬 Dia 2: Natureza e Matemática",
        icone: "fa-dna",
        disciplinas: [
          {
            nome: "Ciências da Natureza",
            topicos: [
              "Biologia: Ecologia do Cerrado, impactos das queimadas, genética de populações e saúde pública",
              "Física: Mecânica newtoniana, óptica da visão, termodinâmica aplicada e eletromagnetismo sustentável",
              "Química: Química ambiental (poluição de águas e solos), estequiometria, equilíbrios e soluções aquosas"
            ]
          },
          {
            nome: "Matemática",
            topicos: [
              "Itens do Tipo B (cálculo numérico de três dígitos): Álgebra de matrizes, trigonometria e funções",
              "Geometria plana e espacial, análise combinatória e estatística aplicada à interpretação de dados"
            ]
          }
        ]
      }
    ]
  },

  uerj: {
    id: "uerj",
    nome: "UERJ",
    tituloCompleto: "Universidade do Estado do Rio de Janeiro (DSEA)",
    badge: "Rio de Janeiro / Exame Próprio & Cotas",
    corBadge: "#b91c1c",
    icone: "fa-umbrella-beach",
    resumo: "Organizado pela Universidade do Estado do Rio de Janeiro, destaca-se pelo exame de qualificação e discursivo próprios, além do sistema de cotas tradicional. A prova tem forte compromisso social, abordagens interdisciplinares e excelente valorização da literatura.",
    detalhesGerais: {
      formato: "Exame de Qualificação (EQ) + Exame Discursivo (ED)",
      primeiraFase: "Exame de Qualificação: 60 questões objetivas interdisciplinares. O candidato recebe conceito por acertos (A = 20 pontos de bônus, B = 15, C = 10, D = 5).",
      segundaFase: "Exame Discursivo: Prova de Redação (com base em livro literário adotado) + Prova de Língua Portuguesa/Literatura + 2 provas específicas da carreira.",
      dicaChave: "Garantir o Conceito A no Exame de Qualificação garante 20 pontos valiosos para o Exame Discursivo. Leia atentamente as obras literárias indicadas para a redação e para a prova de português."
    },
    redacao: {
      titulo: "Redação da UERJ (Baseada em Romance Literário)",
      formato: "Texto dissertativo-argumentativo com título obrigatório",
      foco: "Discussão temática provocada pelo enredo e conflitos humanos de um livro literário indicado pela universidade.",
      dica: "A UERJ exige originalidade, posicionamento autônomo e excelente fundamentação. O título é obrigatório e deve sintetizar a ideia central do texto com criatividade."
    },
    areas: [
      {
        id: "uerj-qualificacao",
        nome: "🎯 Exame de Qualificação Interdisciplinar",
        icone: "fa-bullseye",
        disciplinas: [
          {
            nome: "Áreas Integradas de Conhecimento",
            topicos: [
              "Linguagens: Interpretação crítica, relações lógicas entre orações, figuras de linguagem e semântica",
              "Ciências Humanas: História do Rio de Janeiro e do Brasil, cidadania, geopolítica e segregação urbana",
              "Ciências da Natureza e Matemática: Raciocínio proporcional, gráficos reais, ecologia e transformações químicas cotidianas"
            ]
          }
        ]
      },
      {
        id: "uerj-discursivo",
        nome: "✍️ Exame Discursivo e Disciplinas Específicas",
        icone: "fa-pen-clip",
        disciplinas: [
          {
            nome: "Língua Portuguesa, Literatura e Redação",
            topicos: [
              "Análise literária aprofundada do romance adotado para a prova de Português e Redação",
              "Redação com título criativo e argumentação consistente conectando a literatura ao mundo real"
            ]
          },
          {
            nome: "Disciplinas Específicas da Carreira",
            topicos: [
              "Exatas (Matemática e Física para Engenharia/Tecnologia): Resolução com memorial de cálculo claro",
              "Biológicas (Biologia e Química para Saúde): Fisiologia, genética, química orgânica e equilíbrio",
              "Humanidades (História e Geografia para Direito/Humanas): Análise histórica e espacial crítica"
            ]
          }
        ]
      }
    ]
  },

  ufpr: {
    id: "ufpr",
    nome: "UFPR",
    tituloCompleto: "Universidade Federal do Paraná (NC-UFPR)",
    badge: "Sul / Federal Paraná / Tradicional",
    corBadge: "#1d4ed8",
    icone: "fa-tree",
    resumo: "Representa um dos grandes exames tradicionais das Universidades Federais do Sul do país. A prova destaca-se pelo rigor metodológico, 1ª fase abrangente e 2ª fase focada em Compreensão e Produção de múltiplos gêneros textuais.",
    detalhesGerais: {
      formato: "2 Fases organizadas pelo Núcleo de Concursos (NC)",
      primeiraFase: "90 questões de múltipla escolha com 5 alternativas em 5h15 (Português, Literatura, Língua Estrangeira, Matemática, Física, Química, Biologia, História, Geografia, Filosofia e Sociologia).",
      segundaFase: "1º Dia: Prova de Compreensão e Produção de Textos (3 questões discursivas de produção textual de gêneros variados). 2º Dia: até 2 provas específicas da carreira.",
      dicaChave: "Na 2ª fase, a UFPR exige atenção máxima ao comando de cada proposta (ex: resumo com limite estrito de linhas ou síntese argumentativa). Exceder ou faltar linhas gera desconto severo de pontos."
    },
    redacao: {
      titulo: "Compreensão e Produção de Textos da UFPR",
      formato: "3 propostas de textos curtos de gêneros distintos",
      foco: "Gêneros como resumo, carta de leitor, manifesto, análise de charge ou resposta argumentativa.",
      dica: "Siga à risca os limites de linhas estabelecidos pela banca e atenda fielmente ao gênero e interlocutor solicitado."
    },
    areas: [
      {
        id: "ufpr-fase1",
        nome: "📚 1ª Fase: Conhecimentos Gerais (90 Questões)",
        icone: "fa-layer-group",
        disciplinas: [
          {
            nome: "Linguagens e Literatura Paranaense/Brasileira",
            topicos: [
              "Lista oficial de leituras obrigatórias da UFPR e contextualização literária",
              "Interpretação textual, gêneros do discurso e mecanismos coesivos",
              "Língua Estrangeira Moderna (Inglês, Espanhol, Francês ou Alemão)"
            ]
          },
          {
            nome: "Ciências Humanas e Sociais",
            topicos: [
              "História do Brasil e do Paraná (ciclos erva-mate, tropeirismo e café), República e Ditadura",
              "Geografia física e humana com ênfase na Região Sul (clima subtropical, araucárias e agropecuária)",
              "Filosofia e Sociologia: Fundamentos da ética, política e cidadania"
            ]
          },
          {
            nome: "Exatas e Ciências da Natureza",
            topicos: [
              "Matemática: Funções, geometria plana e espacial, polinômios e probabilidade",
              "Física: Cinemática, dinâmica, termodinâmica, ondas e óptica geométrica",
              "Química: Físico-química, tabela periódica, cálculos estequiométricos e química orgânica",
              "Biologia: Ecologia, botânica, genética, citologia e fisiologia comparada"
            ]
          }
        ]
      }
    ]
  },

  ufrgs: {
    id: "ufrgs",
    nome: "UFRGS",
    tituloCompleto: "Universidade Federal do Rio Grande do Sul (Coperse)",
    badge: "Sul / Federal Gaúcha / Tradicional",
    corBadge: "#7c2d12",
    icone: "fa-compass",
    resumo: "Representa o grande exame tradicional da Universidade Federal do Rio Grande do Sul. É aplicada em dois dias consecutivos com 15 questões objetivas por disciplina e uma consagrada prova de Redação com foco em reflexão cultural e filosófica.",
    detalhesGerais: {
      formato: "Dois dias consecutivos de prova organizados pela Coperse",
      primeiraFase: "Dia 1: Física (15 q.), Literatura em Língua Portuguesa (15 q.), Língua Estrangeira (15 q.) e Prova de Redação (duração de 5h30).",
      segundaFase: "Dia 2: Língua Portuguesa (15 q.), Biologia (15 q.), Química (15 q.), Geografia (15 q.), História (15 q.) e Matemática (15 q.) (duração de 5h30).",
      dicaChave: "A prova de Literatura da UFRGS é famosa pela exigência de leitura minuciosa de sua lista oficial de 12 Leituras Obrigatórias. A prova de Língua Portuguesa costuma ter foco rigoroso em gramática contextualizada."
    },
    redacao: {
      titulo: "Redação da UFRGS",
      formato: "Texto dissertativo com exigência de título",
      foco: "Temáticas existenciais, culturais, artísticas e filosóficas apresentadas com proposta provocativa.",
      dica: "Apresente ponto de vista claro e reflexivo, demonstre vocabulário maduro e dê um título expressivo que dialogue intimamente com a tese defendida."
    },
    areas: [
      {
        id: "ufrgs-dia1",
        nome: "📖 Dia 1: Física, Literatura, Língua Estrangeira e Redação",
        icone: "fa-book-bookmark",
        disciplinas: [
          {
            nome: "Literatura em Língua Portuguesa (15 questões)",
            topicos: [
              "Lista oficial das 12 obras literárias da UFRGS (poesia, romance, teatro e contos)",
              "Análise de enredo, narrador, tempo, espaço e conexões com escolas literárias"
            ]
          },
          {
            nome: "Física (15 questões) e Língua Estrangeira (15 questões)",
            topicos: [
              "Física: Mecânica newtoniana, calorimetria, eletrostática, circuitos e física moderna",
              "Língua Estrangeira (Inglês ou Espanhol): Vocabulário contextual e compreensão leitora"
            ]
          }
        ]
      },
      {
        id: "ufrgs-dia2",
        nome: "🧬 Dia 2: Português, Natureza, Humanas e Matemática",
        icone: "fa-calculator",
        disciplinas: [
          {
            nome: "Língua Portuguesa (15 q.) e Matemática (15 q.)",
            topicos: [
              "Língua Portuguesa: Análise de estruturas sintáticas, concordância, pontuação expressiva e coesão",
              "Matemática: Funções, geometria analítica, progressões, combinatória e probabilidades"
            ]
          },
          {
            nome: "Biológicas e Humanas (15 q. por disciplina)",
            topicos: [
              "Biologia e Química: Fisiologia humana, ecologia, estequiometria, equilíbrios e compostos de carbono",
              "História e Geografia: História do Rio Grande do Sul e do Brasil (período regencial, Era Vargas), bioma Pampa e geopolítica"
            ]
          }
        ]
      }
    ]
  }
};

const DICAS_ESTUDO_DATA = [
  {
    id: "pomodoro",
    titulo: "Método Pomodoro para Alta Concentração",
    categoria: "Gestão do Tempo",
    icone: "fa-stopwatch",
    resumo: "Estude por 25 minutos em foco pleno e descanse 5 minutos. A cada 4 ciclos, faça uma pausa maior de 15 a 30 minutos.",
    conteudo: [
      "Elimine notificações do celular e deixe apenas o material de estudo na mesa.",
      "Durante os 25 minutos, não troque de aba nem verifique redes sociais.",
      "No intervalo de 5 minutos, levante, beba água e alongue o corpo (não gaste a pausa no celular).",
      "Use o Pomodoro integrado na nossa aba de Ferramentas para cronometrar seus estudos!"
    ]
  },
  {
    id: "feynman",
    titulo: "Técnica Feynman: Aprenda Ensinando",
    categoria: "Fixação e Compreensão",
    icone: "fa-chalkboard-user",
    resumo: "O físico Richard Feynman provou que o jeito mais rápido de aprender um conceito complexo é tentar explicá-lo com palavras simples.",
    conteudo: [
      "Passo 1: Escolha um tópico que você acabou de estudar (ex: Leis de Mendel ou Fotossíntese).",
      "Passo 2: Finja que você está explicando esse conteúdo para uma criança de 10 anos.",
      "Passo 3: Identifique exatamente onde você travou ou precisou usar jargão complicado.",
      "Passo 4: Volte à fonte, preencha as lacunas e reescreva sua explicação de maneira transparente."
    ]
  },
  {
    id: "repeticao-espacada",
    titulo: "Repetição Espaçada e Curva do Esquecimento",
    categoria: "Memória de Longo Prazo",
    icone: "fa-brain",
    resumo: "O cérebro esquece até 70% do conteúdo novo em 48h caso não haja revisão estratégica. Revise em intervalos crescentes para fixar.",
    conteudo: [
      "Revisão 1: 24 horas após o primeiro contato com a matéria (revisão rápida de 10 minutos).",
      "Revisão 2: 7 dias após o estudo inicial (resolução de 3 a 5 exercícios de fixação).",
      "Revisão 3: 30 dias depois (resumo esquemático ou flashcard mental).",
      "Com isso, você transfere o conhecimento da memória de curto prazo para a memória de longo prazo permanente."
    ]
  },
  {
    id: "redacao-vestibular",
    titulo: "Segredos da Redação Nota Máxima",
    categoria: "Redação",
    icone: "fa-pen-nib",
    resumo: "A redação é uma das notas com maior peso nos vestibulares. Uma boa estrutura dissertativa garante segurança e rapidez.",
    conteudo: [
      "Introdução (6 a 7 linhas): Apresente o tema com um repertório contextualizador + tese clara com dois argumentos diretos.",
      "Desenvolvimento 1 (7 a 8 linhas): Aprofunde o argumento 1 com causa, consequência e repertório legítimo.",
      "Desenvolvimento 2 (7 a 8 linhas): Aprofunde o argumento 2 evitando repetição de palavras e mantendo coerência.",
      "Conclusão (ENEM): Proposta de intervenção completa com Agente + Ação + Modo/Meio + Efeito + Detalhamento.",
      "Conclusão (FUVEST/UNICAMP): Síntese reflexiva dos argumentos com fechamento crítico de impacto."
    ]
  },
  {
    id: "ambiente-estudos",
    titulo: "Criando um Ambiente de Estudos Aconchegante",
    categoria: "Rotina & Produtividade",
    icone: "fa-mug-hot",
    resumo: "Seu cérebro associa o espaço físico ao estado mental. Um ambiente iluminado, limpo e acolhedor diminui o cansaço mental.",
    conteudo: [
      "Iluminação: Prefira luz natural ou luminária focada na mesa, evitando reflexos na tela do computador.",
      "Mesa livre de distrações: Deixe apenas caderno, caneta, estojo e uma garrafa com água fresca.",
      "Conforto postural: Mantenha os pés apoiados no chão e a tela do monitor na altura dos olhos para evitar dores no pescoço.",
      "Clima sonoro: Sons de chuva suave, ruído marrom ou instrumental calmo ajudam a bloquear barulhos externos."
    ]
  },
  {
    id: "saude-sono",
    titulo: "Sono, Ansiedade e Saúde do Vestibulando",
    categoria: "Saúde Mental & Bem-Estar",
    icone: "fa-bed",
    resumo: "Estudar sem dormir é ilusão: o sono REM é o momento exato em que o cérebro consolida as memórias e elimina toxinas neurais.",
    conteudo: [
      "Mantenha de 7 a 8 horas de sono regulares. Não sacrifique noites de sono antes dos simulados.",
      "Faça pausas ativas: Uma caminhada rápida de 15 minutos oxigena o cérebro e reduz o cortisol (hormônio do estresse).",
      "Evite telas brilhantes nos 40 minutos anteriores a dormir; prefira ler um capítulo de literatura obrigatória.",
      "Lembre-se: O vestibular é uma maratona de constância e não uma corrida de velocidade de um único dia."
    ]
  }
];

/**
 * BANCO DE QUESTÕES DO JOGO DE ESTUDOS / QUIZ INTERATIVO
 * Com foco especial em questões de Exatas (cálculo/rascunho), Humanas, Natureza e Linguagens
 */
const QUIZ_QUESTIONS = [
  // EXATAS - MATEMÁTICA
  {
    id: "q-mat-1",
    vestibular: "ENEM",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Média",
    enunciado: "Uma fábrica reduziu o preço de um produto em 20%. Meses depois, para retornar ao valor original anterior à redução, o novo preço deverá sofrer um aumento percentual de:",
    alternativas: [
      "20%",
      "22,5%",
      "25%",
      "30%",
      "15%"
    ],
    correta: 2, // 25%
    explicacao: "Dica de conta: Suponha o preço inicial de R$ 100. Com redução de 20%, o preço cai para R$ 80. Para voltar aos R$ 100, é necessário aumentar R$ 20 sobre a base atual de R$ 80. Fazendo o cálculo: 20 / 80 = 1/4 = 0,25 = 25%. Use a lousa de rascunho para rabiscar o raciocínio!",
    dicaConta: true
  },
  {
    id: "q-mat-2",
    vestibular: "FATEC",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Fácil",
    enunciado: "Em uma receita de tinta para pintura de um laboratório escolar, misturam-se 3 partes de tinta azul marinho para cada 5 partes de tinta branca. Se para pintar uma sala inteira foram necessários 40 litros da mistura final, quantos litros de tinta azul marinho foram utilizados?",
    alternativas: [
      "12 litros",
      "15 litros",
      "18 litros",
      "24 litros",
      "25 litros"
    ],
    correta: 1, // 15 litros
    explicacao: "Cálculo proporcional: O total de partes da mistura é 3 + 5 = 8 partes. Cada parte equivale a 40L / 8 = 5 litros. Como a tinta azul corresponde a 3 partes: 3 × 5 = 15 litros de tinta azul marinho. (A branca corresponde a 5 × 5 = 25 litros).",
    dicaConta: true
  },
  {
    id: "q-mat-3",
    vestibular: "FUVEST",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Difícil",
    enunciado: "A função quadrática f(x) = -x² + 6x - 5 modela o lucro em milhares de reais na venda de x centenas de unidades de cadernos escolares. O lucro máximo obtido e a quantidade de unidades vendidas para atingir esse pico são, respectivamente:",
    alternativas: [
      "R$ 4.000 e 300 unidades",
      "R$ 9.000 e 300 unidades",
      "R$ 4.000 e 600 unidades",
      "R$ 5.000 e 500 unidades",
      "R$ 8.000 e 200 unidades"
    ],
    correta: 0, // 4 mil e 300 unid
    explicacao: "O vértice da parábola nos dá o ponto de máximo: Xv = -b / (2a) = -6 / (2 · (-1)) = 3 (ou seja, 3 centenas = 300 unidades). O lucro máximo é Yv = f(3) = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4 milhares de reais = R$ 4.000.",
    dicaConta: true
  },
  {
    id: "q-mat-4",
    vestibular: "UNICAMP",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Média",
    enunciado: "Um estudante precisa escolher 3 livros de uma lista com 7 obras obrigatórias da Unicamp para fazer resumos esta semana. De quantas formas distintas essa seleção de 3 obras pode ser realizada?",
    alternativas: [
      "21 formas",
      "35 formas",
      "42 formas",
      "70 formas",
      "210 formas"
    ],
    correta: 1, // C(7, 3) = 35
    explicacao: "Como a ordem de escolha dos livros não importa, utilizamos Combinação Simples C(n, p): C(7, 3) = 7! / (3! · 4!) = (7 × 6 × 5) / (3 × 2 × 1) = 210 / 6 = 35 formas distintas.",
    dicaConta: true
  },

  // EXATAS - FÍSICA
  {
    id: "q-fis-1",
    vestibular: "ENEM",
    categoria: "Exatas",
    disciplina: "Física",
    dificuldade: "Média",
    enunciado: "Um chuveiro elétrico opera sob uma diferença de potencial de 220 V com uma potência de 4400 W. Se uma pessoa toma um banho de 15 minutos (0,25 hora) todos os dias durante um mês de 30 dias, qual o consumo mensal de energia elétrica desse chuveiro em quilowatt-hora (kWh)?",
    alternativas: [
      "11 kWh",
      "22 kWh",
      "33 kWh",
      "44 kWh",
      "55 kWh"
    ],
    correta: 2, // 33 kWh
    explicacao: "Potência = 4400 W = 4,4 kW. Tempo diário = 0,25 h. Tempo mensal em 30 dias = 30 × 0,25 = 7,5 horas. Energia = Potência × Tempo = 4,4 kW × 7,5 h = 33 kWh. Fazer a conta na lousa facilita não errar as vírgulas!",
    dicaConta: true
  },
  {
    id: "q-fis-2",
    vestibular: "FATEC",
    categoria: "Exatas",
    disciplina: "Física",
    dificuldade: "Fácil",
    enunciado: "Um veículo de testes parte do repouso e atinge uma velocidade de 72 km/h em um intervalo de 10 segundos em linha reta, com aceleração constante. Qual foi a aceleração média do veículo em m/s²?",
    alternativas: [
      "1,5 m/s²",
      "2,0 m/s²",
      "3,6 m/s²",
      "7,2 m/s²",
      "0,5 m/s²"
    ],
    correta: 1, // 2 m/s²
    explicacao: "Primeiro passo: converter a velocidade de km/h para m/s dividindo por 3,6: 72 / 3,6 = 20 m/s. Segundo passo: aceleração a = Δv / Δt = (20 - 0) / 10 = 2 m/s².",
    dicaConta: true
  },

  // EXATAS - QUÍMICA
  {
    id: "q-quim-1",
    vestibular: "ENEM",
    categoria: "Exatas",
    disciplina: "Química",
    dificuldade: "Média",
    enunciado: "Deseja-se preparar 500 mL (0,5 L) de uma solução aquosa de hidróxido de sódio (NaOH) com concentração de 0,2 mol/L. Sabendo que a massa molar do NaOH é 40 g/mol (Na=23, O=16, H=1), qual a massa em gramas de soluto necessária?",
    alternativas: [
      "2,0 g",
      "4,0 g",
      "8,0 g",
      "10,0 g",
      "20,0 g"
    ],
    correta: 1, // 4,0 g
    explicacao: "Fórmula da concentração molar: M = n / V  =>  n = M × V = 0,2 mol/L × 0,5 L = 0,1 mol de NaOH. Como cada mol de NaOH pesa 40 g, a massa necessária é: m = 0,1 mol × 40 g/mol = 4,0 g.",
    dicaConta: true
  },
  {
    id: "q-quim-2",
    vestibular: "FUVEST",
    categoria: "Exatas",
    disciplina: "Química",
    dificuldade: "Média",
    enunciado: "Uma solução com concentração hidrogeniônica [H+] = 10⁻⁴ mol/L a 25°C possui pH e pOH iguais a, respectivamente:",
    alternativas: [
      "pH = 4 e pOH = 10 (meio ácido)",
      "pH = 10 e pOH = 4 (meio básico)",
      "pH = 4 e pOH = 7 (meio neutro)",
      "pH = 7 e pOH = 7 (meio neutro)",
      "pH = 14 e pOH = 4 (meio ácido)"
    ],
    correta: 0,
    explicacao: "Pela definição: pH = -log[H+] = -log(10⁻⁴) = 4. Como a 25°C o produto iônico da água é Kw = 10⁻¹⁴, sabemos que pH + pOH = 14. Portanto: pOH = 14 - 4 = 10. Como pH < 7, o meio é ácido.",
    dicaConta: true
  },

  // CIÊNCIAS DA NATUREZA - BIOLOGIA
  {
    id: "q-bio-1",
    vestibular: "ENEM",
    categoria: "Natureza",
    disciplina: "Biologia",
    dificuldade: "Fácil",
    enunciado: "Em uma teia alimentar contaminada por mercúrio despejado ilegalmente em um rio, qual dos seguintes seres vivos apresentará a maior concentração desse poluente em seus tecidos por conta da bioacumulação/magnificação trófica?",
    alternativas: [
      "Fitoplâncton (produtor primário)",
      "Zooplâncton (consumidor primário)",
      "Peixes herbívoros (consumidores secundários)",
      "Aves piscívoras do topo da cadeia (consumidores terciários)",
      "Bactérias decompositoras de fundo"
    ],
    correta: 3,
    explicacao: "A bioacumulação ou magnificação trófica ocorre com poluentes não biodegradáveis (como metais pesados e pesticidas). Como eles não são eliminados pelo metabolismo, sua concentração aumenta progressivamente ao longo dos níveis tróficos, atingindo seu valor máximo nos predadores do topo da cadeia.",
    dicaConta: false
  },
  {
    id: "q-bio-2",
    vestibular: "UNICAMP",
    categoria: "Natureza",
    disciplina: "Biologia",
    dificuldade: "Média",
    enunciado: "A vacinação difere da aplicação de soro imunológico essencialmente pelo fato de que a vacina:",
    alternativas: [
      "Contém anticorpos prontos, promovendo imunização passiva e temporária.",
      "Contém antígenos atenuados/inativados, estimulando a imunização ativa e memória imunológica.",
      "Deve ser aplicada exclusivamente após a infecção aguda estar instaurada.",
      "Age imediatamente neutralizando toxinas bacterianas circulantes.",
      "Não depende do sistema de linfócitos B e T para conferir proteção."
    ],
    correta: 1,
    explicacao: "A vacina estimula o próprio organismo a produzir anticorpos e células de memória (imunização ativa duradoura). Já o soro introduz anticorpos prontos já produzidos por outro animal para ação emergencial e temporária (imunização passiva).",
    dicaConta: false
  },

  // CIÊNCIAS HUMANAS
  {
    id: "q-hum-1",
    vestibular: "ENEM",
    categoria: "Humanas",
    disciplina: "História",
    dificuldade: "Média",
    enunciado: "A criação da Consolidação das Leis do Trabalho (CLT) em 1943 e a implantação da Companhia Siderúrgica Nacional (CSN) foram marcos centrais de qual período político brasileiro?",
    alternativas: [
      "República Velha (política do café com leite)",
      "Era Vargas (Governo de Getúlio Vargas)",
      "Governo Juscelino Kubitschek (Plano de Metas)",
      "Ditadura Militar (governo Médici)",
      "Primeiro Reinado de Dom Pedro I"
    ],
    correta: 1,
    explicacao: "Getúlio Vargas liderou o processo de modernização do Estado, nacionalismo econômico com indústrias de base (CSN, Vale) e a criação da CLT no Estado Novo, regulamentando a relação entre capital e trabalho sob a tutela do Estado.",
    dicaConta: false
  },
  {
    id: "q-hum-2",
    vestibular: "FUVEST",
    categoria: "Humanas",
    disciplina: "Geografia",
    dificuldade: "Média",
    enunciado: "O fenômeno urbano caracterizado pela expansão contínua da mancha urbana de duas ou mais cidades vizinhas, que chegam a se integrar fisicamente formando um tecido metropolitano único, denomina-se:",
    alternativas: [
      "Gentrificação",
      "Macrocefalia urbana",
      "Conurbação",
      "Segregação socioespacial",
      "Hierarquia descentralizada"
    ],
    correta: 2,
    explicacao: "Conurbação é a união física entre duas ou mais cidades contíguas provocada pelo crescimento urbano horizontal, resultando em intensa dinâmica metropolitana integrada (como acontece na Grande São Paulo).",
    dicaConta: false
  },
  {
    id: "q-hum-3",
    vestibular: "UNICAMP",
    categoria: "Humanas",
    disciplina: "Filosofia e Sociologia",
    dificuldade: "Média",
    enunciado: "O conceito sociológico de 'Indústria Cultural', desenvolvido pelos filósofos Theodor Adorno e Max Horkheimer da Escola de Frankfurt, refere-se:",
    alternativas: [
      "À valorização e preservação das tradições folclóricas populares.",
      "À transformação da arte e dos bens simbólicos em mercadorias padronizadas voltadas ao consumo passivo e alienação.",
      "Ao uso da inteligência artificial na automação industrial.",
      "Ao processo de alfabetização em massa no início do século XX.",
      "À promoção da diversidade cultural pelas emissoras públicas de rádio."
    ],
    correta: 1,
    explicacao: "Para a Teoria Crítica (Escola de Frankfurt), a Indústria Cultural subordina a criação cultural à lógica mercantil, produzindo conteúdos padronizados e mastigados que anestesiam o senso crítico dos indivíduos.",
    dicaConta: false
  },

  // LINGUAGENS & OBRAS
  {
    id: "q-ling-1",
    vestibular: "FUVEST",
    categoria: "Linguagens",
    disciplina: "Literatura",
    dificuldade: "Média",
    enunciado: "Na obra 'Ponciá Vicêncio', de Conceição Evaristo (leitura obrigatória Fuvest/Unicamp), a narrativa aborda centralmente:",
    alternativas: [
      "A vida boêmia e romântica dos poetas parnasianos do século XIX.",
      "A memória, o desenraizamento e a busca por identidade de uma mulher negra marcada pela herança da escravidão.",
      "A crítica irônica à decadência da aristocracia cafeeira paulista.",
      "Uma ficção científica distópica ambientada no sertão nordestino.",
      "O lirismo intimista sobre temas marítimos portugueses."
    ],
    correta: 1,
    explicacao: "Conceição Evaristo constrói com sua 'escrevivência' a trajetória de Ponciá Vicêncio, que sai do vilarejo rural rumo à cidade grande, lidando com solidão, perda de referências ancestrais e a luta por reconhecimento da identidade negra.",
    dicaConta: false
  },
  {
    id: "q-ling-2",
    vestibular: "FATEC",
    categoria: "Linguagens",
    disciplina: "Língua Portuguesa",
    dificuldade: "Fácil",
    enunciado: "Na frase 'Ele tinha um mar de dúvidas na cabeça antes de começar o vestibular', a figura de linguagem presente na expressão 'mar de dúvidas' é classificada como:",
    alternativas: [
      "Metáfora (comparação implícita sem conectivo)",
      "Eufemismo (suavização de uma ideia desagradável)",
      "Pleonasmo (redundância desnecessária)",
      "Antítese (aproximação de ideias opostas)",
      "Onomatopeia (reprodução de um som)"
    ],
    correta: 0,
    explicacao: "Trata-se de uma metáfora: atribui-se ao volume de dúvidas a imensidão e profundeza de um mar, por analogia subjetiva, sem usar termos comparativos explícitos como 'tal qual' ou 'como'.",
    dicaConta: false
  },

  // QUESTÕES DOS NOVOS VESTIBULARES (UNESP, ITA, UNB, UERJ, UFPR, UFRGS)
  {
    id: "q-ita-1",
    vestibular: "ITA",
    categoria: "Exatas",
    disciplina: "Física",
    dificuldade: "Difícil",
    enunciado: "Um bloco de massa m = 2,0 kg repousa sobre um plano horizontal com coeficiente de atrito estático μe = 0,4 e cinético μc = 0,3. Adote g = 10 m/s². Aplica-se horizontalmente uma força constante F = 10,0 N. Qual o módulo da aceleração adquirida pelo bloco?",
    alternativas: [
      "0 m/s² (o bloco permanece em repouso)",
      "1,0 m/s²",
      "2,0 m/s²",
      "3,5 m/s²",
      "5,0 m/s²"
    ],
    correta: 0,
    explicacao: "Raciocínio clássico de estática do ITA: A força de atrito estático máxima é Fat_máx = μe · N = μe · m · g = 0,4 × 2,0 × 10 = 8,0 N... Opa! Como a força aplicada F = 10 N é maior que 8 N, o bloco entra em movimento! Então atua o atrito cinético: Fat_c = μc · m · g = 0,3 × 2,0 × 10 = 6,0 N. A força resultante é Fr = F - Fat_c = 10 - 6 = 4 N. Pela 2ª Lei de Newton: a = Fr / m = 4 / 2 = 2,0 m/s². Parabéns! Use a lousa para fazer o diagrama do corpo livre!",
    dicaConta: true
  },
  {
    id: "q-ita-2",
    vestibular: "ITA",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Difícil",
    enunciado: "Se log₂(x) + log₄(x) = 6, o valor real positivo de x que satisfaz essa equação logarítmica é:",
    alternativas: [
      "x = 8",
      "x = 16",
      "x = 32",
      "x = 64",
      "x = 128"
    ],
    correta: 1, // log4(x) = log2(x)/2. Então 1,5 * log2(x) = 6 => log2(x) = 4 => x = 16.
    explicacao: "Mudança de base: log₄(x) = log₂(x) / log₂(4) = log₂(x) / 2. Assim: log₂(x) + log₂(x) / 2 = 6  =>  (3/2) · log₂(x) = 6  =>  log₂(x) = (6 × 2) / 3 = 4. Portanto: x = 2⁴ = 16. Rabisque a equação na lousa de rascunho para visualizar cada passo!",
    dicaConta: true
  },
  {
    id: "q-unesp-1",
    vestibular: "UNESP",
    categoria: "Humanas",
    disciplina: "Geografia",
    dificuldade: "Média",
    enunciado: "O estado de São Paulo apresenta expressiva diversidade produtiva agrícola. No interior paulista, a expansão de qual monocultura esteve historicamente e economicamente atrelada à produção sucroalcooleira de bioetanol e açúcar?",
    alternativas: [
      "Soja transgênica",
      "Cana-de-açúcar",
      "Café arábica irrigado",
      "Milho safrinha",
      "Eucalipto para celulose"
    ],
    correta: 1,
    explicacao: "A cana-de-açúcar é a principal lavoura do agronegócio do interior paulista (Ribeirão Preto, Sertãozinho, Piracicaba), abastecendo usinas do setor sucroenergético para produção de açúcar e etanol combustível.",
    dicaConta: false
  },
  {
    id: "q-unb-1",
    vestibular: "UnB",
    categoria: "Natureza",
    disciplina: "Biologia",
    dificuldade: "Média",
    enunciado: "O bioma Cerrado, predominante no planalto central do Brasil, é conhecido como o 'berço das águas'. As árvores típicas desse ecossistema possuem troncos tortuosos, casca grossa e raízes profundas principalmente devido:",
    alternativas: [
      "À escassez permanente de água no subsolo ao longo de todo o ano.",
      "À adaptação ao fogo periódico natural e ao solo profundo com alta acidez e toxicidade por alumínio.",
      "À baixa incidência de radiação solar na região tropical.",
      "Ao excesso de matéria orgânica húmica acumulada no solo.",
      "À ocorrência frequente de geadas durante o inverno."
    ],
    correta: 1,
    explicacao: "As árvores do Cerrado são escleromórficas oligotróficas: a casca suberosa grossa protege as gemas contra incêndios sazonais rápidos e as raízes profundas acessam o lençol freático, enquanto a tortuosidade é influenciada pelo solo ácido e rico em alumínio.",
    dicaConta: false
  },
  {
    id: "q-uerj-1",
    vestibular: "UERJ",
    categoria: "Humanas",
    disciplina: "História",
    dificuldade: "Média",
    enunciado: "A Revolta da Vacina, ocorrida na cidade do Rio de Janeiro em 1904 durante a gestão do prefeito Pereira Passos, teve como estopim popular não apenas a obrigatoriedade da vacinação antivariólica, mas sobretudo:",
    alternativas: [
      "A oposição ao fim da escravidão no meio urbano.",
      "O descontentamento popular com as demolições do 'bota-abaixo' e o encarecimento do custo de vida com o saneamento autoritário.",
      "A proclamação da independência do estado da Guanabara.",
      "A revolta dos militares do Forte de Copacabana contra o presidente.",
      "A escassez de alimentos provocada pela Primeira Guerra Mundial."
    ],
    correta: 1,
    explicacao: "A reforma urbana de Pereira Passos demoliu cortiços no centro da capital federal sem reassentamento das classes populares (expulsando-as para os morros), gerando tensão que explodiu quando a vacina obrigatória de Oswaldo Cruz foi imposta de forma policialesca.",
    dicaConta: false
  },
  {
    id: "q-sul-1",
    vestibular: "UFPR",
    categoria: "Linguagens",
    disciplina: "Literatura",
    dificuldade: "Média",
    enunciado: "Nas provas de Literatura da UFPR e da UFRGS, a análise das listas de obras literárias obrigatórias exige do estudante:",
    alternativas: [
      "Apenas a memorização do resumo biográfico dos autores.",
      "Capacidade analítica de relacionar a estrutura formal da obra ao contexto histórico, social e estético do período em que foi produzida.",
      "Identificação mecânica de figuras de sintaxe sem leitura do enredo.",
      "A memorização de trechos decorados dos poemas.",
      "Comparação restrita a obras estrangeiras contemporâneas em inglês."
    ],
    correta: 1,
    explicacao: "Tanto a UFPR quanto a UFRGS elaboram questões profundas sobre narrador, escolhas estilísticas, temas políticos/sociais e diálogo estético com o momento de circulação da obra.",
    dicaConta: false
  }
];


