$dataJs = Get-Content 'js/data.js' -Raw -Encoding UTF8
Write-Host "Length of data.js: $($dataJs.Length)"
$idx = $dataJs.IndexOf("const DICAS_ESTUDO")
if ($idx -ge 0) {
    Write-Host $dataJs.Substring($idx, [Math]::Min(500, $dataJs.Length - $idx))
}
