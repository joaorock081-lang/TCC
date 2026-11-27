$dom = [System.IO.File]::ReadAllText("$PWD\scratch\chrome_dom.html", [System.Text.Encoding]::UTF8)
$checks = @(
    'pomodoro-modes-nav',
    'btn-mode-custom',
    'custom-timer-hours',
    'custom-timer-minutes',
    'custom-timer-seconds',
    'Vestibulares Abordados (19)'
)

foreach ($c in $checks) {
    if ($dom.Contains($c)) {
        Write-Host "OK: $c" -ForegroundColor Green
    } else {
        Write-Host "FAIL: $c" -ForegroundColor Red
    }
}
