$appJs = [System.IO.File]::ReadAllText('js/app.js', [System.Text.Encoding]::UTF8)

# Target block at end of js/app.js:
$target = @"
// Gerenciamento Universal do Bloqueio de Scroll de Fundo para Modais
function gerenciarBloqueioScrollModal() {
  const algumAtivo = document.querySelector('.modal-overlay.active, .modal.active');
  if (algumAtivo) {
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
  } else {
    document.body.classList.remove('modal-aberto');
    document.documentElement.classList.remove('modal-aberto');
  }
}
window.gerenciarBloqueioScrollModal = gerenciarBloqueioScrollModal;

// Observador global para travar o scroll da página ao abrir qualquer modal
window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    gerenciarBloqueioScrollModal();
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // Previne que o scroll dentro dos modais escape para o fundo
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('wheel', (e) => {
      // Permite rolagem apenas dentro do modal, impedindo o fundo de mexer
      const card = overlay.querySelector('.modal-card, .cronograma-ia-modal-card, .modal-palette-box, .modal-tour-card');
      if (card) {
        const atingiuTopo = e.deltaY < 0 && card.scrollTop <= 0;
        const atingiuFim = e.deltaY > 0 && (card.scrollTop + card.clientHeight >= card.scrollHeight - 1);
        if (atingiuTopo || atingiuFim) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  });
});
"@

$replacement = @"
// Gerenciamento Universal do Bloqueio de Scroll de Fundo para Modais (Sem Loops ou Travamentos)
function gerenciarBloqueioScrollModal() {
  const algumAtivo = !!document.querySelector('.modal-overlay.active, .modal.active');
  const estaAberto = document.body.classList.contains('modal-aberto');
  if (algumAtivo !== estaAberto) {
    document.body.classList.toggle('modal-aberto', algumAtivo);
    document.documentElement.classList.toggle('modal-aberto', algumAtivo);
  }
}
window.gerenciarBloqueioScrollModal = gerenciarBloqueioScrollModal;
"@

$normApp = $appJs.Replace("`r`n", "`n")
$normTarget = $target.Replace("`r`n", "`n")
$normReplacement = $replacement.Replace("`r`n", "`n")

if ($normApp.Contains($normTarget)) {
    $newApp = $normApp.Replace($normTarget, $normReplacement)
    [System.IO.File]::WriteAllText('js/app.js', $newApp, [System.Text.Encoding]::UTF8)
    Write-Host "Replaced scroll block successfully!"
} else {
    Write-Host "Target not found! Searching snippet..."
    $idx = $normApp.IndexOf("function gerenciarBloqueioScrollModal")
    if ($idx -ge 0) {
        Write-Host $normApp.Substring($idx, [Math]::Min(500, $normApp.Length - $idx))
    }
}
