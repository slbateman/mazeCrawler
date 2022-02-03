import * as THREE from "three";

const spotLight = new THREE.SpotLight(0xffffff, 1, 19, .055, .1, .1);
spotLight.position.set(0, -2, 20);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = .5;
spotLight.shadow.camera.far = 1000;
spotLight.shadow.camera.fov = 30;

export default spotLight