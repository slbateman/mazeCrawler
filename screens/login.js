import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function levels({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = (navLoc) => {
    navigation.navigate(navLoc);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.containerCenter}>
        <TextInput
          style={globalStyles.textInput}
          type="email"
          textContentType="email"
          onChangeText={setEmail}
          value={email}
          placeholder="enter email address"
          keyboardType="email-address"
        />
        <TextInput
          style={globalStyles.textInput}
          type="password"
          textContentType="password"
          onChangeText={setPassword}
          value={password}
          placeholder="enter password"
          keyboardType="default"
        />
        <Button
          title="login"
          color="grey"
          onPress={() => pressHandler("Levels")}
        />
      </View>
    </View>
  );
}
