# test_edge_console.ps1
$edgePath = (Get-Item "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe" -ErrorAction SilentlyContinue).FullName | Select-Object -First 1

$htmlUri = "file:///" + (Resolve-Path "index.html").Path.Replace("\", "/")
Write-Host "Iniciando Edge headless para inspecionar console em $htmlUri"

# Inicia Edge com debugging port
$process = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--disable-gpu", "$htmlUri" -PassThru

Start-Sleep -Seconds 2

# Testa se a porta 9222 responde
try {
    $tabs = Invoke-RestMethod -Uri "http://localhost:9222/json"
    Write-Host "Abas do Edge encontradas:" ($tabs | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "Falha ao conectar na porta de depuração: $_"
} finally {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
}
