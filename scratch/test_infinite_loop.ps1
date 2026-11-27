$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="output">START</div>
<script>
let count = 0;
function gerenciarBloqueioScrollModal() {
  count++;
  if (count > 1000) {
    document.getElementById('output').innerText = 'INFINITE_LOOP_DETECTED: count > 1000';
    throw new Error('INFINITE LOOP DETECTED');
  }
  const algumAtivo = document.querySelector('.modal-overlay.active, .modal.active');
  if (algumAtivo) {
    document.body.classList.add('modal-aberto');
    document.documentElement.classList.add('modal-aberto');
  } else {
    document.body.classList.remove('modal-aberto');
    document.documentElement.classList.remove('modal-aberto');
  }
}

const observer = new MutationObserver((mutations) => {
    gerenciarBloqueioScrollModal();
});
observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

// Trigger one class change
document.body.classList.add('test-class');

setTimeout(() => {
    document.getElementById('output').innerText = 'NORMAL_EXECUTION_COUNT_' + count;
}, 500);
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_loop.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_loop.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\loop_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=2000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(5000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<div id="output">([\s\S]*?)</div>')
if ($m.Success) {
    Write-Host "RESULT: $($m.Groups[1].Value)"
}
