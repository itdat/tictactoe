import React from "react";
const ReverseButton = ({ title, onClick }) => (
  <button className="btn sort-toggle btn-primary" onClick={() => onClick()}>
    {title}
  </button>
);

export default ReverseButton;
