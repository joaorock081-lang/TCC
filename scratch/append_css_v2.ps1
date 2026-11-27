$newCss = [System.IO.File]::ReadAllText("$PWD\scratch\new_styles_v2.css", [System.Text.Encoding]::UTF8)
$cssPath = "$PWD\css\style.css"
[System.IO.File]::AppendAllText($cssPath, "`r`n`r`n" + $newCss, [System.Text.Encoding]::UTF8)
Write-Host "css/style.css atualizado com new_styles_v2.css! Total linhas: $((Get-Content $cssPath).Count)"
