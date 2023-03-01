function validarEmail(email) {
    var forma = /\S+@\S+\.\S+/;
    return forma.test(email);
}
function validarSenha() {
    if (senha.value.length >=8){
        if (senha1.value != senha.value) {
            alert("Senhas diferentes!");
            return false;
        } else {
            return true;
        }
    }
    else{
        alert("Senha muito curta");
            return false;
    }
}

const url = "https://localhost:7230/Consumidor/Cadastro"
let nome = document.querySelector("#name")
let documento = document.querySelector("#cpfcnpj")
let email = document.querySelector("#email")
let senha1 = document.querySelector("#senha")
let senha = document.querySelector("#senhaC")


let select = document.querySelector("#tipopessoa")
//let value = select.options[selectIndex].value

const btnCadastrar = document.querySelector("form")

btnCadastrar.addEventListener('submit', function (e) {
    e.preventDefault()
    if (validarEmail(email.value) && validarSenha()) {
        if(documento.value.length == 14 || documento.value.length == 11)
        {
            let documentoDigitado;
        if (documento.value.length == 14) {
            documentoDigitado = documento.value.slice(0, 3) + documento.value.slice(4, 7) + documento.value.slice(8, 11) + documento.value.slice(12, 14)
        } else {
            documentoDigitado = documento.value.slice(0, 2) + documento.value.slice(3, 6) + documento.value.slice(7, 10) + documento.value.slice(11, 15) + documento.value.slice(16, 18)
        }
        let request = fetch(url + "/" + documentoDigitado, {
            method: 'PUT',
            headers: {
                "Accept": "*//*",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Nome_Consumidor: nome.value,
                email: email.value,
                senha: senha.value
            })

        })
        request.then(function (res) {
            console.log(res.status)
            if (res.status == 204) {
                alert("Usuário Cadastrado com sucesso")
                window.location.href="/"
            } else if(res.status == 404){
                alert("Você não possui cadastro na distribuidora")
            } 
            else if(res.status == 409){
                alert("email ja cadastrado")
            }
            else {
                alert("Não foi possivel efetuar o cadastro")
            }
        })

        }else{
            alert("Formato de documento invalido")
        }
    } else {
        alert("email errado")
    }

})
