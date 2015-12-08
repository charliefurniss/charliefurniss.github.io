$(document).ready(function() {

	var Player = function(){

		this.name = "Charlie";
		this.score = 2;
		this.position = "1";

	};


	var playerNameLog = [];

	var player1 = new Player();

	console.log(player1);

	var leaderboard = $("ol.leaderboard");

	var template = $("li.player").first();

	addPlayerToBoard();

	function addPlayerToBoard(){

		$(player1).each(function(index, playerInfo){

			var newPlayer = template.clone();

			console.log(newPlayer.find(".score").text());

			console.log(playerInfo.score);
			
			newPlayer.find(".name").text(playerInfo.name);

			newPlayer.find(".score").text(playerInfo.score);

			leaderboard.append(newPlayer);

			playerNameLog.push(newPlayer.name);			

		});

	}

});