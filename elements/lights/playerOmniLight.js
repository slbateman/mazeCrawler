import * as THREE from "three";

const pointLight = new THREE.PointLight(0xffffff, 2, 9.5);

pointLight.castShadow = true; // default false

//Set up shadow properties for the light
pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0.1; // default
pointLight.shadow.camera.far = 500; // default

export default pointLight;