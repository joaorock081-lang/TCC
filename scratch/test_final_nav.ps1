$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$raw = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$testScript = @"
<script>
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const res = {};
        try {
            // 1. Botão das 3 listras
            const btnHamburguer = document.getElementById('btn-menu-hamburguer');
            const styleBtn = window.getComputedStyle(btnHamburguer);
            res.btnBg = styleBtn.backgroundColor;
            res.btnColor = styleBtn.color;
            res.btnText = btnHamburguer.textContent.trim();

            // 2. Verificar que apenas 1 aba está ativa
            const abasAtivasIniciais = document.querySelectorAll('.tab-content.active');
            res.qtdAbasAtivasInicio = abasAtivasIniciais.length;
            res.abaAtivaId = abasAtivasIniciais[0] ? abasAtivasIniciais[0].id : null;

            // 3. Testar clique em Cronograma
            mudarAba('cronograma');
            const abasAtivasCronograma = document.querySelectorAll('.tab-content.active');
            res.qtdAbasAtivasCronograma = abasAtivasCronograma.length;
            res.abaAtivaCronogramaId = abasAtivasCronograma[0] ? abasAtivasCronograma[0].id : null;

            // 4. Abrir modal do menu de abas
            alternarModalMenuAbas();
            const modalMenu = document.getElementById('modal-menu-abas');
            res.modalMenuAberto = modalMenu ? modalMenu.classList.contains('active') : false;

            // 5. Testar clique em Vídeo Aulas no modal
            const btnVideo = document.querySelector('.menu-aba-item-card[data-tab-alvo="videoaulas"]');
            if (btnVideo) btnVideo.click();
            res.tabAposClickModal = AppState.currentTab;
            res.modalFechado = modalMenu ? !modalMenu.classList.contains('active') : false;
            const abasAtivasVideo = document.querySelectorAll('.tab-content.active');
            res.qtdAbasAtivasVideo = abasAtivasVideo.length;
            res.abaAtivaVideoId = abasAtivasVideo[0] ? abasAtivasVideo[0].id : null;

            // 6. Verificar que a área do usuário à direita está presente e não oculta
            const userArea = document.getElementById('header-user-area');
            res.userAreaExiste = !!userArea;
            const headerActions = document.querySelector('.header-actions');
            res.headerActionsVisible = !!headerActions;

            res.status = 'SUCESSO_TOTAL';
        } catch (err) {
            res.error = err.message + ' ' + err.stack;
            res.status = 'ERRO';
        }

        const d = document.createElement('div');
        d.id = 'TEST_FINAL_NAV_RESULT';
        d.textContent = JSON.stringify(res);
        document.body.appendChild(d);
    }, 500);
});
</script>
"@

$htmlWithTest = $raw.Replace('</body>', "$testScript`n</body>")
[System.IO.File]::WriteAllText('scratch/test_final_nav_page.html', $htmlWithTest, [System.Text.Encoding]::UTF8)

$path = (Resolve-Path 'scratch/test_final_nav_page.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_final_nav_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=5000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText($domOut, [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_FINAL_NAV_RESULT">([^<]+)<') {
    Write-Host "RESULTADO: $($matches[1])"
} else {
    Write-Host "Elemento de teste não encontrado. DOM length: $($dom.Length)"
}
