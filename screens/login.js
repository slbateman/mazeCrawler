import React, { useState } from "react";
import { View, ImageBackground, TextInput, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import backgroundImage from "../assets/backgroundImage.png";

export default function levels({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = (navLoc) => {
    navigation.navigate(navLoc);
  };

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={globalStyles.containerCenter}
      >
        <Text style={globalStyles.gameTitleLogin}>Maze Crawler</Text>
        {loggedIn ? (
          <View style={globalStyles.containerCenter}>
            <Text
              style={globalStyles.button}
              onPress={() => pressHandler("Levels")}
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
            <Text
              style={globalStyles.button}
              onPress={() => pressHandler("Levels")}
            >
              login
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
