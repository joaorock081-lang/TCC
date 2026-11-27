$lines = Get-Content "$PWD\js\app.js" | Select-Object -Skip 4980 -First 35
$lines | ForEach-Object { Write-Host $_ }
