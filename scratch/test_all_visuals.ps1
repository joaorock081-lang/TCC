$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$testScript = @"
window.addEventListener('load', () => {
    const results = {};
    
    // 1. Frase motivacional
    const frase = document.getElementById('frase-motivacional');
    results.fraseText = frase ? frase.innerText.trim() : null;
    
    // 2. Stat tópicos
    const statTopicos = document.getElementById('stat-topicos-concluidos');
    results.statTopicos = statTopicos ? statTopicos.innerText.trim() : null;
    
    // 3. Botão Cores
    const btnCoresSpan = document.querySelector('.btn-header-palette span');
    results.coresTextColor = btnCoresSpan ? window.getComputedStyle(btnCoresSpan).color : null;
    
    // 4. Teste mudarAba('vestibulares')
    mudarAba('vestibulares');
    const vestTabs = document.getElementById('vestibulares-tabs');
    const vestContent = document.getElementById('vestibular-conteudo-detalhado');
    results.vestTabsCount = vestTabs ? vestTabs.children.length : 0;
    results.vestContentLength = vestContent ? vestContent.innerHTML.length : 0;
    
    // 5. Botão Gerar Cronograma IA
    const btnModalConfirm = document.getElementById('btn-confirmar-gerar-cronograma-ia');
    if (btnModalConfirm) {
        const comp = window.getComputedStyle(btnModalConfirm);
        results.btnModal = {
            border: comp.border,
            borderRadius: comp.borderRadius,
            color: comp.color,
            bg: comp.backgroundImage
        };
    }
    
    // 6. Teste de troca de tema (Roxo)
    aplicarTema('dark', 'roxo-ametista', false);
    const btnHero = document.querySelector('.btn-hero-primary');
    const compHero = btnHero ? window.getComputedStyle(btnHero) : null;
    results.heroBtnAfterRoxo = {
        bg: compHero ? compHero.backgroundImage : null,
        color: compHero ? compHero.color : null
    };

    const out = document.createElement('div');
    out.id = 'ALL_VISUALS_OUTPUT';
    out.textContent = JSON.stringify(results);
    document.body.appendChild(out);
});
"@

$htmlWithTest = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$htmlWithTest = $htmlWithTest.Replace("</body>", "<script>`n" + $testScript + "`n</script></body>")
[System.IO.File]::WriteAllText("$PWD\scratch\test_all_visuals.html", $htmlWithTest, [System.Text.Encoding]::UTF8)

$testUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/scratch/test_all_visuals.html"
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"$testUrl`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\test_all_visuals_dom.html"
$proc.WaitForExit(10000)
Start-Sleep -Milliseconds 800

$dom = [System.IO.File]::ReadAllText("$PWD\scratch\test_all_visuals_dom.html", [System.Text.Encoding]::UTF8)
if ($dom -match 'id="ALL_VISUALS_OUTPUT">([^<]+)<') {
    Write-Host "VERIFICAÇÃO COMPLETA: $($matches[1])"
} else {
    Write-Host "ALL_VISUALS_OUTPUT não encontrado!"
}
