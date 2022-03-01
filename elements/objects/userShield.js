import * as THREE from "three";

export const userShield = new THREE.Group();

export const removeUserShield = () => {
  for (let i = userShield.children.length - 1; i >= 0; i--) {
    userShield.remove(userShield.children[i]);
  }
};

export const userShieldGenerator = (shield) => {
  removeUserShield();

  const shieldSphereGeometry = new THREE.SphereGeometry(shield.size);
  const shieldMaterial = new THREE.MeshStandardMaterial({
    color: shield.color,
    transparent: true,
    opacity: 0.2,
  });
  const shieldSphere = new THREE.Mesh(shieldSphereGeometry, shieldMaterial);

  const shieldRingGeometry = new THREE.TorusGeometry(
    shield.size,
    0.05,
    10,
    50
  );
  const shieldRingMaterial = new THREE.MeshStandardMaterial({
    color: shield.color,
  });
  const shieldRing1 = new THREE.Mesh(shieldRingGeometry, shieldRingMaterial);
  const shieldRing2 = new THREE.Mesh(shieldRingGeometry, shieldRingMaterial);
  shieldRing2.rotation.x = Math.PI / 2;
  const shieldRing3 = new THREE.Mesh(shieldRingGeometry, shieldRingMaterial);
  shieldRing3.rotation.y = Math.PI / 2;

  userShield.add(shieldSphere);
  userShield.add(shieldRing1);
  userShield.add(shieldRing2);
  userShield.add(shieldRing3);
};
