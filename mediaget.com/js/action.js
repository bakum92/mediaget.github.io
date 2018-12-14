function setMethod(methodName, item) {
	var formElement = null;
	
	if(typeof(item)=='string') {
		formElement = document.getElementById(item);
	} else if(item) {
		formElement = item.form;
	}
	
	if(formElement) {
		formElement.elements['method'].value = methodName; 
	} else {
		document.getElementById('method').value = methodName;
	}
}

function redirect(url) {
	if (navigator.userAgent.indexOf("MSIE") >= 0) {
		newlink = document.createElement('a');
		newlink.style.visibility = "hidden";
		newlink.href=url;
		document.body.appendChild(newlink);
		newlink.click();
	} else {
		document.location.href = url;
	}
}

function back() {
	if(document.forms && document.forms.length > 0 && document.forms[document.forms.length-1].elements['method']) {
		document.forms[document.forms.length-1].method.value = "goBack";
		//document.forms[document.forms.length-1].actionType.value = "NavigationAction";
		document.forms[document.forms.length-1].submit();
	} else if(document.referrer) {
		redirect(document.referrer);
	} else {
		history.go(-1);
	}
}