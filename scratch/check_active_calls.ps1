$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = 0
while (($idx = $appJs.IndexOf("classList.add('active')", $idx)) -ge 0) {
    Write-Host "At $idx :"
    $start = [Math]::Max(0, $idx - 50)
    $len = [Math]::Min(180, $appJs.Length - $start)
    Write-Host $appJs.Substring($start, $len).Replace("`n", " ")
    $idx += 22
}
