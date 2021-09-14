//miniProject main entry point
//author: Alex Necakov, Kevin Lim
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import ScanScreen from './screens/ScanScreen';
import UserScreen from './screens/User Screen';
import firebase from 'firebase'
import { firebaseConfig } from './config';
//import 'firebase/firestore'

/*const firebaseConfig = {
    apiKey: "AIzaSyAJnt5z9yx3YBgrzBYti5BSMj2U2bDVHRI",
    authDomain: "firetest-8ef93.firebaseapp.com",
    projectId: "firetest-8ef93",
    storageBucket: "firetest-8ef93.appspot.com",
    messagingSenderId: "160298483133",
    appId: "1:160298483133:web:dc6afe76d50a6d5641a6d4",
    measurementId: "G-E912FNJMRH"
  };*/

/*if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig)
}*/

firebase.initializeApp(firebaseConfig)

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}