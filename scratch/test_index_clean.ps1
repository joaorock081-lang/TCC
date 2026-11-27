$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$testHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<pre id="output">WAITING</pre>
<script>
async function run() {
    try {
        const res = await fetch('../index.html');
        const text = await res.text();
        
        // Extract script tags
        const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
        let match;
        let scriptIndex = 0;
        const results = [];
        
        while ((match = scriptRegex.exec(text)) !== null) {
            try {
                new Function(match[1]);
                results.push('Script ' + scriptIndex + ': OK');
            } catch (err) {
                results.push('Script ' + scriptIndex + ' ERROR: ' + err.message);
            }
            scriptIndex++;
        }
        
        document.getElementById('output').innerText = results.join('\n');
    } catch (e) {
        document.getElementById('output').innerText = 'FETCH_ERR: ' + e.message;
    }
}
run();
</script>
</body>
</html>
"@

Set-Content -Path 'scratch/test_clean.html' -Value $testHtml -Encoding UTF8

$path = (Resolve-Path 'scratch/test_clean.html').Path.Replace('\', '/')
$domOut = "$PWD\scratch\clean_dom.html"
if (Test-Path $domOut) { Remove-Item $domOut }

$proc = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--window-size=1280,800", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files", "--virtual-time-budget=4000", "--dump-dom", "`"file:///$path`"" -NoNewWindow -PassThru -RedirectStandardOutput $domOut
$proc.WaitForExit(10000)

$dom = Get-Content $domOut -Raw -Encoding UTF8
$m = [regex]::Match($dom, '<pre id="output">([\s\S]*?)</pre>')
if ($m.Success) {
    Write-Host "RESULT:`n$($m.Groups[1].Value)"
}
