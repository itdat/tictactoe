import React from "react";
import Board from "./Board";
import ReverseButton from "./ReverseButton";
import { calculateWinner } from "./Calculation";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { size } = props;
    this.state = {
      history: [{ squares: Array(size * size).fill(null) }],
      moves: [],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      winSteps: size <= 5 ? size : 5,
      isAsc: true,
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }

    const moves = this.state.moves.slice(0, this.state.stepNumber);
    moves.push({ x: i % Math.sqrt(squares.length), y: Math.floor(i / Math.sqrt(squares.length)) });

    const player = this.state.xIsNext ? "x" : "o";
    squares[i] = player;
    let winner = calculateWinner(squares, this.state.winSteps, i, player) ? player : null;
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      moves: moves,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winner: winner,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: null,
    });
  }

  reverseSort = () => {
    this.setState({ ...this.state, isAsc: !this.state.isAsc });
  };

  render() {
    const { size } = this.props;
    const { history } = this.state;
    const squares = [...history[this.state.stepNumber].squares];
    let status;
    let player;
    if (this.state.winner) {
      status = "Winner: ";
      player = (
        <img className="align-middle" height="30px" src={`./${this.state.winner}.svg`} alt={this.state.winner} />
      );
    } else {
      let count = 0;
      squares.forEach((square) => {
        if (square != null) {
          count++;
        }
      });
      if (count === size * size) {
        status = "No winner!";
        player = null;
      } else {
        status = "Next Player: ";
        player = (
          <img
            className="align-middle"
            height="30px"
            src={`./${this.state.xIsNext ? "x" : "o"}.svg`}
            alt={this.state.xIsNext ? "x" : "o"}
          />
        );
      }
    }

    let moves = null;
    if (this.state.isAsc) {
      moves = history.map((step, move) => {
        const desc = move
          ? `Go to move (${this.state.moves[move - 1].x},${this.state.moves[move - 1].y})`
          : "Go to game start";
        return (
          <button key={move} className="btn btn-block btn-outline-secondary" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        );
      });
    } else {
      moves = history.map((step, move, array) => {
        const desc =
          move !== array.length - 1
            ? `Go to move (${this.state.moves[array.length - move - 2].x},${
                this.state.moves[array.length - move - 2].y
              })`
            : "Go to game start";
        return (
          <button
            key={array.length - move - 1}
            className="btn btn-block btn-outline-secondary"
            onClick={() => this.jumpTo(array.length - move - 1)}
          >
            {desc}
          </button>
        );
      });
    }

    return (
      <React.Fragment>
        <header>
          <div className="navbar navbar-dark bg-primary">
            <div className="container">
              <div className="navbar-brand">
                <h3>TicTacToe</h3>
              </div>
            </div>
          </div>
        </header>

        <section id="main-content">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center my-3">
              <h3 className="mb-0">
                <span className="align-middle">{status}</span>
                {player}
              </h3>
            </div>
            <div id="game-wrapper">
              <Board squares={squares} onClick={this.handleClick} />
              <div id="info" className="">
                <ReverseButton title={this.state.isAsc ? "Ascending" : "Descending"} onClick={this.reverseSort} />
                <div id="moves" className="">
                  {moves}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Game.defaultProps = {
  size: 10,
};

export default Game;
