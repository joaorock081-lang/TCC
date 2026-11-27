$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$raw = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$testScript = @"
<script>
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const res = {};
        try {
            // 1. Ir para a aba videoaulas
            mudarAba('videoaulas');

            // 2. Verificar que não existe mais btn-canal-assistir nos cards
            const btnsAssistirCards = document.querySelectorAll('.canal-card .btn-canal-assistir');
            res.qtdBtnsAssistirCards = btnsAssistirCards.length;

            // 3. Verificar que os cards têm btn-canal-youtube-full
            const btnsCanalFull = document.querySelectorAll('.canal-card .btn-canal-youtube-full');
            res.qtdBtnsCanalFull = btnsCanalFull.length;

            // 4. Testar o player no topo: Assistir Aula Aqui
            const inputUrl = document.getElementById('input-video-url-topo');
            res.temInputUrlTopo = !!inputUrl;

            // Carregar vídeo via URL
            carregarVideoPersonalizadoTopo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            const iframe = document.getElementById('iframe-video-player-topo');
            const areaAtiva = document.getElementById('area-video-ativa-topo');
            res.iframeTemSrc = iframe ? iframe.src.includes('dQw4w9WgXcQ') : false;
            res.areaAtivaVisivel = areaAtiva ? (areaAtiva.style.display !== 'none') : false;

            // 5. Testar alternar para ferramenta Lousa sob o vídeo
            alternarAbaFerramentaVideo('lousa');
            const painelLousa = document.getElementById('painel-video-lousa');
            res.painelLousaVisivel = painelLousa ? (painelLousa.style.display !== 'none') : false;

            // 6. Testar lousa flutuante no modo escuro (grid de quadradinhos)
            document.documentElement.setAttribute('data-theme', 'dark');
            const lousaWrapper = document.querySelector('.lousa-canvas-wrapper');
            const styleLousa = window.getComputedStyle(lousaWrapper);
            res.lousaDarkTemGrid = styleLousa.backgroundImage.includes('linear-gradient');

            // 7. Testar cores da lousa flutuante (deve ter 10 cores incluindo branco #ffffff)
            const coresBtns = document.querySelectorAll('#lousa-rascunho .lousa-cor-btn');
            res.qtdCoresLousa = coresBtns.length;
            res.temCorBranca = Array.from(coresBtns).some(b => b.getAttribute('onclick').includes('#ffffff'));

            res.status = 'SUCESSO_TOTAL';
        } catch (err) {
            res.error = err.message + ' ' + err.stack;
            res.status = 'ERRO';
        }

        const d = document.createElement('div');
        d.id = 'TEST_VIDEO_LOUSA_RESULT';
        d.textContent = JSON.stringify(res);
        document.body.appendChild(d);
    }, 600);
});
</script>
"@

$htmlWithTest = $raw.Replace('</body>', "$testScript`n</body>")
[System.IO.File]::WriteAllText('scratch/test_video_lousa_page.html', $htmlWithTest, [System.Text.Encoding]::UTF8)

$path = (Resolve-Path 'scratch/test_video_lousa_page.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\test_video_lousa_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=6000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

Start-Sleep -Seconds 1

$dom = [System.IO.File]::ReadAllText($domOut, [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_VIDEO_LOUSA_RESULT">([^<]+)<') {
    Write-Host "RESULTADO: $($matches[1])"
} else {
    Write-Host "Elemento de teste não encontrado. DOM length: $($dom.Length)"
}
