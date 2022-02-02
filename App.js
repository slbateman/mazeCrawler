import * as React from "react";
import * as THREE from "three";
import { View } from "react-native";
import { GLView } from "expo-gl";
import createRender from "./elements/render";
import mazeGenerator from "./elements/objects/maze";

export default function App() {
  mazeGenerator(1);

  return (
    <View style={{ flex: 1 }}>
        <GLView style={{ flex: 1 }} onContextCreate={createRender} />
    </View>
  );
}
