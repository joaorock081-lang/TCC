$code = [System.IO.File]::ReadAllText('scratch/new_features_code.js', [System.Text.Encoding]::UTF8)
[System.IO.File]::AppendAllText('js/app.js', "`r`n" + $code, [System.Text.Encoding]::UTF8)
Write-Host "Appended new features code to js/app.js!"
