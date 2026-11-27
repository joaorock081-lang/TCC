$exp = [System.IO.File]::ReadAllText("$PWD\scratch\expansion_code.js", [System.Text.Encoding]::UTF8)
$orig = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Verifica se ja nao foi inserido
if ($orig.IndexOf("simulado-fsa-integrado") -eq -1) {
    [System.IO.File]::AppendAllText("$PWD\js\data.js", "`r`n`r`n" + $exp, [System.Text.Encoding]::UTF8)
    Write-Host "Novos simulados e temas anexados a js/data.js com sucesso!"
} else {
    Write-Host "Simulados já estavam presentes em js/data.js."
}
$len = (Get-Item "$PWD\js\data.js").Length
Write-Host "Tamanho final de js/data.js: $len bytes"
