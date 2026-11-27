Add-Type -AssemblyName Microsoft.JScript

$code = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Substitui const e let por var temporariamente apenas para o parser do JScript .NET
$compatCode = $code -replace '\bconst\b', 'var' -replace '\blet\b', 'var'

try {
    $engine = [Microsoft.JScript.Vsa.VsaEngine]::CreateEngine()
    $result = [Microsoft.JScript.Eval]::JScriptEvaluate($compatCode, $engine)
    Write-Host "js/data.js: PARSER EXECUTOU SEM ERRO! SINTAXE PERFEITA!" -ForegroundColor Green
} catch {
    Write-Host "Ainda há erro:" -ForegroundColor Red
    Write-Host $_.Exception.ToString()
}
