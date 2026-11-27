$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Export window.formatarMarkdownChat
$targetFormat = "  return html;`r`n}"
$replacementFormat = "  return html;`r`n}`r`nwindow.formatarMarkdownChat = formatarMarkdownChat;"
if ($content.Contains($targetFormat)) {
    $content = $content.Replace($targetFormat, $replacementFormat)
    Write-Host "window.formatarMarkdownChat exportado!"
}

# 2. Add gerenciarBloqueioScrollModal to modal functions
$oldAbrirTarefa = "  modal.classList.add('active');`r`n};"
$newAbrirTarefa = "  modal.classList.add('active');`r`n  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();`r`n};"
if ($content.Contains($oldAbrirTarefa)) {
    $content = $content.Replace($oldAbrirTarefa, $newAbrirTarefa)
    Write-Host "abrirModalNovaTarefaCronograma atualizado com bloqueio de scroll!"
}

$oldFecharTarefa = "  if (modal) modal.classList.remove('active');`r`n};"
$newFecharTarefa = "  if (modal) modal.classList.remove('active');`r`n  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();`r`n};"
if ($content.Contains($oldFecharTarefa)) {
    $content = $content.Replace($oldFecharTarefa, $newFecharTarefa)
    Write-Host "fecharModalNovaTarefaCronograma atualizado com desbloqueio de scroll!"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
