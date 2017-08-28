document.getElementById("add").addEventListener("click", add);
displayList();
displayFinishedItemList();

//Hämtar syssla från inputruta, lägger till i local storage, kallar på displayList
function add() {
    var item = document.getElementById("item").value;
	var arr = [];
	arr = item.split("");
	var string = true;
	
	if (item.length === 0) {
		string = false;
	}
	else {
		for (var i in arr) {
			if(arr[i] !== " ") {
				string = true;
				break;
			}
			else {
				string = false;
			}
		}
	}
	if (string === false) {
		alert("Tomma sysslor undanbedes");
	}
	else {
		var todos = getTodoListFromLocalStorage();
		todos.push(item);
		localStorage.setItem("todo", JSON.stringify(todos));
	 	displayList();
	}
}
 
 //Returnerar todolista i form av JS array 
function getTodoListFromLocalStorage() {
	
    var todos = [];
    var todoStr = localStorage.getItem("todo");
	
    if (todoStr !== null) {
        todos = JSON.parse(todoStr); 
    }
    return todos;
}

//Returnerar finished items lista i form av JS array
function getFinishedItemsFromLocalStorage() {
	
    var finishedItems = [];
    var finishedStr = localStorage.getItem("finished");
		
    if (finishedStr !== null) {
        finishedItems = JSON.parse(finishedStr); 
    }
    return finishedItems;
}

function remove() {
		
	var todos = getTodoListFromLocalStorage();
	var x = this.getAttribute("id");
	var y = parseInt(x.charAt(x.length-2) + x.charAt(x.length-1));
	
    todos.splice(y, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
	displayList(); 
}

function removeFinishedItem() {
		
	var finished = getFinishedItemsFromLocalStorage();
	var x = this.getAttribute("id");
	var y = parseInt(x.charAt(x.length-2) + x.charAt(x.length-1));
	
    finished.splice(y, 1);
    localStorage.setItem("finished", JSON.stringify(finished));
	displayFinishedItemList(); 
}
 
/*Kallar på getTodoListFromLocalStorage som hämtar json objekt från local storage och konverterar det till JS array */
function displayList() {
    var todos = getTodoListFromLocalStorage();
	var removeButtons = document.getElementsByClassName("remove");
	var editButtons = document.getElementsByClassName("edit");
	var moveToFinishedButtons = document.getElementsByClassName("moveToFinished");
    var todoList = '<ul id="todoList">';
    
	for (var i in todos) {
		if(i < 10) {
			todoList += "<li id='"+ 'li0' + i  + "'>" + todos[i] + "</li>"+'<button title="Edit Item" class="tilt edit" id="'+ "edit0" + i  + '"><img src="1459009976_new-24.png" /></button><button title="Remove Item" class="tilt remove" id="'+ "remove0" + i  + '"><img src="1459009965_cross-24.png" /></button>  <button title="Move To Finished" class="tilt moveToFinished" id="'+"moveToFinished0" + i  + '"><img src="1459009938_checkmark-24.png" /></button>';
		}
		else {
			todoList += "<li id='"+ 'li' + i  + "'>" + todos[i] + "</li>"+'<button title="Edit Item" class="tilt edit" id="'+ "edit" + i  + '"><img src="1459009976_new-24.png" /></button><button title="Remove Item" class="tilt remove" id="'+ "remove" + i  + '"><img src="1459009965_cross-24.png" /></button>  <button title="Move To Finished" class="tilt moveToFinished" id="'+"moveToFinished" + i  + '"><img src="1459009938_checkmark-24.png" /></button>';	
		}
    }
    todoList += "</ul>";
	
	document.getElementById("todos").innerHTML = todoList;
	console.log(editButtons);
 	
    for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", remove);
    }
	for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", editItem);
    }
	for (var i = 0; i < moveToFinishedButtons.length; i++) {
        moveToFinishedButtons[i].addEventListener("click", MoveToFinished);
    }
}

function displayFinishedItemList() {
    var finishedItems = getFinishedItemsFromLocalStorage();
	var finishedList = '<ul id="finishedList">';
    var removeButtons = document.getElementsByClassName("removeFinished");
	
	for (var i in finishedItems) {
		if(i < 10) {
			finishedList += "<li id='"+ 'finli0' + i  + "'>" + finishedItems[i] + "</li>"+'<button title="Remove Item" class="tilt removeFinished" id="'+ "removeFinished0" + i  + '"><img alt="Remove Item" src="1459009965_cross-24.png"  style="float: left;"/></button>';
		}
		else {
			finishedList += "<li id='"+ 'finli' + i  + "'>" + finishedItems[i] + "</li>"+'<button title="Remove Item" class="tilt removeFinished" id="'+ "removeFinished" + i  + '"><img alt="Remove Item" src="1459009965_cross-24.png"  style="float: left;"/></button>';	
		}
    }
    finishedList += "</ul>";
	
    document.getElementById("finishedItems").innerHTML = finishedList;
 
    for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", removeFinishedItem);
    }
}

function MoveToFinished() {
	var todos = getTodoListFromLocalStorage();
    var finished = getFinishedItemsFromLocalStorage();
		
	var x = this.getAttribute("id");
	var y = x.charAt(x.length-2) + x.charAt(x.length-1);
	var str = document.getElementById("li" + y).innerHTML;
	
	var arr = [];
	arr = str.split(";");
	var string = true;
	console.log(arr);
	for (i in arr) {	
			if (arr[i] !== "&nbsp" && arr[i] !==  " &nbsp" && arr[i] !== "" && arr[i] !== " <br>" && arr[i] !== "<br>" && arr[i] !== " ") {
				string = true;
				break;
			}
			else {
				string = false;
			}
		}
	if (string === false) {
		alert("tomma sysslor undanbedes");
	}
	else {
	console.log(typeof y);
	finished.push(str);
	localStorage.setItem("finished", JSON.stringify(finished));
	todos.splice(y, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
	displayList(); 
	displayFinishedItemList();
	}
}

function editItem () {
	var todos = getTodoListFromLocalStorage();
	console.log(this);
	this.removeEventListener("click", editItem);
	this.previousSibling.contentEditable = true;
	this.innerHTML = '<img title="Done" src="1459009938_checkmark-24.png">';
	this.addEventListener("click", doneEdit);
}

function doneEdit () {
	var todos = getTodoListFromLocalStorage();
	var x = this.id.charAt(this.id.length -2) + this.id.charAt(this.id.length - 1);
	var itemText = document.getElementById("li" + x);
	
	var arr = [];
	arr = itemText.innerHTML.split(";");
	var string;
	
	var y;
		if (x < 10) {
			y = x.charAt(x.length - 1);
		}
		else {
			y = x;
		}
	for (i in arr) {	
			if (arr[i] !== "&nbsp" && arr[i] !==  " &nbsp" && arr[i] !== "" && arr[i] !== " <br>" && arr[i] !== "<br>" && arr[i] !== " ") {
				string = true;
				break;
			}
			else {
				string = false;
			}
		}
	if (string === false) {
		alert("tomma sysslor undanbedes");
	}
	else {
		todos.splice(y, 1, itemText.innerHTML);
		localStorage.setItem("todo", JSON.stringify(todos));
		displayList();
		this.addEventListener("click", editItem);
	}
}


 
