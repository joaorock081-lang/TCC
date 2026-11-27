$doc = New-Object -ComObject "HTMLFile"
$html = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

# Substitui o listener puro pelo padrão resiliente readyState
$fixedHtml = $html -replace "document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{", "function iniciarEstudaMaisApp() {"
$fixedHtml = $fixedHtml -replace "\}\);\s*\/\*\s*===\s*ESTUDAMAIS DATABASE", "} if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', iniciarEstudaMaisApp); } else { iniciarEstudaMaisApp(); } /* === ESTUDAMAIS DATABASE"

$doc.IHTMLDocument2_write($fixedHtml)
$doc.close()

Start-Sleep -Milliseconds 800

$frase = $doc.getElementById("frase-motivacional")
$vestTabs = $doc.getElementById("vestibulares-tabs")
$vestDetalhe = $doc.getElementById("vestibular-conteudo-detalhado")
$statTopicos = $doc.getElementById("stat-topicos-concluidos")

Write-Host "`n=== RESULTADO COM O FIX DE READYSTATE ==="
if ($frase -and $frase.innerText) { Write-Host "frase-motivacional: $($frase.innerText.Trim())" -ForegroundColor Green } else { Write-Host "frase-motivacional: VAZIO!" -ForegroundColor Red }
if ($vestTabs) { Write-Host "vestibulares-tabs children count: $($vestTabs.children.length)" -ForegroundColor Green } else { Write-Host "vestibulares-tabs: VAZIO!" -ForegroundColor Red }
if ($vestDetalhe) { Write-Host "vestibular-conteudo-detalhado length: $($vestDetalhe.innerText.Length)" -ForegroundColor Green } else { Write-Host "vestibular-conteudo-detalhado: VAZIO!" -ForegroundColor Red }
if ($statTopicos) { Write-Host "stat-topicos-concluidos: $($statTopicos.innerText)" -ForegroundColor Green } else { Write-Host "stat-topicos-concluidos: VAZIO!" -ForegroundColor Red }
