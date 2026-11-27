$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = 0
while (($idx = $appJs.IndexOf("gerenciarBloqueioScrollModal", $idx)) -ge 0) {
    Write-Host "At $idx :"
    $start = [Math]::Max(0, $idx - 80)
    $len = [Math]::Min(250, $appJs.Length - $start)
    Write-Host $appJs.Substring($start, $len).Replace("`n", " ")
    $idx += 28
}
