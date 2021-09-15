//import * as React from 'react';
import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Tasks from '../components/Tasks'
import firebase from 'firebase';
import db from '../db/firestore';

export default function UserScreen() {
//  const [items, setItems] = useState<Object[]>()
  const [items, setItems] = useState('')

  useEffect(() => {
      db.collection('users')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map(doc=>({
          id: doc.id,
          barCodeNum: doc.data().barCodeNum,
          createdAt:doc.data().createdAt,
          foodCalories: doc.data().foodCalories,
          foodName: doc.data().foodName
        })))
        .then(items => setItems(items))
    }, [])
  

  const reloadData = () => {
      db.collection('users')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map(doc=>({
          id: doc.id,
          barCodeNum: doc.data().barCodeNum,
          createdAt:doc.data().createdAt,
          foodCalories: doc.data().foodCalories,
          foodName: doc.data().foodName
        })))
        .then(items => setItems(items))
    }

  return (
//    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <View style={styles.container}>
      <TouchableOpacity style={styles.reloadPage} onPress={reloadData}>
                <Text style={styles.reloadText}>Reload</Text>
      </TouchableOpacity>
    <View style={styles.titlePos}>
      <Text style = {styles.title}>Scanned List</Text>
    </View>


      <Text>{items.foodName}</Text>
      <Text></Text>


    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodList: {
    flexDirection: 'row',
  },
  reloadPage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
},
  reloadText: {
    fontWeight: 'bold',
    color: 'red'
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titlePos: {
    position: 'absolute',
    top: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});
