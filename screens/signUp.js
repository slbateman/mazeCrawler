import React, { useEffect, useState } from "react";
import { View, ImageBackground, TextInput, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import backgroundImage from "../assets/backgroundImage.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, postUser } from "../state/actions";
import { selectAllUsers, selectLocalUserInfo } from "../state/userSlice";

export default function signUp({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const allUsers = useSelector(selectAllUsers);
  const localUserInfo = useSelector(selectLocalUserInfo);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (localUserInfo.loggedIn) {
      navigation.goBack();
    }
  }, [localUserInfo]);

  const pressHandler = () => {
    if (allUsers.length > 0) {
      if (email === "") return alert("email cannot be empty");
      if (password1 === "") return alert("create password cannot be empty");
      if (password2 === "") return alert("confirm password cannot be empty");
      let user = allUsers.find((e) => e.email === email);
      if (user) return alert("username already exists");
      if (password1 !== password2) alert("your passwords down't match");
      dispatch(
        postUser({
          email: email,
          password: password1,
        })
      );
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
            secureTextEntry="true"
            onChangeText={setPassword1}
            value={password1}
            placeholder="create password"
            keyboardType="default"
          />
          <TextInput
            style={globalStyles.textInput}
            secureTextEntry="true"
            onChangeText={setPassword2}
            value={password2}
            placeholder="confirm password"
            keyboardType="default"
          />
          <Text style={globalStyles.button} onPress={() => pressHandler()}>
            submit
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
