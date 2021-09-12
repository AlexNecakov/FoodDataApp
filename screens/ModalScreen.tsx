import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ModalScreen({ navigation }: RootStackScreenProps<'Modal'>) {
    //const nutritionData = navigation.

    const getFoodProfilefromFDA = async (data: string) => {
        try {
            var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + data + '&api_key=IUK2OzgXgQx5a9rO0fAWPaUjd1LQf5sAh4q4jEsb'
            const response = await fetch(
                url
            );
            const json = await response.json();
            return json.foods.description;
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>getFoodProfilefromFDA</Text>
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
