import React from 'react';
import { View } from 'react-native';
import { Text, Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { getValue } from '../api/hygoApi';
import { connect } from 'react-redux';

class Sensor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value:0.1
        }
    }
    componentDidMount() {
        // this.timer = setInterval( async () => {
        //     const {value} = await getValue(this.props.token, this.props.valueType)
        //     console.log(this.state.value)
        //     this.setState({value});
        // }, 5000)
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }

    render() {
        return (
            <View>
                <Text h5>{this.props.name + ' - ' +this.state.value}</Text>
                <ProgressBar
                progress={this.state.value}
                color={this.props.color || 'blue'}
                size={this.props.size || 50}
                />
                <Button 
                    title="test"
                    onPress= { async () => {
                        const {value} = await getValue(this.props.token, this.props.valueType)
                        console.log({value})
                        this.setState({value});
                        console.log(this.state.value)
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({token}) => ({
    token
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Sensor);