$index = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$rules = @(
    '\[data-theme="dark"\]\s+\.vest-header-card',
    '\[data-theme="dark"\]\s+\.vest-title',
    '\[data-theme="dark"\]\s+\.quiz-questao-card',
    '\[data-theme="dark"\]\s+\.quiz-enunciado',
    '\[data-theme="dark"\]\s+\.pomodoro-timer-circle',
    '\[data-theme="dark"\]\s+\.btn-som-chuva'
)

foreach ($r in $rules) {
    $found = [System.Text.RegularExpressions.Regex]::IsMatch($index, $r)
    Write-Host "$r -> $found"
}
