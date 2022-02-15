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

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.containerCenter}>
        <Text style={globalStyles.gameTitleLogin}>You Did It!!</Text>
      </View>
    </View>
  );
}
