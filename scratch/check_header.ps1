$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('<header')
Write-Host $html.Substring($idx, [Math]::Min(2000, $html.Length - $idx))
