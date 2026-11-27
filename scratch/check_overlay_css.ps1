$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = 0
while (($idx = $css.IndexOf(".modal-overlay", $idx)) -ge 0) {
    Write-Host "At $idx :"
    $start = [Math]::Max(0, $idx - 50)
    $len = [Math]::Min(350, $css.Length - $start)
    Write-Host $css.Substring($start, $len)
    $idx += 15
}
