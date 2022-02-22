import * as THREE from "three";
import { Renderer } from "expo-three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import player from "./objects/player";
import { mazeCompleted, pathLights, levelComplete, shieldItems } from "./objects/maze";
import topDownSpotlight from "./lights/topDownSpotlight";
import playerOmniLight from "./lights/playerOmniLight";
import { editLevelComplete } from "../state/userSlice";
import store from "../state/store";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 20);
  camera.position.set(0, -2, 10);
  camera.lookAt(player.position);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);

  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const playerSet = new THREE.Group();
  topDownSpotlight.target = playerSet;
  playerSet.add(player);
  playerSet.add(topDownSpotlight);
  playerSet.add(playerOmniLight);
  playerSet.position.set(0, 0, 1);

  const scene = new THREE.Scene();
  scene.add(playerSet);
  scene.add(mazeCompleted);
  scene.add(pathLights);
  scene.add(levelComplete);
  scene.add(shieldItems)
  // scene.add(ambientLight);

  // const zoomControls = new OrbitControls(camera, document.body);
  // zoomControls.enablePan = false;
  // zoomControls.enableRotate = true;
  // zoomControls.target = playerSet.position;

  let upDirection = false;
  let downDirection = false;
  let leftDirection = false;
  let rightDirection = false;
  let speed = 0.1;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  function onKeyDown(event) {
    if (event.which == 38 || event.which == 87) upDirection = true;
    if (event.which == 40 || event.which == 83) downDirection = true;
    if (event.which == 37 || event.which == 65) leftDirection = true;
    if (event.which == 39 || event.which == 68) rightDirection = true;
  }
  function onKeyUp(event) {
    if (event.which == 38 || event.which == 87) upDirection = false;
    if (event.which == 40 || event.which == 83) downDirection = false;
    if (event.which == 37 || event.which == 65) leftDirection = false;
    if (event.which == 39 || event.which == 68) rightDirection = false;
  }

  const onMove = () => {
    if (upDirection && moveUp) {
      playerSet.position.y += speed;
      camera.position.y += speed;
    }
    if (downDirection && moveDown) {
      playerSet.position.y -= speed;
      camera.position.y -= speed;
    }
    if (leftDirection && moveLeft) {
      playerSet.position.x -= speed;
      camera.position.x -= speed;
    }
    if (rightDirection && moveRight) {
      playerSet.position.x += speed;
      camera.position.x += speed;
    }
    upRaycaster.set(playerSet.position, up);
    downRaycaster.set(playerSet.position, down);
    leftRaycaster.set(playerSet.position, left);
    rightRaycaster.set(playerSet.position, right);
    raycasterLocation.set(playerSet.position, location);
    raycasterCompleteLevel.set(playerSet.position, completeLevel);
  };

  const up = new THREE.Vector3(0, 1, 0);
  const upRaycaster = new THREE.Raycaster();
  upRaycaster.set(playerSet.position, up);
  upRaycaster.far = .8;

  const down = new THREE.Vector3(0, -1, 0);
  const downRaycaster = new THREE.Raycaster();
  downRaycaster.set(playerSet.position, down);
  downRaycaster.far = .8;

  const left = new THREE.Vector3(-1, 0, 0);
  const leftRaycaster = new THREE.Raycaster();
  leftRaycaster.set(playerSet.position, left);
  leftRaycaster.far = .8;

  const right = new THREE.Vector3(1, 0, 0);
  const rightRaycaster = new THREE.Raycaster();
  rightRaycaster.set(playerSet.position, right);
  rightRaycaster.far = .8;

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
    if (intersectsUp.length > 0 && upDirection) moveUp = false;
    else moveDown = true;
    if (intersectsDown.length > 0 && downDirection) moveDown = false;
    else moveUp = true;
    if (intersectsLeft.length > 0 && leftDirection) moveLeft = false;
    else moveRight = true;
    if (intersectsRight.length > 0 && rightDirection) moveRight = false;
    else moveLeft = true;
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


  let complete = false;

  const location = new THREE.Vector3(0, 0, -1);
  const raycasterLocation = new THREE.Raycaster();
  raycasterLocation.set(playerSet.position, location);
  raycasterLocation.far = 0.85;

  const locationIntersects = () => {
    const intersects = raycasterLocation.intersectObjects(
      pathLights.children,
      true
    );
    if (intersects.length > 0 && !complete) {
      for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.visible = true;
      }
    }
  };

  const completeLevel = new THREE.Vector3(0, 0, 1);
  const raycasterCompleteLevel = new THREE.Raycaster();
  raycasterCompleteLevel.set(playerSet.position, completeLevel);
  raycasterCompleteLevel.far = 3;

  const levelCompleteIntersects = () => {
    const intersects = raycasterCompleteLevel.intersectObjects(
      levelComplete.children
    );
    if (intersects.length > 0 && !complete) {
      scene.remove(levelComplete)
      store.dispatch(editLevelComplete(true));
        complete = true;
    }
  };

  // let requestId
  const render = () => {
    requestAnimationFrame(render);
    onMove();
    wallIntersects();
    locationIntersects();
    levelCompleteIntersects();
    // zoomControls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

export default createRender;
