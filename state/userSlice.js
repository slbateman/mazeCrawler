import { createSlice } from "@reduxjs/toolkit";
import { updateUser, deleteUser } from "../api/userAPI";

let allUsers = [];
let user = null;
let localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
let levelComplete = {
  level: 0,
  complete: false,
  died: false,
};

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
    editLevel: (state, action) => {
      state.levelComplete.level = action.payload;
    },
    editLevelComplete: (state, action) => {
      state.levelComplete.complete = action.payload;
    },
    editYouDied: (state, action) => {
      state.levelComplete.died = action.payload;
    },
    editCurrentLevel: (state, action) => {
      state.user.currentLevel = action.payload.currentLevel;
      updateUser(action.payload._id, {
        currentLevel: action.payload.currentLevel,
      });
    },
    updatePlayerInv: (state, action) => {
      state.user.playerInv = action.payload.playerInv;
      updateUser(state.user._id, action.payload);
    },
    updateEquippedShield: (state, action) => {
      state.user.equippedShield = action.payload.equippedShield;
      updateUser(state.user._id, action.payload);
    },
    updateEquippedWeapon: (state, action) => {
      state.user.equippedWeapon = action.payload.equippedWeapon;
      updateUser(state.user._id, action.payload);
    },
    updatePlayerXP: (state, action) => {
      state.user.playerXp = state.user.playerXp + action.payload;
      state.user.playerLevelXp = state.user.playerLevelXp + action.payload;
      if (
        state.user.playerLevelXp >
        (state.user.playerLevel + 1) * 100 + state.user.playerLevel * 50
      ) {
        state.user.playerLevelXp =
          state.user.playerLevelXp -
          ((state.user.playerLevel + 1) * 100 + state.user.playerLevel * 50);
        state.user.playerLevel = state.user.playerLevel + 1;
        state.user.playerHp = state.user.playerLevel * 10 + 100;
        state.user.playerBaseDamage = state.user.playerBaseDamage + 1;
      }
      updateUser(state.user._id, {
        playerXp: state.user.playerXp,
        playerLevelXp: state.user.playerLevelXp,
        playerLevel: state.user.playerLevel,
        playerHp: state.user.playerHp,
        playerBaseDamage: state.user.playerBaseDamage,
      });
    },
    updatePlayerHP: (state, action) => {
      state.user.playerHp = state.user.playerHp + action.payload;
      updateUser(state.user._id, {
        playerHp: state.user.playerHp,
      });
    },
    updateShieldPoints: (state, action) => {
      state.user.equippedShield.shieldPoints =
        state.user.equippedShield.shieldPoints + action.payload;
      updateUser(state.user._id, {
        equippedShield: state.user.equippedShield,
      });
    },
    updatePlayerYouDied: (state, action) => {
      if (state.user.playerLevel === 0) state.user.playerLevel = 0
      else state.user.playerLevel = state.user.playerLevel - 1;
      state.user.playerXp = state.user.playerXp - state.user.playerLevelXp;
      state.user.playerLevelXp = 0;
      state.user.playerHp = state.user.playerLevel * 10 + 100;
      state.user.playerBaseDamage = 5 + state.user.playerLevel;
      state.user.playerInv = [];
      if (state.user.equippedShield){
      state.user.equippedShield = {
        uuid: "",
        name: "",
        type: "",
        color: "",
        size: 0,
        shieldPoints: 0,
        shieldMaxPoints: 0,
      };};
      if (state.user.equippedWeapon) {
      state.user.equippedWeapon = {
        uuid: "",
        name: "",
        type: "",
        color: "",
        size: 0,
        damage: 0,
        charge: 0,
        maxCharge: 0,
        distance: 0,
      };};
      updateUser(state.user._id, {
        playerXp: state.user.playerXp,
        playerLevelXp: state.user.playerLevelXp,
        playerLevel: state.user.playerLevel,
        playerHp: state.user.playerHp,
        playerBaseDamage: state.user.playerBaseDamage,
        playerInv: state.user.playerInv,
        equippedShield: state.user.equippedShield,
        equippedWeapon: state.user.equippedWeapon,
      });
    },
  },
});

export const {
  loadAllUsers,
  loadUser,
  loginUser,
  addUser,
  removeUser,
  editLevelComplete,
  editYouDied,
  editLevel,
  editCurrentLevel,
  updatePlayerInv,
  updateEquippedShield,
  updateEquippedWeapon,
  updatePlayerXP,
  updatePlayerHP,
  updateShieldPoints,
  updatePlayerYouDied,
} = userSlice.actions;

export const selectAllUsers = (state) => state.user.allUsers;
export const selectUser = (state) => state.user.user;
export const selectLocalUserInfo = (state) => state.user.localUserInfo;
export const selectLevelComplete = (state) => state.user.levelComplete;

export default userSlice.reducer;
