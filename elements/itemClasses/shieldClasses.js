export default class Shield {
  constructor(type, playerLevel) {
    this.itemName = type.name;
    this.type = type.type;
    this.color = type.color;
    this.size = type.size;
    this.shieldPoints =
    type.shieldPoints + playerLevel * type.multiplier;
  }
}
