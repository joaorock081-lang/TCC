# Script para adicionar novos simulados e banco de temas a js/data.js
$ErrorActionPreference = "Stop"

$dataPath = "$PWD\js\data.js"
$content = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)

# Cria o arquivo de expansao com os novos simulados e o banco de questoes tematicas
$expansionFile = "$PWD\scratch\expansion_data.js"
if (-not (Test-Path $expansionFile)) {
    Write-Host "Criando arquivo de expansão..."
}

