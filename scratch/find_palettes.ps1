$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("renderizarPaletasCores")
if ($idx -ge 0) {
    Write-Host $appJs.Substring([Math]::Max(0, $idx - 50), 1200)
} else {
    Write-Host "renderizarPaletasCores not found"
}
