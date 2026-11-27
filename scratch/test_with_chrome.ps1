$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///" + ($PWD.Path -replace '\\', '/') + "/index.html"

Write-Host "Executando Chrome Headless em $url..."
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"$url`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\chrome_dom.html" -RedirectStandardError "$PWD\scratch\chrome_err.log"

$proc.WaitForExit(10000)
Write-Host "Chrome finalizou com código: $($proc.ExitCode)"

if (Test-Path "$PWD\scratch\chrome_dom.html") {
    $dom = [System.IO.File]::ReadAllText("$PWD\scratch\chrome_dom.html", [System.Text.Encoding]::UTF8)
    Write-Host "Tamanho do DOM renderizado: $($dom.Length) caracteres"
    
    # Verifica frase-motivacional
    if ($dom -match 'id="frase-motivacional"[^>]*>([\s\S]*?)<\/div>') {
        $content = $matches[1].Trim()
        Write-Host "frase-motivacional: $($content.Length) chars -> $content"
    }
    
    # Verifica vestibulares-tabs
    if ($dom -match 'id="vestibulares-tabs"[^>]*>([\s\S]*?)<\/div>') {
        $content = $matches[1].Trim()
        Write-Host "vestibulares-tabs: $($content.Length) chars"
    }
    
    # Verifica stat-topicos-concluidos
    if ($dom -match 'id="stat-topicos-concluidos"[^>]*>([\s\S]*?)<\/span>') {
        Write-Host "stat-topicos-concluidos: $($matches[1].Trim())"
    }
}

if (Test-Path "$PWD\scratch\chrome_err.log") {
    $err = [System.IO.File]::ReadAllText("$PWD\scratch\chrome_err.log", [System.Text.Encoding]::UTF8)
    if ($err.Length -gt 0) {
        Write-Host "`nLogs do Chrome:" -ForegroundColor Yellow
        Write-Host $err
    }
}
