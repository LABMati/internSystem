const side_menu = document.querySelector('main aside')
const toggle_btn = document.querySelector('button')
const section = document.querySelector('section')
const initialWidth = side_menu.style.width
const opt = document.querySelectorAll('aside > *')
let closed = false;


toggle_btn.addEventListener('click', ev => {
    if (closed) {
        hideAll(opt)
        toggle_btn.children[0].className = "fas fa-chevron-left"
        side_menu.style.width = initialWidth
        closed = false
    } else {
        hideAll(opt)
        toggle_btn.children[0].className = "fas fa-chevron-right"
        side_menu.style.width = '0'
        closed = true
    }
})

function hideAll(opt) {
    if (opt[0].style.display != 'flex') {
        console.log('entrou')
        for (let i = 0; i < opt.length; i++) {
            opt[i].style.display =='flex'
        }
    }else{
        for (let i = 0; i < opt.length; i++) {
            opt[i].style.display == 'none'
        }
    }
}