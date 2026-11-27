$html = Get-Content 'index_template.html' -Raw -Encoding UTF8
$idx = $html.IndexOf("btn-header-tour")
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host $html.Substring([Math]::Max(0, $idx - 50), 300)
}
