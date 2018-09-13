import React from 'react';

import FlipCameraIcon from './icons/FlipCameraIcon'
import ScanButton from './ScanButton'

import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

class ScanScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      autofocus: Camera.Constants.AutoFocus.on,
      uri:'nil',
      pictureTaken: false
    };
    this.takePicture = this.takePicture.bind(this)

  }
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async takePicture() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({base64: true});
      this.setState({pictureTaken: true});
      this.props.uploadScan(photo);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>To scan text, you need to authorize Bookworm to use your device's camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} autofocus={ this.state.autofocus } ref={ref => { this.camera = ref; }}>
            <ScanButton
              onPress={this.takePicture} 
            />
          </Camera>
        </View>
      );
    }
  }
}

export default ScanScreen