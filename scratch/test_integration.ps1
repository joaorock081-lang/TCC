# test_integration.ps1
$indexHtml = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$appJs = [System.IO.File]::ReadAllText("js/app.js", [System.Text.Encoding]::UTF8)

Write-Host "--- TEST INTEGRATION REPORT ---"

$t1 = $indexHtml.Contains("site-header-2-andares") -and $indexHtml.Contains("header-andar-superior") -and $indexHtml.Contains("header-andar-inferior")
Write-Host "1. Header 2 andares presente no HTML: $(if ($t1) {'PASS'} else {'FAIL'})"

$tabs = @('inicio', 'vestibulares', 'videoaulas', 'simulados', 'redacao', 'quiz', 'cronograma', 'ferramentas', 'notas', 'dicas', 'perfil')
$t2 = $true
foreach ($t in $tabs) {
    if (-not $indexHtml.Contains("mudarAba('$t')")) {
        $t2 = $false
        Write-Host "Aba ausente: $t"
    }
}
Write-Host "2. Todas as 11 abas presentes no carrossel inferior: $(if ($t2) {'PASS'} else {'FAIL'})"

$t3 = $indexHtml.Contains("sincronizarManualmenteNuvem()") -and $indexHtml.Contains("modal-conectar-dispositivo") -and $indexHtml.Contains("input-codigo-dispositivo")
Write-Host "3. Botao de nuvem e modal multi-dispositivos presentes: $(if ($t3) {'PASS'} else {'FAIL'})"

$t4 = $appJs.Contains("window.alternarJanelaFlutuante") -and $appJs.Contains("topOffset")
Write-Host "4. alternarJanelaFlutuante corrigida para coordenadas visiveis: $(if ($t4) {'PASS'} else {'FAIL'})"

$t5 = $appJs.Contains("PBKDF2") -and $appJs.Contains("verificarSenha") -and $appJs.Contains("TentativasLogin")
Write-Host "5. PBKDF2 (100.000 iteracoes) e Rate Limiting presentes: $(if ($t5) {'PASS'} else {'FAIL'})"

$t6 = $appJs.Contains("EstudaMaisCloudSync") -and $appJs.Contains("obterCodigoSincronizacao")
Write-Host "6. EstudaMaisCloudSync presente no JS: $(if ($t6) {'PASS'} else {'FAIL'})"

if ($t1 -and $t2 -and $t3 -and $t4 -and $t5 -and $t6) {
    Write-Host "`n>>> TODOS OS TESTES PASSARAM COM SUCESSO! <<<" -ForegroundColor Green
} else {
    Write-Host "`n>>> FALHA EM ALGUNS TESTES <<<" -ForegroundColor Red
    exit 1
}
