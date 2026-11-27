Add-Type -AssemblyName Microsoft.JScript

$code = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Remove 'const ' e 'let ' para o motor do JScript .NET conseguir rodar em ES5 se necessário, ou testa o parser
try {
    $engine = [Microsoft.JScript.Vsa.VsaEngine]::CreateEngine()
    $result = [Microsoft.JScript.Eval]::JScriptEvaluate($code, $engine)
    Write-Host "JScriptEvaluate: SUCESSO SEM ERROS!"
} catch {
    Write-Host "ERRO CAPTURADO NO PARSER:" -ForegroundColor Red
    Write-Host $_.Exception.ToString() -ForegroundColor Yellow
}
