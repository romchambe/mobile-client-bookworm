import React from 'react';

import MainButton from './MainButton'
import * as base from './../../assets/styles/base';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class ScanPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      autofocus: Camera.Constants.AutoFocus.on,
      uri:'nil',
      pictureTaken: false
    };

    this.askCameraPermission = this.askCameraPermission.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.referenceCamera = this.referenceCamera.bind(this)
  }
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async askCameraPermission(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async takePicture() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({base64: true});
      this.setState({pictureTaken: true});
      this.props.nextStep();
    }
  }

  referenceCamera(camera){
    this.camera = camera
  }

  render() {
    const { hasCameraPermission } = this.state;

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        justifyContent: 'flex-start',    
        paddingHorizontal: base.padding.md
      },
      camera: {
        flex: 1, 
        marginHorizontal: - base.padding.md
      },
      bottomActions:{
        position: 'absolute',
        bottom:0,
        left: 0,
        right:0,
        height:72,
        backgroundColor: 'rgba(30,30,36, 0.6)',
        paddingTop: base.padding.sm,
        justifyContent:'flex-start',
        alignItems:'center'
      },
      actionsText:{
        marginTop: 4,
        fontFamily: 'cabin',
        color: 'white',
        fontSize: base.fonts.sm
      }
    })
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>To scan text, you need to authorize Bookworm to use your device's camera</Text>
          <MainButton height={40} onPress={this.askCameraPermission} legend='Autoriser Bookworm' />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Camera style={styles.camera} type={this.state.type} autofocus={ this.state.autofocus } ref={this.referenceCamera} />
          <View style={styles.bottomActions}>

            <MainButton height={32} onPress={this.takePicture} legend='Prendre un scan' />
            <Text style={styles.actionsText}>Scannez large, vous pourrez recadrer ensuite! </Text>
          </View>
        </View>
      );
    }
  }
}
