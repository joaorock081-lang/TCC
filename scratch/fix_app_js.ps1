$target = @"
function gerarCronogramaInicialPadrao() {
  const user = AppState.currentUser;
  const vest = user && user.vestibular ? user.vestibular : 'ENEM';

  AppState.cronograma.semanaAtual = AppState.cronograma.semanaAtual || 1;
  AppState.cronograma.diasEstudoPorSemana = AppState.cronograma.diasEstudoPorSemana || 5;
  AppState.cronograma.horasPorDia = AppState.cronograma.horasPorDia || 4;
  AppState.cronograma.xp = AppState.cronograma.xp || 0;
  AppState.cronograma.streakDias = AppState.cronograma.streakDias || 1;
  
  if (typeof gerarGradeSemanaCurricular === 'function') {
    AppState.cronograma.planoSemanal = gerarGradeSemanaCurricular(
      AppState.cronograma.semanaAtual,
      AppState.cronograma.diasEstudoPorSemana,
      AppState.cronograma.horasPorDia
    );
  } else {
    AppState.cronograma.planoSemanal = {
      "Segunda": [
        { id: "c-seg-1", materia: "Matemática", topico: "Funções e Equações", tempo: "90 min", concluido: false },
        { id: "c-seg-2", materia: "Física", topico: "Mecânica e Cinemática", tempo: "90 min", concluido: false },
        { id: "c-seg-3", materia: "Exercícios", topico: "15 Questões com Cronômetro", tempo: "60 min", concluido: false }
      ],
      "Terça": [
        { id: "c-ter-1", materia: "Biologia", topico: "Ecologia e Meio Ambiente", tempo: "90 min", concluido: false },
        { id: "c-ter-2", materia: "Química", topico: "Estequiometria Básica", tempo: "90 min", concluido: false },
        { id: "c-ter-3", materia: "Redação", topico: "Treino de Tese e Proposta", tempo: "60 min", concluido: false }
      ]
    };
  }
      { id: "c-ter-2", materia: "Química", topico: "Estequiometria e Soluções", tempo: "90 min", concluido: false },
      { id: "c-ter-3", materia: "Revisão", topico: "Flashcards e Mapa Mental", tempo: "60 min", concluido: false }
    ],
    "Quarta": [
      { id: "c-qua-1", materia: "Linguagens", topico: "Interpretação e Figuras de Linguagem", tempo: "90 min", concluido: false },
      { id: "c-qua-2", materia: "História", topico: "Brasil Império e República", tempo: "90 min", concluido: false },
      { id: "c-qua-3", materia: "Redação", topico: "Produção de Redação com IA", tempo: "60 min", concluido: false }
    ],
    "Quinta": [
      { id: "c-qui-1", materia: "Geografia", topico: "Geopolítica e Climatologia", tempo: "90 min", concluido: false },
      { id: "c-qui-2", materia: "Filosofia / Sociologia", topico: "Cidadania e Pensadores Contemporâneos", tempo: "90 min", concluido: false },
      { id: "c-qui-3", materia: "Exercícios", topico: "Questões do " + vest, tempo: "60 min", concluido: false }
    ],
    "Sexta": [
      { id: "c-sex-1", materia: "Matemática", topico: "Geometria Plana e Espacial", tempo: "90 min", concluido: false },
      { id: "c-sex-2", materia: "Química Orgânica", topico: "Funções Oxigenadas e Nitrogenadas", tempo: "90 min", concluido: false },
      { id: "c-sex-3", materia: "Simulado", topico: "Treino Rápido na Arena de Quiz", tempo: "60 min", concluido: false }
    ],
    "Sábado": [
      { id: "c-sab-1", materia: "Revisão Geral", topico: "Caderno de Erros da Semana", tempo: "90 min", concluido: false },
      { id: "c-sab-2", materia: "Redação", topico: "Reescrita e Ajustes de Competência", tempo: "90 min", concluido: false }
    ]
  };
  salvarCronogramaStorage();
}
"@

$replacement = @"
function gerarCronogramaInicialPadrao() {
  const user = AppState.currentUser;
  const vest = user && user.vestibular ? user.vestibular : 'ENEM';

  AppState.cronograma.semanaAtual = AppState.cronograma.semanaAtual || 1;
  AppState.cronograma.diasEstudoPorSemana = AppState.cronograma.diasEstudoPorSemana || 5;
  AppState.cronograma.horasPorDia = AppState.cronograma.horasPorDia || 4;
  AppState.cronograma.xp = AppState.cronograma.xp || 0;
  AppState.cronograma.streakDias = AppState.cronograma.streakDias || 1;
  
  if (typeof gerarGradeSemanaCurricular === 'function') {
    AppState.cronograma.planoSemanal = gerarGradeSemanaCurricular(
      AppState.cronograma.semanaAtual,
      AppState.cronograma.diasEstudoPorSemana,
      AppState.cronograma.horasPorDia
    );
  } else {
    AppState.cronograma.planoSemanal = {
      "Segunda": [
        { id: "c-seg-1", materia: "Matemática", topico: "Funções e Equações", tempo: "90 min", concluido: false },
        { id: "c-seg-2", materia: "Física", topico: "Mecânica e Cinemática", tempo: "90 min", concluido: false },
        { id: "c-seg-3", materia: "Exercícios", topico: "15 Questões com Cronômetro", tempo: "60 min", concluido: false }
      ],
      "Terça": [
        { id: "c-ter-1", materia: "Biologia", topico: "Ecologia e Meio Ambiente", tempo: "90 min", concluido: false },
        { id: "c-ter-2", materia: "Química", topico: "Estequiometria e Soluções", tempo: "90 min", concluido: false },
        { id: "c-ter-3", materia: "Revisão", topico: "Flashcards e Mapa Mental", tempo: "60 min", concluido: false }
      ],
      "Quarta": [
        { id: "c-qua-1", materia: "Linguagens", topico: "Interpretação e Figuras de Linguagem", tempo: "90 min", concluido: false },
        { id: "c-qua-2", materia: "História", topico: "Brasil Império e República", tempo: "90 min", concluido: false },
        { id: "c-qua-3", materia: "Redação", topico: "Produção de Redação com IA", tempo: "60 min", concluido: false }
      ],
      "Quinta": [
        { id: "c-qui-1", materia: "Geografia", topico: "Geopolítica e Climatologia", tempo: "90 min", concluido: false },
        { id: "c-qui-2", materia: "Filosofia / Sociologia", topico: "Cidadania e Pensadores Contemporâneos", tempo: "90 min", concluido: false },
        { id: "c-qui-3", materia: "Exercícios", topico: "Questões do " + vest, tempo: "60 min", concluido: false }
      ],
      "Sexta": [
        { id: "c-sex-1", materia: "Matemática", topico: "Geometria Plana e Espacial", tempo: "90 min", concluido: false },
        { id: "c-sex-2", materia: "Química Orgânica", topico: "Funções Oxigenadas e Nitrogenadas", tempo: "90 min", concluido: false },
        { id: "c-sex-3", materia: "Simulado", topico: "Treino Rápido na Arena de Quiz", tempo: "60 min", concluido: false }
      ],
      "Sábado": [
        { id: "c-sab-1", materia: "Revisão Geral", topico: "Caderno de Erros da Semana", tempo: "90 min", concluido: false },
        { id: "c-sab-2", materia: "Redação", topico: "Reescrita e Ajustes de Competência", tempo: "90 min", concluido: false }
      ]
    };
  }
  salvarCronogramaStorage();
}
"@

$raw = [System.IO.File]::ReadAllText('js/app.js', [System.Text.Encoding]::UTF8)
$normalizedRaw = $raw.Replace("`r`n", "`n")
$normalizedTarget = $target.Replace("`r`n", "`n")
$normalizedReplacement = $replacement.Replace("`r`n", "`n")

if ($normalizedRaw.Contains($normalizedTarget)) {
    $newRaw = $normalizedRaw.Replace($normalizedTarget, $normalizedReplacement)
    [System.IO.File]::WriteAllText('js/app.js', $newRaw, [System.Text.Encoding]::UTF8)
    Write-Host "Replaced successfully!"
} else {
    Write-Host "Target not found in normalized text!"
}
