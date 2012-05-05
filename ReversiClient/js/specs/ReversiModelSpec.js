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

     //Given An initialized ReversiBoard
     //When Black is on [4,4] + [5,5]
     //And White is on [4,5] + [5,4]
     //And its Black Turn 
     // Then the Result should be [5,3][6,4][3,5][4,6]
     describe ("Given an initialized board with \
     			Black on [4,4] + [5,5] \
     			And white on [4,5] + [5,4] \
     			And its Blacks turn", function() {});
     it("should return an array with  4 elements - [5,3] [6,4] [3,5] [4,6]", function() {
     	RM.emptyBoard(8,8);
		RM.changeCoordinateState(4,4,coordinateState.Black);
		RM.changeCoordinateState(5,5,coordinateState.Black);
		RM.changeCoordinateState(4,5,coordinateState.White);
		RM.changeCoordinateState(5,4,coordinateState.White);
		var retval = RM.validPositions(coordinateState.Black);
		expect(retval.length).toEqual(4);

		expect(retval[0].X).toEqual(6);
		expect(retval[0].Y).toEqual(4);

		expect(retval[1].X).toEqual(4);
		expect(retval[1].Y).toEqual(6);

		expect(retval[2].X).toEqual(5);
		expect(retval[2].Y).toEqual(3);
		expect(retval[3].X).toEqual(3);
		expect(retval[3].Y).toEqual(5);

     });
});