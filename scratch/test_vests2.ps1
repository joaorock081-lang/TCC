$index = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

$tests = @(
    "FSA (Fundação Santo André - ABC)",
    "PUC (Pontifícia Universidade Católica)",
    "Mackenzie (Presbiteriana Mackenzie)",
    "FGV (Fundação Getulio Vargas)",
    "USCS (São Caetano do Sul - Medicina/Saúde)",
    "Guia dos <span>Vestibulares Públicos & Privados</span>"
)

foreach ($t in $tests) {
    Write-Host "$t -> " $index.Contains($t)
}
