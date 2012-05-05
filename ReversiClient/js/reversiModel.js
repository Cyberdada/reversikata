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

    //Public functions
    return {

      emptyBoard: function(cols,rows) {

        for (var i = 0; i < rows * cols; i++)  {
            var coord = {
              X: ( i % rows) + 1,
              Y: 1 + i / cols,
              State:coordinateState.Empty
            };
            _Coordinates.push(coord);

        }

      },
     coordinateState: function(x,y) {
        return coordinateState.Empty;
    }
  }
}
)();

 