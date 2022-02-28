import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDxp() {
  const user = useSelector(selectUser);
  const playerNextLevel = user.playerLevel + 1;

  return !user ? (
    <></>
  ) : (
    <View style={globalStyles.playerLevelDisplay}>
      <Text style={globalStyles.playerLevelDisplayText}>XP</Text>
      <View style={globalStyles.playerLevelDisplayBarOuter}>
        <View
          style={[
            globalStyles.playerLevelDisplayBarInner,
            {
              width:
                (user.playerLevelXp /
                  (playerNextLevel * 100 + user.playerLevel * 50)) *
                148,
            },
          ]}
        />
      </View>
      <Text style={globalStyles.playerLevelDisplayText}>
        {user.playerLevel}
      </Text>
    </View>
  );
}
