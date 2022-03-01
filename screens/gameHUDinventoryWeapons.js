import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDinventoryWeapons() {
  const user = useSelector(selectUser);
  const weaponsExist = user.playerInv.find((e) => e.type === "beamWeapon" || e.type === "diskWeapon");

  return !weaponsExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory}>Shields</Text>
      <View>
        {user.playerInv.map((data, i) => {
          if (data.type === "beamWeapon" || data.type === "diskWeapon") {
            return (
              <Text
                key={`weaponItem${i}`}
                style={globalStyles.gameHUDinventoryItemName}
              >
                {data.name}- {data.shieldPoints}/{data.shieldMaxPoints}
              </Text>
            );
          }
        })}
      </View>
    </View>
  );
}
