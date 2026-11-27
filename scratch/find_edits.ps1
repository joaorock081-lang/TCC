$logPath = 'C:\Users\joaor\.gemini\antigravity\brain\0efbaf3b-7eaf-49ec-b300-fe96030dd6a6\.system_generated\logs\transcript.jsonl'
$lines = Get-Content $logPath
$indexes = @(4317, 4327, 4339)
foreach ($idx in $indexes) {
    Write-Host "=== INDEX $idx ==="
    $lines[$idx]
}
