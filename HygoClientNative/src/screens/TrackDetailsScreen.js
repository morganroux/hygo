import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const trackDetailsScreen = () =>  (
    <Text style = {{fontSize: 48}}>trackDetailsScreen</Text>
);

export default trackDetailsScreen;