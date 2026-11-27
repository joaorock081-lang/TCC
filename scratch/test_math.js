const text = 1. Identificar as variáveis
• \\( C = 5.000 \\) (custo futuro)
• \\( n = 12 \\) (meses)
• \\( r \\) = taxa de juros (ex: 1% ao mês)

2. Usar a fórmula de juros compostos
\\[
\\text{PV} = \\frac{C}{(1+r)^n}
\\]
\\[
\\text{PV} = \\frac{5.000}{(1+0,01)^{12}}\\approx 4.455,96
\\];

function formatarMarkdownChat(texto) {
  if (!texto) return '';
  let limpo = texto;

  // Transforma \[ ... \] em bloco matemático limpo
  limpo = limpo.replace(/\\\[([\s\S]*?)\\\]/g, (match, formula) => {
    let f = formula
      .replace(/\\text\{([^}]+)\}/g, '')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '( / )')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\times|\\cdot/g, ' × ')
      .replace(/\\le|\\leq/g, ' ≤ ')
      .replace(/\\ge|\\geq/g, ' ≥ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√()')
      .replace(/\\/g, '')
      .trim();
    return '\n\n`math\n' + f + '\n`\n\n';
  });

  // Transforma \( ... \) em fórmula inline limpa
  limpo = limpo.replace(/\\\(([\s\S]*?)\\\)/g, (match, formula) => {
    let f = formula
      .replace(/\\text\{([^}]+)\}/g, '')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '( / )')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\times|\\cdot/g, ' × ')
      .replace(/\\le|\\leq/g, ' ≤ ')
      .replace(/\\ge|\\geq/g, ' ≥ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√()')
      .replace(/\\/g, '')
      .trim();
    return ' ' + f + ' ';
  });

  limpo = limpo
    .replace(/\\text\{([^}]+)\}/g, '')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '( / )')
    .replace(/\\approx/g, '≈')
    .replace(/\\times|\\cdot/g, '×')
    .replace(/\\le|\\leq/g, '≤')
    .replace(/\\ge|\\geq/g, '≥')
    .replace(/\\pm/g, '±')
    .replace(/\\sqrt\{([^}]+)\}/g, '√()')
    .replace(/\\([a-zA-Z])/g, '');

  let html = limpo
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/`math\n([\s\S]*?)`/g, '<div class="chat-math-block"></div>');
  html = html.replace(/`([a-z]*)\n([\s\S]*?)`/g, '<pre class="chat-code-block"><code></code></pre>');
  html = html.replace(/([^]+)/g, '<span class="chat-math-inline"></span>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong></strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em></em>');
  html = html.replace(/^\s*[-•]\s+(.+)$/gm, '<li></li>');
  html = html.replace(/(<li>[\s\S]+?<\/li>)/g, '<ul class="chat-lista-resumo"></ul>');
  html = html.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  return html;
}

console.log(formatarMarkdownChat(text));
