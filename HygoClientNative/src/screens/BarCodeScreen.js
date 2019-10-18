import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import {updateToken} from '../store/actions/authActions';
import {signInWithBarCode, validateToken} from '../api/hygoApi';


class BarCodeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();

    // console.log('before');
    // const storedToken = await AsyncStorage.getItem('token');
    
    // const {errorMessage, userName} = await validateToken(storedToken);
    // if(!errorMessage) {
    //   this.props.updateToken(storedToken);
    //   await alert(`Hello ${userName}`);
    //   this.props.navigation.navigate('mainFlow');
    // }
    // console.log('after');
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }
  
  handleBarCodeScanned = async ({ type, data }) => {
    console.log('here')
    const {token, errorMessage, userName} = await signInWithBarCode(data);
  //  this.setState( () => ({errorMessage}));
    if(errorMessage || !token) {
      alert('erreur');
      console.log(data);
    }
    else {
      
      // await alert(`Bar code with type ${type} and data ${data} has been scanned! - Hello ${userName}`);
      alert(`Hello ${userName}`);
      this.props.updateToken(token);
      //await AsyncStorage.setItem('token', token);
      this.props.navigation.navigate('mainFlow');
    }
    this.setState({ scanned: true });
  };

}

BarCodeScreen.navigationOptions = () => {
  return {
      header: null
  }
}

const mapStateToProps = ({token}) => ({
  token
});
const mapDispatchToProps = (dispatch, props) => ({
  updateToken: (token) => dispatch(updateToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeScreen);