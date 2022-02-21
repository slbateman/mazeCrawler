class HpBooster {
  options = {
    low: {
      name: "",
      type: "hpBooster",
      color: "green",
      size: 0.1,
      hpBoost: 10,
    },
    med: {
      name: "",
      type: "hpBooster",
      color: "green",
      size: 0.15,
      hpBoost: 25,
    },
    high: {
      name: "",
      type: "hpBooster",
      color: "green",
      size: 0.2,
      hpBoost: 50,
    },
  };

  constructor(type) {
    this.itemName = options[type].name;
    this.type = options[type].type;
    this.color = options[type].color;
    this.size = options[type].size;
    this.hpBoost = options[type].hpBoost;
  }
}
