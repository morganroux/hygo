import React from 'react';
import { Text, Button} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { getValue } from '../api/hygoApi';
import Sensor from '../components/Sensor';

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            loop: true
        }
    }

    async loop() {
        const {value} = await getValue(this.props.token, 'temp')
        if (value) {
            this.setState({value});
        }
        if(this.state.loop) {
            setTimeout(() => this.loop(),3000);
        }
    }

    async componentDidMount() {
        this.loop();            
    }

    componentWillUnmount() { 
        this.setState({loop: false});
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
                    color="green"
                    value={this.state.value}
                />
                <Sensor 
                    name="Hygro"
                    color="blue"
                    value={this.state.value}
                />
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.token
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);