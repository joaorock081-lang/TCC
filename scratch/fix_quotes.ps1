$path = "$PWD\js\data.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Substitui alternativas": [ por "alternativas": [
$fixed = $content.Replace('alternativas": [', '"alternativas": [')

[System.IO.File]::WriteAllText($path, $fixed, [System.Text.Encoding]::UTF8)
Write-Host "Substituição concluída! Testando agora com o parser..."

Add-Type -AssemblyName Microsoft.JScript
try {
    $engine = [Microsoft.JScript.Vsa.VsaEngine]::CreateEngine()
    $result = [Microsoft.JScript.Eval]::JScriptEvaluate($fixed, $engine)
    Write-Host "js/data.js: PARSER EXECUTADO COM SUCESSO TOTAL! ZERO ERROS DE SINTAXE!" -ForegroundColor Green
} catch {
    Write-Host "Ainda há erro:" -ForegroundColor Red
    Write-Host $_.Exception.ToString()
}
