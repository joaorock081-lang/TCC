$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<pre id="output">RUNNING</pre>
<script>
async function run() {
    try {
        const frame = document.createElement('iframe');
        frame.style.width = '1200px';
        frame.style.height = '800px';
        document.body.appendChild(frame);

        frame.onload = () => {
            const w = frame.contentWindow;
            const d = frame.contentDocument;
            const res = {};

            // 1. Total families and colors in PALETAS_CORES
            res.totalFamilias = w.PALETAS_CORES ? w.PALETAS_CORES.length : 0;
            let totalCores = 0;
            if (w.PALETAS_CORES) {
                w.PALETAS_CORES.forEach(f => { totalCores += f.cores.length; });
            }
            res.totalCores = totalCores;

            // 2. Test aplicarTema warm
            w.aplicarTema('warm', 'ambar-relax', false);
            res.themeModeAfterWarm = d.documentElement.getAttribute('data-theme');
            res.themeAccentAfterWarm = d.documentElement.getAttribute('data-accent');

            // 3. Test modal cores render
            w.abrirModalCores();
            const grid = d.getElementById('palette-colors-grid');
            res.cardsRendered = grid ? grid.querySelectorAll('.color-option-card').length : 0;
            const cardWarmActive = d.getElementById('mode-card-warm')?.classList.contains('active');
            res.cardWarmActive = cardWarmActive;

            // 4. Test cycling modes
            w.alternarModoEscuro(); // warm -> light
            res.modeAfterCycle1 = d.documentElement.getAttribute('data-theme');
            w.alternarModoEscuro(); // light -> dark
            res.modeAfterCycle2 = d.documentElement.getAttribute('data-theme');
            w.alternarModoEscuro(); // dark -> warm
            res.modeAfterCycle3 = d.documentElement.getAttribute('data-theme');

            // 5. Test filter family Turquesa
            w.filtrarFamiliaCores('Turquesa');
            res.cardsFilteredTurquesa = grid ? grid.querySelectorAll('.color-option-card').length : 0;

            document.getElementById('output').innerText = JSON.stringify(res, null, 2);
        };

        frame.src = '../index.html';
    } catch (e) {
        document.getElementById('output').innerText = 'ERROR: ' + e.message;
    }
}
run();
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_themes_warm.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_themes_warm.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\themes_warm_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--disable-web-security", "--allow-file-access-from-files", "--virtual-time-budget=6000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(12000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<pre id="output">([\s\S]*?)</pre>')
if ($m.Success) {
    Write-Host "RESULT:`n$($m.Groups[1].Value)"
}
