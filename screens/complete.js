import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { editLevelComplete, selectUser } from "../state/userSlice";
import backgroundImage from "../assets/backgroundImage.png";

export default function game({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const pressHandler = (num) => {
    dispatch(editLevelComplete(false));
    navigation.navigate("Game", { level: num });
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
          <Text style={globalStyles.titleText}>Level Complete!</Text>
          <Text
            style={globalStyles.button}
            onPress={() => {
              navigation.navigate("Levels");
            }}
          >
            pick level
          </Text>
          <Text
            style={globalStyles.button}
            onPress={() => {
              pressHandler(user.currentLevel);
            }}
          >
            {`level ${user.currentLevel}`}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
