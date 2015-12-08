$(document).ready(function() {

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9,
	  onready: start
	});

	function start(){

		var simonButton;
		var simonLog = [];
		var playerClick;
		var playerClickLog = [];
		var playerClickNumber = 0;

		var round = 1;

		var playerName;

		var faultSound = ["audio/faster.wav"];

		intro();

		function intro(){

			$("#board").css("display", "none");
			$("#infoWindow").slideDown();

			enterPlayerName();	

		}	

		function enterPlayerName(){

			$("#board").css("display", "none");
			$("#infoWindow").slideDown();
			$("#enterName").slideDown();
			$("#nameInput").slideDown();

			$("#nameInput").focus();

			$(document).keypress(function(e){

				playerName = $("#nameInput").val().toLowerCase();

				if (e.which == 13) {

					$("#enterName").css("display", "none");
					$("#nameInput").css("display", "none");
					$("#nameInput").val("");

					$(document).unbind("keypress");

					setUpGame();

					startGame();

				}	

			})

		};

		function setUpGame(){

			simonButton = "";
			simonLog = [];
			playerClick = "";
			playerClickLog = [];
			playerClickNumber = 0;
			round = 1;

			displayPlayerName(playerName);

			$("#infoWindow").css("display", "none");
			
			setTimeout(function(){

				$("#board").css("display", "block");
			
			}, 1000);

		}

		function startGame() {

			setTimeout(function(){

  			colourGenerator();
	  		
	  	}, 2000);	

		}

		function displayPlayerName(name){

			console.log(name);

			$("h2").text(name + ": 0");
			$("h2").slideDown(name + ": 0");
			// $("h2").show("slide", { direction: "left" }, 500);

		}
		
		function colourGenerator(){

			var redButton = $(".red");
			var greenButton = $(".green");
			var blueButton = $(".blue");
			var yellowButton = $(".yellow");

			var randomNumber = Math.random() * 4;

			if (randomNumber <= 1) {

				simonButton = redButton;

			} else if (randomNumber <= 2) {

				simonButton = greenButton;

			} else if (randomNumber <= 3) {

				simonButton = blueButton;

			} else {

				simonButton = yellowButton;

			}

			simonLog.push(simonButton.attr('class'));

			simonFlashSound();

			pClick();

		};

		function pClick(){

			$("input").each(function(){

				$(this).on("click", function(){

					$("input").off("click");

					playerClick = $(this);

					playerFlashSound(playerClick.attr('class'));	

					playerClickLog.push(playerClick.attr('class'));

					assessEachClick();

				})
				
			})

		};

		//accept player click and log the button pushed

		function assessEachClick() {

				console.log(playerClickLog[playerClickNumber]);

				console.log(simonLog[playerClickNumber]);

				if (playerClickLog[playerClickNumber] == simonLog[playerClickNumber]){	

					playerTurn();

					} else {

						alertError();

					}	

			

		}

		function playerTurn(){

			if (playerClickLog.length < simonLog.length) {

				playerClickNumber++;

				pClick();

			} else {

				$("h2").text(playerName + ": " + (round));

				round++;

				playerClickLog.length = 0;

				playerClickNumber = 0;

				setTimeout(function(){

					colourGenerator();

				}, 1000);

			}

		}

		function simonFlashSound(){		

			for (i = 0; i < simonLog.length; i++) {

				(function(i){

					  setTimeout(function(){
					           
				  		$("." + simonLog[i]).css("background-color", $("." + simonLog[i]).attr('id'));

				  		makeSound($("." + simonLog[i]).attr('url'));

				  		setTimeout(function(){

					  		$("." + simonLog[i]).css("background-color", $("." + simonLog[i]).attr('value'));

					  		}, 300);				  			
						}, 500 * i);
					}(i));
			};		
		}

		function playerFlashSound(buttonClass){

			$("." + buttonClass).css("background-color", $("." + buttonClass).attr('id'));

			makeSound($("." + buttonClass).attr('url'));

				setTimeout(function(){

					$("." + buttonClass).css("background-color", $("." + buttonClass).attr('value'));

				}, 300);
	
		};

		function wrongSound(){

			eSound = soundManager.createSound({
			        
			      "url": "audio/errorSound.mp3"

			    });

			eSound.play();

		};

		function makeSound(buttonURL){

			mySound = soundManager.createSound({
			        
			      "url": buttonURL

			    });

			mySound.play();

		};

		function alertError(){

			simonButton = "";
			simonLog = [];
			playerClick = "";
			playerClickLog = [];
			playerClickNumber = 0;
			round = 1;

			wrongSound();

			$("#board").css("display", "none");
			$("#infoWindow").slideDown();
			playAgain();

		}

		function playAgain(){

			$("#message").text("whoops!");

			setTimeout(function(){

				$("#message").slideUp();
				$("#question").text("do you want to play again (y/n)?");
				$("#question").slideDown();

			}, 2000);

			$(document).keypress(function(e){

				if (e.which == 89 || e.which == 121) {

					setUpGame();

					startGame();
				
				}
				
				else if (e.which == 78 || e.which == 110) {

					$("#question").css("display", "none");

					setTimeout(function(){

						$("#infoWindow").slideDown();

						intro();

					}, 2000);	

				}

			})

		}

	}	

});
