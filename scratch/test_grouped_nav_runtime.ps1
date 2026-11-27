$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$raw = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$testScript = @"
<script>
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const res = {};
        try {
            // 1. Verificar botão das 3 listras
            const btnHamburguer = document.getElementById('btn-menu-hamburguer');
            res.temBtnHamburguer = !!btnHamburguer;

            // 2. Abrir modal do menu de abas
            alternarModalMenuAbas();
            const modalMenu = document.getElementById('modal-menu-abas');
            res.modalMenuAberto = modalMenu ? modalMenu.classList.contains('active') : false;

            // 3. Contar grupos dentro do modal
            const blocos = document.querySelectorAll('.menu-aba-grupo-bloco');
            res.qtdBlocos = blocos.length;

            // 4. Testar clique em aba dentro do menu (Vídeo Aulas)
            const btnVideo = document.querySelector('.menu-aba-item-card[data-tab-alvo="videoaulas"]');
            if (btnVideo) btnVideo.click();
            res.tabAposClickMenu = AppState.currentTab;
            res.modalFechouAposClick = modalMenu ? !modalMenu.classList.contains('active') : false;

            // 5. Testar destaque do grupo pai na navbar
            const grupoConteudos = document.querySelector('.nav-group-item[data-group="conteudos"]');
            res.grupoConteudosAtivo = grupoConteudos ? grupoConteudos.classList.contains('has-active-child') : false;

            // 6. Testar toggle do dropdown Ferramentas
            const btnFerramentas = document.getElementById('btn-header-ferramentas');
            toggleDropdownFerramentas();
            const wrapperFerr = document.getElementById('wrapper-dropdown-ferramentas');
            res.dropdownFerramentasAberto = wrapperFerr ? wrapperFerr.classList.contains('aberto') : false;
            fecharTodosDropdowns();
            res.dropdownFerramentasFechou = wrapperFerr ? !wrapperFerr.classList.contains('aberto') : false;

            // 7. Testar filtro de busca no menu
            filtrarAbasNoMenu('Lousa');
            const visiveis = Array.from(document.querySelectorAll('.menu-aba-item-card')).filter(c => c.style.display !== 'none');
            res.itensAposFiltrarLousa = visiveis.length;

            res.status = 'SUCESSO_TOTAL';
        } catch (err) {
            res.error = err.message + ' ' + err.stack;
            res.status = 'ERRO';
        }

        const d = document.createElement('div');
        d.id = 'TEST_GROUPED_NAV_RESULT';
        d.textContent = JSON.stringify(res);
        document.body.appendChild(d);
    }, 500);
});
</script>
"@

$htmlWithTest = $raw.Replace('</body>', "$testScript`n</body>")
[System.IO.File]::WriteAllText('scratch/test_grouped_nav_page.html', $htmlWithTest, [System.Text.Encoding]::UTF8)

$path = (Resolve-Path 'scratch/test_grouped_nav_page.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_grouped_nav_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=5000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText($domOut, [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_GROUPED_NAV_RESULT">([^<]+)<') {
    Write-Host "RESULTADO: $($matches[1])"
} else {
    Write-Host "Elemento de teste não encontrado. DOM length: $($dom.Length)"
}
