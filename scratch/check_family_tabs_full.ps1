$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("palette-family-tabs")
Write-Host $html.Substring($idx + 1000, [Math]::Min(500, $html.Length - ($idx + 1000)))
