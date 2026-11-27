$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$testScript = @"
function executarTestes() {
    try {
        const results = {};
        
        // 1. Teste de visibilidade no modo claro
        if (typeof window.aplicarTema === 'function') {
            window.aplicarTema('light', 'azul-marinho', false);
        }
        const tourSpan = document.querySelector('.btn-header-tour span');
        results.tourSpanColor = tourSpan ? window.getComputedStyle(tourSpan).color : null;
        const paletteSpan = document.querySelector('.btn-header-palette span');
        results.paletteSpanDisplay = paletteSpan ? window.getComputedStyle(paletteSpan).display : null;
        
        // 2. Teste de Scroll-Lock ao abrir e fechar modal
        if (typeof window.abrirModalNovaTarefaCronograma === 'function') {
            window.abrirModalNovaTarefaCronograma('Segunda');
        }
        if (typeof gerenciarBloqueioScrollModal === 'function') {
            gerenciarBloqueioScrollModal();
        }
        results.bodyHasModalOpenOnShow = document.body.classList.contains('modal-aberto');
        if (typeof window.fecharModalNovaTarefaCronograma === 'function') {
            window.fecharModalNovaTarefaCronograma();
        }
        if (typeof gerenciarBloqueioScrollModal === 'function') {
            gerenciarBloqueioScrollModal();
        }
        results.bodyHasModalOpenOnHide = document.body.classList.contains('modal-aberto');
        
        // 3. Teste de troca de semana no cronograma
        if (typeof window.mudarAba === 'function') {
            window.mudarAba('cronograma');
        }
        if (typeof window.mudarSemanaCronograma === 'function') {
            window.mudarSemanaCronograma(1); // Vai para Semana 2
        }
        const tagSemana = document.getElementById('cronograma-tag-semana')?.innerText;
        const temaSemana = document.getElementById('cronograma-tema-semana')?.innerText;
        const tarefasSegunda = window.AppState && window.AppState.cronograma && window.AppState.cronograma.planoSemanal ? window.AppState.cronograma.planoSemanal['Segunda'] : [];
        results.cronograma = {
            semanaAtual: window.AppState ? window.AppState.cronograma.semanaAtual : null,
            tagSemana: tagSemana,
            temaSemana: temaSemana,
            primeiraMateriaSegunda: tarefasSegunda[0] ? tarefasSegunda[0].materia : null,
            primeiroTopicoSegunda: tarefasSegunda[0] ? tarefasSegunda[0].topico : null
        };
        
        // 4. Teste de Formatação de LaTeX Math no Chat
        const exemploLaTeX = '1. Identificar as variáveis\n• \\( C = 5.000 \\) (custo futuro)\n• \\( n = 12 \\) (meses)\n• \\( r \\) = taxa de juros (ex: 1% ao mês)\n\n2. Usar a fórmula de juros compostos\n\\[\n\\text{PV} = \\frac{C}{(1+r)^n}\n\\]\n\\[\n\\text{PV} = \\frac{5.000}{(1+0,01)^{12}} \\approx 4.455,96\n\\]';
        const formatado = (typeof window.formatarMarkdownChat === 'function') ? window.formatarMarkdownChat(exemploLaTeX) : 'nao_definida';
        results.latexCleaning = {
            temBarraColchete: formatado.includes('\\['),
            temBarraParenteses: formatado.includes('\\('),
            temTextCru: formatado.includes('\\text{'),
            temFracCru: formatado.includes('\\frac{'),
            temApproxCru: formatado.includes('\\approx'),
            temMathBlock: formatado.includes('chat-math-block'),
            temMathInline: formatado.includes('chat-math-inline'),
            htmlGerado: formatado
        };

        const out = document.createElement('div');
        out.id = 'TEST_OUTPUT_WEEK_CHAT';
        out.textContent = JSON.stringify(results);
        document.body.appendChild(out);
    } catch (err) {
        const out = document.createElement('div');
        out.id = 'TEST_OUTPUT_WEEK_CHAT';
        out.textContent = JSON.stringify({ error: err.message, stack: err.stack });
        document.body.appendChild(out);
    }
}
executarTestes();
"@

$htmlWithTest = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$htmlWithTest = $htmlWithTest.Replace("</body>", "<script>`n" + $testScript + "`n</script></body>")
[System.IO.File]::WriteAllText("$PWD\scratch\test_week_chat_run.html", $htmlWithTest, [System.Text.Encoding]::UTF8)

$testUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/scratch/test_week_chat_run.html"
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=2500", "--dump-dom", "`"$testUrl`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\test_week_chat_dom.html"
$proc.WaitForExit(10000)
Start-Sleep -Milliseconds 1200

$dom = [System.IO.File]::ReadAllText("$PWD\scratch\test_week_chat_dom.html", [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_OUTPUT_WEEK_CHAT">([^<]+)<') {
    Write-Host "RESULTADOS DO TESTE: $($matches[1])"
} else {
    Write-Host "TEST_OUTPUT_WEEK_CHAT não encontrado!"
}
