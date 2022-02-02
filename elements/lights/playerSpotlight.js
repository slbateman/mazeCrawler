import * as THREE from "three";

const spotLight = new THREE.SpotLight(0xffffff, 3, 15, 1, .1);
spotLight.position.set(0, -0.5, 1);

spotLight.castShadow = true;

export default spotLight