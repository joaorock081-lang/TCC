$tplPath = "$PWD\index_template.html"
$tplContent = [System.IO.File]::ReadAllText($tplPath, [System.Text.Encoding]::UTF8)

# 1. Adicionar Botões no Carrossel Superior da Nav
$targetNav = @"
            <li>
              <button class="nav-btn" data-tab="perfil">
                <i class="fa-solid fa-user-graduate"></i>
                <span class="nav-clean-2lines">Meu Perfil<br>& Carreira</span>
              </button>
            </li>
"@

$replaceNav = @"
            <li>
              <button class="nav-btn" data-tab="cronograma">
                <i class="fa-solid fa-calendar-days"></i>
                <span class="nav-clean-2lines">Cronogramas<br>& Metas</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="chat-ia">
                <i class="fa-solid fa-brain-circuit"></i>
                <span class="nav-clean-2lines">Tutor IA<br>& Gemini</span>
              </button>
            </li>
            <li>
              <button class="nav-btn" data-tab="perfil">
                <i class="fa-solid fa-user-graduate"></i>
                <span class="nav-clean-2lines">Meu Perfil<br>& Carreira</span>
              </button>
            </li>
"@

if ($tplContent.Contains($targetNav)) {
    $tplContent = $tplContent.Replace($targetNav, $replaceNav)
    Write-Host "Nav superior atualizada com abas de Cronograma e Chat IA!" -ForegroundColor Green
} else {
    Write-Host "Aviso: targetNav não encontrado" -ForegroundColor Yellow
}

# 2. Adicionar Botões Rápidos no Hero Banner
$targetHero = @"
            <button class="btn-hero-secondary" data-goto="quiz">
              <i class="fa-solid fa-gamepad"></i>
              <span>Quiz & Exercícios</span>
            </button>
          </div>
"@

$replaceHero = @"
            <button class="btn-hero-secondary" data-goto="quiz">
              <i class="fa-solid fa-gamepad"></i>
              <span>Quiz & Exercícios</span>
            </button>
            <button class="btn-hero-secondary" data-goto="cronograma">
              <i class="fa-solid fa-calendar-days"></i>
              <span>Cronograma Semanal</span>
            </button>
            <button class="btn-hero-secondary" data-goto="chat-ia" style="border-color: var(--primary-accent); background: color-mix(in srgb, var(--primary-accent) 20%, transparent);">
              <i class="fa-solid fa-brain-circuit" style="color: var(--primary-accent-light, #93c5fd);"></i>
              <span>Tutor IA & Gemini</span>
            </button>
          </div>
"@

if ($tplContent.Contains($targetHero)) {
    $tplContent = $tplContent.Replace($targetHero, $replaceHero)
    Write-Host "Botões rápidos do Hero atualizados!" -ForegroundColor Green
} else {
    Write-Host "Aviso: targetHero não encontrado" -ForegroundColor Yellow
}

# 3. Inserir as Seções <section id="tab-chat-ia"> e <section id="tab-cronograma"> antes de </main>
$sectionsHtml = [System.IO.File]::ReadAllText("$PWD\scratch\new_sections.html", [System.Text.Encoding]::UTF8)

$targetMain = @"
    </section>

  </main>
"@

$replaceMain = @"
    </section>

$sectionsHtml

  </main>
"@

if ($tplContent.Contains($targetMain)) {
    $tplContent = $tplContent.Replace($targetMain, $replaceMain)
    Write-Host "Seções de Chat IA e Cronograma inseridas no main!" -ForegroundColor Green
} else {
    Write-Host "Aviso: targetMain não encontrado" -ForegroundColor Yellow
}

# 4. Inserir os novos Modais antes de </body>
$modalsHtml = [System.IO.File]::ReadAllText("$PWD\scratch\new_modals.html", [System.Text.Encoding]::UTF8)

$targetFooter = @"
  <!-- ========================================================
       RODAPÉ DO SITE COM LINKS RÁPIDOS
"@

$replaceFooter = @"
$modalsHtml

  <!-- ========================================================
       RODAPÉ DO SITE COM LINKS RÁPIDOS
"@

if ($tplContent.Contains($targetFooter)) {
    $tplContent = $tplContent.Replace($targetFooter, $replaceFooter)
    Write-Host "Modais de Cronograma IA e Tarefas inseridos!" -ForegroundColor Green
} else {
    Write-Host "Aviso: targetFooter não encontrado" -ForegroundColor Yellow
}

# 5. Adicionar botões no mobile-bottom-nav
$targetMobile = @"
    <button class="mobile-nav-btn" data-tab="perfil" onclick="mudarAba('perfil')">
      <i class="fa-solid fa-user-graduate"></i>
      <span>Perfil</span>
    </button>
"@

$replaceMobile = @"
    <button class="mobile-nav-btn" data-tab="cronograma" onclick="mudarAba('cronograma')">
      <i class="fa-solid fa-calendar-days"></i>
      <span>Cronograma</span>
    </button>
    <button class="mobile-nav-btn" data-tab="chat-ia" onclick="mudarAba('chat-ia')">
      <i class="fa-solid fa-brain-circuit"></i>
      <span>Tutor IA</span>
    </button>
    <button class="mobile-nav-btn" data-tab="perfil" onclick="mudarAba('perfil')">
      <i class="fa-solid fa-user-graduate"></i>
      <span>Perfil</span>
    </button>
"@

if ($tplContent.Contains($targetMobile)) {
    $tplContent = $tplContent.Replace($targetMobile, $replaceMobile)
    Write-Host "Mobile bottom nav atualizado com Cronograma e Tutor IA!" -ForegroundColor Green
} else {
    Write-Host "Aviso: targetMobile não encontrado" -ForegroundColor Yellow
}

[System.IO.File]::WriteAllText($tplPath, $tplContent, [System.Text.Encoding]::UTF8)
Write-Host "index_template.html atualizado com sucesso!" -ForegroundColor Green
