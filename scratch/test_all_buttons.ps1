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
        const res = await fetch('../index.html');
        const text = await res.text();
        
        // 1. Verify scripts parse cleanly
        const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
        let match;
        let scriptIndex = 0;
        const parseResults = [];
        while ((match = scriptRegex.exec(text)) !== null) {
            try {
                new Function(match[1]);
                parseResults.push('Script ' + scriptIndex + ': OK');
            } catch (err) {
                parseResults.push('Script ' + scriptIndex + ' ERROR: ' + err.message);
            }
            scriptIndex++;
        }

        // 2. Test in iframe to simulate live user actions
        const frame = document.createElement('iframe');
        frame.style.width = '1200px';
        frame.style.height = '800px';
        document.body.appendChild(frame);

        frame.onload = () => {
            const w = frame.contentWindow;
            const d = frame.contentDocument;

            const actions = [];
            
            // Check abrirModalGerarCronogramaIA
            if (typeof w.abrirModalGerarCronogramaIA === 'function') {
                w.abrirModalGerarCronogramaIA();
                const mCrono = d.getElementById('modal-gerar-cronograma-ia');
                const aberto = mCrono && mCrono.classList.contains('active');
                const bodyAberto = d.body.classList.contains('modal-aberto');
                actions.push('abrirModalGerarCronogramaIA: ' + (aberto && bodyAberto ? 'OK' : 'FAIL'));
                
                w.fecharModalGerarCronogramaIA();
                const fechado = mCrono && !mCrono.classList.contains('active');
                actions.push('fecharModalGerarCronogramaIA: ' + (fechado ? 'OK' : 'FAIL'));
            } else {
                actions.push('abrirModalGerarCronogramaIA function missing');
            }

            // Check abrirModalConfigGemini
            if (typeof w.abrirModalConfigGemini === 'function') {
                w.abrirModalConfigGemini();
                const mGemini = d.getElementById('modal-config-gemini');
                const aberto = mGemini && mGemini.classList.contains('active');
                actions.push('abrirModalConfigGemini: ' + (aberto ? 'OK' : 'FAIL'));
                
                w.fecharModalConfigGemini();
                const fechado = mGemini && !mGemini.classList.contains('active');
                actions.push('fecharModalConfigGemini: ' + (fechado ? 'OK' : 'FAIL'));
            } else {
                actions.push('abrirModalConfigGemini function missing');
            }

            // Check semana change
            if (typeof w.mudarSemanaCronograma === 'function') {
                w.mudarSemanaCronograma(1);
                actions.push('mudarSemanaCronograma: Semana ' + w.AppState.cronograma.semanaAtual);
            }

            const finalReport = {
                parseResults: parseResults,
                actions: actions,
                status: 'ALL_TESTS_COMPLETED'
            };

            document.getElementById('output').innerText = JSON.stringify(finalReport, null, 2);
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

Set-Content -Path 'scratch/test_live_actions.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_live_actions.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\live_actions_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--disable-web-security", "--allow-file-access-from-files", "--virtual-time-budget=6000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(12000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<pre id="output">([\s\S]*?)</pre>')
if ($m.Success) {
    Write-Host "RESULT:`n$($m.Groups[1].Value)"
}
