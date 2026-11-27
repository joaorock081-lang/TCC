$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf('[data-accent="verde-oliva"]')
Write-Host $css.Substring($idx, [Math]::Min(800, $css.Length - $idx))
