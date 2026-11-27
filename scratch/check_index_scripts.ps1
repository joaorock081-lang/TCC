$html = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)

# Procura as tags <script> em index.html
$matches = [regex]::Matches($html, '<script[\s\S]*?>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Write-Host "Total de tags <script> em index.html: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "Tag script:" $m.Value
}

# Verifica se VESTIBULARES_DATA está antes de app.js
$idxVest = $html.IndexOf("const VESTIBULARES_DATA")
$idxInit = $html.IndexOf("document.addEventListener('DOMContentLoaded'")
Write-Host "Posição de VESTIBULARES_DATA: $idxVest"
Write-Host "Posição de DOMContentLoaded: $idxInit"
if ($idxVest -lt $idxInit) {
    Write-Host "ORDEM CORRETA: VESTIBULARES_DATA vem antes de app.js!"
} else {
    Write-Host "ERRO DE ORDEM: DOMContentLoaded vem antes de VESTIBULARES_DATA!"
}
