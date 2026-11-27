$css = [System.IO.File]::ReadAllText("$PWD\css\style.css", [System.Text.Encoding]::UTF8)

# Strip comments
$clean = [System.Text.RegularExpressions.Regex]::Replace($css, '/\*[\s\S]*?\*/', '')

$open = 0
$lines = $clean -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $opens = ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $closes = ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    $open += ($opens - $closes)
    if ($open -lt 0) {
        Write-Host "Extra closing brace near line $($i+1): $line"
        break
    }
}
Write-Host "Total unmatched open braces: $open"
