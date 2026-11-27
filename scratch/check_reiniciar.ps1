$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("window.reiniciarSemanaCronograma")
Write-Host $appJs.Substring($idx + 400, [Math]::Min(500, $appJs.Length - ($idx + 400)))
