import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  currentLevel: { type: Number, default: 0 },
  playerLevel: { type: Number, default: 0 },
  playerLevelXp: { type: Number, default: 0 },
  playerXp: { type: Number, default: 0 },
  playerHp: { type: Number, default: 100 },
  playerInvCap: { type: Number, default: 75 },
  playerInv: { type: Array, default: [] },
  playerInvWeight: { type: Number, default: 0 },
  equippedWeapon: {
    uuid: {type: String, default: "" },
    name: {type: String, default: "" },
    type: {type: String, default: "weapon" },
    color: {type: String, default: "" },
    size: {type: Number, default: 0 },
    damage: {type: Number, default: 0 },
    charge: {type: Number, default: 0 },
    maxCharge: {type: Number, default: 0 },
    distance: {type: Number, default: 0 },
  },
  equippedShield: { 
    uuid: {type: String, default: "" },
    name: {type: String, default: "" },
    type: {type: String, default: "shield" },
    color: {type: String, default: "" },
    size: {type: Number, default: 0 },
    shieldPoints: {type: Number, default: 0 },
    shieldMaxPoints: {type: Number, default: 0 },
  },
  createdAt: {
    type: String,
    default: new Date().toISOString,
  },
});

const Users = mongoose.model("user", userSchema);

export default Users;
