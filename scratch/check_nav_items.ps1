$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('<ul class="nav-menu"')
Write-Host $html.Substring($idx + 1200, [Math]::Min(1200, $html.Length - ($idx + 1200)))
