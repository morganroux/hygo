import React from 'react';
import {View } from 'react-native';
import { Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import ProgressBar from 'react-native-progress/Bar';

const DashboardScreen = ( {navigation}) =>  (
    
    <View>
    <Text h1>Dashboard</Text>
    <Text h3 style={{backgroundColor: '#EBF6EC'}}>Bonnes conditions</Text>
    <Text h5>Température</Text>
    <ProgressBar
        progress={0.3}
        color={'green'}
        size={50}
    />
    <Text h5>Hygrométrie</Text>
    <ProgressBar
        progress={0.7}
        color={'blue'}
        size={50}
    />
    </View>
);

const mapStateToProps = ({token, userName}) => ({
    token,
    userName
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);