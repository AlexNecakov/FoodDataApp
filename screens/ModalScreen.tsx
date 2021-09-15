import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import ReactJson from 'react-json-view'
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ModalScreen({ route, navigation }: RootStackScreenProps<'Modal'>) {

    const barCode: string = route.params.upcCode;
    const getFoodProfilefromFDA = async (barCode: string) => {
        try {
            //var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + 'barCode' + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
            //nutella test case
            var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + '009800800254' + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                }
            );
            const json = await response.json();
            const jsonFoods = json?.foods ? json.foods : 'No foods found';
            if (jsonFoods.length > 0) {
                return jsonFoods[0]?.description ? jsonFoods[0].description : 'No name in database';
            } else {
                return 'No foods found';
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>{getFoodProfilefromFDA(barCode)}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

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
