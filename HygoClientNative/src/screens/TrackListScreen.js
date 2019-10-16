import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TrackListScreen = ( {navigation}) =>  (
    <React.Fragment>
        <Text style = {{fontSize: 48}}>TrackListScreen</Text>
        <Button
            title='Go to details'
            onPress={ () => navigation.navigate('TrackDetails')}
        />
    </React.Fragment>
);

export default TrackListScreen;