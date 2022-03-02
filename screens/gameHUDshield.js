import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import {
  selectUser,
} from "../state/userSlice";

export default function GameHUDshield() {
  const user = useSelector(selectUser);

  return !user ? (
    <></>
  ) : (
    <>
      {!user.equippedShield.uuid ? (
        <></>
      ) : (
        <View style={globalStyles.shieldDisplay}>
          <Text style={globalStyles.shieldDisplayText}>Shield</Text>
          <View style={globalStyles.shieldDisplayBarOuter}>
            <View
              style={[
                globalStyles.shieldDisplayBarInner,
                {
                  width: user.equippedShield
                    ? (user.equippedShield.shieldPoints /
                        user.equippedShield.shieldMaxPoints) *
                      148
                    : 0,
                  backgroundColor: user.equippedShield
                    ? user.equippedShield.color
                    : "#333",
                },
              ]}
            />
          </View>
        </View>
      )}
    </>
  );
}
