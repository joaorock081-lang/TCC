$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("const PALETAS_CORES")
Write-Host $appJs.Substring($idx + 1800, [Math]::Min(2500, $appJs.Length - ($idx + 1800)))
