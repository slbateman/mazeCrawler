import { createSlice } from "@reduxjs/toolkit";
import { updateUser, deleteUser } from "../api/userAPI";

let allUsers = [];
let user = null;
let localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
let levelComplete = false;

if (!localUserInfo) {
  localUserInfo = {
    user_id: null,
    loggedIn: false,
  };
  localStorage.setItem("localUserInfo", JSON.stringify(localUserInfo));
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers,
    user,
    localUserInfo,
    levelComplete,
  },
  reducers: {
    loadAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    loadUser: (state, action) => {
      state.user = action.payload[0];
    },
    loginUser: (state, action) => {
      state.localUserInfo = action.payload;
      localStorage.setItem(
        "localUserInfo",
        JSON.stringify(state.localUserInfo)
      );
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
      state.localUserInfo = {
        user_id: action.payload._id,
        loggedIn: true,
      };
      localStorage.setItem(
        "localUserInfo",
        JSON.stringify(state.localUserInfo)
      );
    },
    removeUser: (state, action) => {
      state.user = null;
      state.localUserInfo = {
        user_id: null,
        loggedIn: false,
      };
      localStorage.setItem("localUserInfo", JSON.stringify(localUserInfo));
      state.levelComplete = false;
      deleteUser(action.payload._id);
    },
    editLevelComplete: (state, action) => {
      state.levelComplete = action.payload;
    },
    editCurrentLevel: (state, action) => {
      state.user.currentLevel = action.payload.currentLevel;
      updateUser(action.payload._id, {
        currentLevel: action.payload.currentLevel,
      });
    },
    updatePlayerInv: (state, action) => {
      state.user.playerInv = action.payload.playerInv
      updateUser(state.user._id, action.payload)
    },
    updateEquippedShield: (state, action) => {
      state.user.equippedShield = action.payload.equippedShield
      updateUser(state.user._id, action.payload)
    },
    updateEquippedWeapon: (state, action) => {
      state.user.equippedWeapon = action.payload.equippedWeapon
      updateUser(state.user._id, action.payload)
    }
  },
});

export const {
  loadAllUsers,
  loadUser,
  loginUser,
  addUser,
  removeUser,
  editLevelComplete,
  editCurrentLevel,
  updatePlayerInv,
  updateEquippedShield,
  updateEquippedWeapon
} = userSlice.actions;

export const selectAllUsers = (state) => state.user.allUsers;
export const selectUser = (state) => state.user.user;
export const selectLocalUserInfo = (state) => state.user.localUserInfo;
export const selectLevelComplete = (state) => state.user.levelComplete;

export default userSlice.reducer;
