import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DrawerItems , createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/HomeScreen'

import LoginScreen from '../screens/LoginScreen'

export const stackNavigator = createStackNavigator({
  Donations:{
      screen:HomeScreen,
      navigationOptions:{
        headerShown:false
      }
  }

})