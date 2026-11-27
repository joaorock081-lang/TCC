$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("abrirTourSlides")
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host $appJs.Substring($idx, [Math]::Min(500, $appJs.Length - $idx))
}
