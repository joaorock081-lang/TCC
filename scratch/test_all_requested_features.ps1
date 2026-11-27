$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
  $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9249
$profileDir = "$env:TEMP\edge_test_profile_req_$([Guid]::NewGuid().ToString().Substring(0,8))"
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
  "--remote-debugging-port=$port",
  "--user-data-dir=$profileDir",
  "--headless",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank"
) -PassThru

Start-Sleep -Seconds 2

try {
  $tabs = Invoke-RestMethod -Uri "http://localhost:$port/json" -Method Get
  $wsUrl = $tabs[0].webSocketDebuggerUrl

  $ws = [System.Net.WebSockets.ClientWebSocket]::new()
  $cts = [System.Threading.CancellationTokenSource]::new(10000)
  $ws.ConnectAsync([Uri]$wsUrl, $cts.Token).Wait()

  function Send-Cdp($method, $params = @{}) {
    $script:cmdId = ($script:cmdId -as [int]) + 1
    $payload = @{ id = $script:cmdId; method = $method; params = $params } | ConvertTo-Json -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $segment = [ArraySegment[byte]]::new($bytes)
    $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()

    $buffer = [byte[]]::new(1048576)
    $memStream = [System.IO.MemoryStream]::new()
    do {
      $recvSegment = [ArraySegment[byte]]::new($buffer)
      $res = $ws.ReceiveAsync($recvSegment, [System.Threading.CancellationToken]::None).Result
      $memStream.Write($buffer, 0, $res.Count)
    } while (-not $res.EndOfMessage)

    $jsonStr = [System.Text.Encoding]::UTF8.GetString($memStream.ToArray())
    return $jsonStr | ConvertFrom-Json
  }

  $filePath = (Get-Item "index.html").FullName -replace '\\', '/'
  $navRes = Send-Cdp "Page.navigate" @{ url = "file:///$filePath" }
  Start-Sleep -Seconds 3

  $checkScript = @'
(() => {
  // 1. Icon checks
  const brainCircuitCount = document.querySelectorAll('.fa-brain-circuit').length;
  const robotIcons = document.querySelectorAll('.fa-robot').length;
  
  // 2. Header quick buttons
  const headerQuickBtns = Array.from(document.querySelectorAll('.btn-header-quick-fixo')).map(b => b.textContent.trim());
  const btnFoco = document.querySelector('.btn-header-foco');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const focoBeforeTheme = btnFoco && btnThemeToggle && (btnFoco.compareDocumentPosition(btnThemeToggle) & Node.DOCUMENT_POSITION_FOLLOWING);

  // 3. Floating windows
  const wLousa = !!document.getElementById('lousa-rascunho');
  const wIA = !!document.getElementById('janela-flutuante-ia');
  const wNotas = !!document.getElementById('janela-flutuante-notas');
  const wFoco = !!document.getElementById('janela-flutuante-foco');

  // Test toggling windows
  if (typeof alternarJanelaFlutuante === 'function') {
    alternarJanelaFlutuante('ia');
    alternarJanelaFlutuante('foco');
  }
  const iaOpened = document.getElementById('janela-flutuante-ia').style.display !== 'none';
  const focoOpened = document.getElementById('janela-flutuante-foco').style.display !== 'none';

  // 4. Redação
  const modalCatalogo = !!document.getElementById('modal-catalogo-temas');
  const modalCriar = !!document.getElementById('modal-criar-tema-redacao');
  const totalTemas = typeof obterTodosTemasRedacao === 'function' ? obterTodosTemasRedacao().length : 0;

  // 5. Sound engine & volume
  const hasSoundEngine = !!AppState.soundEngine;
  const sliderFoco = !!document.getElementById('foco-slider-volume');
  const sliderTab = !!document.getElementById('foco-slider-volume-tab');

  // 6. Tour
  const tourSlidesCount = document.querySelectorAll('.tour-slide-item').length;
  const tourDotsCount = document.querySelectorAll('.tour-dot').length;
  const totalTourSlidesConst = typeof TOTAL_TOUR_SLIDES !== 'undefined' ? TOTAL_TOUR_SLIDES : 0;

  return {
    brainCircuitCount,
    robotIcons,
    headerQuickBtns,
    focoBeforeTheme: !!focoBeforeTheme,
    floatingWindows: { wLousa, wIA, wNotas, wFoco, iaOpened, focoOpened },
    redacao: { modalCatalogo, modalCriar, totalTemas },
    soundEngine: { hasSoundEngine, sliderFoco, sliderTab },
    tour: { tourSlidesCount, tourDotsCount, totalTourSlidesConst }
  };
})()
'@

  $evalRes = Send-Cdp "Runtime.evaluate" @{ expression = $checkScript; returnByValue = $true }
  Write-Host "RESULT_JSON_START"
  Write-Host ($evalRes | ConvertTo-Json -Depth 8)
  Write-Host "RESULT_JSON_END"

  $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", [System.Threading.CancellationToken]::None).Wait()
}
finally {
  if ($proc -and -not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
  }
  if (Test-Path $profileDir) {
    Remove-Item -Path $profileDir -Recurse -Force -ErrorAction SilentlyContinue
  }
}
