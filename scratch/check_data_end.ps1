$dataJs = Get-Content 'js/data.js' -Raw -Encoding UTF8
$len = $dataJs.Length
Write-Host "End of data.js:"
Write-Host $dataJs.Substring([Math]::Max(0, $len - 600))
