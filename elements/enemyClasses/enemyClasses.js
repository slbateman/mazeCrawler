export default class Enemy {
  constructor(type, playerLevel) {
    this.uuid = null;
    this.itemName = type.name;
    this.type = type.type;
    this.color = type.color;
    this.size = type.size;
    this.hp = type.hp + playerLevel * 10;
    this.damage = type.damage + playerLevel;
    this.sps = type.sps;
    this.distance = type.distance;
  }
}
