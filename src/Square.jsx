import React from "react";
function Square({ isWinMove, value, onClick }) {
  let imgTag = "";
  if (value != null) {
    imgTag = <img className={isWinMove ? "win-move" : ""} src={`/${value}.svg`} alt={value} />;
  }
  return (
    <div className="board-item" onClick={onClick}>
      {imgTag}
    </div>
  );
}

export default Square;
