import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLevelComplete,
  editCurrentLevel,
  selectUser,
} from "../state/userSlice";

export default function GameHUD({ navigation, level }) {
  const user = useSelector(selectUser);
  const playerNextLevel = user.playerLevel + 1;

  return !user ? (
    <></>
  ) : (
    <View style={globalStyles.gameHUD}>
      <Text style={globalStyles.gameHudLevel}>Maze: {level}</Text>
      <br />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <View style={globalStyles.playerLevelDisplay}>
            <Text style={globalStyles.playerLevelDisplayText}>
              {user.playerLevel}
            </Text>
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
          </View>
          <View style={globalStyles.playerHpDisplay}>
            <Text style={globalStyles.playerHpDisplayText}>HP</Text>
            <View style={globalStyles.playerHpDisplayBarOuter}>
              <View
                style={[
                  globalStyles.playerHpDisplayBarInner,
                  {
                    width:
                      (user.playerHp / (user.playerLevel * 10 + 100)) * 148,
                  },
                ]}
              />
            </View>
          </View>
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
          <Text style={globalStyles.weaponDisplayText}>Weapon: {user.equippedShield ? user.equippedShield.name: ""}</Text>
          {!user.equippedWeapon ? (
            <></>
          ) : (
            <View style={globalStyles.weaponDisplay}>
              <Text style={globalStyles.weaponDisplayText}> Charge</Text>
              <View style={globalStyles.weaponDisplayBarOuter}>
                <View
                  style={[
                    globalStyles.weaponDisplayBarInner,
                    {
                      width: user.equippedWeapon
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
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.gameHudLevel}>Player Inventory:</Text>
          {!user.playerInv ? (
            <></>
          ) : (
            user.playerInv.map((data, i) => (
              <Text style={globalStyles.gameHudLevel} key={`item${i}`}>
                {data.type}
              </Text>
            ))
          )}
        </View>
      </View>
    </View>
  );
}
