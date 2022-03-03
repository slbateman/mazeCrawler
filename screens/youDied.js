import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import backgroundImage from "../assets/backgroundImage.png";

export default function youDied({ navigation }) {

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={globalStyles.containerCenter}
      >
        <Text style={globalStyles.gameTitleLogin}>Maze Crawler</Text>
        <View style={globalStyles.containerCenter}>
          <Text style={globalStyles.titleText}>!! YOU DIED !!</Text>
          <Text
            style={globalStyles.button}
            onPress={() => {
              navigation.navigate("Levels");
            }}
          >
            back to levels
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
