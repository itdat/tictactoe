import React from "react";
import Board from "./Board";
import ReverseButton from "./ReverseButton";
import { calculateWinner } from "./Calculation";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 3,
      history: [
        {
          squares: Array(9).fill(null),
          winner: null,
          winMoves: [],
          move: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      winSteps: 3,
      isAsc: false,
    };
  }

  handleCellClick = (i) => {
    const { size, winSteps, history, stepNumber, xIsNext } = this.state;
    const current = history.slice(0, stepNumber + 1).reverse()[0];
    const player = xIsNext ? "x" : "o";

    const newSquares = [...current.squares];
    if (current.winner || newSquares[i]) {
      return;
    }
    newSquares[i] = player;
    const move = { x: i % size, y: Math.floor(i / size) };
    const winMoves = calculateWinner(newSquares, winSteps, i, player);
    const winner = winMoves.length !== 0 ? player : null;

    const droppedHistory = history.slice(0, stepNumber + 1);
    this.setState({
      history: [
        ...droppedHistory,
        {
          squares: newSquares,
          winner,
          winMoves,
          move,
        },
      ],
      stepNumber: droppedHistory.length,
      xIsNext: !xIsNext,
    });
  };

  jumpTo(step) {
    const { stepNumber } = this.state;
    if (step !== stepNumber) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
  }

  reverseSort = () => {
    this.setState({ ...this.state, isAsc: !this.state.isAsc });
  };

  handleChangeGameSize = (e) => {
    const newSize = parseInt(e.target.value);
    this.setState({
      ...this.state,
      size: newSize,
      history: [
        {
          squares: Array(newSize * newSize).fill(null),
          winner: null,
          winMoves: [],
          move: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      winSteps: newSize < 5 ? newSize : 5,
      isAsc: false,
    });
  };

  render() {
    const { size, history, isAsc, stepNumber, xIsNext } = this.state;
    const current = { ...history[stepNumber] };
    const squares = [...current.squares];
    const checkedCells = squares.reduce((count, square) => count + (square !== null ? 1 : 0), 0);

    const status = current.winner ? "Winner: " : checkedCells < size * size ? "Next player: " : "No winner!";
    const player = current.winner ? current.winner : checkedCells < size * size ? (xIsNext ? "x" : "o") : "";
    const playerImg =
      player !== "" ? <img className="align-middle" height="30px" src={`./${player}.svg`} alt={player} /> : null;

    const historyCopy = isAsc ? [...history] : [...history].reverse();
    const moves = historyCopy.map((record, i) => {
      const desc =
        (isAsc && i === 0) || (!isAsc && i === historyCopy.length - 1)
          ? "Go to game start"
          : `Go to move (${record.move.x}, ${record.move.y})`;
      const fontWeightBold =
        (isAsc && i === stepNumber) || (!isAsc && i === historyCopy.length - stepNumber - 1) ? "font-weight-bold" : "";
      const targetMove = isAsc ? i : historyCopy.length - i - 1;
      return (
        <button
          key={targetMove}
          className={`btn btn-block btn-outline-secondary ${fontWeightBold}`}
          onClick={() => this.jumpTo(targetMove)}
        >
          {desc}
        </button>
      );
    });

    return (
      <React.Fragment>
        <header>
          <div className="navbar navbar-dark bg-primary">
            <div className="container">
              <div className="navbar-brand">
                <h3>TicTacToe</h3>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="gameSize">
                  Select size
                </label>
                <select className="form-control" id="gameSize" onChange={this.handleChangeGameSize}>
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <section id="main-content">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center my-3">
              <h3 className="mb-0">
                <span className="align-middle">{status}</span>
                {playerImg}
              </h3>
            </div>
            <div id="game-wrapper">
              <Board winMoves={current.winMoves} squares={squares} onClick={this.handleCellClick} />
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

export default Game;
