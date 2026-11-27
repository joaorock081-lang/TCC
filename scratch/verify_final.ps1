$html = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

# Vamos inspecionar se a tag <div id="frase-motivacional"> existe
Write-Host "Verificando componentes chave em index.html..."
$elements = @(
    'id="frase-motivacional"',
    'id="vestibulares-tabs"',
    'id="vestibular-conteudo-detalhado"',
    'id="stat-topicos-concluidos"',
    'id="stat-progresso-total"',
    'const VESTIBULARES_DATA',
    'const FRASES_MOTIVACIONAIS',
    'const SIMULADOS_DATA',
    'const TEMAS_DISCIPLINAS_DATA'
)

foreach ($el in $elements) {
    if ($html.Contains($el)) {
        Write-Host "✅ $el presente" -ForegroundColor Green
    } else {
        Write-Host "❌ $el AUSENTE" -ForegroundColor Red
    }
}

# Verifica se sobrou algum alternativas": [
if ($html.Contains('alternativas": [')) {
    Write-Host "❌ AVISO: Ainda existe alternativas"": [" -ForegroundColor Red
} else {
    Write-Host "✅ Zero erros de alternativas"": [" -ForegroundColor Green
}
