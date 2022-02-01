import { random } from "core-js/core/number";
import { x } from "joi";
import { next } from "sucrase/dist/parser/tokenizer";
import * as THREE from "three";
import groundTextureImg from "../../assets/groundTexture.jpeg";
import wallTextureImg from "../../assets/wallTexture.jpeg";

export const mazeCompleted = new THREE.Group();

const mazeGenerator = (level) => {
  //maze size
  const mazeSize = 5 + (level * 2 - 2);
  // generate the main plane of the maze
  const groundTexture = new THREE.TextureLoader().load(groundTextureImg);
  const groundGeometry = new THREE.PlaneGeometry(mazeSize * 5, mazeSize * 5);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  // ground.position.set(mazeSize / 2, mazeSize / 2);
  ground.receiveShadow = true;
  mazeCompleted.add(ground);

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
  let currentCell = cells[0][0];
  currentCell.visited = true;
  const cellStack = [currentCell];

  const findNeighbors = (cell) => {
    let result = [];
    if (cell.i + 1 < mazeSize) result.push(cells[cell.i + 1][cell.j]);
    if (cell.i - 1 >= 0) result.push(cells[cell.i - 1][cell.j]);
    if (cell.j + 1 < mazeSize) result.push(cells[cell.i][cell.j + 1]);
    if (cell.j - 1 >= 0) result.push(cells[cell.i][cell.j - 1]);
    result = result.filter((e) => !x.visited);
    return result;
  };

  let generating = true;
  // while (generating) {
  //   let neighbors = findNeighbors(currentCell);
  //   if (neighbors.length > 0) {
  //     let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
  //     if (nextCell.i == currentCell.i + 1 && nextCell.j == currentCell.j) {
  //       console.log("going right");
  //       currentCell.wallRight = 0;
  //       nextCell.wallLeft = 0
  //     } else if (
  //       nextCell.i == currentCell.i - 1 &&
  //       nextCell.j == currentCell.j
  //     ) {
  //       console.log("going left");
  //       currentCell.wallLeft = 0;
  //       nextCell.wallRight = 0
  //     } else if (
  //       nextCell.i == currentCell.i &&
  //       nextCell.j == currentCell.j + 1
  //     ) {
  //       console.log("going up");
  //       currentCell.wallUp = 0;
  //       nextCell.wallDown = 0
  //     } else if (
  //       nextCell.i == currentCell.i &&
  //       nextCell.j == currentCell.j - 1
  //     ) {
  //       console.log("going down");
  //       currentCell.wallDown = 0;
  //       nextCell.wallUp = 0
  //     }
  //     cellStack.push(nextCell);
  //     currentCell = nextCell;
  //     console.log(cellStack);
  //   } else {
  //     while (neighbors.length === 0) {
  //     if (cellStack.length > 0) {
  //       cellStack.pop();
  //       currentCell = cellStack[cellStack.length - 1];
  //       neighbors = findNeighbors(currentCell);
  //     } else {
  //       // All done
  //     generating = false;
  //       break;
  //     }
  //     }
  //   }
  // }

  // // maze wall dimensions, x=length, y=thickness, z=height
  // const wallDimensions = { x: 5, y: 1, z: 3 };
  // const wallTexture = new THREE.TextureLoader().load(wallTextureImg);
  // const mazeCellArray = [];
  // for (let i = 0; i <= mazeSize / 5; i++) {
  //   for (let j = 0; j <= mazeSize / 5; j++) {
  //     const wallGeometry = new THREE.BoxGeometry(
  //       wallDimensions.x,
  //       wallDimensions.y,
  //       wallDimensions.z
  //     );
  //     const wallMaterial = new THREE.MeshStandardMaterial({
  //       map: wallTexture,
  //     });
  //     const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  //     wall.position.set(i * 5 + 2.5, j * 5, 1.5);
  //     wall.castShadow = true;
  //     wall.receiveShadow = true
  //     mazeCompleted.add(wall);
  //   }
  // }
  // for (let i = 0; i <= mazeSize / 5; i++) {
  //   for (let j = 0; j <= mazeSize / 5; j++) {
  //     const wallGeometry = new THREE.BoxGeometry(
  //       wallDimensions.x,
  //       wallDimensions.y,
  //       wallDimensions.z
  //     );
  //     const wallMaterial = new THREE.MeshStandardMaterial({
  //       map: wallTexture,
  //     });
  //     const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  //     wall.rotation.z = 1.5708
  //     wall.position.set(j * 5, i * 5 +2.5, 1.5);
  //     wall.castShadow = true;
  //     wall.receiveShadow = true
  //     mazeCompleted.add(wall);
  //   }
  // }
  // mazeCompleted.position.set(-mazeSize/2, -mazeSize/2, 0)
};

export default mazeGenerator;
