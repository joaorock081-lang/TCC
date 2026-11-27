$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
  $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9245
$profileDir = "$env:TEMP\edge_test_profile_fixes_$([Guid]::NewGuid().ToString().Substring(0,8))"
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
  Write-Host "WebSocket URL: $wsUrl"

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
  const metaReferrer = !!document.querySelector('meta[name="referrer"]');
  const btnPrev = document.getElementById('nav-btn-prev');
  const btnNext = document.getElementById('nav-btn-next');
  const btnPrevVisible = btnPrev ? window.getComputedStyle(btnPrev).display !== 'none' : false;
  const btnNextVisible = btnNext ? window.getComputedStyle(btnNext).display !== 'none' : false;
  
  const quickBtns = Array.from(document.querySelectorAll('.btn-header-quick-fixo')).map(b => b.textContent.trim());
  const hasFerramentas = !!document.getElementById('btn-header-ferramentas');
  
  // Test video loading
  if (typeof carregarVideoPersonalizadoTopo === 'function') {
    carregarVideoPersonalizadoTopo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
  const iframe = document.getElementById('iframe-video-player-topo');
  const iframeSrc = iframe ? iframe.src : '';
  const iframeReferrer = iframe ? iframe.getAttribute('referrerpolicy') : '';
  const btnLink = document.getElementById('btn-link-externo-video-topo');
  const linkHref = btnLink ? btnLink.href : '';

  return {
    metaReferrer,
    btnPrevExists: !!btnPrev,
    btnNextExists: !!btnNext,
    btnPrevVisible,
    btnNextVisible,
    quickBtns,
    hasFerramentas,
    iframeSrc,
    iframeReferrer,
    linkHref
  };
})()
'@

  $evalRes = Send-Cdp "Runtime.evaluate" @{ expression = $checkScript; returnByValue = $true }
  Write-Host "Verification Results:"
  $evalRes.result.value | ConvertTo-Json -Compress; Write-Host ($evalRes | ConvertTo-Json -Depth 5)

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
