$content = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)
Write-Host "Tamanho de data.js: $($content.Length) bytes"

$pattern = '^\s*([a-zA-Z0-9_-]+):\s*\{\s*id:\s*"'
$matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
Write-Host "Total de vestibulares encontrados: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "Vestibular:" $m.Groups[1].Value
}
