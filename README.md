# Peek — página de links (bio)

Site estático (sem back-end, sem custo de hospedagem) que lista seus
produtos com link de afiliado. Você edita os produtos numa planilha do
Google — sem mexer em código depois de configurado uma vez.

## Passo 1 — Colocar no ar (GitHub Pages, grátis)

1. Crie uma conta em [github.com](https://github.com) se ainda não tiver.
2. Clique em **New repository** (botão verde). Nome sugerido: `peek-loja`.
   Marque como **Public**. Não marque nenhuma opção de "initialize with README".
3. Na página do repositório vazio, clique em **uploading an existing file**
   e arraste os 4 arquivos desta pasta (`index.html`, `style.css`, `app.js`,
   `config.js`). Clique em **Commit changes**.
4. Vá em **Settings** (aba do repositório) → **Pages** (menu lateral).
   Em "Source", escolha **Deploy from a branch**, branch **main**, pasta
   **/ (root)**, e clique em **Save**.
5. Espere ~1 minuto e recarregue a página de Pages — vai aparecer um link
   assim: `https://seu-usuario.github.io/peek-loja/`. **Esse é o link pra
   colocar na bio.** Ele é permanente — não muda sozinho.

## Passo 2 — Criar a planilha de produtos (o "painel" que você edita)

1. Crie uma planilha nova no [Google Sheets](https://sheets.new).
2. Na primeira linha, cole exatamente estes 6 cabeçalhos, um por coluna:

   ```
   Ativo	Nome	Preco	Imagem	Link	Destaque
   ```

3. A partir da linha 2, uma linha por produto. Exemplo:

   | Ativo | Nome | Preco | Imagem | Link | Destaque |
   |---|---|---|---|---|---|
   | SIM | Charm LED para calçados | R$ 39,90 | https://... | https://s.shopee.com.br/xxx | SIM |
   | SIM | Suporte veicular magnético | R$ 29,90 | https://... | https://s.shopee.com.br/yyy | NAO |

   - **Ativo**: `SIM` pra aparecer, `NAO` pra esconder (sem apagar a linha —
     assim você guarda o histórico do que já promoveu).
   - **Imagem**: cole a URL da foto do produto (a mesma foto que você já
     usa no vídeo/thumbnail serve).
   - **Link**: o link de afiliado de verdade (o que você já cola no app
     hoje, ex: `s.shopee.com.br/...`).
   - **Destaque**: `SIM` pra aparecer no topo com brilho magenta (bom pro
     produto do vídeo mais recente).

4. No menu: **Arquivo → Compartilhar → Publicar na web**.
5. Na janela que abrir: em "Link", escolha a aba certa (geralmente
   "Página1"). No segundo menu, troque de "Página da web" pra
   **"Valores separados por vírgula (.csv)"**. Clique em **Publicar** e
   confirme.
6. Copie o link gerado (algo como
   `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).

## Passo 3 — Ligar a planilha ao site

1. Abra `config.js` (no GitHub: clique no arquivo → ícone de lápis pra
   editar).
2. Troque o texto `COLE_AQUI_O_LINK_CSV_PUBLICADO_DA_SUA_PLANILHA` pelo
   link que você copiou no passo anterior, mantendo as aspas.
3. Clique em **Commit changes**. Em ~1 minuto o site já reflete a
   planilha.

Pronto — daqui pra frente, **toda vez que você editar a planilha** (add,
remove, muda preço), o site atualiza sozinho, sem precisar mexer em código
de novo.

## Rotina do dia a dia (recomendada) — decidir pelo app, não pela planilha

Editar a planilha à mão funciona, mas o app da Peek (Fila de Aprovação) já
sabe qual produto você aprovou/publicou — é mais seguro decidir por lá:

1. Em cada item da Fila de Aprovação, tem um bloco **"Loja (link em bio)"**
   com um checkbox **"Mostrar este produto na página de links"**, um
   **"Destacar"** (mesma coisa que a coluna Destaque) e um campo de nome
   customizado (útil porque o título original do produto costuma vir cheio
   de palavra-chave de SEO, ex: "2 Peças/Par de Luzes LED para Sapatos,
   Acessórios de Decoração DIY...").
2. Quando terminar de marcar os produtos do dia, clique em **"Baixar CSV
   da loja"** no topo da Fila de Aprovação — baixa um `.csv` já no formato
   certo.
3. Na sua planilha do Google Sheets: **Arquivo → Importar → Fazer upload**
   → selecione o arquivo baixado → escolha **"Substituir planilha"** →
   Importar dados.
4. Pronto — o site já reflete exatamente o que você decidiu no app, sem
   editar nada à mão na planilha.

A planilha continua existindo (é ela que o site lê), só que agora ela é um
espelho do que o app decidiu, não a fonte da decisão em si.

## Trocar o link genérico por domínio próprio (quando comprar um)

Quando registrar um domínio (ex: `peek.com.br`), no mesmo painel
**Settings → Pages** do GitHub existe um campo **Custom domain** — cole o
domínio ali, e no seu registrador de domínio (Registro.br, etc.) aponte um
registro `CNAME` pra `seu-usuario.github.io`. Nenhum arquivo do site
precisa mudar.

## Sobre o logo

O cabeçalho usa "PEEK" com gradiente roxo→magenta, do mesmo jeito que as
thumbnails do app já usam — é um substituto até você me passar o arquivo
real do logo (PNG, fundo transparente de preferência). Trocar depois é só
mexer em `index.html` (troca o `<span class="logo-mark">` por uma tag
`<img>` apontando pro arquivo do logo).
