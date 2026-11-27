$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("modal-gerar-cronograma-ia")
Write-Host "Index of modal-gerar-cronograma-ia: $idx"
if ($idx -ge 0) {
    Write-Host $html.Substring($idx, [Math]::Min(300, $html.Length - $idx))
}
