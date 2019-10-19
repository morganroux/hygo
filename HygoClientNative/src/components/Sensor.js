import React from 'react';
import { View } from 'react-native';
import { Text, Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h5>{this.props.name}</Text>
                <ProgressBar
                progress={this.props.value}
                color={this.props.color || 'blue'}
                size={this.props.size || 50}
                />
            </View>
        );
    }
}