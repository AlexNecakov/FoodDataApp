//import * as React from 'react';
import React, {FC, useState, useEffect, SetStateAction} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Tasks from '../components/Tasks'
import firebase from 'firebase';
import db from '../db/firestore';
import Breakfast from '../components/Breakfast';
import Lunch from '../components/Lunch';
import Dinner from '../components/Dinner';

export default function UserScreen() {
  const [items, setItems] = useState<any>()
//  const [items, setItems] = useState("");
let [userView, setUserView] = useState('');
let [reload, setReload] = useState(false);
let [Foodcalories, setFoodcalories] = useState('');
let [Foodname, setFoodname] = useState('');
let [Createdat, setCreatedat] = useState('');

type foodList = {
  id: string;
  barCodeNum: string;
  createdAt: string;
  foodCalories: string;
  foodName: string;
}

    useEffect(()=>{
      reload?
      db.collection('users').onSnapshot({
        next: querySnapshot => {
          const items = querySnapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          barCodeNum: docSnapshot.data().barCodeNum,
          createdAt: docSnapshot.data().createdAt,
          foodCalories: docSnapshot.data().foodCalories,
          foodName: docSnapshot.data().foodName
          }))
          setItems(items)
        },
        error:(error)=>console.log(error)
      })
      :console.log('No Change')
      
      setReload(false)

    })

    const loadList = () => {
      var len = Object.keys(items).length
      var text = "";
      //setReload(true)
      for(let i =0; i < len; i++){
        //setUserView(JSON.stringify(items[i].foodCalories)+' Calories'+'\n'
        //+JSON.stringify(items[i].foodName))
        text = JSON.stringify(items[i].foodCalories)+' Calories'+'\n'
        +JSON.stringify(items[i].foodName)+'\n\n'+text;
      }
      setUserView(text)
    }

    const loadAgain = ()=>{
      setReload(true)
      var len = Object.keys(items).length
      if(len>0){
        loadList()
      }
    }


  return (
//    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <View style={styles.container}>
    <View style = {styles.breakfast}>
      <Breakfast/>
    </View>
    <View style = {styles.lunch}>
      <Lunch/>
    </View>
    <View style = {styles.dinner}>
      <Dinner/>
    </View>
    <View style={styles.titlePos}>
      <Text style = {styles.title}>Scanned List</Text>
    </View>
    <TouchableOpacity style={styles.reloadPage} onPress={loadAgain}>
      <Text style={styles.reloadText}>Reload</Text>
    </TouchableOpacity>
    <View style = {styles.barList}> 

      
        <Text style={styles.foodCal}>{userView? userView :"No Item"}</Text>
      
      
         
    </View>
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
    top: 55,
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
  foodCal:{
    fontWeight: 'bold',
  },
  breakfast:{
    position: 'absolute',
    top: 15,
    left: 20,
  },
  lunch:{
    position: 'absolute',
    top: 15,
    left: 150,
  },
  dinner:{
    position: 'absolute',
    top: 15,
    left: 300,
  },
  barList:{
    position: 'absolute',
    top: 100,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});
