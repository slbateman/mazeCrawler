import * as THREE from "three";
import wallTextureImg from "../../assets/wallTexture.jpeg";

export const pillars = new THREE.Group();

export const pillarsGenerator = (mazeSize) => {

  // reset pillars before each generation
  for (let i = pillars.children.length - 1; i >= 0; i--) {
    pillars.remove(pillars.children[i]);
  }
  // creating the pillars the stand at each wall joint
  const pillarGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3);
  const wallTexture = new THREE.TextureLoader().load(wallTextureImg);
  for (let i = 0; i <= mazeSize; i++) {
    for (let j = 0; j <= mazeSize; j++) {
      const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
      });
      const pillar = new THREE.Mesh(pillarGeometry, wallMaterial);
      pillar.position.set(j * 5, i * 5, 1.5);
      pillar.rotation.x = 1.5708;
      pillar.receiveShadow = true;
      pillars.add(pillar);
    }
  }
  pillars.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0.1);
};
