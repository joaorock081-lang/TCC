$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8

# JSON encode the string so it's a valid JS string literal
$jsonString = ConvertTo-Json $appJs

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<pre id="output">PENDING</pre>
<script>
const code = $jsonString;
try {
    const fn = new Function(code);
    document.getElementById('output').innerText = 'PARSE_SUCCESS';
} catch (e) {
    document.getElementById('output').innerText = 'SYNTAX_ERROR: ' + e.message + '\n' + e.stack;
}
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/eval_test.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/eval_test.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\eval_test_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<pre id="output">([\s\S]*?)</pre>')
if ($m.Success) {
    Write-Host "RESULT: $($m.Groups[1].Value)"
}
