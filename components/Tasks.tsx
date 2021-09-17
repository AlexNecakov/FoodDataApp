import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import db from '../db/firestore'


const Tasks = () => {
/*
    const [tasks, setTasks] = useState<Object[]>()

    useEffect(() => {
        db.collection('tasks')
          .get()
          .then(result => result.docs)
          .then(docs => docs.map(doc=>({
            id: doc.id,
            name:doc.data().name,
            createdAt: doc.data().CreatedAt,
            completedAt: doc.data().completedAt
          })))
          .then(tasks => setTasks(tasks))
      }, [])
*/
    return(
    <View>

        <View style={style.taskItem}>
            <Text>Breakfast</Text>
            <CheckBox value={true}/>
        </View>
        <View style={style.taskItem}>
            <Text>Lunch</Text>
            <CheckBox value={false}/>
        </View>
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

export default Tasks;