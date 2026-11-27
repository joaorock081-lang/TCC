$path = "$PWD\js\data.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Substitui ""alternativas": [ por "alternativas": [
$fixed = $content.Replace('""alternativas": [', '"alternativas": [')

[System.IO.File]::WriteAllText($path, $fixed, [System.Text.Encoding]::UTF8)
Write-Host 'Substituído com sucesso!'
