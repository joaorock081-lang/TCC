$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf('[data-theme="dark"]')
Write-Host $css.Substring($idx, [Math]::Min(1100, $css.Length - $idx))
