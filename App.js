import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
console.disableYellowBox=true;


export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator=createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  DrawerTab:{screen:AppDrawerNavigator},
})

const AppContainer=createAppContainer(switchNavigator);
