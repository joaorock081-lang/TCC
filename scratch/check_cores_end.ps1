$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("verde-oliva")
Write-Host $appJs.Substring($idx, [Math]::Min(500, $appJs.Length - $idx))
