$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf('</section>')
$count = 0
while ($idx -ge 0) {
    $count++
    $prev = $html.LastIndexOf('<section', $idx)
    if ($prev -ge 0) {
        $secTag = $html.Substring($prev, [Math]::Min(120, $html.Length - $prev))
        Write-Host "Section $count : $secTag"
    }
    $idx = $html.IndexOf('</section>', $idx + 10)
}
