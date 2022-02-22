import * as THREE from "three";
import groundTextureImg from "../../assets/groundTexture.jpeg";
import store from "../../state/store";
import { shieldItemsGenerator } from "./shieldItems";
import { levelCompleteGenerator } from "./levelComplete";
import { pathLightsGenerator } from "./pathLights";
import { pillarsGenerator } from "./pillars";
import { wallsGenerator } from "./walls";
import { groundGenerator } from "./ground";

const mazeGenerator = (level) => {
  const state = store.getState();
  const playerLevel = state.user.user.playerLevel;

  // maze size
  const mazeSize = 5 + (level * 2 - 2);

  // cell matrix
  const cells = [];
  for (let i = 0; i < mazeSize; i++) {
    cells.push([]);
    for (let j = 0; j < mazeSize; j++) {
      cells[i][j] = {
        i: i,
        j: j,
        wallRight: 1,
        wallLeft: 1,
        wallUp: 1,
        wallDown: 1,
        visited: false,
      };
    }
  }
  cells[0][0].visited = true;
  let currentCell = cells[0][0];
  const cellStack = [currentCell];

  const findNeighbors = (cell) => {
    let result = [];
    if (cell.i + 1 < mazeSize) result.push(cells[cell.i + 1][cell.j]);
    if (cell.i - 1 >= 0) result.push(cells[cell.i - 1][cell.j]);
    if (cell.j + 1 < mazeSize) result.push(cells[cell.i][cell.j + 1]);
    if (cell.j - 1 >= 0) result.push(cells[cell.i][cell.j - 1]);
    result = result.filter((e) => !e.visited);
    return result;
  };

  let generating = true;
  while (generating) {
    // for (let x = 0; x<mazeSize*mazeSize; x++){
    let neighbors = findNeighbors(currentCell);
    if (neighbors.length > 0) {
      let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
      if (nextCell.i == currentCell.i && nextCell.j == currentCell.j + 1) {
        // console.log("going right");
        currentCell.wallRight = 0;
        nextCell.wallLeft = 0;
      } else if (
        nextCell.i == currentCell.i &&
        nextCell.j == currentCell.j - 1
      ) {
        // console.log("going left");
        currentCell.wallLeft = 0;
        nextCell.wallRight = 0;
      } else if (
        nextCell.i == currentCell.i + 1 &&
        nextCell.j == currentCell.j
      ) {
        // console.log("going up");
        currentCell.wallUp = 0;
        nextCell.wallDown = 0;
      } else if (
        nextCell.i == currentCell.i - 1 &&
        nextCell.j == currentCell.j
      ) {
        // console.log("going down");
        currentCell.wallDown = 0;
        nextCell.wallUp = 0;
      }
      nextCell.visited = true;
      cells[currentCell.i][currentCell.j] = currentCell;
      cells[nextCell.i][nextCell.j] = nextCell;
      cellStack.push(nextCell);
      currentCell = nextCell;
    } else {
      while (neighbors.length === 0) {
        if (cellStack.length > 1) {
          cellStack.pop();
          currentCell = cellStack[cellStack.length - 1];
          neighbors = findNeighbors(currentCell);
        } else {
          // All done
          generating = false;
          wallsGenerator(mazeSize, cells)
          break;
        }
      }
    }
  }

  shieldItemsGenerator(level, playerLevel, mazeSize);
  levelCompleteGenerator(mazeSize);
  pathLightsGenerator(mazeSize);
  pillarsGenerator(mazeSize);
  groundGenerator(mazeSize)
};

export default mazeGenerator;
