# ========================================================
# 1. UPDATE index_template.html: PROFILE DATABASE & CLOUD SECTION
# ========================================================
$html = [System.IO.File]::ReadAllText('index_template.html', [System.Text.Encoding]::UTF8)

$oldDbBlock = @'
        <div class="db-header-row">
          <div class="db-title-col">
            <i class="fa-solid fa-database"></i>
            <div>
              <h3>Banco de Dados & Armazenamento da Conta</h3>
              <p>Seus dados são salvos localmente no seu dispositivo via <strong>IndexedDB</strong> com redundância e privacidade 100% garantida.</p>
            </div>
          </div>
          <span class="db-badge-secure"><i class="fa-solid fa-shield-halved"></i> 100% Offline & Gratuito</span>
        </div>

        <div class="db-actions-row">
          <button class="btn-db-export" onclick="exportarDadosPerfil()">
            <i class="fa-solid fa-download"></i>
            <span>Exportar Backup Completo (.json)</span>
          </button>
          <label class="btn-db-import">
            <i class="fa-solid fa-upload"></i>
            <span>Restaurar / Importar Backup (.json)</span>
            <input type="file" accept=".json" onchange="importarDadosPerfil(event)" style="display:none;">
          </label>
        </div>
'@

$newDbBlock = @'
        <div class="db-header-row">
          <div class="db-title-col">
            <i class="fa-solid fa-cloud-arrow-up" style="color: #0284c7;"></i>
            <div>
              <h3>Banco de Dados em Nuvem & Sincronização Multi-Dispositivos</h3>
              <p>Seus estudos (progresso, notas, cronograma, redações e metas) são salvos de forma segura no <strong>IndexedDB</strong> e sincronizados na <strong>Nuvem EstudaMais</strong> para você acessá-los em qualquer computador, celular ou tablet!</p>
            </div>
          </div>
          <div class="db-badges-col">
            <span class="db-badge-secure cloud-sync-badge" id="cloud-sync-status-badge">
              <i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> Nuvem Ativa
            </span>
          </div>
        </div>

        <!-- Barra de Ações do Banco de Dados e Nuvem -->
        <div class="db-actions-row">
          <button type="button" class="btn-db-cloud" onclick="sincronizarManualmenteNuvem()" id="btn-sync-nuvem" title="Salvar dados atuais na nuvem">
            <i class="fa-solid fa-rotate"></i>
            <span>Sincronizar Agora com a Nuvem</span>
          </button>
          <button type="button" class="btn-db-devices" onclick="abrirModalConectarDispositivo()" title="Acessar seus dados em outro celular ou PC">
            <i class="fa-solid fa-mobile-screen-button"></i>
            <span>Acessar em Outro Dispositivo</span>
          </button>
          <button type="button" class="btn-db-export" onclick="exportarDadosPerfil()" title="Baixar arquivo de backup local">
            <i class="fa-solid fa-download"></i>
            <span>Exportar Backup (.json)</span>
          </button>
          <label class="btn-db-import" title="Carregar arquivo de backup">
            <i class="fa-solid fa-upload"></i>
            <span>Restaurar Backup (.json)</span>
            <input type="file" accept=".json" onchange="importarDadosPerfil(event)" style="display:none;">
          </label>
        </div>
'@

if ($html.Contains($oldDbBlock)) {
  $html = $html.Replace($oldDbBlock, $newDbBlock)
  Write-Host "Updated profile database & cloud sync section in index_template.html!"
}

# Add modal for connecting other devices before </body>
$modalConectarDispositivo = @'
  <!-- ========================================================
       MODAL: ACESSAR CONTA E DADOS EM OUTRO DISPOSITIVO
       ======================================================== -->
  <div class="modal-overlay" id="modal-conectar-dispositivo" onclick="if(event.target === this) fecharModalConectarDispositivo()">
    <div class="modal-card modal-dispositivo-card">
      <div class="modal-header">
        <div class="modal-header-icon" style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #fff;">
          <i class="fa-solid fa-cloud-arrow-down"></i>
        </div>
        <div class="modal-header-text">
          <h3>Acessar Dados em Outros Dispositivos</h3>
          <p>Leve suas notas, cronogramas e progresso para o celular, tablet ou outro computador</p>
        </div>
        <button type="button" class="modal-btn-close" onclick="fecharModalConectarDispositivo()" title="Fechar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body modal-dispositivo-body">
        <!-- Método 1: Login com Email e Senha -->
        <div class="disp-metodo-box">
          <div class="disp-metodo-icon"><i class="fa-solid fa-envelope-circle-check"></i></div>
          <div class="disp-metodo-info">
            <h4>Método 1: Login Direto (Mais Fácil)</h4>
            <p>Basta abrir o site em qualquer outro navegador ou celular e fazer login com seu <strong>e-mail e senha cadastrados</strong>. Seus dados serão baixados da nuvem automaticamente!</p>
          </div>
        </div>

        <!-- Método 2: Código de Nuvem do Aluno -->
        <div class="disp-metodo-box">
          <div class="disp-metodo-icon"><i class="fa-solid fa-key"></i></div>
          <div class="disp-metodo-info">
            <h4>Método 2: Código de Sincronização da Nuvem</h4>
            <p>Se preferir ou estiver em modo visitante, use sua chave exclusiva para transferir todos os dados:</p>
            <div class="disp-codigo-wrapper">
              <input type="text" id="disp-codigo-nuvem" readonly value="ESTUDA-CARREGANDO..." class="disp-codigo-input">
              <button type="button" class="btn-copiar-codigo-disp" onclick="copiarCodigoNuvem()" title="Copiar código">
                <i class="fa-solid fa-copy"></i> Copiar
              </button>
            </div>
          </div>
        </div>

        <!-- Opção de Restaurar por Código em Novo Dispositivo -->
        <div class="disp-restaurar-box">
          <h4>Já tem um código de outro dispositivo?</h4>
          <p>Cole o código de sincronização abaixo para puxar seus dados para este navegador:</p>
          <div class="disp-restaurar-row">
            <input type="text" id="input-codigo-nuvem-restaurar" placeholder="Cole o código (ex: ESTUDA-XXXX-YYYY)..." class="disp-input-restaurar">
            <button type="button" class="btn-executar-sync-codigo" onclick="restaurarPorCodigoNuvem()">
              <i class="fa-solid fa-cloud-arrow-down"></i> Baixar Dados da Nuvem
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
'@

if (-not $html.Contains('id="modal-conectar-dispositivo"')) {
  $posBody = $html.LastIndexOf('</body>')
  if ($posBody -ge 0) {
    $html = $html.Substring(0, $posBody) + $modalConectarDispositivo + "`n" + $html.Substring($posBody)
    Write-Host "Inserted modal-conectar-dispositivo before </body>!"
  }
}

[System.IO.File]::WriteAllText('index_template.html', $html, [System.Text.Encoding]::UTF8)
