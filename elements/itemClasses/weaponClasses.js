class Weapon {
  options = {
    beamLow: {
      name: "",
      type: "beamWeapon",
      color: "yellow",
      size: 0.1,
      damage: 5,
      charge: 100,
      maxCharge: 100,
      distance: 10,
    },
    beamMed: {
      name: "",
      type: "beamWeapon",
      color: "orange",
      size: 0.15,
      damage: 8,
      charge: 144,
      maxCharge: 144,
      distance: 12,
    },
    beamHigh: {
      name: "",
      type: "beamWeapon",
      color: "red",
      size: 0.2,
      damage: 15,
      charge: 225,
      maxCharge: 225,
      distance: 15,
    },
    diskLow: {
      name: "",
      type: "diskWeapon",
      color: "yellow",
      size: 0.1,
      damage: 10,
      charge: 100,
      maxCharge: 100,
      distance: 7.5,
    },
    diskMed: {
      name: "",
      type: "diskWeapon",
      color: "orange",
      size: 0.15,
      damage: 20,
      charge: 144,
      maxCharge: 144,
      distance: 12.5,
    },
    diskHigh: {
      name: "",
      type: "diskWeapon",
      color: "red",
      size: 0.2,
      damage: 30,
      charge: 225,
      maxCharge: 225,
      distance: 17.5,
    },
  };

  constructor(type, playerLevel) {
    this.itemName = options[type].name;
    this.type = options[type].type;
    this.color = options[type].color;
    this.size = options[type].size;
    this.damage = options[type].damage + playerLevel;
    this.charge = options[type].charge;
    this.maxCharge = options[type].charge;
  }
}
