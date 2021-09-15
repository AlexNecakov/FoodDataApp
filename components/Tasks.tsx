import React, {FC, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import db from '../db/firestore'


const Tasks = () => {

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

    return(
    <View>
        {
            tasks?.map( task => <View key = {task.id} style={style.taskItem}>
                <Text>{task.name}</Text>
                <CheckBox value = {!!task.completedAt} />
            </View>)
        }
        <View style={style.taskItem}>
            <Text>Apple</Text>
            <CheckBox value={true}/>
        </View>
        <View style={style.taskItem}>
            <Text>Orange</Text>
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