import * as THREE from "three";
import groundTextureImg from "../../assets/groundTexture.jpeg";
import wallTextureImg from "../../assets/wallTexture.jpeg";

export const mazeCompleted = new THREE.Group();
export const pathLights = new THREE.Group();
export const levelComplete = new THREE.Group();

const mazeGenerator = (level) => {
  //maze size
  const mazeSize = 5 + (level * 2 - 2);
  // generate the main plane of the maze
  const groundTexture = new THREE.TextureLoader().load(
    groundTextureImg,
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      // texture.offset.set(0, 0);
      texture.repeat.set(mazeSize / 2, mazeSize / 2);
    }
  );
  const groundGeometry = new THREE.PlaneGeometry(mazeSize * 5, mazeSize * 5);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.set((mazeSize * 5) / 2, (mazeSize * 5) / 2);
  ground.receiveShadow = true;
  mazeCompleted.add(ground);

  // maze wall dimensions, x=length, y=thickness, z=height
  const wallDimensions = { x: 5, y: 1, z: 3 };
  const wallTexture = new THREE.TextureLoader().load(wallTextureImg);
  const wallGeometry = new THREE.BoxGeometry(
    wallDimensions.x,
    wallDimensions.y,
    wallDimensions.z
  );

  const pillarGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3);

  for (let i = 0; i <= mazeSize; i++) {
    for (let j = 0; j <= mazeSize; j++) {
      const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
      });
      const pillar = new THREE.Mesh(pillarGeometry, wallMaterial);
      pillar.position.set(j * 5, i * 5, 1.5);
      pillar.rotation.x = 1.5708;
      pillar.receiveShadow = true;
      mazeCompleted.add(pillar);
    }
  }

  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      const boxGeometry = new THREE.BoxGeometry(5, 5, 0.1);
      const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.2,
      });
      const pathLight = new THREE.Mesh(boxGeometry, boxMaterial);
      pathLight.position.set(j * 5 + 2.5, i * 5 + 2.5, 0);
      pathLight.receiveShadow = true;
      pathLight.visible = false;
      pathLights.add(pathLight);
    }
  }
  pathLights.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0.1);

  const sphereGeometry = new THREE.SphereGeometry(1.5);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.8,
  });
  const levelFinish = new THREE.Mesh(sphereGeometry, sphereMaterial);
  levelFinish.castShadow = true
  const finishLight = new THREE.PointLight(0x0000ff, 1, 6)
  levelComplete.add(levelFinish)
  levelComplete.add(finishLight)
  const corner = Math.floor(Math.random() * 4);
  if (corner === 0) {
    levelComplete.position.set((-mazeSize * 5) / 2 + 2.5, (-mazeSize * 5) / 2 + 2.5, 2 );
  }
  if (corner === 1) {
    levelComplete.position.set((mazeSize * 5) / 2 - 2.5, (-mazeSize * 5) / 2 + 2.5, 2 );
  }
  if (corner === 2) {
    levelComplete.position.set((-mazeSize * 5) / 2 + 2.5, (mazeSize * 5) / 2 - 2.5, 2 );
  }
  if (corner === 3) {
    levelComplete.position.set((mazeSize * 5) / 2 - 2.5, (mazeSize * 5) / 2 - 2.5, 2 );
  }

  const constructWalls = () => {
    for (let i = 0; i < mazeSize; i++) {
      for (let j = 0; j < mazeSize; j++) {
        if (cells[i][j].wallRight === 1) {
          const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.rotation.z = 1.5708;
          wall.position.set(j * 5 + 5, i * 5 + 2.5, 1.5);
          wall.castShadow = true;
          wall.receiveShadow = true;
          mazeCompleted.add(wall);
        }
        if (cells[i][j].wallLeft === 1) {
          const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.rotation.z = 1.5708;
          wall.position.set(j * 5, i * 5 + 2.5, 1.5);
          wall.castShadow = true;
          wall.receiveShadow = true;
          mazeCompleted.add(wall);
        }
        if (cells[i][j].wallDown === 1) {
          const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(j * 5 + 2.5, i * 5, 1.5);
          wall.castShadow = true;
          wall.receiveShadow = true;
          mazeCompleted.add(wall);
        }
        if (cells[i][j].wallUp === 1) {
          const wallMaterial = new THREE.MeshStandardMaterial({
            map: wallTexture,
          });
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(j * 5 + 2.5, i * 5 + 5, 1.5);
          wall.castShadow = true;
          wall.receiveShadow = true;
          mazeCompleted.add(wall);
        }
      }
    }
    mazeCompleted.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0);
  };

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
          constructWalls();
          break;
        }
      }
    }
  }
};

export default mazeGenerator;
