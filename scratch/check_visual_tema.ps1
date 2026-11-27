$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("window.atualizarSelecaoVisualTema")
Write-Host $appJs.Substring($idx, [Math]::Min(1000, $appJs.Length - $idx))
