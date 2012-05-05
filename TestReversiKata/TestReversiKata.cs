using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReversiKata;

namespace TestReversiKata
{
    /// <summary>
    /// Summary description for UnitTest1
    /// </summary>
    [TestClass]
    public class TestReversiKata
    {
        public TestReversiKata()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get 
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void TestReversiKataMainTest()
        {
            //Given An initialized ReversiBoard
            //When Black is on [4,4] + [5,5]
            //And White is on [4,5] + [5,4]
            //And its Black Turn 
            // Then the Result should be [5,3][6,4][3,5][4,6]

            ReversiBoard board = new ReversiKata.ReversiBoard();
            board.ChangeCoordinateState(4, 4, CoordinateType.Black);
            board.ChangeCoordinateState(5,5, CoordinateType.Black);
            board.ChangeCoordinateState(4, 5, CoordinateType.White);
            board.ChangeCoordinateState(5, 4, CoordinateType.White);
            var retval =   board.GetValidPositions(CoordinateType.Black);
            Assert.AreEqual(retval.Count, 4);
    
            Assert.AreEqual(retval[0].X, 6);
            Assert.AreEqual(retval[0].Y, 4);

            Assert.AreEqual(retval[1].X, 4);
            Assert.AreEqual(retval[1].Y, 6);

            Assert.AreEqual(retval[2].X, 5);
            Assert.AreEqual(retval[2].Y, 3);

            Assert.AreEqual(retval[3].X, 3);
            Assert.AreEqual(retval[3].Y, 5);


        }

        [TestMethod]
        public void TestChangeOfCoordinateState()
        {
            //Given An initalized ReversiBoard
            // And a change of coordinatestate [4,4] to Black
            //Then coordinate 4,4 on reversiboard should be Black

            ReversiBoard board = new ReversiBoard();
            board.ChangeCoordinateState(4, 4, CoordinateType.Black);
            Assert.AreEqual(board.GetCoordinateState(4, 4), CoordinateType.Black);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException),
    "Illegal coordinates")]  
        public void TestChangeOfCoordinateStateToIllegal()
        {
            //Given An initalized ReversiBoard
            // And a change of coordinatestate [0,4] to Black
            //Then an error Illegal should be raised

            ReversiBoard board = new ReversiBoard();
            board.ChangeCoordinateState(0, 4, CoordinateType.Black);
           
            Assert.AreEqual(board.GetCoordinateState(4, 4), CoordinateType.Black);
        }

        [TestMethod]
        public void TestCoordinateStateOfEmptyBoard()
        {
            //Given An initalized ReversiBoard
            //Then coordinate 4,4 on reversiboard should be Empty

            ReversiBoard board = new ReversiBoard();
            
            Assert.AreEqual(board.GetCoordinateState(4, 4), CoordinateType.Empty);


        }

    }
}
