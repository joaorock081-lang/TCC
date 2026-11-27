$html = Get-Content 'index_template.html' -Raw -Encoding UTF8

$searchTerms = @(
    "Gerar Cronograma por IA",
    "Imprimir / PDF",
    "Nova Semana",
    "Nova Conversa",
    "Configurar Chave"
)

foreach ($term in $searchTerms) {
    Write-Host "=== Search: $term ==="
    $idx = 0
    while (($idx = $html.IndexOf($term, $idx)) -ge 0) {
        $start = [Math]::Max(0, $idx - 150)
        $len = [Math]::Min(350, $html.Length - $start)
        Write-Host "At $idx :"
        Write-Host $html.Substring($start, $len)
        $idx += $term.Length
    }
}
