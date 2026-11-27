Add-Type -AssemblyName Microsoft.JScript

$lines = [System.IO.File]::ReadAllLines("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Vamos encontrar qual linha ou bloco tem string não fechada
# Uma string em JS pode ser delimitada por " ou '
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    # Conta as aspas simples e duplas não escapadas
    $dQuotes = ([regex]::Matches($line, '(?<!\\)"')).Count
    if ($dQuotes % 2 -ne 0) {
        Write-Host "Linha com aspas duplas ÍMPARES ($($i + 1)): $line" -ForegroundColor Red
    }
}
