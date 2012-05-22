"use strict";
var mover = (function () {
	//Privates 
	
	var _translist =[];
	
    
    return  {

		add : function(itm) {
		 	_translist.push(itm);
		 	 $(document).trigger("CanUndo");
		 },
		execute : function()	{
	    		$.each(_translist[_translist.length -1], function( ix, itm) {
	    			RM.changeCoordinateState(itm.X, itm.Y, itm.Color);
	    		});
    	},

    	undo : function() {
    	  	var first = _translist[_translist.length -1][0];
	    	var opponent = RM.opponent(first.State);
	    	RM.changeCoordinateState(first.X, first.Y, coordinateState.Empty);
		    $.each(_translist[_translist.length -1], function( ix, itm) {
		    	if( ix > 0) {
	    			RM.changeCoordinateState(itm.X, itm.Y, itm.Color);
	    		}
	    	});	
			_translist.pop();
			if(_translist.length === 0)
			{
				$(document).trigger("CanNotUndo");
			}
		}
	}
}
)();

$(document).ready(function () {

 
});