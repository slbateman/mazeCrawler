import * as THREE from "three";
import { Renderer } from "expo-three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import player from "./objects/player";
import { mazeCompleted } from "./objects/maze";
import topDownSpotlight from "./lights/topDownSpotlight";
import playerOmniLight from "./lights/playerOmniLight";
import playerSpotLight from "./lights/playerSpotlight"
import pathLight from "./lights/pathLight";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
  camera.position.set(0, -2, 10);
  camera.lookAt(player.position);

  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const scene = new THREE.Scene();
  scene.add(player);
  player.position.set(0, 0, 1);
  scene.add(mazeCompleted);
  scene.add(topDownSpotlight);
  topDownSpotlight.target = player
  scene.add(playerOmniLight)
  scene.add(pathLight);

  const zoomControls = new OrbitControls(camera, document.body);
  zoomControls.enablePan = false;
  zoomControls.enableRotate = false;
  zoomControls.target = player.position;

  document.addEventListener("keydown", onDocumentKeyDown);

  function onDocumentKeyDown(event) {
    const speed = .5;
    const keyCode = event.which;
    if (keyCode == 38) {
      player.position.y += speed;
      camera.position.y += speed;
      topDownSpotlight.position.y  = player.position.y;
      playerOmniLight.position.y  = player.position.y;
    } else if (keyCode == 40) {
      player.position.y -= speed;
      camera.position.y -= speed;
      topDownSpotlight.position.y  = player.position.y;
      playerOmniLight.position.y  = player.position.y;
    } else if (keyCode == 37) {
      player.position.x -= speed;
      camera.position.x -= speed;
      topDownSpotlight.position.x = player.position.x;
      playerOmniLight.position.x = player.position.x;
    } else if (keyCode == 39) {
      player.position.x += speed;
      camera.position.x += speed;
      topDownSpotlight.position.x = player.position.x;
      playerOmniLight.position.x = player.position.x;
    }
    render()
  }

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    zoomControls.update();
    gl.endFrameEXP();
  };
  render();
};

export default createRender;
