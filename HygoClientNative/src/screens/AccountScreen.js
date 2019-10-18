import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';

const AccountScreen = () =>  (
    <Text style = {{fontSize: 48}}>Account Screen</Text>
);

const mapStateToProps = ({token}) => ({
    token
  });
  const mapDispatchToProps = (dispatch, props) => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);