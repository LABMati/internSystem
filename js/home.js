const showcaseTrigger = document.querySelectorAll('.showcase-title')
const showcaseBody = document.querySelectorAll('.showcase-body')

for (let i = 0; i < showcaseTrigger.length; i++) {
    showcaseTrigger[i].addEventListener("click", ev=>{
        if (showcaseBody[i].style.height == '0vh' ||showcaseBody[i].style.height == '' ) {
            closeAll(showcaseBody)
            showcaseBody[i].style.height = '20vh'   
        }else{
            showcaseBody[i].style.height = '0vh'
        }
    })
}

function closeAll(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].style.height = '0vh'
    }
}