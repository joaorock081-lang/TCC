const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf-8');

// Strip comments
let cleanCss = '';
let inComment = false;
for (let i = 0; i < css.length; i++) {
  if (!inComment && css[i] === '/' && css[i+1] === '*') {
    inComment = true;
    i++;
  } else if (inComment && css[i] === '*' && css[i+1] === '/') {
    inComment = false;
    i++;
  } else if (!inComment) {
    cleanCss += css[i];
  }
}

let braceCount = 0;
let lines = cleanCss.split('\n');
for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  let line = lines[lineNum];
  for (let ch of line) {
    if (ch === '{') braceCount++;
    if (ch === '}') braceCount--;
    if (braceCount < 0) {
      console.log(`Extra closing brace around line ${lineNum + 1}: ${line}`);
      process.exit(1);
    }
  }
}

console.log('Final open brace count:', braceCount);
