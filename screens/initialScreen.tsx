import * as React from 'react';
import { StyleSheet,ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
//import firebase from 'firebase';

export default function initialScreen() {
/*
    componentDidMount(){
        checkLoginStatus();
    }


    const checkLoginStatus = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                navigation.navigate('ScanScreen')
            } else {
                navigation.navigate('loginScreen')
            }
        });
    };
*/

  return (
    <View style={styles.container}>
        <ActivityIndicator size = "large" />
      <Text> initialScreen </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});