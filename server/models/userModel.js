import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  currentLevel: {type: Number, default: 0},
  createdAt: {
    type: String,
    default: new Date().toISOString,
  },
});

const Users = mongoose.model("user", userSchema);

export default Users;
