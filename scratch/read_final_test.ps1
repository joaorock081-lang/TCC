$dom = [System.IO.File]::ReadAllText("$PWD\scratch\test_week_chat_dom.html", [System.Text.Encoding]::UTF8)
Write-Host "Length: $($dom.Length)"
$dom | Select-String "TEST_OUTPUT" -Context 1, 1
