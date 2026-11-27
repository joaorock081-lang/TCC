$dom = [System.IO.File]::ReadAllText("$PWD\scratch\chrome_dom.html", [System.Text.Encoding]::UTF8)

$checks = @(
    'tab-chat-ia',
    'chat-ia-mensagens-container',
    'tab-cronograma',
    'cronograma-semanal-grid',
    'modal-gerar-cronograma-ia',
    'modal-tarefa-cronograma',
    'data-tab="chat-ia"',
    'data-tab="cronograma"',
    'cronograma-badge-vestibular',
    'cronograma-badge-curso'
)

foreach ($c in $checks) {
    if ($dom.Contains($c)) {
        Write-Host "✅ $c renderizado com sucesso no Chrome DOM!" -ForegroundColor Green
    } else {
        Write-Host "❌ $c AUSENTE no Chrome DOM!" -ForegroundColor Red
    }
}
