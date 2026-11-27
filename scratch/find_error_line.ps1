$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<pre id="output">START</pre>
<script>
async function test() {
    const res = await fetch('../js/app.js');
    const text = await res.text();
    const lines = text.split('\n');
    
    // Find where the syntax error is by testing chunks
    let low = 0;
    let high = lines.length;
    let badLine = -1;
    let lastErr = '';

    // First verify if whole text fails
    try {
        new Function(text);
        document.getElementById('output').innerText = 'NO_ERROR';
        return;
    } catch (e) {
        lastErr = e.message;
    }

    // Binary search for prefix that introduces syntax error
    // Note: since JS blocks need closing brackets, let's find syntax error by checking eval or inspecting the error message
    // Actually, in Chrome/Edge, e.stack or error event gives line and col if we inject script as Blob URL!
    const blob = new Blob([text], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    
    window.onerror = function(msg, src, line, col, err) {
        document.getElementById('output').innerText = 'LINE: ' + line + ' COL: ' + col + ' MSG: ' + msg + '\nCONTENT: ' + lines[line - 1];
    };
    
    const s = document.createElement('script');
    s.src = url;
    document.body.appendChild(s);
}
test();
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/find_error_line.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/find_error_line.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\find_error_line_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=4000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<pre id="output">([\s\S]*?)</pre>')
if ($m.Success) {
    Write-Host "RESULT: $($m.Groups[1].Value)"
}
