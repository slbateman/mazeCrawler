import * as THREE from "three";
import groundTextureImg from "../../assets/groundTexture.jpeg";

export const ground = new THREE.Group();

export const groundGenerator = (mazeSize) => {

  // reset ground before each generation
  for (let i = ground.children.length - 1; i >= 0; i--) {
    ground.remove(ground.children[i]);
  }

  // generate the main plane of the maze
  const groundTexture = new THREE.TextureLoader().load(
    groundTextureImg,
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(mazeSize / 2, mazeSize / 2);
    }
  );
  const groundGeometry = new THREE.PlaneGeometry(mazeSize * 5, mazeSize * 5);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    side: THREE.DoubleSide,
  });
  const groundObj = new THREE.Mesh(groundGeometry, groundMaterial);
  groundObj.receiveShadow = true;
  ground.add(groundObj)
};
