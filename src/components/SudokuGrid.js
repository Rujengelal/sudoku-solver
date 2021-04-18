import React, { useState } from "react";

const initArray = () => {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(Array(9).fill(0));
  }
  return grid;
};

function SudokuGrid(props) {
  // console.log(props.grid);
  const [sudokuGrid, setSudokuGrid] = useState(initArray());
  const [Status, setStatus] = useState(false);
  const [StartSolving, setStartSolving] = useState(false);
  // const [sudokuGrid, setSudokuGrid] = useState([
  //   [3, 0, 6, 5, 0, 8, 4, 0, 0],
  //   [5, 2, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 8, 7, 0, 0, 0, 0, 3, 1],
  //   [0, 0, 3, 0, 1, 0, 0, 8, 0],
  //   [9, 0, 0, 8, 6, 3, 0, 0, 5],
  //   [0, 5, 0, 0, 9, 0, 6, 0, 0],
  //   [1, 3, 0, 0, 0, 0, 2, 5, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 7, 4],
  //   [0, 0, 5, 2, 0, 6, 3, 0, 0],
  // ]);

  const isValid = (grid, value, i, j) => {
    for (let checkI = 0; checkI < 9; checkI++) {
      if (value == grid[checkI][j]) return false;
    }
    for (let checkJ = 0; checkJ < 9; checkJ++) {
      if (value == grid[i][checkJ]) return false;
    }
    let valueBlockI = i - (i % 3);
    let valueBlockJ = j - (j % 3);
    for (let k = valueBlockI; k < valueBlockI + 3; k++) {
      for (let l = valueBlockJ; l < valueBlockJ + 3; l++) {
        if (value == grid[k][l]) return false;
      }
    }
    return true;
  };
  let grid;
  const solve = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // console.log("checking for 0 at", i, j);
        if (sudokuGrid[i][j] == 0) {
          console.log("0 at ", i, j);
          for (let k = 1; k <= 9; k++) {
            // console.log(sudokuGrid);
            let goodValue = isValid(sudokuGrid, k, i, j);
            // console.log(
            //   `trying to solve at i=${i} and j=${j} and k=${k}`,
            //   sudokuGrid[i]
            // );
            // console.log(`trying to solve at i=${i} and j=${j} and k=${k}`);
            if (goodValue) {
              grid = sudokuGrid;
              grid[i][j] = k;
              setSudokuGrid(grid);
              console.log("Setting value", k);
              let nextStep = solve();
              if (!nextStep) {
                console.log("resetting value", k);

                grid[i][j] = 0;
                setSudokuGrid(grid);
              } else {
                return true; //TODO: Seeif it works with this
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        {sudokuGrid.map((val, i) => (
          <div
            // key={`${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9,1fr)",
            }}
          >
            {val.map((value, j) => {
              return (
                <div
                  key={`${i}-${j}`}
                  style={{
                    border: "1px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    width: "40px",
                    borderRightWidth: (j + 1) % 3 == 0 ? "5px" : "1px",
                    borderBottomWidth: (i + 1) % 3 == 0 ? "5px" : "1px",
                  }}
                >
                  <input
                    value={value}
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                    onChange={(e) => {
                      let newGrid = [...sudokuGrid];
                      newGrid[i][j] = parseInt(
                        !e.target.value ? "0" : e.target.value
                      );
                      setSudokuGrid(newGrid);
                      // console.log(newGrid, e.target.value);
                    }}
                  ></input>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <button
            style={{
              color: "black",
              background: "#eee",
              padding: "5px",
            }}
            onClick={() => {
              setStatus(false);
              setStartSolving(true);
              if (!solve()) {
                console.log("cannot be solved");
              }
              console.log("Done");
              setStatus(true);
              // console.log(isValid(sudokuGrid, 7, 0, 0));
            }}
          >
            Solve
          </button>
          <button
            style={{
              color: "black",
              background: "#eee",
              padding: "5px",
            }}
            onClick={() => {
              setSudokuGrid(initArray());
              setStartSolving(false);
              setStatus(false);
            }}
          >
            Reset
          </button>
        </div>
        <div>{StartSolving ? (Status ? "Solved" : "Solving") : ""}</div>
      </div>
    </div>
  );
}
export default SudokuGrid;
