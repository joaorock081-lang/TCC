$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8
$matches = [regex]::Matches($appJs, '\.classList\.(add|remove|toggle)\([^)]+\)')
Write-Host "Found $($matches.Count) classList modifications in app.js"
