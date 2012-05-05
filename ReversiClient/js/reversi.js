/// <reference path="../jquery-1.7.1.min.js" />
"use strict";

var Reversi = (function () {
    // Privates
    var Rows = [];
    var _currentControl =null;
   

    //Public functions
    return {
      changeSpace: function() {

        if ($(this).hasClass("blue-circle")) {
          $(this).removeClass("blue-circle");
        }
        else if ($(this).hasClass("red-circle")) {
          $(this).removeClass("red-circle");
          $(this).addClass("blue-circle");
        }
        else {
          $(this).addClass("red-circle");
        }
      }
    }
  }
)();

  	$(document).ready(function () {
  	      $( ".coorSpace" ).on("click",Reversi.changeSpace);
  });