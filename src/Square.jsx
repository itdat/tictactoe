import React from "react";
function Square(props) {
  let imgTag = "";
  if (props.value != null) {
    imgTag = <img src={`/${props.value}.svg`} />;
  }

  return (
    <div className="board-item col-4" onClick={props.onClick}>
      {imgTag}
    </div>
  );
}

export default Square;
