describe("ReversiModel", function() {
	
	var _Model;
	

	beforeEach(function() {
		_Model = new ReversiModel();
	});


	describe("Given an empty board", function() {});

	it("should have coordinate [4,4] with status empty", function () {
		expect(_Model.coordinateState(4,4)).toEqual("empty");
	});

});