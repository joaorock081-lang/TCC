$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("palette-mode-selector")
Write-Host $css.Substring($idx, [Math]::Min(600, $css.Length - $idx))
