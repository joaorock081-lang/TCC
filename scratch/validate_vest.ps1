$data = [System.IO.File]::ReadAllText("$PWD\js\data.js", [System.Text.Encoding]::UTF8)

# Vamos inspecionar cada objeto dentro de VESTIBULARES_DATA
$script = @"
$data
var keys = Object.keys(VESTIBULARES_DATA);
var issues = [];
for (var i = 0; i < keys.length; i++) {
  var k = keys[i];
  var v = VESTIBULARES_DATA[k];
  if (!v.badge) issues.push(k + ' sem badge');
  else if (typeof v.badge.split !== 'function') issues.push(k + ' badge invalido');
  if (!v.icone) issues.push(k + ' sem icone');
  if (!v.nome) issues.push(k + ' sem nome');
  if (!v.tituloCompleto) issues.push(k + ' sem tituloCompleto');
  if (!v.resumo) issues.push(k + ' sem resumo');
  if (!v.areas || !Array.isArray(v.areas)) issues.push(k + ' sem areas');
  else {
    for (var a = 0; a < v.areas.length; a++) {
      var ar = v.areas[a];
      if (!ar.disciplinas || !Array.isArray(ar.disciplinas)) issues.push(k + ' area ' + a + ' sem disciplinas');
      else {
        for (var d = 0; d < ar.disciplinas.length; d++) {
          var di = ar.disciplinas[d];
          if (!di.topicos || !Array.isArray(di.topicos)) issues.push(k + ' disc ' + di.nome + ' sem topicos');
        }
      }
    }
  }
}
WScript.Echo(issues.length === 0 ? 'TUDO VALIDO!' : issues.join('\n'));
"@

[System.IO.File]::WriteAllText("$PWD\scratch\test_vest.js", $script, [System.Text.Encoding]::UTF8)
Write-Host "Criado scratch/test_vest.js. Executando com cscript..."
cscript //NoLogo "$PWD\scratch\test_vest.js"
