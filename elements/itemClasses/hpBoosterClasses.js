class HpBooster {
  options = {
    low: {
      name: "",
      type: "HpBooster",
      color: "green",
      size: 0.1,
      hpBoost: 10,
    },
    med: {
      name: "",
      type: "HpBooster",
      color: "green",
      size: 0.15,
      hpBoost: 25,
    },
    high: {
      name: "",
      type: "HpBooster",
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
