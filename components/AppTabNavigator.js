import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';

export const AppTabNavigator=createBottomTabNavigator({
    

    HomeScreen:
    {
        screen:HomeScreen,
        navigationOptions:
        {
            tabBarIcon:<Image source={require('../assets/home.png')}
            style={{width:20,height:20}}/>,
            tabBarLabel:"Home Screen"
        },
    },

    exchangeScreen:
    {
        screen:ExchangeScreen,
        navigationOptions:
        {
            tabBarIcon:<Image source={require('../assets/exchange.png')}
            style={{width:20,height:20}}/>,
            tabBarLabel:"Exchange Screen"
        },
    },
})