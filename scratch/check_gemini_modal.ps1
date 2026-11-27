$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("modal-config-gemini")
Write-Host $html.Substring([Math]::Max(0, $idx - 50), 1000)
