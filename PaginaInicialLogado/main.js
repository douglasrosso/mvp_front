
const url = "https://localhost:7230/UC/Consumidor/"
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
$(function () {
  $('#sair').on('click', function (event) {

    if (!confirm('Pressione "OK" se deseja realmente sair.'))
      event.preventDefault();
  });
});
let UCs = []
function getUCs() {
  let request = fetch(url+urlParams.get('id'))
  request.then(function (response) {
    response.json().then(function (vetorUCs) {
      UCs = vetorUCs
      criaList(vetorUCs)
    })
  })
}
console.log(urlParams)
function criaList(Ucs) {
  let corpo = document.querySelector("#corpo")
  for (let uc of UCs) {
    console.log(urlParams.get('id'))
    let linha = document.createElement("tr")
    let link = document.createElement("a")

    link.href = `../Paginafaturas/index.html?id=${urlParams.get('id')}&UC=${uc.cod_uc}`
    console.log(link.href)
    let col1 = document.createElement("td")
    let col2 = document.createElement("td")

    col1.appendChild(link)
    link.innerHTML = "00000"+uc.cod_uc;
    col2.innerHTML = uc.bairro +","+uc.logradouro +","+ uc.num_casa

    linha.appendChild(col1)
    linha.appendChild(col2)
    corpo.appendChild(linha)
  }

}
getUCs();







