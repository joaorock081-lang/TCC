if (Test-Path 'scratch/diag_dom.html') {
    $dom = Get-Content 'scratch/diag_dom.html' -Raw -Encoding UTF8
    $m = [regex]::Match($dom, '<div id="DIAGNOSTIC_RESULT">([\s\S]*?)</div>')
    Write-Host "MATCH: $($m.Groups[1].Value)"
} else {
    Write-Host 'File not found'
}
