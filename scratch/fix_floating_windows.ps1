# fix_floating_windows.ps1
$cssPath = "css/style.css"
$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)

# 1. Substituir a regra de .janela-flutuante-widget para remover !important em bottom, right, display
$oldWidgetCss = @"
.janela-flutuante-widget {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  width: 380px !important;
  max-width: 95vw !important;
  max-height: 82vh !important;
  background: var(--bg-card, #ffffff) !important;
  border-radius: var(--radius-lg, 16px) !important;
  border: 2px solid var(--border-light, #e2e8f0) !important;
  box-shadow: 0 20px 48px rgba(12, 29, 59, 0.35) !important;
  display: flex !important;
  flex-direction: column !important;
  z-index: 2900 !important;
  overflow: hidden !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important;
}
"@

$newWidgetCss = @"
.janela-flutuante-widget {
  position: fixed;
  width: 380px;
  max-width: 95vw;
  max-height: 82vh;
  background: var(--bg-card, #ffffff);
  border-radius: var(--radius-lg, 16px);
  border: 2px solid var(--border-light, #e2e8f0);
  box-shadow: 0 20px 48px rgba(12, 29, 59, 0.35);
  display: flex;
  flex-direction: column;
  z-index: 3500;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
"@

if ($css.Contains($oldWidgetCss)) {
    $css = $css.Replace($oldWidgetCss, $newWidgetCss)
    Write-Host "Replaced .janela-flutuante-widget base CSS."
}

# 2. Adicionar as regras de controle definitivo de visibilidade no final de css/style.css
$definitiveCss = @"

/* ========================================================
   CONTROLE DEFINITIVO DE VISIBILIDADE DAS 4 JANELAS MÓVEIS
   (Lousa, Tutor IA, Bloco de Notas e Foco Pomodoro)
   ======================================================== */
.janela-flutuante-widget,
.lousa-scratchpad {
  z-index: 3500 !important;
}

.janela-flutuante-widget:not(.visivel),
.lousa-scratchpad:not(.visivel) {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}

.janela-flutuante-widget.visivel,
.lousa-scratchpad.visivel {
  display: flex !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  visibility: visible !important;
  transform: translateY(0) scale(1) !important;
}
"@

if (!$css.Contains("CONTROLE DEFINITIVO DE VISIBILIDADE DAS 4 JANELAS")) {
    $css += $definitiveCss
    Write-Host "Appended definitive visibility CSS to style.css."
}

[System.IO.File]::WriteAllText($cssPath, $css, [System.Text.Encoding]::UTF8)

# 3. Atualizar alternarJanelaFlutuante em js/app.js
$jsPath = "js/app.js"
$js = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

$regexAlternar = "(?s)// Gerenciador de Janelas Flutuantes Móveis \(Garantia de Visibilidade Total\)\s*window\.alternarJanelaFlutuante = function\(tipo\)\s*\{.*?\}\s*;\s*window\.minimizarJanelaFlutuante"

$newAlternarJs = @"
// Gerenciador de Janelas Flutuantes Móveis (Garantia de Visibilidade Total)
window.alternarJanelaFlutuante = function(tipo) {
  let id = '';
  if (tipo === 'lousa') id = 'lousa-rascunho';
  else if (tipo === 'ia') id = 'janela-flutuante-ia';
  else if (tipo === 'notas') id = 'janela-flutuante-notas';
  else if (tipo === 'foco') id = 'janela-flutuante-foco';
  else id = tipo;

  const el = document.getElementById(id);
  if (!el) {
    console.warn('Elemento flutuante não encontrado:', id);
    return;
  }

  const estaAberta = el.classList.contains('visivel');

  if (estaAberta) {
    // Fecha a janela
    el.classList.remove('visivel');
    el.classList.remove('minimizado');
    if (tipo === 'lousa' && window.AppState && AppState.lousa) {
      AppState.lousa.isVisible = false;
    }
  } else {
    // Abre a janela
    el.classList.remove('minimizado');
    el.classList.add('visivel');

    if (tipo === 'lousa' && window.AppState && AppState.lousa) {
      AppState.lousa.isVisible = true;
    }

    // Se ainda não foi movida manualmente, define posição padrão elegante no topo direito
    if (!el.dataset.posicionadaManualmente) {
      const topOffset = (tipo === 'lousa' ? 95 : (tipo === 'ia' ? 105 : (tipo === 'notas' ? 115 : 125)));
      const rightOffset = (tipo === 'lousa' ? 24 : (tipo === 'ia' ? 32 : (tipo === 'notas' ? 40 : 48)));
      el.style.top = topOffset + 'px';
      el.style.right = rightOffset + 'px';
      el.style.left = 'auto';
      el.style.bottom = 'auto';
    } else {
      garantirJanelaVisivelNaTela(el);
    }

    trazerParaFrenteJanela(el);

    if (tipo === 'lousa') {
      setTimeout(() => {
        if (typeof redimensionarCanvasLousa === 'function') redimensionarCanvasLousa();
      }, 120);
    }

    if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  }
};

window.alternarLousaRascunho = function() {
  window.alternarJanelaFlutuante('lousa');
};

window.minimizarJanelaFlutuante
"@

$js = [System.Text.RegularExpressions.Regex]::Replace($js, $regexAlternar, $newAlternarJs)
Write-Host "Updated alternarJanelaFlutuante in js/app.js."

# 4. Atualizar tornarElementoArrastavel em js/app.js para garantir que arrastar limpe bottom e right
$oldArrastavel = @"
    el.style.left = `${initialLeft}px`;
    el.style.top = `${initialTop}px`;
    el.style.bottom = 'auto';
    el.style.right = 'auto';
"@

$newArrastavel = @"
    el.style.left = initialLeft + 'px';
    el.style.top = initialTop + 'px';
    el.style.bottom = 'auto';
    el.style.right = 'auto';
"@

if ($js.Contains($oldArrastavel)) {
    $js = $js.Replace($oldArrastavel, $newArrastavel)
}

[System.IO.File]::WriteAllText($jsPath, $js, [System.Text.Encoding]::UTF8)
Write-Host "Updated js/app.js successfully!"
