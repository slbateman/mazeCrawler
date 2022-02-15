import React, { useEffect, useState } from "react";
import { View, ImageBackground, TextInput, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import backgroundImage from "../assets/backgroundImage.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAllUsers,
  selectLocalUserInfo,
  selectUser,
} from "../state/userSlice";
import { getAllUsers, getUser } from "../state/actions";

export default function levels({ navigation }) {
  const dispatch = useDispatch();

  const localUserInfo = useSelector(selectLocalUserInfo);
  const allUsers = useSelector(selectAllUsers);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (localUserInfo.user_id === null) {
      dispatch(getAllUsers());
    } else {
      dispatch(getUser(localUserInfo.user_id));
    }
  }, [localUserInfo]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    if (localUserInfo.user_id === null) {
      let userCheck = allUsers.find((e) => e.email === email);
      if (userCheck) {
        if (password === userCheck.password) {
          dispatch(
            loginUser({
              user_id: userCheck._id,
              loggedIn: true,
            })
          );
          navigation.navigate("Levels");
        } else alert("password is incorrect");
      } else alert("there is no account with this email");
    }
  };

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={globalStyles.containerCenter}
      >
        <Text style={globalStyles.gameTitleLogin}>Maze Crawler</Text>
        {localUserInfo.loggedIn ? (
          <View style={globalStyles.containerCenter}>
            <Text
              style={globalStyles.button}
              onPress={() => {
                navigation.navigate("Levels");
              }}
            >
              enter
            </Text>
          </View>
        ) : (
          <View style={globalStyles.containerCenter}>
            <TextInput
              style={globalStyles.textInput}
              type="email"
              textContentType="email"
              onChangeText={setEmail}
              value={email}
              placeholder="enter email address"
              keyboardType="email-address"
            />
            <TextInput
              style={globalStyles.textInput}
              type="password"
              textContentType="password"
              onChangeText={setPassword}
              value={password}
              placeholder="enter password"
              keyboardType="default"
            />
            <Text style={globalStyles.button} onPress={() => loginHandler()}>
              login
            </Text>
            <Text
              style={globalStyles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              sign up
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
