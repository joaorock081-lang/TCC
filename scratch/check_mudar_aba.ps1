$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("function mudarAba")
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host $appJs.Substring($idx, [Math]::Min(1200, $appJs.Length - $idx))
}
