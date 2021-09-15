import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Table from 'react-bootstrap/Table';
import { RootStackScreenProps } from '../types';
import db from '../db/firestore'


export const NutrientIds = {
    ENERGY: 1008,
    CALCIUM: 1087,
    IRON: 1089,
    VITAMIN_A: 1104,
    VITAMIN_C: 1162,
    PROTEIN: 1003,
    FAT: 1004,
    CARBOHYDRATE: 1005,
    SUGAR: 2000,
    FIBER: 1079,
    POTASSIUM: 1092,
    SODIUM: 1093,
    CHOLESTEROL: 1253,
};

export default function ModalScreen({ route, navigation }: RootStackScreenProps<'Modal'>) {
    const barCode: string = route.params.upcCode;
    let [totalHits, setTotalHits] = useState(0);
    let [foodDescription, setDescription] = useState('');
    let [foodBrand, setBrand] = useState('');
    let [nutrientCalories, setCalories] = useState(0);

    const getFoodProfilefromFDA = async (barCode: string) => {
        var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + barCode + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
        //nutella test case
        //var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + '009800800254' + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
        fetch(url, {
            "method": "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
                setTotalHits(response.totalHits);
                if (totalHits > 0) {
                    setDescription(response.foods[0].description);
                    setBrand(response.foods[0].brandName);
                    var i: any;
                    for (i in response.foods[0].nutrients) {
                        if (response.foods[0].nutrients[i].nutrientId == 1008)
                            setCalories(response.foods[0].nutrients[i].value)
                    }
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
            <Text style={styles.title}> {foodBrand + ' ' + foodDescription}</Text>
            <Text style={styles.title}> {barCode}</Text>
            <Text style={styles.title}> {totalHits}</Text>
            <Text style={styles.title}> {nutrientCalories + ' calories'}</Text>
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
        fontSize: 15,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
