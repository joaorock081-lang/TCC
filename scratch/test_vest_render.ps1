$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$testScript = @"
window.addEventListener('load', () => {
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
            errors.push(k + ': ' + err.message + ' at ' + err.stack);
        }
    });
    const d = document.createElement('div');
    d.id = 'TEST_OUTPUT_DIV';
    d.textContent = JSON.stringify({ total: keys.length, errors: errors });
    document.body.appendChild(d);
});
"@

$htmlWithTest = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$htmlWithTest = $htmlWithTest.Replace("</body>", "<script>`n" + $testScript + "`n</script></body>")
[System.IO.File]::WriteAllText("$PWD\scratch\test_run.html", $htmlWithTest, [System.Text.Encoding]::UTF8)

$testUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/scratch/test_run.html"
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"$testUrl`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\test_run_dom.html"
$proc.WaitForExit(10000)
Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText("$PWD\scratch\test_run_dom.html", [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_OUTPUT_DIV">([^<]+)<') {
    Write-Host "RESULTADOS DO TESTE: $($matches[1])"
} else {
    Write-Host "TEST_OUTPUT_DIV não encontrado!"
}
