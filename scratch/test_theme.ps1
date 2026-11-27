$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$testScript = @"
window.addEventListener('load', () => {
    aplicarTema('dark', 'roxo-ametista', false);
    const btn = document.querySelector('.btn-hero-primary');
    const comp = window.getComputedStyle(btn);
    const div = document.createElement('div');
    div.id = 'THEME_TEST_OUTPUT';
    div.textContent = JSON.stringify({
        bg: comp.backgroundImage || comp.backgroundColor,
        color: comp.color,
        varAccent: getComputedStyle(document.body).getPropertyValue('--primary-accent').trim(),
        varLight: getComputedStyle(document.body).getPropertyValue('--primary-light').trim()
    });
    document.body.appendChild(div);
});
"@

$htmlWithTest = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.Encoding]::UTF8)
$htmlWithTest = $htmlWithTest.Replace("</body>", "<script>`n" + $testScript + "`n</script></body>")
[System.IO.File]::WriteAllText("$PWD\scratch\test_theme.html", $htmlWithTest, [System.Text.Encoding]::UTF8)

$testUrl = "file:///" + ($PWD.Path -replace '\\', '/') + "/scratch/test_theme.html"
$proc = Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--dump-dom", "`"$testUrl`"" -NoNewWindow -PassThru -RedirectStandardOutput "$PWD\scratch\test_theme_dom.html"
$proc.WaitForExit(10000)
Start-Sleep -Milliseconds 800

$dom = [System.IO.File]::ReadAllText("$PWD\scratch\test_theme_dom.html", [System.Text.Encoding]::UTF8)
if ($dom -match 'id="THEME_TEST_OUTPUT">([^<]+)<') {
    Write-Host "THEME_TEST_OUTPUT: $($matches[1])"
} else {
    Write-Host "THEME_TEST_OUTPUT não encontrado!"
}
