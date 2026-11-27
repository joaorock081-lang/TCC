$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="output">WAITING</div>
<script>
window.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'TEST_REPORT') {
        document.getElementById('output').innerText = 'REPORT:\n' + JSON.stringify(ev.data.data, null, 2);
    }
});
</script>
<iframe id="test-frame" src="../index.html" style="width:1000px;height:700px;"></iframe>
<script>
const frame = document.getElementById('test-frame');
frame.onload = function() {
    setTimeout(() => {
        try {
            const w = frame.contentWindow;
            const d = frame.contentDocument;
            const res = {
                appStateExists: !!w.AppState,
                currentTab: w.AppState ? w.AppState.currentTab : null,
                currentUser: w.AppState ? w.AppState.currentUser : null,
                navTabsCount: d.querySelectorAll('.nav-tab').length,
                vestTabsCount: d.querySelectorAll('.vest-tab-btn').length,
                simuladosCount: d.querySelectorAll('.simulado-card-item').length
            };
            
            // Try clicking Vestibulares tab
            const vestTab = d.querySelector('.nav-tab[data-tab="vestibulares"]');
            if (vestTab) {
                vestTab.click();
                res.tabAfterClick = w.AppState.currentTab;
            }

            // Try clicking theme toggle
            const themeBtn = d.querySelector('.btn-theme-toggle');
            if (themeBtn) {
                themeBtn.click();
                res.themeAfterClick = w.AppState.theme.mode;
            }

            // Try clicking cronograma button
            const cronoBtn = d.querySelector('[data-action="abrir-cronograma"]');
            if (cronoBtn) {
                cronoBtn.click();
                res.cronogramaModalOpen = !!d.querySelector('#modal-cronograma-ia.active');
            }

            document.getElementById('output').innerText = 'REPORT:\n' + JSON.stringify(res, null, 2);
        } catch (err) {
            document.getElementById('output').innerText = 'FRAME_ERROR: ' + err.message + '\n' + err.stack;
        }
    }, 1500);
};
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_runtime_click.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_runtime_click.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\runtime_click_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--disable-web-security", "--allow-file-access-from-files", "--virtual-time-budget=5000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(12000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<div id="output">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "$($m.Groups[1].Value)"
}
