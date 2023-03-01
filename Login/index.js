
var documento = document.getElementById("cpfcnpj");
var senha = document.querySelector("#password");

const btnEntrar = document.querySelector("form");
let documentoDigitado;

function postBanco(documento, senha) {
  const url = "https://localhost:7230/Consumidor/Login";
  let request = fetch(url + "/" + documento, {
    method: "POST",
    headers: {
      Accept: "*//*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      doc_Consumidor: documento,
      senha: senha,
    }),
  });
  request.then(function(res){
    if(res.status == 200){ 
      res.json().then(function(cons){
        window.location.href=`./PaginaInicialLogado/index.html?id=${cons.cod_Consumidor}`
      })
   
    }else if (res.status == 404){
        alert("Documento não cadastrado")
    }else if(res.status == 401){
        alert("Senha Incorreta")
    }
})
}

btnEntrar.addEventListener("submit", function (e) {
  e.preventDefault();
  if (documento.value.length == 14 || documento.value.length == 18) {
    if (documento.value.length == 14) {
      documentoDigitado =
        documento.value.slice(0, 3) +
        documento.value.slice(4, 7) +
        documento.value.slice(8, 11) +
        documento.value.slice(12, 14);
    } else {
      documentoDigitado = 
        documento.value.slice(0, 2) +
        documento.value.slice(3, 6) +
        documento.value.slice(7, 10) +
        documento.value.slice(11, 15) +
        documento.value.slice(16, 18);
    }
    postBanco(documentoDigitado,senha.value);
  } else {
    alert("Insira um documento válido");
  }
});

