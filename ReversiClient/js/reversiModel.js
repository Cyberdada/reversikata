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
              Y: 1 + i / cols,
              State:coordinateState.Empty
            };
            _Coordinates.push(coord);

        }

      },
     coordinateState: function(x,y) {
        return coordinate(x,y).State;
    }
  }
}
)();

 