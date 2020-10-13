import React from "react";
import Square from "./Square";
const SquareRow = ({ squares, rowIdx, nums, onItemClick }) => (
  <div className="row flex-nowrap mx-0">
    {[...Array(nums)].map((n, i) => (
      <Square
        key={i}
        value={squares[rowIdx * Math.sqrt(squares.length) + i]}
        onClick={() => onItemClick(rowIdx * Math.sqrt(squares.length) + i)}
      />
    ))}
  </div>
);
export default SquareRow;
