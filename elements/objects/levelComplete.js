import * as THREE from "three";

import { cells } from "./maze";

export const levelComplete = new THREE.Group();

export const levelCompleteGenerator = (mazeSize) => {
    
  // reset levelComplete before each generation
  for (let i = levelComplete.children.length - 1; i >= 0; i--) {
    levelComplete.remove(levelComplete.children[i]);
  }

  // creating and placing the level complete sphere
  const sphereGeometry = new THREE.SphereGeometry(1.75);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.5,
  });
  const levelFinish = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const finishLight = new THREE.PointLight(0x0000ff, 1, 5);
  finishLight.castShadow = true;
  levelComplete.add(levelFinish);
  levelComplete.add(finishLight);
  // deciding which corner the sphere should appear
  const corner = Math.floor(Math.random() * 4);
  if (corner === 0) {
    levelComplete.position.set(
      (-mazeSize * 5) / 2 + 2.5,
      (-mazeSize * 5) / 2 + 2.5,
      2
    );
    cells[0][0].item = true
  }
  if (corner === 1) {
    levelComplete.position.set(
      (mazeSize * 5) / 2 - 2.5,
      (-mazeSize * 5) / 2 + 2.5,
      2
    );
    cells[mazeSize-1][0].item = true
  }
  if (corner === 2) {
    levelComplete.position.set(
      (-mazeSize * 5) / 2 + 2.5,
      (mazeSize * 5) / 2 - 2.5,
      2
    );
    cells[0][mazeSize-1].item = true
  }
  if (corner === 3) {
    levelComplete.position.set(
      (mazeSize * 5) / 2 - 2.5,
      (mazeSize * 5) / 2 - 2.5,
      2
    );
    cells[mazeSize-1][mazeSize-1].item = true
  }
};
