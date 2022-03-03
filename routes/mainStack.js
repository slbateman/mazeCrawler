import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import login from "../screens/login";
import signUp from "../screens/signUp";
import levels from "../screens/levels";
import game from "../screens/game";
import complete from "../screens/complete";
import youDied from "../screens/youDied";

const screens = {
  Login: {
    screen: login,
  },
  SignUp: {
    screen: signUp,
  },
  Levels: {
    screen: levels,
  },
  Game: {
    screen: game,
  },
  Complete: {
    screen: complete,
  },
  YouDied: {
    screen: youDied
  }
};

// home stack navigator screens
const MainStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#C4C4C4",
    headerStyle: {
      backgroundColor: "#333",
      height: 40,
    },
  },
});

export default createAppContainer(MainStack);
