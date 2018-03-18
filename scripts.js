var allCont = document.querySelector('div.caixamaterna');
var estagiario = allCont.querySelector('div.estagiario');
var adm = allCont.querySelector('div.ademir');
var logo = document.querySelector('img.logolab')
var logodiv = document.querySelector('div.logodiv')
var executed = false;

adm.addEventListener('click', 
	function(){
		if (!executed) {
			logo.style.width = 'calc(100vw/8)'
			logo.style.paddingTop = '5vh'
			logodiv.style.alignItems = 'flex-start'
			estagiario.remove();
			document.querySelector('h1').remove();
			setInterval(showForm(), 500)
			executed = true;
		}
	}
)

estagiario.addEventListener('click', 
	function(){
		if (!executed) {
			logo.style.width = 'calc(100vw/8)'
			logo.style.paddingTop = '5vh'
			logodiv.style.alignItems = 'flex-start'
			adm.remove();
			document.querySelector('h1').remove();
			setTimeout(showForm, 500)	
		}
	}
)

function showForm(){
	document.querySelector('form').style.display = 'flex'

}