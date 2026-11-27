$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# In index.html, inject a small test script before </body>
$raw = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$testScript = @"
<script>
window.addEventListener('DOMContentLoaded', () => {
    const res = {
        appStateExists: !!window.AppState,
        currentTab: window.AppState ? window.AppState.currentTab : null,
        currentUser: window.AppState ? (window.AppState.currentUser ? window.AppState.currentUser.nome : 'visitante') : null,
        cronogramaSemana: window.AppState && window.AppState.cronograma ? window.AppState.cronograma.semanaAtual : null
    };

    // Click Vestibulares tab
    const tabVest = document.querySelector('.nav-tab[data-tab="vestibulares"]');
    if (tabVest) {
        tabVest.click();
        res.tabAfterClick = window.AppState.currentTab;
    }

    // Advance week in schedule
    if (typeof window.mudarSemanaCronograma === 'function') {
        window.mudarSemanaCronograma(1);
        res.semanaAposMudar = window.AppState.cronograma.semanaAtual;
    }

    const d = document.createElement('div');
    d.id = 'TEST_FINAL_OK';
    d.textContent = JSON.stringify(res);
    document.body.appendChild(d);
});
</script>
"@

$htmlWithTest = $raw.Replace('</body>', "$testScript`n</body>")
[System.IO.File]::WriteAllText('scratch/final_edge_test.html', $htmlWithTest, [System.Text.Encoding]::UTF8)

$path = (Resolve-Path 'scratch/final_edge_test.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\final_edge_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=4000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText($domOut, [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_FINAL_OK">([^<]+)<') {
    Write-Host "TEST RESULT: $($matches[1])"
} else {
    Write-Host "DOM length: $($dom.Length)"
    $dom | Select-String "TEST_FINAL" -Context 0, 2
}
