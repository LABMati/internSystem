const form = document.querySelector("form")
form.inputs = form.querySelectorAll("input")
form.bt = form.querySelector("button")
form.bt.addEventListener('click', ev => {
    if (form.inputs[0].value != '') {
        register()
    } else {
        console.log("Falta o nome mano")
    }
})

function register() {
    var xhr = new XMLHttpRequest()
    let url = 'http://127.0.0.1/lab/inventory.php?no=' + form.inputs[0].value
    if (form.inputs[1].value != '')
        url += '&nu=' + form.inputs[1].value
    if (form.inputs[2].value != '')
        url += '&de=' + form.inputs[2].value
    if (form.inputs[3].value != '')
        url += '&qt=' + form.inputs[3].value
    xhr.open('GET', url, true)
    xhr.addEventListener('load', ev => {

    })
    xhr.send()
}