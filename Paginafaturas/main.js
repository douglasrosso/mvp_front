var data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 'Jul', "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
        {
            label: 'Real R$',
            backgroundColor: "rgba(99,255,132,0.2)",
            borderColor: "rgba(99,255,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(99,255,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [100.56, 97.55, 126.11, 106.47, 114.02, 98.99, 101.33, 104.57, 127.88, 102.21, 113.11, 107.88]
        },
    ]
};

var options = {
    title: {
        display: true,
        text: 'Gasto Mensal da Unidade Consumidora',
        fontSize: 18
    },
    maintainAspecRatio: false,
    scales: {
        yAxes: [{
            gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            },
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
};
Chart.defaults.global.defaultFontColor = 'Black';
Chart.defaults.global.defaultFontSize = 14;
Chart.Bar('chart', {
    options: options,
    data: data
});

let uc = document.querySelector("#unidade-consumidora")
let nome = document.querySelector("#nome")
let documento = document.querySelector("#cpfcnpj")
let email = document.querySelector("#email")
let telefone = document.querySelector("#telefone")
let endereco = document.querySelector("#endereco")
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

uc.textContent = `Unidade Consumidora: ${urlParams.get('UC')}`
fetch(`https://localhost:7230/Consumidor/${urlParams.get('id')}`)
.then(response => response.json())
.then(data => {
    //console.log(data)
  nome.textContent = `Nome: ${data.nome_Consumidor}`
  documento.textContent =`CPF/CNPJ: ${data.doc_Consumidor}`
  email.textContent =`E-mail: ${data.email}`
  telefone.textContent = `Telefone: ${data.telefone1}`

});
console.log(urlParams.get('id'))
fetch(`https://localhost:7230/UC/${urlParams.get('UC')}`)
.then(response => response.json())
.then(data => {
    console.log(urlParams.get('UC'))
    endereco.textContent = `Endereço: ${data.logradouro}`

});

let faturas = []
function getFaturas() {
  let request = fetch(`https://localhost:7230/UC/Faturas/`+urlParams.get('UC'))
  request.then(function (response) {
    response.json().then(function (vetorFaturas) {
      faturas = vetorFaturas.faturas
      criaList(vetorFaturas.faturas)
    })
  })
}



console.log(urlParams)
function criaList(faturas) {
  let corpo = document.querySelector("#corpo")
  console.log(corpo)
  for (let Faturas of faturas) {
    if(Faturas.pagamento == false){
        let linha = document.createElement("tr")
        let link = document.createElement("a")
    
        link.href = `#`
        console.log(link.href)
        let col1 = document.createElement("td")
        let col2 = document.createElement("td")
    
        col1.appendChild(link)
        link.innerHTML = "Fatura: " + Faturas.competencia;
    
        linha.appendChild(col1)
        linha.appendChild(col2)
        corpo.appendChild(linha)
      } 
    }
    console.log(urlParams.get('UC'))

}
getFaturas();
      



