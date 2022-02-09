import React, { useRef, useState } from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import backgroundImage from "../assets/backgroundImage.png";
import checkIcon from "../assets/checkIcon.png";
import lockIcon from "../assets/lockIcon.png";

export default function levels({ navigation }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const levels = [];

  const scrollRef = useRef();

  const pressHandler = (num) => {
    navigation.navigate("Game", { level: num });
  };

  for (let i = 0; i <= currentLevel + 1; i++) {
    levels.push(i);
  }

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={globalStyles.containerCenter}
      >
        <Text style={globalStyles.gameTitleLevels}>Maze Crawler</Text>
        <View style={globalStyles.containerCenter}>
          <Text style={globalStyles.titleText}>Levels</Text>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={globalStyles.levelScroll1}
            style={globalStyles.levelScroll}
            horizontal
            centerContent={true}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => {
              scrollRef.current?.scrollTo({ x: 10000, animated: false });
            }}
          >
            {levels.map((data, i) => (
              <View style={{ alignItems: "center" }} key={`block${i}`}>
                <Text
                  style={globalStyles.levelSelector}
                  onPress={
                    i <= currentLevel ? () => pressHandler(data) : () => {}
                  }
                  key={`level${i}`}
                >
                  {data}
                </Text>
                {i < currentLevel ? (
                  <Image
                    style={globalStyles.levelImage}
                    source={checkIcon}
                    key={`icon${i}`}
                  />
                ) : i > currentLevel ? (
                  <Image
                    style={globalStyles.levelImage}
                    source={lockIcon}
                    key={`icon${i}`}
                  />
                ) : (
                  <></>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}