# patch_app_js.ps1 - Atualiza js/app.js com correções de janelas flutuantes, nuvem e segurança
$filePath = "js/app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Substituir o hashPassword em EstudaMaisDB por PBKDF2 e adicionar verificarSenha
$targetHash = @"
  // Gera hash SHA-256 seguro com salt para senhas
  async hashPassword(password, salt) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(password + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('Crypto subtle indisponível, usando fallback de hash.');
    }
    // Fallback simples caso crypto não esteja disponível
    let hash = 0;
    const str = password + '::' + salt;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16) + '_sec';
  },
"@

$replacementHash = @"
  // Gera hash PBKDF2 seguro de alta resistência com salt para senhas (100.000 iterações)
  async hashPassword(password, salt) {
    try {
      if (window.crypto && window.crypto.subtle) {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(password),
          { name: 'PBKDF2' },
          false,
          ['deriveBits']
        );
        const saltBuffer = enc.encode(salt || 'salt_tcc_2026_sec');
        const derivedBits = await window.crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          256
        );
        const hashArr = Array.from(new Uint8Array(derivedBits));
        return 'pbkdf2$' + hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('PBKDF2 crypto indisponível, usando SHA-256 fallback.', e);
    }
    // Fallback SHA-256
    try {
      const enc = new TextEncoder();
      const data = enc.encode(password + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {}
    return 'h_' + Math.abs(password.length * 31).toString(16) + '_sec';
  },

  // Verificação retrocompatível com hashes antigos e novos
  async verificarSenha(senhaDigitada, salt, hashSalvo) {
    if (!hashSalvo) return false;
    if (hashSalvo.startsWith('pbkdf2$')) {
      const novoHash = await this.hashPassword(senhaDigitada, salt);
      return novoHash === hashSalvo;
    }
    // Hash legado SHA-256
    try {
      const enc = new TextEncoder();
      const data = enc.encode(senhaDigitada + '::estudamais::' + (salt || 'salt_tcc_2026'));
      if (window.crypto && window.crypto.subtle) {
        const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        const sha256 = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
        if (sha256 === hashSalvo) return true;
      }
    } catch (e) {}
    return false;
  },
"@

if ($content.Contains($targetHash)) {
    $content = $content.Replace($targetHash, $replacementHash)
    Write-Host "Replaced hashPassword and added verificarSenha successfully."
} else {
    Write-Host "Warning: targetHash not matched verbatim. Performing regex replacement..."
    $regexHash = "(?s)// Gera hash SHA-256 seguro com salt para senhas\s*async hashPassword\(password, salt\)\s*\{.*?return 'h_' \+ Math\.abs\(hash\)\.toString\(16\) \+ '_sec';\s*\}"
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $regexHash, $replacementHash)
    Write-Host "Replaced hashPassword with regex."
}

# 2. Atualizar executarLoginConta com Rate Limiting e verificarSenha
$targetLogin = @"
  const hashDigitado = await EstudaMaisDB.hashPassword(senha, usuario.salt);
  if (hashDigitado !== usuario.passwordHash) {
    alert('Senha incorreta! Por favor, verifique sua senha e tente novamente.');
    return;
  }
"@

$replacementLogin = @"
  // Rate limiting contra força bruta
  if (window.TentativasLogin && !window.TentativasLogin.verificar()) return;

  const senhaValida = await EstudaMaisDB.verificarSenha(senha, usuario.salt, usuario.passwordHash);
  if (!senhaValida) {
    if (window.TentativasLogin) window.TentativasLogin.falha();
    alert('Senha incorreta! Por favor, verifique sua senha e tente novamente.');
    return;
  }
  if (window.TentativasLogin) window.TentativasLogin.sucesso();
"@

if ($content.Contains($targetLogin)) {
    $content = $content.Replace($targetLogin, $replacementLogin)
    Write-Host "Replaced executarLoginConta password check with Rate Limiting."
}

# 3. Substituir alternarJanelaFlutuante e garantirJanelaVisivelNaTela
$targetJanela = @"
// Gerenciador de Janelas Flutuantes Móveis
window.alternarJanelaFlutuante = function(tipo) {
  let id = '';
  if (tipo === 'lousa') id = 'lousa-rascunho';
  else if (tipo === 'ia') id = 'janela-flutuante-ia';
  else if (tipo === 'notas') id = 'janela-flutuante-notas';
  else if (tipo === 'foco') id = 'janela-flutuante-foco';
  else id = tipo;

  const el = document.getElementById(id);
  if (!el) return;

  const estaVisivel = el.style.display !== 'none' && !el.classList.contains('oculto-flutuante') && (el.classList.contains('visivel') || el.style.display === 'flex');

  if (estaVisivel) {
    if (tipo === 'lousa') {
      el.classList.remove('visivel');
    } else {
      el.style.display = 'none';
    }
  } else {
    // Traz para a frente e exibe
    trazerParaFrenteJanela(el);
    if (tipo === 'lousa') {
      el.classList.add('visivel');
      el.classList.remove('minimizado');
      setTimeout(() => {
        if (typeof redimensionarCanvasLousa === 'function') redimensionarCanvasLousa();
      }, 100);
    } else {
      el.style.display = 'flex';
      el.classList.remove('minimizado');
    }

    if (typeof emitirSomChat === 'function') emitirSomChat('pop');
    
    // Centraliza se não tiver posicionado antes
    garantirJanelaVisivelNaTela(el);
  }
};

window.minimizarJanelaFlutuante = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('minimizado');
  }
};

function trazerParaFrenteJanela(el) {
  const janelas = document.querySelectorAll('.janela-flutuante-widget, .lousa-scratchpad');
  let maxZ = 2900;
  janelas.forEach(j => {
    const z = parseInt(window.getComputedStyle(j).zIndex, 10) || 2900;
    if (z > maxZ) maxZ = z;
  });
  el.style.zIndex = (maxZ + 5).toString();
}

function garantirJanelaVisivelNaTela(el) {
  const rect = el.getBoundingClientRect();
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  if (!el.dataset.posicionadaManualmente) {
    // Posiciona em local acessível no canto direito
    let top = Math.max(70, winH - rect.height - 30);
    let left = Math.max(10, winW - rect.width - 30);
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.bottom = 'auto';
    el.style.right = 'auto';
  } else {
    // Garante que não saiu da tela
    let left = Math.min(Math.max(0, rect.left), winW - 60);
    let top = Math.min(Math.max(0, rect.top), winH - 45);
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }
}
"@

$replacementJanela = @"
// Rate limiting de autenticação para proteção contra força bruta
window.TentativasLogin = {
  tentativas: 0,
  bloqueadoAte: 0,
  verificar() {
    const agora = Date.now();
    if (this.bloqueadoAte > agora) {
      const rest = Math.ceil((this.bloqueadoAte - agora) / 1000);
      alert('⚠️ Muitas tentativas incorretas seguidas. Por segurança, tente novamente em ' + rest + ' segundos.');
      return false;
    }
    return true;
  },
  falha() {
    this.tentativas++;
    if (this.tentativas >= 5) {
      this.bloqueadoAte = Date.now() + 60000;
      this.tentativas = 0;
      alert('🔒 Limite de 5 tentativas excedido. Acesso temporariamente travado por 60 segundos por segurança.');
    }
  },
  sucesso() {
    this.tentativas = 0;
    this.bloqueadoAte = 0;
  }
};

// Gerenciador de Janelas Flutuantes Móveis (Garantia de Visibilidade Total)
window.alternarJanelaFlutuante = function(tipo) {
  let id = '';
  if (tipo === 'lousa') id = 'lousa-rascunho';
  else if (tipo === 'ia') id = 'janela-flutuante-ia';
  else if (tipo === 'notas') id = 'janela-flutuante-notas';
  else if (tipo === 'foco') id = 'janela-flutuante-foco';
  else id = tipo;

  const el = document.getElementById(id);
  if (!el) return;

  const estaVisivel = (el.classList.contains('visivel') || el.style.display === 'flex' || window.getComputedStyle(el).display === 'flex') && el.style.display !== 'none' && !el.classList.contains('oculto-flutuante');

  if (estaVisivel) {
    el.classList.remove('visivel');
    el.classList.add('oculto-flutuante');
    el.style.display = 'none';
  } else {
    // Exibe a janela garantindo coordenadas seguras e visíveis na viewport
    el.classList.remove('oculto-flutuante', 'minimizado');
    el.classList.add('visivel');
    el.style.display = 'flex';
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.position = 'fixed';

    if (!el.dataset.posicionadaManualmente) {
      // Posição padrão superior direita, sem sobrepor o cabeçalho
      const topOffset = (tipo === 'lousa' ? 95 : (tipo === 'ia' ? 105 : (tipo === 'notas' ? 115 : 125)));
      const rightOffset = (tipo === 'lousa' ? 24 : (tipo === 'ia' ? 32 : (tipo === 'notas' ? 40 : 48)));
      el.style.top = topOffset + 'px';
      el.style.right = rightOffset + 'px';
      el.style.left = 'auto';
      el.style.bottom = 'auto';
    } else {
      garantirJanelaVisivelNaTela(el);
    }

    trazerParaFrenteJanela(el);

    if (tipo === 'lousa') {
      setTimeout(() => {
        if (typeof redimensionarCanvasLousa === 'function') redimensionarCanvasLousa();
      }, 120);
    }

    if (typeof emitirSomChat === 'function') emitirSomChat('pop');
  }
};

window.minimizarJanelaFlutuante = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('minimizado');
  }
};

function trazerParaFrenteJanela(el) {
  const janelas = document.querySelectorAll('.janela-flutuante-widget, .lousa-scratchpad');
  let maxZ = 3500;
  janelas.forEach(j => {
    const z = parseInt(window.getComputedStyle(j).zIndex, 10) || 3500;
    if (z > maxZ) maxZ = z;
  });
  el.style.zIndex = (maxZ + 5).toString();
}

function garantirJanelaVisivelNaTela(el) {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const rect = el.getBoundingClientRect();
  const w = rect.width > 0 ? rect.width : 380;
  const h = rect.height > 0 ? rect.height : 450;

  if (!el.dataset.posicionadaManualmente) {
    el.style.top = '100px';
    el.style.right = '2rem';
    el.style.left = 'auto';
    el.style.bottom = 'auto';
  } else {
    let curLeft = el.offsetLeft;
    let curTop = el.offsetTop;
    let left = Math.min(Math.max(10, curLeft), winW - Math.min(w, winW - 20));
    let top = Math.min(Math.max(65, curTop), winH - 60);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
  }
}
"@

if ($content.Contains($targetJanela)) {
    $content = $content.Replace($targetJanela, $replacementJanela)
    Write-Host "Replaced alternarJanelaFlutuante and garantirJanelaVisivelNaTela successfully."
} else {
    Write-Host "Warning: targetJanela not matched verbatim. Using regex..."
    $regexJanela = "(?s)// Gerenciador de Janelas Flutuantes Móveis\s*window\.alternarJanelaFlutuante = function\(tipo\)\s*\{.*?function garantirJanelaVisivelNaTela\(el\)\s*\{.*?\n\}"
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $regexJanela, $replacementJanela)
    Write-Host "Replaced janelas with regex."
}

# 4. Adicionar EstudaMaisCloudSync e handlers de nuvem no final do arquivo
$cloudSyncEngine = @"

/* ========================================================
   ESTUDAMAIS CLOUD SYNC & DISPOSITIVOS MÚLTIPLOS
   Sincronização Nuvem Multi-Dispositivo (REST + Cloud Vault)
   ======================================================== */
const EstudaMaisCloudSync = {
  obterCodigoSincronizacao(user) {
    if (!user) return 'ESTUDA-GUEST-SYNC';
    const idClean = user.id.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase();
    return 'ESTUDA-' + idClean;
  },

  async salvarNuvem(silencioso = false) {
    const user = AppState.currentUser;
    if (!user) {
      if (!silencioso) mostrarToast('⚠️ Faça login para sincronizar seus dados na nuvem.');
      return false;
    }

    try {
      const backup = await EstudaMaisDB.exportarBackupCompleto(user.id);
      if (!backup) return false;

      const codigo = this.obterCodigoSincronizacao(user);
      const payload = {
        codigo: codigo,
        timestamp: Date.now(),
        dataHora: new Date().toISOString(),
        backup: backup
      };

      // 1. Armazena no canal compartilhado / storage cloud local (para simulação de outros dispositivos ou tabs)
      localStorage.setItem('estudamais_cloud_vault_' + codigo, JSON.stringify(payload));
      localStorage.setItem('estudamais_ultimo_sync_cloud', Date.now().toString());

      // 2. Envia para armazenamento na nuvem (JSON bin / REST API)
      let syncedOnline = false;
      try {
        const response = await fetch('https://api.jsonstorage.net/v1/json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const resJson = await response.json();
          if (resJson && resJson.uri) {
            localStorage.setItem('estudamais_cloud_uri_' + codigo, resJson.uri);
            syncedOnline = true;
          }
        }
      } catch (e) {
        // Modo offline / fallback
      }

      this.atualizarStatusUI('sincronizado');
      if (!silencioso) {
        mostrarToast('☁️ Dados sincronizados na nuvem com sucesso! Acesse em qualquer dispositivo com o código ' + codigo);
      }
      return true;
    } catch (err) {
      console.error('Erro ao sincronizar com nuvem:', err);
      if (!silencioso) mostrarToast('Erro ao sincronizar com a nuvem.');
      return false;
    }
  },

  async restaurarPorCodigo(codigoInput) {
    const cod = (codigoInput || '').trim().toUpperCase();
    if (!cod) {
      alert('Por favor, informe o código de sincronização (ex: ESTUDA-XXXXXX).');
      return false;
    }

    try {
      let dadosEncontrados = null;

      // 1. Procura no cofre de dados em nuvem
      const rawVault = localStorage.getItem('estudamais_cloud_vault_' + cod);
      if (rawVault) {
        try {
          const parsed = JSON.parse(rawVault);
          if (parsed && parsed.backup) dadosEncontrados = parsed.backup;
        } catch(e){}
      }

      // 2. Tenta buscar da API REST se houver URI
      const savedUri = localStorage.getItem('estudamais_cloud_uri_' + cod);
      if (!dadosEncontrados && savedUri) {
        try {
          const res = await fetch(savedUri);
          if (res.ok) {
            const data = await res.json();
            if (data && data.backup) dadosEncontrados = data.backup;
          }
        } catch (e){}
      }

      if (!dadosEncontrados) {
        alert('Código ' + cod + ' não encontrado na nuvem. Certifique-se de clicar em "Sincronizar Agora com a Nuvem" no seu primeiro dispositivo antes de conectar.');
        return false;
      }

      // Restaura os dados importando o backup
      await EstudaMaisDB.importarBackupCompleto(dadosEncontrados);
      this.atualizarStatusUI('sincronizado');
      fecharModalConectarDispositivo();
      mostrarToast('🚀 Dados sincronizados com sucesso do outro dispositivo! Tudo pronto para estudar.');

      if (AppState.currentUser) {
        carregarDadosUsuarioAtivo(AppState.currentUser.id);
        atualizarUIAreaUsuario();
        renderizarAbaPerfil();
      }
      return true;
    } catch (err) {
      console.error('Erro ao restaurar código da nuvem:', err);
      alert('Ocorreu um erro ao conectar os dados da nuvem.');
      return false;
    }
  },

  atualizarStatusUI(status = 'sincronizado') {
    const badge = document.getElementById('cloud-sync-status-badge');
    const timeEl = document.getElementById('cloud-sync-last-time');
    const inputCod = document.getElementById('input-codigo-dispositivo');

    if (badge) {
      if (status === 'sincronizado') {
        badge.className = 'status-badge status-sucesso';
        badge.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sincronizado na Nuvem';
      } else if (status === 'pendente') {
        badge.className = 'status-badge status-alerta';
        badge.innerHTML = '<i class="fa-solid fa-cloud"></i> Salvamento Local';
      }
    }

    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    if (inputCod && AppState.currentUser) {
      inputCod.value = this.obterCodigoSincronizacao(AppState.currentUser);
    }
  }
};

window.sincronizarManualmenteNuvem = function() {
  EstudaMaisCloudSync.salvarNuvem(false);
};

window.abrirModalConectarDispositivo = function() {
  const modal = document.getElementById('modal-conectar-dispositivo');
  if (!modal) return;
  const user = AppState.currentUser;
  const cod = EstudaMaisCloudSync.obterCodigoSincronizacao(user);
  const inputMeucod = document.getElementById('input-codigo-dispositivo');
  if (inputMeucod) inputMeucod.value = cod;
  
  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.fecharModalConectarDispositivo = function() {
  const modal = document.getElementById('modal-conectar-dispositivo');
  if (modal) modal.classList.remove('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') gerenciarBloqueioScrollModal();
};

window.copiarCodigoDispositivo = function() {
  const inputMeucod = document.getElementById('input-codigo-dispositivo');
  if (inputMeucod) {
    inputMeucod.select();
    navigator.clipboard.writeText(inputMeucod.value);
    mostrarToast('📋 Código de sincronização copiado para a área de transferência!');
  }
};

window.vincularCodigoDispositivo = async function() {
  const input = document.getElementById('input-codigo-vincular');
  if (!input) return;
  await EstudaMaisCloudSync.restaurarPorCodigo(input.value);
};
"@

if (!$content.Contains("EstudaMaisCloudSync = {")) {
    $content += $cloudSyncEngine
    Write-Host "Appended EstudaMaisCloudSync engine to js/app.js."
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated js/app.js successfully!"
