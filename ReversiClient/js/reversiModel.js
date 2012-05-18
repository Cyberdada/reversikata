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
    var _Rows = 0;
    var _Cols = 0;
    var coordinate = function(x,y)
    {
      return _Coordinates[((y - 1) * _Rows) + x-1];
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

      
      emptyBoard: function(cols,rows) {
        _Rows = rows;
        _Cols = cols;
        _Coordinates = [];
        var max = rows * cols;
        for (var i = 0; i < max; i++)  {
          _Coordinates.push( {
            X: ( i % rows) + 1,
            Y: parseInt( 1 + i / cols, 10),
            State: coordinateState.Empty
          });
        }
      },

      coordinateState: function(x,y) {
        if (x <= 0 || x > _Cols || y <= 0 || y > _Rows) {
          return coordinateState.Illegal;
        }
        return coordinate(x,y).State;
      },

      changeCoordinateState: function( x, y, cs)
      {
        var el =coordinate(x,y); 
        el.State = cs; 

        $( document ).trigger( "CoordinateStateChanged", [el] );
      //  notify(x, y, cs);
      },

      
      makeMove: function (x, y, player) {

         var opponent = getOpponent(player);
         var currX; 
         var currY;
         var candidates =[];

         RM.changeCoordinateState(x,y,player);

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
              RM.changeCoordinateState( itm.X,itm.Y,player);                
            });   
          }
         candidates =  candidates.splice(candidates.length, candidates.length);
        });
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

 