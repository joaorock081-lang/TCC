$idx = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$hasHeroBtn = $idx.Contains('linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)')
$hasPaletteDark = $idx.Contains('[data-theme="dark"] .btn-header-palette')
Write-Host "Hero primary gradient present in index.html: $hasHeroBtn"
Write-Host "Palette dark overrides present in index.html: $hasPaletteDark"
