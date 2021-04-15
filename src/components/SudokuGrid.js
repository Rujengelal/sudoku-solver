import React, { useState } from "react";

function SudokuGrid(props) {
  console.log(props.grid);
  const [sudokuGrid, setSudokuGrid] = useState(props.grid);

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
  const solve = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudokuGrid[i][j] == 0) {
          console.log("0 at ", i, j);
          for (let k = 1; k <= 9; k++) {
            console.log(sudokuGrid);
            if (isValid(sudokuGrid, k, i, j)) {
              const grid = sudokuGrid;
              grid[i][j] = k;
              setSudokuGrid(grid);
              solve();
              grid[i][j] = 0;
              setSudokuGrid(grid);
            }
          }
        }
      }
    }
  };
  return (
    <>
      <div>
        {sudokuGrid.map((val, i) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9, 40px)",
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
                      newGrid[i][j] = parseInt(e.target.value);
                      setSudokuGrid(newGrid);
                      console.log(newGrid, e.target.value);
                    }}
                  ></input>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <button
          style={{
            color: "black",
            background: "#eee",
            padding: "5px",
          }}
          onClick={() => {
            solve();
            // console.log(isValid(sudokuGrid, 7, 0, 0));
          }}
        >
          Solve
        </button>
      </div>
    </>
  );
}
export default SudokuGrid;
