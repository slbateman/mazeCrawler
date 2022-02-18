class WeaponCharge {
  options = {
    low: {
      name: "Charger Pack",
      type: "charge",
      color: "blue",
      size: 0.1,
      charge: 20,
    },
    med: {
      name: "Extended-Life Charger Pack",
      type: "charge",
      color: "blue",
      size: 0.15,
      charge: 50,
    },
    high: {
      name: "Super-Charge Charger Pack",
      type: "charge",
      color: "blue",
      size: 0.2,
      charge: 100,
    },
  };

  constructor(type) {
    this.itemName = options[type].name;
    this.type = options[type].type;
    this.color = options[type].color;
    this.size = options[type].size;
    this.charge = options[type].charge;
  }
}
