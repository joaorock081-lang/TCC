$text = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Procura alternativas": [ NÃO precedido por aspas
$matches = [regex]::Matches($text, '(?<!")alternativas":\s*\[')
Write-Host "Total de alternativas sem aspas de abertura: $($matches.Count)"

# Procura ""alternativas": [
$matches2 = [regex]::Matches($text, '""alternativas":\s*\[')
Write-Host "Total de alternativas com aspas duplas dobradas: $($matches2.Count)"
