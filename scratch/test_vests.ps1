$index = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

$tests = @(
    "fsa: {",
    "Fundação Santo André",
    "puc: {",
    "Pontifícia Universidade Católica",
    "mackenzie: {",
    "Universidade Presbiteriana Mackenzie",
    "fgv: {",
    "Fundação Getulio Vargas",
    "uscs: {",
    "Universidade Municipal de São Caetano do Sul",
    "q-fsa-1",
    "q-puc-1",
    "q-mack-1",
    "q-fgv-1"
)

foreach ($t in $tests) {
    Write-Host "$t -> " $index.Contains($t)
}
