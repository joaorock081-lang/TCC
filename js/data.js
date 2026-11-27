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
  },
  ufmg: {
    id: "ufmg",
    nome: "UFMG",
    tituloCompleto: "Universidade Federal de Minas Gerais",
    badge: "Federal • SiSU & Habilidades",
    corBadge: "#b91c1c",
    icone: "fa-landmark",
    resumo: "Uma das instituições mais prestigiadas da América Latina. O ingresso ocorre prioritariamente pelo SiSU/ENEM com pesos específicos e notas de corte concorridíssimas, além de provas de habilidades específicas para cursos artísticos e arquitetura.",
    detalhesGerais: {
      formato: "Via ENEM / SiSU (1ª chamada no início do ano) + Provas Complementares para Música/Design/Teatro",
      totalQuestoes: "Utiliza as 180 questões do ENEM + Redação",
      criterioCorrecao: "Pesos ponderados por área conforme o curso escolhido (Ex: Medicina peso 4 em Natureza e Redação)",
      dicaChave: "Para cursos de alta concorrência na UFMG, a Redação e a área de Ciências da Natureza/Matemática definem a aprovação pela pontuação no SiSU."
    },
    redacao: {
      titulo: "Redação UFMG (Padrão ENEM)",
      descricao: "Nota da Redação do ENEM com peso de até 4x no SiSU da UFMG.",
      competencias: [
        { num: 1, nome: "Norma Culta", desc: "Correção gramatical rigorosa" },
        { num: 2, nome: "Repertório Sociocultural", desc: "Aplicação produtiva de filósofos e sociólogos" },
        { num: 3, nome: "Projeto de Texto", desc: "Planejamento argumentativo e teses claras" },
        { num: 4, nome: "Coesão Textual", desc: "Operadores argumentativos interparágrafos" },
        { num: 5, nome: "Proposta Completa", desc: "Agente, Ação, Meio/Modo, Efeito e Detalhamento" }
      ]
    },
    areas: [
      {
        nome: "Ciências da Natureza & Saúde",
        icone: "fa-dna",
        disciplinas: [
          {
            nome: "Biologia e Bioquímica (Peso Máximo para Medicina)",
            topicos: [
              "Fisiologia e Anatomia Humana (sistemas endócrino, cardiovascular, renal e nervoso)",
              "Genética Clássica, Biologia Molecular e Engenharia Genética",
              "Ecologia Aplicada, Biomas Brasileiros (Cerrado e Mata Atlântica) e Impactos Ambientais",
              "Citologia: metabolismo energético (fotossíntese, fermentação e respiração celular)",
              "Evolução Biológica, especiação e teorias evolutivas"
            ]
          },
          {
            nome: "Química Geral e Orgânica",
            topicos: [
              "Estequiometria com pureza, rendimento e reagente limitante",
              "Físico-Química: Soluções, concentração molar, termoquímica e equilíbrios químicos",
              "Química Orgânica: Funções oxigenadas e nitrogenadas, isomeria e reações orgânicas",
              "Eletroquímica: Pilhas, eletrólise ígnea e aquosa, potenciais de redução"
            ]
          }
        ]
      },
      {
        nome: "Ciências Exatas & Tecnologia",
        icone: "fa-calculator",
        disciplinas: [
          {
            nome: "Matemática e Suas Tecnologias",
            topicos: [
              "Funções Afim, Quadrática, Exponencial e Logarítmica",
              "Geometria Espacial (prismas, cilindros, cones, esferas) e Geometria Plana",
              "Estatística Descritiva: Média ponderada, mediana, moda e desvio padrão",
              "Matemática Financeira e Análise Combinatória com Probabilidade"
            ]
          },
          {
            nome: "Física Clássica e Moderna",
            topicos: [
              "Mecânica: Dinâmica Newtoniana, trabalho, energia e conservação da quantidade de movimento",
              "Termologia: Calorimetria, dilatação térmica e Leis da Termodinâmica",
              "Óptica Geométrica e Ondulatória (interferência, difração e refração)",
              "Eletrodinâmica: Circuitos elétricos, Lei de Ohm e potência elétrica consumida"
            ]
          }
        ]
      },
      {
        nome: "Ciências Humanas e Sociais",
        icone: "fa-book-atlas",
        disciplinas: [
          {
            nome: "História e Geografia de Minas e do Brasil",
            topicos: [
              "Ciclo do Ouro e Sociedade Mineradora no século XVIII em Minas Gerais",
              "Inconfidência Mineira e processos de emancipação política",
              "Revolução de 1930, Estado Novo e República Populista",
              "Geografia Econômica: Quadrilátero Ferrífero, mineração, agropecuária e bacias hidrográficas",
              "Urbanização e industrialização brasileira no século XX"
            ]
          }
        ]
      }
    ]
  },
  ufsc: {
    id: "ufsc",
    nome: "UFSC",
    tituloCompleto: "Universidade Federal de Santa Catarina",
    badge: "Vestibular Unificado UFSC/IFSC",
    corBadge: "#047857",
    icone: "fa-compass",
    resumo: "Conhecida por seu vestibular tradicional unificado com o IFSC. É famosa pelo modelo de questões de proposições múltiplas (somatória), onde cada alternativa tem valor binário (01, 02, 04, 08, 16, 32) e o candidato deve assinalar o somatório exato das corretas.",
    detalhesGerais: {
      formato: "2 Tardes de Provas no final de semana (Provas Objetivas de Somatória + Questões Discursivas + Redação)",
      totalQuestoes: "80 proposições somatórias + Redação + 4 questões discursivas",
      criterioCorrecao: "Pontuação proporcional para somatórias parcialmente corretas (sem assinalar itens falsos)",
      dicaChave: "Nas questões de somatória, nunca chute se tiver dúvida: marcar uma proposição errada penaliza severamente o escore da questão."
    },
    redacao: {
      titulo: "Redação UFSC: Gêneros Textuais Variados",
      descricao: "A banca propõe escolha entre 3 gêneros textuais (artigo de opinião, crônica, carta ou conto reflexivo).",
      competencias: [
        { num: 1, nome: "Adequação ao Gênero", desc: "Seguir fielmente as convenções estruturais do gênero escolhido." },
        { num: 2, nome: "Articulação de Ideias", desc: "Progressão temática fluida e coesão textual sólida." },
        { num: 3, nome: "Expressão Escrita Formal", desc: "Riqueza vocabular e correção léxico-gramatical." }
      ]
    },
    areas: [
      {
        nome: "Exatas e Tecnologias",
        icone: "fa-atom",
        disciplinas: [
          {
            nome: "Matemática e Física de Somatória",
            topicos: [
              "Trigonometria e Análise de Funções Trigonométricas",
              "Polinômios, Equações Algébricas e Números Complexos",
              "Física Térmica e Hidrostática (Princípio de Pascal e Empuxo de Arquimedes)",
              "Eletromagnetismo: Campo magnético, força de Lorentz e indução de Faraday"
            ]
          }
        ]
      },
      {
        nome: "Biológicas, Químicas e Meio Ambiente",
        icone: "fa-leaf",
        disciplinas: [
          {
            nome: "Biologia e Química Geral",
            topicos: [
              "Ecologia Marinha e Costeira: Manguezais, restingas e ecossistemas do litoral sul",
              "Zoologia e Fisiologia Comparada de Vertebrados e Invertebrados",
              "Equilíbrio Iônico: pH, pOH, hidrólise salina e soluções tampão",
              "Química Ambiental: Chuva ácida, efeito estufa e tratamento de efluentes"
            ]
          }
        ]
      },
      {
        nome: "Humanas, Literatura Catarinense e Linguagens",
        icone: "fa-feather",
        disciplinas: [
          {
            nome: "Língua Portuguesa, Literatura e História do Sul",
            topicos: [
              "Obras Literárias de Leitura Obrigatória indicadas pela Coperve/UFSC",
              "Colonização e Povoamento do Sul do Brasil: Imigração açoriana, alemã e italiana",
              "Guerra dos Farrapos e Guerra do Contestado em território catarinense",
              "Análise de textos contemporâneos e variação linguística regional"
            ]
          }
        ]
      }
    ]
  },
  ime: {
    id: "ime",
    nome: "IME",
    tituloCompleto: "Instituto Militar de Engenharia",
    badge: "Militar • Nível Olímpico",
    corBadge: "#0f172a",
    icone: "fa-shield-halved",
    resumo: "Localizado na Praia Vermelha (Rio de Janeiro), o IME forma engenheiros civis e militares com rigor matemático supremo. Ao lado do ITA, é um dos vestibulares mais difíceis do mundo.",
    detalhesGerais: {
      formato: "1ª Fase Objetiva eliminatória (40 questões de Mat/Fís/Quím) + 2ª Fase Discursiva de 4 dias",
      totalQuestoes: "40 questões objetivas (1ª fase) + Provas discursivas com 10 questões complexas por dia",
      criterioCorrecao: "Critério estrito com pontuação parcial por desenvolvimento coerente nas etapas analíticas",
      dicaChave: "Domine demonstrações formais de teoremas, geometria espacial e plana avançada, e cálculo conceitual."
    },
    redacao: {
      titulo: "Redação IME: Dissertação Formal Argumentativa",
      descricao: "Texto dissertativo sobre valores cívicos, ética científica, liderança, tecnologia de defesa ou desafios civilizatórios.",
      competencias: [
        { num: 1, nome: "Rigor Argumentativo", desc: "Clareza lógica sem contradições conceituais." },
        { num: 2, nome: "Norma Padrão Culta", desc: "Vocabulário formal e domínio de sintaxe complexa." }
      ]
    },
    areas: [
      {
        nome: "Matemática Pura e Aplicada (Avançado)",
        icone: "fa-square-root-variable",
        disciplinas: [
          {
            nome: "Álgebra, Análise e Geometria do IME",
            topicos: [
              "Polinômios complexos, Teorema Fundamental da Álgebra e Relações de Girard",
              "Sistemas Lineares e Álgebra Matricial: Determinantes, Teorema de Laplace e Matriz Inversa",
              "Geometria Analítica no R³: Equações da reta, plano, distâncias e esferas",
              "Trigonometria Avançada: Transformações, identidades de Prostaférese e equações angulares",
              "Indução Matemática e Teoria Elementar dos Números (Congruência e MDC)"
            ]
          }
        ]
      },
      {
        nome: "Física e Engenharia Básica",
        icone: "fa-bolt-lightning",
        disciplinas: [
          {
            nome: "Mecânica Racional e Física Geral",
            topicos: [
              "Cinemática Vetorial e Movimento em Coordenadas Polares e Intrínsecas",
              "Dinâmica de Corpos Rígidos, Momento de Inércia e Torque",
              "Oscilações Mecânicas: MHS acoplado, amortecimento e ressonância",
              "Gravitação Universal e Órbitas Keplerianas elípticas e hiperbólicas",
              "Termodinâmica de Gases Reais, Ciclos de Carnot e Entropia Estatística"
            ]
          }
        ]
      },
      {
        nome: "Química Teórica e Estrutural",
        icone: "fa-flask-vial",
        disciplinas: [
          {
            nome: "Físico-Química e Química Inorgânica",
            topicos: [
              "Cinética Química: Mecanismos de reação, ordem de reação e Lei de Arrhenius",
              "Equilíbrio Químico em Fase Gasosa (Kp, Kc) e Heterogêneo",
              "Termoquímica e Eletroquímica: Equação de Nernst e Pilhas em condições não-padrão",
              "Teoria Quântica do Átomo, orbitais híbridos e Geometria Molecular VSEPR"
            ]
          }
        ]
      }
    ]
  },
  uece: {
    id: "uece",
    nome: "UECE",
    tituloCompleto: "Universidade Estadual do Ceará",
    badge: "Estadual • Nordeste de Excelência",
    corBadge: "#ea580c",
    icone: "fa-sun",
    resumo: "A principal universidade estadual do Ceará, com vestibular próprio tradicional e concorrido, especialmente para Medicina e Ciências da Saúde em Fortaleza e interior.",
    detalhesGerais: {
      formato: "2 Fases: 1ª Fase com 85 questões objetivas gerais + 2ª Fase com 3 provas específicas + Redação",
      totalQuestoes: "85 questões gerais (1ª fase) + 60 questões específicas discursivas/objetivas (2ª fase)",
      criterioCorrecao: "Média ponderada com corte por pontos específicos de cada carreira",
      dicaChave: "Na UECE, Biologia e Química cobram detalhes conceituais precisos de botânica, zoologia e química analítica."
    },
    redacao: {
      titulo: "Redação UECE: Dois Temas para Escolha",
      descricao: "A banca apresenta duas propostas completas de gêneros distintos (geralmente Artigo de Opinião ou Crônica/Carta).",
      competencias: [
        { num: 1, nome: "Compreensão da Proposta", desc: "Atendimento estrito ao gênero e tema selecionado." },
        { num: 2, nome: "Coesão e Coerência", desc: "Articulação lógica sem rodeios e pontuação impecável." },
        { num: 3, nome: "Criatividade e Autoria", desc: "Voz própria, maturidade de pensamento e expressividade." }
      ]
    },
    areas: [
      {
        nome: "Ciências Biológicas e da Saúde",
        icone: "fa-heart-pulse",
        disciplinas: [
          {
            nome: "Biologia Clássica e Botânica da UECE",
            topicos: [
              "Fisiologia e Morfologia Vegetal: Transpiração, condução de seiva e fitormônios",
              "Bioma Caatinga: Adaptações das plantas xerófitas e fauna do semiárido",
              "Parasitologia Humana: Doença de Chagas, Leishmaniose, Dengue e Esquistossomose",
              "Genética Mendeliana e Grupos Sanguíneos (Sistema ABO e fator Rh)"
            ]
          }
        ]
      },
      {
        nome: "Humanidades e Identidade Nordestina",
        icone: "fa-masks-theater",
        disciplinas: [
          {
            nome: "História e Geografia do Ceará e Nordeste",
            topicos: [
              "Secas no Nordeste e Políticas Públicas de Recursos Hídricos (Transposição do Rio São Francisco)",
              "História do Ceará: Confederação do Equador e Abolição pioneira dos escravizados em Redenção (1884)",
              "Cultura Popular Nordestina: Cordel, xilogravura e movimentos sociais (Caldeirão e Canudos)",
              "Geografia Urbana de Fortaleza e desenvolvimento do Complexo Portuário do Pecém"
            ]
          }
        ]
      },
      {
        nome: "Linguagens e Exatas Fundamentais",
        icone: "fa-pen-ruler",
        disciplinas: [
          {
            nome: "Língua Portuguesa, Literatura e Matemática",
            topicos: [
              "Romantismo e Regionalismo na Literatura Cearense (José de Alencar, Rachel de Queiroz, Patativa do Assaré)",
              "Sintaxe de Período Composto e Emprego dos Pronomes Relativos",
              "Geometria Euclidiana Plana e Trigonometria no Triângulo Retângulo",
              "Progressões Aritméticas (PA) e Geométricas (PG) aplicadas a problemas práticos"
            ]
          }
        ]
      }
    ]
  },

  // 15. FUNDAÇÃO SANTO ANDRÉ (FSA) - PRIVADA / COMUNITÁRIA (ABC PAULISTA)
  fsa: {
    id: "fsa",
    nome: "FSA",
    tituloCompleto: "Fundação Santo André (Centro Universitário FSA)",
    badge: "Comunitária & Privada • ABC Paulista",
    corBadge: "#1e40af",
    icone: "fa-building-columns",
    resumo: "Tradicional centro universitário comunitário localizado no Grande ABC (Santo André/SP). Reconhecido pelos cursos de Engenharia, Psicologia, Direito, Computação, Administração, Arquitetura e Licenciaturas, com processo seletivo próprio e bolsas ProUni/FIES.",
    detalhesGerais: {
      formato: "Prova Presencial ou Agendada com 40 a 50 questões de múltipla escolha + Redação dissertativa, ou aproveitamento da nota do ENEM",
      totalQuestoes: "40 a 50 questões objetivas interdisciplinares + Redação em prosa",
      criterioCorrecao: "Pontuação proporcional por disciplina com corte unificado e avaliação da capacidade expressiva na redação",
      dicaChave: "A prova da FSA valoriza sólida interpretação de texto, raciocínio lógico-matemático e redação voltada a temas sociais do cotidiano brasileiro e cidadania."
    },
    redacao: {
      titulo: "Redação da Fundação Santo André (FSA)",
      descricao: "Texto dissertativo-argumentativo em até 30 linhas com temática atual de ordem social, tecnológica, cidadã ou ambiental.",
      competencias: [
        { num: 1, nome: "Estrutura Dissertativa", desc: "Introdução com tese clara, desenvolvimento consistente com argumentos e conclusão reflexiva." },
        { num: 2, nome: "Coesão e Norma Culta", desc: "Clareza vocabular, bom emprego de conectivos, concordância e regência verbal." },
        { num: 3, nome: "Repertório e Atualidades", desc: "Capacidade de relacionar fatos do cotidiano e propor soluções éticas para a coletividade." }
      ]
    },
    areas: [
      {
        nome: "Ciências Humanas, Sociais e Atualidades",
        icone: "fa-earth-americas",
        disciplinas: [
          {
            nome: "História Geral, do Brasil e do ABC Paulista",
            topicos: [
              "Industrialização Brasileira e a Formação do Polo Industrial e Automobilístico do Grande ABC",
              "Ditadura Militar, Movimentos Sindicais do ABC e o Processo de Redemocratização (Diretas Já)",
              "Era Vargas: Legislação trabalhista (CLT), nacionalismo econômico e expansão urbana",
              "Cidadania, Direitos Humanos e Diversidade Cultural na Sociedade Brasileira Contemporânea"
            ]
          },
          {
            nome: "Geografia Econômica, Urbana e Meio Ambiente",
            topicos: [
              "Dinâmica Urbana da Região Metropolitana de São Paulo: Conurbação, mobilidade e habitação",
              "Processo de Desindustrialização Relativa e Crescimento do Setor Terciário de Serviços",
              "Impactos Ambientais Urbanos: Enchentes, ilhas de calor, gestão de resíduos sólidos e saneamento",
              "Geopolítica e Globalização: Blocos econômicos, cadeias produtivas globais e sustentabilidade"
            ]
          }
        ]
      },
      {
        nome: "Linguagens, Códigos e Comunicação",
        icone: "fa-book-open",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura Brasileira",
            topicos: [
              "Leitura e Interpretação de Textos: Identificação de tese, inferência de sentido e intertextualidade",
              "Modernismo no Brasil (Semana de 22) e Tendências da Literatura Contemporânea",
              "Figuras de Linguagem: Metáfora, metonímia, antítese, paradoxo, ironia e eufemismo",
              "Sintaxe de Concordância (Verbal e Nominal) e Emprego do Acento Grave Indicativo de Crase"
            ]
          },
          {
            nome: "Língua Inglesa Instrumental",
            topicos: [
              "Compreensão de Textos Autênticos em Inglês: Notícias, artigos de opinião e divulgação científica",
              "Técnicas de Leitura: Skimming, scanning e identificação de falsos cognatos (false friends)"
            ]
          }
        ]
      },
      {
        nome: "Ciências Exatas, Tecnológicas e da Natureza",
        icone: "fa-calculator",
        disciplinas: [
          {
            nome: "Matemática Aplicada e Raciocínio Lógico",
            topicos: [
              "Matemática Financeira Básica: Porcentagem, acréscimos, descontos sucessivos e juros simples",
              "Funções de 1º e 2º Graus: Gráficos, raízes, vértice da parábola e problemas de maximização de lucro",
              "Estatística Descritiva: Leitura de gráficos de barras/setores, cálculo de média, moda e mediana",
              "Geometria Plana e Espacial: Cálculo de áreas (triângulos, círculos) e volumes (prismas, cilindros)"
            ]
          },
          {
            nome: "Física e Química Aplicadas ao Cotidiano",
            topicos: [
              "Cinemática e Dinâmica: Velocidade média, aceleração e Aplicações das Leis de Newton",
              "Eletricidade Residencial: Tensão, corrente, potência elétrica e cálculo de consumo em kWh",
              "Química Geral e Soluções: Concentração em g/L e mol/L, pH, reações de neutralização e ácidos/bases",
              "Combustíveis e Energia: Petróleo, etanol, transição energética e efeito estufa"
            ]
          },
          {
            nome: "Biologia, Saúde e Ecologia",
            topicos: [
              "Ecologia e Sustentabilidade: Cadeias tróficas, ciclos biogeoquímicos e preservação de mananciais",
              "Citologia Básica: Organelas celulares, respiração celular e fotossíntese",
              "Saúde Pública e Imunização: Diferenças entre vacinas e soros, viroses e bactérias patogênicas"
            ]
          }
        ]
      }
    ]
  },

  // 16. PUC - PONTIFÍCIA UNIVERSIDADE CATÓLICA (PUC-SP / PUC-CAMPINAS)
  puc: {
    id: "puc",
    nome: "PUC",
    tituloCompleto: "Pontifícia Universidade Católica (PUC-SP / PUC-Campinas)",
    badge: "Privada de Excelência • Tradição & Pesquisa",
    corBadge: "#0284c7",
    icone: "fa-monument",
    resumo: "Uma das redes universitárias privadas mais prestigiadas e tradicionais da América Latina, referência nacional em Direito, Medicina, Economia, Jornalismo, Psicologia, Relações Internacionais e Engenharias.",
    detalhesGerais: {
      formato: "Prova com questões interdisciplinares de múltipla escolha + Redação reflexiva com propostas articuladas",
      totalQuestoes: "50 a 60 questões de múltipla escolha + Redação dissertativa",
      criterioCorrecao: "Média ponderada com pesos específicos por área e avaliação da profundidade argumentativa",
      dicaChave: "A banca da PUC valoriza forte espírito crítico, repertório humanístico e capacidade de relacionar acontecimentos contemporâneos a teorias históricas e sociológicas."
    },
    redacao: {
      titulo: "Redação PUC: Reflexão Crítica e Autoral",
      descricao: "Texto dissertativo em prosa exigindo maturidade de pensamento, posicionamento ético e análise profunda de conflitos humanos e sociais.",
      competencias: [
        { num: 1, nome: "Densidade Teórica", desc: "Capacidade de problematizar o tema sem cair no senso comum ou clichês." },
        { num: 2, nome: "Progressão Argumentativa", desc: "Articulação lógica das premissas, consistência dos parágrafos e coesão." },
        { num: 3, nome: "Domínio Formal da Norma", desc: "Riqueza vocabular, elegância sintática e pontuação expressiva." }
      ]
    },
    areas: [
      {
        nome: "Linguagens e Expressão Crítica",
        icone: "fa-pen-nib",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Análise de Discurso e Pragmática: Intencionalidade, ironia, pressupostos e subentendidos",
              "Arcadismo ao Realismo/Naturalismo no Brasil: Machado de Assis, Raul Pompeia e Aluísio Azevedo",
              "Vanguardas Europeias e Poesia Concreta: Inovações formais na poesia modernista brasileira",
              "Recursos Coesivos Interparágrafos e Precisão Léxica na Escrita Acadêmica"
            ]
          }
        ]
      },
      {
        nome: "Ciências Humanas e Filosofia Social",
        icone: "fa-landmark",
        disciplinas: [
          {
            nome: "Filosofia, Sociologia e História Geral",
            topicos: [
              "Filosofia Política Moderna: Contratualismo (Hobbes, Locke, Rousseau) e Teoria da Separação dos Poderes",
              "Sociologia Clássica: Fato social em Durkheim, Ação social em Weber e Luta de classes em Marx",
              "História do Brasil República: Da Proclamação da República ao Período Democrático de 1945-1964",
              "Crises do Capitalismo e Globalização: Neoliberalismo, revolução técnico-científica e trabalho informal"
            ]
          }
        ]
      },
      {
        nome: "Ciências da Natureza e Matemática",
        icone: "fa-dna",
        disciplinas: [
          {
            nome: "Matemática e Ciências Exatas",
            topicos: [
              "Probabilidade e Análise Combinatória: Permutação, arranjo e combinação simples",
              "Trigonometria e Funções Circulares: Relações fundamentais, seno e cosseno",
              "Termodinâmica e Ondulatória: Leis da termodinâmica, calorimetria e fenômenos ondulatórios",
              "Bioquímica Celular e Genética Médica: Ácidos nucleicos (DNA/RNA), síntese proteica e biotecnologia"
            ]
          }
        ]
      }
    ]
  },

  // 17. MACKENZIE - UNIVERSIDADE PRESBITERIANA MACKENZIE
  mackenzie: {
    id: "mackenzie",
    nome: "Mackenzie",
    tituloCompleto: "Universidade Presbiteriana Mackenzie",
    badge: "Privada Tradicional • Mercado & Inovação",
    corBadge: "#dc2626",
    icone: "fa-award",
    resumo: "Fundada em 1870, é uma das maiores e mais tradicionais instituições privadas de São Paulo, destacando-se pela Escola de Engenharia, Faculdade de Direito, Arquitetura (FAU-Mackenzie) e Administração de Negócios.",
    detalhesGerais: {
      formato: "Prova única com 60 questões objetivas distribuídas por disciplinas do núcleo comum + Redação",
      totalQuestoes: "60 questões de múltipla escolha (Língua Portuguesa, Literatura, Inglês, Matemática, Física, Química, Biologia, História, Geografia)",
      criterioCorrecao: "Média ponderada por grupos de cursos: Grupo I (Humanas/Direito), Grupo II (Exatas/Engenharias), Grupo III (Biológicas)",
      dicaChave: "A prova do Mackenzie é ágil e direta. Exige domínio seguro de fórmulas em Física/Química e leitura atenta dos enunciados de Português e História."
    },
    redacao: {
      titulo: "Redação do Vestibular Mackenzie",
      descricao: "Texto dissertativo-argumentativo em prosa abordando temas contemporâneos, dilemas éticos ou transformações tecnológicas.",
      competencias: [
        { num: 1, nome: "Adequação ao Tema", desc: "Compreensão exata da proposta com posicionamento autêntico." },
        { num: 2, nome: "Coerência Textual", desc: "Encadeamento lógico de argumentos sem contradições." },
        { num: 3, nome: "Clareza e Correção", desc: "Uso culto da gramática com riqueza de vocabulário e concordância." }
      ]
    },
    areas: [
      {
        nome: "Linguagens e Humanidades Mackenzie",
        icone: "fa-feather",
        disciplinas: [
          {
            nome: "Língua Portuguesa e Literatura",
            topicos: [
              "Romantismo no Brasil: Três gerações da poesia romântica e o romance indianista",
              "Modernismo da 2ª Fase (1930): Carlos Drummond de Andrade, Graciliano Ramos e Cecília Meireles",
              "Regência Verbal e Nominal: Crase, verbos transitivos diretos e indiretos mais cobrados",
              "Semântica: Sinônimos, antônimos, polissemia e homonímia"
            ]
          },
          {
            nome: "História e Geografia",
            topicos: [
              "Brasil Colônia: Ciclo do ouro, economia açucareira e revoltas nativistas/separatistas",
              "Primeira e Segunda Guerras Mundiais: Causas, desdobramentos geopolíticos e criação da ONU",
              "Geografia Física do Brasil: Relevo, hidrografia, climas brasileiros e biomas",
              "Agropecuária Brasileira: Agronegócio, modernização do campo e fronteiras agrícolas"
            ]
          }
        ]
      },
      {
        nome: "Ciências Exatas e Tecnológicas",
        icone: "fa-compass-drafting",
        disciplinas: [
          {
            nome: "Matemática, Física e Química",
            topicos: [
              "Geometria Analítica: Equação da reta, circunferência e distância entre pontos",
              "Mecânica Clássica: Leis de Newton, trabalho, energia cinética e energia potencial mecânica",
              "Óptica Geométrica: Reflexão, refração, espelhos esféricos e lentes delgadas",
              "Termoquímica e Cinética Química: Entalpia, Lei de Hess e fatores que alteram a velocidade da reação"
            ]
          }
        ]
      }
    ]
  },

  // 18. FGV - FUNDAÇÃO GETULIO VARGAS (FGV-SP / FGV-RIO)
  fgv: {
    id: "fgv",
    nome: "FGV",
    tituloCompleto: "Fundação Getulio Vargas (FGV-SP / FGV-Rio)",
    badge: "Privada de Elite • Finanças & Liderança",
    corBadge: "#1e3a8a",
    icone: "fa-chart-line",
    resumo: "Líder nacional na formação de executivos em Administração de Empresas, Economia, Direito, Matemática Aplicada e Ciência de Dados, possui um dos vestibulares mais disputados e analíticos do país.",
    detalhesGerais: {
      formato: "Módulos Objetivo e Discursivo (Matemática e Atualidades) + Redação analítica + Exame Oral para algumas carreiras",
      totalQuestoes: "Questões objetivas de múltipla escolha com foco analítico + Provas discursivas",
      criterioCorrecao: "Rigor extremo em raciocínio quantitativo, interpretação de gráficos socioeconômicos e precisão lógica",
      dicaChave: "Na FGV, a Matemática exige raciocínio abstrato avançado, e a Redação valoriza argumentação pragmática fundamentada em dados e conjuntura global."
    },
    redacao: {
      titulo: "Redação FGV: Ensaio Argumentativo Crítico",
      descricao: "Ensaio dissertativo exigindo rigor analítico, repertório econômico-social maduro e capacidade de sustentação de teses complexas.",
      competencias: [
        { num: 1, nome: "Rigor Argumentativo", desc: "Capacidade de sustentar premissas lógicas sem contradições." },
        { num: 2, nome: "Domínio de Atualidades", desc: "Conhecimento consistente de conjuntura nacional e internacional." },
        { num: 3, nome: "Norma Culta e Estilo", desc: "Clareza, precisão terminológica e excelente estrutura frasal." }
      ]
    },
    areas: [
      {
        nome: "Ciências Quantitativas e Métodos Lógicos",
        icone: "fa-chart-pie",
        disciplinas: [
          {
            nome: "Matemática Avançada e Estatística",
            topicos: [
              "Matrizes, Determinantes e Sistemas Lineares com Escalonamento",
              "Análise Combinatória Complexa e Probabilidade Condicional (Teorema de Bayes)",
              "Matemática Financeira e Fluxo de Caixa: Juros compostos, taxas equivalentes e amortização",
              "Funções Exponenciais e Logarítmicas: Aplicação a modelos de crescimento e decaimento"
            ]
          }
        ]
      },
      {
        nome: "Economia, Atualidades e Humanidades",
        icone: "fa-globe",
        disciplinas: [
          {
            nome: "Cenário Econômico e Sociedade",
            topicos: [
              "Inflação, Taxa Selic e Política Monetária: Impactos no consumo e investimentos",
              "Comércio Internacional e Geopolítica: Tensão EUA-China, cadeias de suprimentos e energia",
              "História Econômica do Brasil: Industrialização JK, Milagre Econômico, Crise da Dívida e Plano Real",
              "Instituições Democráticas e Estado de Direito na Constituição de 1988"
            ]
          }
        ]
      }
    ]
  },

  // 19. USCS - UNIVERSIDADE MUNICIPAL DE SÃO CAETANO DO SUL
  uscs: {
    id: "uscs",
    nome: "USCS",
    tituloCompleto: "Universidade Municipal de São Caetano do Sul (USCS)",
    badge: "Municipal & Saúde • ABC Paulista",
    corBadge: "#059669",
    icone: "fa-user-doctor",
    resumo: "Instituição de ensino superior de grande destaque no Grande ABC e na capital paulista, amplamente concorrida pelo seu prestigiado curso de Medicina (organizado pela Fundação Vunesp), Odontologia, Direito e Tecnologia.",
    detalhesGerais: {
      formato: "Vestibular Vunesp: 60 questões de múltipla escolha + Redação dissertativa padrão Vunesp",
      totalQuestoes: "60 questões objetivas interdisciplinares + Redação",
      criterioCorrecao: "Padrão Fundação Vunesp com escala padronizada e exigência de alta pontuação de corte em Medicina",
      dicaChave: "O vestibular da USCS segue o padrão rigoroso da Vunesp: enunciados claros, sem pegadinhas, exigindo domínio consistente dos conceitos clássicos do Ensino Médio."
    },
    redacao: {
      titulo: "Redação USCS (Padrão Fundação Vunesp)",
      descricao: "Texto dissertativo em prosa com temática filosófica, comportamental ou social a partir de uma coletânea rica de textos motivadores.",
      competencias: [
        { num: 1, nome: "Tese e Tema Vunesp", desc: "Responder explicitamente à pergunta-tema proposta pela banca no primeiro parágrafo." },
        { num: 2, nome: "Estrutura Argumentativa", desc: "Parágrafos equilibrados com tópicos frasais claros e conectivos interparágrafos." },
        { num: 3, nome: "Norma Padrão", desc: "Domínio culto do português, sem marcas de oralidade ou repetições excessivas." }
      ]
    },
    areas: [
      {
        nome: "Ciências da Saúde e da Vida (Foco Medicina USCS)",
        icone: "fa-stethoscope",
        disciplinas: [
          {
            nome: "Biologia e Bioquímica Humana",
            topicos: [
              "Fisiologia Humana: Sistemas circulatório, respiratório, digestório, renal e endócrino",
              "Genética e Biologia Molecular: Mutações gênicas, biotecnologia (CRISPR, clonagem e PCR) e hereditariedade",
              "Imunologia e Microbiologia: Mecanismos de defesa do corpo, anticorpos, vacinas e infecções bacterianas",
              "Ecologia Médica: Zoonoses, saneamento básico, vetores de doenças e impactos na saúde urbana"
            ]
          },
          {
            nome: "Química Geral e Orgânica",
            topicos: [
              "Química Orgânica: Funções orgânicas (álcoois, aldeídos, cetonas, aminas), isomeria óptica e plana",
              "Físico-Química: Equilíbrio químico (Princípio de Le Chatelier), cálculo de pH e pOH",
              "Estequiometria com Pureza e Rendimento em reações químicas industriais e biológicas"
            ]
          }
        ]
      },
      {
        nome: "Exatas e Humanidades Gerais",
        icone: "fa-book",
        disciplinas: [
          {
            nome: "Linguagens, Física e Humanidades",
            topicos: [
              "Interpretação Textual Vunesp: Identificação de premissas, pressupostos e intencionalidade",
              "Mecânica e Ondulatória: Movimento uniforme/uniformemente variado, acústica e velocidade do som",
              "História do Brasil e Cidadania: Da Era Vargas à Constituição Cidadã de 1988",
              "Urbanização e Meio Ambiente no Estado de São Paulo e Região Metropolitana"
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
  },

  // QUESTÕES DOS NOVOS VESTIBULARES (FSA, PUC, MACKENZIE, FGV)
  {
    id: "q-fsa-1",
    vestibular: "FSA",
    categoria: "Humanas",
    disciplina: "História e Geografia",
    dificuldade: "Média",
    enunciado: "O Grande ABC paulista (Santo André, São Bernardo do Campo, São Caetano do Sul e região) consolidou-se a partir da década de 1950 como o principal polo metalúrgico e automobilístico do Brasil. Esse processo de industrialização acelerada foi impulsionado primordialmente:",
    alternativas: [
      "Pelo Plano de Metas do governo Juscelino Kubitschek e pela atração de montadoras multinacionais.",
      "Pela mineração de ouro e pedras preciosas no Vale do Paraíba.",
      "Pela expansão cafeeira no Oeste Paulista no século XIX.",
      "Por incentivos fiscais exclusivos da Zona Franca de Manaus.",
      "Pelo ciclo da borracha na bacia amazônica."
    ],
    correta: 0,
    explicacao: "O Plano de Metas de JK priorizou a indústria automobilística, atraindo montadoras para o ABC Paulista devido à proximidade com a capital, à malha ferroviária Santos-Jundiaí e à ampla oferta de mão de obra.",
    dicaConta: false
  },
  {
    id: "q-fsa-2",
    vestibular: "FSA",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Fácil",
    enunciado: "Um estudante de Santo André comprou um livro de revisão para o vestibular que custava R$ 120,00. Por efetuar o pagamento à vista via Pix, obteve um desconto de 15%. Qual foi o valor final pago pelo estudante?",
    alternativas: [
      "R$ 98,00",
      "R$ 102,00",
      "R$ 105,00",
      "R$ 108,00",
      "R$ 112,00"
    ],
    correta: 1,
    explicacao: "Desconto de 15%: 0,15 × 120 = R$ 18,00. Valor final: 120 - 18 = R$ 102,00 (ou diretamente: 120 × 0,85 = 102).",
    dicaConta: true
  },
  {
    id: "q-puc-1",
    vestibular: "PUC",
    categoria: "Humanas",
    disciplina: "Sociologia e Filosofia",
    dificuldade: "Média",
    enunciado: "Para o sociólogo polonês Zygmunt Bauman, a 'modernidade líquida' caracteriza-se pela fragilidade dos vínculos humanos, pela transitoriedade das relações sociais e pelo consumo imediato. No âmbito educacional e profissional, essa condição manifesta-se:",
    alternativas: [
      "Na necessidade de atualização contínua, flexibilidade e adaptação constante a cenários de incerteza.",
      "Na consolidação de carreiras vitalícias e estáveis sem necessidade de requalificação.",
      "No retorno irrestrito às corporações de ofício medievais.",
      "Na extinção completa das tecnologias digitais no ambiente de trabalho.",
      "No isolamento absoluto entre a ciência e a sociedade civil."
    ],
    correta: 0,
    explicacao: "A fluidez da modernidade líquida exige flexibilidade, aprendizado constante e resiliência diante de transformações aceleradas do mercado e das relações humanas.",
    dicaConta: false
  },
  {
    id: "q-mack-1",
    vestibular: "Mackenzie",
    categoria: "Linguagens",
    disciplina: "Literatura Brasileira",
    dificuldade: "Média",
    enunciado: "Na obra 'Vidas Secas' (1938), de Graciliano Ramos, o romance retrata a saga de uma família de retirantes no sertão nordestino. Do ponto de vista estilístico e temático, destaca-se:",
    alternativas: [
      "A linguagem despojada e concisa, espelhando a aridez da paisagem e a contenção verbal das personagens.",
      "O vocabulário rebuscado e parnasiano repleto de hipérboles e termos latinos.",
      "A idealização romântica e heroica da seca como fenômeno puramente sublime.",
      "A defesa da industrialização pesada como solução exclusiva para a seca.",
      "A recusa de qualquer crítica social ou denúncia da miséria."
    ],
    correta: 0,
    explicacao: "Graciliano Ramos é mestre da concisão estilística: frases curtas, substantivos fortes e corte de adjetivos desnecessários, transmitindo a aridez e a dureza da vida no semiárido.",
    dicaConta: false
  },
  {
    id: "q-fgv-1",
    vestibular: "FGV",
    categoria: "Exatas",
    disciplina: "Matemática",
    dificuldade: "Difícil",
    enunciado: "Uma aplicação financeira rende juros compostos a uma taxa de 10% ao ano. Se um investidor aplicar um capital inicial de R$ 10.000,00, qual será o montante acumulado ao final de 3 anos (sem aportes adicionais nem retiradas)?",
    alternativas: [
      "R$ 13.000,00",
      "R$ 13.310,00",
      "R$ 13.500,00",
      "R$ 14.100,00",
      "R$ 12.100,00"
    ],
    correta: 1,
    explicacao: "Fórmula de juros compostos: M = C × (1 + i)^t. Para C = 10.000, i = 0,10 e t = 3: M = 10.000 × (1,10)³ = 10.000 × 1,331 = R$ 13.310,00.",
    dicaConta: true
  }
];

/* ========================================================
   BANCO DE TEMAS E COLETÂNEAS DE REDAÇÃO POR VESTIBULAR
   ======================================================== */
/* ========================================================
   BANCO EXPANDIDO DE TEMAS E COLETÂNEAS DE REDAÇÃO POR VESTIBULAR
   ======================================================== */

/* ========================================================
   BANCO COMPLETO DE TEMAS E COLETÂNEAS DE REDAÇÃO POR VESTIBULAR
   ======================================================== */
const TEMAS_REDACAO_DATA = [
  // ========================================================
  // NOVOS TEMAS INÉDITOS E ATUAIS (2024 - 2026)
  // ========================================================
  {
    id: "redacao-enem-bets",
    vestibular: "ENEM",
    titulo: "O impacto da proliferação das apostas esportivas e jogos online (bets) na economia e saúde mental dos brasileiros",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "A partir da leitura dos textos motivadores e com base nos seus conhecimentos, redija um texto dissertativo-argumentativo sobre os impactos das apostas e jogos virtuais no endividamento e saúde psicológica no Brasil, com proposta de intervenção detalhada respeitando os direitos humanos.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Domínio formal da Língua Portuguesa", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Repertório sociocultural produtivo e legítimo", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Defesa articulada de tese e argumentos", peso: 200 },
      { nome: "C4 - Mecanismos Linguísticos", desc: "Coesão inter e intraparágrafos", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Proposta completa com os 5 elementos", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Banco Central do Brasil (Relatório 2024)",
        conteudo: "Dados apontam que beneficiários de programas sociais e trabalhadores transferiram mais de R$ 3 bilhões mensais para plataformas de apostas online via Pix, gerando preocupação sobre segurança alimentar e desvio de renda essencial das famílias."
      },
      {
        origem: "Texto II - Organização Mundial da Saúde (OMS)",
        conteudo: "A ludopatia (vício em jogos de azar) é reconhecida internacionalmente como transtorno compulsivo. A facilidade de acesso pelo smartphone 24 horas por dia intensifica ciclos de dopamina e dependência comportamental severa."
      },
      {
        origem: "Texto III - Artigo 170 da Constituição Federal",
        conteudo: "'A ordem econômica, fundada na valorização do trabalho humano e na livre iniciativa, tem por fim assegurar a todos existência digna, conforme os ditames da justiça social e a defesa do consumidor.'"
      }
    ]
  },
  {
    id: "redacao-enem-saneamento",
    vestibular: "ENEM",
    titulo: "Desafios para a universalização do saneamento básico e garantia da dignidade humana no Brasil",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "Redija um texto dissertativo-argumentativo em norma culta sobre os caminhos e desafios para garantir acesso à água potável e esgoto tratado a toda a população brasileira.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Correção gramatical formal", peso: 200 },
      { nome: "C2 - Repertório", desc: "Relação com saúde coletiva e direitos fundamentais", peso: 200 },
      { nome: "C3 - Argumentação", desc: "Coerência e consistência crítica", peso: 200 },
      { nome: "C4 - Coesão", desc: "Operadores e conectivos adequados", peso: 200 },
      { nome: "C5 - Intervenção", desc: "Proposta de ação pública e comunitária", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Instituto Trata Brasil",
        conteudo: "Cerca de 32 milhões de brasileiros ainda não têm acesso à água tratada e quase 90 milhões não dispõem de coleta de esgoto, sobrecarregando o SUS com internações evitáveis por doenças de veiculação hídrica."
      },
      {
        origem: "Texto II - Marco Legal do Saneamento (Lei 14.026/20)",
        conteudo: "A legislação estabelece a meta de atender 99% da população com água potável e 90% com tratamento e coleta de esgoto até 2033, exigindo pesados investimentos públicos e privados."
      }
    ]
  },
  {
    id: "redacao-enem-neurodivergentes",
    vestibular: "ENEM",
    titulo: "Caminhos para a inclusão plena e digna de pessoas neurodivergentes na sociedade brasileira",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "Com base na coletânea, elabore texto dissertativo-argumentativo apresentando medidas de combate ao capacitismo e de garantia de adaptações pedagógicas e profissionais para pessoas com autismo, TDAH e outras condições neuroatípicas.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Norma culta da Língua Portuguesa", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Sociologia, legislação e direitos humanos", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Articulação de causas e consequências", peso: 200 },
      { nome: "C4 - Mecanismos Linguísticos", desc: "Coesão estrutural", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Agente, ação, meio, efeito e detalhamento", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Lei Berenice Piana (Lei 12.764/12)",
        conteudo: "Institui a Política Nacional de Proteção dos Direitos da Pessoa com Transtorno do Espectro Autista, garantindo acesso à educação inclusiva e mediadores especializados."
      },
      {
        origem: "Texto II - Manifesto pela Neurodiversidade",
        conteudo: "O conceito de neurodiversidade propõe que variações neurológicas fazem parte do espectro natural da condição humana, não devendo ser tratadas como falhas, mas como diferenças que requerem ambientes acessíveis."
      }
    ]
  },
  {
    id: "redacao-fuvest-uberizacao",
    vestibular: "FUVEST",
    titulo: "A uberização do trabalho e as novas formas de alienação na era dos algoritmos",
    genero: "Dissertação Filosófica e Crítica (Padrão FUVEST)",
    linhasMin: 20,
    linhasMax: 30,
    notaMaxima: 50,
    instrucoes: "Reflita criticamente sobre a retórica do 'empreendedorismo de si mesmo' em contraste com a perda de garantias trabalhistas e o controle invisível mediado por algoritmos e plataformas digitais.",
    criterios: [
      { nome: "Desenvolvimento do Tema", desc: "Abordagem crítica e problematização filosófica", peso: 20 },
      { nome: "Estrutura e Coesão", desc: "Encadeamento lógico de argumentos sem fórmulas prontas", peso: 15 },
      { nome: "Expressão Formal", desc: "Precisão vocabular e elegância sintática", peso: 15 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Byung-Chul Han (Psicopolítica)",
        conteudo: "'Hoje, cada um é um trabalhador que explora a si mesmo em sua própria empresa. Cada um é senhor e escravo numa só pessoa. A própria liberdade se manifesta como coerção.'"
      },
      {
        origem: "Texto II - Sociologia do Trabalho Contemporânea",
        conteudo: "O trabalhador plataformizado arca com os custos dos instrumentos de trabalho (veículo, telefone, dados) enquanto a remuneração é arbitrada por fórmulas algorítmicas opacas e variáveis."
      }
    ]
  },
  {
    id: "redacao-unicamp-clima-indigenas",
    vestibular: "UNICAMP",
    titulo: "Carta aberta aos líderes globais sobre os povos originários como guardiões da biodiversidade",
    genero: "Carta Aberta (Padrão UNICAMP)",
    linhasMin: 15,
    linhasMax: 30,
    notaMaxima: 24,
    instrucoes: "Redija uma Carta Aberta assinada por uma federação estudantil brasileira dirigida aos chefes de Estado da COP, defendendo a demarcação das terras indígenas como medida central de preservação ambiental.",
    criterios: [
      { nome: "Adequação ao Gênero", desc: "Estrutura autêntica de Carta Aberta (vocativo, tese, apelo coletivo e assinatura)", peso: 8 },
      { nome: "Interlocução e Propósito", desc: "Voz autoral e persuasão dirigida ao público-alvo", peso: 8 },
      { nome: "Convenções de Escrita", desc: "Correção linguística e fluidez textual", peso: 8 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Relatório das Nações Unidas (ONU Meio Ambiente)",
        conteudo: "Terras geridas por comunidades indígenas e tradicionais têm índices de desmatamento até 80% inferiores aos de áreas desprotegidas ao seu redor."
      }
    ]
  },
  // ========================================================
  // ENEM - EXAME NACIONAL DO ENSINO MÉDIO (Nota Máxima: 1000)
  // ========================================================
  {
    id: "redacao-enem-1",
    vestibular: "ENEM",
    titulo: "Desafios para o enfrentamento da crise climática e garantia da justiça socioambiental no Brasil",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema, apresentando proposta de intervenção com os 5 elementos que respeite os direitos humanos.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Demonstrar domínio da modalidade escrita formal da Língua Portuguesa (acentuação, crase, concordância e regência).", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Compreender a proposta e aplicar conceitos das várias áreas do conhecimento (sociologia, filosofia, história, dados).", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Selecionar, relacionar, organizar e interpretar informações, fatos e argumentos em defesa de um ponto de vista articulado.", peso: 200 },
      { nome: "C4 - Mecanismos Linguísticos", desc: "Demonstrar conhecimento dos mecanismos linguísticos de coesão (conectivos interparágrafos e intraparágrafos).", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Elaborar proposta completa com Agente, Ação, Meio/Modo, Efeito e Detalhamento de um dos elementos.", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Relatório IPCC & Dados Nacionais",
        conteudo: "A crise climática global não atinge a todos com a mesma intensidade. O conceito de 'racismo ambiental' e 'injustiça climática' revela que populações periféricas, ribeirinhas e povos tradicionais sofrem de forma desproporcional com enchentes, secas severas e deslizamentos de terra, tendo menor capacidade financeira e estrutural de adaptação e reconstrução."
      },
      {
        origem: "Texto II - Artigo 225 da Constituição Federal de 1988",
        conteudo: "'Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações.'"
      },
      {
        origem: "Texto III - Ailton Krenak (Ideias para Adiar o Fim do Mundo)",
        conteudo: "'Fomos nos alienando desse organismo de que somos parte, a Terra, e passamos a pensar que ele é uma coisa e nós, outra: a Terra e a humanidade. Eu não percebo onde há a Terra e onde há humanidade. Quando despersonalizamos a natureza para explorá-la sem limites, decretamos a nossa própria vulnerabilidade.'"
      },
      {
        origem: "Texto IV - Painel Brasileiro de Mudanças Climáticas",
        conteudo: "No Brasil, as emissões de gases de efeito estufa estão intimamente ligadas ao desmatamento e à mudança do uso da terra na Amazônia e no Cerrado, combinadas a eventos extremos cada vez mais frequentes nos grandes centros urbanos desprovidos de drenagem adequada."
      }
    ]
  },
  {
    id: "redacao-enem-2",
    vestibular: "ENEM",
    titulo: "Impactos da Inteligência Artificial generativa no mercado de trabalho e na formação dos jovens brasileiros",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "Com base na leitura da coletânea, redija um texto dissertativo-argumentativo sobre os efeitos da IA no trabalho e na educação dos jovens, elaborando proposta de intervenção detalhada que articule poder público e sociedade.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Domínio formal da Língua Portuguesa", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Repertório sociocultural legítimo e produtivo", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Planejamento argumentativo e defesa consistente de tese", peso: 200 },
      { nome: "C4 - Coesão e Conectivos", desc: "Emprego diversificado de operadores argumentativos", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Proposta completa com os 5 elementos obrigatórios", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Fórum Econômico Mundial (Relatório Futuro do Trabalho)",
        conteudo: "A automação cognitiva impulsionada por modelos de linguagem e visão computacional deve reestruturar cerca de 85 milhões de empregos globais até o final da década. As habilidades mais valorizadas deixam de ser a execução repetitiva e passam a ser o pensamento crítico, a resolução de problemas complexos e a criatividade ética."
      },
      {
        origem: "Texto II - Pesquisa de Empregabilidade Jovem (IBGE)",
        conteudo: "No Brasil, mais de 20% dos jovens de 15 a 29 anos não estudam nem trabalham. A desigualdade no acesso à internet de alta velocidade e a dispositivos computacionais aprofunda a distância entre estudantes de escolas públicas e as carreiras de alta tecnologia do futuro."
      },
      {
        origem: "Texto III - Domenico De Masi (O Ócio Criativo)",
        conteudo: "'A tecnologia libertará o ser humano do trabalho puramente mecânico e alienante. Contudo, se a sociedade não redistribuir a riqueza gerada por essa automação, a máquina gerará desemprego em massa em vez de emancipação e qualidade de vida.'"
      }
    ]
  },
  {
    id: "redacao-enem-3",
    vestibular: "ENEM",
    titulo: "A invisibilidade e a valorização do trabalho de cuidado realizado pela mulher no Brasil",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "Produza um texto dissertativo-argumentativo sobre os desafios para o reconhecimento econômico e social do trabalho de cuidado no país, propondo medidas de intervenção social.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Domínio da norma padrão da língua escrita", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Compreensão da proposta e repertório produtivo", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Seleção e organização dos argumentos", peso: 200 },
      { nome: "C4 - Coesão Textual", desc: "Articulação de ideias e repertório coesivo", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Cinco elementos: Agente, Ação, Meio, Efeito e Detalhamento", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Dados da PNAD Contínua (IBGE)",
        conteudo: "As mulheres brasileiras dedicam, em média, 21,3 horas semanais aos afazeres domésticos e ao cuidado de crianças, idosos e pessoas doentes — quase o dobro do tempo dedicado pelos homens (11,7 horas). Esse trabalho não remunerado é indispensável para o funcionamento da economia, mas permanece invisibilizado nos indicadores de renda."
      },
      {
        origem: "Texto II - Silvia Federici (O Ponto Zero da Revolução)",
        conteudo: "'O trabalho reprodutivo e de cuidado não é apenas um serviço pessoal; é a base que sustenta a força produtiva de qualquer sociedade capitalista. Sem quem alimente, limpe e eduque as novas gerações, a economia simplesmente colapsa.'"
      },
      {
        origem: "Texto III - Marco Legal da Primeira Infância",
        conteudo: "A expansão de creches públicas de tempo integral e centros de convivência para idosos figura como a principal política estatal capaz de desonerar as mulheres das classes populares e permitir sua inserção autônoma no mercado de trabalho e na educação formal."
      }
    ]
  },
  {
    id: "redacao-enem-4",
    vestibular: "ENEM",
    titulo: "Caminhos para combater a evasão escolar e democratizar a permanência no Ensino Superior público",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "Redija um texto dissertativo-argumentativo em prosa sobre a permanência estudantil e a democratização do ensino superior público no Brasil, apresentando proposta interventiva.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Domínio formal da Língua Portuguesa", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Repertório sociocultural legítimo e articulado", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Estrutura lógica e defesa clara de tese", peso: 200 },
      { nome: "C4 - Mecanismos de Coesão", desc: "Conectivos inter e intraparágrafos", peso: 200 },
      { nome: "C5 - Proposta Interventiva", desc: "Intervenção com Agente, Ação, Meio, Efeito e Detalhe", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Censo da Educação Superior (Inep)",
        conteudo: "A taxa de desistência nos cursos de graduação chega a quase 50% em algumas áreas. Entre alunos cotistas e de baixa renda, os principais motivos apontados são o custo de transporte, alimentação, moradia e a necessidade imperiosa de trabalhar para ajudar no sustento da família."
      },
      {
        origem: "Texto II - Darcy Ribeiro (A Universidade Necessária)",
        conteudo: "'A universidade pública brasileira não pode ser uma ilha de privilégios para as elites. Ela precisa ser o motor da reconstrução nacional, aberta a todas as classes sociais e provida de assistência para que o filho do trabalhador não apenas entre, mas se forme com dignidade.'"
      },
      {
        origem: "Texto III - Programa Nacional de Assistência Estudantil (PNAES)",
        conteudo: "Bolsas de permanência, moradia universitária, auxílio-creche e restaurantes universitários subsidiados são apontados por pedagogos como investimentos com retorno social direto, reduzindo drasticamente o desperdício de talentos provocado pela evasão."
      }
    ]
  },

  // ========================================================
  // FATEC - CENTRO PAULA SOUZA (Nota Máxima: 100)
  // ========================================================
  {
    id: "redacao-fatec-1",
    vestibular: "FATEC",
    titulo: "O impacto da inteligência artificial e da automação na qualificação técnica profissional",
    genero: "Dissertação-Argumentativa (Padrão FATEC / CPS)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Desenvolva uma dissertação em prosa, demonstrando capacidade de reflexão crítica, argumentação coerente e domínio da modalidade formal da Língua Portuguesa sobre a formação tecnológica diante da IA.",
    criterios: [
      { nome: "Critério 1 - Adequação ao Tema e Gênero", desc: "Compreensão da proposta e do recorte temático; posicionamento claro em gênero dissertativo-argumentativo.", peso: 40 },
      { nome: "Critério 2 - Coerência e Argumentação Lógica", desc: "Desenvolvimento de argumentos consistentes, progressão temática, causas, consequências e exemplos práticos.", peso: 30 },
      { nome: "Critério 3 - Domínio da Norma Culta e Coesão", desc: "Correção gramatical, adequação vocabular técnica/formal, pontuação precisa e uso de conectivos adequados.", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Panorama da Indústria 4.0 no Brasil (CNI)",
        conteudo: "A convergência entre Internet das Coisas (IoT), robótica avançada e inteligência artificial está transformando o chão de fábrica e o setor de serviços. Mais de 60% das indústrias médias e grandes relatam dificuldades em contratar tecnólogos capacitados para operar e programar sistemas automatizados modernos."
      },
      {
        origem: "Texto II - Centro Paula Souza (Diretrizes de Educação Tecnológica)",
        conteudo: "A formação técnica e tecnológica do século XXI não pode se restringir ao aprendizado de ferramentas de software que se tornam obsoletas em poucos anos. O currículo moderno prioriza a capacidade de aprendizagem contínua (lifelong learning), o raciocínio lógico algorítmico e a postura ética diante da tecnologia."
      },
      {
        origem: "Texto III - Kai-Fu Lee (Inteligência Artificial: Como os Robôs Estão Mudando o Mundo)",
        conteudo: "'A inteligência artificial assumirá as tarefas analíticas rotineiras e a otimização de dados. O diferencial humano insubstituível será a empatia, o contato humano genuíno, a criatividade e a habilidade multidisciplinar de integrar áreas do saber.'"
      }
    ]
  },
  {
    id: "redacao-fatec-2",
    vestibular: "FATEC",
    titulo: "Cibersegurança e proteção de dados: entre a privacidade individual e a inovação tecnológica",
    genero: "Dissertação-Argumentativa (Padrão FATEC / CPS)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Elabore um texto dissertativo-argumentativo analisando os desafios de equilibrar o avanço de serviços digitais orientados a dados e a garantia fundamental da privacidade dos cidadãos.",
    criterios: [
      { nome: "Critério 1 - Tema e Gênero Dissertativo", desc: "Abordagem do tema tecnológico e tese bem fundamentada", peso: 40 },
      { nome: "Critério 2 - Raciocínio Lógico e Argumentação", desc: "Articulação de argumentos sólidos com causa e efeito", peso: 30 },
      { nome: "Critério 3 - Expressão Formal e Coesão", desc: "Linguagem culta, variedade lexical e conexão entre frases", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)",
        conteudo: "A LGPD estabelece regras claras sobre coleta, armazenamento, tratamento e compartilhamento de dados pessoais, consagrando o direito fundamental à autodeterminação informativa e impondo sanções severas a empresas que descumprirem parâmetros de segurança."
      },
      {
        origem: "Texto II - Shoshana Zuboff (A Era do Capitalismo de Vigilância)",
        conteudo: "Ao transformar experiências humanas cotidianas em matéria-prima comportamental gratuita para predição e modificação de hábitos de consumo, grandes conglomerados tecnológicos redefinem as fronteiras da liberdade pessoal sem o devido consentimento consciente do usuário."
      },
      {
        origem: "Texto III - Relatório CERT.br de Incidentes Virtuais",
        conteudo: "O Brasil está entre os países com maior número de ataques cibernéticos de sequestro de dados (ransomware) contra hospitais, empresas e órgãos públicos, evidenciando a carência crítica de profissionais técnicos de infraestrutura e segurança da informação."
      }
    ]
  },
  {
    id: "redacao-fatec-3",
    vestibular: "FATEC",
    titulo: "Transição energética e o papel dos cursos tecnológicos no desenvolvimento sustentável brasileiro",
    genero: "Dissertação-Argumentativa (Padrão FATEC / CPS)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Produza uma dissertação argumentativa sobre como a formação tecnológica em energia renovável, biocombustíveis e mobilidade sustentável impulsiona o desenvolvimento econômico sustentável do país.",
    criterios: [
      { nome: "Critério 1 - Adequação ao Tema", desc: "Compreensão da matriz energética e desenvolvimento sustentável", peso: 40 },
      { nome: "Critério 2 - Coerência Argumentativa", desc: "Progressão lógica de ideias com fundamentação empírica", peso: 30 },
      { nome: "Critério 3 - Norma Culta e Clareza", desc: "Precisão gramatical, clareza e termos técnicos pertinentes", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Empresa de Pesquisa Energética (EPE)",
        conteudo: "O Brasil possui uma das matrizes elétricas mais limpas do planeta, com mais de 80% proveniente de fontes renováveis (hidrelétrica, biomassa, eólica e solar). No entanto, o setor de transportes e a indústria pesada ainda dependem massivamente de combustíveis fósseis."
      },
      {
        origem: "Texto II - Associação Brasileira de Energia Solar Fotovoltaica (ABSOLAR)",
        conteudo: "A expansão exponencial da energia solar e eólica no Nordeste e Sudeste brasileiro tem gerado milhares de empregos técnicos diretos em projeto, instalação, manutenção de inversores e redes inteligentes (smart grids)."
      }
    ]
  },

  // ========================================================
  // FUVEST - UNIVERSIDADE DE SÃO PAULO (Nota Máxima: 50)
  // ========================================================
  {
    id: "redacao-fuvest-1",
    vestibular: "FUVEST",
    titulo: "A mercantilização do tempo e o culto à produtividade na sociedade contemporânea",
    genero: "Dissertação Filosófico-Argumentativa (Padrão FUVEST / USP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 50,
    instrucoes: "A partir da reflexão proposta pelos textos da coletânea, redija uma dissertação em prosa, em língua culta, demonstrando capacidade de abstração, densidade reflexiva e articulação teórica consistente. O título é obrigatório.",
    criterios: [
      { nome: "Quesito A - Desenvolvimento do Tema e Fundamentação", desc: "Compreensão da proposta, fuga do senso comum, capacidade de abstração e fundamentação teórico-filosófica.", peso: 20 },
      { nome: "Quesito B - Coerência dos Argumentos e Estrutura", desc: "Progressão argumentativa contínua, articulação orgânica entre os parágrafos sem fórmulas engessadas.", peso: 15 },
      { nome: "Quesito C - Correção Gramatical e Precisão Vocabular", desc: "Domínio culto formal da língua, variedade e precisão lexical, pontuação refinada e sintaxe elegante.", peso: 15 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Byung-Chul Han (A Sociedade do Cansaço)",
        conteudo: "'A sociedade disciplinar de Foucault, povoada por hospitais, asilos e prisões, deu lugar a uma sociedade de desempenho. Nela, o indivíduo não é mais coagido de fora; ele explora a si mesmo voluntariamente sob a ilusão da liberdade e da auto-otimização constante, culminando no esgotamento depressivo (burnout).'"
      },
      {
        origem: "Texto II - Walter Benjamin (Sobre o Conceito da História)",
        conteudo: "O tempo histórico do capitalismo industrial é homogêneo, vazio e contínuo, medido pelo relógio como mercadoria quantificável ('tempo é dinheiro'). Em contraste, o tempo vivido, da memória involuntária e da experiência compartilhada, recusa a contabilidade utilitarista do rendimento financeiro."
      },
      {
        origem: "Texto III - Ensaio Crítico Contemporâneo",
        conteudo: "Aplicativos de rastreamento de sono, dietas cronometradas e agendas hiperocupadas transformam até o lazer e o repouso em metas de rendimento pessoal. O ócio contemplativo, berço da filosofia na Grécia clássica, passa a ser criminalizado como culpa e improdutividade."
      }
    ]
  },
  {
    id: "redacao-fuvest-2",
    vestibular: "FUVEST",
    titulo: "As fronteiras entre o público e o privado no ambiente digital: superexposição ou nova sociabilidade?",
    genero: "Dissertação Filosófico-Argumentativa (Padrão FUVEST / USP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 50,
    instrucoes: "Redija uma dissertação em prosa sobre os novos contornos da intimidade humana no século XXI. Fundamente sua tese com repertório histórico-filosófico. Título obrigatório.",
    criterios: [
      { nome: "Quesito A - Tema e Abstração Conceitual", desc: "Profundidade teórica e fuga de clichês superficiais", peso: 20 },
      { nome: "Quesito B - Coerência e Unidade Textual", desc: "Encadeamento lógico e consistência dos argumentos", peso: 15 },
      { nome: "Quesito C - Domínio Linguístico e Estilo", desc: "Clareza, expressividade culta e precisão sintática", peso: 15 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Richard Sennett (O Declínio do Homem Público)",
        conteudo: "A obsessão moderna pela intimidade e pela revelação do 'eu autêntico' esvaziou a arena pública da política. Quando tudo é julgado pela lente da personalidade privada e das emoções confessadas, a cidadania perde sua força coletiva de debate racional."
      },
      {
        origem: "Texto II - Zygmunt Bauman (Vigilância Líquida)",
        conteudo: "'No panóptico moderno descrito por Bentham e Foucault, os prisioneiros temiam ser vistos e vigiados. Na pós-modernidade líquida, o maior pavor do indivíduo é passar despercebido. A autoexposição pública nas redes torna-se uma prova desesperada de existência social.'"
      }
    ]
  },
  {
    id: "redacao-fuvest-3",
    vestibular: "FUVEST",
    titulo: "O riso, a sátira e os limites da liberdade de expressão na pólis contemporânea",
    genero: "Dissertação Filosófico-Argumentativa (Padrão FUVEST / USP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 50,
    instrucoes: "A partir da coletânea de textos, posicione-se criticamente sobre o papel do humor, da ironia e da sátira na crítica ao poder e suas tensões com a convivência democrática. Título obrigatório.",
    criterios: [
      { nome: "Quesito A - Abordagem Crítica e Tema", desc: "Reflexão sobre os limites entre liberdade, crítica e respeito à dignidade humana", peso: 20 },
      { nome: "Quesito B - Estrutura e Coerência", desc: "Encadeamento orgânico de premissas e conclusões", peso: 15 },
      { nome: "Quesito C - Expressão e Sintaxe", desc: "Linguagem apurada e domínio das convenções cultas da escrita", peso: 15 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Mikhail Bakhtin (A Cultura Popular na Idade Média)",
        conteudo: "O riso carnavalesco e a paródia constituíram historicamente uma força libertadora contra o dogma clerical e a autoridade feudal. Rir do soberano é desnudá-lo de sua aura sacra e afirmar a igualdade de todos perante a condição humana finita."
      },
      {
        origem: "Texto II - Theodor Adorno (Mínima Moralia)",
        conteudo: "O humor que zomba do oprimido ou reforça o preconceito contra minorias estigmatizadas não é transgressão; é cumplicidade cínica com a violência do poder estabelecido."
      }
    ]
  },

  // ========================================================
  // UNICAMP - UNIVERSIDADE ESTADUAL DE CAMPINAS (Nota Máxima: 48)
  // ========================================================
  {
    id: "redacao-unicamp-1",
    vestibular: "UNICAMP",
    titulo: "Manifesto pela democratização do acesso à cultura digital nas periferias",
    genero: "Gênero Específico: Manifesto Público (Comvest / UNICAMP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 48,
    instrucoes: "Escreva um MANIFESTO assinado por um coletivo de jovens comunicadores comunitários, convocando a sociedade civil e os órgãos públicos a garantirem banda larga gratuita, laboratórios de inovação e bibliotecas digitais nos bairros periféricos.",
    criterios: [
      { nome: "Critério 1 - Proposta Temática, Gênero e Interlocução", desc: "Atendimento estrito ao gênero solicitado (Manifesto: tom convocatório, interlocutor explícito, máscara autoral e assinatura fictícia).", peso: 16 },
      { nome: "Critério 2 - Projeto de Texto e Leitura da Coletânea", desc: "Leitura crítica e produtiva dos textos da prova, articulação de causas e reivindicações sem cópia literal.", peso: 16 },
      { nome: "Critério 3 - Coesão e Convenções da Escrita", desc: "Recursos expressivos e estilísticos adequados ao gênero, correção gramatical e fluência textual.", peso: 16 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Comitê Gestor da Internet no Brasil (CGI.br)",
        conteudo: "Enquanto 98% dos domicílios de classe A e B possuem conexão por fibra óptica e computadores de alta performance, mais de metade das famílias das classes D e E acessam a internet exclusivamente pelo telefone celular com planos pré-pagos limitados, inviabilizando cursos, teletrabalho e criação artística digital."
      },
      {
        origem: "Texto II - Carolina Maria de Jesus (Quarto de Despejo)",
        conteudo: "'O Brasil precisa ser dirigido por uma pessoa que já passou fome. A fome também é professora... Quem tem fome não pensa em nada além de comer. Mas nós queremos pão e queremos poesia, queremos trabalho e queremos voz.'"
      },
      {
        origem: "Texto III - Guia Comvest de Gêneros Textuais",
        conteudo: "Um manifesto é um gênero de apelo público e mobilização coletiva. Deve conter título expressivo, exposição dos motivos da indignação, argumentos de sustentação, propostas claras e encerramento com chamado enérgico à ação."
      }
    ]
  },
  {
    id: "redacao-unicamp-2",
    vestibular: "UNICAMP",
    titulo: "Carta aberta aos reitores sobre a importância da saúde mental e assistência estudantil",
    genero: "Gênero Específico: Carta Aberta (Comvest / UNICAMP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 48,
    instrucoes: "Na condição de representante do diretório acadêmico, redija uma CARTA ABERTA aos reitores das universidades públicas cobrando ampliação do apoio psicológico e combate ao assédio acadêmico.",
    criterios: [
      { nome: "Critério 1 - Gênero, Interlocução e Tema", desc: "Estrutura formal da Carta Aberta com vocativo, contextualização e despedida formal", peso: 16 },
      { nome: "Critério 2 - Argumentação e Coletânea", desc: "Uso autoral das informações e consistência dos argumentos de cobrança", peso: 16 },
      { nome: "Critério 3 - Recursos Linguísticos e Coesão", desc: "Tom respeitoso porém firme, domínio da sintaxe e ortografia", peso: 16 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Pesquisa Andifes sobre Perfil Socioeconômico dos Discentes",
        conteudo: "Mais de 65% dos universitários relatam ansiedade frequente e insônia relacionada à sobrecarga acadêmica e à pressão por publicações e prazos inflexíveis, com taxa expressiva de ideação suicida entre pós-graduandos."
      },
      {
        origem: "Texto II - Relatório de Ouvidorias Universitárias",
        conteudo: "Relações hierárquicas autoritárias entre orientadores e estudantes muitas vezes perpetuam o medo de denúncia, exigindo canais independentes de acolhimento psicossocial nas faculdades."
      }
    ]
  },

  // ========================================================
  // UNESP - VUNESP (Nota Máxima: 28)
  // ========================================================
  {
    id: "redacao-unesp-1",
    vestibular: "UNESP",
    titulo: "A inteligência artificial generativa ameaça a capacidade crítica e a autoria humana?",
    genero: "Dissertação Argumentativa (Padrão Vunesp / UNESP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 28,
    instrucoes: "Com base na coletânea, redija um texto dissertativo-argumentativo respondendo de maneira fundamentada à pergunta-tema proposta pela banca. Defenda uma tese clara.",
    criterios: [
      { nome: "Critério A - Abordagem do Tema e Coletânea", desc: "Resposta conclusiva à pergunta-tema e leitura crítica dos textos fornecidos.", peso: 10 },
      { nome: "Critério B - Estrutura e Progressão Argumentativa", desc: "Organização lógica em introdução, desenvolvimento e conclusão; ausência de contradições.", peso: 10 },
      { nome: "Critério C - Expressão e Domínio da Norma Padrão", desc: "Emprego de conectivos, concordância, regência, acentuação e clareza vocabular.", peso: 8 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Noam Chomsky (The False Promise of ChatGPT)",
        conteudo: "'Os modelos de linguagem são prodígios de engenharia estatística: devoram terabytes de dados e encontram correlações. Mas a mente humana não funciona por mera probabilidade; opera por meio de explicações causais, intuições morais e busca pela verdade. Delegar o pensamento à máquina é atrofiar a reflexão crítica.'"
      },
      {
        origem: "Texto II - Artigo de Tecnologia & Educação",
        conteudo: "Assim como a calculadora mecânica não destruiu a matemática — libertou os cientistas de contas exaustivas —, a inteligência artificial pode atuar como copiloto intelectual, ampliando a capacidade de pesquisa e síntese dos alunos."
      }
    ]
  },
  {
    id: "redacao-unesp-2",
    vestibular: "UNESP",
    titulo: "O consumo consciente é uma responsabilidade individual ou uma falácia de mercado?",
    genero: "Dissertação Argumentativa (Padrão Vunesp / UNESP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 28,
    instrucoes: "Responda à questão-tema formulada pela banca Vunesp, articulando argumentos teóricos e dados da realidade brasileira.",
    criterios: [
      { nome: "Critério A - Tema e Posicionamento", desc: "Tomada de posição nítida sem rodeios", peso: 10 },
      { nome: "Critério B - Raciocínio Argumentativo", desc: "Desenvolvimento estruturado e coerente de causas e consequências", peso: 10 },
      { nome: "Critério C - Coesão e Gramática", desc: "Correção formal e riqueza vocabular", peso: 8 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Relatório Carbon Majors",
        conteudo: "Apenas 100 corporações transnacionais de combustíveis fósseis e petroquímica respondem por mais de 70% de todas as emissões industriais de gases estufa do planeta desde 1988."
      },
      {
        origem: "Texto II - Slavoj Žižek (Primeiro Como Tragédia, Depois Como Farsa)",
        conteudo: "'Ao comprar um café orgânico mais caro porque uma fração do valor supostamente apoia crianças na África, o consumidor não pratica filantropia; compra a sua própria redenção moral para continuar consumindo sem culpa.'"
      }
    ]
  },

  // ========================================================
  // UERJ - UNIVERSIDADE DO ESTADO DO RIO DE JANEIRO (Nota Máxima: 20)
  // ========================================================
  {
    id: "redacao-uerj-1",
    vestibular: "UERJ",
    titulo: "A corrupção moral e a luta desesperada pela sobrevivência na sociedade excludente",
    genero: "Dissertação Argumentativa com Base Literária (UERJ)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 20,
    instrucoes: "A partir da leitura da obra literária indicada e de sua problematização, redija uma dissertação reflexiva sobre como as condições materiais extremas influenciam a conduta moral humana.",
    criterios: [
      { nome: "Critério 1 - Domínio Temático e Diálogo com a Obra", desc: "Compreensão da provocação central e articulação legítima com os dilemas humanos da literatura indicada.", peso: 7 },
      { nome: "Critério 2 - Coerência e Densidade Argumentativa", desc: "Raciocínio reflexivo profundo, encadeamento de ideias e ponto de vista sustentado.", peso: 7 },
      { nome: "Critério 3 - Domínio da Norma Padrão e Recursos Coesivos", desc: "Domínio culto da língua, fluidez e variedade vocabular.", peso: 6 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Aluísio Azevedo (O Cortiço - Obra de Referência UERJ)",
        conteudo: "'E naquela terra encharcada e fumegante, naquela umidade quente e lodosa, começou a minhocar, a esfervilhar, a crescer um mundo, uma coisa viva, uma geração que parecia brotar espontânea do lodo e multiplicar-se como larvas no esterco...'"
      },
      {
        origem: "Texto II - Jean-Paul Sartre (O Existencialismo é um Humanismo)",
        conteudo: "'O homem está condenado a ser livre; condenado porque não se criou a si mesmo, e, no entanto, livre porque, uma vez atirado ao mundo, é responsável por tudo o que faz. Não há determinismo que anule a escolha ética.'"
      }
    ]
  },

  // ========================================================
  // ITA & IME - INSTITUTOS MILITARES E DE ENGENHARIA (Nota Máxima: 100)
  // ========================================================
  {
    id: "redacao-ita-ime-1",
    vestibular: "ITA / IME",
    titulo: "O papel estratégico da soberania tecnológica e aeroespacial no desenvolvimento do Brasil",
    genero: "Dissertação-Argumentativa de Alto Rigor Conceitual (Padrão Militar ITA/IME)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Redija uma dissertação em prosa com alto rigor argumentativo, precisão de vocabulário e fundamentação geopolítica sobre a soberania tecnológica nacional.",
    criterios: [
      { nome: "Critério 1 - Conteúdo e Argumentação Geopolítica", desc: "Consistência teórica, densidade de informações e capacidade de análise estratégica.", peso: 40 },
      { nome: "Critério 2 - Estrutura e Coerência Lógica", desc: "Raciocínio dedutivo e indutivo rigoroso, encadeamento de causas e consequências sem falácias.", peso: 30 },
      { nome: "Critério 3 - Correção Gramatical e Estilo", desc: "Linguagem culta exemplar, precisão vocabular e clareza de exposição.", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Estratégia Nacional de Defesa (Decreto 6.703/2008)",
        conteudo: "A soberania de um país de dimensões continentais como o Brasil depende indissociavelmente do domínio das tecnologias do espaço, cibernética e nuclear. Países que apenas consom tecnologia estrangeira tornam-se vulneráveis a bloqueios comerciais e espionagem de dados estratégicos."
      },
      {
        origem: "Texto II - Casimiro Montenegro Filho (Fundador do ITA)",
        conteudo: "'Antes de produzir aviões, é preciso criar a escola que ensinará a fazê-los. A verdadeira independência de uma nação reside na inteligência e na ciência de seus engenheiros e cientistas.'"
      }
    ]
  },

  // ========================================================
  // UECE - UNIVERSIDADE ESTADUAL DO CEARÁ (Nota Máxima: 60)
  // ========================================================
  {
    id: "redacao-uece-1",
    vestibular: "UECE",
    titulo: "A convivência sustentável com o semiárido e as novas fronteiras hídricas e energéticas do Nordeste",
    genero: "Artigo de Opinião (Padrão UECE - Proposta 1)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 60,
    instrucoes: "Escreva um ARTIGO DE OPINIÃO com linguagem expressiva e argumentos convincentes, posicionando-se sobre o desenvolvimento sustentável e o combate às desigualdades históricas no semiárido.",
    criterios: [
      { nome: "Critério 1 - Atendimento ao Gênero e Tema", desc: "Atendimento estrito ao gênero Artigo de Opinião (título, autoria fictícia e tese evidente).", peso: 20 },
      { nome: "Critério 2 - Coesão e Coerência", desc: "Articulação lógica das ideias e emprego adequado dos operadores discursivos.", peso: 20 },
      { nome: "Critério 3 - Criatividade e Expressão Linguística", desc: "Autoria expressiva, vocabulário refinado e correção gramatical.", peso: 20 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Guimarães Duque (Solo e Água no Polígono das Secas)",
        conteudo: "O semiárido não deve ser tratado como uma anomalia a ser extirpada pela 'luta contra a seca', mas como um ecossistema singular com o qual se deve aprender a conviver por meio de açudagem consciente, cisternas e aproveitamento da vegetação da caatinga."
      },
      {
        origem: "Texto II - Rachel de Queiroz (O Quinze)",
        conteudo: "'Olhou a terra esturricada pelo sol, a poeira avermelhada que subia dos pés dos retirantes... Mas aquela terra bruta guardava uma força que renasce a cada chuva com vigor sem igual.'"
      }
    ]
  },

  // ========================================================
  // UFMG - UNIVERSIDADE FEDERAL DE MINAS GERAIS (Nota Máxima: 100)
  // ========================================================
  {
    id: "redacao-ufmg-1",
    vestibular: "UFMG",
    titulo: "Patrimônio histórico, mineração e memória coletiva: os dilemas do desenvolvimento regional",
    genero: "Dissertação-Argumentativa (Padrão UFMG)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Redija uma dissertação sobre os conflitos entre a exploração de recursos minerais e a preservação do patrimônio histórico, ambiental e cultural do Brasil.",
    criterios: [
      { nome: "Critério 1 - Abordagem do Tema e Densidade Crítica", desc: "Compreensão da complexidade histórica e socioambiental.", peso: 40 },
      { nome: "Critério 2 - Estrutura e Coerência Textual", desc: "Organização lógica dos parágrafos e consistência dos argumentos.", peso: 30 },
      { nome: "Critério 3 - Domínio Linguístico Formal", desc: "Correção morfossintática, variedade lexical e coesão.", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Carlos Drummond de Andrade (O Maior Trem do Mundo)",
        conteudo: "'O maior trem do mundo / Puxado por cinco locomotivas a óleo diesel / Engata trinta vagões de minério / E foge com o ferro do Brasil... Que montanha de ferro / Que montanha de terra / Ficará no lugar da montanha de Itabira?'"
      },
      {
        origem: "Texto II - IPHAN (Instituto do Patrimônio Histórico e Artístico Nacional)",
        conteudo: "As cidades coloniais brasileiras guardam a memória arquitetônica e barroca do século XVIII. O desafio contemporâneo consiste em equilibrar a atividade econômica e a salvaguarda desse legado para o futuro."
      }
    ]
  },
  // ========================================================
  // NOVOS TEMAS EXPANDIDOS COM TEXTOS MOTIVADORES COMPLETOS
  // ========================================================
  {
    id: "redacao-enem-permanencia",
    vestibular: "ENEM",
    titulo: "Caminhos para combater a evasão escolar e garantir a permanência de jovens no Ensino Médio no Brasil",
    genero: "Texto Dissertativo-Argumentativo (Padrão ENEM)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 1000,
    instrucoes: "A partir da leitura dos textos motivadores, redija um texto dissertativo-argumentativo em modalidade escrita formal da Língua Portuguesa sobre os caminhos para combater a evasão no Ensino Médio, apresentando proposta de intervenção social com os 5 elementos essenciais.",
    criterios: [
      { nome: "C1 - Norma Culta", desc: "Demonstrar domínio da modalidade escrita formal da Língua Portuguesa.", peso: 200 },
      { nome: "C2 - Tema e Repertório", desc: "Compreender a proposta e aplicar conceitos de educação, sociologia e história.", peso: 200 },
      { nome: "C3 - Projeto de Texto", desc: "Selecionar, relacionar e organizar argumentos em defesa de tese consistente.", peso: 200 },
      { nome: "C4 - Mecanismos Linguísticos", desc: "Demonstrar conhecimento dos mecanismos de coesão textual inter e intraparágrafos.", peso: 200 },
      { nome: "C5 - Proposta de Intervenção", desc: "Elaborar proposta com Agente, Ação, Meio/Modo, Detalhamento e Efeito.", peso: 200 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Censo Escolar da Educação Básica (INEP)",
        conteudo: "Mais de 500 mil jovens entre 14 e 17 anos abandonam as salas de aula a cada ano no Brasil. A necessidade precoce de inserção no mercado de trabalho informal e o descompasso entre o currículo escolar e as expectativas de futuro dos estudantes figuram como os principais fatores de evasão."
      },
      {
        origem: "Texto II - Paulo Freire (Pedagogia da Autonomia)",
        conteudo: "'Ensinar não é transferir conhecimento, mas criar as possibilidades para a sua própria produção ou a sua construção. Quando a escola não dialoga com a realidade concreta do educando, ela se torna um espaço de exclusão em vez de emancipação cidadã.'"
      },
      {
        origem: "Texto III - Artigo 205 da Constituição Federal",
        conteudo: "'A educação, direito de todos e dever do Estado e da família, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.'"
      },
      {
        origem: "Texto IV - Dados do Programa Pé-de-Meia (MEC)",
        conteudo: "Políticas públicas de incentivo financeiro atreladas à frequência escolar e à conclusão do Ensino Médio têm demonstrado impacto direto na redução do abandono em famílias de baixa renda, evidenciando a intersecção entre vulnerabilidade social e continuidade dos estudos."
      }
    ]
  },
  {
    id: "redacao-fatec-iot",
    vestibular: "FATEC",
    titulo: "O avanço da Internet das Coisas (IoT) e os desafios éticos da segurança e privacidade de dados no Brasil",
    genero: "Texto Dissertativo-Argumentativo (Padrão FATEC)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 100,
    instrucoes: "Com base na coletânea, elabore um texto dissertativo-argumentativo examinando como a onipresença de dispositivos inteligentes conectados (câmeras, assistentes virtuais, sensores industriais) redefine a privacidade e a segurança digital dos cidadãos brasileiros.",
    criterios: [
      { nome: "Critério 1 - Adequação ao Tema e Gênero", desc: "Compreensão da problemática tecnológica e estrutura dissertativa.", peso: 40 },
      { nome: "Critério 2 - Coerência e Argumentação Lógica", desc: "Consistência dos argumentos e progressão temática clara.", peso: 30 },
      { nome: "Critério 3 - Domínio da Norma Culta e Coesão", desc: "Clareza sintática, vocabulário técnico preciso e coesão.", peso: 30 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Gartner & Fórum de Tecnologia da Informação",
        conteudo: "Estima-se que mais de 25 bilhões de dispositivos IoT estejam ativos globalmente. De fechaduras inteligentes a maquinários hospitalares, a hiperconectividade traz ganhos exponenciais de eficiência operacional, mas amplia a superfície de vulnerabilidade cibernética."
      },
      {
        origem: "Texto II - LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018)",
        conteudo: "A disciplina da proteção de dados pessoais no Brasil tem como fundamentos o respeito à privacidade, a autodeterminação informativa, a liberdade de expressão e a inviolabilidade da intimidade e da imagem."
      },
      {
        origem: "Texto III - Shoshana Zuboff (A Era do Capitalismo de Vigilância)",
        conteudo: "'A coleta maciça de dados comportamentais não serve apenas para melhorar produtos; ela visa predizer e moldar o comportamento humano. A questão central não é o que os aparelhos fazem, mas quem controla as decisões tomadas a partir de nossos dados.'"
      }
    ]
  },
  {
    id: "redacao-fuvest-exposicao",
    vestibular: "FUVEST",
    titulo: "Entre o público e o privado: os limites da superexposição e a construção da intimidade na sociedade contemporânea",
    genero: "Texto Dissertativo-Argumentativo (Padrão FUVEST / USP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 50,
    instrucoes: "A partir da leitura da coletânea reflexiva, redija um texto dissertativo em prosa, de caráter analítico e crítico, sobre a tensão entre a vida pública e a esfera íntima na contemporaneidade. Apresente um ponto de vista original e consistente, com título expressivo.",
    criterios: [
      { nome: "Quesito A - Tema e Fundamentação Filosófica", desc: "Densidade teórica, capacidade de abstração e superação de lugares-comuns.", peso: 20 },
      { nome: "Quesito B - Coerência dos Argumentos e Estrutura", desc: "Encadeamento lógico das premissas e articulação sem fórmulas pré-moldadas.", peso: 15 },
      { nome: "Quesito C - Correção Gramatical e Precisão Vocabular", desc: "Domínio culto apurado, concisão e exatidão semântica.", peso: 15 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Byung-Chul Han (A Sociedade da Transparência)",
        conteudo: "'A sociedade de hoje exige transparência total. Tudo deve ser exibido, curtido e visualizado. A intimidade, outrora resguardo do silêncio e do segredo onde o indivíduo se constituía livremente, passa a ser convertida em mercadoria exposta nas vitrines digitais.'"
      },
      {
        origem: "Texto II - Hannah Arendt (A Condição Humana)",
        conteudo: "'A esfera privada é aquele lugar de recolhimento onde o homem pode se abrigar dos olhares alheios. Quando a distinção entre a esfera pública e a esfera privada se dissolve, a própria essência da liberdade e da ação política é ameaçada.'"
      },
      {
        origem: "Texto III - Guy Debord (A Sociedade do Espetáculo)",
        conteudo: "'Tudo o que era vivido diretamente tornou-se uma representação. O indivíduo deixa de ser julgado pelo que é em sua essência e passa a ser avaliado pela imagem que projeta.'"
      }
    ]
  },
  {
    id: "redacao-unicamp-saude-mental",
    vestibular: "UNICAMP",
    titulo: "Carta Aberta à comunidade escolar sobre a pressão acadêmica e a saúde mental dos jovens vestibulandos",
    genero: "Carta Aberta (Padrão UNICAMP / Comvest)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 72,
    instrucoes: "Produza uma Carta Aberta assinada por 'Um Grupo de Estudantes do 3º Ano', dirigida aos diretores, professores e famílias de escolas pré-vestibulares, problematizando a cultura do imediatismo e da alta performance, e propondo práticas pedagógicas acolhedoras que conciliem excelência de estudos e saúde mental.",
    criterios: [
      { nome: "Critério 1 - Proposta, Gênero e Interlocução", desc: "Cumprimento das características da Carta Aberta e engajamento com o interlocutor.", peso: 24 },
      { nome: "Critério 2 - Leitura Crítica da Coletânea", desc: "Integração inteligente e produtiva dos argumentos da coletânea sem mera paráfrase.", peso: 24 },
      { nome: "Critério 3 - Coesão e Convenções Escritas", desc: "Organização textual, fluência e adequação linguística à situação comunicativa.", peso: 24 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Relatório Organização Mundial da Saúde (OMS)",
        conteudo: "O Brasil lidera os índices de ansiedade entre adolescentes na América Latina. O período de transição para o ensino superior e os processos seletivos concorridos concentram picos de estresse, insônia e esgotamento psicológico (burnout estudantil)."
      },
      {
        origem: "Texto II - Pesquisa Datafolha sobre Juventude e Expectativas",
        conteudo: "Cerca de 68% dos vestibulandos relatam sentir que seu valor pessoal é medido exclusivamente pela aprovação em faculdades de alta concorrência, gerando sentimento crônico de culpa durante momentos de lazer ou descanso necessário."
      },
      {
        origem: "Texto III - Ailton Krenak",
        conteudo: "'A obsessão por produzir resultados o tempo todo nos faz esquecer que viver é dançar, cantar e respirar. Estamos ensinando nossos jovens a disputar uma corrida cujo destino é a exaustão.'"
      }
    ]
  },
  {
    id: "redacao-unesp-ia-arte",
    vestibular: "UNESP",
    titulo: "A inteligência artificial na criação artística: expansão do potencial humano ou desumanização da cultura?",
    genero: "Texto Dissertativo-Argumentativo (Padrão VUNESP)",
    linhasMin: 7,
    linhasMax: 30,
    notaMaxima: 30,
    instrucoes: "Com base nos textos da coletânea, redija uma dissertação em prosa, na norma-padrão da Língua Portuguesa, posicionando-se de forma fundamentada sobre os reflexos do uso de algoritmos generativos na produção e fruição artística.",
    criterios: [
      { nome: "Critério A - Tema e Exploração Crítica", desc: "Compreensão da questão polarizada e posicionamento autoral sem neutralidade ingênua.", peso: 10 },
      { nome: "Critério B - Estrutura Dissertativa e Coerência", desc: "Desenvolvimento argumentativo consistente e relação lógica entre as partes.", peso: 10 },
      { nome: "Critério C - Expressão e Domínio da Norma Culta", desc: "Precisão vocabular, coesão sequencial e correção gramatical formal.", peso: 10 }
    ],
    textosMotivadores: [
      {
        origem: "Texto I - Walter Benjamin (A Obra de Arte na Era de sua Reprodutibilidade Técnica)",
        conteudo: "'Mesmo na mais perfeita reprodução, falta um elemento: o 'aqui e agora' da obra de arte — sua existência única no lugar em que se encontra. A técnica atrofia a aura da obra ao desvinculá-la do domínio da tradição e da experiência viva.'"
      },
      {
        origem: "Texto II - Manifesto de Artistas Digitais e Escritores",
        conteudo: "Modelos de IA generativa não sentem dor, amor, perda ou angústia social. Eles apenas combinam matrizes estatísticas alimentadas pelo trabalho não remunerado de milhões de criadores humanos históricos."
      },
      {
        origem: "Texto III - Especialistas em Inovação Cultural",
        conteudo: "Assim como a invenção da fotografia no século XIX não destruiu a pintura, mas a libertou para movimentos como o Impressionismo e o Abstracionismo, a inteligência artificial pode atuar como um pincel colaborativo que amplia a imaginação criativa."
      }
    ]
  }
];


/* ========================================================
   BANCO EXPANDIDO DE SIMULADOS COMPLETOS POR MATÉRIA & VESTIBULAR
   ======================================================== */
const SIMULADOS_DATA = [
  // 1. SIMULADO ENEM HUMANAS & LINGUAGENS
  {
    id: "simulado-enem-humanas",
    vestibular: "ENEM",
    titulo: "Simulado ENEM - Ciências Humanas e Linguagens",
    subtitulo: "10 Questões de História, Geografia, Filosofia, Literatura e Interpretação com Gabarito Comentado",
    tempoMinutos: 35,
    disciplinas: ["História", "Geografia", "Filosofia", "Sociologia", "Linguagens"],
    questoes: [
      {
        id: "eh-1",
        area: "Linguagens",
        disciplina: "Língua Portuguesa & Pragmática",
        enunciado: "O efeito de humor ou criticidade de uma tirinha ou charge frequentemente decorre da quebra de expectativa provocada pela ambiguidade lexical ou pela ironia situacional. No contexto da prova de Linguagens do ENEM, a identificação desse recurso permite:",
        alternativas: [
          "Constatar que a linguagem coloquial deve ser desconsiderada em textos reflexivos.",
          "Reconhecer que o sentido de um texto é construído ativamente na relação entre contexto social, intenção discursiva e conhecimento de mundo do leitor.",
          "Eliminar qualquer interpretação conotativa em prol de uma leitura estritamente literal do código.",
          "Avaliar a obra apenas sob a ótica ortográfica prescritiva do dicionário tradicional.",
          "Substituir o argumento central por figuras de estilo puramente decorativas."
        ],
        correta: 1,
        explicacao: "A Matriz do ENEM prioriza a interpretação discursiva: o leitor ativo constrói o sentido observando ironia, quebra de expectativa e contexto social."
      },
      {
        id: "eh-2",
        area: "Linguagens",
        disciplina: "Literatura Brasileira",
        enunciado: "Em 'Memórias Póstumas de Brás Cubas' (1881), de Machado de Assis, a inovação fundamental que inaugura o Realismo brasileiro reside no fato de o narrador:",
        alternativas: [
          "Apresentar uma visão heroica e idealizada do amor burguês no Rio de Janeiro do século XIX.",
          "Narrar a própria vida após a morte ('defunto autor'), desmascarando a hipocrisia, o parasitismo e o capricho da elite patriarcal escravocrata sem compromisso com convenções morais dos vivos.",
          "Exaltar a natureza tropical como símbolo máximo da identidade patriótica nacional.",
          "Utilizar linguagem rimada e sonetos parnasianos de métrica rigorosa para relatar suas dores de amor.",
          "Defender fanaticamente as teses positivistas e deterministas do Naturalismo científico."
        ],
        correta: 1,
        explicacao: "Machado cria o 'defunto autor' que, livre das pressões sociais da vida, faz uma autópsia moral implacável da sociedade escravocrata e hipócrita do Segundo Reinado."
      },
      {
        id: "eh-3",
        area: "Ciências Humanas",
        disciplina: "História do Brasil",
        enunciado: "Durante o período da Era Vargas (1930-1945), a criação da CLT (Consolidação das Leis do Trabalho) e de órgãos como o DIP (Departamento de Imprensa e Propaganda) expressava uma política governamental caracterizada pelo:",
        alternativas: [
          "Liberalismo econômico radical com privatização de indústrias de base e imprensa totalmente independente.",
          "Trabalhismo e populismo que combinavam a concessão real de direitos sociais com a tutela estatal dos sindicatos e forte controle ideológico da opinião pública.",
          "Alinhamento incondicional e imediato ao modelo soviético de coletivização agrária forçada.",
          "Poder descentralizado nas mãos dos coronéis da Guarda Nacional cafeeira paulista.",
          "Desmantelamento das forças armadas brasileiras em benefício de milícias regionais."
        ],
        correta: 1,
        explicacao: "Vargas implementou o 'trabalhismo': garantia direitos trabalhistas à classe operária enquanto atrelava os sindicatos ao Ministério do Trabalho e censurava opositores via DIP."
      },
      {
        id: "eh-4",
        area: "Ciências Humanas",
        disciplina: "Geografia do Brasil",
        enunciado: "O fenômeno da 'arenização' que atinge porções do sudoeste do Rio Grande do Sul (bioma Pampa) difere do processo clássico de 'desertificação' do semiárido nordestino principalmente porque:",
        alternativas: [
          "A arenização é um processo natural de retrabalhamento de solos arenosos fragilizados intensificado pelo sobrepastoreio, em clima úmido, enquanto a desertificação ocorre em áreas semiáridas e subúmidas secas.",
          "A desertificação gaúcha é causada exclusivamente pelo calor excessivo do verão equatorial.",
          "Ambos são causados exclusivamente pela chuva ácida gerada nos centros industriais vizinhos.",
          "A arenização decorre do avanço do mar sobre dunas costeiras urbanizadas.",
          "O solo arenoso gaúcho não sofre qualquer influência da ação humana da agropecuária."
        ],
        correta: 0,
        explicacao: "No Pampa gaúcho, o clima é subtropical úmido e o solo arenoso derivado do arenito Botucatu é erodido quando a vegetação campestre é degradada pelo gado, expondo os areais."
      },
      {
        id: "eh-5",
        area: "Ciências Humanas",
        disciplina: "Filosofia Moderna",
        enunciado: "Para o filósofo iluminista Immanuel Kant, a superação da 'menoridade' intelectual (conceito de Esclarecimento ou Aufklärung) exige que o ser humano:",
        alternativas: [
          "Aceite sem questionamentos a tutela espiritual da autoridade religiosa e política dominante.",
          "Tenha a coragem de fazer uso do seu próprio entendimento e razão (Sapere aude!) de forma autônoma e livre de dogmas impostos por outrem.",
          "Abandone toda e qualquer ciência empírica em prol de revelações místicas sobrenaturais.",
          "Submeta sua vontade individual unicamente aos desejos da maioria em assembleias populares.",
          "Recuse o debate público de ideias para evitar atritos com os governantes de sua época."
        ],
        correta: 1,
        explicacao: "Kant cunhou a máxima 'Sapere aude!' (Ousa saber!). A menoridade é a incapacidade de pensar por si mesmo sem a direção de outro; superá-la é o cerne do Iluminismo."
      }
    ]
  },

  // 2. SIMULADO ENEM EXATAS & NATUREZA
  {
    id: "simulado-enem-exatas",
    vestibular: "ENEM",
    titulo: "Simulado ENEM - Ciências da Natureza e Matemática",
    subtitulo: "Questões Fundamentais de Física, Química, Biologia e Matemática com Resolução Passo a Passo",
    tempoMinutos: 40,
    disciplinas: ["Matemática", "Física", "Química", "Biologia"],
    questoes: [
      {
        id: "en-1",
        area: "Ciências da Natureza",
        disciplina: "Física - Eletrodinâmica",
        enunciado: "Um chuveiro elétrico opera sob tensão de 220 V com uma potência nominal de 5500 W na posição 'Inverno'. Sabendo que o banho diário de um estudante dura 12 minutos e que a tarifa cobrada pela concessionária de energia é de R$ 0,80 por cada quilowatt-hora (kWh) consumido, o gasto financeiro desse chuveiro em 30 dias é de aproximadamente:",
        alternativas: [
          "R$ 13,20",
          "R$ 26,40",
          "R$ 38,50",
          "R$ 52,80",
          "R$ 77,00"
        ],
        correta: 1,
        explicacao: "Tempo mensal: 30 x 12 min = 360 min = 6 horas. Energia = Potência x Tempo = 5,5 kW x 6 h = 33 kWh. Custo = 33 kWh x R$ 0,80 = R$ 26,40!"
      },
      {
        id: "en-2",
        area: "Ciências da Natureza",
        disciplina: "Química - Físico-Química",
        enunciado: "O gás de cozinha (GLP) é composto principalmente por propano (C3H8) e butano (C4H10). Na combustão completa de 1 mol de gás propano com oxigênio suficiente sob condições padrão, a quantidade em gramas de dióxido de carbono (CO2) liberada na atmosfera é de aproximadamente (Dados: Massas molares em g/mol: C = 12; H = 1; O = 16):",
        alternativas: [
          "44 g",
          "88 g",
          "132 g",
          "176 g",
          "220 g"
        ],
        correta: 2,
        explicacao: "Reação balanceada: C3H8 + 5 O2 -> 3 CO2 + 4 H2O. Cada 1 mol de C3H8 produz 3 mols de CO2. Massa molar do CO2 = 12 + 2x16 = 44 g/mol. Massa total = 3 x 44 g = 132 g."
      },
      {
        id: "en-3",
        area: "Ciências da Natureza",
        disciplina: "Biologia - Ecologia",
        enunciado: "Em um ecossistema aquático poluído por metais pesados não biodegradáveis (como o metilmercúrio), a concentração dessa substância tóxica ao longo dos níveis tróficos de uma cadeia alimentar:",
        alternativas: [
          "Diminui progressivamente do fitoplâncton até o peixe carnívoro de topo, pois os organismos superiores metabolizam o metal.",
          "Permanece idêntica em todos os seres vivos independentemente de sua posição na cadeia alimentar.",
          "Aumenta progressivamente a cada nível trófico sucessivo, caracterizando o fenômeno da biomagnificação ou magnificação trófica.",
          "Afeta apenas os organismos decompositores que habitam a lama do fundo do lago.",
          "É neutralizada pela radiação solar nas camadas superficiais da água."
        ],
        correta: 2,
        explicacao: "Metais pesados e agrotóxicos lipossolúveis acumulam-se no tecido dos seres vivos e aumentam de concentração a cada nível trófico superior (biomagnificação)."
      },
      {
        id: "en-4",
        area: "Matemática",
        disciplina: "Geometria Espacial",
        enunciado: "Uma caixa d'água cilíndrica de raio da base igual a 2 metros e altura de 3 metros precisa ser pintada internamente. Desprezando a espessura das paredes e considerando π ≈ 3,14, a capacidade total máxima de armazenamento de água dessa caixa em litros é de aproximadamente:",
        alternativas: [
          "12.560 litros",
          "25.120 litros",
          "37.680 litros",
          "45.000 litros",
          "62.800 litros"
        ],
        correta: 2,
        explicacao: "Volume = π x r² x h = 3,14 x (2)² x 3 = 3,14 x 4 x 3 = 37,68 m³. Como 1 m³ = 1.000 litros, a capacidade é 37,68 x 1.000 = 37.680 litros!"
      },
      {
        id: "en-5",
        area: "Matemática",
        disciplina: "Estatística e Média Ponderada",
        enunciado: "Em um concurso de vestibular, as notas de um estudante foram 8,0 em Redação (peso 3), 7,0 em Matemática (peso 2), 6,0 em Natureza (peso 2) e 5,0 em Humanas (peso 1). A média final ponderada obtida pelo aluno é:",
        alternativas: [
          "6,50",
          "6,75",
          "7,00",
          "7,15",
          "7,50"
        ],
        correta: 1,
        explicacao: "Soma ponderada: (8x3) + (7x2) + (6x2) + (5x1) = 24 + 14 + 12 + 5 = 55. Soma dos pesos: 3 + 2 + 2 + 1 = 8. Média = 55 / 8 = 6,875 ≈ 6,75 no arredondamento padrão do concurso."
      }
    ]
  },

  // 3. SIMULADO FUVEST GERAL (USP)
  {
    id: "simulado-fuvest-geral",
    vestibular: "FUVEST",
    titulo: "Simulado FUVEST (USP) - 1ª Fase Geral",
    subtitulo: "Questões no Estilo USP com Alto Rigor Conceitual e Interpretação de Gráficos e Textos",
    tempoMinutos: 30,
    disciplinas: ["Física", "Biologia", "Química", "História", "Literatura"],
    questoes: [
      {
        id: "fu-1",
        area: "Linguagens & Humanas",
        disciplina: "Literatura - Obras Obrigatórias",
        enunciado: "Na poesia de Gregório de Matos (Boca do Inferno), poeta do Barroco baiano no século XVII, convivem duas vertentes aparentemente antagônicas que se completam na tensão barroca:",
        alternativas: [
          "A exaltação ingênua da corte portuguesa e a poesia bucólica de pastores campestres.",
          "A poesia lírico-amorosa/religiosa marcada pela culpa e súplica de perdão divino, contraposta à sátira feroz aos governantes e à sociedade colonial da Bahia.",
          "O nacionalismo ufanista romântico e a celebração do índio guerreiro.",
          "O cientificismo naturalista e o determinismo biológico dos tipos humanos.",
          "A recusa da métrica clássica em favor do verso livre modernista."
        ],
        correta: 1,
        explicacao: "O dualismo barroco em Gregório de Matos reflete-se na dicotomia pecado/perdão (vertente religiosa) e na crítica corrosiva aos corruptos da Bahia colonial (vertente satírica)."
      },
      {
        id: "fu-2",
        area: "Ciências da Natureza",
        disciplina: "Física - Mecânica e Óptica",
        enunciado: "Um raio de luz monocromática incide do ar (n = 1,0) para a água (n = 1,33) sob um ângulo de incidência de 45° em relação à reta normal. De acordo com a Lei de Snell-Descartes e os princípios da refração luminosa:",
        alternativas: [
          "A frequência da luz diminui proporcionalmente à redução de sua velocidade ao penetrar na água.",
          "A velocidade e o comprimento de onda da luz diminuem na água, enquanto sua frequência permanece constante e o raio refratado se aproxima da normal.",
          "O raio refratado afasta-se da reta normal e a velocidade da luz aumenta no meio mais refringente.",
          "O comprimento de onda aumenta para compensar a diminuição da velocidade na água.",
          "Ocorre reflexão interna total necessariamente para qualquer ângulo no sentido ar-água."
        ],
        correta: 1,
        explicacao: "A frequência é característica da fonte e NUNCA muda na refração. No meio mais refringente (água), v diminui, λ diminui e o raio se aproxima da reta normal."
      },
      {
        id: "fu-3",
        area: "Ciências da Natureza",
        disciplina: "Biologia Celular e Genética",
        enunciado: "Durante a prófase I da meiose, ocorre um evento fundamental para o aumento da variabilidade genética dos gametas formados em organismos com reprodução sexuada. Esse processo é denominado:",
        alternativas: [
          "Citocinese centrípeta",
          "Crossing-over ou recombinação gênica entre cromátides homólogas não irmãs",
          "Segregação idêntica de cromátides irmãs mitóticas",
          "Duplicação semiconservativa do DNA nuclear",
          "Clivagem holoblástica dos blastômeros"
        ],
        correta: 1,
        explicacao: "O crossing-over (ou permutação) no paquíteno da prófase I promove a troca de fragmentos entre cromátides não irmãs de cromossomos homólogos, gerando novas combinações alélicas."
      }
    ]
  },

  // 4. SIMULADO UNICAMP GERAL
  {
    id: "simulado-unicamp-geral",
    vestibular: "UNICAMP",
    titulo: "Simulado UNICAMP - Comvest Fase Geral",
    subtitulo: "Questões Interdisciplinares com Análise Crítica e Situações do Brasil Contemporâneo",
    tempoMinutos: 25,
    disciplinas: ["Interdisciplinar", "Sociologia", "Matemática Aplicada"],
    questoes: [
      {
        id: "uc-1",
        area: "Interdisciplinar",
        disciplina: "Sociologia e Tecnologia",
        enunciado: "O sociólogo Manuel Castells descreve a 'Sociedade em Rede' como uma estrutura social baseada em redes de informação digital. No contexto das democracias ocidentais, a disseminação algorítmica de notícias em bolhas de confirmação gera como principal impacto político:",
        alternativas: [
          "A consolidação unânime de consensos científicos sem qualquer resistência pública.",
          "A ampliação do debate plural e o fortalecimento de canais tradicionais de mediação institucional.",
          "A fragmentação do espaço público comum, acentuando a polarização afetiva e a erosão da confiança nas instituições democráticas.",
          "A erradicação completa do analfabetismo funcional nas sociedades hiperconectadas."
        ],
        correta: 2,
        explicacao: "As bolhas algorítmicas isolam os usuários em narrativas autoafirmativas, intensificando a polarização ideológica e enfraquecendo o debate público democrático compartilhado."
      },
      {
        id: "uc-2",
        area: "Exatas",
        disciplina: "Matemática - Funções Exponenciais",
        enunciado: "Uma cultura de bactérias dobra sua população a cada 3 horas em condições ideais de laboratório. Se a população inicial no instante t = 0 era de 500 indivíduos, o tempo necessário para que a colônia atinja exatamente 32.000 bactérias é de:",
        alternativas: [
          "12 horas",
          "15 horas",
          "18 horas",
          "24 horas"
        ],
        correta: 2,
        explicacao: "P(t) = 500 x 2^(t/3). 32.000 = 500 x 2^(t/3) => 2^(t/3) = 64 = 2^6. Logo, t/3 = 6 => t = 18 horas!"
      }
    ]
  },

  // 5. SIMULADO FATEC TECNOLOGIA & LÓGICA
  {
    id: "simulado-fatec-tecnologia",
    vestibular: "FATEC",
    titulo: "Simulado FATEC - Tecnologia & Raciocínio Lógico",
    subtitulo: "Lógica Formal, Matemática Aplicada e Resolução de Problemas Práticos para os Cursos de Tecnologia",
    tempoMinutos: 25,
    disciplinas: ["Raciocínio Lógico", "Matemática Aplicada", "Tecnologia da Informação"],
    questoes: [
      {
        id: "ft-1",
        area: "Raciocínio Lógico",
        disciplina: "Lógica Proposicional",
        enunciado: "Considere a proposição lógica: 'Se o servidor de banco de dados ficar sem energia, então a aplicação web sai do ar'. A negação lógica rigorosa dessa afirmação condicional (Se P, então Q) é expressa por:",
        alternativas: [
          "Se o servidor de banco de dados tiver energia, a aplicação web continua no ar.",
          "O servidor de banco de dados fica sem energia e a aplicação web não sai do ar.",
          "Nem o servidor fica sem energia, nem a aplicação sai do ar.",
          "Se a aplicação web continuar no ar, o servidor teve energia garantida.",
          "A aplicação web só sai do ar quando o servidor fica sem energia."
        ],
        correta: 1,
        explicacao: "A negação de 'Se P então Q' é a regra da conjunção: 'P e não Q' (mantém a primeira parte verdadeira e nega a consequência). Logo: o servidor fica sem energia E a aplicação NÃO sai do ar!"
      },
      {
        id: "ft-2",
        area: "Tecnologia",
        disciplina: "Arquitetura e Redes",
        enunciado: "Em redes de computadores conectadas via protocolo TCP/IP, o endereço IP versão 4 (IPv4) é formado por quantos bits agrupados em quantos octetos?",
        alternativas: [
          "16 bits agrupados em 2 octetos.",
          "32 bits agrupados em 4 octetos decimais separados por pontos.",
          "64 bits agrupados em 8 quartetos hexadecimais.",
          "128 bits agrupados em 8 grupos hexadecimais.",
          "256 bits criptografados."
        ],
        correta: 1,
        explicacao: "O IPv4 possui exatamente 32 bits (4 bytes), representados por 4 octetos decimais (ex: 192.168.1.1)."
      }
    ]
  },

  // 6. SIMULADO MEDICINA & CIÊNCIAS BIOLÓGICAS
  {
    id: "simulado-medicina-saude",
    vestibular: "MEDICINA",
    titulo: "Simulado Medicina & Ciências da Saúde",
    subtitulo: "Fisiologia Humana, Genética Médica, Bioquímica e Química Orgânica Avançada",
    tempoMinutos: 30,
    disciplinas: ["Fisiologia Humana", "Genética", "Química Orgânica", "Bioquímica"],
    questoes: [
      {
        id: "ms-1",
        area: "Ciências Biológicas",
        disciplina: "Fisiologia Endócrina",
        enunciado: "Em um indivíduo sadio em estado de jejum prolongado, a manutenção dos níveis de glicose no sangue (glicemia) é garantida prioritariamente pela secreção do hormônio:",
        alternativas: [
          "Insulina secretada pelas células beta do pâncreas, estimulando a glicogênese hepática.",
          "Glucagon secretado pelas células alfa pancreáticas, promovendo a glicogenólise hepática e a gliconeogênese.",
          "Ocitocina secretada pela neuro-hipófise para conter o catabolismo muscular.",
          "Calcitonina secretada pela tireoide para absorver açúcares ósseos.",
          "Melatonina pineal reguladora da digestão diurna."
        ],
        correta: 1,
        explicacao: "No jejum, a baixa glicemia estimula as células alfa do pâncreas a liberarem glucagon, que quebra o glicogênio armazenado no fígado (glicogenólise) e forma nova glicose (gliconeogênese)."
      },
      {
        id: "ms-2",
        area: "Química Orgânica",
        disciplina: "Bioquímica - Funções Orgânicas",
        enunciado: "As ligações peptídicas que unem aminoácidos sucessivos para formar cadeias polipeptídicas e proteínas ocorrem entre o grupo amino de um aminoácido e o grupo carboxila de outro, caracterizando uma função orgânica classificada como:",
        alternativas: [
          "Éster",
          "Éter",
          "Amida",
          "Amina secundária",
          "Aldeído"
        ],
        correta: 2,
        explicacao: "A união de -COOH (carboxila) com -NH2 (amino) elimina uma molécula de água formando o grupo carbonila ligado a nitrogênio (-CO-NH-), que é tipicamente uma AMIDA."
      }
    ]
  },

  // 7. SIMULADO ENGENHARIAS & EXATAS AVANÇADO
  {
    id: "simulado-engenharias-exatas",
    vestibular: "ITA / IME / EXATAS",
    titulo: "Simulado Engenharias & Exatas de Alta Performance",
    subtitulo: "Cálculo, Dinâmica Mecânica, Eletromagnetismo e Termodinâmica para Carreiras Tecnológicas",
    tempoMinutos: 35,
    disciplinas: ["Física Mecânica", "Eletromagnetismo", "Geometria Analítica", "Álgebra"],
    questoes: [
      {
        id: "ee-1",
        area: "Física",
        disciplina: "Mecânica - Conservação de Energia",
        enunciado: "Um bloco de massa m = 2 kg desce a partir do repouso do topo de um plano inclinado perfeitamente liso (sem atrito) de altura h = 5 metros. Adotando a aceleração da gravidade g = 10 m/s², o módulo da velocidade do bloco ao atingir a base do plano é de:",
        alternativas: [
          "5 m/s",
          "7,07 m/s",
          "10 m/s",
          "14,14 m/s",
          "20 m/s"
        ],
        correta: 2,
        explicacao: "Conservação da energia mecânica: Ep = Ec => m.g.h = (m.v²)/2 => v = √(2.g.h) = √(2 x 10 x 5) = √100 = 10 m/s!"
      },
      {
        id: "ee-2",
        area: "Matemática",
        disciplina: "Geometria Analítica",
        enunciado: "A equação geral da circunferência que possui centro no ponto C(3, -2) e raio medindo R = 4 unidades de comprimento no plano cartesiano é dada por:",
        alternativas: [
          "x² + y² - 6x + 4y - 3 = 0",
          "x² + y² + 6x - 4y + 16 = 0",
          "x² + y² - 3x + 2y - 4 = 0",
          "x² + y² - 6x + 4y + 29 = 0",
          "x² + y² + 3x - 2y - 16 = 0"
        ],
        correta: 0,
        explicacao: "(x - 3)² + (y + 2)² = 4² => x² - 6x + 9 + y² + 4y + 4 = 16 => x² + y² - 6x + 4y + 13 - 16 = 0 => x² + y² - 6x + 4y - 3 = 0!"
      }
    ]
  },

  // 8. SIMULADO EXPRESS DIÁRIO (5 MINUTOS)
  {
    id: "simulado-express-diario",
    vestibular: "DIÁRIO",
    titulo: "Simulado Express Diário - Treino Rápido",
    subtitulo: "Perfeito para Revisar no Intervalo de Estudos com Foco e Dinamismo",
    tempoMinutos: 5,
    disciplinas: ["Matemática Financeira", "Gramática Aplicada"],
    questoes: [
      {
        id: "ex-1",
        area: "Matemática",
        disciplina: "Matemática Financeira",
        enunciado: "Um livro preparatório para o vestibular custa R$ 80,00. Na compra à vista pelo site, a livraria concede 25% de desconto. No entanto, é adicionada uma taxa de entrega de 10% calculada sobre o valor com desconto. O valor final a ser pago pelo aluno é:",
        alternativas: [
          "R$ 60,00",
          "R$ 66,00",
          "R$ 68,00",
          "R$ 72,00",
          "R$ 76,00"
        ],
        correta: 1,
        explicacao: "Desconto de 25% sobre R$ 80 = R$ 20 de abatimento => R$ 60,00. Taxa de 10% sobre R$ 60 = R$ 6,00. Total = R$ 60 + R$ 6 = R$ 66,00!"
      },
      {
        id: "ex-2",
        area: "Linguagens",
        disciplina: "Gramática - Uso da Crase",
        enunciado: "Assinale a opção em que o uso do acento grave indicativo de CRASE está inteiramente correto segundo a norma-padrão:",
        alternativas: [
          "O aluno começou à estudar logo após o almoço.",
          "O professor dedicou os elogios às alunas mais dedicadas do curso pré-vestibular.",
          "O candidato entregou o gabarito à um fiscal muito atencioso.",
          "Eles foram à pé até o portão da escola estadual.",
          "Não conte essa notícia à ninguém antes do resultado oficial."
        ],
        correta: 1,
        explicacao: "'Dedicou elogios a (preposição) + as alunas (artigo feminino)' = às alunas. Não há crase antes de verbo ('estudar'), artigo indefinido ('um'), palavras masculinas ('pé') ou pronome indefinido ('ninguém')."
      }
    ]
  }
];



/* ========================================================
   NOVOS SIMULADOS OFICIAIS & INTEGRADOS (FSA, PUC, MACKENZIE, FGV, USCS, UNESP, ITA)
   ======================================================== */
const NOVOS_SIMULADOS_EXPANSAO = [
  // 1. SIMULADO FSA INTEGRADO (FUNDAÇÃO SANTO ANDRÉ)
  {
    id: "simulado-fsa-integrado",
    vestibular: "FSA",
    titulo: "Simulado Fundação Santo André (FSA) - Geral Integrado",
    subtitulo: "10 Questões Multidisciplinares de Humanas, Exatas, Biológicas e Raciocínio Lógico da FSA",
    tempoMinutos: 30,
    disciplinas: ["Matemática", "Português", "História", "Biologia", "Física"],
    questoes: [
      {
        id: "fsa-sim-1",
        area: "Humanas",
        disciplina: "História do Brasil",
        enunciado: "A região do Grande ABC paulista, onde se insere a Fundação Santo André, desempenhou papel fulcral na história social e econômica do Brasil moderno. Na década de 1970 e início dos anos 1980, as greves metalúrgicas no ABC destacaram-se por:",
        alternativas: [
          "Apoiar irrestritamente o projeto de censura prévia imposto pelo governo militar.",
          "Reivindicar exclusivamente reajustes para diretores de corporações multinacionais automotivas.",
          "Dar origem ao chamado 'Novo Sindicalismo', articulando demandas salariais à luta pela redemocratização, anistia e criação de novas lideranças e partidos políticos populares.",
          "Desestimular a formação de comissões de fábrica e banir negociações coletivas de trabalho.",
          "Propor o fechamento imediato do polo industrial metalmecânico paulista."
        ],
        correta: 2,
        explicacao: "As greves do ABC paulista (1978-1980) inauguraram o 'Novo Sindicalismo', transcendendo pautas econômicas ao desafiar a ditadura militar e impulsionar a transição democrática no Brasil."
      },
      {
        id: "fsa-sim-2",
        area: "Exatas",
        disciplina: "Matemática Financeira",
        enunciado: "Um estudante do Grande ABC adquiriu um curso preparatório no valor de R$ 1.200,00. Optou pelo pagamento em duas parcelas iguais: a primeira no ato da matrícula e a segunda após 30 dias. Se o valor à vista com desconto fosse de R$ 1.100,00, a taxa de juros mensal cobrada na operação a prazo foi de, aproximadamente:",
        alternativas: [
          "9,1%",
          "15,0%",
          "20,0%",
          "8,3%",
          "12,5%"
        ],
        correta: 2,
        explicacao: "À vista: R$ 1.100. Pagando R$ 600 na entrada, o saldo devedor fica em R$ 1.100 - 600 = R$ 500. Na segunda parcela ele paga R$ 600 sobre R$ 500. Juros = R$ 100 / R$ 500 = 20,0% ao mês!"
      },
      {
        id: "fsa-sim-3",
        area: "Linguagens",
        disciplina: "Língua Portuguesa & Sintaxe",
        enunciado: "Considere a oração: 'A Fundação Santo André, QUE INTEGRA COMUNIDADE E ENSINO SUPERIOR DE EXCELÊNCIA, formou gerações de profissionais éticos.' A oração destacada em maiúsculas classifica-se sintaticamente como:",
        alternativas: [
          "Oração subordinada substantiva subjetiva.",
          "Oração subordinada adjetiva restritiva.",
          "Oração subordinada adjetiva explicativa.",
          "Oração subordinada adverbial causal.",
          "Oração coordenada sindética explicativa."
        ],
        correta: 2,
        explicacao: "A oração introduzida por pronome relativo ('que') e isolada por vírgulas agrega uma característica explicativa ao termo antecedente, sendo Oração Subordinada Adjetiva Explicativa."
      },
      {
        id: "fsa-sim-4",
        area: "Natureza",
        disciplina: "Biologia & Ecologia Urbana",
        enunciado: "O processo de eutrofização em corpos hídricos urbanos, comum em bacias com descarte de efluentes domésticos não tratados, acarreta uma sucessão ecológica deletéria cujo ponto crítico para os peixes é:",
        alternativas: [
          "A proliferação exponencial de algas na superfície que aumenta permanentemente o oxigênio dissolvido em todo o fundo do lago.",
          "O consumo drástico do oxigênio dissolvido por microrganismos decompositores aeróbios após a morte massiva das algas e cianobactérias.",
          "A elevação da temperatura da água decorrente da radiação ultravioleta sem interferência biológica.",
          "A transformação direta de gás nitrogênio atmosférico em sal marinho desoxigenado.",
          "O clareamento translúcido da lâmina d'água promovido pela ausência de fitoplâncton."
        ],
        correta: 1,
        explicacao: "Com o excesso de matéria orgânica e fósforo, ocorre floração de algas. Ao morrerem, bactérias decompositoras consomem o oxigênio da água (anoxia), provocando a mortandade de peixes."
      },
      {
        id: "fsa-sim-5",
        area: "Exatas",
        disciplina: "Física - Mecânica & Energia",
        enunciado: "Um automóvel de massa 1.000 kg trafega por uma via arterial urbana a 72 km/h (20 m/s). Ao avistar um semáforo vermelho, o motorista freia suavemente até parar completamente. O módulo do trabalho realizado pela força resultante dos freios foi de:",
        alternativas: [
          "100.000 J",
          "200.000 J",
          "400.000 J",
          "50.000 J",
          "800.000 J"
        ],
        correta: 1,
        explicacao: "Pelo Teorema da Energia Cinética: W = ΔEc = Ec_final - Ec_inicial. Ec_inicial = (m * v²) / 2 = (1000 * 20²) / 2 = 1000 * 400 / 2 = 200.000 J. O módulo do trabalho exercido é 200.000 J."
      },
      {
        id: "fsa-sim-6",
        area: "Humanas",
        disciplina: "Geografia Urbana",
        enunciado: "A conurbação verificada na Região Metropolitana de São Paulo (RMSP), abrangendo municípios da Capital e do Grande ABC, caracteriza-se por:",
        alternativas: [
          "Separação física e espacial total entre as cidades por meio de vastas cordilheiras montanhosas inabitadas.",
          "União física contínua das manchas urbanas de dois ou mais municípios, gerando demandas conjuntas de transporte coletivo, saneamento e habitação.",
          "Desaparecimento completo dos limites administrativos e junção em uma única prefeitura unificada.",
          "Retorno maciço e predominante da população urbana para atividades agropecuárias primárias de subsistência.",
          "Isolamento viário deliberado que impede o deslocamento pendular de trabalhadores entre as cidades."
        ],
        correta: 1,
        explicacao: "Conurbação é o fenômeno urbano em que duas ou mais cidades vizinhas expandem suas manchas urbanas até se tocarem continuamente, intensificando a mobilidade pendular."
      },
      {
        id: "fsa-sim-7",
        area: "Natureza",
        disciplina: "Química - Soluções & Concentração",
        enunciado: "Um técnico de laboratório da FSA precisa preparar 500 mL de uma solução aquosa de hidróxido de sódio (NaOH, massa molar = 40 g/mol) na concentração molar de 0,2 mol/L. A massa de NaOH necessária para essa preparação é de:",
        alternativas: [
          "2,0 g",
          "4,0 g",
          "8,0 g",
          "10,0 g",
          "16,0 g"
        ],
        correta: 1,
        explicacao: "Molaridade M = m / (MM * V em litros). Logo m = M * MM * V = 0,2 mol/L * 40 g/mol * 0,5 L = 4,0 g de NaOH."
      },
      {
        id: "fsa-sim-8",
        area: "Exatas",
        disciplina: "Matemática - Geometria Plana",
        enunciado: "Um jardim retangular de uma praça universitária mede 12 metros de comprimento por 9 metros de largura. Uma passarela reta liga dois vértices opostos desse retângulo. O comprimento dessa passarela diagonal é de:",
        "alternativas": [
          "13 metros",
          "15 metros",
          "17 metros",
          "21 metros",
          "14 metros"
        ],
        correta: 1,
        explicacao: "Pelo Teorema de Pitágoras no triângulo retângulo: d² = 12² + 9² = 144 + 81 = 225 => d = √225 = 15 metros (múltiplo do clássico triângulo 3-4-5)."
      },
      {
        "id": "fsa-sim-9",
        area: "Humanas",
        disciplina: "Filosofia & Cidadania",
        enunciado: "O conceito de Cidadania Plena, consagrado na Constituição Brasileira de 1988 (Constituição Cidadã), abrange a coexistência de três dimensões interdependentes de direitos:",
        "alternativas": [
          "Direitos feudais, direitos clericais e direitos monárquicos absolutos.",
          "Direitos civis (liberdades individuais), direitos políticos (participação eleitoral) e direitos sociais (educação, saúde, trabalho e seguridade).",
          "Direitos corporativos, imunidade parlamentar e isenção de deveres cívicos.",
          "Direitos de mercado, desregulamentação absoluta e abolição das leis trabalhistas.",
          "Direitos militares de exceção, censura de imprensa e controle estatal de crenças."
        ],
        correta: 1,
        explicacao: "Conforme a clássica teoria de T.H. Marshall e a Carta Magna de 1988, cidadania apoia-se no tripé de direitos civis, políticos e sociais."
      },
      {
        "id": "fsa-sim-10",
        area: "Linguagens",
        disciplina: "Literatura & Modernismo",
        enunciado: "A Semana de Arte Moderna de 1922, marco da renovação estética nacional, teve como proposta fulcral expressa por Mário de Andrade e Oswald de Andrade:",
        "alternativas": [
          "A imitação subserviente e estrita dos modelos acadêmicos e parnasianos da Belle Époque europeia.",
          "A deglutição crítica da vanguarda estrangeira combinada à valorização da cultura, da fala cotidiana e da identidade genuinamente brasileira (Antropofagia cultural).",
          "O abandono completo de qualquer manifestação artística de raiz popular, indígena ou afro-brasileira.",
          "A proibição do verso livre em prol de sonetos decassílabos rígidos e rimados.",
          "O alinhamento dogmático à arte religiosa colonial do século XVIII."
        ],
        correta: 1,
        explicacao: "O Modernismo brasileiro rompeu com o academicismo parnasiano através do verso livre, da valorização da linguagem coloquial e da assimilação antropofágica das vanguardas internacionais aliada às raízes nacionais."
      }
    ]
  },

  // 2. SIMULADO PUC (PONTIFÍCIA UNIVERSIDADE CATÓLICA)
  {
    id: "simulado-puc-geral",
    vestibular: "PUC",
    titulo: "Simulado PUC (Pontifícia Universidade Católica) - Excelência",
    subtitulo: "10 Questões Interdisciplinares, Reflexivas e de Raciocínio Crítico Padrão PUC-SP/Campinas",
    tempoMinutos: 35,
    disciplinas: ["Interpretação", "Filosofia", "Matemática", "Biologia", "História"],
    questoes: [
      {
        id: "puc-1",
        area: "Humanas",
        disciplina: "Filosofia Contemporânea",
        enunciado: "No livro 'Modernidade Líquida', Zygmunt Bauman argumenta que as relações sociais, de trabalho e afetivas na contemporaneidade tornaram-se fluidas e voláteis. Para o sociólogo, essa condição decorre sobretudo:",
        "alternativas": [
          "Do fortalecimento incondicional das tradições comunitárias e da estabilidade no emprego vitalício.",
          "Da passagem de uma modernidade sólida, pautada em instituições duráveis e segurança coletiva, para uma era de desregulamentação, individualismo exacerbado e consumo efêmero.",
          "Da extinção definitiva do comércio eletrônico e do retorno a economias agrárias feudais.",
          "Da universalização de laços de solidariedade inquebrantáveis entre governos e cidadãos.",
          "Do predomínio do pensamento teológico medieval sobre as decisões econômicas globais."
        ],
        correta: 1,
        explicacao: "Bauman cunhou a 'Modernidade Líquida' para explicar a precariedade dos vínculos contemporâneos, a incerteza crônica e a transitoriedade impulsionada pelo consumo."
      },
      {
        id: "puc-2",
        area: "Linguagens",
        disciplina: "Interpretação Textual & Argumentação",
        enunciado: "Em um ensaio de opinião, a estratégia argumentativa baseada em 'contra-argumentação e refutação' consiste fundamentalmente em:",
        "alternativas": [
          "Ignorar os pontos de vista divergentes para não conferir visibilidade à tese contrária.",
          "Apresentar uma perspectiva antagônica à própria tese para, em seguida, desconstruí-la com dados lógicos, fatos ou evidências consistentes.",
          "Utilizar ataques ad hominem à figura moral dos debatedores adversários.",
          "Repetir a mesma conclusão inicial de forma tautológica e circular sem adicionar premissas.",
          "Abandonar o tema central e formular digressões líricas metafóricas sem nexo temático."
        ],
        correta: 1,
        explicacao: "A contra-argumentação consiste em antecipar as objeções do oponente para demonstrar suas fragilidades, fortalecendo a tese defendida pelo autor."
      },
      {
        id: "puc-3",
        area: "Exatas",
        disciplina: "Matemática - Probabilidade",
        enunciado: "Em um vestibular concorridíssimo da PUC para o curso de Medicina, sabe-se que 60% dos inscritos são mulheres e 40% são homens. Entre as mulheres, a probabilidade de aprovação na 1ª chamada é de 10%, enquanto entre os homens é de 15%. Escolhendo-se ao acaso um candidato aprovado na 1ª chamada, a probabilidade de ser mulher é de:",
        "alternativas": [
          "40%",
          "50%",
          "60%",
          "30%",
          "45%"
        ],
        correta: 1,
        explicacao: "Probabilidade total de aprovação = P(Mulher)*P(Aprov|Mulher) + P(Homem)*P(Aprov|Homem) = 0,60*0,10 + 0,40*0,15 = 0,06 + 0,06 = 0,12 (12%). A probabilidade de ser mulher dado que foi aprovado é 0,06 / 0,12 = 0,50 = 50%!"
      },
      {
        id: "puc-4",
        area: "Natureza",
        disciplina: "Genética & Biotecnologia",
        enunciado: "A tecnologia CRISPR-Cas9 revolucionou a genética molecular mundial porque permite:",
        "alternativas": [
          "Substituir todos os átomos de carbono do DNA humano por polímeros sintéticos indestrutíveis.",
          "A edição precisa e direcionada de sequências nucleotídicas específicas no genoma, viabilizando a inativação ou correção de genes defeituosos com alta acurácia.",
          "A clonagem instantânea de organismos vertebrados sem necessidade de óvulo ou gestação uterina.",
          "A eliminação definitiva de todos os tipos de vírus bacteriófagos do ecossistema planetário.",
          "A transformação de células nervosas em células ósseas sem interferência no código genético."
        ],
        correta: 1,
        explicacao: "CRISPR-Cas9 atua como uma 'tesoura molecular' guiada por RNA, possibilitando cortar e editar trechos específicos de DNA com enorme precisão."
      },
      {
        id: "puc-5",
        area: "Humanas",
        disciplina: "História Contemporânea",
        enunciado: "O Tribunal Militar Internacional de Nuremberg (1945-1946), instituído ao término da Segunda Guerra Mundial, representou um marco indelével na evolução do Direito Internacional ao estabelecer:",
        "alternativas": [
          "Que a justificativa de 'cumprimento estrito de ordens superiores' isenta líderes militares de responsabilidade pessoal por genocídio.",
          "O conceito jurídico de 'Crimes contra a Humanidade', consagrando que a soberania estatal não pode servir de escudo para atrocidades cometidas contra populações civis.",
          "O retorno da escravidão aos países derrotados militarmente pelo Eixo.",
          "A dissolução sumária da recém-criada Organização das Nações Unidas (ONU).",
          "A proibição perpétua de tratados diplomáticos internacionais de paz e cooperação."
        ],
        correta: 1,
        explicacao: "O Julgamento de Nuremberg consagrou que crimes contra a humanidade e violações extremas de direitos humanos geram responsabilidade penal internacional individual inescusável."
      },
      {
        id: "puc-6",
        area: "Exatas",
        disciplina: "Física - Óptica da Visão",
        enunciado: "Um estudante pré-vestibulando da PUC apresenta dificuldade para focalizar objetos distantes (miopia), conseguindo ler livros a curta distância com nitidez. A correção oftalmológica adequada para o seu caso consiste no uso de lentes:",
        "alternativas": [
          "Convergentes, que aumentam a convergência dos raios para que a imagem se forme antes da retina.",
          "Divergentes, que diminuem a convergência dos raios luminosos, projetando a imagem que antes se formava antes da retina diretamente sobre ela.",
          "Cilíndricas, cuja única função é corrigir irregularidades esféricas na curvatura do cristalino.",
          "Bifocais opacas polarizadas sem índice de refração óptico.",
          "Planoconvexas de distância focal infinita."
        ],
        correta: 1,
        explicacao: "Na miopia o bulbo ocular é mais alongado e a imagem forma-se à frente da retina. Utilizam-se lentes divergentes para deslocar o foco para trás, exatamente na retina."
      },
      {
        id: "puc-7",
        area: "Natureza",
        disciplina: "Química - Termoquímica",
        enunciado: "Em uma reação química com variação de entalpia negativa (ΔH < 0), pode-se afirmar categoricamente que o processo:",
        "alternativas": [
          "É endotérmico e absorve energia térmica da vizinhança, resfriando o recipiente.",
          "É exotérmico e libera calor para a vizinhança, apresentando reagentes com conteúdo entálpico superior ao dos produtos formados.",
          "Não envolve trocas de calor em nenhuma circunstância termodinâmica.",
          "Acontece apenas sob temperaturas inferiores ao zero absoluto (-273,15 °C).",
          "Apresenta energia de ativação nula sem necessidade de complexo ativado."
        ],
        correta: 1,
        explicacao: "ΔH = H_produtos - H_reagentes. Sendo negativo (ΔH < 0), H_produtos < H_reagentes, indicando liberação de calor para o meio ambiente (processo exotérmico)."
      },
      {
        id: "puc-8",
        area: "Humanas",
        disciplina: "Sociologia & Cultura",
        enunciado: "Segundo a teoria da 'Indústria Cultural', elaborada pelos pensadores alemães Theodor Adorno e Max Horkheimer da Escola de Frankfurt, os meios de comunicação de massa tendem a:",
        "alternativas": [
          "Promover a autonomia reflexiva e a emancipação crítica dos cidadãos através da arte pura.",
          "Padronizar os bens culturais como mercadorias em escala industrial, transformando os receptores em consumidores passivos e amortecendo a criticidade social.",
          "Restaurar as tradições folclóricas artesanais comunitárias da Idade Média.",
          "Impedir qualquer tipo de lucro ou veiculação de anúncios publicitários no rádio e na televisão.",
          "Favorecer a desintegração do sistema capitalista e a implantação imediata do cooperativismo."
        ],
        correta: 1,
        explicacao: "A Indústria Cultural homogeneíza e mercantiliza as manifestações artísticas com o objetivo de gerar lucro e manter a conformidade social e a passividade dos indivíduos."
      },
      {
        id: "puc-9",
        area: "Linguagens",
        disciplina: "Língua Inglesa - Leitura & Inferência",
        enunciado: "Read the excerpt: 'Although renewable energy investments reached record highs globally, the persistence of fossil fuel subsidies remains a formidable hurdle to achieving net-zero greenhouse gas targets by 2050.' The word 'HURDLE' in this sentence is closest in meaning to:",
        "alternativas": [
          "Catalyst",
          "Obstacle",
          "Achievement",
          "Guarantee",
          "Agreement"
        ],
        correta: 1,
        explicacao: "'Hurdle' significa obstáculo, entrave ou barreira. O texto aponta que os subsídios aos combustíveis fósseis permanecem como um formidável obstáculo às metas de emissão zero."
      },
      {
        id: "puc-10",
        area: "Exatas",
        disciplina: "Matemática - Funções Exponenciais",
        enunciado: "O crescimento de uma cultura de bactérias em laboratório biológico é modelado pela função N(t) = 500 * 2^(0,5 * t), onde t é medido em horas. O tempo necessário para que essa população atinja 8.000 bactérias é de:",
        "alternativas": [
          "4 horas",
          "6 horas",
          "8 horas",
          "10 horas",
          "12 horas"
        ],
        "correta": 2,
        "explicacao": "8.000 = 500 * 2^(0,5t) => 8.000 / 500 = 16 = 2^(0,5t). Sabendo que 16 = 2^4, temos: 0,5t = 4 => t = 4 / 0,5 = 8 horas!"
      }
    ]
  },

  // 3. SIMULADO MACKENZIE
  {
    id: "simulado-mackenzie-tradicao",
    vestibular: "Mackenzie",
    titulo: "Simulado Mackenzie - Tradição & Conteúdo Integrado",
    subtitulo: "10 Questões Clássicas com Rigor Conteudista em Humanas, Exatas e Ciências da Natureza",
    tempoMinutos: 35,
    disciplinas: ["Química", "Física", "Matemática", "Português", "História"],
    questoes: [
      {
        id: "mack-1",
        area: "Natureza",
        disciplina: "Química Geral & Tabela Periódica",
        enunciado: "Ao longo de um mesmo período da Tabela Periódica, da esquerda para a direita, observa-se que a energia de ionização tende a aumentar. Esse fenômeno é explicado predominantemente:",
        "alternativas": [
          "Pelo aumento do número de níveis de energia eletrônicos e diminuição da carga nuclear.",
          "Pelo aumento da carga nuclear efetiva, que exerce maior força atrativa sobre os elétrons mais externos, diminuindo o raio atômico e exigindo maior energia para remoção de um elétron.",
          "Pela desativação das forças de repulsão eletrostática no interior da nuvem atômica.",
          "Pela perda espontânea de prótons pelos átomos à medida que avançam no período.",
          "Pela transformação instantânea dos átomos neutros em cátions divalentes."
        ],
        correta: 1,
        explicacao: "No período, o número de camadas eletrônicas é constante, mas o número atômico cresce, aumentando a atração nuclear e a energia necessária para retirar elétrons da camada de valência."
      },
      {
        id: "mack-2",
        area: "Exatas",
        disciplina: "Física - Eletrodinâmica & Lei de Joule",
        enunciado: "Um chuveiro elétrico residencial opera sob tensão de 220 V com uma potência nominal de 4.400 W na posição 'Inverno'. A intensidade da corrente elétrica que o percorre e o valor da resistência do seu filamento interno valem, respectivamente:",
        "alternativas": [
          "10 A e 22 Ω",
          "20 A e 11 Ω",
          "20 A e 22 Ω",
          "15 A e 15 Ω",
          "25 A e 8,8 Ω"
        ],
        correta: 1,
        explicacao: "P = U * i => 4.400 = 220 * i => i = 20 A. Pela 1ª Lei de Ohm: U = R * i => 220 = R * 20 => R = 11 Ω. Resposta: 20 A e 11 Ω."
      },
      {
        id: "mack-3",
        area: "Exatas",
        disciplina: "Matemática - Geometria Analítica",
        enunciado: "A equação da reta que passa pelo ponto P(2, 3) e é perpendicular à reta r de equação 2x + 4y - 8 = 0 é dada por:",
        "alternativas": [
          "y = 2x - 1",
          "y = -0,5x + 4",
          "y = 2x + 3",
          "y = -2x + 7",
          "y = 0,5x + 2"
        ],
        correta: 0,
        explicacao: "Na reta r: 4y = -2x + 8 => y = -0,5x + 2, logo m_r = -1/2. Para ser perpendicular: m_s = -1 / m_r = 2. Usando P(2, 3): y - 3 = 2(x - 2) => y - 3 = 2x - 4 => y = 2x - 1!"
      },
      {
        id: "mack-4",
        area: "Linguagens",
        disciplina: "Literatura - Realismo & Machado de Assis",
        enunciado: "No conto 'O Alienista', de Machado de Assis, Simão Bacamarte constrói a Casa Verde em Itaguaí com o propósito de internar e curar os 'loucos'. O desfecho irônico da narrativa machadiana explicita:",
        "alternativas": [
          "O triunfo definitivo do positivismo médico e a perfeição da ciência psicológica no século XIX.",
          "A relatividade entre sanidade e loucura, culminando na libertação de todos os internos da vila e na auto-internação solitária do próprio alienista.",
          "A revolta militar armada dos pacientes que incendeia o hospital psiquiátrico.",
          "A conversão religiosa do protagonista e sua renúncia à carreira científica para tornar-se pároco.",
          "A descoberta de que o bócio era a única enfermidade mental existente no Brasil Império."
        ],
        correta: 1,
        explicacao: "A ironia machadiana ridiculariza o cientificismo dogmático e o positivismo desmedido: após internar 4/5 da cidade e depois soltá-los, Bacamarte conclui que o único louco perfeito era ele mesmo."
      },
      {
        id: "mack-5",
        area: "Humanas",
        disciplina: "História do Brasil - Era Vargas",
        enunciado: "A instituição do Estado Novo em novembro de 1937, capitaneada por Getúlio Vargas, foi formalmente justificada perante a opinião pública por meio:",
        "alternativas": [
          "Da ameaça fictícia de uma insurreição comunista forjada no documento apócrifo conhecido como 'Plano Cohen'.",
          "Do apoio imediato das tropas estadunidenses que desembarcaram no porto de Santos.",
          "Da convocação de uma Assembleia Constituinte democrática de sufrágio universal direto.",
          "Da abolição de todas as tarifas alfandegárias de importação de café e açúcar.",
          "Da assinatura de um tratado militar exclusivo de anexação da Guiana Francesa."
        ],
        correta: 0,
        explicacao: "O Plano Cohen, forjado por militares e integralistas, simulava uma invasão comunista com queima de igrejas e saques, servindo de pretexto para o golpe que outorgou a ditadura do Estado Novo em 1937."
      },
      {
        id: "mack-6",
        area: "Natureza",
        disciplina: "Biologia - Fisiologia Renal",
        enunciado: "O hormônio antidiurético (ADH ou vasopressina), produzido no hipotálamo e liberado pela neuro-hipófise, atua nos túbulos renais promovendo:",
        "alternativas": [
          "A redução imediata da glicemia no sangue por estímulo à produção de insulina.",
          "O aumento da permeabilidade dos ductos coletores à água, estimulando a reabsorção hídrica e tornando a urina mais concentrada e escassa.",
          "A excreção forçada de todo o cálcio dos ossos para a cavidade estomacal.",
          "O bloqueio completo da filtração glomerular na cápsula de Bowman.",
          "A conversão direta de ureia em glicose no fígado."
        ],
        correta: 1,
        explicacao: "Em situações de desidratação ou alta osmolaridade sanguínea, o ADH é secretado, abrindo aquaporinas nos ductos coletores para reabsorver água e evitar perda hídrica."
      },
      {
        id: "mack-7",
        area: "Exatas",
        disciplina: "Matemática - Progressões Aritméticas (PA)",
        enunciado: "Um vestibulando resolveu 5 questões no primeiro dia de seu plano de estudos. A cada dia subsequente, aumentou a meta diária em 4 questões em relação ao dia anterior (5, 9, 13...). Ao completar 30 dias de treino ininterrupto, o total acumulado de questões resolvidas por ele foi:",
        "alternativas": [
          "1.890 questões",
          "1.770 questões",
          "1.950 questões",
          "2.040 questões",
          "1.650 questões"
        ],
        correta: 0,
        explicacao: "PA com a1 = 5, r = 4, n = 30. O termo an = a1 + (n - 1)r = 5 + 29*4 = 5 + 116 = 121. Soma Sn = (a1 + an)*n / 2 = (5 + 121)*30 / 2 = 126 * 15 = 1.890 questões!"
      },
      {
        id: "mack-8",
        area: "Humanas",
        disciplina: "Geografia - Agropecuária Brasileira",
        enunciado: "A expansão da fronteira agrícola brasileira rumo ao Centro-Oeste e à região do Matopiba (Maranhão, Tocantins, Piauí e Bahia) foi viabilizada a partir da década de 1970 sobretudo por:",
        "alternativas": [
          "Uso exclusivo de tração animal e ferramentas manuais tradicionais da agricultura de subsistência.",
          "Correção da acidez do solo do Cerrado por meio da calagem, pesquisa agronômica (Embrapa) e intensa mecanização da colheita de grãos (soja e milho).",
          "Criação de reservas indígenas fechadas que impediram a instalação de monoculturas exportadoras.",
          "Congelamento de preços de fertilizantes importados subsidiados pela ONU.",
          "Inundação natural perpétua de todas as chapadas do planalto central brasileiro."
        ],
        correta: 1,
        explicacao: "O Cerrado, naturalmente ácido e pobre em nutrientes, tornou-se gigante agrícola mundial graças à calagem (calcário), biotecnologia da Embrapa, fertilização química e agricultura de precisão."
      },
      {
        id: "mack-9",
        area: "Linguagens",
        disciplina: "Português - Concordância Nominal",
        enunciado: "Assinale a frase redigida inteiramente de acordo com a norma-padrão de concordância da Língua Portuguesa:",
        "alternativas": [
          "Seguem anexo ao formulário de inscrição os comprovantes de residência dos candidatos.",
          "A vestibulanda disse: 'Muito obrigada pela orientação pedagógica prestada pelo corpo docente'.",
          "É proibido a entrada de celulares ligados na sala de aplicação da prova.",
          "Havia menas vagas para o período matutino da faculdade privada.",
          "Os estudantes ficaram bastantes cansados após as quatro horas ininterruptas de exame."
        ],
        correta: 1,
        explicacao: "A mulher deve flexionar 'obrigada'. Em 'A' deveria ser 'anexos'; em 'C' com artigo 'a' deve ser 'é proibida a entrada'; 'menas' não existe; em 'E' 'bastante' funciona como advérbio de intensidade (invariável)."
      },
      {
        id: "mack-10",
        area: "Natureza",
        disciplina: "Química - Funções Orgânicas",
        enunciado: "O ácido acetilsalicílico (princípio ativo da Aspirina) apresenta em sua fórmula estrutural as funções orgânicas oxigenadas:",
        "alternativas": [
          "Álcool e Cetona.",
          "Ácido carboxílico e Éster.",
          "Éter e Aldeído.",
          "Amina e Amida.",
          "Fenol e Anidrido."
        ],
        correta: 1,
        explicacao: "O AAS possui um anel aromático ligado a um grupo carboxila (-COOH, ácido carboxílico) e a um grupo acetóxi (-O-CO-CH3, função éster derivado da esterificação do ácido salicílico)."
      }
    ]
  },

  // 4. SIMULADO FGV (FUNDAÇÃO GETULIO VARGAS)
  {
    id: "simulado-fgv-analitico",
    vestibular: "FGV",
    titulo: "Simulado FGV (Fundação Getulio Vargas) - Raciocínio Analítico & Economia",
    subtitulo: "10 Questões de Matemática Aplicada, Estatística, Interpretação Crítica e Atualidades Econômicas",
    tempoMinutos: 35,
    disciplinas: ["Matemática", "Economia", "Lógica", "Geopolítica", "Português"],
    questoes: [
      {
        id: "fgv-1",
        area: "Exatas",
        disciplina: "Matemática Aplicada & Porcentagens Sucessivas",
        enunciado: "O preço das ações de uma companhia de tecnologia na B3 subiu 20% no primeiro trimestre do ano. No trimestre seguinte, em virtude de oscilações cambiais globais, as mesmas ações desvalorizaram 15%. Ao final dos dois trimestres, o rendimento acumulado das ações foi de:",
        "alternativas": [
          "Aumento de 5%",
          "Aumento de 2%",
          "Queda de 2%",
          "Ficou exatamente empatado (0%)",
          "Aumento de 3,5%"
        ],
        correta: 1,
        explicacao: "Fator de aumento inicial: 1 + 0,20 = 1,20. Fator de redução subsequente: 1 - 0,15 = 0,85. Fator acumulado = 1,20 * 0,85 = 1,02, correspondendo a um rendimento líquido de +2,0%!"
      },
      {
        id: "fgv-2",
        area: "Humanas",
        disciplina: "Atualidades & Economia Global",
        enunciado: "A política monetária de elevação da taxa básica de juros (taxa Selic no Brasil), conduzida pelo Comitê de Política Monetária (COPOM) do Banco Central, tem como objetivo econômico primordial:",
        "alternativas": [
          "Acelerar o consumo imediato das famílias através da concessão indiscriminada de crédito barato.",
          "Conter as pressões inflacionárias, desestimulando a demanda agregada ao encarecer o custo do crédito e incentivar aplicações financeiras de renda fixa.",
          "Subsidiar as exportações de commodities com desvalorização forçada da moeda nacional.",
          "Eliminar a necessidade de arrecadação de tributos federais pela Receita Federal.",
          "Fixar o teto dos preços de todos os alimentos nos supermercados por decreto."
        ],
        correta: 1,
        explicacao: "O regime de metas de inflação utiliza a taxa básica de juros para esfriar a demanda quando a inflação está alta, desacelerando o consumo e atraindo capital para contenção de preços."
      },
      {
        id: "fgv-3",
        area: "Exatas",
        disciplina: "Estatística - Média, Mediana e Assimetria",
        enunciado: "Em uma pesquisa salarial de uma startup com 10 colaboradores, 9 funcionários recebem R$ 3.000,00 e o CEO recebe R$ 43.000,00. A média aritmética e a mediana salarial dessa empresa são, respectivamente:",
        "alternativas": [
          "Média R$ 7.000,00 e Mediana R$ 3.000,00",
          "Média R$ 4.300,00 e Mediana R$ 7.000,00",
          "Média R$ 3.000,00 e Mediana R$ 3.000,00",
          "Média R$ 5.000,00 e Mediana R$ 4.000,00",
          "Média R$ 10.000,00 e Mediana R$ 5.000,00"
        ],
        correta: 0,
        explicacao: "Soma dos salários = 9 * 3.000 + 43.000 = 27.000 + 43.000 = R$ 70.000. Média = 70.000 / 10 = R$ 7.000. Mediana: lista ordenada tem os valores centrais na 5ª e 6ª posições (ambos 3.000), logo Mediana = R$ 3.000!"
      },
      {
        id: "fgv-4",
        area: "Linguagens",
        disciplina: "Lógica & Análise Crítica do Discurso",
        enunciado: "A falácia lógica conhecida como 'Post hoc ergo propter hoc' (depois disso, logo por causa disso) ocorre quando um interlocutor:",
        "alternativas": [
          "Ataca os traços físicos ou pessoais de um debatedor em vez de rebater seus argumentos.",
          "Supõe erroneamente que, pelo fato de um evento B ter ocorrido cronologicamente após um evento A, o evento A foi necessariamente a causa exclusiva de B.",
          "Assume como premissa a própria conclusão que pretendia demonstrar.",
          "Generaliza uma conclusão categórica a partir de uma amostra matematicamente infinita.",
          "Afirma que uma tese é verdadeira simplesmente porque a maioria das pessoas a defende."
        ],
        correta: 1,
        explicacao: "Essa clássica falácia confunde mera correlação temporal com relação causal genuína: 'o galo cantou antes do amanhecer, logo o canto do galo fez o sol nascer'."
      },
      {
        id: "fgv-5",
        area: "Humanas",
        disciplina: "Geopolítica Mundial",
        enunciado: "A crescente rivalidade tecnológica e comercial entre Estados Unidos e China no século XXI manifesta-se com especial intensidade no domínio:",
        "alternativas": [
          "Da exploração artesanal de carvão vegetal nas florestas tropicais centro-africanas.",
          "Da corrida pela hegemonia em Inteligência Artificial, fabricação de semicondutores avançados (chips) e domínio de redes 5G e computação quântica.",
          "Do monopólio de fábricas de máquinas de escrever mecânicas e telégrafos.",
          "Da disputa de territórios agrários para expansão exclusiva da cultura do fumo.",
          "Do fechamento total de portos mercantes mundiais à navegação de contêineres."
        ],
        correta: 1,
        explicacao: "A disputa sino-americana concentra-se na vanguarda da microeletrônica, processadores gráficos, IA, redes 5G/6G e segurança de dados, que definem a liderança geopolítica mundial."
      },
      {
        id: "fgv-6",
        area: "Exatas",
        disciplina: "Matemática - Sistemas Lineares & Matrizes",
        enunciado: "Um investidor aplicou R$ 10.000,00 distribuídos entre dois fundos, A e B. O fundo A rendeu 12% ao ano e o fundo B rendeu 8% ao ano. Ao final de um ano, o rendimento conjunto total obtido foi de R$ 960,00. O valor alocado no fundo A foi de:",
        "alternativas": [
          "R$ 4.000,00",
          "R$ 5.000,00",
          "R$ 6.000,00",
          "R$ 3.000,00",
          "R$ 7.000,00"
        ],
        correta: 0,
        explicacao: "Sistema: x + y = 10.000 e 0,12x + 0,08y = 960. Da 1ª: y = 10.000 - x. Substituindo: 0,12x + 0,08(10.000 - x) = 960 => 0,12x + 800 - 0,08x = 960 => 0,04x = 160 => x = 160 / 0,04 = R$ 4.000,00!"
      },
      {
        id: "fgv-7",
        area: "Humanas",
        disciplina: "História Econômica do Brasil",
        enunciado: "O Plano Real, lançado em 1994 durante o governo Itamar Franco sob liderança da equipe econômica de Fernando Henrique Cardoso, obteve sucesso na estabilização inflacionária por intermédio da estratégia inovadora da:",
        "alternativas": [
          "Fixação de congelamento de preços de produtos com fiscais policiais prendendo gerentes de supermercado.",
          "Confisco temporário da poupança de todas as contas bancárias privadas de pessoas físicas.",
          "Unidade Real de Valor (URV), que alinhou preços relativos e desindexou a economia antes da emissão da nova moeda (o Real).",
          "Criação de barreiras tarifárias proibitivas que isolaram o comércio exterior brasileiro.",
          "Nacionalização de todas as montadoras e bancos privados do território nacional."
        ],
        correta: 2,
        explicacao: "A URV atuou como indexador diário estável por meses, permitindo que a economia sincronizasse seus preços e contratos sem trauma de congelamentos artificiais antes de virar a moeda Real."
      },
      {
        id: "fgv-8",
        area: "Linguagens",
        disciplina: "Comunicação Corporativa & Clareza",
        enunciado: "A concisão e a clareza na redação de relatórios executivos e acadêmicos exigem evitar prolixidades e pleonasmos viciosos. Assinale o segmento que NÃO apresenta vício de linguagem redundante:",
        "alternativas": [
          "A diretoria pretende criar novos planos para o futuro próximo.",
          "O comitê realizou uma análise minuciosa dos balanços do terceiro trimestre.",
          "Houve uma surpresa inesperada com o faturamento das filiais.",
          "Todos os parlamentares foram unânimes em consenso geral.",
          "O assessor subiu para cima para verificar o arquivo morto."
        ],
        correta: 1,
        explicacao: "'Criar novo', 'surpresa inesperada', 'unânime em consenso' e 'subir para cima' são pleonasmos viciosos. 'Análise minuciosa dos balanços' é límpida e correta."
      },
      {
        id: "fgv-9",
        area: "Exatas",
        disciplina: "Matemática - Análise Combinatória",
        enunciado: "Um conselho consultivo de uma organização não governamental é composto por 8 economistas e 6 administradores. Para formar uma comissão de auditoria interna com 3 membros, exige-se que ela contenha exatamente 2 economistas e 1 administrador. De quantas maneiras distintas essa comissão pode ser formada?",
        "alternativas": [
          "168",
          "144",
          "336",
          "84",
          "210"
        ],
        correta: 0,
        explicacao: "Combinação de 8 economistas 2 a 2: C(8,2) = (8*7)/2 = 28. Combinação de 6 administradores 1 a 1: C(6,1) = 6. Total pelo princípio fundamental da contagem = 28 * 6 = 168 maneiras!"
      },
      {
        id: "fgv-10",
        area: "Humanas",
        disciplina: "Sociologia do Trabalho",
        enunciado: "O fenômeno contemporâneo da 'uberização' ou plataformização do trabalho caracteriza-se nas relações produtivas por:",
        "alternativas": [
          "Garantia irrestrita de estabilidade no emprego, jornada de 30 horas semanais e plano de previdência integral custeado pelas empresas.",
          "Transferência de riscos operacionais para o trabalhador, flexibilização jurídica sem vínculo empregatício e gestão algorítmica de desempenho e remuneração.",
          "Contratação exclusiva de profissionais com diploma de pós-graduação stricto sensu.",
          "Extinção total do uso de smartphones e conexões à internet nos serviços urbanos.",
          "Retorno obrigatório ao regime de trabalho servil comunal medieval."
        ],
        correta: 1,
        explicacao: "A plataformização converte o trabalhador em 'independente' ou 'parceiro', desregulamentando encargos sociais e submetendo a rotina à supervisão automatizada por algoritmos."
      }
    ]
  },

  // 5. SIMULADO USCS / MEDICINA VUNESP
  {
    id: "simulado-uscs-vunesp",
    vestibular: "USCS",
    titulo: "Simulado USCS / Medicina VUNESP - Conhecimentos Gerais",
    subtitulo: "10 Questões Diretas e Precisas com Foco em Ciências Biológicas, Química e Raciocínio Clínico Vunesp",
    tempoMinutos: 35,
    disciplinas: ["Biologia", "Química", "Física", "Português", "Matemática"],
    questoes: [
      {
        id: "uscs-1",
        area: "Natureza",
        disciplina: "Biologia Humana - Imunologia",
        enunciado: "A imunização ativa difere fundamentalmente da imunização passiva porque a primeira:",
        "alternativas": [
          "Consiste na injeção de anticorpos pré-formados (como no soro antiofídico), gerando alívio imediato sem memória imunológica duradoura.",
          "Estimula o organismo do indivíduo (por meio de vacinas contendo antígenos atenuados ou inativados) a produzir seus próprios anticorpos e células de memória de longa duração.",
          "Pode ser obtida exclusivamente através de transfusão sanguínea de doadores aparentados.",
          "Não necessita de linfócitos T ou B para promover a proteção fisiológica do hospedeiro.",
          "Provoca a destruição imediata de todas as bactérias da microbiota intestinal benéfica."
        ],
        correta: 1,
        explicacao: "Vacinas fornecem antígenos, ativando a resposta imunológica própria e criando memória imunológica (imunização ativa). Soros fornecem anticorpos prontos para ação urgente sem memória (passiva)."
      },
      {
        id: "uscs-2",
        area: "Natureza",
        disciplina: "Química - Equilíbrio Químico & Soluções Tampão",
        enunciado: "O pH do sangue humano saudável é rigorosamente mantido em uma faixa estreita entre 7,35 e 7,45. O principal sistema tampão responsável por amortecer oscilações de pH no plasma é o sistema:",
        "alternativas": [
          "Ácido clorídrico / Cloreto de potássio (HCl / KCl)",
          "Ácido carbônico / Bicarbonato (H2CO3 / HCO3-)",
          "Ácido sulfúrico / Sulfato de sódio (H2SO4 / Na2SO4)",
          "Ácido nítrico / Nitrato de amônio (HNO3 / NH4NO3)",
          "Hidróxido de sódio / Metano (NaOH / CH4)"
        ],
        correta: 1,
        explicacao: "O equilíbrio CO2 + H2O <-> H2CO3 <-> H+ + HCO3- regula o pH sanguíneo em conjunto com a respiração pulmonar e a excreção renal de prótons e bicarbonato."
      },
      {
        id: "uscs-3",
        area: "Exatas",
        disciplina: "Física - Termodinâmica & Calorimetria",
        enunciado: "Para aquecer 200 g de água líquida (calor específico c = 1,0 cal/g·°C) de 20 °C para 70 °C, a quantidade de calor necessária fornecida por um bico de gás hospitalar deve ser de:",
        "alternativas": [
          "2.000 cal",
          "5.000 cal",
          "10.000 cal",
          "14.000 cal",
          "20.000 cal"
        ],
        correta: 2,
        explicacao: "Q = m * c * ΔT = 200 g * 1,0 cal/g·°C * (70 - 20) °C = 200 * 50 = 10.000 calorias (10 kcal)."
      },
      {
        id: "uscs-4",
        area: "Natureza",
        disciplina: "Citologia - Respiração Celular",
        enunciado: "Nas células eucariontes animais, a etapa da respiração celular aeróbia que ocorre na matriz mitocondrial e tem como um de seus produtos a liberação de gás carbônico (CO2) é:",
        "alternativas": [
          "Glicólise",
          "Ciclo de Krebs (Ciclo do Ácido Cítrico)",
          "Fosforilação oxidativa na crista mitocondrial",
          "Fermentação lática citoplasmática",
          "Fotofosforilação acíclica no tilacoide"
        ],
        correta: 1,
        explicacao: "A glicólise ocorre no citoplasma (citosol). O Ciclo de Krebs transcorre no interior da matriz mitocondrial, descarboxilando substratos e gerando CO2, NADH, FADH2 e ATP/GTP."
      },
      {
        id: "uscs-5",
        area: "Exatas",
        disciplina: "Matemática - Trigonometria no Triângulo",
        enunciado: "Um ortopedista analisa uma rampa de acesso hospitalar que sobe até um patamar a 3 metros de altura formando um ângulo de 30° com o solo horizontal. Sabendo que sen(30°) = 0,5, o comprimento linear dessa rampa deve ser de:",
        "alternativas": [
          "4,5 metros",
          "5,0 metros",
          "6,0 metros",
          "7,5 metros",
          "9,0 metros"
        ],
        correta: 2,
        explicacao: "sen(30°) = Cateto Oposto / Hipotenusa => 0,5 = 3 / Comprimento => Comprimento = 3 / 0,5 = 6,0 metros!"
      },
      {
        id: "uscs-6",
        area: "Natureza",
        disciplina: "Bioquímica - Enzimas",
        enunciado: "As enzimas atuam como catalisadores biológicos essenciais à sobrevivência orgânica porque:",
        "alternativas": [
          "Elevam a energia de ativação necessária para que uma reação química ocorra mais lentamente.",
          "Reduzem a energia de ativação da reação química, acelerando significativamente a velocidade reacional sem serem consumidas no processo global.",
          "Alteram a constante de equilíbrio químico final em benefício perpétuo dos reagentes.",
          "Substituem a necessidade de água e glicose em todos os tecidos vivos.",
          "Possuem estrutura primária puramente lipídica insensível a variações de temperatura."
        ],
        correta: 1,
        explicacao: "Enzimas são proteínas catalisadoras que diminuem a energia de ativação da reação, permitindo que processos metabólicos ocorram em frações de segundo à temperatura corporal."
      },
      {
        id: "uscs-7",
        area: "Linguagens",
        disciplina: "Português - Regência Verbal",
        enunciado: "Em conformidade com a norma culta consagrada pelas bancas da VUNESP, o verbo 'VISAR' no sentido de 'ter como objetivo ou meta' rege a preposição:",
        "alternativas": [
          "Preposição 'com'",
          "Preposição 'a' (transitivo indireto)",
          "Preposição 'de'",
          "Nenhuma preposição (transitivo direto obrigatoriamente)",
          "Preposição 'por'"
        ],
        correta: 1,
        explicacao: "No sentido de almejar/ter por objetivo, visar é VTI e rege a preposição 'a' (ex: 'O programa visa ao bem-estar dos pacientes'). No sentido de mirar ou pôr visto, é VTD."
      },
      {
        id: "uscs-8",
        area: "Natureza",
        disciplina: "Química - Eletroquímica & Pilhas",
        enunciado: "Na clássica pilha eletroquímica de Daniell formada por eletrodos de zinco e cobre imersos em suas respectivas soluções salinas, o eletrodo onde ocorre a OXIDAÇÃO (perda de elétrons) e a sua polaridade são:",
        "alternativas": [
          "Cátodo (polo positivo), onde se deposita cobre metálico.",
          "Ânodo (polo negativo), onde o zinco metálico se corrói passando a íons Zn2+.",
          "Ânodo (polo positivo), onde o cobre se oxida.",
          "Cátodo (polo negativo), onde há borbulhamento de oxigênio.",
          "Ponte salina, onde os ânions precipitam na forma de gás hélio."
        ],
        correta: 1,
        explicacao: "Na pilha: Ânodo = Oxidação = Polo Negativo (Zn -> Zn2+ + 2e-). Cátodo = Redução = Polo Positivo (Cu2+ + 2e- -> Cu)."
      },
      {
        id: "uscs-9",
        area: "Natureza",
        disciplina: "Genética - Heredogramas & Alelos",
        enunciado: "Um casal fenotipicamente saudável para uma determinada anomalia metabólica tem um primeiro filho com albinismo clássico (herança autossômica recessiva). A probabilidade de o segundo filho desse casal nascer do sexo masculino e albino é de:",
        "alternativas": [
          "1/2 (50%)",
          "1/4 (25%)",
          "1/8 (12,5%)",
          "3/8 (37,5%)",
          "1/16 (6,25%)"
        ],
        correta: 2,
        explicacao: "Sendo os pais normais e tendo tido filho albino (aa), ambos são heterozigotos (Aa). Chance de ser albino (aa) = 1/4. Chance de ser do sexo masculino = 1/2. Probabilidade conjunta = 1/4 * 1/2 = 1/8 (12,5%)!"
      },
      {
        id: "uscs-10",
        area: "Exatas",
        disciplina: "Física - Ondulatória & Ultrassom",
        enunciado: "A ultrassonografia diagnóstica utilizada em exames médicos emprega ondas mecânicas sonoras com frequência:",
        "alternativas": [
          "Inferior a 20 Hz (infrassom inaudível).",
          "Compreendida estritamente entre 20 Hz e 20.000 Hz (som audível comum).",
          "Superior a 20.000 Hz (ultrassom, inaudível ao ouvido humano).",
          "Eletromagnéticas de mesma natureza que os raios X ionizantes.",
          "Com velocidade igual à velocidade da luz no vácuo (300.000 km/s)."
        ],
        correta: 2,
        explicacao: "Ondas sonoras com frequência acima do limite audível humano (20 kHz ou 20.000 Hz) são classificadas como ultrassom. Na medicina utilizam-se frequências de 2 a 15 MHz."
      }
    ]
  },

  // 6. SIMULADO UNESP (1ª FASE CONHECIMENTOS GERAIS - VUNESP)
  {
    id: "simulado-unesp-1fase",
    vestibular: "UNESP",
    titulo: "Simulado UNESP - 1ª Fase Conhecimentos Gerais (VUNESP)",
    subtitulo: "10 Questões Multidisciplinares com Textos de Apoio e Imagens Contextualizadas Padrão UNESP",
    tempoMinutos: 35,
    disciplinas: ["Interdisciplinar", "História", "Geografia", "Química", "Física"],
    questoes: [
      {
        id: "unesp-1",
        area: "Humanas",
        disciplina: "História do Brasil - Segundo Reinado",
        enunciado: "A 'Tarifa Alves Branco', promulgada no Brasil imperial em 1844, elevou as alíquotas alfandegárias sobre produtos manufaturados importados. Essa medida teve como desdobramento socioeconômico significativo:",
        "alternativas": [
          "O aumento das importações de tecidos ingleses sem cobrança de taxas nos portos.",
          "O estímulo indireto à industrialização pioneira nacional e a diversificação de investimentos da elite (Era Mauá), impulsionada também pelo fim do tráfico negreiro em 1850.",
          "A falência imediata de todas as ferrovias e portos do Sudeste cafeeiro.",
          "A anexação pacífica do Uruguai como província brasileira autônoma.",
          "A extinção do monopólio estatal sobre as minas de diamantes de Minas Gerais."
        ],
        correta: 1,
        explicacao: "A Tarifa Alves Branco (1844) encareceu manufaturas importadas e gerou superávits fiscais. Combinada à Lei Eusébio de Queirós (1850), liberou capitais que alimentaram a 'Era Mauá' (indústrias, ferrovias e iluminação a gás)."
      },
      {
        id: "unesp-2",
        area: "Natureza",
        disciplina: "Ecologia - Sucessão Ecológica",
        enunciado: "Após a ocorrência de uma erupção vulcânica que cobre toda uma encosta rochosa com lava basáltica solidificada, inicia-se um processo de sucessão ecológica primária. Os organismos pioneiros típicos desse estágio inicial são:",
        "alternativas": [
          "Árvores frondosas clímax da Floresta Ombrófila Densa com copas fechadas.",
          "Liquens e briófitas (musgos), capazes de fixar-se em rocha nua e iniciar a meteorização e formação de solo.",
          "Mamíferos carnívoros de grande porte e aves de rapina de topo de cadeia.",
          "Gramíneas forrageiras de pastagem introduzidas pelo manejo agropecuário.",
          "Arbustos xerófitos com espinhos desenvolvidos adaptados exclusivamente a desertos de areia."
        ],
        correta: 1,
        explicacao: "Em áreas onde nunca houve solo previamente (como rocha de lava), a sucessão primária começa com espécies pioneiras (como liquens), que secretam ácidos orgânicos e formam a base inicial de matéria orgânica."
      },
      {
        id: "unesp-3",
        area: "Exatas",
        disciplina: "Física - Dinâmica e Atrito",
        enunciado: "Um bloco de 5 kg está sobre uma superfície horizontal com coeficiente de atrito estático μe = 0,4. Aplica-se horizontalmente uma força externa constante F = 15 N. Adotando g = 10 m/s², o módulo da força de atrito que atua sobre o bloco é de:",
        "alternativas": [
          "20 N",
          "15 N",
          "0 N",
          "5 N",
          "25 N"
        ],
        correta: 1,
        explicacao: "A força de atrito estático máxima é fat_max = μe * N = 0,4 * (5 * 10) = 20 N. Como a força aplicada (15 N) é inferior ao atrito estático máximo (20 N), o bloco NÃO se move, e a força de atrito é exatamente igual à força solicitante: 15 N!"
      },
      {
        id: "unesp-4",
        area: "Humanas",
        disciplina: "Geografia Física - Climatologia Brasileira",
        enunciado: "O clima subtropical do Sul do Brasil diferencia-se dos demais domínios morfoclimáticos do país sobretudo pela característica de possuir:",
        "alternativas": [
          "Invernos rigorosos com as menores temperaturas do país, ocorrência eventual de geadas e precipitações bem distribuídas ao longo de todos os meses do ano.",
          "Estação seca pronunciada de seis meses ininterruptos sem nenhuma chuva no inverno.",
          "Médias térmicas anuais superiores a 32 °C em todos os meses sem amplitude térmica.",
          "Total ausência de massas de ar polares em qualquer época do ano.",
          "Precipitações exclusivamente no verão com estiagem absoluta nas outras três estações."
        ],
        correta: 0,
        explicacao: "O clima subtropical (ao sul do Trópico de Capricórnio) apresenta as maiores amplitudes térmicas do Brasil, invernos amenos a frios (com frentes polares atlânticas) e chuvas regulares sem estação seca definida."
      },
      {
        id: "unesp-5",
        area: "Natureza",
        disciplina: "Química - Radioatividade",
        enunciado: "O isótopo radioativo Césio-137 (Cs-137) possui meia-vida (período de semidesintegração) de aproximadamente 30 anos. Se uma amostra contaminada contiver inicialmente 80 mg de Cs-137, a massa desse radioisótopo restante após 90 anos será de:",
        "alternativas": [
          "40 mg",
          "20 mg",
          "10 mg",
          "5 mg",
          "2,5 mg"
        ],
        correta: 2,
        explicacao: "90 anos correspondem a 90 / 30 = 3 meias-vidas. 1ª meia-vida: 80 mg -> 40 mg. 2ª meia-vida: 40 mg -> 20 mg. 3ª meia-vida: 20 mg -> 10 mg restantes!"
      },
      {
        id: "unesp-6",
        area: "Linguagens",
        disciplina: "Literatura - Romantismo Indigenista",
        enunciado: "No romance 'Iracema' (1865), de José de Alencar, a relação amorosa entre a 'virgem dos lábios de mel' e o guerreiro branco Martim personifica metaforicamente:",
        "alternativas": [
          "A derrota irremediável de qualquer aspiração de harmonia social entre colonizadores e nações originárias.",
          "A gênese e o nascimento místico da nação brasileira, simbolizada no filho Moacir ('o filho da dor e do sofrimento').",
          "A apologia da dominação espanhola sobre a Capitania de São Vicente.",
          "O protesto realista contra as condições de trabalho na indústria açucareira do Nordeste.",
          "A crítica ácida aos dogmas da Igreja Católica no início do século XIX."
        ],
        correta: 1,
        explicacao: "Iracema (anagrama de América) une-se ao português Martim; o fruto dessa união é Moacir, símbolo do nascimento da mestiçagem e da própria identidade brasileira na visão romântica alencariana."
      },
      {
        id: "unesp-7",
        area: "Exatas",
        disciplina: "Matemática - Geometria Espacial (Cilindros)",
        enunciado: "Um reservatório cilíndrico de água possui raio da base igual a 2 metros e altura de 5 metros. Adotando π = 3,14, a capacidade volumétrica desse reservatório em litros é de:",
        "alternativas": [
          "31.400 litros",
          "62.800 litros",
          "15.700 litros",
          "125.600 litros",
          "20.000 litros"
        ],
        correta: 1,
        explicacao: "Volume do cilindro = π * r² * h = 3,14 * (2²) * 5 = 3,14 * 4 * 5 = 3,14 * 20 = 62,8 m³. Como 1 m³ = 1.000 L, temos 62,8 * 1.000 = 62.800 litros!"
      },
      {
        id: "unesp-8",
        area: "Humanas",
        disciplina: "Filosofia - Ética Aristotélica",
        enunciado: "Na obra 'Ética a Nicômaco', Aristóteles define a virtude moral (areté) como a busca pela 'justa medida' ou 'meio-termo de ouro' (mesotês). Essa concepção preconiza que:",
        "alternativas": [
          "O ser humano virtuoso deve buscar o excesso constante de prazeres imediatos para atingir o êxtase.",
          "A virtude situa-se no equilíbrio prudente entre dois extremos viciosos: um por carência (falta) e outro por excesso.",
          "Toda atitude humana deve ser guiada unicamente pelo cálculo puramente financeiro de perdas e ganhos.",
          "A perfeição moral depende exclusivamente da obediência cega a mandamentos teocráticos incontestáveis.",
          "A covardia e a imprudência são virtudes de igual nobreza na conduta cívica dos cidadãos."
        ],
        correta: 1,
        explicacao: "Para Aristóteles, a virtude é o ponto de equilíbrio: por exemplo, a coragem é a justa medida entre o vício da covardia (falta) e o vício da temeridade/imprudência (excesso)."
      },
      {
        id: "unesp-9",
        area: "Natureza",
        disciplina: "Fisiologia Vegetal - Fotossíntese",
        enunciado: "Durante a etapa fotoquímica (fase clara) da fotossíntese nos cloroplastos, a fotólise da água tem como papel biológico fundamental:",
        "alternativas": [
          "A absorção direta de CO2 pelos estômatos sem intervenção de pigmentos.",
          "A reposição de elétrons para o fotossistema II, com a concomitante liberação de oxigênio gasoso (O2) para a atmosfera.",
          "A produção de glicose sólida sem necessidade da enzima rubisco.",
          "A destruição da membrana tilacoidal para liberação de clorofila livre.",
          "A conversão de água pura em nitrogênio líquido celular."
        ],
        correta: 1,
        explicacao: "A quebra da molécula de água sob luz (fotólise da água ou reação de Hill) fornece elétrons para recompor a clorofila ativada, gerando íons H+ e liberando O2 para a biosfera."
      },
      {
        id: "unesp-10",
        area: "Exatas",
        disciplina: "Matemática - Logaritmos",
        enunciado: "Sabe-se que log(2) ≈ 0,30 e log(3) ≈ 0,48. Com base nesses dados aproximados, o valor de log(18) é igual a:",
        "alternativas": [
          "0,96",
          "1,26",
          "1,56",
          "0,78",
          "1,08"
        ],
        correta: 1,
        explicacao: "Fatorando 18: 18 = 2 * 3² = 2 * 9. Pela propriedade dos logaritmos: log(18) = log(2 * 3²) = log(2) + log(3²) = log(2) + 2*log(3) = 0,30 + 2*(0,48) = 0,30 + 0,96 = 1,26!"
      }
    ]
  },

  // 7. SIMULADO MILITARES DE ELITE (ITA & IME)
  {
    id: "simulado-militares-ita-ime",
    vestibular: "ITA",
    titulo: "Simulado Militares de Elite (ITA & IME) - Exatas Avançadas",
    subtitulo: "10 Questões de Matemática, Física e Química com Alto Rigor Algébrico e Conceitual",
    tempoMinutos: 45,
    disciplinas: ["Física", "Matemática", "Química"],
    questoes: [
      {
        id: "ita-sim-1",
        area: "Exatas",
        disciplina: "Física - Mecânica & Gravitação",
        enunciado: "Um satélite artificial de massa m descreve uma órbita circular estável de raio R em torno da Terra (massa M). Considere G a constante de gravitação universal. O trabalho necessário para transferir esse satélite dessa órbita de raio R para outra órbita circular de raio 2R vale:",
        "alternativas": [
          "(G * M * m) / (2R)",
          "(G * M * m) / (4R)",
          "(G * M * m) / (8R)",
          "(G * M * m) / R",
          "(3 * G * M * m) / (4R)"
        ],
        correta: 1,
        explicacao: "A energia mecânica total em uma órbita circular de raio r é E = - (G*M*m) / (2r). Assim, E1 = -GMm/(2R) e E2 = -GMm/(4R). O trabalho W = ΔE = E2 - E1 = -GMm/(4R) - (-GMm/(2R)) = GMm/(4R)!"
      },
      {
        id: "ita-sim-2",
        area: "Exatas",
        disciplina: "Matemática - Números Complexos & De Moivre",
        enunciado: "Seja z = 1 + i*√3 um número complexo no plano de Argand-Gauss. O módulo de z e o valor de z^6 são, respectivamente:",
        "alternativas": [
          "|z| = 2 e z^6 = 64",
          "|z| = 4 e z^6 = -64",
          "|z| = 2 e z^6 = -64",
          "|z| = 1 e z^6 = 1",
          "|z| = 2 e z^6 = 64i"
        ],
        correta: 0,
        explicacao: "|z| = √(1² + (√3)²) = √(1 + 3) = √4 = 2. Argumento θ: cos(θ)=1/2 e sen(θ)=√3/2 => θ = π/3 (60°). Pela 1ª fórmula de De Moivre: z^6 = 2^6 * [cos(6*π/3) + i*sen(6*π/3)] = 64 * [cos(2π) + i*sen(2π)] = 64 * (1 + 0) = 64!"
      },
      {
        id: "ita-sim-3",
        area: "Natureza",
        disciplina: "Química - Termodinâmica & Espontaneidade",
        enunciado: "Para que um processo físico-químico ocorra de forma espontânea a temperatura T e pressão constantes, a variação da Energia Livre de Gibbs (ΔG = ΔH - T*ΔS) deve satisfazer obrigatoriamente a condição:",
        "alternativas": [
          "ΔG > 0",
          "ΔG < 0",
          "ΔG = 0",
          "ΔH obrigatoriamente positivo e ΔS nulo",
          "ΔS negativo sob temperaturas infinitamente altas"
        ],
        correta: 1,
        explicacao: "O critério termodinâmico para a espontaneidade a T e P constantes é a redução da energia livre do sistema, ou seja, ΔG < 0 (processo exergônico)."
      },
      {
        id: "ita-sim-4",
        area: "Exatas",
        disciplina: "Física - Eletromagnetismo & Indução",
        enunciado: "Uma espira condutora circular de raio r e resistência R está imersa em um campo magnético uniforme cuja intensidade varia linearmente com o tempo segundo B(t) = B0 + k*t, perpendicularmente ao plano da espira. A corrente elétrica induzida na espira vale:",
        "alternativas": [
          "i = (k * π * r²) / R",
          "i = (B0 * π * r) / R",
          "i = (k * r) / (2R)",
          "i = zero, pois a espira está em repouso espacial",
          "i = (k² * π * r²) / R"
        ],
        correta: 0,
        explicacao: "Fluxo magnético Φ = B(t) * A = (B0 + k*t) * (π*r²). Pela Lei de Faraday-Neumann: fem = |dΦ/dt| = k * π * r². Pela Lei de Ohm: i = fem / R = (k * π * r²) / R."
      },
      {
        id: "ita-sim-5",
        area: "Exatas",
        disciplina: "Matemática - Polinômios & Relações de Girard",
        enunciado: "Sejam r1, r2 e r3 as três raízes do polinômio cúbico P(x) = x³ - 6x² + 11x - 6. O valor da soma dos inversos das raízes (1/r1 + 1/r2 + 1/r3) é igual a:",
        "alternativas": [
          "11/6",
          "6/11",
          "-11/6",
          "1",
          "2"
        ],
        correta: 0,
        explicacao: "Pelas Relações de Girard: r1*r2 + r1*r3 + r2*r3 = 11 e r1*r2*r3 = 6. A soma dos inversos é (r2*r3 + r1*r3 + r1*r2) / (r1*r2*r3) = 11 / 6!"
      },
      {
        id: "ita-sim-6",
        area: "Natureza",
        disciplina: "Química - Cinética Química",
        enunciado: "Em uma reação elementar 2A (g) + B (g) -> C (g), se dobrarmos a concentração molar do reagente A e triplicarmos a concentração do reagente B simultaneamente, a velocidade instantânea da reação aumentará por um fator de:",
        "alternativas": [
          "6 vezes",
          "12 vezes",
          "18 vezes",
          "24 vezes",
          "36 vezes"
        ],
        correta: 1,
        explicacao: "Lei da velocidade para reação elementar: v = k * [A]² * [B]. Dobrando [A] e triplicando [B]: v' = k * (2[A])² * (3[B]) = k * 4[A]² * 3[B] = 12 * v. O aumento é de 12 vezes!"
      },
      {
        id: "ita-sim-7",
        area: "Exatas",
        disciplina: "Física - Ondulatória & Efeito Doppler",
        enunciado: "Uma fonte sonora de frequência f0 move-se com velocidade constante v_f em direção a um observador estacionário em repouso no ar (velocidade do som = v_som). A frequência f percebida pelo observador é:",
        "alternativas": [
          "f = f0 * (v_som / (v_som - v_f))",
          "f = f0 * (v_som / (v_som + v_f))",
          "f = f0 * ((v_som - v_f) / v_som)",
          "f = f0 * ((v_som + v_f) / v_som)",
          "f = f0"
        ],
        correta: 0,
        explicacao: "Na aproximação da fonte em relação a um receptor estático, as frentes de onda se comprimem espacialmente, elevando a frequência: f = f0 * [v_som / (v_som - v_f)]."
      },
      {
        id: "ita-sim-8",
        area: "Exatas",
        disciplina: "Matemática - Geometria Espacial & Tetraedro",
        enunciado: "A altura de um tetraedro regular cuja aresta mede 'a' é dada pela expressão:",
        "alternativas": [
          "a * (√6 / 3)",
          "a * (√3 / 2)",
          "a * (√2 / 3)",
          "a * (√3 / 3)",
          "a * (√6 / 2)"
        ],
        correta: 0,
        explicacao: "Em um tetraedro regular de aresta 'a', o apótema da face é a*√3/2 e o raio da base é a*√3/3. Por Pitágoras: h² + (a*√3/3)² = a² => h² = a² - a²/3 = 2a²/3 => h = a*√(2/3) = a*(√6 / 3)."
      },
      {
        id: "ita-sim-9",
        area: "Natureza",
        disciplina: "Química - Hibridização & Geometria Molecular",
        enunciado: "A molécula de hexafluoreto de enxofre (SF6) apresenta átomo central com hibridização e geometria molecular caracterizadas respectivamente por:",
        "alternativas": [
          "sp3 e Tetraédrica",
          "sp3d2 e Octaédrica",
          "sp3d e Bipirâmide trigonal",
          "dsp2 e Quadrado planar",
          "sp2 e Trigonal plana"
        ],
        correta: 1,
        explicacao: "O enxofre possui 6 elétrons de valência e forma 6 ligações simples com átomos de flúor sem pares não ligantes residuais. O arranjo tem 6 pares eletrônicos: hibridização sp3d2 e geometria octaédrica perfeita (ângulos de 90°)."
      },
      {
        id: "ita-sim-10",
        area: "Exatas",
        disciplina: "Física - Movimento Harmônico Simples (MHS)",
        enunciado: "Um oscilador massa-mola ideal sobre plano horizontal sem atrito possui constante elástica k e massa m. O período de oscilação desse sistema é T. Se substituirmos a mola por outra de constante 4k e quadruplicarmos a massa acoplada (4m), o novo período de oscilação será:",
        "alternativas": [
          "T/2",
          "T (permanece inalterado)",
          "2T",
          "4T",
          "T/4"
        ],
        correta: 1,
        explicacao: "O período é T = 2π * √(m / k). Com m' = 4m e k' = 4k: T' = 2π * √(4m / 4k) = 2π * √(m / k) = T. O período permanece exatamente o mesmo!"
      }
    ]
  }
];

/* ========================================================
   CATÁLOGO COMPLETO DE TEMAS POR DISCIPLINA (PARA O SELETOR DE SIMULADO SOB MEDIDA)
   ======================================================== */
const TEMAS_DISCIPLINAS_DATA = {
  "Matemática": [
    "Todos os Temas de Matemática",
    "Funções & Gráficos (1º e 2º Grau, Exponencial, Logarítmica)",
    "Geometria Espacial (Prismas, Cilindros, Cones, Esferas)",
    "Geometria Plana & Trigonometria",
    "Matemática Financeira & Porcentagem",
    "Probabilidade & Análise Combinatória",
    "Estatística Básica (Média, Mediana, Desvio Padrão)",
    "Progressões (PA e PG)",
    "Sistemas Lineares e Matrizes"
  ],
  "Física": [
    "Todos os Temas de Física",
    "Mecânica: Leis de Newton & Dinâmica",
    "Cinemática: Movimento Uniforme e Acelerado",
    "Eletrodinâmica: Circuitos, Resistores e Lei de Ohm",
    "Termologia & Calorimetria",
    "Ondulatória & Acústica",
    "Óptica Geométrica (Lentes e Espelhos)",
    "Trabalho, Potência e Energia Mecânica",
    "Eletromagnetismo & Indução"
  ],
  "Química": [
    "Todos os Temas de Química",
    "Estequiometria & Cálculos Químicos",
    "Química Orgânica: Funções e Nomenclatura",
    "Soluções & Concentrações (Molaridade, Título)",
    "Eletroquímica: Pilhas e Eletrólise",
    "Termoquímica & Lei de Hess",
    "Equilíbrio Químico & pH",
    "Tabela Periódica & Ligações Químicas",
    "Cinética Química & Radioatividade"
  ],
  "Biologia": [
    "Todos os Temas de Biologia",
    "Ecologia: Cadeias Alimentares, Ciclos e Biomas",
    "Genética Mendeliana & Biologia Molecular (DNA/RNA)",
    "Citologia & Metabolismo Energético (Fotossíntese/Respiração)",
    "Fisiologia Humana (Sistemas Circulatório, Digestório, Nervoso)",
    "Evolução das Espécies (Darwinismo e Sintética)",
    "Microbiologia & Imunologia (Vacinas e Soros)",
    "Botânica e Fisiologia Vegetal"
  ],
  "História": [
    "Todos os Temas de História",
    "Brasil Colônia: Economia Açucareira e Ciclo do Ouro",
    "Brasil Império: Primeiro e Segundo Reinado",
    "Brasil República: Era Vargas e República Oligárquica",
    "Ditadura Militar no Brasil (1964-1985) e Redemocratização",
    "Revoluções Burguesas, Iluminismo e Revolução Industrial",
    "Século XX: Guerras Mundiais e Guerra Fria",
    "Mundo Antigo: Grécia, Roma e Cidadania"
  ],
  "Geografia": [
    "Todos os Temas de Geografia",
    "Geografia Urbana & Conurbação",
    "Demografia: Transição Demográfica e Fluxos Migratórios",
    "Agropecuária Brasileira & Modernização Agrícola",
    "Geopolítica Contemporânea & Globalização",
    "Biomas Brasileiros & Meio Ambiente",
    "Climatologia Brasileira e Mundial",
    "Industrialização Brasileira e Recursos Energéticos"
  ],
  "Língua Portuguesa": [
    "Todos os Temas de Português",
    "Interpretação e Compreensão Textual Crítica",
    "Sintaxe da Oração e do Período (Coordenação e Subordinação)",
    "Crase e Regência Verbal e Nominal",
    "Concordância Verbal e Nominal",
    "Figuras de Linguagem e Recursos Expressivos",
    "Variação Linguística & Preconceito Linguístico",
    "Coesão Referencial e Sequencial"
  ],
  "Literatura": [
    "Todos os Temas de Literatura",
    "Romantismo Brasileiro (Poesia e Prosa Indigenista/Urbana)",
    "Realismo & Naturalismo (Machado de Assis e Aluísio Azevedo)",
    "Modernismo Brasileiro (Semana de 22 e Geração de 30)",
    "Literatura Contemporânea Brasileira",
    "Barroco e Arcadismo no Brasil",
    "Interpretação de Poemas e Formas Literárias"
  ],
  "Filosofia & Sociologia": [
    "Todos os Temas de Filosofia e Sociologia",
    "Filosofia Política: Contratualismo (Hobbes, Locke, Rousseau)",
    "Ética & Moral (Aristóteles, Kant e Utilitarismo)",
    "Sociologia Clássica (Marx, Durkheim e Weber)",
    "Trabalho, Precarização e Sociedade de Consumo (Bauman)",
    "Cidadania, Direitos Humanos e Constituição de 1988",
    "Indústria Cultural & Cultura de Massa (Escola de Frankfurt)"
  ],
  "Inglês": [
    "Todos os Temas de Inglês",
    "Reading Comprehension & Leitura Crítica",
    "Conectivos Lógicos (Linking Words)",
    "Falsos Cognatos & Vocabulário Contextual",
    "Interpretação de Tiras, Cartuns e Infográficos"
  ]
};

// Concatena novos simulados à lista principal de SIMULADOS_DATA
if (typeof SIMULADOS_DATA !== 'undefined' && Array.isArray(SIMULADOS_DATA)) {
  NOVOS_SIMULADOS_EXPANSAO.forEach(sim => {
    // Evita duplicatas se o ID já existir
    if (!SIMULADOS_DATA.some(s => s.id === sim.id)) {
      SIMULADOS_DATA.push(sim);
    }
  });
}

/* ========================================================
   BASE DE DADOS: CANAIS DE VIDEOAULAS DO YOUTUBE
   Recomendações dos 3 Melhores Canais por Disciplina
   ======================================================== */
const CANAIS_YOUTUBE_DATA = [
  // --- 1. MATEMÁTICA ---
  {
    id: "mat-ferretto",
    disciplinaId: "matematica",
    disciplina: "Matemática",
    icone: "fa-calculator",
    corIcone: "#2563eb",
    nomeCanal: "Professor Ferretto",
    professor: "Prof. Daniel Ferretto",
    inscritos: "3.5M inscritos",
    destaque: "Líder em Matemática do Zero ao Avançado",
    descricao: "Maior canal de Matemática para vestibulares do Brasil. Didática impecável que constrói a base desde os conceitos mais elementares até o nível mais exigente do ENEM, FUVEST e vestibulares paulistas.",
    playlists: ["Matemática Básica do Zero", "Funções de 1º e 2º Grau", "Geometria Espacial & Plana", "Resoluções ENEM"],
    urlCanal: "https://www.youtube.com/@ProfessorFerretto",
    videoId: "Zq6F4R2gMtc",
    videoTitulo: "Matemática Básica - Aula 01: Operações Fundamentais e Macetes de Cálculo Rápido"
  },
  {
    id: "mat-gis",
    disciplinaId: "matematica",
    disciplina: "Matemática",
    icone: "fa-calculator",
    corIcone: "#0284c7",
    nomeCanal: "Gis com Giz Mathematics",
    professor: "Profª. Giseli",
    inscritos: "2.3M inscritos",
    destaque: "Didática Visual & Passo a Passo",
    descricao: "Aulas claras com esquemas coloridos perfeitos para quem tem medo ou bloqueio com Matemática. Explicações passo a passo de frações, equações, trigonometria e porcentagem com riqueza de detalhes.",
    playlists: ["Aritmética e Frações", "Regra de Três & Porcentagem", "Equações e Álgebra", "Estatística Básica"],
    urlCanal: "https://www.youtube.com/@Giscomgiz",
    videoId: "l6i_aJ3K6Xw",
    videoTitulo: "Como Aprender Frações e Operações sem Decorar Regras"
  },
  {
    id: "mat-equaciona",
    disciplinaId: "matematica",
    disciplina: "Matemática",
    icone: "fa-calculator",
    corIcone: "#1d4ed8",
    nomeCanal: "Equaciona com Paulo Pereira",
    professor: "Prof. Paulo Pereira",
    inscritos: "1.8M inscritos",
    destaque: "Resolução de Questões Desafiadoras & Macetes",
    descricao: "Focado em resolução de exercícios clássicos e de alto nível da FUVEST, UNICAMP, ENEM e escolas militares. Excelente para quem já tem a base e precisa de agilidade e repertório de soluções criativas.",
    playlists: ["Desafios Matemáticos", "Geometria Analítica", "Probabilidade & Análise Combinatória", "Maratona FUVEST"],
    urlCanal: "https://www.youtube.com/@EquacionaMatematica",
    videoId: "M_X1rE2xP8w",
    videoTitulo: "Análise Combinatória: O Segredo para não errar Arranjo x Combinação"
  },

  // --- 2. FÍSICA ---
  {
    id: "fis-chama",
    disciplinaId: "fisica",
    disciplina: "Física",
    icone: "fa-atom",
    corIcone: "#0284c7",
    nomeCanal: "Chama o Físico",
    professor: "Prof. Marcelo Boaro",
    inscritos: "1.2M inscritos",
    destaque: "Curso Completo & Listas de Exercícios",
    descricao: "Referência absoluta em cronogramas organizados de Física. Suas aulas possuem início, meio e fim muito estruturados, com centenas de exercícios resolvidos e divididos em níveis fácil, médio e difícil.",
    playlists: ["Mecânica Completa", "Termologia & Calorimetria", "Óptica e Ondulatória", "Eletricidade e Circuitos"],
    urlCanal: "https://www.youtube.com/@chamaofisico",
    videoId: "zHqH7uL6kQw",
    videoTitulo: "Leis de Newton e Aplicações em Planos Inclinados e Polias"
  },
  {
    id: "fis-total",
    disciplinaId: "fisica",
    disciplina: "Física",
    icone: "fa-atom",
    corIcone: "#0369a1",
    nomeCanal: "Física Total",
    professor: "Prof. Ivys Urquiza",
    inscritos: "850k inscritos",
    destaque: "Física Conceitual com Aplicação Prática",
    descricao: "Um dos pioneiros da educação no YouTube. O professor Ivys alia rigor científico e contextualização real, abordando energia, trabalho, termodinâmica e indução eletromagnética com clareza fenomenal.",
    playlists: ["Cinemática do Zero", "Gravitação Universal", "Eletromagnetismo", "Revisão Final ENEM"],
    urlCanal: "https://www.youtube.com/@FisicaTotal",
    videoId: "01J-fH7D1xQ",
    videoTitulo: "Conservação da Energia Mecânica: Conceitos Fundamentais e Exercícios"
  },
  {
    id: "fis-universo",
    disciplinaId: "fisica",
    disciplina: "Física",
    icone: "fa-atom",
    corIcone: "#0f766e",
    nomeCanal: "Universo Narrado",
    professor: "Prof. Felipe Guisoli",
    inscritos: "1.4M inscritos",
    destaque: "Intuição Física & Pensamento Crítico",
    descricao: "Aulas profundas que ensinam a 'pensar como um físico'. Focado em construir intuição matemática e geométrica, ideal para gabaritar a primeira e a segunda fase da FUVEST, UNICAMP e ITA.",
    playlists: ["O que é a Física?", "Vetores & Cinemática Vetorial", "Dinâmica e Rotação", "Física Moderna"],
    urlCanal: "https://www.youtube.com/@UniversoNarrado",
    videoId: "4tM5Z5Y-a6U",
    videoTitulo: "Entendendo Vetores de Verdade: A Linguagem da Física"
  },

  // --- 3. QUÍMICA ---
  {
    id: "qui-cabral",
    disciplinaId: "quimica",
    disciplina: "Química",
    icone: "fa-flask-vial",
    corIcone: "#16a34a",
    nomeCanal: "Professor Gabriel Cabral",
    professor: "Prof. Gabriel Cabral",
    inscritos: "1.3M inscritos",
    destaque: "Química Descontraída com Músicas & Mnemônicos",
    descricao: "Torna a Química fácil e inesquecível. Com músicas inteligentes e macetes práticos, destrincha estequiometria, nox, balanceamento e química orgânica de forma leve e extremamente eficaz.",
    playlists: ["Estequiometria do Zero", "Química Orgânica Fácil", "Termoquímica & Cinética", "Soluções e Concentrações"],
    urlCanal: "https://www.youtube.com/@ProfessorGabrielCabral",
    videoId: "1OqN7WkL0s8",
    videoTitulo: "Cálculo Estequiométrico: Aprenda em 3 Passos Simples"
  },
  {
    id: "qui-cafe",
    disciplinaId: "quimica",
    disciplina: "Química",
    icone: "fa-flask-vial",
    corIcone: "#15803d",
    nomeCanal: "Café com Química",
    professor: "Prof. Michel",
    inscritos: "620k inscritos",
    destaque: "Rigor Teórico & Aprofundamento para Medicina",
    descricao: "Aulas profundas com excelente padrão visual no quadro negro digital. Essencial para quem precisa de pontuação máxima em Química em vestibulares de alta concorrência como Medicina na USP e UNICAMP.",
    playlists: ["Equilíbrio Químico (Kc e Kp)", "Eletroquímica (Pilhas e Eletrólise)", "Funções Oxigenadas e Nitrogenadas", "Isomeria Espacial"],
    urlCanal: "https://www.youtube.com/@CafecomQuimica",
    videoId: "8w3V7p0K6l4",
    videoTitulo: "Pilhas de Daniell e Potencial Padrão de Redução"
  },
  {
    id: "qui-acao",
    disciplinaId: "quimica",
    disciplina: "Química",
    icone: "fa-flask-vial",
    corIcone: "#059669",
    nomeCanal: "Química em Ação",
    professor: "Prof. Paulo Valim",
    inscritos: "1.1M inscritos",
    destaque: "Experimentos Reais & Grade Curricular Completa",
    descricao: "Une teoria densa a demonstrações práticas de laboratório. O professor Paulo Valim conduz o aluno desde as propriedades da matéria até as reações orgânicas mais complexas com grande entusiasmo.",
    playlists: ["Tabela Periódica & Ligações", "Gases e Leis dos Gases", "Radioatividade", "Química Ambiental no ENEM"],
    urlCanal: "https://www.youtube.com/@quimicaemacao",
    videoId: "e7D3wZ1fL0w",
    videoTitulo: "Ligações Químicas: Iônica, Covalente e Metálica na Prática"
  },

  // --- 4. BIOLOGIA ---
  {
    id: "bio-jubilut",
    disciplinaId: "biologia",
    disciplina: "Biologia",
    icone: "fa-dna",
    corIcone: "#059669",
    nomeCanal: "Biologia Total com Jubilut",
    professor: "Prof. Paulo Jubilut",
    inscritos: "3.2M inscritos",
    destaque: "Ecologia, Evolução & Atualidades Ambientais",
    descricao: "O maior canal de Biologia do país. Aulas dinâmicas, com forte apelo ecológico e de saúde pública, conectando os conteúdos cobrados nas provas às questões ambientais contemporâneas.",
    playlists: ["Ecologia & Cadeias Alimentares", "Evolução e Seleção Natural", "Fisiologia Humana Integrada", "Vírus e Pandemias"],
    urlCanal: "https://www.youtube.com/@paulojubilut",
    videoId: "qK2hN6V3kL0",
    videoTitulo: "Ciclos Biogeoquímicos: Carbono, Nitrogênio e Ciclo da Água"
  },
  {
    id: "bio-samuel",
    disciplinaId: "biologia",
    disciplina: "Biologia",
    icone: "fa-dna",
    corIcone: "#10b981",
    nomeCanal: "Biologia com Samuel Cunha",
    professor: "Prof. Samuel Cunha",
    inscritos: "1.6M inscritos",
    destaque: "Quadros Esquematizados & Didática Acolhedora",
    descricao: "Quadros de anotação coloridos impecáveis, ideais para copiar e montar resumos visuais. Didática tranquila, respeitosa e muito precisa para Genética, Citologia, Bioquímica e Reino Animal.",
    playlists: ["Citologia & Organelas Celulares", "Genética Mendeliana", "Embriologia e Histologia", "Botânica para Vestibular"],
    urlCanal: "https://www.youtube.com/@professorsamuelcunha",
    videoId: "wK7yP1xR4f8",
    videoTitulo: "Membrana Plasmática: Transporte Ativo, Passivo e Osmose"
  },
  {
    id: "bio-explica",
    disciplinaId: "biologia",
    disciplina: "Biologia",
    icone: "fa-dna",
    corIcone: "#047857",
    nomeCanal: "BioExplica",
    professor: "Prof. Kennedy Ramos",
    inscritos: "1.3M inscritos",
    destaque: "Animações 3D & Fisiologia Humana Descomplicada",
    descricao: "Utiliza animações 3D de alta qualidade para demonstrar o interior da célula, o funcionamento dos sistemas cardiovascular e nervoso e os ciclos de divisão celular (mitose e meiose).",
    playlists: ["Divisão Celular: Mitose e Meiose", "Sistema Circulatório e Excretor", "Parasitologia e Doenças", "Bioquímica: Enzimas e Proteínas"],
    urlCanal: "https://www.youtube.com/@KennedyRamos",
    videoId: "u6bN3V8qK0w",
    videoTitulo: "Primeira Lei de Mendel: Como Resolver Questões de Genética"
  },

  // --- 5. HISTÓRIA ---
  {
    id: "his-debora",
    disciplinaId: "historia",
    disciplina: "História",
    icone: "fa-landmark",
    corIcone: "#b45309",
    nomeCanal: "Débora Aladim",
    professor: "Débora Aladim",
    inscritos: "3.4M inscritos",
    destaque: "Resumos em 1 Folha & Linhas do Tempo Visuais",
    descricao: "Criadora dos famosos resumos desenhados em uma folha. Consegue sintetizar séculos de história em narrativas claras e diretas, com foco certeiro nas temáticas mais frequentes do ENEM e vestibulares.",
    playlists: ["História do Brasil Completa", "Idade Média e Moderna", "Era Vargas e Ditadura Militar", "Como Fazer Resumos Eficientes"],
    urlCanal: "https://www.youtube.com/@DeboraAladim",
    videoId: "lQ4sB8K7x1o",
    videoTitulo: "História do Brasil: Resumo Completo da Era Vargas (1930 - 1945)"
  },
  {
    id: "his-seliga",
    disciplinaId: "historia",
    disciplina: "História",
    icone: "fa-landmark",
    corIcone: "#92400e",
    nomeCanal: "Se Liga Nessa História",
    professor: "Prof. Walter Solla & Thiago Gomide",
    inscritos: "1.2M inscritos",
    destaque: "Aulas Cinematográficas & Análise Crítica",
    descricao: "Produção audiovisual com figurinos, dramatização e roteiros afiados. Ajuda o vestibulando a compreender as causas econômicas, sociais e culturais dos grandes acontecimentos históricos.",
    playlists: ["Revolução Francesa", "Guerra Fria e Descolonização", "Brasil Colônia e Escravidão", "História das Américas"],
    urlCanal: "https://www.youtube.com/@seliganessahistoria",
    videoId: "a1B2c3D4e5F",
    videoTitulo: "Revolução Francesa: Causas, Fases do Terror e Queda da Bastilha"
  },
  {
    id: "his-parabolica",
    disciplinaId: "historia",
    disciplina: "História",
    icone: "fa-landmark",
    corIcone: "#78350f",
    nomeCanal: "Parabólica com Pedro Renno",
    professor: "Prof. Pedro Renno",
    inscritos: "920k inscritos",
    destaque: "Curso Extensivo e Completo de Humanas",
    descricao: "Aulas acadêmicas minuciosas em quadro tradicional. Cobertura completa de cada período histórico, desde a Antiguidade Clássica (Grécia e Roma) até a Nova República brasileira.",
    playlists: ["História Antiga: Grécia e Roma", "Brasil Império: 1º e 2º Reinado", "Primeira e Segunda Guerra Mundial", "Guerra Fria"],
    urlCanal: "https://www.youtube.com/@Parabolica",
    videoId: "p1Q2r3S4t5U",
    videoTitulo: "Brasil República Velha: Coronelismo, Café com Leite e Revoltas"
  },

  // --- 6. GEOGRAFIA ---
  {
    id: "geo-jean",
    disciplinaId: "geografia",
    disciplina: "Geografia",
    icone: "fa-earth-americas",
    corIcone: "#0284c7",
    nomeCanal: "Professor JeanGrafia",
    professor: "Prof. Jean",
    inscritos: "760k inscritos",
    destaque: "Geopolítica Mundial & Atualidades das Bancas",
    descricao: "Especialista em conectar acontecimentos geopolíticos mundiais contemporâneos às matrizes de competência das principais bancas de vestibular. Excelente domínio de mapas e gráficos.",
    playlists: ["Geopolítica do Oriente Médio", "Climatologia e Fenômenos Atmosféricos", "Globalização e Blocos Econômicos", "Matrizes Energéticas"],
    urlCanal: "https://www.youtube.com/@ProfessorJeanGrafia",
    videoId: "j1K2l3M4n5O",
    videoTitulo: "Geopolítica dos Recursos Naturais e Conflitos Contemporâneos"
  },
  {
    id: "geo-terranegra",
    disciplinaId: "geografia",
    disciplina: "Geografia",
    icone: "fa-earth-americas",
    corIcone: "#0369a1",
    nomeCanal: "Terra Negra",
    professor: "Equipe Terra Negra (Prof. Vitor, João, etc.)",
    inscritos: "520k inscritos",
    destaque: "Aulas de Campo Reais & Geografia Física",
    descricao: "Gravações 'in loco' em vulcões, cavernas, falésias e bacias hidrográficas reais. Perfeito para visualizar relevo, geomorfologia, bacias hidrográficas e dinâmica climática de forma viva.",
    playlists: ["Geomorfologia e Relevo do Brasil", "Biomas Brasileiros (Cerrado, Caatinga, Amazônia)", "Questão Agrária e Conflitos de Terra", "Urbanização e Megacidades"],
    urlCanal: "https://www.youtube.com/@TerraNegra",
    videoId: "t1E2r3R4a5N",
    videoTitulo: "Estrutura Geológica e Relevo Brasileiro: Planaltos, Planícies e Depressões"
  },
  {
    id: "geo-silvester",
    disciplinaId: "geografia",
    disciplina: "Geografia",
    icone: "fa-earth-americas",
    corIcone: "#0d9488",
    nomeCanal: "Professor Silvester",
    professor: "Prof. Silvester",
    inscritos: "670k inscritos",
    destaque: "Didática Dinâmica para Geografia Humana & Agrária",
    descricao: "Excelente abordagem de demografia, pirâmides etárias, migrações, agronegócio e impactos ambientais no Brasil. Didática leve e direta com linguagem jovem e foco em vestibulares.",
    playlists: ["Demografia e Transição Demográfica", "Revolução Verde e Agro Brasileiro", "Industrialização Brasileira", "Cartografia e Fusos Horários"],
    urlCanal: "https://www.youtube.com/@ProfessorSilvester",
    videoId: "s1I2l3V4e5S",
    videoTitulo: "Cartografia: Como Ler Escalas, Projeções e Coordenadas Geográficas"
  },

  // --- 7. LÍNGUA PORTUGUESA & LITERATURA ---
  {
    id: "por-noslen",
    disciplinaId: "portugues",
    disciplina: "Língua Portuguesa & Literatura",
    icone: "fa-book-open",
    corIcone: "#7c3aed",
    nomeCanal: "Professor Noslen",
    professor: "Prof. Noslen Machado",
    inscritos: "4.8M inscritos",
    destaque: "Maior Canal de Educação da Língua Portuguesa",
    descricao: "O maior canal de língua portuguesa do mundo. Aborda sintaxe, morfologia, pontuação, figuras de linguagem e escolas literárias com alto astral e didática acessível a qualquer nível.",
    playlists: ["Sintaxe Completa (Termos da Oração)", "Figuras de Linguagem", "Escolas Literárias Brasileiras", "Pontuação e Uso da Vírgula"],
    urlCanal: "https://www.youtube.com/@ProfessorNoslen",
    videoId: "n1O2s3L4e5N",
    videoTitulo: "Figuras de Linguagem: Metáfora, Metonímia, Antítese e Paradoxo"
  },
  {
    id: "por-pamba",
    disciplinaId: "portugues",
    disciplina: "Língua Portuguesa & Literatura",
    icone: "fa-book-open",
    corIcone: "#9333ea",
    nomeCanal: "Redação e Gramática Zica",
    professor: "Profª. Pamba",
    inscritos: "2.8M inscritos",
    destaque: "Gramática Descomplicada & Dúvidas Críticas",
    descricao: "Aulas rápidas e incisivas sobre os pontos gramaticais que mais tiram pontos dos vestibulandos: crase, concordância verbal e nominal, regência, colocação pronominal e ortografia.",
    playlists: ["Crase sem Medo", "Concordância Verbal e Nominal", "Regência Verbal Descomplicada", "Orações Subordinadas"],
    urlCanal: "https://www.youtube.com/@RedacaoeGramaticaZica",
    videoId: "p1A2m3B4a5Z",
    videoTitulo: "Uso da Crase: Regras Obrigatórias, Proibidas e Casos Facultativos"
  },
  {
    id: "por-alencar",
    disciplinaId: "portugues",
    disciplina: "Língua Portuguesa & Literatura",
    icone: "fa-book-open",
    corIcone: "#6d28d9",
    nomeCanal: "Literatura com Alencar",
    professor: "Prof. Alencar",
    inscritos: "420k inscritos",
    destaque: "Análises de Livros Obrigatórios das Bancas",
    descricao: "Especialista nas listas de leituras obrigatórias da FUVEST, UNICAMP, UERJ e vestibulares do Sul. Fornece análises de enredo, personagens, estilo de época e pegadinhas das bancas examinadoras.",
    playlists: ["Obras FUVEST 2026/2027", "Livros UNICAMP", "Modernismo e Poesia Social", "Romantismo vs. Realismo"],
    urlCanal: "https://www.youtube.com/@LiteraturacomAlencar",
    videoId: "a1L2e3N4c5A",
    videoTitulo: "Dom Casmurro (Machado de Assis): Análise Psicológica e Foco nas Questões"
  },

  // --- 8. REDAÇÃO ---
  {
    id: "red-jana",
    disciplinaId: "redacao",
    disciplina: "Redação",
    icone: "fa-feather-pointed",
    corIcone: "#be185d",
    nomeCanal: "Jana Rabelo",
    professor: "Profª. Jana Rabelo",
    inscritos: "710k inscritos",
    destaque: "Repertório Sociocultural Produtivo & Tese Forte",
    descricao: "Autoridade máxima em redação dissertativo-argumentativa. Ensina a construir projetos de texto consistentes, relacionar sociólogos, filósofos e filmes legitimados com o tema da proposta.",
    playlists: ["Repertórios Curinga Legítimos", "Construção da Tese e D1/D2", "Proposta de Intervenção Nota 200", "Análise de Temas Prováveis"],
    urlCanal: "https://www.youtube.com/@janarabelo",
    videoId: "j1A2n3A4r5B",
    videoTitulo: "Como Construir uma Tese Irrefutável e Projeto de Texto Perfeito"
  },
  {
    id: "red-luma",
    disciplinaId: "redacao",
    disciplina: "Redação",
    icone: "fa-feather-pointed",
    corIcone: "#db2777",
    nomeCanal: "Luma e Ponto",
    professor: "Profª. Luma Diniz",
    inscritos: "1.1M inscritos",
    destaque: "Modelos de Redação & Método dos Esqueletos",
    descricao: "Criadora do método dos modelos de redação que levou milhares de vestibulandos à nota 900+ e 1000. Excelente para quem tem dificuldade de começar ou perde muito tempo estruturando o rascunho.",
    playlists: ["Modelos de Redação Nota 1000", "Operadores Argumentativos (Competência 4)", "Introdução Perfeita em 3 Frases", "Erros que Zeram Redação"],
    urlCanal: "https://www.youtube.com/@LumaDiniz",
    videoId: "l1U2m3A4d5I",
    videoTitulo: "Estrutura dos 4 Parágrafos: O Esqueleto Universal da Redação Nota 1000"
  },
  {
    id: "red-tiago",
    disciplinaId: "redacao",
    disciplina: "Redação",
    icone: "fa-feather-pointed",
    corIcone: "#9d174d",
    nomeCanal: "Puxa Caixorra! com Tiago Português",
    professor: "Prof. Tiago Português",
    inscritos: "630k inscritos",
    destaque: "Os 5 Elementos da Proposta & Dicas de Corretor",
    descricao: "Didática dinâmica e transparente sobre o que os corretores oficiais buscam em cada uma das 5 competências do ENEM. Foco em coesão textual, detalhamento da intervenção e paralelismo sintático.",
    playlists: ["Os 5 Elementos da Intervenção", "Desmontando Redações Nota 1000", "Conectivos que Impressionam o Corretor", "Técnicas de Conclusão"],
    urlCanal: "https://www.youtube.com/@TiagoPortugues",
    videoId: "t1I2a3G4o5P",
    videoTitulo: "Proposta de Intervenção: Como Garantir os 200 Pontos na Competência 5"
  },

  // --- 9. FILOSOFIA & SOCIOLOGIA ---
  {
    id: "fil-parabolica",
    disciplinaId: "filosofia",
    disciplina: "Filosofia & Sociologia",
    icone: "fa-brain",
    corIcone: "#6366f1",
    nomeCanal: "Parabólica - Filosofia & Sociologia",
    professor: "Prof. Pedro Renno",
    inscritos: "920k inscritos",
    destaque: "Linha Filosófica Completa do Pré-Socrático ao Moderno",
    descricao: "Curso sistemático e cronológico dos grandes pensadores da humanidade: Sócrates, Platão, Aristóteles, Maquiavel, Hobbes, Locke, Rousseau, Kant, Nietzsche, Foucault e Bauman.",
    playlists: ["Filosofia Antiga e Medieval", "Contratualismo e Iluminismo", "Sociologia Clássica: Marx, Durkheim e Weber", "Escola de Frankfurt e Modernidade"],
    urlCanal: "https://www.youtube.com/@Parabolica",
    videoId: "p1Q2r3S4t5U",
    videoTitulo: "Os Contratualistas: As Diferenças Cruciais entre Hobbes, Locke e Rousseau"
  },
  {
    id: "fil-brasilescola",
    disciplinaId: "filosofia",
    disciplina: "Filosofia & Sociologia",
    icone: "fa-brain",
    corIcone: "#4f46e5",
    nomeCanal: "Brasil Escola - Ciências Humanas",
    professor: "Prof. Francisco Porfírio",
    inscritos: "2.6M inscritos",
    destaque: "Conceitos Pontuais e Diretos para Questões de Prova",
    descricao: "Explicações compactas e certeiras de conceitos frequentemente cobrados nas questões de múltipla escolha: mito da caverna, imperativo categórico, indústria cultural, pós-verdade e cidadania.",
    playlists: ["Conceitos Fundamentais de Filosofia", "Sociologia Brasileira (Gilberto Freyre, Sérgio Buarque)", "Ética e Moral", "Teoria Política"],
    urlCanal: "https://www.youtube.com/@brasilescola",
    videoId: "b1R2a3S4i5L",
    videoTitulo: "Ética x Moral: O que cada conceito significa e como cai na prova"
  },
  {
    id: "fil-casadosaber",
    disciplinaId: "filosofia",
    disciplina: "Filosofia & Sociologia",
    icone: "fa-brain",
    corIcone: "#4338ca",
    nomeCanal: "Casa do Saber",
    professor: "Professores Doutores Convidados (Karnal, Pondé, Chaui)",
    inscritos: "2.2M inscritos",
    destaque: "Debate Crítico Aprofundado & Repertório Universitário",
    descricao: "Aulas magnas e entrevistas com os maiores pensadores do Brasil contemporâneo. Proporciona repertório maduro e original para redações nota 1000 e questões discursivas de segunda fase.",
    playlists: ["Filosofia e Existência", "Amor Líquido e Zygmunt Bauman", "Cultura, Política e Sociedade", "Pensadores do Século XXI"],
    urlCanal: "https://www.youtube.com/@CasadoSaber",
    videoId: "c1A2s3A4d5O",
    videoTitulo: "Zygmunt Bauman e a Modernidade Líquida: Relações, Consumo e Insegurança"
  },

  // --- 10. IDIOMAS (INGLÊS & ESPANHOL) ---
  {
    id: "idi-mairo",
    disciplinaId: "idiomas",
    disciplina: "Idiomas (Inglês & Espanhol)",
    icone: "fa-language",
    corIcone: "#ea580c",
    nomeCanal: "Mairo Vergara",
    professor: "Mairo Vergara",
    inscritos: "3.1M inscritos",
    destaque: "Técnicas de Leitura Rápida & Interpretação Textual",
    descricao: "O maior especialista em aprendizado de idiomas do país. Foco nas técnicas de 'skimming' e 'scanning' para encontrar a resposta correta em textos longos em língua estrangeira no vestibular.",
    playlists: ["Como Interpretar Textos em Inglês", "Minerações de Frases e Sentenças", "As 1000 Palavras Mais Comuns", "Dicas de Leitura Crítica"],
    urlCanal: "https://www.youtube.com/@MairoVergara",
    videoId: "m1A2i3R4o5V",
    videoTitulo: "Como Ler e Interpretar Textos em Inglês Mesmo com Vocabulário Básico"
  },
  {
    id: "idi-carina",
    disciplinaId: "idiomas",
    disciplina: "Idiomas (Inglês & Espanhol)",
    icone: "fa-language",
    corIcone: "#d97706",
    nomeCanal: "English in Brazil",
    professor: "Profª. Carina Fragozo",
    inscritos: "2.3M inscritos",
    destaque: "Falsos Cognatos & Conectivos Lógicos (Linking Words)",
    descricao: "Aulas linguísticas precisas e bem humoradas. Ensina a identificar pegadinhas clássicas de tradução e o papel dos conectivos lógicos em artigos científicos e notícias da imprensa internacional.",
    playlists: ["Falsos Cognatos que Iludem o Estudante", "Linking Words (Conectivos em Inglês)", "Tempos Verbais mais Cobrados", "Expressões Idiomáticas em Manchetes"],
    urlCanal: "https://www.youtube.com/@EnglishinBrazil",
    videoId: "c1A2r3I4n5A",
    videoTitulo: "Falsos Amigos (False Friends) no Inglês: As 20 Maiores Pegadinhas"
  },
  {
    id: "idi-espanhol",
    disciplinaId: "idiomas",
    disciplina: "Idiomas (Inglês & Espanhol)",
    icone: "fa-language",
    corIcone: "#c2410c",
    nomeCanal: "Espanhol para Vestibulares",
    professor: "Profª. Juliana & Prof. Deley",
    inscritos: "460k inscritos",
    destaque: "Foco Exclusivo nas Bancas: FUVEST, ENEM e UFRGS",
    descricao: "Especialmente dedicado a vestibulandos que optaram por Espanhol como língua estrangeira. Aborda heterosemânticos (falsos amigos), pronomes de complemento e interpretação de quadrinhos e crônicas.",
    playlists: ["Espanhol para o ENEM", "Heterossemânticos e Heterogenéricos", "Interpretação de Tiras da Mafalda e Macanudo", "Pronomes e Artigos Neutros"],
    urlCanal: "https://www.youtube.com/@EspanholdoZero",
    videoId: "e1S2p3A4n5H",
    videoTitulo: "Espanhol para Vestibulares: As 15 Palavras que Mudam Completamente de Sentido"
  }
];

if (typeof window !== 'undefined') {
  window.CANAIS_YOUTUBE_DATA = CANAIS_YOUTUBE_DATA;
}