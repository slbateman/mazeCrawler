import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updatePlayerHP, updatePlayerInv } from "../state/userSlice";

export default function GameHUDinventoryHP() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const hpExist = user.playerInv.find((e) => e.type === "hpBooster");
  const [show, setShow] = useState(false);

  const useHandler = (data) => {
    let inventory = [...user.playerInv];
    let index = inventory.findIndex((e) => e.uuid === data.uuid);
    inventory.splice(index, 1);
    dispatch(
      updatePlayerInv({
        playerInv: inventory,
      })
    );
    dispatch(
      updatePlayerHP(data.hpBoost)
    )
  };

  const viewHandler = () => {
    show ? setShow(false) : setShow(true);
  };

  return !hpExist ? (
    <></>
  ) : (
    <View>
      <Text style={globalStyles.gameHUDinventory} onPress={viewHandler}>
        HP Boosters
      </Text>
      {show ? (
        <View>
        {user.playerInv.map((data, i) => {
          if (data.type === "hpBooster") {
            return (
              <Text
                key={`hpItem${i}`}
                style={globalStyles.gameHUDinventoryItemName}
                onPress={() => useHandler(data)}
              >
                {data.name}- {data.hpBoost} HP
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
