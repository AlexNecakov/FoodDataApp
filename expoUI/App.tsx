//miniProject UI. Access camera first try
//written by Kevin Lim 
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {Camera} from 'expo-camera'


export default function App() {

  
  const [startCamera, setStartCamera] = React.useState(false)


  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
 if(status === 'granted'){
  setStartCamera(true)
 }else{
   alert("Access denied")
 }
}

  return (

    startCamera?(<Camera
      style={styles.cameraView}
      ></Camera>
    ):(<View style={styles.container}>
      <Text>Welcome! Press Button to Scan</Text>

      <Text>  </Text>
      <Text>  </Text>
      <Text>  </Text>

      <View style={styles.buttonBox}>
        <Button title = 'Start Scanning' onPress = {__startCamera}/>  
      </View>

      <StatusBar style = "auto" />
    </View>)
    

    
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonBox: {
    marginTop: 20
  },
   cameraView: {
     flex: 1,
     width: "100%"
   }

})