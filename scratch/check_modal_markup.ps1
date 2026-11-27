$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("modal-gerar-cronograma-ia")
Write-Host $html.Substring([Math]::Max(0, $idx - 50), 1200)
