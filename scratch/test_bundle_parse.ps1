$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# Extract all <script> blocks inside index.html and test them with new Function
$html = Get-Content 'index.html' -Raw -Encoding UTF8

# Extract inline script
$scriptStart = $html.IndexOf('<script>')
$scriptEnd = $html.LastIndexOf('</script>')
$jsCode = $html.Substring($scriptStart + 8, $scriptEnd - ($scriptStart + 8))

$jsonString = ConvertTo-Json $jsCode

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="status">PENDING</div>
<script>
const code = $jsonString;
try {
    const fn = new Function(code);
    document.getElementById('status').innerText = 'INDEX_HTML_JS_PARSED_SUCCESSFULLY';
} catch (e) {
    document.getElementById('status').innerText = 'ERROR: ' + e.message;
}
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_index_bundle.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_index_bundle.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_bundle_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<div id="status">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "RESULT: $($m.Groups[1].Value)"
}
