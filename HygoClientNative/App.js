import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import Store from './src/store/configureStore';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetails: TrackDetailsScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen 
  })
});

const AppContainer = createAppContainer(switchNavigator);

export default App = () => (
  <Provider store={Store}>
    <AppContainer />
  </Provider>  
) 