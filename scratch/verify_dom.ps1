$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$url = 'file:///' + ((Get-Location).Path.Replace('\', '/')) + '/index.html'
$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless", "--disable-gpu", "--dump-dom", $url -PassThru -NoNewWindow -RedirectStandardOutput "scratch/dom_out.txt"
$proc.WaitForExit(10000)
$size = (Get-Item "scratch/dom_out.txt").Length
Write-Host "DOM dump length: $size bytes"
