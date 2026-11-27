$appJs = Get-Content 'js/app.js' -Raw -Encoding UTF8

$funcs = @(
    "abrirModalGerarCronogramaIA",
    "imprimirCronogramaEstudos",
    "reiniciarSemanaCronograma",
    "limparHistoricoChatIA",
    "abrirModalConfigGemini"
)

foreach ($fn in $funcs) {
    Write-Host "=== Check: $fn ==="
    $idx = 0
    while (($idx = $appJs.IndexOf($fn, $idx)) -ge 0) {
        $start = [Math]::Max(0, $idx - 50)
        $len = [Math]::Min(150, $appJs.Length - $start)
        Write-Host "At $idx : $($appJs.Substring($start, $len).Replace("`n", " "))"
        $idx += $fn.Length
    }
}
