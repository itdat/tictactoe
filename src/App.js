import React from "react";
import Board from "./Board";

function App() {
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
        <Board size={10} />
      </section>
    </React.Fragment>
  );
}

export default App;
