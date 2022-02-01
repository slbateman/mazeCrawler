import * as THREE from "three";

const spotLight = new THREE.SpotLight(0xffffff, 1, 75, .15, 0.6);
spotLight.position.set(0, 0, 20);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

export default spotLight