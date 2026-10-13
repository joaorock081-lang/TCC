# 📘 EstudaMais • Portal do Vestibulando (Projeto de TCC)

> **Plataforma web aconchegante de apoio aos estudos com guia dos principais vestibulares (ENEM, FUVEST, FATEC e UNICAMP), bloco de notas inteligente, método Pomodoro e técnicas de estudo comprovadas.**

---

## 🎯 1. Sobre o Projeto

Este site foi concebido e desenvolvido como parte do **Trabalho de Conclusão de Curso (TCC) da Escola**, com o propósito de suprir uma das maiores dores dos estudantes do Ensino Médio e cursos pré-vestibulares: **a sobrecarga de informações e a falta de centralização organizada dos conteúdos que mais caem nas principais provas do país**.

Em vez de uma interface fria e cansativa, o projeto adota um conceito visual **aconchegante e motivador**, inspirado no universo de cadernos de estudo, lápis, post-its e tons harmônicos de **azul marinho**, criando uma sensação acolhedora que estimula a constância e o foco.

---

## 🌟 2. Principais Recursos e Funcionalidades

### 📚 A. Conteúdos Detalhados dos 10 Principais Vestibulares do Brasil
O portal traz uma curadoria aprofundada baseada nos editais e estatísticas de incidência:
1. **ENEM (Exame Nacional do Ensino Médio):** Linguagens, Humanas, Natureza, Matemática e Redação com 5 competências da TRI.
2. **FUVEST (USP):** Prova clássica da USP, 80 questões na 1ª fase, 2ª fase dissertativa e as 9 leituras obrigatórias oficiais de 2027.
3. **FATEC (Centro Paula Souza):** Fase única de 60 questões + Redação, foco em Raciocínio Lógico, situações-problema e sistema de pesos 1 e 2.
4. **UNICAMP (Comvest):** Prova crítica e humanizada de 72 questões, redação com 2 propostas de gêneros textuais e obras incluindo álbuns musicais.
5. **UNESP (Vunesp):** Estadual Paulista, 90 questões na 1ª fase, 2ª fase dissertativa e redação reflexiva a partir de pergunta temática.
6. **ITA (Inst. Tecnológico de Aeronáutica):** Um dos exames mais difíceis do país com nível de cobrança universitário em Matemática, Física e Química.
7. **UnB (Univ. de Brasília / Cebraspe):** Modelo Cebraspe de itens (Certo/Errado com anulação), tipo B numérico e forte abordagem do Cerrado e cidadania.
8. **UERJ (Univ. do Estado do Rio de Janeiro):** Exame de Qualificação (conceitos A, B, C, D com pontuação de bônus) e Exame Discursivo com romances literários.
9. **UFPR (Univ. Federal do Paraná):** 90 questões objetivas na 1ª fase e 2ª fase com Compreensão e Produção de múltiplos gêneros textuais.
10. **UFRGS (Univ. Federal do Rio Grande do Sul):** Modelo clássico de 2 dias com 15 questões por disciplina e lista oficial minuciosa de 12 leituras obrigatórias.

---

### 📝 B. Bloco de Notas Integrado (Caderno Digital)
- Criação, edição e exclusão de anotações e resumos diretamente no navegador.
- Categorização por matéria (Redação, Matemática, Ciências da Natureza, Humanas, Obras, etc.).
- Escolha de tons visuais (Azul Marinho, Azul Nuvem, Amarelo Post-it, Verde Conquista).
- **Fixação de Notas (Pin 📌):** Fixa resumos prioritários no topo.
- **Download em `.txt`:** Permite que o estudante baixe suas anotações com um clique para guardar no computador.
- **Copiar com 1 Clique:** Copia o texto formatado para a área de transferência.
- **Busca em tempo real:** Encontra anotações rapidamente digitando qualquer palavra-chave.
- **Persistência total:** Dados salvos no `LocalStorage` do navegador (não se perdem ao fechar a aba).

---

### ⏱️ C. Concentração, Pomodoro & Som Ambiente
- **Pomodoro Timer Integrado:**
  - Modo Foco (25 minutos).
  - Modo Pausa Curta (5 minutos).
  - Modo Pausa Longa (15 minutos).
  - Alerta sonoro relaxante e suave utilizando a **Web Audio API** nativa (sem necessidade de arquivos MP3 pesados externos).
  - Contador de ciclos de estudo completados no dia.
- **Gerador de Som Ambiente de Chuva:**
  - Sintetizador de ruído suave e aveludado que ajuda no bloqueio de ruídos externos e estimula o foco prolongado.
- **Lista de Metas Diárias:**
  - Checklist interativo para o aluno definir de 3 a 5 objetivos de estudo para o dia.

---

### 📊 D. Checklist de Estudos Interativo & Barra de Evolução
- Cada tópico e matéria dos vestibulares possui uma caixa de seleção `[ ]`.
- Conforme o aluno estuda, ele marca o item como concluído.
- O painel calcula automaticamente a porcentagem estudada por vestibular e no geral, trazendo sensação real de progresso e conquista.

---

### 🎮 E. Arena de Estudos & Quiz Gamificado com Exercícios
- Questões de múltipla escolha cobrindo **ENEM, FUVEST, FATEC e UNICAMP**.
- Filtro por matéria: **Todas as Matérias**, **Exatas (Foco em Contas & Fórmulas)**, **Ciências da Natureza**, **Ciências Humanas** e **Linguagens**.
- Gamificação completa:
  - Pontuação de Foco em XP (+100 XP por acerto).
  - 🔥 Sequência de acertos (*Streak*).
  - Taxa de precisão calculada em tempo real.
  - Efeito sonoro harmônico de acerto gerado pela Web Audio API.
  - Explicação pedagógica detalhada do professor para cada questão.

---

### ✏️ F. Lousa Digital de Rascunho para Cálculos de Exatas
- Quadro de rascunho retrátil e flutuante que pode ser aberto em qualquer tela ou diretamente ao resolver exercícios de exatas.
- **Desenvolvido com HTML5 Canvas & Pointer Events:** Funciona tanto no mouse quanto em celulares e tablets com caneta touch (*stylus*) ou dedo.
- **Fundo com Textura Quadriculada:** Simula perfeitamente uma folha de caderno de matemática para organizar frações, gráficos e cálculos.
- **Ferramentas:** Lápis/Caneta com 5 cores (Grafite, Azul Marinho, Azul Realce, Vermelho e Verde), 3 espessuras de ponta (Fino, Médio e Grosso), Borracha suave, função Desfazer (*Undo*) e Limpar tudo.

---

### 🔍 G. Pesquisa Global Inteligente
- Barra de busca universal no início do site.
- Permite que o aluno digite qualquer termo (ex: *"Ecologia"*, *"Era Vargas"*, *"Revolução Industrial"*, *"Leis de Newton"*, *"Cartografia"*, *"Machado de Assis"*) e veja instantaneamente onde o conteúdo aparece em cada um dos vestibulares, com redirecionamento direto com um clique.

---

### ✨ H. Animações Dinâmicas e Transições Suaves
- Troca de abas com efeito suave de subida e revelação progressiva (`pageSlideIn` com curvas de aceleração *cubic-bezier*).
- Animações nos botões de alternativa (pulso verde no acerto e leve tremor de atenção no erro).

---

## 🎨 3. Identidade Visual e Experiência do Usuário (UI/UX)

- **Cores Predominantes:** Paleta cuidadosamente construída com vários tons de azul, com destaque para o **Azul Marinho** (`#081326`, `#0c1d3b`, `#163366`, `#1e4585`, `#2563eb`), fundos suaves em tom de nuvem/gelo (`#f2f6fc`, `#e9f0f9`) e detalhes de papelaria em dourado/lápis (`#f59e0b`).
- **Atmosfera Aconchegante:** Elementos visuais que remetem a páginas de caderno pautado, post-its, clipes, marcadores de texto e cards limpos com cantos arredondados.
- **Tipografia:** Família `Plus Jakarta Sans` para máxima legibilidade e clareza, combinada com acentos da fonte `Caveat` para detalhes manuscritos.
- **100% Responsivo:** Funciona perfeitamente em computadores, notebooks, tablets e smartphones.

---

## 🛠️ 4. Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível, otimizada para SEO e navegação rápida.
- **CSS3 Moderno:** Flexbox, CSS Grid, Custom Properties (variáveis CSS), transições suaves e design responsivo com Media Queries.
- **JavaScript Moderno (ES6+):** Manipulação de DOM sem dependências pesadas, arquitetura baseada em estado (`AppState`), filtragem de busca dinâmica e modularidade.
- **Web Storage API (LocalStorage):** Armazenamento local das notas, tarefas diárias e progresso das matérias.
- **Web Audio API:** Síntese de áudio procedural para os sinos do Pomodoro e gerador de som ambiente aconchegante de chuva.
- **Font Awesome 6 & Google Fonts:** Ícones e tipografia moderna.

---

## 🚀 5. Como Abrir e Utilizar no Computador

Não é necessário instalar nenhum programa, servidor ou dependência externa!
1. Navegue até a pasta do projeto: `Site do TCC`.
2. Dê **dois cliques** no arquivo `index.html`.
3. O site abrirá instantaneamente no seu navegador padrão (Google Chrome, Edge, Firefox, etc.).

---

## 📱 6. Como Utilizar no Celular e no Tablet Android

O site foi 100% otimizado para dispositivos móveis com:
- **Barra de navegação inferior estilo aplicativo nativo Android** (Início, Vestibulares, Quiz, Notas e Foco).
- **Lousa de Rascunho para Desenho com o Dedo ou Caneta Stylus** (com suporte total a eventos de toque sem arrastar a tela acidentalmente).
- **PWA (Progressive Web App):** Permite ser instalado como um app com ícone próprio na tela inicial do celular!

### 🌟 Opção 1: Acessar pelo Wi-Fi Local (Mais Fácil e Rápido para Apresentar)
1. Certifique-se de que o computador e o celular/tablet Android estão conectados na **mesma rede Wi-Fi**.
2. Na pasta do projeto no computador, dê **dois cliques** no arquivo:
   `INICIAR_SERVIDOR_CELULAR.bat`
3. A janela preta exibirá o endereço de acesso, por exemplo:
   `👉 http://192.168.0.105:8080`
4. No seu celular ou tablet Android, abra o **Google Chrome** e digite exatamente esse endereço.
5. **Dica de Ouro no Android (Instalar como App):**
   No Chrome do celular, toque nos **3 pontinhos no canto superior direito** e escolha **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
   O EstudaMais virará um aplicativo completo na gaveta de apps do seu Android, funcionando em tela cheia sem a barra de endereço!

### 📲 Opção 2: Passar os Arquivos Direto para a Memória do Android (Funciona 100% Offline)
1. Conecte seu celular/tablet ao computador via cabo USB ou envie a pasta compactada via Google Drive.
2. Copie a pasta `Site do TCC` para a memória interna do seu dispositivo Android.
3. No celular, abra o aplicativo **"Meus Arquivos"** (Samsung) ou **"Files do Google"**.
4. Localize a pasta e toque no arquivo `index.html`.
5. Escolha abrir com o **Google Chrome**. O site funcionará completo offline!

### 🌐 Opção 3: Publicar Gratuitamente na Internet (Acesso Global)
Você também pode hospedar o site em servidores gratuitos como o **GitHub Pages**, **Vercel** ou **Netlify**:
1. Basta subir a pasta para um repositório no GitHub.
2. Ative o GitHub Pages nas configurações do repositório.
3. Você terá um link público (ex: `https://seunome.github.io/estudamais`) que qualquer pessoa com celular ou tablet pode acessar de qualquer lugar do mundo!

---

## 🎓 7. Dicas para a Apresentação na Banca do TCC

Ao apresentar o projeto para os professores e avaliadores, destaque:
1. **Problema Identificado:** Vestibulandos frequentemente se sentem sobrecarregados, ansiosos e sem saber por onde começar ou o que priorizar entre ENEM, Fuvest, Unesp, Unicamp, Fatec, ITA, UnB, UERJ, UFPR e UFRGS.
2. **Solução Desenvolvida:** Um ambiente centralizado que não apenas entrega a matriz de conteúdos essenciais dos 10 maiores exames, mas também fornece ferramentas práticas de estudo ativo (bloco de notas com download, timer pomodoro, lousa de contas, quiz gamificado e som ambiente).
3. **Diferencial Psicológico/Visual:** A estética acolhedora com tons de azul marinho foi pensada para reduzir o estresse e tornar a rotina de estudos agradável.
4. **Demonstração Prática:**
   - Mostre o site rodando tanto no computador quanto no seu **celular ou tablet Android**.
   - Mostre a busca global pesquisando um tema comum (ex: *"Ecologia"*).
   - Mostre a **Lousa de Rascunho** desenhando uma conta de matemática com o dedo/caneta touch no tablet.
   - Responda uma questão na **Arena de Quiz** e demonstre o som de acerto e o ganho de XP.
   - Inicie o timer do Pomodoro e demonstre o som ambiente relaxante de chuva.
