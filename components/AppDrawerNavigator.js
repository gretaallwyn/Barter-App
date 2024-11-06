import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { DrawerItems , createDrawerNavigator } from 'react-navigation-drawer';

import CustomSideBarMenu from './CustomSideBarMenu'
import { AppTabNavigator } from './AppTabNavigator';
import  SettingScreen  from '../screens/SettingScreen';

import LoginScreen from '../screens/LoginScreen'
import MyBarters from '../screens/MyBarters'
import Notifications from '../screens/NotificationScreen'
import MyRecievedItems from '../screens/MyReceivedItems'

export const AppDrawerNavigator = createDrawerNavigator(
 {
   Home:{screen:AppTabNavigator},
   Settings:{screen:SettingScreen},
   MyBarters:{screen:MyBarters},
   Notifications:{screen:Notifications},
   MyRecievedItems:{screen:MyRecievedItems},

   
 },
 {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName : "Home"
    }
 )