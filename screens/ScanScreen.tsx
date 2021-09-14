//scan screen
//author: Alex Necakov, Kevin Lim
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RootTabScreenProps } from '../types';

export default function ScanScreen({ navigation }: RootTabScreenProps<'ScanTab'>) {
//export default function ScanScreen() {
    const [startCamera, setStartCamera] = React.useState(false)
    const [scanned, setScanned] = React.useState(false)

    type scannedVal = {
        type: string;
        data: string;
    }
    const openCamera = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            alert("Access denied\nGo to Settings to grant permission")
        }
    }
    const scanBar: React.FC<scannedVal> = ({ type, data }) => {
        setScanned(true);
        //navigation.navigate('Modal', {upcCode: data})
        alert("Data Scanned")
        return null
    }

    /*const closeCamera = async () => {
      setStartCamera(false)
    }*/

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
});
