$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$raw = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$testScript = @"
<script>
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const res = {};
        try {
            res.appStateExists = !!window.AppState;
            res.canaisDataCount = typeof CANAIS_YOUTUBE_DATA !== 'undefined' ? CANAIS_YOUTUBE_DATA.length : 0;
            
            // 1. Mudar para aba videoaulas
            mudarAba('videoaulas');
            res.currentTab = AppState.currentTab;
            
            // 2. Contar cards renderizados
            const cards = document.querySelectorAll('#videoaulas-grid .canal-card');
            res.cardsCountTotal = cards.length;
            
            // 3. Filtrar por matemática (deve dar 3)
            filtrarDisciplinaVideoaulas('matematica');
            res.cardsCountMatematica = document.querySelectorAll('#videoaulas-grid .canal-card').length;
            
            // 4. Buscar Ferretto (deve dar 1)
            buscarVideoaulas('Ferretto');
            res.cardsCountFerretto = document.querySelectorAll('#videoaulas-grid .canal-card').length;

            // 5. Testar abertura do player modal
            abrirModalPlayerVideo('mock123', 'Aula Teste', 'Canal Teste', 'Prof Teste', 'https://youtube.com');
            const modal = document.getElementById('modal-video-aula-player');
            const iframe = document.getElementById('video-aula-iframe');
            res.modalActive = modal ? modal.classList.contains('active') : false;
            res.iframeHasSrc = iframe ? iframe.src.includes('mock123') : false;

            // 6. Fechar player modal
            fecharModalPlayerVideo();
            res.modalClosed = modal ? !modal.classList.contains('active') : false;

            // 7. Teste de formatação de matemática limpa
            const rawMath = 'Fórmula: \\\\[ \\\\text{PV} = \\\\frac{C}{(1+r)^n} \\\\]';
            res.mathParsed = formatarMarkdownChat(rawMath);
            res.mathHasRawBackslash = res.mathParsed.includes('\\\\text') || res.mathParsed.includes('\\\\[') || res.mathParsed.includes('\\\\]');

            res.status = 'SUCESSO_TOTAL';
        } catch (err) {
            res.error = err.message + ' ' + err.stack;
            res.status = 'ERRO';
        }

        const d = document.createElement('div');
        d.id = 'TEST_VIDEOAULAS_RESULT';
        d.textContent = JSON.stringify(res);
        document.body.appendChild(d);
    }, 500);
});
</script>
"@

$htmlWithTest = $raw.Replace('</body>', "$testScript`n</body>")
[System.IO.File]::WriteAllText('scratch/test_videoaulas_page.html', $htmlWithTest, [System.Text.Encoding]::UTF8)

$path = (Resolve-Path 'scratch/test_videoaulas_page.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_videoaulas_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=5000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText($domOut, [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_VIDEOAULAS_RESULT">([^<]+)<') {
    Write-Host "RESULTADO: $($matches[1])"
} else {
    Write-Host "Elemento de teste não encontrado. DOM length: $($dom.Length)"
}
