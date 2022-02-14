import * as api from "../api/userAPI.js";
import { loadUser, addUser, loadAllUsers } from "./userSlice";

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.readAllUsers();
    dispatch(loadAllUsers(data));
  } catch (error) {
    console.log(error);
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.readUser(id);
    dispatch(loadUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const postUser = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.createUser(newUser);
    dispatch(addUser(data));
  } catch (error) {
    console.log(error);
  }
};
