$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$matches = [regex]::Matches($html, 'class="[^"]*modal[^"]*active[^"]*"')
Write-Host "Found $($matches.Count) elements with modal and active in HTML:"
foreach ($m in $matches) {
    Write-Host $m.Value
}
