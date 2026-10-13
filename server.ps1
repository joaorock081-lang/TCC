# ========================================================
# SERVIDOR LOCAL ESTUDAMAIS PARA CELULARES E TABLETS ANDROID
# TCC - Plataforma de Apoio aos Estudos
# ========================================================

$port = 8080
$hostIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.InterfaceAlias -notmatch 'Loopback' -and $_.IPAddress -notmatch '^169\.' 
} | Select-Object -First 1).IPAddress

if (-not $hostIP) {
    $hostIP = "localhost"
}

Clear-Host
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "  🎓 ESTUDAMAIS - SERVIDOR PARA CELULAR E TABLET ANDROID ATIVO!   " -ForegroundColor Yellow
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Para acessar no seu Celular ou Tablet Android:" -ForegroundColor White
Write-Host "  1. Certifique-se de que o dispositivo esta conectado no MESMO Wi-Fi deste PC." -ForegroundColor Gray
Write-Host "  2. Abra o Google Chrome no seu celular ou tablet Android." -ForegroundColor Gray
Write-Host "  3. Digite o seguinte endereco na barra do navegador:" -ForegroundColor Gray
Write-Host ""
Write-Host "     👉  http://$($hostIP):$port  👈" -ForegroundColor Green
Write-Host ""
Write-Host "  💡 DICA DE OURO NO ANDROID (INSTALAR COMO APLICATIVO):" -ForegroundColor Magenta
Write-Host "     Depois de abrir a pagina no Chrome do celular, toque nos 3 pontinhos" -ForegroundColor White
Write-Host "     no topo direito e escolha 'Adicionar a tela inicial' ou 'Instalar app'." -ForegroundColor White
Write-Host "     O site virara um aplicativo completo com icone proprio no seu celular!" -ForegroundColor White
Write-Host ""
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "  Pressione Ctrl + C nesta janela quando quiser encerrar o servidor. " -ForegroundColor DarkGray
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()

$baseDir = $PSScriptRoot
if (-not $baseDir) {
    $baseDir = (Get-Location).Path
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".txt"  = "text/plain; charset=utf-8"
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::UTF8)
        
        $requestLine = $reader.ReadLine()
        if ($requestLine) {
            $parts = $requestLine.Split(" ")
            if ($parts.Length -ge 2) {
                $rawPath = $parts[1].Split("?")[0]
                if ($rawPath -eq "/" -or $rawPath -eq "") {
                    $rawPath = "/index.html"
                }

                $relativePath = $rawPath.TrimStart("/").Replace("/", "\")
                $filePath = [System.IO.Path]::Combine($baseDir, $relativePath)

                if ([System.IO.File]::Exists($filePath)) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)

                    $header = "HTTP/1.1 200 OK`r`n" +
                              "Content-Type: $mime`r`n" +
                              "Content-Length: $($fileBytes.Length)`r`n" +
                              "Access-Control-Allow-Origin: *`r`n" +
                              "Connection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                } else {
                    $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                    $bytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                    $stream.Write($bytes, 0, $bytes.Length)
                }
            }
        }
        $stream.Close()
        $client.Close()
    }
} finally {
    $listener.Stop()
}
