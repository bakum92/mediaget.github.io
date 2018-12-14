function createRequestObject()
{
    if (window.XMLHttpRequest) {
        try {
            return new XMLHttpRequest();
        } catch (e){}
    } else if (window.ActiveXObject) {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e){
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (e){}
        }
    }
    return null;
}

function openDok(url, element_id) {
	page = url;
	//First we obtain the contents for modal window
	var oRequest = createRequestObject();
	var winCont;

	oRequest.open("GET", url, false);
	oRequest.setRequestHeader("User-Agent", navigator.userAgent);
	oRequest.setRequestHeader("Content-type", "text/html; charset=UTF-8");
	oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	oRequest.send(null);

	if (oRequest.status == 200) winCont = oRequest.responseText;
	else winCont = "Error executing XMLHttpRequest call: " + oRequest.status;
	
	if(element_id)
		document.getElementById(element_id).innerHTML = winCont;
}

function openDokEl(url, element) {
	page = url;
	//First we obtain the contents for modal window
	var oRequest = createRequestObject();
	var winCont;

	oRequest.open("GET", url, false);
	oRequest.setRequestHeader("User-Agent", navigator.userAgent);
	oRequest.setRequestHeader("Content-type", "text/html; charset=UTF-8");
	oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	oRequest.send(null);

	if (oRequest.status == 200) winCont = oRequest.responseText;
	else winCont = "Error executing XMLHttpRequest call: " + oRequest.status;
	
	if(element)
		element.innerHTML = winCont;
}

function getDok(url) {
	page = url;
	//First we obtain the contents for modal window
	var oRequest = createRequestObject();
	var winCont;

	oRequest.open("GET", url, false);
	oRequest.setRequestHeader("User-Agent", navigator.userAgent);
	oRequest.setRequestHeader("Content-type", "text/html; charset=UTF-8");
	oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	oRequest.send(null);

	if (oRequest.status == 200) winCont = oRequest.responseText;
	else winCont = "Error executing XMLHttpRequest call: " + oRequest.status;
	
	return winCont;
}