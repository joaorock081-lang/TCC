$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$idx = $appJs.IndexOf("const AppState = {")
Write-Host $appJs.Substring($idx, [Math]::Min(1500, $appJs.Length - $idx))
