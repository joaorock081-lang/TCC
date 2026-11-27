$jsAppPath = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($jsAppPath, [System.Text.Encoding]::UTF8)
$startMarker = "/* ========================================================`r`n   ESTUDAMAIS - CHAT IA COM GOOGLE GEMINI & GERADOR DE CRONOGRAMAS"

$idx = $content.IndexOf($startMarker)
if ($idx -lt 0) {
    # Tenta com newline unix
    $startMarker = "/* ========================================================`n   ESTUDAMAIS - CHAT IA COM GOOGLE GEMINI & GERADOR DE CRONOGRAMAS"
    $idx = $content.IndexOf($startMarker)
}

if ($idx -ge 0) {
    $baseContent = $content.Substring(0, $idx)
    $newCode = [System.IO.File]::ReadAllText("$PWD\scratch\chat_cronograma_code_v2.js", [System.Text.Encoding]::UTF8)
    $finalContent = $baseContent + $newCode
    [System.IO.File]::WriteAllText($jsAppPath, $finalContent, [System.Text.Encoding]::UTF8)
    Write-Host "js/app.js atualizado com a v2 do Chat IA e Cronograma!" -ForegroundColor Green
} else {
    Write-Host "Erro: startMarker nao encontrado em js/app.js" -ForegroundColor Red
}
