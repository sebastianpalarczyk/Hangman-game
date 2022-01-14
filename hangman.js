document.addEventListener("DOMContentLoaded", function(){
	
	var poverbs =    ["Bez pracy nie ma kołaczy", "Fortuna kołem się toczy", "Darowanemu koniowi w zęby się nie zagląda",
                      "Nie chwal dnia przed zachodem słońca", "Lepszy wróbel w garści niż gołąb na dachu",
					  "Apetyt rośnie w miarę jedzenia", "Co ma wisieć nie utonie", "Dzieci i ryby głosu nie mają",
					  "Grosz do grosza a będzie kokosza", "Łaska pańska na pstrym koniu jeździ"];
					  
    
	var random_number = Math.floor(Math.random()*9+0);

    var proverb = poverbs[random_number];

	proverb = proverb.toUpperCase();

	var veiled_proverb = "";

	var miss = 0;

	var yes = new Audio("yes.wav");
    var no = new Audio("no.wav");

	var letters = new Array(35);

    letters[0] = "A"; letters[1] = "Ą"; letters[2] = "B"; letters[3] = "C";
    letters[4] = "Ć"; letters[5] = "D"; letters[6] = "E"; letters[7] = "Ę"; 
    letters[8] = "F"; letters[9] = "G"; letters[10] = "H"; letters[11] = "I";
    letters[12] = "J"; letters[13] = "K"; letters[14] = "L"; letters[15] = "Ł";
    letters[16] = "M"; letters[17] = "N"; letters[18] = "Ń"; letters[19] = "O";
    letters[20] = "Ó"; letters[21] = "P"; letters[22] = "Q"; letters[23] = "R";
    letters[24] = "S"; letters[25] = "Ś"; letters[26] = "T"; letters[27] = "U";
    letters[28] = "V"; letters[29] = "W"; letters[30] = "X"; letters[31] = "Y";
    letters[32] = "Z"; letters[33] = "Ż"; letters[34] = "Ź";

	for(i=0; i<proverb.length; i++){
		if(proverb.charAt(i) == " "){
			veiled_proverb = veiled_proverb+" ";
		}else{
			veiled_proverb = veiled_proverb+"-";
		}
	}
	
	function show_proverb(){
		document.getElementById("plansza").innerHTML = veiled_proverb;
	}
	
	window.onload = start;

	String.prototype.set_sign = function(place, sign){
		if(place>this.length - 1){
			return this.toString;
		}else{
			return this.substr(0, place) + sign + this.substr(place+1);
		}
	}

	function start(){

		var div = document.getElementById("alfabet");
		for(i=0; i<35; i++){
				var div_content = document.createElement("div");
				div_content.classList.add("litera");
				div_content.innerHTML = letters[i];
				div_content.id = i;
				if(i % 7 == 0){
					div_content.style.clear = "both";
				 }
				div.appendChild(div_content);
			}
		show_proverb();
		const downloaded_letters = document.querySelectorAll(".litera");
	    downloaded_letters.forEach(letter=>{
			letter.addEventListener("click", sprawdz);
		})
	}

	function sprawdz(){
        var hit = false;
				for(i=0; i<proverb.length; i++){
                    if(proverb.charAt(i) == letters[this.id]){
						veiled_proverb = veiled_proverb.set_sign(i,letters[this.id]);
						hit = true;
					}
				}
				if(hit == true){
					var element = this.id;
					document.getElementById(element).style.background = "#003300";
					document.getElementById(element).style.color = "#00C000";
					document.getElementById(element).style.border = "3px solid #00C000";
					document.getElementById(element).style.cursor = "default";
					yes.play();
					show_proverb
		();
				}else{
					var element = this.id;
					document.getElementById(element).style.background = "#330000";
					document.getElementById(element).style.color = "#C00000";
					document.getElementById(element).style.border = "3px solid #C00000";
					document.getElementById(element).style.cursor = "default";
					no.play();
					//miss
					miss++;
					var link = "img/s"+miss+".jpg";
					document.getElementById("szubienica").innerHTML = '<img src="'+link+'" alt=""/>';
				}
				this.removeEventListener("click", sprawdz);

				//prize
				if(proverb == veiled_proverb){
					document.getElementById("alfabet").innerHTML = "Brawo! Podano prawidłowe hasło: "+proverb+'<br><br>';
					var span = document.createElement("span");
					span.classList.add("reset");
					span.innerText = "Chcesz zagrać jeszcze raz! Kliknij mnie";
					span.addEventListener("click", function(){
						location.reload();
					})
					document.getElementById("alfabet").appendChild(span);
				}

				//defeat
				if(miss >= 9){
					document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: "+proverb+'<br><br>';
					var span = document.createElement("span");
					span.classList.add("reset");
					span.innerText = "Chcesz zagrać jeszcze raz! Kliknij mnie";
					span.addEventListener("click", function(){
						location.reload();
					})
					document.getElementById("alfabet").appendChild(span);
				}
	}
})
