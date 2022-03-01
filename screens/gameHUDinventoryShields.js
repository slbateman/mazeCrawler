import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateEquippedShield } from "../state/userSlice";
import { userShieldGenerator } from "../elements/objects/userShield";

export default function GameHUDinventoryShields() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const shieldsExist = user.playerInv.find((e) => e.type === "shield");
  const [show, setShow] = useState(false);

  const equipHandler = (data, i) => {
    dispatch(
      updateEquippedShield({
        equippedShield: {
          uuid: data.uuid,
          name: data.name,
          type: data.type,
          color: data.color,
          size: data.size,
          shieldPoints: data.shieldPoints,
          shieldMaxPoints: data.shieldMaxPoints,
        },
      })
    );
    userShieldGenerator(data)
  };

  const viewHandler = () => {
    show ? setShow(false) : setShow(true);
  };

  return !shieldsExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory} onPress={viewHandler}>
        Shields
      </Text>
      {show ? (
        <View>
          {user.playerInv.map((data, i) => {
            if (data.type === "shield") {
              return (
                <Text
                  key={`shieldItem${i}`}
                  style={globalStyles.gameHUDinventoryItemName}
                  onPress={() => equipHandler(data, i)}
                >
                  {data.uuid === user.equippedShield.uuid ? `-equipped- ` : ""}
                  {data.name}- {data.shieldPoints}/{data.shieldMaxPoints}
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
