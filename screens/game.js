import React, {useState} from "react";
import { View, Text } from "react-native";
import { GLView } from "expo-gl";
import createRender from "../elements/render";
import mazeGenerator from "../elements/objects/maze";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectLevelComplete } from "../state/userSlice";

export default function game({ navigation }) {
  const dispatch = useDispatch()

  const levelComplete = useSelector(selectLevelComplete)
  const level = navigation.getParam("level");
  const [levelComplete, setLevelComplete] = useState(false)
  mazeGenerator(level);


  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={createRender}>
        <View style={{zIndex: 9999}} >
          <Text style={globalStyles.gameTitleLogin}>Good Luck</Text>
        </View>
      </GLView>
    </View>
  );
}
