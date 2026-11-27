$v = $false
$sd = ""
$cd = "flex"
$oc = $false
$estaVisivel = ($v -or $sd -eq "flex" -or $cd -eq "flex") -and ($sd -ne "none") -and (-not $oc)
Write-Host "estaVisivel para lousa no 1o clique:" $estaVisivel
