import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDinventoryCharge() {
  const user = useSelector(selectUser);
  const chargersExist = user.playerInv.find((e) => e.type === "charge");

  return !chargersExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory}>Shields</Text>
      <View>
        {user.playerInv.map((data, i) => {
          if (data.type === "charge") {
            return (
              <Text
                key={`chargeItem${i}`}
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
