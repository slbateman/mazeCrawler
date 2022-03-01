import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateEquippedWeapon } from "../state/userSlice";

export default function GameHUDinventoryWeapons() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const weaponsExist = user.playerInv.find(
    (e) => e.type === "beamWeapon" || e.type === "diskWeapon"
  );
  const [show, setShow] = useState(false);

  const equipHandler = (data) => {
    dispatch(
      updateEquippedWeapon({
        equippedWeapon: {
          uuid: data.uuid,
          name: data.name,
          type: data.type,
          color: data.color,
          size: data.size,
          damage: data.damage,
          charge: data.charge,
          maxCharge: data.maxCharge,
          distance: data.distance,
        },
      })
    );
  };

  const viewHandler = () => {
    show ? setShow(false) : setShow(true);
  };

  return !weaponsExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory} onPress={viewHandler}>
        Shields
      </Text>
      {show ? (
        <View>
          {user.playerInv.map((data, i) => {
            if (data.type === "beamWeapon" || data.type === "diskWeapon") {
              return (
                <Text
                  key={`weaponItem${i}`}
                  style={globalStyles.gameHUDinventoryItemName}
                  onPress={() => equipHandler(data)}
                >
                  {data.uuid === user.equippedWeapon.uuid ? `-equipped- ` : ""}
                  {data.name}- {data.charge}/{data.chargeMax}
                </Text>
              );
            }
          })}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
