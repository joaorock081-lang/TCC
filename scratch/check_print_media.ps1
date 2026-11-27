$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("cronograma-hero-acoes")
Write-Host "Index: $idx"
Write-Host $css.Substring([Math]::Max(0, $idx - 200), 800)
