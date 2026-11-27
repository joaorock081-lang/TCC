Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('C:\Users\joaor\.gemini\antigravity\brain\0efbaf3b-7eaf-49ec-b300-fe96030dd6a6\.user_uploaded\media_1795226388823_99c23249.jpg')
Write-Host "Dimensions: $($bmp.Width) x $($bmp.Height)"
$cOuter = $bmp.GetPixel(10, 10)
Write-Host "Outer pixel (10,10): R=$($cOuter.R) G=$($cOuter.G) B=$($cOuter.B)"
$cCard = $bmp.GetPixel(100, 100)
Write-Host "Card pixel (100,100): R=$($cCard.R) G=$($cCard.G) B=$($cCard.B)"
$bmp.Dispose()
