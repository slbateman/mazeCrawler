import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";

export default function GameHUDweapon() {
  const user = useSelector(selectUser);

  return !user ? (
    <></>
  ) : (
    <>
      {!user.equippedWeapon.name ? (
        <></>
      ) : (
        <View>
          <Text style={globalStyles.weaponDisplayText}>
            Weapon: {user.equippedWeapon.name ? user.equippedWeapon.name : ""}
          </Text>
          <View style={globalStyles.weaponDisplay}>
            <Text style={globalStyles.weaponDisplayText}> Charge</Text>
            <View style={globalStyles.weaponDisplayBarOuter}>
              <View
                style={[
                  globalStyles.weaponDisplayBarInner,
                  {
                    width: user.equippedWeapon.charge
                      ? (user.equippedWeapon.chargePoints /
                          user.equippedWeapon.chargeMaxPoints) *
                        148
                      : 0,
                    backgroundColor: "#3792CB",
                  },
                ]}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
