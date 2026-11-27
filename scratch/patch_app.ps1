$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Update mudarAba
$target1 = "  if (tabId === 'vestibulares') {`r`n    renderizarVestibularAtivo();`r`n  } else if (tabId === 'perfil') {"
$replacement1 = "  if (tabId === 'vestibulares') {`r`n    try {`r`n      const tabsContainer = document.getElementById('vestibulares-tabs');`r`n      if (!tabsContainer || tabsContainer.children.length === 0) {`r`n        renderizarVestibularesTabs();`r`n      }`r`n      renderizarVestibularAtivo();`r`n    } catch (e) {`r`n      console.error('Erro ao renderizar aba vestibulares:', e);`r`n    }`r`n  } else if (tabId === 'perfil') {"

if ($content.Contains($target1)) {
    $content = $content.Replace($target1, $replacement1)
    Write-Host "mudarAba atualizado com sucesso!"
} else {
    # Try with LF only
    $target1_lf = "  if (tabId === 'vestibulares') {`n    renderizarVestibularAtivo();`n  } else if (tabId === 'perfil') {"
    $replacement1_lf = "  if (tabId === 'vestibulares') {`n    try {`n      const tabsContainer = document.getElementById('vestibulares-tabs');`n      if (!tabsContainer || tabsContainer.children.length === 0) {`n        renderizarVestibularesTabs();`n      }`n      renderizarVestibularAtivo();`n    } catch (e) {`n      console.error('Erro ao renderizar aba vestibulares:', e);`n    }`n  } else if (tabId === 'perfil') {"
    if ($content.Contains($target1_lf)) {
        $content = $content.Replace($target1_lf, $replacement1_lf)
        Write-Host "mudarAba atualizado (LF) com sucesso!"
    } else {
        Write-Host "Aviso: target1 não encontrado em js/app.js"
    }
}

# 2. Defensive renderizarVestibularAtivo
$target2 = '<span class="detalhe-val">${vest.detalhesGerais.formato || vest.detalhesGerais.primeiraFase}</span>'
$replacement2 = '<span class="detalhe-val">${(vest.detalhesGerais && (vest.detalhesGerais.formato || vest.detalhesGerais.primeiraFase)) || ''Ver edital oficial''}</span>'
if ($content.Contains($target2)) {
    $content = $content.Replace($target2, $replacement2)
    Write-Host "detalhesGerais.formato atualizado com sucesso!"
}

$target3 = '<span class="detalhe-val">${vest.detalhesGerais.dicaChave}</span>'
$replacement3 = '<span class="detalhe-val">${(vest.detalhesGerais && vest.detalhesGerais.dicaChave) || ''Consulte o edital e resolva provas anteriores.''}</span>'
if ($content.Contains($target3)) {
    $content = $content.Replace($target3, $replacement3)
    Write-Host "detalhesGerais.dicaChave atualizado com sucesso!"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
