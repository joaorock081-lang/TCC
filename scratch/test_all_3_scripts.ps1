$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$html = Get-Content 'index.html' -Raw -Encoding UTF8

$scriptRegex = [regex]'<script>([\s\S]*?)</script>'
$allMatches = $scriptRegex.Matches($html)

Write-Host "Found $($allMatches.Count) matches"

$s0 = ConvertTo-Json $allMatches[0].Groups[1].Value
$s1 = ConvertTo-Json $allMatches[1].Groups[1].Value
$s2 = ConvertTo-Json $allMatches[2].Groups[1].Value

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="res0"></div>
<div id="res1"></div>
<div id="res2"></div>
<script>
try { new Function($s0); document.getElementById('res0').innerText = 'SCRIPT 0 OK'; } catch(e) { document.getElementById('res0').innerText = 'SCRIPT 0 ERR: ' + e.message; }
try { new Function($s1); document.getElementById('res1').innerText = 'SCRIPT 1 OK'; } catch(e) { document.getElementById('res1').innerText = 'SCRIPT 1 ERR: ' + e.message; }
try { new Function($s2); document.getElementById('res2').innerText = 'SCRIPT 2 OK'; } catch(e) { document.getElementById('res2').innerText = 'SCRIPT 2 ERR: ' + e.message; }
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_3_scripts.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_3_scripts.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_3_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$dom | Select-String "res\d" -Context 0, 1
