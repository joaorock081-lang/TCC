$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("mobile-bottom-nav")
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host $html.Substring($idx, [Math]::Min(800, $html.Length - $idx))
}
