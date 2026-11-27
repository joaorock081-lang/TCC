$match = Get-Content "$PWD\js\app.js" | Select-String -Pattern "function renderizarPainelResultadoSimulado"
Write-Host "Match line number:" $match.LineNumber
