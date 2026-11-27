$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf(":root {")
Write-Host $css.Substring($idx, [Math]::Min(1000, $css.Length - $idx))
