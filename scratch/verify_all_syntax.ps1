$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="output">STARTING</div>
<script>
window.appErrors = [];
window.onerror = function(msg, url, line, col, err) {
    var desc = 'ERROR: ' + msg + ' at line ' + line + ':' + col + (err && err.stack ? '\n' + err.stack : '');
    window.appErrors.push(desc);
    document.getElementById('output').innerText = desc;
};
try {
$appJs
    if (window.appErrors.length === 0) {
        document.getElementById('output').innerText = 'SUCCESS_NO_ERRORS_APPSTATE_KEYS_' + Object.keys(window.AppState || {}).length;
    }
} catch (e) {
    document.getElementById('output').innerText = 'CATCH_ERROR: ' + e.message + ' at ' + (e.lineNumber || 'unknown') + '\n' + e.stack;
}
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/inline_verify.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/inline_verify.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\inline_verify_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=3000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)
Start-Sleep -Milliseconds 500

$dom = Get-Content $domOut -Raw -Encoding UTF8
$dom | Select-String "output" -Context 0, 5
