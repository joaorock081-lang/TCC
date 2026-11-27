$lines = Get-Content "$PWD\js\app.js"
for ($i = 4986; $i -lt 5045; $i++) {
    Write-Host "$($i + 1): $($lines[$i])"
}
