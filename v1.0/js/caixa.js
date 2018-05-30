// 2 Gambiarras pra diminuir código
$ = (searchString) => document.querySelector(searchString)
$All = (searchString) => document.querySelectorAll(searchString)

const showcaseEntradas = $(".showcase .showcase-body table tbody")
const showcaseSaidas = $(".showcase-saida table tbody")
const showcaseRetorno = $(".showcase-retorno table tbody")
const showcaseTrigger = $All('.showcase-title')
const showcaseBody = $All('.showcase-body')
const inputs = $All("input")
const inputMoney = $("input.money")
const butAdd = $("button.add")
const butRem = $("button.rem")
let entradas = [], saidas = [], finalArray, valorFinal = 0

// Creates a input mask for the value input, allowing only 'money' input
VMasker(inputMoney).maskMoney();

// Event listener that triggers on the add button clicks, sending a ajax request with the input values to addCaixa.php
butAdd.addEventListener("click", ()=> {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "../addCaixa.php?origem="+inputs[0].value+"&&valor="+inputs[1].value+"&&data="+inputs[2].value)
    xhr.addEventListener("load", ev => {
        alert(xhr.responseText)
        getCaixaAjax()
    })
    xhr.send()
})

// Same shit of above, but for remove button
butRem.addEventListener("click", function() {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "../addCaixa.php?origem=" + inputs[0].value + "&&valor=-" + inputs[1].value + "&&data=" + inputs[2].value)
    xhr.addEventListener("load", ev => {
        alert(xhr.responseText)
        getCaixaAjax()
    })
    xhr.send()
})

// When the document is loaded, calls selectAllAjax()
window.addEventListener("load", selectAllAjax)

// Sends a Ajax request to the server who will return a json string
function selectAllAjax(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "../caixa.php")
    xhr.addEventListener("load", ev => {
        finalArray = JSON.parse(xhr.responseText)
        buildArrays(finalArray)
        fillShowcases()
    })
    xhr.send()
}

// Showcase accordion, it really shouldn't work
for (let i = 0; i < showcaseTrigger.length; i++) {
    showcaseTrigger[i].addEventListener("click", ev => {
        if (showcaseBody[i].style.height == '0vh' || showcaseBody[i].style.height == '') {
            closeAll(showcaseBody)
            showcaseBody[i].style.height = '40vh'
        } else {
            showcaseBody[i].style.height = '0vh'
        }
    })
}

// Another part of the accordion
function closeAll(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].style.height = '0vh'
    }
}

// Separe deposit from withdraw
function buildArrays(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(valorFinal)
        console.log(parseInt(array[i].valor))
        valorFinal += parseInt(array[i].valor)
        if(array[i].valor < 0){
            array[i].valor = parseInt(array[i].valor) * -1
            saidas.push(array[i])
        }else{
            entradas.push(array[i])
        }
    }
}

// Don't even make me explain this shit
function fillShowcases() {
    for (let i = 0; i < entradas.length; i++) {
        let div1 = document.createElement("TD")
        let div2 = document.createElement("TD")
        let div3 = document.createElement("TD")
        let divSuperior = document.createElement("TR")

        div1.innerText = entradas[i].origem
        div2.innerText = "R$ "+entradas[i].valor
        div3.innerText = entradas[i].data
        divSuperior.appendChild(div1)
        divSuperior.appendChild(div2)
        divSuperior.appendChild(div3)
        showcaseEntradas.appendChild(divSuperior)
    }
    for (let i = 0; i < saidas.length; i++) {
        let div1 = document.createElement("TD")
        let div2 = document.createElement("TD")
        let div3 = document.createElement("TD")
        let divSuperior = document.createElement("TR")

        div1.innerText = saidas[i].origem
        div2.innerText = "R$ "+ saidas[i].valor
        div3.innerText = saidas[i].data
        divSuperior.appendChild(div1)
        divSuperior.appendChild(div2)
        divSuperior.appendChild(div3)
        showcaseSaidas.appendChild(divSuperior)
    }
    for (let i = 0; i < finalArray.length; i++) {
        const element = finalArray[i];
        let div1 = document.createElement("TD")
        let div2 = document.createElement("TD")
        let div3 = document.createElement("TD")
        let divSuperior = document.createElement("TR")
        div1.innerText = finalArray[i].origem
        div2.innerText = "R$ " + finalArray[i].valor
        div3.innerText = finalArray[i].data
        divSuperior.appendChild(div1)
        divSuperior.appendChild(div2)
        divSuperior.appendChild(div3)
        showcaseRetorno.appendChild(divSuperior)
    }
    let div1 = document.createElement("TD")
    let div2 = document.createElement("TD")
    let div3 = document.createElement("TD")
    let divSuperior = document.createElement("TR")
    div1.innerText = "Valor final:"
    div2.innerText = "R$ " + valorFinal
    if (valorFinal > 0) div3.innerText = "Superávit"
    else div3.innerText = "Déficit" 
    divSuperior.appendChild(div1)
    divSuperior.appendChild(div2)
    divSuperior.appendChild(div3)
    showcaseRetorno.appendChild(divSuperior)
}