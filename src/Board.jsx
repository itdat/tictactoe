import React from "react";
import SquareRow from "./SquareRow";
import { calculateWinner } from "./Calculation";

class Board extends React.Component {
  constructor(props) {
    super(props);
    const { size } = props;
    this.state = {
      history: [{ squares: Array(size * size).fill(null) }],
      squares: Array(size * size).fill(null),
      xIsNext: true,
      winner: null,
      winSteps: size <= 5 ? size : 5,
    };
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    const player = this.state.xIsNext ? "x" : "o";
    squares[i] = player;

    let winner = calculateWinner(squares, this.state.winSteps, i, player) ? player : null;

    this.setState({
      ...this.state,
      squares: squares,
      winner: winner,
      xIsNext: !this.state.xIsNext,
    });
  };

  render() {
    const { size } = this.props;
    const { squares } = this.state;

    let status;
    let player;
    if (this.state.winner) {
      status = "Winner: ";
      player = <img className="align-middle" height="30px" src={`./${this.state.winner}.svg`} />;
    } else {
      let count = 0;
      this.state.squares.forEach((square) => {
        if (square != null) {
          count++;
        }
      });
      if (count == size * size) {
        status = "No winner!";
        player = null;
      } else {
        status = "Next Player: ";
        player = <img className="align-middle" height="30px" src={`./${this.state.xIsNext ? "x" : "o"}.svg`} />;
      }
    }

    return (
      <div className="container justify-content-center text-center">
        <div className="d-flex align-items-center justify-content-center my-3">
          <h3 className="mb-0">
            <span className="align-middle">{status}</span>
            {player}
          </h3>
        </div>

        <div id="board" className="text-center shadow-lg mx-auto overflow-auto">
          {[...Array(size)].map((n, i) => (
            <SquareRow key={i} squares={squares} rowIdx={i} nums={size} onItemClick={this.handleClick} />
          ))}
        </div>

        <div id="info">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus voluptatibus impedit! Quod iusto
            aut consectetur mollitia, neque atque ex!
          </p>
        </div>
      </div>
    );
  }
}

Board.defaultProps = {
  size: 3,
};

export default Board;
