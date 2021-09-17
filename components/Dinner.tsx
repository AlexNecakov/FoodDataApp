import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import db from '../db/firestore'


const Dinner = () => {

    return(
    <View>

        <View style={style.taskItem}>
            <Text>Dinner</Text>
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

export default Dinner;