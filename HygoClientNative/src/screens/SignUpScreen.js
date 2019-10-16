import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import {toggleToken, updateToken} from '../store/actions/authActions';
import {signUp} from '../api/hygoApi';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    };
    onEmailChange = (email) => {
        this.setState ( () => ({email}));
    };
    onPasswordChange = (password) => {
        this.setState ( () => ({password}));
    };
    onSignUp = async () => {
        const {token, errorMessage} = await signUp(this.state.email, this.state.password);
        this.setState( () => ({errorMessage}));
        if(token)
        {
            this.props.updateToken(token);
            this.props.navigation.navigate('mainFlow');
        }
    }
    render() {
        return (
        <View style={styles.container}>
            <Text h3>Sign up for Tracker</Text>
            <Text>{this.state.errorMessage}</Text>
            <Input 
                label="Email"  
                value={this.state.email}
                onChangeText={this.onEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input 
                secureTextEntry={true}
                label="Password"
                value={this.state.password}
                onChangeText={this.onPasswordChange} 
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button 
                title="Sign up"
                onPress={this.onSignUp} />
        </View>
        )
    }
};

SignUpScreen.navigationOptions = () => {
    return {
        header: null
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

const mapStateToProps = ({token}) => ({
    token
});
const mapDispatchToProps = (dispatch, props) => ({
    toggleToken: () => dispatch(toggleToken()),
    updateToken: (token) => dispatch(updateToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);