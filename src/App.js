import { useState } from "react";
import "./App.css";

import TicTacGrid from "./TicTacGrid";

function App() {
  const [gridSize, setGridSize] = useState(3);

  return (
    <div className="App">
      <h1>Tic tac toe game using ReactJs</h1>
      <div className="grid-size-chooser">
        <h3>Set grid size</h3>
        <input
          type="number"
          onChange={(e) =>
            e.target.value > 2 &&
            e.target.value < 8 &&
            setGridSize(e.target.value)
          }
          value={gridSize}
          min={3}
          max={7}
        />
      </div>
      <TicTacGrid
        gridSize={{
          x: gridSize,
          y: gridSize,
        }}
      ></TicTacGrid>
    </div>
  );
}

export default App;
