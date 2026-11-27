$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$matches = [regex]::Matches($html, 'class="[^"]*nav-tab[^"]*"')
Write-Host "Found $($matches.Count) nav tabs in HTML:"
foreach ($m in $matches) {
    Write-Host $m.Value
}
$idx = $html.IndexOf('<nav class="site-nav">')
if ($idx -ge 0) {
    Write-Host $html.Substring($idx, [Math]::Min(1500, $html.Length - $idx))
}
