import { useEffect, useMemo, useState } from "react";
import TicTac from "./TicTac";

const TicTacGrid = ({ gridSize: { x, y } }) => {
  const [grid, setGrid] = useState();
  const [win, setWin] = useState({
    row: -1,
    column: -1,
    rightDiagonal: false,
    leftDiagonal: false,
  });
  const [currentTicTac, setCurrentTicTac] = useState("X");

  useEffect(() => {
    setGrid(generateTicTac());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y]);

  const generateTicTac = () => {
    let gridArr = [];
    for (let i = 0; i < x; i++) {
      let row = [];
      for (let j = 0; j < y; j++) {
        row.push({
          type: "",
          location: { x: i, y: j },
        });
      }
      gridArr.push(row);
    }

    return gridArr;
  };

  const selectTicTac = ({ x, y }) => {
    if (
      grid[x][y].type === "" &&
      win.row < 0 &&
      win.column < 0 &&
      !win.rightDiagonal &&
      !win.leftDiagonal
    ) {
      grid[x][y] = { ...grid[x][y], type: currentTicTac };
      setGrid(grid);
      !checkWinner() && setCurrentTicTac(currentTicTac === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    let updatedWin = { ...win };

    let rightDiagonalCheck = true;
    let rightDiagonalTicTac = false;

    let leftDiagonalCheck = true;
    let leftDiagonalTicTac = false;

    for (let i = 0; i < x; i++) {
      let horizontalCheck = true;
      let horizontalTicTac = false;

      let verticalCheck = true;
      let verticalTicTac = false;
      for (let j = 0; j < y; j++) {
        if (j === 0 && grid[i][j].type !== "") {
          horizontalTicTac = grid[i][j].type;
        } else if (
          horizontalTicTac !== grid[i][j].type ||
          grid[i][j].type === ""
        ) {
          horizontalCheck = false;
        }

        if (j === 0 && grid[j][i].type !== "") {
          verticalTicTac = grid[j][i].type;
        } else if (
          verticalTicTac !== grid[j][i].type ||
          grid[j][i].type === ""
        ) {
          verticalCheck = false;
        }

        if (i === j) {
          if (i === 0 && j === 0 && grid[i][j].type !== "") {
            rightDiagonalTicTac = grid[i][j].type;
          } else if (
            rightDiagonalTicTac !== grid[i][j].type ||
            grid[i][j].type === ""
          ) {
            rightDiagonalCheck = false;
          }
        }

        if (j === grid[i].length - 1 - i) {
          if (!leftDiagonalTicTac && grid[i][j].type !== "") {
            leftDiagonalTicTac = grid[i][j].type;
          } else if (
            leftDiagonalTicTac !== grid[i][j].type ||
            grid[i][j].type === ""
          ) {
            leftDiagonalCheck = false;
          }
        }
      }

      if (horizontalCheck && horizontalTicTac && updatedWin.row === -1) {
        updatedWin = { ...updatedWin, row: i };
        setWin(updatedWin);
        return true;
      }

      if (verticalCheck && verticalTicTac && updatedWin.column === -1) {
        updatedWin = { ...updatedWin, column: i };
        setWin(updatedWin);
        return true;
      }
    }

    if (
      rightDiagonalCheck &&
      rightDiagonalTicTac &&
      !updatedWin.rightDiagonal
    ) {
      updatedWin = { ...updatedWin, rightDiagonal: true };
      setWin(updatedWin);
      return true;
    }

    if (leftDiagonalCheck && leftDiagonalTicTac && !updatedWin.leftDiagonal) {
      updatedWin = { ...updatedWin, leftDiagonal: true };
      setWin(updatedWin);
      return true;
    }
  };

  const resetGame = () => {
    setGrid(generateTicTac());
    setWin({
      row: -1,
      column: -1,
      rightDiagonal: false,
      leftDiagonal: false,
    });
    setCurrentTicTac("X");
  };

  return (
    <div className="page-cotnainer">
      <h3>
        {win.row > -1 ||
        win.column > -1 ||
        win.rightDiagonal ||
        win.leftDiagonal
          ? `${currentTicTac} won`
          : `${currentTicTac}'s turn`}
      </h3>
      {grid &&
        grid.map((item, rowKey) => {
          return (
            <div className="row-container" key={`${rowKey}`}>
              {item.length
                ? item.map((ele, colKey) => (
                    <TicTac
                      key={`${rowKey}-${colKey}`}
                      {...ele}
                      selectTicTac={selectTicTac}
                      win={
                        win.row === ele.location.x ||
                        win.column === ele.location.y ||
                        (win.rightDiagonal &&
                          ele.location.x === ele.location.y) ||
                        (win.leftDiagonal &&
                          item.length - 1 - ele.location.x === ele.location.y)
                      }
                    />
                  ))
                : null}
            </div>
          );
        })}

      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacGrid;
