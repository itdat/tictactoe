import React from "react";
import SquareRow from "./SquareRow";

const Board = ({ squares, onClick }) => {
  const gameSize = Math.sqrt(squares.length);
  return (
    <div id="board" className="text-center shadow-lg overflow-auto">
      {[...Array(gameSize)].map((n, i) => (
        <SquareRow key={i} squares={squares} rowIdx={i} nums={gameSize} onItemClick={onClick} />
      ))}
    </div>
  );
};

Board.defaultProps = {
  size: 3,
};

export default Board;
