$js = [System.IO.File]::ReadAllText('js/app.js', [System.Text.Encoding]::UTF8)

# 1. Update mudarAba to highlight group and subitems
$targetMudarAba = @'
  // Atualiza botões superiores
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
'@

$replaceMudarAba = @'
  // Atualiza botões superiores e itens dos grupos
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mapeamento e destaque de grupos de abas
  const mapaGrupos = {
    'vestibulares': 'conteudos',
    'videoaulas': 'conteudos',
    'dicas': 'conteudos',
    'simulados': 'pratica',
    'redacao': 'pratica',
    'quiz': 'pratica',
    'cronograma': 'organizacao',
    'notas': 'organizacao',
    'ferramentas': 'organizacao'
  };
  const grupoAtivo = mapaGrupos[tabId] || null;

  document.querySelectorAll('.nav-group-item').forEach(item => {
    item.classList.toggle('has-active-child', item.dataset.group === grupoAtivo);
  });
  document.querySelectorAll('.nav-group-subitem').forEach(sub => {
    sub.classList.toggle('active', sub.dataset.tab === tabId);
  });
  document.querySelectorAll('.menu-aba-item-card').forEach(card => {
    card.classList.toggle('ativo', card.dataset.tabAlvo === tabId);
  });
'@

if ($js.Contains($targetMudarAba)) {
  $js = $js.Replace($targetMudarAba, $replaceMudarAba)
  Write-Host "mudarAba group highlighting updated successfully."
} else {
  Write-Host "Target mudarAba not found!"
}

# 2. Append grouped nav controllers at the end of js/app.js
$controllersCode = @'

/* ========================================================
   CONTROLE DE NAVEGAÇÃO AGRUPADA & MENU DE 3 LISTRAS (☰)
   ======================================================== */

window.alternarModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (modal && modal.classList.contains('active')) {
    fecharModalMenuAbas();
  } else {
    abrirModalMenuAbas();
  }
};

window.abrirModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (!modal) return;

  // Atualiza destaque da aba ativa no momento
  const tabAtual = AppState.currentTab || 'inicio';
  document.querySelectorAll('.menu-aba-item-card').forEach(card => {
    card.classList.toggle('ativo', card.dataset.tabAlvo === tabAtual);
  });

  const inputBusca = document.getElementById('input-busca-abas-menu');
  if (inputBusca) {
    inputBusca.value = '';
    filtrarAbasNoMenu('');
  }

  modal.classList.add('active');
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }

  // Foco no input de busca para conveniência
  setTimeout(() => {
    if (inputBusca) inputBusca.focus();
  }, 100);
};

window.fecharModalMenuAbas = function() {
  const modal = document.getElementById('modal-menu-abas');
  if (modal) {
    modal.classList.remove('active');
  }
  if (typeof gerenciarBloqueioScrollModal === 'function') {
    gerenciarBloqueioScrollModal();
  }
};

// Alternar dropdown de grupo na barra de navegação
window.toggleDropdownNavGroup = function(event, grupoId) {
  if (event) event.stopPropagation();
  const grupoItem = document.querySelector(`.nav-group-item[data-group="${grupoId}"]`);
  if (!grupoItem) return;

  const jaAberto = grupoItem.classList.contains('aberto');

  // Fecha todos os outros primeiro
  fecharTodosDropdowns();

  if (!jaAberto) {
    grupoItem.classList.add('aberto');
  }
};

// Alternar dropdown de ferramentas no header
window.toggleDropdownFerramentas = function(event) {
  if (event) event.stopPropagation();
  const wrapper = document.getElementById('wrapper-dropdown-ferramentas');
  if (!wrapper) return;

  const jaAberto = wrapper.classList.contains('aberto');
  fecharTodosDropdowns();

  if (!jaAberto) {
    wrapper.classList.add('aberto');
  }
};

// Fechar todos os dropdowns suspensos
window.fecharTodosDropdowns = function() {
  document.querySelectorAll('.nav-group-item.aberto').forEach(el => el.classList.remove('aberto'));
  const wrapper = document.getElementById('wrapper-dropdown-ferramentas');
  if (wrapper) wrapper.classList.remove('aberto');
};

// Filtrar itens dentro do Modal de Abas
window.filtrarAbasNoMenu = function(termo) {
  const q = (termo || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.menu-aba-item-card');
  const blocos = document.querySelectorAll('.menu-aba-grupo-bloco');

  cards.forEach(card => {
    const texto = card.textContent.toLowerCase();
    const visivel = !q || texto.includes(q);
    card.style.display = visivel ? 'flex' : 'none';
  });

  // Oculta blocos vazios se não houver filhos visíveis
  blocos.forEach(bloco => {
    let temVisivel = false;
    const filhos = bloco.querySelectorAll('.menu-aba-item-card');
    filhos.forEach(f => {
      if (f.style.display !== 'none') temVisivel = true;
    });
    bloco.style.display = temVisivel ? 'flex' : 'none';
  });
};

// Fecha dropdowns ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-group-item') && !e.target.closest('.header-dropdown-wrapper')) {
    fecharTodosDropdowns();
  }
});
'@

$js = $js + "`n" + $controllersCode
[System.IO.File]::WriteAllText('js/app.js', $js, [System.Text.Encoding]::UTF8)
Write-Host "js/app.js updated with grouped nav controllers! Length: $($js.Length)"
