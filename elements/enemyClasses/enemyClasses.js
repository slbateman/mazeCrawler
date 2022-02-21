class Enemy {
    options = {
      low: {
        name: "",
        type: "enemy",
        color: "yellow",
        size: 0.5,
        hp: 75,
        damage: 10,
        sps: 1,
        distance: 5
      },
      lowMed: {
        name: "",
        type: "enemy",
        color: "brown",
        size: 0.75,
        hp: 100,
        damage: 15,
        sps: 2,
        distance: 10
      },
      med: {
        name: "",
        type: "enemy",
        color: "black",
        size: 1,
        hp: 150,
        damage: 20,
        sps: 3,
        distance: 10
      },
      medHigh: {
        name: "",
        type: "enemy",
        color: "bronze",
        size: 1.25,
        hp: 225,
        damage: 25,
        sps: 4,
        distance: 15
      },
      high: {
        name: "",
        type: "enemy",
        color: "gold",
        size: 1.5,
        hp: 300,
        damage: 30,
        sps: 5,
        distance: 15
      },
    };
  
    constructor(type, playerLevel) {
      this.itemName = options[type].name;
      this.type = options[type].type;
      this.color = options[type].color;
      this.size = options[type].size;
      this.hp = options[type].hp;
      this.damage = options[type].damage + playerLevel;
    }
  }
  