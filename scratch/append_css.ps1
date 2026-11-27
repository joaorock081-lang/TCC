$newCss = [System.IO.File]::ReadAllText("$PWD\scratch\new_styles.css", [System.Text.Encoding]::UTF8)
$cssPath = "$PWD\css\style.css"
[System.IO.File]::AppendAllText($cssPath, "`r`n`r`n" + $newCss, [System.Text.Encoding]::UTF8)
Write-Host "CSS atualizado com sucesso. Linhas totais: $((Get-Content $cssPath).Count)"
