$content = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$matches = [regex]::Matches($content, '(?:src|href)="([^"]+)"')
foreach ($m in $matches) {
    Write-Output $m.Groups[1].Value
}
