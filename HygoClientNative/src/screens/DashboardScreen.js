import React from 'react';
import { Text, Button} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { getLastValue } from '../api/hygoApi';
import Sensor from '../components/Sensor';
import getLimitedArray from '../utils/limitedArray';

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastValue: 0,
            loop: true
        }
    }
    loop = async () => {
        try {
            const {value} = await getLastValue(this.props.token, 'temp')
            if (value) {
                this.setState({
                    ...this.state,
                    lastValue: value
                });
            }
            if(this.state.loop) {
                setTimeout(() => this.loop(),3000);
            }
        } catch(err)
        {
            return;
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
                <Text h3 style={{backgroundColor: this.state.lastValue > 0.5 ? '#EBF6EC' : '#FF99A6'}}>
                    {this.state.lastValue > 0.5 ? 'Bonnes' : 'Mauvaises'} conditions
                </Text>
                <Sensor 
                    name="Température"
                    color="green"
                    value={this.state.lastValue}
                />
                <Sensor 
                    name="Hygro"
                    color="blue"
                    value={this.state.lastValue}
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