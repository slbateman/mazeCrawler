import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import login from "../screens/login"
import levels from '../screens/levels';
import game from '../screens/game';

const screens = {
  Login: {
    screen: login,
  },
  Levels: {
    screen: levels,
  },
  Game: {
      screen: game
  }
};

// home stack navigator screens
const MainStack = createStackNavigator(screens);

export default createAppContainer(MainStack);