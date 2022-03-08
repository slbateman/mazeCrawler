import * as THREE from "three";
import HpBooster from "../itemClasses/hpBoosterClasses"
import { cells } from "./maze";

export const hpBoosterItems = new THREE.Group();
export const hpBoosters = [];

export const hpBoosterItemsGenerator = (level, mazeSize) => {
  // reset hpBoosterItems before each generation
  for (let i = hpBoosterItems.children.length - 1; i >= 0; i--) {
    hpBoosterItems.remove(hpBoosterItems.children[i]);
  }
  for (let i = hpBoosters.length - 1; i >= 0; i--) {
    hpBoosters.splice(hpBoosters[i], 1);
  }

  // random generation of hpBooster items
  for (let i = 0; i < level * .35 * 0.5; i++) {
    const opts = [
      {
        name: "HP Booster",
        type: "hpBooster",
        color: "green",
        size: 0.2,
        hpBoost: 10,
      },
      {
        name: "Extra HP Booster",
        type: "hpBooster",
        color: "green",
        size: 0.25,
        hpBoost: 25,
      },
      {
        name: "Blast of HP",
        type: "hpBooster",
        color: "green",
        size: 0.3,
        hpBoost: 50,
      },
    ];
    let max;
    if (level >= 0 && level < 5) max = 1;
    if (level >= 5 && level < 10) max = 2;
    if (level >= 10) max = 3;
    let random = Math.floor(Math.random() * max);
    const hpBooster = new HpBooster(opts[random]);
    const hpBoosterSphereGeometry = new THREE.SphereGeometry(
      hpBooster.size
    );
    const hpBoosterMaterial = new THREE.MeshStandardMaterial({
      color: "red",
    });
    const hpBoosterSphere = new THREE.Mesh(
      hpBoosterSphereGeometry,
      hpBoosterMaterial
    );
    hpBoosterSphere.receiveShadow = true;

    const hpBoosterRingGeometry = new THREE.TorusGeometry(
      hpBooster.size,
      0.05,
      10,
      50
    );
    const hpBoosterRingMaterial = new THREE.MeshStandardMaterial({
      color: hpBooster.color,
    });
    const hpBoosterRing1 = new THREE.Mesh(
      hpBoosterRingGeometry,
      hpBoosterRingMaterial
    );
    hpBoosterRing1.receiveShadow = true;

    const hpBoosterItem = new THREE.Group();
    hpBoosterItem.add(hpBoosterSphere);
    hpBoosterItem.add(hpBoosterRing1);

    let locationConfirmed = false;
    let loc1;
    let loc2;
    while (!locationConfirmed) {
      loc1 = Math.floor(Math.random() * mazeSize);
      loc2 = Math.floor(Math.random() * mazeSize);
      if (cells[loc1][loc2].item === false) locationConfirmed = true;
    }
    hpBoosterItem.position.set(
      loc1 * 5 + 2.5,
      loc2 * 5 + 2.5,
      hpBooster.size / 2
    );
    cells[loc1][loc2].item = true;

    hpBooster.uuid = hpBoosterItem.uuid;
    hpBoosters.push(hpBooster);
    hpBoosterItems.add(hpBoosterItem);
  }
  hpBoosterItems.position.set((-mazeSize * 5) / 2, (-mazeSize * 5) / 2, 0);
};
