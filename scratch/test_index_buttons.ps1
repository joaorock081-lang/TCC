$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="test-log">TEST_RUNNING</div>
<iframe id="app-frame" src="../index.html" style="width:1280px;height:800px;"></iframe>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        const frame = document.getElementById('app-frame');
        const doc = frame.contentDocument || frame.contentWindow.document;
        const win = frame.contentWindow;
        
        const logs = [];
        logs.push('App loaded');
        logs.push('AppState keys: ' + Object.keys(win.AppState || {}).length);
        
        // Test tab switching: click Vestibulares
        const tabBtn = doc.querySelector('.nav-tab[data-tab="vestibulares"], button[data-tab="vestibulares"]');
        if (tabBtn) {
            tabBtn.click();
            logs.push('Clicked Vestibulares tab. Active tab: ' + (win.AppState ? win.AppState.currentTab : 'none'));
        } else {
            logs.push('Vestibulares tab button not found');
        }

        // Test theme switch
        const themeBtn = doc.querySelector('.btn-theme-toggle');
        if (themeBtn) {
            themeBtn.click();
            logs.push('Clicked theme toggle. Current mode: ' + (win.AppState ? win.AppState.theme.mode : 'none'));
        }

        // Test Cronograma modal or open
        const cronoBtn = doc.querySelector('[data-action="abrir-cronograma"], #btn-hero-cronograma, button[onclick*="cronograma"]');
        if (cronoBtn) {
            cronoBtn.click();
            logs.push('Clicked Cronograma button');
        }

        // Test Week switch function
        if (typeof win.mudarSemanaCronograma === 'function') {
            win.mudarSemanaCronograma(1);
            logs.push('mudarSemanaCronograma(1) executed. Semana atual: ' + win.AppState.cronograma.semanaAtual);
        }

        document.getElementById('test-log').innerText = logs.join('\n');
    }, 1500);
});
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_interactive.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_interactive.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_interactive_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=5000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(12000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<div id="test-log">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "BUTTON TEST RESULT:`n$($m.Groups[1].Value)"
}
