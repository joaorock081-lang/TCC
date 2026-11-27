Add-Type -AssemblyName System.Windows.Forms
$wb = New-Object System.Windows.Forms.WebBrowser
$wb.ScriptErrorsSuppressed = $false

$errorMsg = ""
Register-ObjectEvent -InputObject $wb -EventName ScriptError -Action {
    $script:errorMsg = "Script Error at line $($EventArgs.LineNumber): $($EventArgs.Description)"
    Write-Host $script:errorMsg -ForegroundColor Red
} | Out-Null

$uri = New-Object System.Uri("$PWD\index.html")
$wb.Navigate($uri)

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
while ($wb.ReadyState -ne [System.Windows.Forms.WebBrowserReadyState]::Complete -and $stopwatch.ElapsedMilliseconds -lt 5000) {
    [System.Windows.Forms.Application]::DoEvents()
    Start-Sleep -Milliseconds 100
}

Write-Host "Página carregada com estado: $($wb.ReadyState)"
if ($errorMsg -ne "") {
    Write-Host "ERRO CAPTURADO: $errorMsg" -ForegroundColor Red
} else {
    Write-Host "Nenhum ScriptError do WebBrowser disparado."
}

# Inspeciona elementos
$doc = $wb.Document
if ($doc) {
    $frase = $doc.GetElementById("frase-motivacional")
    Write-Host "frase-motivacional innerHTML:" $frase.InnerHtml
    $vestTabs = $doc.GetElementById("vestibulares-tabs")
    Write-Host "vestibulares-tabs children count:" $vestTabs.Children.Count
    $stat = $doc.GetElementById("stat-topicos-concluidos")
    Write-Host "stat-topicos-concluidos text:" $stat.InnerText
}
