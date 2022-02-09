import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  email: { type: String, default: "" },
  currentLevel: {type: Number, default: 0},
  createdAt: {
    type: String,
    default: new Date().toISOString,
  },
});

const Users = mongoose.model("user", userSchema);

export default Users;
