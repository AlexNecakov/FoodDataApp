import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import db from '../db/firestore'


const Lunch = () => {

return(
    <View>

        <View style={style.taskItem}>
            <Text>Lunch</Text>
            <CheckBox value={false}/>
        </View>
        
    </View>
    )
}

const style = StyleSheet.create({
    taskItem:{
        flexDirection: 'row',
    }
})

export default Lunch;