import * as THREE from "three";
import Shield from "../itemClasses/shieldClasses";

export const shieldItems = new THREE.Group();
export const shields = []

export const shieldItemsGenerator = (level, playerLevel, mazeSize) => {

  // reset shieldItems before each generation
  for (let i = shieldItems.children.length - 1; i >= 0; i--) {
    shieldItems.remove(shieldItems.children[i]);
  }
  for (let i = shields.length - 1; i >= 0; i--) {
    shields.splice(shields[i], 1);
  }

  // random generation of shield items
  for (let i = 0; i < level; i++) {
    const opts = [
      {
        name: "Light Shield",
        type: "shield",
        color: "green",
        size: 0.85,
        shieldPoints: 10,
        multiplier: 1,
      },
      {
        name: "Boosted Shield",
        type: "shield",
        color: "blue",
        size: 1,
        shieldPoints: 25,
        multiplier: 2,
      },
      {
        name: "High Voltage Shield",
        type: "shield",
        color: "white",
        size: 1.15,
        shieldPoints: 50,
        multiplier: 3,
      },
    ];
    let max;
    if (level >= 0 && level < 5) max = 1;
    if (level >= 5 && level < 10) max = 2;
    if (level >= 10) max = 3;
    let random = Math.floor(Math.random() * max);
    const shield = new Shield(opts[random], playerLevel);
    const shieldGeometry = new THREE.SphereGeometry(shield.size / 2);
    const shieldMaterial = new THREE.MeshStandardMaterial({
      color: shield.color,
      transparent: true,
      opacity: 0.75,
    });
    const shieldItem = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldItem.position.set(
      Math.floor(Math.random() * mazeSize) * 5 + 2.5,
      Math.floor(Math.random() * mazeSize) * 5 + 2.5,
      shield.size / 2
    );
    shield.uuid = shieldItem.uuid
    shields.push(shield)
    shieldItems.add(shieldItem);
  }
  shieldItems.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0);
};
