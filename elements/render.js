import * as THREE from "three";
import { Renderer } from "expo-three";
import sphere from "./objects/sphere";
import { mazeCompleted } from "./objects/maze";
import topDownSpotlight from "./lights/topDownSpotlight";
import pathLight from "./lights/pathLight";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
  camera.position.set(0, -2, 10);
  camera.lookAt(sphere.position);

  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const scene = new THREE.Scene();
  scene.add(sphere);
  sphere.position.set(0, 0, 1);
  scene.add(mazeCompleted);
    scene.add(topDownSpotlight);
  scene.add(pathLight);

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    sphere.rotation.x += 0.01;

    gl.endFrameEXP();
  };
  render();
};

export default createRender;
