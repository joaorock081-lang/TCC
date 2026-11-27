$path = "$PWD\js\app.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$oldSnippet = @"
function renderizarPainelResultadoSimulado(acertos, total, pct, areas) {
  const container = document.getElementById('simulado-resultado-painel');
  if (!container) return;

  const sim = AppState.simulado.ativo;
  if (!sim) return;

  // Busca outros simulados recomendados (priorizando matÃ©rias e vestibulares diferentes)
  const outros = (typeof SIMULADOS_DATA !== 'undefined' ? SIMULADOS_DATA : []).filter(s => s.id !== sim.id);
  const recomendados = outros.slice(0, 3);
"@

$newSnippet = @"
function renderizarPainelResultadoSimulado(acertos, total, pct, areas) {
  const container = document.getElementById('simulado-resultado-painel');
  if (!container) return;

  const sim = AppState.simulado.ativo;
  if (!sim) return;

  // Gera automaticamente o próximo simulado por IA baseado no desempenho
  const novoSimuladoIA = criarProximoSimuladoPorIA(sim, acertos, total, pct, areas);
  setTimeout(() => {
    mostrarToast('✨ A IA acabou de gerar automaticamente um novo simulado adaptativo para você!');
  }, 1200);

  // Busca outros simulados recomendados (priorizando matérias e vestibulares diferentes)
  const outros = (typeof SIMULADOS_DATA !== 'undefined' ? SIMULADOS_DATA : []).filter(s => s.id !== sim.id && s.id !== novoSimuladoIA.id);
  const recomendados = outros.slice(0, 3);
"@

if ($content.Contains($oldSnippet)) {
    $content = $content.Replace($oldSnippet, $newSnippet)
    Write-Host "Início de renderizarPainelResultadoSimulado atualizado com sucesso!"
} else {
    Write-Host "Trecho 1 não encontrado!"
}

# Agora insere o bloco visual do Simulado IA logo após as métricas
$oldMetricasEnd = @"
        <div class="metrica-stat-box">
          <span class="metrica-val">${total - acertos}</span>
          <span class="metrica-label">Erros / Em Branco</span>
        </div>
      </div>
"@

$newMetricasEnd = @"
        <div class="metrica-stat-box">
          <span class="metrica-val">${total - acertos}</span>
          <span class="metrica-label">Erros / Em Branco</span>
        </div>
      </div>

      <!-- NOVO SIMULADO CRIADO AUTOMATICAMENTE PELA IA -->
      <div class="simulado-ia-proximo-box">
        <div class="ia-box-header">
          <span class="ia-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Gerado Automaticamente por IA</span>
          <h3>✨ Novo Simulado Adaptativo Preparado para Você!</h3>
        </div>
        <p>A Inteligência Artificial do EstudaMais analisou seu desempenho neste exame e construiu automaticamente uma nova prova com <strong>`${novoSimuladoIA.questoes.length} questões</strong> especialmente focadas nos seus pontos de melhoria: <strong>`${novoSimuladoIA.focoTexto}</strong>.</p>
        <div class="ia-box-actions">
          <button class="btn-iniciar-ia-simulado" onclick="iniciarSimulado('`${novoSimuladoIA.id}')">
            <i class="fa-solid fa-bolt"></i> Iniciar Próximo Simulado da IA Agora (`${novoSimuladoIA.tempoMinutos} min)
          </button>
        </div>
      </div>
"@

if ($content.Contains($oldMetricasEnd)) {
    $content = $content.Replace($oldMetricasEnd, $newMetricasEnd)
    Write-Host "Card do Simulado IA inserido no resultado com sucesso!"
} else {
    Write-Host "Trecho 2 não encontrado!"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "js/app.js gravado com sucesso!"
