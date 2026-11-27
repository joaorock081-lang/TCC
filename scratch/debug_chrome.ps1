$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$testUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/scratch/test_week_chat_run.html"
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--enable-logging", "--v=1", "--dump-dom", "`"$testUrl`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\out_test.log" -RedirectStandardError "$PWD\scratch\err_test.log"
$proc.WaitForExit(10000)
Start-Sleep -Milliseconds 800

Get-Content "$PWD\scratch\err_test.log" | Select-String "CONSOLE|Uncaught|Error" | ForEach-Object { Write-Host $_ }
