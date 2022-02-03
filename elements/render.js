import * as THREE from "three";
import { Renderer } from "expo-three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import player from "./objects/player";
import { mazeCompleted, pathLights } from "./objects/maze";
import topDownSpotlight from "./lights/topDownSpotlight";
import playerOmniLight from "./lights/playerOmniLight";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
  camera.position.set(0, -2, 10);
  camera.lookAt(player.position);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);

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
  scene.add(pathLights);
  scene.add(ambientLight);

  // const zoomControls = new OrbitControls(camera, document.body);
  // zoomControls.enablePan = false;
  // zoomControls.enableRotate = false;
  // zoomControls.target = playerSet.position;

  let keyCode = null;
  let direction = "none";
  let speed = 0.1;
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
    }
    if (keyCode == 40 && moveDown) {
      direction = "down";
      playerSet.position.y -= speed;
      camera.position.y -= speed;
    }
    if (keyCode == 37 && moveLeft) {
      direction = "left";
      playerSet.position.x -= speed;
      camera.position.x -= speed;
    }
    if (keyCode == 39 && moveRight) {
      direction = "right";
      playerSet.position.x += speed;
      camera.position.x += speed;
    }
    upRaycaster.set(playerSet.position, up);
    downRaycaster.set(playerSet.position, down);
    leftRaycaster.set(playerSet.position, left);
    rightRaycaster.set(playerSet.position, right);
  };

  const up = new THREE.Vector3(0, 1, 0);
  const down = new THREE.Vector3(0, -1, 0);
  const left = new THREE.Vector3(-1, 0, 0);
  const right = new THREE.Vector3(1, 0, 0);
  const upRaycaster = new THREE.Raycaster();
  upRaycaster.set(playerSet.position, up);
  upRaycaster.far = 1.1;
  const downRaycaster = new THREE.Raycaster();
  downRaycaster.set(playerSet.position, down);
  downRaycaster.far = 1.1;
  const leftRaycaster = new THREE.Raycaster();
  leftRaycaster.set(playerSet.position, left);
  leftRaycaster.far = 1.1;
  const rightRaycaster = new THREE.Raycaster();
  rightRaycaster.set(playerSet.position, right);
  rightRaycaster.far = 1.1;

  const wallIntersects = () => {
    const intersectsUp = upRaycaster.intersectObjects(
      mazeCompleted.children,
      true
    );
    const intersectsDown = downRaycaster.intersectObjects(
      mazeCompleted.children,
      true
    );
    const intersectsLeft = leftRaycaster.intersectObjects(
      mazeCompleted.children,
      true
    );
    const intersectsRight = rightRaycaster.intersectObjects(
      mazeCompleted.children,
      true
    );
    if (
      intersectsUp.length > 0 ||
      intersectsDown.length > 0 ||
      intersectsLeft.length > 0 ||
      intersectsRight.length > 0
    ) {
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
    if (intersectsUp.length > 0) {
      playerSet.position.y -= speed;
      camera.position.y -= speed;
    }
    if (intersectsDown.length > 0) {
      playerSet.position.y += speed;
      camera.position.y += speed;
    }
    if (intersectsLeft.length > 0) {
      playerSet.position.x += speed;
      camera.position.x += speed;
    }
    if (intersectsRight.length > 0) {
      playerSet.position.x -= speed;
      camera.position.x -= speed;
    }
  };

  let requestID;
  const render = () => {
    requestID = requestAnimationFrame(render);
    onMove();
    wallIntersects();
    // zoomControls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

export default createRender;
