Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('C:\Users\joaor\.gemini\antigravity\brain\0efbaf3b-7eaf-49ec-b300-fe96030dd6a6\.user_uploaded\media_1795226388823_99c23249.jpg')

# Let's inspect rows around y=100 to y=200 for x between 80 and 400
for ($y = 80; $y -lt 140; $y += 10) {
    $c = $bmp.GetPixel(150, $y)
    Write-Host "Pixel at (150, $y): R=$($c.R) G=$($c.G) B=$($c.B)"
}

$bmp.Dispose()
