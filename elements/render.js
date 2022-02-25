import * as THREE from "three";
import { Renderer } from "expo-three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import player from "./objects/player";
import topDownSpotlight from "./lights/topDownSpotlight";
import playerOmniLight from "./lights/playerOmniLight";
import { ground } from "./objects/ground";
import { walls } from "./objects/walls";
import { pillars } from "./objects/pillars";
import { pathLights } from "./objects/pathLights";
import { levelComplete } from "./objects/levelComplete";
import { shieldItems, shields } from "./objects/shieldItems";
import { updatePlayerInv, editLevelComplete } from "../state/userSlice";
import store from "../state/store";

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  const state = store.getState();
  const user = state.user.user;
  // let playerInv = user.playerInv;
  // console.log(playerInv)

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
  topDownSpotlight.target = player;
  playerSet.add(player);
  playerSet.add(topDownSpotlight);
  playerSet.add(playerOmniLight);
  playerSet.position.set(0, 0, 1);

  const mazeCompleted = new THREE.Group();
  mazeCompleted.add(pillars);
  mazeCompleted.add(walls);

  const scene = new THREE.Scene();
  scene.add(playerSet);
  scene.add(ground);
  scene.add(mazeCompleted);
  scene.add(pathLights);
  scene.add(levelComplete);
  scene.add(shieldItems);
  // scene.add(ambientLight);

  // const zoomControls = new OrbitControls(camera, document.body);
  // zoomControls.enablePan = false;
  // zoomControls.enableRotate = true;
  // zoomControls.target = playerSet.position;

  const direction = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  const move = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  let speed = 0.1;

  function onKeyDown(e) {
    if (e.which == 38 || e.which == 87) direction.up = true;
    if (e.which == 40 || e.which == 83) direction.down = true;
    if (e.which == 37 || e.which == 65) direction.left = true;
    if (e.which == 39 || e.which == 68) direction.right = true;
  }
  function onKeyUp(e) {
    if (e.which == 38 || e.which == 87) direction.up = false;
    if (e.which == 40 || e.which == 83) direction.down = false;
    if (e.which == 37 || e.which == 65) direction.left = false;
    if (e.which == 39 || e.which == 68) direction.right = false;
  }

  const onMove = () => {
    if (direction.up && move.up) {
      playerSet.position.y += speed;
      camera.position.y += speed;
    }
    if (direction.down && move.down) {
      playerSet.position.y -= speed;
      camera.position.y -= speed;
    }
    if (direction.left && move.left) {
      playerSet.position.x -= speed;
      camera.position.x -= speed;
    }
    if (direction.right && move.right) {
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

  // ***** detecting wall collisions
  // raycasters for detecting wall collisions
  const up = new THREE.Vector3(0, 1, 0);
  const upRaycaster = new THREE.Raycaster();
  upRaycaster.set(playerSet.position, up);
  upRaycaster.far = 0.8;

  // raycasters for detecting wall collisions
  const down = new THREE.Vector3(0, -1, 0);
  const downRaycaster = new THREE.Raycaster();
  downRaycaster.set(playerSet.position, down);
  downRaycaster.far = 0.8;

  // raycasters for detecting wall collisions
  const left = new THREE.Vector3(-1, 0, 0);
  const leftRaycaster = new THREE.Raycaster();
  leftRaycaster.set(playerSet.position, left);
  leftRaycaster.far = 0.8;

  // raycasters for detecting wall collisions
  const right = new THREE.Vector3(1, 0, 0);
  const rightRaycaster = new THREE.Raycaster();
  rightRaycaster.set(playerSet.position, right);
  rightRaycaster.far = 0.8;

  // function for detecting wall collisions
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

    if (intersectsUp.length > 0 && direction.up) move.up = false;
    else move.up = true;
    if (intersectsDown.length > 0 && direction.down) move.down = false;
    else move.down = true;
    if (intersectsLeft.length > 0 && direction.left) move.left = false;
    else move.left = true;
    if (intersectsRight.length > 0 && direction.right) move.right = false;
    else move.right = true;

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

  // ***** showing pathway green
  let complete = false;

  // raycaster for showing pathway green
  const location = new THREE.Vector3(0, 0, -1);
  const raycasterLocation = new THREE.Raycaster();
  raycasterLocation.set(playerSet.position, location);
  raycasterLocation.far = 0.85;

  // function for showing pathway green
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

  // ***** detecting completion of level
  // raycaster for detecting level completion sphere
  const completeLevel = new THREE.Vector3(0, 0, 1);
  const raycasterCompleteLevel = new THREE.Raycaster();
  raycasterCompleteLevel.set(playerSet.position, completeLevel);
  raycasterCompleteLevel.far = 3;

  // function for detecting level completion sphere
  const levelCompleteIntersects = () => {
    const intersects = raycasterCompleteLevel.intersectObjects(
      levelComplete.children
    );
    if (intersects.length > 0 && !complete) {
      scene.remove(levelComplete);
      store.dispatch(editLevelComplete(true));
      store.dispatch(updatePlayerInv(playerInv))
      complete = true;
    }
  };

  // ***** detecting item grab
  // raycaster for mouse pointer for detecting item grab
  const pointerRaycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  pointerRaycaster.setFromCamera(pointer, camera);

  // function for mouse pointer for detecting item grab
  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1.005;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1.07;
  }
  console.log(shields);
  // function for shield item grab
  const grabShield = () => {
    pointerRaycaster.setFromCamera(pointer, camera);
    const intersects = pointerRaycaster.intersectObjects(
      shieldItems.children,
      true
    );
    // console.log(shieldItems.children)
    if (intersects.length > 0 && !complete) {
      for (let i = 0; i < intersects.length; i++) {
        // console.log(user.playerInv)
        const shield = shields.find(
          (e) => e.uuid === intersects[i].object.uuid
        );
        store.dispatch(updatePlayerInv({
          playerInv: [...user.playerInv, {
          uuid: shield.uuid,
          name: shield.name,
          type: shield.type,
          color: shield.color,
          size: shield.size,
          shieldPoints: shield.shieldPoints,
          multiplier: shield.multiplier,
          }]
        }))
        
        console.log(user.playerInv)
        shieldItems.remove(intersects[i].object);
        shields.splice(
          shields.findIndex((e) => e.uuid === shield.uuid),
          1
        );
      }
    }
  };

  // event listeners
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("pointermove", onPointerMove);
  // let requestId
  const render = () => {
    requestAnimationFrame(render);
    onMove();
    wallIntersects();
    locationIntersects();
    levelCompleteIntersects();
    grabShield();
    // zoomControls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

export default createRender;
