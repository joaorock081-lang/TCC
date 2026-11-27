# test_browser.ps1 - Inspeciona estado e abertura das janelas flutuantes
$edgePath = (Get-Item "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe" -ErrorAction SilentlyContinue).FullName | Select-Object -First 1

if (!$edgePath) {
    Write-Host "Edge não encontrado."
    exit 0
}

Write-Host "Edge encontrado em: $edgePath"
