/// <reference path="../jquery-1.7.1.min.js" />
"use strict";

var coordinateState = {
    Illegal:-1, 
    Empty:0,
    White:1, 
    Black:2
}

var RM = (function () {
    // Privates
    var _Coordinates = [];
    var ROWS = 8;
    var COLS = 8;

    var coordinate = function(x,y)
    {
      return _Coordinates[((y - 1) * ROWS) + x-1];
    };

    var getOpponent = function(player)
    {
      return  player === coordinateState.Black 
        ? coordinateState.White
        : coordinateState.Black;
    };

    var playerMarkers = function(player) 
    {
      var retval = [];
      $.each (_Coordinates, function (ix, itm) {
          if (itm.State === player) {
            retval.push(itm);
          }
      });
      return retval; 
    };
    //Public functions
    return {

      
      emptyBoard: function() {
      var values = [
    99, -8, 8, 6, 6, 8, -8, -99,
    -8,-24,-4,-3,-3,-4,-24,-8,
    8,-4,7,4,4,7,-4,8,
    6,-3,4,0,0,3,-3,6,
    6,-3,4,0,0,4,-3,6,
    8,-4,7,4,4,7,-4,8,
    -8,-24,-4,-3,-3,-4,-24,-8,
    99, -8, 8, 6, 6, 8, -8, -99
    ];
      _Coordinates = [];
      var max = ROWS * COLS;
      for (var i = 0; i < max; i++)  {
        _Coordinates.push( {
        X: ( i % ROWS) + 1,
        Y: parseInt( 1 + i / COLS, 10),
        State: coordinateState.Empty, 
        Value: values[i]
      });
        }
      },

      coordinateState: function(x,y) {
        if (x <= 0 || x > COLS || y <= 0 || y > ROWS) {
          return coordinateState.Illegal;
        }
        return coordinate(x,y).State;
      },

      changeCoordinateState: function( x, y, cs)
      {
        var el =coordinate(x,y); 
        el.State = cs; 

        $( document ).trigger( "CoordinateStateChanged", [el] );
      },

      
      makeMove: function (x, y, player) {

         var opponent = getOpponent(player);
         var currX; 
         var currY;
         var candidates =[];
         var transaction = [];

         transaction.push(
          { X: x,
            Y: y, 
            Color: player});
         //RM.changeCoordinateState(x,y,player);

        $.each(directions, function(ix, dir) {
          currX = x + dir.X;
          currY = y + dir.Y; 
          while( RM.coordinateState(currX, currY) === opponent)
          {
            candidates.push(coordinate(currX,currY))
            currX += dir.X; 
            currY += dir.Y; 
          }
          if( RM.coordinateState(currX, currY) == player)
          {
            $.each( candidates, function(ix,itm){
             // RM.changeCoordinateState( itm.X,itm.Y,player); 
             transaction.push( 
                { X:itm.X,
                  Y:itm.Y,
                  Color:player});
            });   
          }
         candidates =  candidates.splice(candidates.length, candidates.length);
        });
        return transaction;
      },

    bestPosition : function (player) {
      var pos = RM.validPositions(player);
      var bestPos = null;
      if (pos.length > 0) {
        bestPos = pos[0];
        $.each(pos, function(ix, itm){
          if(itm.Value > bestPos.Value){
            bestPos = itm;
          }
        });
      }
      return bestPos;
    },

    validPositions: function( player) {
       var opponent = getOpponent(player);
       var retval = [];
       var markers = playerMarkers(player);   
       var currX; 
       var currY; 
       var foundOpponent = false; 
       
       $.each(markers, function(ix, itm){
          $.each(directions, function(ix, dir) {
            currX = itm.X + dir.X;
            currY = itm.Y + dir.Y; 
            foundOpponent = false;
 
            while( RM.coordinateState(currX, currY) === opponent)
            {
              foundOpponent = true; 
              currX += dir.X; 
              currY += dir.Y; 
            }

            if(foundOpponent && RM.coordinateState(currX, currY) 
                === coordinateState.Empty) {
              retval.push(coordinate(currX, currY));
            }
          });
       }); 
       return retval;
    }
  }
}
)();

 