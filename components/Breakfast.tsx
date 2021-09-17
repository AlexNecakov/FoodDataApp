import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import db from '../db/firestore'


const Breakfast = () => {

    return(
    <View>

        <View style={style.taskItem}>
            <Text>Breakfast</Text>
            <CheckBox value={true}/>
        </View>
    </View>
    )
}

const style = StyleSheet.create({
    taskItem:{
        flexDirection: 'row',
    }
})

export default Breakfast;