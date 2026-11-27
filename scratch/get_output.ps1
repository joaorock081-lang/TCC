$html = Get-Content 'scratch/inline_verify_dom.html' -Raw
$m = [regex]::Match($html, '<div id="output">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "OUTPUT DIV: $($m.Groups[1].Value)"
}
