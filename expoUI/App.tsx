//miniProject UI. Access camera  
//author: Kevin Lim 
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import {Camera} from 'expo-camera'


export default function App() {

  
  const [startCamera, setStartCamera] = React.useState(false)


  const openCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
 if(status === 'granted'){
  setStartCamera(true)
 }else{
   alert("Access denied")
 }
}

const closeCamera = async () => {
  setStartCamera(false)
}

  return (

    startCamera?(<Camera style={styles.cameraView}>
        <View style={styles.cameraReturn}>
            <Button title = 'Return' color='#ffffff' onPress={closeCamera}/>
        </View>
        <TouchableOpacity style={styles.scanButton} /*onPress={}*/ />
      </Camera>
    ):(

    <View style={styles.container}>
      <Text>Welcome! Press Button to Scan</Text>
      <Text>  </Text>
      <View style={styles.buttonBox}>
        <Button title = 'Start Scanning' color='#ffffff' onPress = {openCamera}/>  
      </View>

      <StatusBar style = "auto" />
    </View>)

    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonBox: {
    marginTop: 20,
    backgroundColor: '#1a53ff',
  },
  cameraView: {
    flex: 1,
    width: "100%"
  },
  cameraReturn: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  scanButton: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 50,
    bottom: 40,
    left: Dimensions.get('window').width/2 - 40,
    backgroundColor: '#ffffff'

  }
})