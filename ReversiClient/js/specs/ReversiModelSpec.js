describe("ReversiModel", function() {
	
	
	beforeEach(function() {
	
	});


	describe("Given an empty board", function() {
	});
    
	it("should have coordinate [4,4] with status empty", function () {
		RM.emptyBoard(8,8);	
		expect(RM.coordinateState(4,4)).toEqual(coordinateState.Empty);
	});

    describe("Setting coordinate 4,4 to black  ", function(){});

    it("should make it black", function() {
		RM.emptyBoard(8,8);	
		RM.changeCoordinateState(4,4,coordinateState.Black);
		expect(RM.coordinateState(4,4)).toEqual(coordinateState.Black);

    });

});