$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9334
$url = "file:///$($PWD.Path.Replace('\', '/'))/index.html"

# Inicia Edge headless com remote debugging
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--remote-debugging-port=$port",
    "--disable-gpu",
    "--no-sandbox",
    $url
) -PassThru

Start-Sleep -Seconds 3

try {
    # Obtém a lista de páginas
    $tabs = Invoke-RestMethod -Uri "http://localhost:$port/json"
    $wsUrl = $tabs[0].webSocketDebuggerUrl
    Write-Host "Conectado ao Edge: $wsUrl"

    # Função para executar JS via CDP
    function Invoke-CDPEval($ws, $expression) {
        $id = Get-Random
        $msg = @{
            id = $id
            method = "Runtime.evaluate"
            params = @{
                expression = $expression
                returnByValue = $true
                awaitPromise = $true
            }
        } | ConvertTo-Json -Compress

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $buffer = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
        $ws.SendAsync($buffer, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()

        $receiveBuffer = New-Object byte[] 65536
        $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$receiveBuffer)
        $res = $ws.ReceiveAsync($segment, [System.Threading.CancellationToken]::None).Result
        $resStr = [System.Text.Encoding]::UTF8.GetString($receiveBuffer, 0, $res.Count)
        return ($resStr | ConvertFrom-Json).result.result.value
    }

    # Conecta WebSocket
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ws.ConnectAsync([System.Uri]$wsUrl, [System.Threading.CancellationToken]::None).Wait()

    # 1. Teste de contagem total de canais
    $totalCards = Invoke-CDPEval $ws "
        mudarAba('videoaulas');
        document.querySelectorAll('#videoaulas-grid .canal-card').length;
    "
    Write-Host "Total de cards de canais renderizados na aba videoaulas: $totalCards"

    # 2. Teste de filtro por disciplina (Matemática - deve ter 3 canais)
    $matCards = Invoke-CDPEval $ws "
        filtrarDisciplinaVideoaulas('matematica');
        document.querySelectorAll('#videoaulas-grid .canal-card').length;
    "
    Write-Host "Cards após filtrar por 'matematica': $matCards"

    # 3. Teste de busca por termo
    $buscaCards = Invoke-CDPEval $ws "
        buscarVideoaulas('Ferretto');
        document.querySelectorAll('#videoaulas-grid .canal-card').length;
    "
    Write-Host "Cards após buscar 'Ferretto': $buscaCards"

    # 4. Teste de abertura do modal do player
    $modalAtivo = Invoke-CDPEval $ws "
        abrirModalPlayerVideo('mock123', 'Aula de Teste', 'Canal Teste', 'Prof Teste', 'https://youtube.com');
        const modal = document.getElementById('modal-video-aula-player');
        const iframe = document.getElementById('video-aula-iframe');
        ({
            temClasseActive: modal.classList.contains('active'),
            iframeSrc: iframe.src
        });
    "
    Write-Host "Modal aberto corretamente: $($modalAtivo | ConvertTo-Json -Compress)"

    # 5. Teste de fechamento do modal
    $modalFechado = Invoke-CDPEval $ws "
        fecharModalPlayerVideo();
        const modal = document.getElementById('modal-video-aula-player');
        const iframe = document.getElementById('video-aula-iframe');
        ({
            temClasseActive: modal.classList.contains('active'),
            iframeSrc: iframe.src
        });
    "
    Write-Host "Modal fechado corretamente: $($modalFechado | ConvertTo-Json -Compress)"

    # 6. Teste de limpeza do formatarMarkdownChat para LaTeX
    $mathResult = Invoke-CDPEval $ws "
        const raw = 'Identificar as variáveis:\n• \( C = 5.000 \) (custo)\n\nFórmula:\n\[\n\text{PV} = \frac{C}{(1+r)^n}\n\]';
        formatarMarkdownChat(raw);
    "
    Write-Host "Resultado do formatador de matemática:"
    Write-Host $mathResult

    # 7. Teste de ausência de erros no console
    $hasErrors = Invoke-CDPEval $ws "
        Boolean(window.__errosDetectados || false)
    "
    Write-Host "Erros detectados: $hasErrors"

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", [System.Threading.CancellationToken]::None).Wait()
}
finally {
    if ($proc -and -not $proc.HasExited) {
        $proc.Kill()
    }
}
