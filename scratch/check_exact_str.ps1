$text = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)
$idx = $text.IndexOf('alternativas": [')
if ($idx -ne -1) {
    $start = [Math]::Max(0, $idx - 25)
    $snippet = $text.Substring($start, 50)
    Write-Host "Trecho ao redor:"
    Write-Host $snippet
}
