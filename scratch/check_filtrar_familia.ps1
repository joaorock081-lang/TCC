$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("filtrarFamiliaCores")
Write-Host $appJs.Substring($idx, [Math]::Min(400, $appJs.Length - $idx))
