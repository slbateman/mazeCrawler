export default class HpBooster {
  constructor(type) {
    this.itemName = type.name;
    this.type = type.type;
    this.color = type.color;
    this.size = type.size;
    this.hpBoost = type.hpBoost;
  }
}
