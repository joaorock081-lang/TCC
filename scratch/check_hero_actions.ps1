$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('<div class="hero-actions">')
Write-Host $html.Substring($idx, [Math]::Min(1000, $html.Length - $idx))
