$chromePaths = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Users\joaor\AppData\Local\Google\Chrome\Application\chrome.exe"
)
foreach ($p in $chromePaths) {
  if (Test-Path $p) { Write-Host "Chrome encontrado em: $p" }
}
