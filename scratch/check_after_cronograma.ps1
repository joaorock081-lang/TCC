$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('</section>', $html.IndexOf('id="tab-cronograma"'))
Write-Host $html.Substring([Math]::Max(0, $idx - 100), 500)
