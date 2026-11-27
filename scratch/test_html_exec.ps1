$doc = New-Object -ComObject "HTMLFile"
$html = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

$doc.IHTMLDocument2_write($html)
$doc.close()

Start-Sleep -Milliseconds 800

$frase = $doc.getElementById("frase-motivacional")
$vestTabs = $doc.getElementById("vestibulares-tabs")
$vestDetalhe = $doc.getElementById("vestibular-conteudo-detalhado")
$statTopicos = $doc.getElementById("stat-topicos-concluidos")

Write-Host "`n=== RESULTADO DO TESTE REAL DE EXECUÇÃO ==="
if ($frase) { Write-Host "frase-motivacional innerText: $($frase.innerText.Trim())" } else { Write-Host "frase-motivacional: NULO" }
if ($vestTabs) { Write-Host "vestibulares-tabs children count: $($vestTabs.children.length)" } else { Write-Host "vestibulares-tabs: NULO" }
if ($vestDetalhe) { Write-Host "vestibular-conteudo-detalhado innerText length: $($vestDetalhe.innerText.Length)" } else { Write-Host "vestibular-conteudo-detalhado: NULO" }
if ($statTopicos) { Write-Host "stat-topicos-concluidos text: $($statTopicos.innerText)" } else { Write-Host "stat-topicos-concluidos: NULO" }
