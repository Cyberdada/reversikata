using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReversiKata
{
    class BoardDirections : IEnumerable<BoardDirection>
    {
       
        private List<BoardDirection> _Directions;
        public BoardDirections()
        {
            _Directions = new List<BoardDirection>();
            _Directions.Add ( new BoardDirection { X = 0, Y = -1});
            _Directions.Add ( new BoardDirection {  X = 1, Y = -1});
            _Directions.Add ( new BoardDirection {  X = 1, Y = 0});
            _Directions.Add ( new BoardDirection {  X = 1, Y = 1});
            _Directions.Add ( new BoardDirection {  X = 0, Y =1});
            _Directions.Add ( new BoardDirection {  X = -1, Y = 1});
            _Directions.Add ( new BoardDirection {  X = -1, Y = 0});
            _Directions.Add ( new BoardDirection {  X = -1, Y = -1});
        }

        public IEnumerator<BoardDirection> GetEnumerator()
        {
            return (_Directions as IEnumerable<BoardDirection>).GetEnumerator();    
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return (_Directions as IEnumerable<BoardDirection>).GetEnumerator();
        }
    }
}
