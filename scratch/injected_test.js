const keys = Object.keys(VESTIBULARES_DATA);
const errors = [];
keys.forEach(k => {
    try {
        AppState.currentVestibular = k;
        renderizarVestibularAtivo();
        const html = document.getElementById('vestibular-conteudo-detalhado').innerHTML;
        if (!html || html.length < 50) {
            errors.push(k + ': empty HTML');
        }
    } catch(err) {
        errors.push(k + ': ' + err.message);
    }
});
console.log('TEST_RESULTS:', JSON.stringify({ total: keys.length, errors: errors }));