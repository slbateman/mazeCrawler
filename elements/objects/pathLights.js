import * as THREE from "three";

export const pathLights = new THREE.Group();

export const pathLightsGenerator = (mazeSize) => {
  // reset pathLights before each generation
  for (let i = pathLights.children.length - 1; i >= 0; i--) {
    pathLights.remove(pathLights.children[i]);
  }

  // creating the green maze path elements for the full maze
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
};
