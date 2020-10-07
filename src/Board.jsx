import React from "react";
import Square from "./Square";
import { calculateWinner } from "./Calculation";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "x" : "o";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let player;
    if (winner) {
      status = "Winner: ";
      player = <img className="align-middle" height="30px" src={`./${winner}.svg`} />;
    } else {
      let count = 0;
      this.state.squares.forEach((square) => {
        if (square != null) {
          count++;
        }
      });
      if (count == 9) {
        status = "No winner!";
        player = null;
      } else {
        status = "Next Player: ";
        player = <img className="align-middle" height="30px" src={`./${this.state.xIsNext ? "x" : "o"}.svg`} />;
      }
    }

    return (
      <div className="container justify-content-center">
        <div className="d-flex align-items-center justify-content-center my-3">
          <h3 className="mb-0">
            <span className="align-middle">{status}</span>
            {player}
          </h3>
        </div>

        <div id="board" className="text-center shadow-lg mx-auto">
          <div className="row mx-0">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="row mx-0">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="row mx-0">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
