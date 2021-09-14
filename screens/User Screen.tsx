import * as React from 'react';
import { StyleSheet, Button} from 'react-native';

import { Text, View } from '../components/Themed';
import firebase from 'firebase';

export default function UserScreen() {

  const storeHighScore = (userId, score) => {
    //const userId: "123456@gmail.com"
    //const score: 100
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        highscore: score,
      });

      //return null

  }

  const submitData = () => {
    storeHighScore("123456@gmail", 100)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button title="submit to cloud" onPress ={submitData} />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
