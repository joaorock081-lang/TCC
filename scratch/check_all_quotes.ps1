function Test-Quotes($filePath) {
    Write-Host "`nTestando arquivo: $filePath"
    $lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)
    $inBacktick = $false
    $oddCount = 0
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        
        # Ignora linhas dentro de template literals multilinhas
        $backticks = ([regex]::Matches($line, '(?<!\\)`')).Count
        if ($backticks % 2 -ne 0) {
            $inBacktick = -not $inBacktick
        }
        
        if (-not $inBacktick) {
            # Aspas duplas
            $dQuotes = ([regex]::Matches($line, '(?<!\\)"')).Count
            if ($dQuotes % 2 -ne 0) {
                Write-Host "Linha $($i + 1) com aspas duplas ÍMPARES: $line" -ForegroundColor Red
                $oddCount++
            }
        }
    }
    if ($oddCount -eq 0) {
        Write-Host "Perfeito! Zero linhas com aspas desbalanceadas em $filePath" -ForegroundColor Green
    }
}

Test-Quotes "$PWD\js\data.js"
Test-Quotes "$PWD\js\app.js"
