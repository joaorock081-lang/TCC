$files = @("js/data.js", "js/app.js", "index_template.html", "index.html")
foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText("$PWD\$f", [System.Text.Encoding]::UTF8)
    $c = 0
    $idx = 0
    while (($idx = $text.IndexOf('alternativas": [', $idx)) -ne -1) {
        $c++
        $idx += 10
    }
    Write-Host "$f tem $c ocorrencias de alternativas"": ["
}
