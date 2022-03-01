import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDinventoryShields() {
  const user = useSelector(selectUser);
  const shieldsExist = user.playerInv.find((e) => e.type === "shield")

  return !shieldsExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory}>Shields</Text>
      <View>
        {user.playerInv.map((data, i) => {
          if (data.type === "shield") {
            return (
              <Text
                key={`shieldItem${i}`}
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
