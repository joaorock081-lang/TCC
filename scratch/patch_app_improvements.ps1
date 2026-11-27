$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Update formatarMarkdownChat to clean LaTeX and math tokens
$oldFormatMarkdown = @'
function formatarMarkdownChat(texto) {
  if (!texto) return '';
  let html = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bloco de código
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$2</code></pre>');
  // Código inline
  html = html.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');
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
'@

$newFormatMarkdown = @'
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
    return `\n\n```math\n${f}\n```\n\n`;
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
    return ` \`${f}\` `;
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
    .replace(/\\([a-zA-Z])/g, '$1');

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
'@

if ($content.Contains($oldFormatMarkdown)) {
    $content = $content.Replace($oldFormatMarkdown, $newFormatMarkdown)
    Write-Host "1. formatarMarkdownChat atualizado com limpador de LaTeX!"
} else {
    Write-Host "Aviso: oldFormatMarkdown não encontrado em app.js"
}

# 2. Update Gemini System Prompt to enforce concise, snappy, fast answers with no LaTeX
$oldSysPrompt = @'
1. Responda em Português do Brasil com tom encorajador, altamente didático, dinâmico e acolhedor.
2. Use negrito para palavras-chave e tópicos com bullet points para facilitar a leitura.
3. Se o aluno pedir um "cronograma" ou "plano de estudos", crie um cronograma semanal detalhado por dias com matérias prioritárias para ${vestibular} e ${curso}. Ao final, inclua a estrutura JSON estrita:
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
4. Se o aluno pedir para tirar dúvidas de exercícios, resolva passo a passo com raciocínio lógico claro antes das fórmulas.`;
'@

$newSysPrompt = @'
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
'@

if ($content.Contains($oldSysPrompt)) {
    $content = $content.Replace($oldSysPrompt, $newSysPrompt)
    Write-Host "2. systemPrompt atualizado para respostas rápidas e sem LaTeX!"
} else {
    Write-Host "Aviso: oldSysPrompt não encontrado em app.js"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
