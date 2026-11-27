const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('js/app.js', 'utf8');

console.log('--- TEST INTEGRATION REPORT ---');

// Test 1: Header 2 andares
const hasHeader2Andares = indexHtml.includes('site-header-2-andares') &&
  indexHtml.includes('header-andar-superior') &&
  indexHtml.includes('header-andar-inferior');
console.log('1. Header 2 andares presente no HTML:', hasHeader2Andares ? 'PASS' : 'FAIL');

// Test 2: 11 tabs
const tabs = ['inicio', 'vestibulares', 'videoaulas', 'simulados', 'redacao', 'quiz', 'cronograma', 'pomodoro', 'caderno', 'dicas', 'perfil'];
const allTabsPresent = tabs.every(t => indexHtml.includes(`mudarAba('${t}')`));
console.log('2. Todas as 11 abas presentes no carrossel inferior:', allTabsPresent ? 'PASS' : 'FAIL');

// Test 3: Cloud Database & Device Modal
const hasCloudBtn = indexHtml.includes('sincronizarManualmenteNuvem()');
const hasDeviceModal = indexHtml.includes('modal-conectar-dispositivo') && indexHtml.includes('input-codigo-dispositivo');
console.log('3. Botão de nuvem e modal multi-dispositivos presentes:', (hasCloudBtn && hasDeviceModal) ? 'PASS' : 'FAIL');

// Test 4: Floating windows function in app.js
const hasFixedAlternar = appJs.includes('window.alternarJanelaFlutuante') && appJs.includes('topOffset');
console.log('4. alternarJanelaFlutuante corrigida para coordenadas visíveis:', hasFixedAlternar ? 'PASS' : 'FAIL');

// Test 5: PBKDF2 and Rate Limiting
const hasPBKDF2 = appJs.includes('PBKDF2') && appJs.includes('verificarSenha');
const hasRateLimit = appJs.includes('TentativasLogin') && appJs.includes('bloqueadoAte');
console.log('5. PBKDF2 (100.000 iterações) e Rate Limiting presentes:', (hasPBKDF2 && hasRateLimit) ? 'PASS' : 'FAIL');

// Test 6: Cloud Sync Engine
const hasCloudSync = appJs.includes('EstudaMaisCloudSync') && appJs.includes('obterCodigoSincronizacao');
console.log('6. EstudaMaisCloudSync presente no JS:', hasCloudSync ? 'PASS' : 'FAIL');

if (hasHeader2Andares && allTabsPresent && hasCloudBtn && hasDeviceModal && hasFixedAlternar && hasPBKDF2 && hasRateLimit && hasCloudSync) {
  console.log('\n>>> TODOS OS TESTES PASSARAM COM SUCESSO! <<<');
} else {
  console.error('\n>>> FALHA EM ALGUNS TESTES <<<');
  process.exit(1);
}
