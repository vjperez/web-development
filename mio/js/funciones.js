jQuery.dameLook = function(pageName){
	jQuery.get(pageName, function(datosDeRespuesta, estatus, xhrObjeto){
		//console.log(datosDeRespuesta);
		var elMain = jQuery(datosDeRespuesta).filter('#main');
		//console.log(mainDeBusca);
		jQuery('#containerForMain').html(elMain);
	});	
}

//extracs parameters from the url
jQuery.urlParametro = function(name){
	var str = window.location.href;
	var patron = new RegExp('[\?&]' + name + '=([^&#]*)');
	var results = patron.exec(str);  //searches str for a pattern described in patron
	//results is an array, contains NJLL when name=" " is not found on str. 
    //otherwise results[0] contains name=" ", and 
	//          results[1] contains the " " after the = sign and before  ? or &	
	if(results === null) return null;
	else return results[1];
	//return results[1] || 0;
}


jQuery.cleanStr = function(str){
	var patron = /[^a-z0-9]/gi;  // Find any character NOT between the brackets, global, insensitive
	str = str.replace(patron, '*'); // same as replace(/[^a-zA-Z0-9]/g, '*'); JavaScript is a case-sensitive language
	strArray = str.split('*');
	result = '';
	for(var i=0; i < strArray.length; i++){
		//alert('parte de strArray=(' + strArray[i]  + ')');
		if (strArray[i] != '') {
			if(result !== ''){result += ':';} //the first time, dont run this line of code, simply add the 'word', other times add a ':' before the word as delimiter
			result += strArray[i];
		}
	}
	return result;
}


jQuery.isVacioStr = function(str){
	if (str === null) return true;
	else return str.length == 0;
}

jQuery.isNotVacioStr = function(str){
	//  str !== null && str !== ''
	return ! jQuery.isVacioStr(str);
}


jQuery.fallas = function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){
//Called at getJSON .fail and jQuery post when parsing errors (caused by PHP Exceptions), and
//other errors are found.
//jQuery getJSON will throw an error and run the .fail code whenever it cannot
//parse a response from server, (that includes PHP Exceptions which are not valid JSON!).  So the
//text from PHP Exceptions will endup here.
//jQuery post will NOT run .fail code when JSON parsing errors are found. So in order
//to redirect here PHP Exceptions from the login section,
//i have to explicitly try the JSON parse in a try-catch block, and when a parsing error
//is catched, call this function.
	//get creaDueno look
	jQuery.dameLook('looks/error.html');

	jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
		if(settingsObjeto.url === 'looks/error.html'){
			losLis = '<br><hr>';
			
			losLis += '<li>' + estatusForFAIL + '</li>';
			losLis += '<li><span class="colorenfasis">Mensaje del servidor:<br></span>' + errorMessageSentByServer + '</li>';
			losLis += '<li><span class="colorenfasis">Texto respuesta:<br></span>'      + xhrObjetoForFAIL.responseText + '</li>';
			
			losLis += '<br><hr>';
			jQuery('#containerForErrors').append(losLis);
		}
	});
}


jQuery.feedback = function(elementoDonde, mensaje, forma){
	if(forma === 'downdelayup') {
		jQuery(elementoDonde).text(mensaje);
		jQuery(elementoDonde).slideDown(500).delay(1000).slideUp(2000);
	}
	else jQuery(elementoDonde).text(mensaje);
}


jQuery.toggleOnClick = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	var $todosLosHidable = jQuery('.hidable');
	$todosLosHidable.hide();
	$todosLosNotHidable.on('click', function(evento){
		var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
		$toToggle.toggle();
	});
}


jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
	//Esta funcion la usan login y registra
	//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
	//Chequear Usuario repetido requiere hacer el post, pq requiere info de database.
	// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal; se puede chequear antes del post
	usertbCheck = usertb.replace(/[^a-z0-9]/gi, '');  //same as replace(/[^a-zA-Z0-9]/g, ''); JavaScript is a case-sensitive language
	pass01Check = pass01.replace(/[^a-z0-9]/gi, '');
	pass02Check = pass02.replace(/[^a-z0-9]/gi, '');
	if(usertb.length < 4 || pass01.length < 4 || pass02.length < 4){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, "Usuario o contrase\u00f1a es muy corto.");
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(usertbCheck.length < usertb.length  ||  pass01Check.length < pass01.length ||  pass02Check.length < pass02.length){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Usa solo letras y/o numeros.');
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(pass01 !== pass02){  //same type, same value, no type conversion, case sensitive
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Las contrase\u00f1as son diferentes.');
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else{
		return true;
	}
}