if (Test-Path 'scratch/runtime_click_dom.html') {
    $dom = Get-Content 'scratch/runtime_click_dom.html' -Raw -Encoding UTF8
    Write-Host "Length: $($dom.Length)"
    $dom | Select-String "REPORT" -Context 0, 10
} else {
    Write-Host "File not found"
}
