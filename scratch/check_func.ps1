$content = Get-Content 'js/app.js' -Raw -Encoding UTF8
$start = $content.IndexOf("function gerarCronogramaInicialPadrao()")
$end = $content.IndexOf("function obterDiaSemanaHoje()")
Write-Host "Length of block: $($end - $start)"
Write-Host $content.Substring($start, $end - $start)
