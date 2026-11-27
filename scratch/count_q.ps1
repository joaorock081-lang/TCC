$lines = Get-Content 'js\data.js'
$qCount = ($lines | Where-Object { $_ -match '^\s*id:\s*"q-' }).Count
Write-Host "Total questions with id 'q-': $qCount"
