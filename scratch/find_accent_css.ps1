$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("[data-accent=")
if ($idx -ge 0) {
    Write-Host $css.Substring($idx, [Math]::Min(1500, $css.Length - $idx))
} else {
    Write-Host "data-accent not found in css"
}
