$dom = [System.IO.File]::ReadAllText("$PWD\scratch\final_edge_dom.html", [System.Text.Encoding]::UTF8)
if ($dom -match 'id="TEST_FINAL_OK">([^<]+)<') {
    Write-Host "SUCCESS! MATCH: $($matches[1])"
} else {
    Write-Host "DOM length: $($dom.Length)"
}
