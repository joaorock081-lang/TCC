$jsAppPath = "$PWD\js\app.js"
$codeToAdd = [System.IO.File]::ReadAllText("$PWD\scratch\chat_cronograma_code.js", [System.Text.Encoding]::UTF8)

# 1. Adiciona a chamada de inicializarChatIACronograma no DOMContentLoaded
$jsContent = [System.IO.File]::ReadAllText($jsAppPath, [System.Text.Encoding]::UTF8)

$targetInit = "try { atualizarEstatisticasDashboard(); } catch (e) { console.error('Erro ao atualizar estatísticas:', e); }"
$replaceInit = "$targetInit`r`n  try { inicializarChatIACronograma(); } catch (e) { console.error('Erro ao inicializar chat IA e cronograma:', e); }"

if ($jsContent.Contains($targetInit)) {
    $jsContent = $jsContent.Replace($targetInit, $replaceInit)
} else {
    Write-Host "Aviso: targetInit não encontrado em js/app.js"
}

# 2. Concatena o novo código no final de js/app.js
$jsContent = $jsContent + "`r`n`r`n" + $codeToAdd

[System.IO.File]::WriteAllText($jsAppPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "js/app.js atualizado com sucesso. Linhas: $((Get-Content $jsAppPath).Count)"
