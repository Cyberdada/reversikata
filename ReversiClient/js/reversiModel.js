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
    //Public functions
    return {

      emptyBoard: function(cols,rows) {
        _Rows = rows;
        _Cols = cols;
         _Coordinates = [];
        var max = rows * cols;
        for (var i = 0; i < max; i++)  {
            var coord = {
              X: ( i % rows) + 1,
              Y: parseInt(1 + i / cols,10),
              State:coordinateState.Empty
            };
            _Coordinates.push(coord);
        }
      },
      coordinateState: function(x,y) {
        return coordinate(x,y).State;
      },
      changeCoordinateState: function(x,y, cs)
      {
        coordinate(x,y).State = cs; 
      },

      validPositions: function(player) {
        var opponent = player == coordinateState.Black 
            ? coordinateState.White
            : coordinateState.Black;

         var retval = [];
         var markers = playerMarkers(player);   
         var currX; 
         var currY; 
         var foundOpponent = false; 

         $.Each(markers, function(ix, itm){
            $.Each(directions, function(ix, dir) {
              currX = itm.X + dir.X;
              currY = itm.Y + dir.Y; 
              foundOpponent = false;
              while(coordinateState(currX, currY) == opponent)
              {
                foundOpponent = true; 
                currX += d.X; 
                currY += d.Y; 
              }

              if(foundOpponent && coordinateState(currX, currY) ==coordinateState.Empty) {
                retval.push(coordinate(currX, currY));
              }
            });
         }); 
         return retval;
      }
  }
}
)();

 