/// <reference path="js/libs/jquery-1.7.1.min.js" />
/// <reference path="js/reversi.js" />
/// <reference path="js/direction.js" />
/// <reference path="js/reversiModel.js" />
/// <reference path="js/reversiGameState.js" />
"use strict";

var Reversi = (function () {
    // Privates
  
    //Public functions
    return {

    changeXYSpace : function( e, itm) {
        var id ="#xy_" + parseInt(itm.X, 10) + "_" + parseInt(itm.Y,10); 
        var newClass = "blue-circle";
        var oldClass= "red-circle";
        var newState = itm.State;
        if (newState === coordinateState.White){
          oldClass = "blue-circle";
          newClass= "red-circle";
        }

        $(id).removeClass(oldClass);
        $(id).addClass(newClass);
      },

      makeMove: function(e)
      {
          var target = e.currentTarget;
          if($(target).hasClass("available"))
          {
            $(".coorSpace").removeClass("available");
            $(document).trigger("BlacksMove",
              [{X : parseInt(target.id.substr(3,1),10), 
                Y : parseInt(target.id.substr(5,1),10), 
                State : coordinateState.Black}] );
          }
      },

      showValidMoves: function(e, coords) {
        if(coords.length > 0) {
          $.each(coords, function (ix, itm) {
            $("#xy_" + itm.X + "_" + itm.Y).addClass("available");
          });
        }
        else {
          $(document).trigger("BlacksMove");
        }
      }
    }
  }
)();

  	$(document).ready(function () {

      $(document).bind("CoordinateStateChanged", Reversi.changeXYSpace);    
      $(document).bind("BlacksTurn", Reversi.showValidMoves);   
      $(".coorSpace").on("click", Reversi.makeMove);     
      // while(RGS.gameState !== gameStates.GameOver){
      RGS.playGame();
      //}
          
    });