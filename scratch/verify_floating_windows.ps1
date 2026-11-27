# verify_floating_windows.ps1
$indexHtml = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)

Write-Host "--- TESTE DE VERIFICAÇÃO DAS 4 JANELAS FLUTUANTES ---"

# 1. Botões no cabeçalho
$b1 = $indexHtml.Contains("onclick=""alternarJanelaFlutuante('lousa')""")
$b2 = $indexHtml.Contains("onclick=""alternarJanelaFlutuante('notas')""")
$b3 = $indexHtml.Contains("onclick=""alternarJanelaFlutuante('ia')""")
$b4 = $indexHtml.Contains("onclick=""alternarJanelaFlutuante('foco')""")

Write-Host "1. Botões presentes no cabeçalho:"
Write-Host "   - Lousa: $b1"
Write-Host "   - Notas: $b2"
Write-Host "   - Tutor IA: $b3"
Write-Host "   - Foco: $b4"

# 2. Elementos aside das janelas
$e1 = $indexHtml.Contains('id="lousa-rascunho"')
$e2 = $indexHtml.Contains('id="janela-flutuante-notas"')
$e3 = $indexHtml.Contains('id="janela-flutuante-ia"')
$e4 = $indexHtml.Contains('id="janela-flutuante-foco"')

Write-Host "2. Elementos HTML no DOM:"
Write-Host "   - lousa-rascunho: $e1"
Write-Host "   - janela-flutuante-notas: $e2"
Write-Host "   - janela-flutuante-ia: $e3"
Write-Host "   - janela-flutuante-foco: $e4"

# 3. Regra CSS definitiva
$c1 = $indexHtml.Contains(".janela-flutuante-widget:not(.visivel)") -and $indexHtml.Contains(".janela-flutuante-widget.visivel")
Write-Host "3. Regras CSS de visibilidade definitiva (.visivel / :not(.visivel)): $c1"

# 4. JS limpo sem checagem de display falsa
$j1 = $indexHtml.Contains("const estaAberta = el.classList.contains('visivel');")
Write-Host "4. Lógica limpa e direta em alternarJanelaFlutuante: $j1"

if ($b1 -and $b2 -and $b3 -and $b4 -and $e1 -and $e2 -and $e3 -and $e4 -and $c1 -and $j1) {
    Write-Host "`n>>> SUCESSO: TODAS AS 4 JANELAS ESTÃO PERFEITAMENTE CONFIGURADAS! <<<" -ForegroundColor Green
} else {
    Write-Host "`n>>> FALHA NA VERIFICAÇÃO! <<<" -ForegroundColor Red
    exit 1
}
