$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$path = (Resolve-Path 'scratch/syntax_test.html').Path.Replace('\', '/')
$res = & $edge --headless=new --no-sandbox --allow-file-access-from-files --virtual-time-budget=2000 --dump-dom "file:///$path" 2>&1
Write-Host "RESULT:"
$res
