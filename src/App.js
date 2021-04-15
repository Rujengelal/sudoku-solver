import React, { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
let grid = [];
for (let i = 0; i < 9; i++) {
  grid.push(Array(9).fill(0));
}

function App() {
  return <SudokuGrid grid={grid} />;
}

export default App;
