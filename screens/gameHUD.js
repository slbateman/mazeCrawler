import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";
import GameHUDxp from "./gameHUDxp";
import GameHUDhp from "./gameHUDhp";
import GameHUDshield from "./gameHUDshield";
import GameHUDweapon from "./gameHUDweapon";
import GameHUDinventoryWeapons from "./gameHUDinventoryWeapons";
import GameHUDinventoryShields from "./gameHUDinventoryShields";
import GameHUDinventoryHP from "./gameHUDinventoryHP";
import GameHUDinventoryCharge from "./gameHUDinventoryCharge";

export default function GameHUD({ level }) {
  const user = useSelector(selectUser);

  return !user ? (
    <></>
  ) : (
    <View style={globalStyles.gameHUD}>
      <Text style={globalStyles.gameHudLevel}>Level: {level}</Text>
      <br />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <GameHUDxp />
          <GameHUDhp />
          <GameHUDshield />
          <GameHUDweapon />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.gameHUDinventoryHeader}>{user.playerInv.length > 0 ? "Inventory" : ""}</Text>
          <GameHUDinventoryShields />
          <GameHUDinventoryWeapons />
          <GameHUDinventoryHP />
          <GameHUDinventoryCharge />
        </View>
      </View>
    </View>
  );
}
