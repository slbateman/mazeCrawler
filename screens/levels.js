import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function levels({ navigation }) {
  const [currentLevel, setCurrentLevel] = useState(5);
  const levels = [];

  const pressHandler = (navLoc, num) => {
    navigation.navigate(navLoc, { level: num });
  };

  for (let i = 0; i <= currentLevel + 1; i++) {
    levels.push(i);
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.containerCenter}>
        <Text style={globalStyles.titleText}>Levels</Text>
        <View style={{ flexDirection: "row" }}>
          {levels.map((data, i) => (
            <Text
              style={globalStyles.levelSelector}
              onPress={() => pressHandler("Game", data)}
              key={`level${i}`}
            >
              {data > currentLevel ? "" : data}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
