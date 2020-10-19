import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ title, options, onChangeGameSize }) => {
  return (
    <header>
      <div className="navbar navbar-dark bg-primary">
        <div className="container">
          <div className="navbar-brand">
            <h3>{title}</h3>
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="gameSize">
              Select size
            </label>
            <select className="form-control" id="gameSize" onChange={onChangeGameSize}>
              {options.map((option, i) => (
                <option key={i}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.defaultProps = {
  title: "TicTacToe",
  options: [3, 5, 7, 10, 20],
};

Navbar.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onChangeGameSize: PropTypes.func.isRequired,
};

export default Navbar;
