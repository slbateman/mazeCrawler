class Shield {
  options = {
    low: {
      name: "",
      type: "shield",
      color: "green",
      size: 0.85,
      shieldPoints: 10,
      multiplier: 1,
    },
    med: {
      name: "",
      type: "shield",
      color: "green",
      size: 1,
      shieldPoints: 25,
      multiplier: 2,
    },
    high: {
      name: "",
      type: "shield",
      color: "green",
      size: 1.15,
      shieldPoints: 50,
      multiplier: 3,
    },
  };

  constructor(type, playerLevel) {
    this.itemName = options[type].name;
    this.type = options[type].type;
    this.color = options[type].color;
    this.size = options[type].size;
    this.shieldPoints =
      options[type].shieldPoints + playerLevel * options[type].multiplier;
  }
}
