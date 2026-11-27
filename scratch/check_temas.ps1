$content = [System.IO.File]::ReadAllText('js/data.js', [System.Text.Encoding]::UTF8)
$regex = [regex]'id:\s*"(redacao-[^"]+)"'
$matches = $regex.Matches($content)
Write-Host "Total redacao themes in data.js: $($matches.Count)"
foreach ($m in $matches) {
  Write-Host "  " $m.Groups[1].Value
}
