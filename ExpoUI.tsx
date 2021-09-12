import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [startCamera, setStartCamera] = React.useState(false)
    const [scanned, setScanned] = React.useState(false)

    type scannedVal = {
        type: string;
        data: string;
    }

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }

    const openCamera = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            alert("Access denied")
        }
    }

    /*const closeCamera = async () => {
      setStartCamera(false)
    }*/

    const scanBar: React.FC<scannedVal> = ({ type, data }) => {
        setScanned(true)
        alert(`Bar code type: ${type}\ndata: ${data}\n scanned!`)
        return null
    }

    return (

        startCamera ? (<View style={styles.cameraView}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : scanBar}
                style={StyleSheet.absoluteFillObject} />
            <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)} />
            <TouchableOpacity style={styles.cameraReturn} onPress={() => setStartCamera(false)}>
                <Text style={styles.returnText}>Return</Text>
            </TouchableOpacity>
        </View>
        ) : (

            <View style={styles.container}>
                <Text>Welcome! Press Button to Scan</Text>
                <Text>  </Text>
                <View style={styles.buttonBox}>
                    <Button title='Start Scanning' color='#ffffff' onPress={openCamera} />
                </View>

                <StatusBar style="auto" />
            </View>)

    )
}

