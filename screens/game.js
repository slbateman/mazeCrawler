import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { GLView } from "expo-gl";
import createRender from "../elements/render";
import mazeGenerator from "../elements/objects/maze";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLevelComplete,
  editCurrentLevel,
  selectUser,
} from "../state/userSlice";

export default function game({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const levelComplete = useSelector(selectLevelComplete);
  const level = navigation.getParam("level");
  // const [levelComplete, setLevelComplete] = useState(false)
  mazeGenerator(level);

  useEffect(() => {
    if (levelComplete && user.currentLevel === level) {
      dispatch(
        editCurrentLevel({
          _id: user._id,
          currentLevel: level + 1,
        })
      );
    }
    if (levelComplete) {
      navigation.goBack()
      navigation.navigate("Complete");
    }
  }, [levelComplete]);

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={createRender}>
        <View style={{ zIndex: 9999 }}>
          {levelComplete ? (
            <Text style={globalStyles.gameTitleLogin}>You Did It!!</Text>
          ) : (
            <Text style={globalStyles.gameTitleLogin}>Good Luck</Text>
          )}
        </View>
      </GLView>
    </View>
  );
}
