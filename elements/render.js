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
import { enemyGroups, enemies } from "./objects/enemies";
import { hpBoosterItems, hpBoosters } from "./objects/hpBoosters";
import { userShield, userShieldGenerator } from "./objects/userShield";
import {
  updatePlayerInv,
  editLevelComplete,
  updateEquippedShield,
  updatePlayerXP,
  updatePlayerHP,
  updateShieldPoints,
  editYouDied,
  updatePlayerYouDied,
} from "../state/userSlice";
import store from "../state/store";
import { updateUser } from "../api/userAPI";

export let requestId;

const createRender = async (gl) => {
  const { drawingBufferHeight: height, drawingBufferWidth: width } = gl;

  let state = store.getState();
  let user = state.user.user;
  let level = state.user.levelComplete.level;
  userShieldGenerator(user.equippedShield);

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 20);
  camera.position.set(0, -2, 10);
  camera.lookAt(player.position);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);

  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const mazeCompleted = new THREE.Group();
  mazeCompleted.add(pillars);
  mazeCompleted.add(walls);

  const collisionObjects = new THREE.Group();
  collisionObjects.add(mazeCompleted);
  collisionObjects.add(enemyGroups);

  const scene = new THREE.Scene();
  scene.add(ground);
  scene.add(collisionObjects);
  scene.add(pathLights);
  scene.add(levelComplete);
  scene.add(shieldItems);
  scene.add(hpBoosterItems);

  const playerSet = new THREE.Group();
  topDownSpotlight.target = player;
  playerSet.add(player);
  playerSet.add(topDownSpotlight);
  playerSet.add(playerOmniLight);
  playerSet.add(userShield);
  playerSet.position.set(0, 0, 1);
  const userShieldAnimation = () => {
    for (let i = 0; i < userShield.children.length; i++) {
      userShield.children[i].rotation.x += 0.1;
      userShield.children[i].rotation.y += 0.1;
    }
  };
  scene.add(playerSet);

  const shieldItemsAnimation = () => {
    for (let i = 0; i < shieldItems.children.length; i++) {
      shieldItems.children[i].rotation.x += 0.1;
      shieldItems.children[i].rotation.y += 0.1;
    }
  };

  let enemyMove = "left";
  let leftRightPosition = 0;
  let upDownPosition = 0;
  let enemySpeed = 0.1;
  let enemySq = level <= 5 ? 5 : level <= 10 ? 10 : level <= 15 ? 15 : 20 ;
  const enemyGroupsAnimation = () => {
    for (let i = 0; i < enemyGroups.children.length; i++) {
      enemyGroups.children[i].rotation.z += 0.1;
      switch (enemyMove) {
        case "left":
          if (leftRightPosition > -enemySq * enemyGroups.children.length) {
            leftRightPosition -= enemySpeed;
            enemyGroups.children[i].position.x -= enemySpeed;
          } else enemyMove = "up";
          break;
        case "up":
          if (upDownPosition < enemySq * enemyGroups.children.length) {
            upDownPosition += enemySpeed;
            enemyGroups.children[i].position.y += enemySpeed;
          } else enemyMove = "right";
          break;
        case "right":
          if (leftRightPosition < enemySq * enemyGroups.children.length) {
            leftRightPosition += enemySpeed;
            enemyGroups.children[i].position.x += enemySpeed;
          } else enemyMove = "down";
          break;
        case "down":
          if (upDownPosition > -enemySq * enemyGroups.children.length) {
            upDownPosition -= enemySpeed;
            enemyGroups.children[i].position.y -= enemySpeed;
          } else enemyMove = "left";
        default:
          break;
      }
    }
  };

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
      collisionObjects.children,
      true
    );
    const intersectsDown = downRaycaster.intersectObjects(
      collisionObjects.children,
      true
    );
    const intersectsLeft = leftRaycaster.intersectObjects(
      collisionObjects.children,
      true
    );
    const intersectsRight = rightRaycaster.intersectObjects(
      collisionObjects.children,
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
      window.cancelAnimationFrame(requestId);
      store.dispatch(editLevelComplete(true));
      store.dispatch(updatePlayerXP(25 + 12 * level));
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

  let mousedown = false;
  let clickTracker = 0;
  let attackTracker = 0;
  function onMouseDown() {
    mousedown = true;
    clickTracker++;
  }
  function onMouseUp() {
    mousedown = false;
  }
  // function for shield item grab
  const grabShield = () => {
    pointerRaycaster.setFromCamera(pointer, camera);
    const intersects = pointerRaycaster.intersectObjects(
      shieldItems.children,
      true
    );
    if (intersects.length > 0 && !complete && mousedown) {
      const shield = shields.find(
        (e) => e.uuid === intersects[0].object.parent.uuid
      );
      store.dispatch(
        updatePlayerInv({
          playerInv: [
            ...user.playerInv,
            {
              uuid: shield.uuid,
              name: shield.itemName,
              type: shield.type,
              color: shield.color,
              size: shield.size,
              shieldPoints: shield.shieldPoints,
              shieldMaxPoints: shield.shieldMaxPoints,
            },
          ],
        })
      );
      shieldItems.remove(intersects[0].object.parent);
      shields.splice(
        shields.findIndex((e) => e.uuid === shield.uuid),
        1
      );
      store.dispatch(updatePlayerXP(level * 5));
    }
  };
  // function for shield item grab
  const grabHpBooster = () => {
    pointerRaycaster.setFromCamera(pointer, camera);
    const intersects = pointerRaycaster.intersectObjects(
      hpBoosterItems.children,
      true
    );
    if (intersects.length > 0 && !complete && mousedown) {
      const hpBooster = hpBoosters.find(
        (e) => e.uuid === intersects[0].object.parent.uuid
      );
      store.dispatch(
        updatePlayerInv({
          playerInv: [
            ...user.playerInv,
            {
              uuid: hpBooster.uuid,
              name: hpBooster.itemName,
              type: hpBooster.type,
              color: hpBooster.color,
              size: hpBooster.size,
              hpBoost: hpBooster.hpBoost,
            },
          ],
        })
      );
      hpBoosterItems.remove(intersects[0].object.parent);
      hpBoosters.splice(
        hpBoosters.findIndex((e) => e.uuid === hpBooster.uuid),
        1
      );
      store.dispatch(updatePlayerXP(level * 5));
    }
  };
  // function to attack enemy
  const attackEnemy = () => {
    pointerRaycaster.setFromCamera(pointer, camera);
    const intersects = pointerRaycaster.intersectObjects(
      enemyGroups.children,
      true
    );
    if (
      intersects.length > 0 &&
      !complete &&
      mousedown &&
      clickTracker > attackTracker
    ) {
      const enemyIndex = enemies.findIndex(
        (e) => e.uuid === intersects[0].object.parent.uuid
      );
      enemies[enemyIndex].hp -=
        user.playerBaseDamage + user.equippedWeapon.damage;
      store.dispatch(
        updatePlayerXP(user.playerBaseDamage + user.equippedWeapon.damage)
      );
      if (enemies[enemyIndex].hp <= 0) {
        enemyGroups.remove(intersects[0].object.parent);
        enemies.splice(enemyIndex, 1);
      }
      attackTracker++;
    }
  };

  let frameEnemyAttackTracker = 0;
  let enemyIndex;
  let newEnemyIndex = -1;
  const enemyAttack = () => {
    const intersectsUp = upRaycaster.intersectObjects(
      enemyGroups.children,
      true
    );
    const intersectsDown = downRaycaster.intersectObjects(
      enemyGroups.children,
      true
    );
    const intersectsLeft = leftRaycaster.intersectObjects(
      enemyGroups.children,
      true
    );
    const intersectsRight = rightRaycaster.intersectObjects(
      enemyGroups.children,
      true
    );
    if (
      intersectsUp.length > 0 ||
      intersectsDown.length > 0 ||
      intersectsLeft.length > 0 ||
      intersectsRight.length > 0
    ) {
      if (intersectsUp.length > 0) {
        newEnemyIndex = enemies.findIndex(
          (e) => e.uuid === intersectsUp[0].object.parent.uuid
        );
        if (enemyIndex !== newEnemyIndex) {
          enemyIndex = newEnemyIndex;
          frameEnemyAttackTracker = 0;
        }
      }
      if (intersectsDown.length > 0) {
        newEnemyIndex = enemies.findIndex(
          (e) => e.uuid === intersectsDown[0].object.parent.uuid
        );
        if (enemyIndex !== newEnemyIndex) {
          enemyIndex = newEnemyIndex;
          frameEnemyAttackTracker = 0;
        }
      }
      if (intersectsLeft.length > 0) {
        newEnemyIndex = enemies.findIndex(
          (e) => e.uuid === intersectsLeft[0].object.parent.uuid
        );
        if (enemyIndex !== newEnemyIndex) {
          enemyIndex = newEnemyIndex;
          frameEnemyAttackTracker = 0;
        }
      }
      if (intersectsRight.length > 0) {
        newEnemyIndex = enemies.findIndex(
          (e) => e.uuid === intersectsRight[0].object.parent.uuid
        );
        if (enemyIndex !== newEnemyIndex) {
          enemyIndex = newEnemyIndex;
          frameEnemyAttackTracker = 0;
        }
      }
      if (frameEnemyAttackTracker === 0) {
        if (user.equippedShield.shieldPoints > 0) {
          store.dispatch(updateShieldPoints(-enemies[enemyIndex].damage));
        }
        if (
          (user.equippedShield.uuid === "" || !user.equippedShield) &&
          user.playerHp > 0
        ) {
          store.dispatch(updatePlayerHP(-enemies[enemyIndex].damage));
        }
      }
      if (frameEnemyAttackTracker < enemies[enemyIndex].sps)
        frameEnemyAttackTracker++;
      if (frameEnemyAttackTracker === enemies[enemyIndex].sps)
        frameEnemyAttackTracker = 0;
    }
  };

  const hpChecker = () => {
    state = store.getState();
    user = state.user.user;
    if (user.playerHp <= 0) {
      window.cancelAnimationFrame(requestId);
      store.dispatch(editYouDied(true));
      store.dispatch(updatePlayerYouDied());
    }
  };

  // event listeners
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);

  const render = () => {
    requestId = requestAnimationFrame(render);
    hpChecker();
    shieldItemsAnimation();
    userShieldAnimation();
    enemyGroupsAnimation();
    onMove();
    wallIntersects();
    locationIntersects();
    levelCompleteIntersects();
    grabShield();
    grabHpBooster();
    // attackEnemy();
    enemyAttack();
    // zoomControls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

export default createRender;
