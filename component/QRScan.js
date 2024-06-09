import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Scanned QR code with data: ${data}`);
    };

    const toggleScanned = () => {
        setScanned(false);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to access the camera
                </Text>
                <Button
                    title="카메라 권한 설정"
                    onPress={() => setHasPermission(true)}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} onPress={toggleScanned} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
