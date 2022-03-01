import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDinventoryHP() {
  const user = useSelector(selectUser);
  const hpExist = user.playerInv.find((e) => e.type === "hpBooster");

  return !hpExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory}>Shields</Text>
      <View>
        {user.playerInv.map((data, i) => {
          if (data.type === "hpBooster") {
            return (
              <Text
                key={`hpItem${i}`}
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
