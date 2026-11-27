$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf('MODO ESCURO: FUNDOS SÓLIDOS')
Write-Host $css.Substring($idx + 600, [Math]::Min(800, $css.Length - ($idx + 600)))
