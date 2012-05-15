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
		if(_myState !== gameStates.GameOver) { 
			if(player === coordinateState.Black) {
				_myState =  gameStates.WhitesTurn;
			}
			else {
				_myState =  gameStates.BlacksTurn;	
			}
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
	    _myState = gameStates.BlacksTurn;
	    

	 };

	 var blacksTurn = function() {
		 makeMove(coordinateState.Black); 	

	 };

	 var whitesTurn = function() {
	 	
	     	makeMove(coordinateState.White);
	 };

	var gameOver = function() {

	};




	return  {

		playGame : function() {
        
		
		while(_myState !== gameStates.GameOver) {
	
			switch (_myState) {

			case gameStates.NewGame:
				newGame();

			case gameStates.BlacksTurn:
				 blacksTurn(); 
				
				break;
			case gameStates.WhitesTurn:
				whitesTurn(); 
				break;
			}
		
		}
		gameOver();
	},

		validPositions: function( player) {
			return RM.validPositions( player);
		},

		askToBeNotified: function(func) {
			RM.addToBeNotified(func);
		}
	}
}
)();