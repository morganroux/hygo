import React from 'react';
import { Text, Button} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Sensor from '../components/Sensor';

export default class DashboardScreen extends React.Component {
    state = {
        value: 0.3
    }
    constructor(props) {
        super(props)
        // setInterval(() => {
        //     const value = this.state.value + 0.1;
        //     this.setState({value: value > 1 ? value - 1 : value});
        // }, 1000)
    }
    render() {
        return (
            <SafeAreaView forceInset = {{top: 'always'}}>
                <Text h1>Dashboard</Text>
                <Text h3 style={{backgroundColor: this.state.value > 0.5 ? '#EBF6EC' : '#FF99A6'}}>
                    {this.state.value > 0.5 ? 'Bonnes' : 'Mauvaises'} conditions
                </Text>
                <Sensor 
                    name="Température"
                    valueType="temp"
                    color="green"
                />
            </SafeAreaView>
        );
    }
}
// const mapStateToProps = (state) => ({
//     temp: state.temp,
//     hygro: state.hygro
// });
// const mapDispatchToProps = (dispatch, props) => ({
// })
  
// export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);