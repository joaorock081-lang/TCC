$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$path = (Resolve-Path 'index.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\index_direct_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

if (Test-Path $domOut) {
    $dom = Get-Content $domOut -Raw -Encoding UTF8
    Write-Host "DOM captured! File size: $($dom.Length)"
    Write-Host "Title tag present: $($dom.Contains('EstudaMais'))"
    Write-Host "Cronograma tag semana present: $($dom.Contains('cronograma-tag-semana'))"
} else {
    Write-Host "DOM file not created."
}
