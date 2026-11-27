$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("window.abrirModalGerarCronogramaIA")
Write-Host $appJs.Substring($idx, [Math]::Min(1200, $appJs.Length - $idx))
