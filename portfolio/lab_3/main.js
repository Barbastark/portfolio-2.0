
document.getElementById("btn").addEventListener("click", validation);

var input;

/*Undersöker om användaren matat in något i inputruta
  Om inte skickas felmeddelande
  Annars anropas textSearch funktionen*/
  
function validation() {
input = document.getElementById("search").value;
var validation = [];
	validation = input.split("");
	var string = true;
	
	if (input.length === 0) {
		string = false;
	}
	else {
		for (var i in validation) {
			if(validation[i] !== " ") {
				string = true;
				break;
			}
			else {
				string = false;
			}
		}
	}
	if (string === false) {
		alert("Tomma sökrutor genererar inga resultat!! Gnugga geniknölarna och försök igen");
	}
	else {
		textSearch();
	}
}

/*Hämtar objekt från databasen, konverterar till array.
  Utvalda värden hämtas sedan från arrayen och skickas 
  till DOM 
 */
function textSearch() {
		
	var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		
			if ((request.readyState!==4) && (request.status!==200)) {
				//var loadMessage = document.createElement("P");
				//loadMessage.setAttribute("id","loadmessage");
				document.getElementById("loadmessage").innerHTML = "Loading content, please wait.......";
			}
			
			if ((request.readyState===4) && (request.status===200)) {
				document.getElementById("textsearch").innerHTML = "";
				document.getElementById("loadmessage").innerHTML = "";
				
			
				var arr = JSON.parse(request.responseText);
				var arr2 = arr.results;
				var posterImg; 
				var  title;	
				var  releaseDate;
				var  voteAvg;
				var  voteCount;
				var  overview;
				var movieContainer;
				var posterContainer;
				console.log(arr2);
					for(var i in arr2)
					{
						//Skapar elementnoder och tilldelar id och vid behov klass
						movieContainer = document.createElement("DIV");
						movieContainer.setAttribute("id" , "container" + i);
						movieContainer.setAttribute("class" , "container");
						
						posterContainer = document.createElement("DIV");
						posterContainer.setAttribute("id" , "postercontainer" + i);
						posterContainer.setAttribute("class" , "postercontainer");
						
						posterImg = document.createElement("IMG");
						posterImg.setAttribute("alt","No Poster Found");
						
						title = document.createElement("P");
						title.setAttribute("class", "movieStats");
						
						releaseDate = document.createElement("P");
						releaseDate.setAttribute("class", "movieStats");
						
						voteAvg = document.createElement("P");
						voteAvg.setAttribute("class", "movieStats");
						
						voteCount = document.createElement("P");
						voteCount.setAttribute("class", "movieStats");
						
						overview = document.createElement("P");
						
						//Skickar till DOM						
						document.getElementById("textsearch").appendChild(movieContainer);
						document.getElementById("container" + i).appendChild(posterContainer);
						document.getElementById("postercontainer" + i).appendChild(posterImg).src ='http://image.tmdb.org/t/p/w500/' + arr2[i].poster_path;
						document.getElementById("container" + i).appendChild(title).innerHTML = "Title: " + arr2[i].title;
						document.getElementById("container" + i).appendChild(releaseDate).innerHTML = "Release date: " + arr2[i].release_date;
						document.getElementById("container" + i).appendChild(voteAvg).innerHTML = "Average vote: " + arr2[i].vote_average;
						document.getElementById("container" + i).appendChild(voteCount).innerHTML = "Vote count: " + arr2[i].vote_count;
						document.getElementById("container" + i).appendChild(overview).innerHTML = arr2[i].overview;
						
					}
									
				if (arr2.length === 0) {
					var nothingFound = document.createElement("P");
					document.getElementById("loadmessage").innerHTML = "Nothing found, please check your spelling";
				}
				
			}
		}
		
		request.open('GET', 'https://api.themoviedb.org/3/search/movie?&api_key=62dd9d8692c800c357c7bd1bf670c6aa&query=' + input);
		request.send();
}	

