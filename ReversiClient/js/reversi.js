/// <reference path="js/libs/jquery-1.7.1.min.js" />
/// <reference path="js/reversi.js" />
/// <reference path="js/direction.js" />
/// <reference path="js/reversiModel.js" />
/// <reference path="js/reversiGameState.js" />
"use strict";

var Reversi = (function () {
    // Privates
    var Rows = [];
    var _currentControl =null;
   

    var validPositions = function()
    {
      var player; 
      
     // if($("input[@name=rdoPlayer]:checked").val() === "Black") {
        player =  coordinateState.Black;
    //  }
     // else {
     //   player = coordinateState.White;
     // }
      return  RGS.validPositions(coordinateState.Black);
    };
    //Public functions
    return {

    changeXYSpace : function( x, y, cs) {
        var id ="#xy_" + parseInt(x, 10) + "_" + parseInt(y,10); 
        var newClass = "blue-circle";
        var oldClass= "red-circle";
        var newState = cs;
        if (cs === coordinateState.White){
          oldClass = "blue-circle";
          newClass= "red-circle";
        }

        $(id).removeClass(oldClass);
        $(id).addClass(newClass);
      },


      

      showValidMoves: function() {
        $(".coorSpace").removeClass("available");
        var coords = validPositions();
          $.each(coords, function (ix, itm) {
            $("#xy_" + itm.X + "_" + itm.Y).addClass("available");
          });
      }, 
      
      changeSpace: function() {

        if ($(this).hasClass("blue-circle")) {
          $(this).removeClass("blue-circle");
          changeModelState(this.id, coordinateState.Empty);
        }
        else if ($(this).hasClass("red-circle")) {
          $(this).removeClass("red-circle");
          $(this).addClass("blue-circle");
          changeModelState(this.id, coordinateState.Black);
        }
        else {
          $(this).addClass("red-circle");
          changeModelState(this.id, coordinateState.White);
        }
      }
    }
  }
)();

  	$(document).ready(function () {
  	      $( ".coorSpace" ).on("click",Reversi.changeSpace);
          $("#btnCheck").on("click", Reversi.showValidMoves);
          
          RGS.askToBeNotified(Reversi.changeXYSpace); 
          RGS.playGame();
    });