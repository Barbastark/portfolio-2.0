function _id(selector) { return document.getElementById(selector); }
function _classname(selector) { return document.getElementsByClassName(selector); }

function submitForm() {
	_id("btn-submit").disabled = true;
	_id("status").innerHTML = "Vänligen vänta";
	var  formdata = new FormData();
	formdata.append("fname", _id("fname").value);
	formdata.append("lname", _id("lname").value);
	formdata.append("email", _id("email").value);
	formdata.append("spamblocker", _id("spamblocker").value);
	formdata.append("msg", _id("msg").value);
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "php/submit.php");
	ajax.onreadystatechange = function() {
		
		if(ajax.readyState == 4 && ajax.status == 200) {
			var response = JSON.parse(ajax.responseText);
			console.log(response)
			if(response.length > 1) {
				for(var i = 0; i < response.length; i++) {
					_id("error"+i).innerHTML = response[i];
				}
			} else if(response == "success") {
			    _id("status").innerHTML = "<p>Meddelandet har skickats</p>"; 
			    var fields = _classname("field");
			    for(var i = 0; i < fields.length; i++ ) {
			    	fields[i].value = "";
			    }
			} else {
				_id("status").innerHTML = `<p>${ajax.responseText}</p>`;
				_id("btn-submit").disabled = false;
			}	
		}
	}
	ajax.send( formdata );
}
