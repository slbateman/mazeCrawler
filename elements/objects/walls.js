import * as THREE from "three";
import wallTextureImg from "../../assets/wallTexture.jpeg";

export const walls = new THREE.Group();

export const wallsGenerator = (mazeSize, cells) => {

  // reset walls before each generation
  for (let i = walls.children.length - 1; i >= 0; i--) {
    walls.remove(walls.children[i]);
  }

  // maze wall dimensions, x=length, y=thickness, z=height
  const wallDimensions = { x: 5, y: 1, z: 3 };
  const wallTexture = new THREE.TextureLoader().load(wallTextureImg);
  const wallGeometry = new THREE.BoxGeometry(
    wallDimensions.x,
    wallDimensions.y,
    wallDimensions.z
  );

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
        walls.add(wall);
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
        walls.add(wall);
      }
      if (cells[i][j].wallDown === 1) {
        const wallMaterial = new THREE.MeshStandardMaterial({
          map: wallTexture,
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(j * 5 + 2.5, i * 5, 1.5);
        wall.castShadow = true;
        wall.receiveShadow = true;
        walls.add(wall);
      }
      if (cells[i][j].wallUp === 1) {
        const wallMaterial = new THREE.MeshStandardMaterial({
          map: wallTexture,
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(j * 5 + 2.5, i * 5 + 5, 1.5);
        wall.castShadow = true;
        wall.receiveShadow = true;
        walls.add(wall);
      }
    }
  }
  walls.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0);

};
