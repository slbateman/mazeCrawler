export default class Shield {
  constructor(type, playerLevel) {
    this.uuid = null
    this.itemName = type.name;
    this.type = type.type;
    this.color = type.color;
    this.size = type.size;
    this.multiplier = type.multiplier
    this.shieldPoints =
    type.shieldPoints + playerLevel * type.multiplier;
  }
}
