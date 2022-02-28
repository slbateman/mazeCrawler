import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";
import GameHUDxp from "./gameHUDxp";
import GameHUDhp from "./gameHUDhp";
import GameHUDshield from "./gameHUDshield";
import GameHUDweapon from "./gameHUDweapon";

export default function GameHUD({ level }) {
  const user = useSelector(selectUser);

  return !user ? (
    <></>
  ) : (
    <View style={globalStyles.gameHUD}>
      <Text style={globalStyles.gameHudLevel}>Maze: {level}</Text>
      <br />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <GameHUDxp />
          <GameHUDhp />
          <GameHUDshield />
          <GameHUDweapon />
        </View>
        {/* <View style={{ flex: 1 }}>
          <Text style={globalStyles.gameHudLevel}>Player Inventory:</Text>
          {!user.playerInv ? (
            <></>
          ) : (
            user.playerInv.map((data, i) => (
              <Text style={globalStyles.gameHudLevel} key={`item${i}`}>
                {data.name}
              </Text>
            ))
          )}
        </View> */}
      </View>
    </View>
  );
}
