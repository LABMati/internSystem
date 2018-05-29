const showcaseEntradas = document.querySelector(".showcase .showcase-body table tbody")
const showcaseSaidas = document.querySelector(".showcase-saida table tbody")
const showcaseTrigger = document.querySelectorAll('.showcase-title')
const showcaseBody = document.querySelectorAll('.showcase-body')
let entradas = []
let saidas = []
window.addEventListener("load", function getCaixaAjax(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET","../caixa.php")
    xhr.addEventListener("load", ev=>{
        let finalArray = JSON.parse(xhr.responseText)
        buildArrays(finalArray)
        fillShowcases()
    })
    xhr.send()
})


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

function closeAll(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].style.height = '0vh'
    }
}

function buildArrays(array) {
    for (let i = 0; i < array.length; i++) {
        if(array[i].valor < 0){
            array[i].valor = parseInt(array[i].valor) * -1
            saidas.push(array[i])
        }else{
            entradas.push(array[i])
        }
    }
}

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

}