 function changeImg() {
	 alert("change");
	var verify=document.getElementById('verifyImg');
	verify.setAttribute('src','/mer/login/graphImg?r='+Math.random());
}

function loadImg() {
	alert("load");
	document.getElementById('verifyImg').src = '/mer/login/graphImg';
}