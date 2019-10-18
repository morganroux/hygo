import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { connect } from 'react-redux';

const DashboardScreen = ( {navigation}) =>  (
    <React.Fragment>
        <Text style = {{fontSize: 48}}>Dashboard</Text>
    </React.Fragment>
);

const mapStateToProps = ({token}) => ({
    token
  });
  const mapDispatchToProps = (dispatch, props) => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);