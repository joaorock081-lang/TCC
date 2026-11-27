$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("palette-mode-selector")
Write-Host $html.Substring($idx, [Math]::Min(1200, $html.Length - $idx))
