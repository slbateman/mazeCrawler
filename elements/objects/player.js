import * as THREE from "three";
import sphereTexture from "../../assets/sphereTexture.jpeg";

const texture = new THREE.TextureLoader().load(sphereTexture);
const geometry = new THREE.SphereGeometry(.75, 32, 16);
const material = new THREE.MeshStandardMaterial({ map: texture });

const sphere = new THREE.Mesh(geometry, material);
// sphere.castShadow = true

export default sphere
