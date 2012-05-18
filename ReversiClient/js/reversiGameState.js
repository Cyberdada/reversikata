/// <reference path="../jquery-1.7.1.min.js" />
"use strict";

var gameStates = {
	Unknown:-1,
    NewGame:0, 
    BlacksTurn:1,
    WhitesTurn:2, 
    GameOver:3
}

var RGS = (function () {
	//Privates 
	var _myState = gameStates.NewGame;;
	var _opponentCouldMove = true;

	

	var makeMove = function(player)
	{
		var pos = RM.validPositions(player);
		var selectedMove =null;
		if (pos.length > 0) {
			selectedMove = pos[Math.floor((Math.random()*pos.length))];
			RM.makeMove(selectedMove.X, selectedMove.Y, player);
			_opponentCouldMove = true;
		}
		else {
			checkGameOver();
		}
	};

	var changeTurn = function(player) {
		if(_myState === gameStates.GameOver) { 
			return;
		}
		if(player === coordinateState.Black) {
			_myState =  gameStates.WhitesTurn;
		}
		else {
			_myState =  gameStates.BlacksTurn;	
		}
			
	};

	var checkGameOver = function() {
		if (!_opponentCouldMove) {
			_myState = gameStates.GameOver;
			return true;
		}
		_opponentCouldMove = false;
		return false;
	};

	var	newGame = function() {
	    
	    RM.emptyBoard(8,8);
	    RM.changeCoordinateState(4,4,coordinateState.White);
	    RM.changeCoordinateState(5,5,coordinateState.White);
	    RM.changeCoordinateState(4,5,coordinateState.Black);
	    RM.changeCoordinateState(5,4,coordinateState.Black);
	    _myState = gameStates.WhitesTurn;
	 };

	 var whitesTurn = function() {
	     makeMove(coordinateState.White);
	     changeTurn(coordinateState.White);
	 };

	var gameOver = function() {
	};

	return  {
		  
		blacksMove : function(e, itm) {
	 	if(itm !== null && itm !== undefined){
	 		_opponentCouldMove = true;
	 		RM.makeMove(itm.X, itm.Y, itm.State);	
	 	}
	 	else {
			checkGameOver();
		} 	
		 changeTurn(coordinateState.Black);
		 RGS.playGame();
	 	},


		 playGame : function() {
        		
		while(_myState !== gameStates.GameOver) {
			switch (_myState) {
				case gameStates.NewGame:
					newGame();
					break;
				case gameStates.BlacksTurn:

				   $(document).trigger("BlacksTurn",
				   		[RM.validPositions(coordinateState.Black)] );
				 	return;
				 	//blacksTurn(); 	
					break;
				case gameStates.WhitesTurn:
					whitesTurn(); 
					break;
			}
		}
		gameOver();
	},
	}
}
)();

$(document).ready(function () {

 	$(document).bind("BlacksMove", RGS.blacksMove); 
});