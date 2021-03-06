import * as THREE from "three";
import Enemy from "../enemyClasses/enemyClasses";
import { cells } from "./maze";

export const enemyGroups = new THREE.Group();
export const enemies = [];

export const enemyGroupsGenerator = (level, playerLevel, mazeSize) => {
  // reset enemyGroups before each generation
  for (let i = enemyGroups.children.length - 1; i >= 0; i--) {
    enemyGroups.remove(enemyGroups.children[i]);
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies.splice(enemies[i], 1);
  }

  // random generation of enemy items
  for (let i = 0; i < level * 2; i++) {
    const opts = [
      {
        name: "",
        type: "enemy",
        color: "#8c8c00",
        size: 0.5,
        hp: 75,
        damage: 1,
        sps: 3,
        distance: 5,
      },
      {
        name: "",
        type: "enemy",
        color: "#8c4f00",
        size: 0.75,
        hp: 100,
        damage: 2,
        sps: 5,
        distance: 10,
      },
      {
        name: "",
        type: "enemy",
        color: "#8c0000",
        size: 1,
        hp: 150,
        damage: 3,
        sps: 7,
        distance: 10,
      },
      {
        name: "",
        type: "enemy",
        color: "#290054",
        size: 1.25,
        hp: 225,
        damage: 4,
        sps: 9,
        distance: 15,
      },
      {
        name: "",
        type: "enemy",
        color: "#000054",
        size: 1.5,
        hp: 300,
        damage: 5,
        sps: 11,
        distance: 15,
      },
    ];
    let max;
    if (level >= 0 && level < 3) max = 1;
    if (level >= 3 && level < 6) max = 2;
    if (level >= 6 && level < 10) max = 3;
    if (level >= 10 && level < 15) max = 4;
    if (level >= 15) max = 5;
    let random = Math.floor(Math.random() * max);
    const enemy = new Enemy(opts[random], playerLevel);
    const enemySphereGeometry = new THREE.SphereGeometry(enemy.size);
    const enemyMaterial = new THREE.MeshStandardMaterial({
      color: enemy.color,
      transparent: true,
      opacity: 0.35,
    });
    const enemySphere = new THREE.Mesh(enemySphereGeometry, enemyMaterial);
    enemySphere.receiveShadow = true;

    const enemyInnerSphereGeometry = new THREE.SphereGeometry(enemy.size / 1.5);
    const enemyInnerSphereMaterial = new THREE.MeshStandardMaterial({
      color: enemy.color,
    });
    const enemyInnerSphere = new THREE.Mesh(
      enemyInnerSphereGeometry,
      enemyInnerSphereMaterial
    );
    enemyInnerSphere.receiveShadow = true;

    const enemyConeGeometry = new THREE.ConeGeometry(
      enemy.size / 3,
      enemy.size * 1.5,
      10,
      50
    );
    const enemyConeMaterial = new THREE.MeshStandardMaterial({
      color: enemy.color,
    });
    const enemyCone1 = new THREE.Mesh(enemyConeGeometry, enemyConeMaterial);
    enemyCone1.receiveShadow = true;
    enemyCone1.position.y += enemy.size / 1.5;
    const enemyCone2 = new THREE.Mesh(enemyConeGeometry, enemyConeMaterial);
    enemyCone2.receiveShadow = true;
    enemyCone2.rotation.z = Math.PI / 2;
    enemyCone2.position.x -= enemy.size / 1.5;
    const enemyCone3 = new THREE.Mesh(enemyConeGeometry, enemyConeMaterial);
    enemyCone3.receiveShadow = true;
    enemyCone3.rotation.z = Math.PI / -2;
    enemyCone3.position.x += enemy.size / 1.5;
    const enemyCone4 = new THREE.Mesh(enemyConeGeometry, enemyConeMaterial);
    enemyCone4.receiveShadow = true;
    enemyCone4.rotation.z = Math.PI;
    enemyCone4.position.y -= enemy.size / 1.5;

    const enemyGroup = new THREE.Group();
    enemyGroup.add(enemySphere);
    enemyGroup.add(enemyInnerSphere);
    enemyGroup.add(enemyCone1);
    enemyGroup.add(enemyCone2);
    enemyGroup.add(enemyCone3);
    enemyGroup.add(enemyCone4);

    let locationConfirmed = false;
    let loc1;
    let loc2;
    while (!locationConfirmed) {
      loc1 = Math.floor(Math.random() * mazeSize);
      loc2 = Math.floor(Math.random() * mazeSize);
      if (cells[loc1][loc2].item === false) locationConfirmed = true;
    }
    enemyGroup.position.set(loc1 * 5 + 2.5, loc2 * 5 + 2.5, 1);
    cells[loc1][loc2].item = true;

    enemy.uuid = enemyGroup.uuid;
    enemies.push(enemy);
    enemyGroups.add(enemyGroup);
  }
  enemyGroups.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0);
};
