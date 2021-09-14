import * as React from 'react';
import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Goo from 'expo-google-sign-in';

//import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

//const auth = getAuth();

export default function loginScreen() {
/*
    const isUserEqual = (googleUser, firebaseUser)=> {
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
          for (let i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    const onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            const credential = GoogleAuthProvider.credential(
                //googleUser.getAuthResponse().id_token
                googleUser.idToken,
                googleUser.accessToken
                );
      
            // Sign in with credential from the Google user.
            signInWithCredential(auth, credential).then(function(){console.log('user signed in')}).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The credential that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }*/

    const signInWithGoogleAsync = async() =>  {
        try {
          const result = await Google.logInAsync({
              //behavior: 'web',
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '1078577854428-jlmgsh9lf219cvj9egh1rh0pkc6os66a.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              //onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    
  return (
    <View style={styles.container}>
      <Text> Login with Gmail </Text>
      <Text></Text>
      <Button title="login with Google" onPress={()=>signInWithGoogleAsync()} />
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