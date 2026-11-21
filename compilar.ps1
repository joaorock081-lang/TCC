# Script para sincronizar e compilar a versão única (index.html) e a modular (index_modular.html)
$ErrorActionPreference = "Stop"

$template = [System.IO.File]::ReadAllText("$PWD\index_template.html", [System.Text.Encoding]::UTF8)
$css = [System.IO.File]::ReadAllText("$PWD\css\style.css", [System.Text.Encoding]::UTF8)
$data = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)
$app = [System.IO.File]::ReadAllText("$PWD\js\app.js", [System.Text.Encoding]::UTF8)

# 1. Salva a versão modular index_modular.html
[System.IO.File]::WriteAllText("$PWD\index_modular.html", $template, [System.Text.Encoding]::UTF8)

# 2. Converte a logo oficial para Base64 Data URI para portabilidade máxima e zero falhas de imagem no GitHub Pages
$logoBase64 = ""
$caminhoLogo = "$PWD\assets\logo_estudamais.jpg"
if (Test-Path $caminhoLogo) {
    $bytes = [System.IO.File]::ReadAllBytes($caminhoLogo)
    $logoBase64 = "data:image/jpeg;base64," + [Convert]::ToBase64String($bytes)
}

# 3. Monta o bundle unificado index.html
$bundle = $template.Replace('<link rel="stylesheet" href="css/style.css">', ("<style>`n" + $css + "`n</style>"))
$bundle = $bundle.Replace('<script src="js/data.js" charset="UTF-8"></script>', ("<script>`n" + $data + "`n</script>"))
$bundle = $bundle.Replace('<script src="js/data.js"></script>', ("<script>`n" + $data + "`n</script>"))
$bundle = $bundle.Replace('<script src="js/app.js" charset="UTF-8"></script>', ("<script>`n" + $app + "`n</script>"))
$bundle = $bundle.Replace('<script src="js/app.js"></script>', ("<script>`n" + $app + "`n</script>"))

# Se gerou Base64 da logo, embute diretamente no index.html para funcionar 100% autônomo
if ($logoBase64 -ne "") {
    $bundle = $bundle.Replace('assets/logo_estudamais.jpg', $logoBase64)
    $bundle = $bundle.Replace('assets/logo_estudamais_2026.jpg', $logoBase64)
}

[System.IO.File]::WriteAllText("$PWD\index.html", $bundle, [System.Text.Encoding]::UTF8)

Write-Host "✅ Sincronização concluída com sucesso!" -ForegroundColor Green
Write-Host "   - index.html (versão autônoma tudo-em-um para GitHub Pages com logo embutida): $((Get-Item index.html).Length) bytes"
Write-Host "   - index_modular.html: $((Get-Item index_modular.html).Length) bytes"
