//miniProject main entry point
//author: Kevin Lim, Alex Necakov
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

//ui formatting
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonBox: {
        marginTop: 20,
        backgroundColor: '#1a53ff',
    },
    cameraView: {
        flex: 1,
        width: "100%",
    },
    cameraReturn: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 50,
        height: 50,
    },
    returnText: {
        fontWeight: 'bold',
        color: 'white'
    },

    scanButton: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 50,
        bottom: 40,
        left: Dimensions.get('window').width / 2 - 40,
        backgroundColor: '#F76647'
    }
})
