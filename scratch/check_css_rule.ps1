$css = Get-Content 'css/style.css' -Raw -Encoding UTF8
$idx = $css.IndexOf("html.modal-aberto")
Write-Host $css.Substring($idx, [Math]::Min(1500, $css.Length - $idx))
