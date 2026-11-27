$target = "$PWD\scratch\page_screenshot.png"
if (Test-Path $target) { Remove-Item $target }
$url = "file:///" + ($PWD.Path -replace '\\', '/') + "/index.html"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
& $chrome --headless=new --disable-gpu --window-size=1280,900 "--screenshot=$target" $url
Start-Sleep -Seconds 1
Write-Host "Screenshot existe: $(Test-Path $target)"
