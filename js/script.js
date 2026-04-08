const dados = [
  {data:"2026-04-01", valor:100, tipo:"RECEITA", origem:"Oferta", extra:"aguarde"},
  {data:"2026-04-05", valor:-50, tipo:"DESPESA", origem:"Compra", extra:"João"}
];

// GERAR TABELA
function carregarTabela() {
  let tabela = document.getElementById("tabelaDados");
  tabela.innerHTML = "";

  let receitas = 0;
  let despesas = 0;

  dados.sort((a,b)=> new Date(a.data) - new Date(b.data));

  dados.forEach(d => {
    let tr = document.createElement("tr");

    let cor = d.valor >= 0 ? "valor-pos" : "valor-neg";

    tr.innerHTML = `
      <td>${d.data}</td>
      <td class="${cor}">${d.valor}</td>
      <td>${d.tipo}</td>
      <td>${d.origem}</td>
    `;

    tr.onclick = () => abrirModal(d);

    tabela.appendChild(tr);

    if(d.valor > 0) receitas += d.valor;
    else despesas += d.valor;
  });

  document.getElementById("receitas").innerText = receitas;
  document.getElementById("despesas").innerText = despesas;
  document.getElementById("areceber").innerText = 200;
}

// MODAL
function abrirModal(d){
  let texto = `
    <p>Data: ${d.data}</p>
    <p>Valor: ${d.valor}</p>
    <p>Origem: ${d.origem}</p>
    <p>${d.extra}</p>
  `;

  document.getElementById("modalConteudo").innerHTML = texto;

  new bootstrap.Modal(document.getElementById('modalDetalhe')).show();
}

// ACCORDION DINÂMICO
function gerarAccordion(){
  let container = document.getElementById("accordionAnos");
  let anoAtual = new Date().getFullYear();

  for(let ano=2025; ano<=anoAtual; ano++){
    let meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

    let html = `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#ano${ano}">
          ${ano}
        </button>
      </h2>
      <div id="ano${ano}" class="accordion-collapse collapse">
        <div class="accordion-body">
          ${meses.map(m=>`<div>${m}</div>`).join("")}
        </div>
      </div>
    </div>
    `;

    container.innerHTML += html;
  }
}

// TEMA
function toggleTheme(){
  document.body.classList.toggle("dark");
  localStorage.setItem("tema", document.body.classList.contains("dark"));
}

function carregarTema(){
  let tema = localStorage.getItem("tema");
  if(tema === "true") document.body.classList.add("dark");
}

carregarTema();
carregarTabela();
gerarAccordion();

// TOOLTIP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(el => new bootstrap.Tooltip(el))