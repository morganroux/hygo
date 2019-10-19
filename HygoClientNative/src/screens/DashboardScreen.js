import React from 'react';
import { Text, Button} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import ProgressBar from 'react-native-progress/Bar';

const DashboardScreen = ( {navigation}) =>  (
    
    <SafeAreaView forceInset = {{top: 'always'}}>
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
    </SafeAreaView>
);

const mapStateToProps = (state) => ({
    temp: state.temp,
    hygro: state.hygro
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);