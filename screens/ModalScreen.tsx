import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import db from '../db/firestore'


export default function ModalScreen({ route, navigation }: RootStackScreenProps<'Modal'>) {
    const barCode: string = route.params.upcCode;
    let [totalHits, setTotalHits] = useState(0);
    let [foodDescription, setDescription] = useState('');

    const getFoodProfilefromFDA = async (barCode: string) => {
        var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + barCode + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
        //nutella test case
        //var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + '009800800254' + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
        fetch(url, {
            "method": "GET"
        })
            .then(response => response.json())
            .then(response => {
                setTotalHits(response.totalHits);
                if (totalHits > 0) {
                    setDescription(response.foods[0].description);
                }
                else {
                    setDescription('Food not found in database');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getFoodProfilefromFDA(barCode);
        
    });

    const uploadData = () => {
        db.collection('users').add({
            foodName: foodDescription,
            barCodeNum: barCode,
            foodCalories: null,
            createdAt: new Date()
        }).catch(err => console.log(err))
    }


    return (

        
        <View style={styles.container}>
            <Text style={styles.title}> {foodDescription}</Text>
            <Text style={styles.title}> {barCode}</Text>
            <Text style={styles.title}> {totalHits}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Button title="upload" onPress={uploadData} />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
