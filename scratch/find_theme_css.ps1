$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("[data-theme=")
if ($idx -ge 0) {
    Write-Host $css.Substring($idx, [Math]::Min(1200, $css.Length - $idx))
} else {
    Write-Host "data-theme not found in css"
}
