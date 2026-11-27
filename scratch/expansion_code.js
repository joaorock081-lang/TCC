
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
        alternativas": [
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
