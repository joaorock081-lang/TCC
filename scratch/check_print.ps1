$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
Write-Host $css.Substring(254300, 600)
