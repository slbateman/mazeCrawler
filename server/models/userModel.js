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
  equippedWeapon: { type: Object, default: {} },
  equippedShield: { type: Object, default: {} },
  createdAt: {
    type: String,
    default: new Date().toISOString,
  },
});

const Users = mongoose.model("user", userSchema);

export default Users;
