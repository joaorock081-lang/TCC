$dom = Get-Content 'scratch/index_direct_dom.html' -Raw -Encoding UTF8
Write-Host "Length: $($dom.Length)"
$dom | Select-String "AppState" -Context 0, 2
