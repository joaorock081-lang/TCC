$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$fileUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/index.html"
$output = (& $edgePath --headless=new --disable-gpu --dump-dom $fileUrl 2>&1) -join "`n"
Write-Host "DOM obtido! Caracteres: $($output.Length)"

if ($output -match 'id="frase-motivacional"[^>]*>([\s\S]*?)<\/div>') {
    Write-Host "frase-motivacional tamanho:" $matches[1].Trim().Length
    Write-Host "Trecho:" ($matches[1].Substring(0, [Math]::Min(120, $matches[1].Length)))
}
if ($output -match 'id="vestibulares-tabs"[^>]*>([\s\S]*?)<\/div>') {
    Write-Host "vestibulares-tabs tamanho:" $matches[1].Trim().Length
}
if ($output -match 'id="stat-topicos-concluidos"[^>]*>([\s\S]*?)<\/span>') {
    Write-Host "stat-topicos-concluidos valor:" $matches[1]
}
