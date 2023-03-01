var options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ["000.000.000-000", "00.000.000/0000-00"];
    $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$(".cpfcnpj").length > 11
  ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
  : $(".cpfcnpj").mask("000.000.000-00#", options);

let botaoRecuperar = document.getElementById("botaoRecuperar");
let documento = document.getElementById("cpfcnpj");

let documentoDigitado;
function TiraSinais() {
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
}

function ConfirmaDados() {
  let request = fetch(
    `https://localhost:7230/Consumidor/Documento/${documentoDigitado}`
  );
  request.then(function (response) {
    if (response.status == 404) {
      alert("O documento não cadastrado");
    } else if (response.status == 200) {
      ResetaSenha();
    }
  });
}

function ResetaSenha() {
  let request = fetch(
    `https://localhost:7230/Consumidor/ForgetPassword/${documentoDigitado}`
  );
  request.then(function (response) {
    if (response.status == 400) {
      alert("Houve um problema, no envio do email");
    } else {
      alert("E-mail enviado com sucesso!");
    }
  });
}

botaoRecuperar.addEventListener("click", function (e) {
  TiraSinais();
  if (documentoDigitado.length == 11 || documentoDigitado.length == 14) {
    ConfirmaDados();
    e.preventDefault();
  } else {
    alert("Documento inválido");
  }
});
