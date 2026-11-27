$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$len = $appJs.Length
Write-Host "Length of app.js: $len"
Write-Host $appJs.Substring([Math]::Max(0, $len - 600))
