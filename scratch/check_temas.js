const fs = require('fs');
const content = fs.readFileSync('js/data.js', 'utf8');
const match = content.match(/const TEMAS_REDACAO_DATA = \[([\s\S]*?)\n\];/);
if (match) {
  const ids = match[1].match(/id:\s*['"][^'"]+['"]/g);
  console.log('Total themes:', ids ? ids.length : 0);
  if (ids) console.log(ids.slice(0, 5));
} else {
  console.log('Not matched');
}
