$idx = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$hasDynamicHero = $idx.Contains('var(--primary-accent, #2563eb) 0%, var(--primary-light, #1d4ed8) 100%')
$hasDynamicPalette = $idx.Contains('color-mix(in srgb, var(--primary-accent, #3b82f6) 14%, transparent)')
$hasDynamicPaletteDark = $idx.Contains('[data-theme="dark"] .btn-header-palette')
Write-Host "Dynamic Hero Button in index.html: $hasDynamicHero"
Write-Host "Dynamic Palette Button in index.html: $hasDynamicPalette"
Write-Host "Dynamic Palette Dark Overrides in index.html: $hasDynamicPaletteDark"
