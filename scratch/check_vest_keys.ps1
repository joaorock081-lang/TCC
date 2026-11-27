$code = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)
$regex = [regex]'(?m)^  ([a-zA-Z0-9_-]+): \{'
$matches = $regex.Matches($code)
foreach ($m in $matches) {
    Write-Host $m.Groups[1].Value
}
