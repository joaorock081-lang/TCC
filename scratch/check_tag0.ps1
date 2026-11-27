$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("localStorage.getItem('estudamais_theme_mode')")
Write-Host $html.Substring([Math]::Max(0, $idx - 50), 300)
