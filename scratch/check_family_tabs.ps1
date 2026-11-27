$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("palette-family-tabs")
Write-Host $html.Substring([Math]::Max(0, $idx - 50), 1000)
