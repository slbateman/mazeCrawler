class WallBreaker {
  options = {
    breakerLow: {
      name: "",
      type: "breaker",
      color: "brown",
      size: 0.1,
      wallCost: 25,
      charge: 100,
    },
    breakerMed: {
      name: "",
      type: "breaker",
      color: "brown",
      size: 0.15,
      wallCost: 20,
      charge: 120,
    },
    breakerHigh: {
      name: "",
      type: "breaker",
      color: "brown",
      size: 0.2,
      wallCost: 15,
      charge: 120,
    },
  };

  constructor(type) {
    this.itemName = options[type].name;
    this.type = options[type].type;
    this.color = options[type].color;
    this.size = options[type].size;
    this.wallCost = options[type].wallCost;
    this.charge = options[type].charge;
  }
}
