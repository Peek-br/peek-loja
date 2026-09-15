/**
 * Lê a planilha do Google (publicada como CSV, ver config.js) e desenha os
 * cards de produto. Sem planilha configurada ainda, mostra os produtos de
 * exemplo abaixo, só pra você ver o layout funcionando.
 *
 * Colunas esperadas na planilha (nessa ordem, cabeçalho na 1a linha):
 *   Ativo | Nome | Preco | Imagem | Link | Destaque
 *
 * - Ativo:    SIM ou NAO — linhas "NAO" ficam escondidas (não precisa apagar a linha)
 * - Nome:     nome curto do produto
 * - Preco:    texto livre, ex: "R$ 39,90"
 * - Imagem:   URL de uma foto do produto
 * - Link:     o link de afiliado de verdade
 * - Destaque: SIM pra aparecer no topo com um brilho magenta
 */

const PRODUTOS_EXEMPLO = [
  {
    nome: "Charm LED para calçados (par)",
    preco: "R$ 39,90",
    imagem: "",
    link: "#",
    destaque: true,
  },
  {
    nome: "Suporte veicular magnético para celular",
    preco: "R$ 29,90",
    imagem: "",
    link: "#",
    destaque: false,
  },
];

function ehSim(valor) {
  return String(valor || "").trim().toUpperCase() === "SIM";
}

function criarCard(produto) {
  const a = document.createElement("a");
  a.className = "card" + (produto.destaque ? " destaque" : "");
  a.href = produto.link || "#";
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.className = "card-img";
  img.loading = "lazy";
  img.alt = produto.nome || "Produto";
  img.src = produto.imagem || "";
  img.onerror = () => {
    img.style.display = "none";
  };

  const body = document.createElement("div");
  body.className = "card-body";

  const destaqueTag = produto.destaque
    ? '<span class="badge-destaque">Destaque</span><br/>'
    : "";
  body.innerHTML = `
    ${destaqueTag}
    <div class="card-title">${produto.nome || "Produto"}</div>
    <div class="card-price">${produto.preco || ""}</div>
  `;

  const cta = document.createElement("span");
  cta.className = "card-cta";
  cta.textContent = "Ver oferta";

  a.appendChild(img);
  a.appendChild(body);
  a.appendChild(cta);
  return a;
}

function renderizar(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  if (!produtos.length) {
    container.innerHTML = '<p class="empty">Nenhum produto ativo no momento — volte em breve!</p>';
    return;
  }

  // destaques primeiro, mantendo a ordem original dentro de cada grupo
  const ordenados = [...produtos].sort((a, b) => Number(b.destaque) - Number(a.destaque));
  ordenados.forEach((p) => container.appendChild(criarCard(p)));
}

function carregarDaPlanilha() {
  Papa.parse(SHEET_CSV_URL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (resultado) => {
      const linhas = resultado.data
        .filter((linha) => ehSim(linha.Ativo))
        .map((linha) => ({
          nome: (linha.Nome || "").trim(),
          preco: (linha.Preco || "").trim(),
          imagem: (linha.Imagem || "").trim(),
          link: (linha.Link || "").trim(),
          destaque: ehSim(linha.Destaque),
        }))
        .filter((p) => p.nome && p.link);

      renderizar(linhas);
    },
    error: () => {
      document.getElementById("produtos").innerHTML =
        '<p class="error">Não consegui carregar a planilha agora. Confira o link em config.js.</p>';
    },
  });
}

if (!SHEET_CSV_URL || SHEET_CSV_URL.includes("COLE_AQUI")) {
  // Planilha ainda não configurada — mostra o layout com exemplo, pra você
  // ver como fica antes de ligar a planilha de verdade.
  renderizar(PRODUTOS_EXEMPLO);
} else {
  carregarDaPlanilha();
}
