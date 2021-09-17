import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Button, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import Table from 'react-bootstrap/Table';
import { RootStackScreenProps } from '../types';
import db from '../db/firestore'

export default function ModalScreen({ route, navigation }: RootStackScreenProps<'Modal'>) {
    const barCode: string = route.params.upcCode;
    let [firstRun, setfirstRun] = useState(true);
    let [totalHits, setTotalHits] = useState(0);
    let [foodDescription, setDescription] = useState('');
    let [foodBrand, setBrand] = useState('');
    let [nutrientCalories, setCalories] = useState(0);
    let [fdicId, setId] = useState(0);
    let [servingSize, setServingSize] = useState(0);
    let [servingSizeDefault, setServingSizeDefault] = useState(0);
    let [servingUnits, setServingUnits] = useState('');

    const getFoodProfilefromFDA = async (barCode: string) => {
        var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + barCode + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
        //nutella test case
        //var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + 'nutella' + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
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
                    setId(response.foods[0].fdcId);
                    var i = 0;
                    var caloriesFound = false
                    while (!caloriesFound) {
                        if (response.foods[0].foodNutrients[i].nutrientId == 1008) {
                            setCalories(response.foods[0].foodNutrients[i].value)
                            caloriesFound = true
                        }
                        i++
                    }
                    // if (firstRun) {
                        url = 'https://api.nal.usda.gov/fdc/v1/food/' + fdicId + '?api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
                        fetch(url, {
                            "method": "GET",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(response => response.json())
                            .then(response => {
                                setServingSize(response.servingSize);
                                setServingSizeDefault(response.servingSize);
                                setServingUnits(response.servingSizeUnit);

                            })
                            .catch(err => {
                                console.log(err);
                            });
                    //     setfirstRun(false);
                    // }else{
                    //     setCalories(nutrientCalories * servingSize/servingSizeDefault)
                    // }
                    
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
            foodCalories: nutrientCalories,
            createdAt: new Date()
        }).catch(err => console.log(err))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}> {foodBrand + ' ' + foodDescription}</Text>
            {/*<Text style={styles.title}> {barCode}</Text>
            <Text style={styles.title}> {totalHits}</Text>*/}
            <Text style={styles.title}> {nutrientCalories + ' calories'}</Text>
            <Text style={styles.title}> {'Serving Size ' + servingSize + ' ' + servingUnits}</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 40 }}
                keyboardType='numeric'
                onChangeText={servingSize => setServingSize(parseInt(servingSize))}
                value={servingSize.toString()}
            />
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
