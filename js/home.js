const showcaseTrigger = document.querySelectorAll('.showcase-title')
const showcaseBody = document.querySelectorAll('.showcase-body')

for (let i = 0; i < showcaseTrigger.length; i++) {
    showcaseTrigger[i].addEventListener("click", ev=>{
        if (showcaseBody[i].style.height == '0vh' ||showcaseBody[i].style.height == '' ) {
            showcaseBody[i].style.height = '20vh'   
        }else{
            showcaseBody[i].style.height = '0vh'
        }
    })
}