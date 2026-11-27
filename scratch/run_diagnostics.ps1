$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# Read index.html and inject a top-level error collector and DOM diagnostic
$indexContent = Get-Content 'index.html' -Raw -Encoding UTF8

$diagnostic = @"
<script>
window.__pageErrors = [];
window.addEventListener('error', (e) => {
    window.__pageErrors.push(e.message + ' at line ' + e.lineno);
});
window.addEventListener('DOMContentLoaded', () => {
    const diag = document.createElement('div');
    diag.id = 'DIAGNOSTIC_RESULT';
    if (window.__pageErrors.length > 0) {
        diag.innerText = 'PAGE_ERRORS: ' + window.__pageErrors.join(' | ');
    } else {
        diag.innerText = 'PAGE_SUCCESS_STATE_INIT_' + (window.AppState ? 'YES' : 'NO');
    }
    document.body.appendChild(diag);
});
</script>
"@

$testIndex = $indexContent.Replace('<head>', "<head>$diagnostic")
Set-Content -Path 'scratch/test_diagnostics.html' -Value $testIndex -Encoding UTF8

$path = (Resolve-Path 'scratch/test_diagnostics.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\diag_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=4000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<div id="DIAGNOSTIC_RESULT">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "RESULT: $($m.Groups[1].Value)"
}
