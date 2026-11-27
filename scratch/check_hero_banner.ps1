$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('<section id="tab-inicio"')
Write-Host $html.Substring($idx, [Math]::Min(1200, $html.Length - $idx))
