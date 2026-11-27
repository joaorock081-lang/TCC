$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$target = "  simulado: {`r`n    ativo: null,`r`n    questaoIndex: 0,`r`n    respostas: {},`r`n    revisoes: {},`r`n    tempoRestante: 0,`r`n    timerId: null,`r`n    finalizado: false`r`n  }`r`n};"
$replacement = "  simulado: {`r`n    ativo: null,`r`n    questaoIndex: 0,`r`n    respostas: {},`r`n    revisoes: {},`r`n    tempoRestante: 0,`r`n    timerId: null,`r`n    finalizado: false`r`n  }`r`n};`r`n`r`nwindow.AppState = AppState;"

if ($content.Contains($target)) {
    $content = $content.Replace($target, $replacement)
    Write-Host "window.AppState exposto com sucesso!"
} else {
    # Try LF
    $target_lf = "  simulado: {\n    ativo: null,\n    questaoIndex: 0,\n    respostas: {},\n    revisoes: {},\n    tempoRestante: 0,\n    timerId: null,\n    finalizado: false\n  }\n};"
    $replacement_lf = "  simulado: {\n    ativo: null,\n    questaoIndex: 0,\n    respostas: {},\n    revisoes: {},\n    tempoRestante: 0,\n    timerId: null,\n    finalizado: false\n  }\n};\n\nwindow.AppState = AppState;"
    if ($content.Contains($target_lf)) {
        $content = $content.Replace($target_lf, $replacement_lf)
        Write-Host "window.AppState exposto (LF) com sucesso!"
    } else {
        Write-Host "Aviso: target não encontrado"
    }
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
