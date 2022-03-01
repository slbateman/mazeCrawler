import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { GLView } from "expo-gl";
import createRender from "../elements/render";
// import mazeGenerator from "../elements/objects/maze";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLevelComplete,
  editCurrentLevel,
  selectUser,
} from "../state/userSlice";
import GameHUD from "./gameHUD";

export default function game({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const levelComplete = useSelector(selectLevelComplete);
  const level = navigation.getParam("level");

  // mazeGenerator(level);

  useEffect(() => {
    if (levelComplete.complete && user.currentLevel === level) {
      dispatch(
        editCurrentLevel({
          _id: user._id,
          currentLevel: level + 1,
        })
      );
    }
    if (levelComplete.complete) {
      navigation.goBack();
      navigation.navigate("Complete");
    }
  }, [levelComplete]);

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={createRender}>
        <View style={{ zIndex: 9999 }}>
          <GameHUD level={level}></GameHUD>
        </View>
      </GLView>
    </View>
  );
}
