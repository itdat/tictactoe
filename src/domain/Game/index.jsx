import React from "react";
import Navbar from "../../components/Navbar";
import Notification from "./Notification";
import Board from "./Board";
import History from "./History";
import { calculateWinner } from "./services";

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

  jumpTo = (step) => {
    const { stepNumber } = this.state;
    if (step !== stepNumber) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
  };

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
    return (
      <React.Fragment>
        <Navbar onChangeGameSize={this.handleChangeGameSize} />

        <section id="main-content">
          <div className="text-center">
            <Notification
              status={status}
              player={
                player !== "" && <img className="align-middle" height="30px" src={`./${player}.svg`} alt={player} />
              }
            />
            <div id="game-wrapper">
              <Board winMoves={current.winMoves} squares={squares} onClick={this.handleCellClick} />
              <History
                isAsc={isAsc}
                stepNumber={stepNumber}
                history={history}
                switchSortOption={this.reverseSort}
                jumpTo={this.jumpTo}
              />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Game;
