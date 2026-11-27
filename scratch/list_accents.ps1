$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$matches = [regex]::Matches($css, '\[data-accent="([^"]+)"\]')
Write-Host "Found $($matches.Count) accents in CSS:"
foreach ($m in $matches) {
    Write-Host $m.Groups[1].Value
}
