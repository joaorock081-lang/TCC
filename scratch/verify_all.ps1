$html = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

$checks = @(
  "simulado-custom-builder-card",
  "simulado-ia-proximo-box",
  "alternarModoVisualizacaoSimulados",
  "gerarSimuladoCustomizadoPorTema",
  "criarProximoSimuladoPorIA",
  "simulado-fsa-integrado",
  "simulado-puc-geral",
  "simulado-mackenzie-tradicao",
  "simulado-fgv-analitico",
  "simulado-uscs-vunesp",
  "simulado-unesp-1fase",
  "simulado-militares-ita-ime",
  "TEMAS_DISCIPLINAS_DATA"
)

$allOk = $true
foreach ($item in $checks) {
    if ($html.Contains($item)) {
        Write-Host "✅ Encontrado: $item" -ForegroundColor Green
    } else {
        Write-Host "❌ Faltando: $item" -ForegroundColor Red
        $allOk = $false
    }
}

if ($allOk) {
    Write-Host "`n🎉 Todos os recursos novos estão presentes e integrados no index.html!" -ForegroundColor Cyan
}
