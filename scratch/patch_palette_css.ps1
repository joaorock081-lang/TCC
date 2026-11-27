$path = "$PWD\css\style.css"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Update .btn-header-palette to high contrast
$oldPaletteCss = @'
.btn-header-palette {
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 14%, transparent) !important;
  color: var(--primary-accent, #3b82f6) !important;
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 38%, transparent) !important;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 10px var(--primary-glow, rgba(37, 99, 235, 0.2));
}

.btn-header-palette:hover {
  background: linear-gradient(135deg, var(--navy-800, #1e3a8a), var(--primary-accent, #3b82f6)) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--primary-glow, rgba(37, 99, 235, 0.45)) !important;
}

.btn-header-palette i {
  color: var(--primary-accent, #3b82f6) !important;
  font-size: 1rem;
  transition: transform var(--transition-fast);
}

.btn-header-palette span {
  color: #e2e8f0 !important;
  -webkit-text-fill-color: #e2e8f0 !important;
}

.btn-header-palette:hover i,
.btn-header-palette:hover span {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}
'@

$newPaletteCss = @'
.btn-header-palette {
  background: color-mix(in srgb, var(--primary-accent, #3b82f6) 15%, #ffffff) !important;
  color: var(--text-main, #0f172a) !important;
  border: 1.5px solid color-mix(in srgb, var(--primary-accent, #3b82f6) 45%, var(--border-light, #cbd5e1)) !important;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 10px var(--primary-glow, rgba(37, 99, 235, 0.2));
}

.btn-header-palette:hover {
  background: linear-gradient(135deg, var(--primary-base, #1e3a8a), var(--primary-accent, #3b82f6)) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--primary-glow, rgba(37, 99, 235, 0.45)) !important;
}

.btn-header-palette i {
  color: var(--primary-accent, #3b82f6) !important;
  font-size: 1rem;
  transition: transform var(--transition-fast);
}

.btn-header-palette span {
  color: var(--text-main, #0f172a) !important;
  -webkit-text-fill-color: var(--text-main, #0f172a) !important;
  font-weight: 700 !important;
}

.btn-header-palette:hover i,
.btn-header-palette:hover span {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}
'@

$content = $content.Replace($oldPaletteCss, $newPaletteCss)

# Also ensure [data-theme="dark"] .btn-header-palette span is pure white
$oldDarkSpan = @'
[data-theme="dark"] .btn-header-palette span {
  color: #e2e8f0 !important;
  -webkit-text-fill-color: #e2e8f0 !important;
}
'@

$newDarkSpan = @'
[data-theme="dark"] .btn-header-palette span {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-weight: 700 !important;
}
'@

$content = $content.Replace($oldDarkSpan, $newDarkSpan)

# 2. Add .card-frase-dia:empty rule
$cardFraseRule = "/* Frase Motivacional */`r`n.card-frase-dia {"
$cardFraseReplacement = "/* Frase Motivacional */`r`n.card-frase-dia:empty {`r`n  display: none !important;`r`n}`r`n`r`n.card-frase-dia {"
$content = $content.Replace($cardFraseRule, $cardFraseReplacement)

# 3. Enhance .btn-modal-confirm and #btn-confirmar-gerar-cronograma-ia
$oldModalBtn = @'
.btn-modal-confirm {
  background: linear-gradient(135deg, var(--primary-accent, #2563eb), var(--primary-light, #1d4ed8)) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  padding: 0.75rem 1.6rem !important;
  border-radius: var(--radius-full) !important;
  font-family: inherit !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.55rem !important;
  box-shadow: 0 4px 18px var(--primary-glow, rgba(37, 99, 235, 0.45)) !important;
  transition: all 0.25s ease !important;
  outline: none !important;
}
'@

$newModalBtn = @'
#btn-confirmar-gerar-cronograma-ia,
.btn-modal-confirm {
  appearance: none !important;
  -webkit-appearance: none !important;
  background: linear-gradient(135deg, var(--primary-accent, #2563eb), var(--primary-light, #1d4ed8)) !important;
  color: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
  padding: 0.85rem 1.8rem !important;
  border-radius: var(--radius-full, 9999px) !important;
  font-family: inherit !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.6rem !important;
  box-shadow: 0 4px 18px var(--primary-glow, rgba(37, 99, 235, 0.45)) !important;
  transition: all 0.25s ease !important;
  outline: none !important;
}

#btn-confirmar-gerar-cronograma-ia i,
.btn-modal-confirm i,
#btn-confirmar-gerar-cronograma-ia span,
.btn-modal-confirm span {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}
'@

$content = $content.Replace($oldModalBtn, $newModalBtn)

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "css/style.css atualizado com sucesso!"
