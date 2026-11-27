$tplPath = "$PWD\index_template.html"
$tplContent = [System.IO.File]::ReadAllText($tplPath, [System.Text.Encoding]::UTF8)
$modalsHtml = [System.IO.File]::ReadAllText("$PWD\scratch\new_modals.html", [System.Text.Encoding]::UTF8)

$targetFooter = '<footer class="site-footer">'
$replaceFooter = $modalsHtml + "`r`n`r`n  " + $targetFooter

if ($tplContent.Contains($targetFooter)) {
    $tplContent = $tplContent.Replace($targetFooter, $replaceFooter)
    [System.IO.File]::WriteAllText($tplPath, $tplContent, [System.Text.Encoding]::UTF8)
    Write-Host "Modais inseridos com sucesso antes de footer!" -ForegroundColor Green
} else {
    Write-Host "Erro: targetFooter nao encontrado" -ForegroundColor Red
}
