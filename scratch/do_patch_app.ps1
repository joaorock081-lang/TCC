$lines = [System.IO.File]::ReadAllLines("$PWD\js\app.js", [System.Text.Encoding]::UTF8)

$novasLinhasInicio = @(
  '  // Gera automaticamente o próximo simulado adaptativo por IA com base no desempenho',
  '  const novoSimuladoIA = criarProximoSimuladoPorIA(sim, acertos, total, pct, areas);',
  '  setTimeout(() => {',
  '    mostrarToast("✨ A IA preparou automaticamente seu próximo simulado adaptativo!");',
  '  }, 1200);',
  '',
  '  // Busca outros simulados recomendados (priorizando matérias e vestibulares diferentes)',
  '  const outros = (typeof SIMULADOS_DATA !== "undefined" ? SIMULADOS_DATA : []).filter(s => s.id !== sim.id && s.id !== novoSimuladoIA.id);',
  '  const recomendados = outros.slice(0, 3);'
)

$linhasAntes = $lines[0..4993]
$linhasDepoisInicio = $lines[4997..5021]

$blocoCardIA = @(
  '      <!-- NOVO SIMULADO CRIADO AUTOMATICAMENTE PELA IA -->',
  '      <div class="simulado-ia-proximo-box">',
  '        <div class="ia-box-header">',
  '          <span class="ia-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Gerado Automaticamente por IA</span>',
  '          <h3>✨ Novo Simulado Adaptativo Preparado para Você!</h3>',
  '        </div>',
  '        <p>A Inteligência Artificial do EstudaMais analisou seu desempenho neste exame e construiu automaticamente uma nova prova com <strong>${novoSimuladoIA.questoes.length} questões</strong> especialmente focadas nos seus pontos de melhoria: <strong>${novoSimuladoIA.focoTexto}</strong>.</p>',
  '        <div class="ia-box-actions">',
  '          <button class="btn-iniciar-ia-simulado" onclick="iniciarSimulado(''${novoSimuladoIA.id}'')">',
  '            <i class="fa-solid fa-bolt"></i> Iniciar Próximo Simulado da IA Agora (${novoSimuladoIA.tempoMinutos} min)',
  '          </button>',
  '        </div>',
  '      </div>',
  ''
)

$linhasRestantes = $lines[5022..($lines.Length - 1)]

$resultado = $linhasAntes + $novasLinhasInicio + $linhasDepoisInicio + $blocoCardIA + $linhasRestantes

[System.IO.File]::WriteAllLines("$PWD\js\app.js", $resultado, [System.Text.Encoding]::UTF8)
Write-Host "Patch aplicado com sucesso em js/app.js!"
