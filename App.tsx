//miniProject main entry point
//author: Alex Necakov, Kevin Lim
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from './screens/ScanScreen';
import UserScreen from './screens/UserScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ModalScreen from './screens/ModalScreen';
import * as firebase from 'firebase';
//import 'firebase/firestore'

//api key needs to be moved to secrets at some point...
const firebaseConfig = {
    apiKey: "AIzaSyAJnt5z9yx3YBgrzBYti5BSMj2U2bDVHRI",
    authDomain: "firetest-8ef93.firebaseapp.com",
    projectId: "firetest-8ef93",
    storageBucket: "firetest-8ef93.appspot.com",
    messagingSenderId: "160298483133",
    appId: "1:160298483133:web:dc6afe76d50a6d5641a6d4",
    measurementId: "G-E912FNJMRH"
};

/*if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig)
}*/

//initialize navigators
const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="ScanTab" component={ScanScreen} />
            <BottomTab.Screen name="RecipeTab" component={UserScreen} />
        </BottomTab.Navigator>
    )
}

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}