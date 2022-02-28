import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDhp() {
  const user = useSelector(selectUser);

  return !user ? (
    <></>
  ) : (
    <View style={globalStyles.playerHpDisplay}>
      <Text style={globalStyles.playerHpDisplayText}>HP</Text>
      <View style={globalStyles.playerHpDisplayBarOuter}>
        <View
          style={[
            globalStyles.playerHpDisplayBarInner,
            {
              width: (user.playerHp / (user.playerLevel * 10 + 100)) * 148,
            },
          ]}
        />
      </View>
    </View>
  );
}
