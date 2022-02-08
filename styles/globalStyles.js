import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 7,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    backgroundColor: "#222",
    flex: 1,
    padding: 20,
  },
  containerCenter: {
    backgroundColor: "#222",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    color: "#eee",
    fontSize: 16,
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 7,
    padding: 5,
  },
  levelSelector: {
    color: "#eee",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "grey",
    fontSize: 16,
    height: 30,
    minWidth: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    margin: 7,
    padding: 5,
  }
});
