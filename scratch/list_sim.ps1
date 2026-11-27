$lines = Get-Content 'js\data.js'
$sims = $lines | Where-Object { $_ -match 'id:\s*"simulado-' }
foreach ($s in $sims) {
    Write-Host $s.Trim()
}
