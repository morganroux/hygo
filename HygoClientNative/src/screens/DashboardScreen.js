import React from 'react';
import { Text, Button} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Sensor from '../components/Sensor';
import ProgressBar from 'react-native-progress/Bar';

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0.13
        }
        setInterval(() => {
            const value = this.state.value + 0.1;
            this.setState({value: value > 1 ? value - 1 : value});
        }, 1000)
    }
    render() {
        return (
            <SafeAreaView forceInset = {{top: 'always'}}>
                <Text h1>Dashboard</Text>
                <Text h3 style={{backgroundColor: '#EBF6EC'}}>Bonnes conditions</Text>
                <Sensor 
                    name="Température"
                    value={this.state.value}
                    color="green"
                />
                <Sensor 
                    name="Hygrométrie"
                    value={this.state.value}
                    color="blue"
                />
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => ({
    temp: state.temp,
    hygro: state.hygro
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);