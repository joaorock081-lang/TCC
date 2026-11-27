$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("modal-gerar-cronograma-ia")
Write-Host "Index in css: $idx"
if ($idx -ge 0) {
    Write-Host $css.Substring($idx, [Math]::Min(400, $css.Length - $idx))
}
