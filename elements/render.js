import * as THREE from "three";
import { Renderer } from "expo-three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import player from "./objects/player";
import { mazeCompleted } from "./objects/maze";
import topDownSpotlight from "./lights/topDownSpotlight";
import playerOmniLight from "./lights/playerOmniLight";
import pathLight from "./lights/pathLight";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
  camera.position.set(0, 0, 10);
  camera.lookAt(player.position);

  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const playerSet = new THREE.Group();
  player.position.set(0, 0, 1);
  console.log(player);
  topDownSpotlight.target = playerSet;
  playerSet.add(player);
  playerSet.add(topDownSpotlight);
  playerSet.add(playerOmniLight);

  const scene = new THREE.Scene();
  scene.add(playerSet);
  scene.add(mazeCompleted);
  scene.add(pathLight);

  const zoomControls = new OrbitControls(camera, document.body);
  zoomControls.enablePan = true;
  zoomControls.enableRotate = true;
  zoomControls.target = playerSet.position;

  let keyCode = null;
  let direction = "none";
  let speed = 0.05;
  let moveUp = true;
  let moveDown = true;
  let moveLeft = true;
  let moveRight = true;

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  function onKeyDown(event) {
    keyCode = event.which;
  }
  function onKeyUp() {
    keyCode = null;
    direction = "none";
  }

  const onMove = () => {
    if (keyCode == 38 && moveUp) {
      direction = "up";
      playerSet.position.y += speed;
      camera.position.y += speed;
      raycaster.set(playerSet.position, up);
    }
    if (keyCode == 40 && moveDown) {
      direction = "down";
      playerSet.position.y -= speed;
      camera.position.y -= speed;
      raycaster.set(playerSet.position, down);
    }
    if (keyCode == 37 && moveLeft) {
      direction = "left";
      playerSet.position.x -= speed;
      camera.position.x -= speed;
      raycaster.set(playerSet.position, left);
    }
    if (keyCode == 39 && moveRight) {
      direction = "right";
      playerSet.position.x += speed;
      camera.position.x += speed;
      raycaster.set(playerSet.position, right);
    }
  };

  const left = new THREE.Vector3(-1, 0, 0);
  const right = new THREE.Vector3(1, 0, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const down = new THREE.Vector3(0, -1, 0);
  const raycaster = new THREE.Raycaster();
  raycaster.set(playerSet.position, up);
  raycaster.far = 1.1;

  const wallIntersects = () => {
    const intersects = raycaster.intersectObjects(mazeCompleted.children);
    if (intersects.length > 0) {
      if (direction === "up") moveUp = false;
      if (direction === "down") moveDown = false;
      if (direction === "left") moveLeft = false;
      if (direction === "right") moveRight = false;
    } else {
      moveLeft = true;
      moveRight = true;
      moveUp = true;
      moveDown = true;
    }
  };

  let requestID;
  const render = () => {
    requestID = requestAnimationFrame(render);
    onMove();
    wallIntersects();
    zoomControls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

export default createRender;
