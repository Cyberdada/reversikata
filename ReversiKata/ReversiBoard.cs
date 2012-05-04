using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReversiKata
{
 
 public enum CoordinateType
    {
        Illegal = -1, 
        Empty  = 0,
        White = 1,
        Black =2
    }
       
    public class ReversiBoard
    {
        private List<Coordinate> _board;
        private BoardDirections _directions;
        private const int ROWS = 8;
        private const int COLS = 8;
        
        public ReversiBoard()
        {
            _board = InitializeBoard();
            _directions = new BoardDirections();
        }

        private List<Coordinate> InitializeBoard()
        {
            var retval = new List<Coordinate>();
            for (int i = 0; i <ROWS * COLS; i++)
                retval.Add(new Coordinate()  {Type =CoordinateType.Empty, X =( i % ROWS)+1, Y = 1 + i / COLS}); 
            return retval;
        }

        public void ChangeCoordinateState(int x, int y, CoordinateType state)
        {
            if (x <= 0 || x > COLS || y <= 0 || y > ROWS)
                throw new ArgumentException ("sIllegal coordinates");
            Coordinate  itm =Coordinate(x, y); 
            itm.Type = state;     
        }

        public Coordinate Coordinate(int x, int y)
        {
            return _board[((y - 1) * ROWS) + x-1];
        }

        public List<Coordinate> GetValidPositions(CoordinateType player)
        {
            CoordinateType Opponent = player == CoordinateType.Black
                    ? CoordinateType.White
                    : CoordinateType.Black;
            List<Coordinate> retval = new List<Coordinate>();
            List<Coordinate> PlayerPieces = PlayerMarkers(player);
            int CurrX;
            int CurrY;
            bool FoundOpponent = false;

            PlayerPieces.ForEach(item =>
            {
                foreach(BoardDirection d in _directions)
                {
                    CurrX = item.X + d.X;
                    CurrY = item.Y + d.Y;
                    FoundOpponent = false;
                    while (GetCoordinateState(CurrX , CurrY ) == Opponent)
                    {
                        FoundOpponent = true;
                        CurrX += d.X;
                        CurrY += d.Y;
                    }
                    if (FoundOpponent && GetCoordinateState(CurrX , CurrY ) == CoordinateType.Empty)
                    {
                       retval.Add(Coordinate(CurrX, CurrY));
                    }
                }
            });
            return retval;
        }

        public List<Coordinate> PlayerMarkers( CoordinateType player)
        {
            return (from itm in _board
                    where itm.Type == player
                    select itm)
                    .ToList();
        }

        public CoordinateType GetCoordinateState(int x, int y)
        {
            if (x <= 0 || x > COLS || y <= 0 || y > ROWS)
                return CoordinateType.Illegal;
   
            return Coordinate(x, y).Type;   
        }
    }
}
