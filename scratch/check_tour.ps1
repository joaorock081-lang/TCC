$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("TourSite")
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host $appJs.Substring([Math]::Max(0, $idx - 50), 300)
}
