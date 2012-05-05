/// <reference path="../jquery-1.7.1.min.js" />
"use strict";

var RM = (function () {
    // Privates
    var _Coordinates = [];

    //Public functions
    return {

      emptyBoard: function(cols,rows) {
        for (var i = 0; i < rows * cols; i++)  {
            var coord;
            coord.X = ( i % rows) + 1;
            coord.Y = 1 + i / cols;
            coord.CoordinateType = 0;  //CoordinateType.empty
            Coordinates.push(coord);

        }

      },
     coordinateState: function(x,y) {
        return coordinateState.Empty;
    }
  }
}
)();

 