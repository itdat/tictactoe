import React from "react";
function Square({ value, onClick }) {
  let imgTag = "";
  if (value != null) {
    imgTag = <img src={`/${value}.svg`} />;
  }
  return (
    <div className="board-item" onClick={onClick}>
      {imgTag}
    </div>
  );
}

export default Square;
