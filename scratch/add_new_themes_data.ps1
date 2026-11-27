# ========================================================
# 1. ADD NEW ESSAY THEMES TO js/data.js
# ========================================================
$dataJs = [System.IO.File]::ReadAllText('js/data.js', [System.Text.Encoding]::UTF8)

$newThemesBlock = @'
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
'@

if ($dataJs.Contains('const TEMAS_REDACAO_DATA = [') -and -not $dataJs.Contains('redacao-enem-bets')) {
  $dataJs = $dataJs.Replace('const TEMAS_REDACAO_DATA = [', "const TEMAS_REDACAO_DATA = [`n" + $newThemesBlock)
  [System.IO.File]::WriteAllText('js/data.js', $dataJs, [System.Text.Encoding]::UTF8)
  Write-Host "Added new themes to js/data.js!"
} else {
  Write-Host "Themes already present or target not found."
}
