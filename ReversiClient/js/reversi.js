/// <reference path="js/libs/jquery-1.7.1.min.js" />
/// <reference path="js/reversi.js" />
/// <reference path="js/direction.js" />
/// <reference path="js/reversiModel.js" />

"use strict";

var Reversi = (function () {
    // Privates
    var Rows = [];
    var _currentControl =null;
   
    var changeModelState = function(idstr, newState)
    {
      RM.changeCoordinateState(
          parseInt(idstr.substr(3,1),10), 
          parseInt(idstr.substr(5,1),10), 
          newState
          );
    }

    var validPositions = function()
    {
      var player; 
      
      if($("input[@name=rdoPlayer]:checked").val() === "Black") {
        player =  coordinateState.Black;
      }
      else {
        player = coordinateState.White;
      }
      return  RM.validPositions(player);
    }
    //Public functions
    return {

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
          $("#btnCheck").on("click", Reversi.showValidMoves)
          RM.emptyBoard(8,8);

    });