$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = 0
while (($idx = $appJs.IndexOf("AppState.chatIA", $idx)) -ge 0) {
    Write-Host "At $idx :"
    $start = [Math]::Max(0, $idx - 30)
    $len = [Math]::Min(140, $appJs.Length - $start)
    Write-Host $appJs.Substring($start, $len).Replace("`n", " ")
    $idx += 15
}
