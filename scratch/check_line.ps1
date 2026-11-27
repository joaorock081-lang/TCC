$lines = Get-Content 'js/app.js'
$start = [Math]::Max(0, 5550)
$end = [Math]::Min($lines.Length - 1, 5630)
for ($i = $start; $i -le $end; $i++) {
    Write-Host "$($i + 1): $($lines[$i])"
}
