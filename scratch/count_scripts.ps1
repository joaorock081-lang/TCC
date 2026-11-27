$html = Get-Content 'index.html' -Raw -Encoding UTF8
$matches = [regex]::Matches($html, '<script[\s>]')
Write-Host "Found $($matches.Count) script tags in index.html"
for ($i = 0; $i -lt $matches.Count; $i++) {
    $idx = $matches[$i].Index
    Write-Host "Tag $i at index $idx : $($html.Substring($idx, [Math]::Min(100, $html.Length - $idx)))"
}
