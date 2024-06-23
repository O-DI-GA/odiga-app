import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";

export default function App() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  LogBox.ignoreAllLogs(); // 경고 메세지 차단

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log(`Scanned QR code with data: ${data}`);
    const parsedData = JSON.parse(data); // Parse the JSON string
    toPaymentScreen(parsedData);
  };

  // 결제 화면으로 이동
  const toPaymentScreen = (paymentInfo) => {
    navigation.navigate("Payment", {
      storeId: paymentInfo.order.storeId,
      orderId: paymentInfo.order.orderId,
      storeName: paymentInfo.order.storeName,
    });
  };

  const toggleScanned = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: "center" }}>카메라 권한을 설정해주세요</Text>
        <Button
          title="카메라 권한 설정"
          onPress={() => setHasPermission(true)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraSection}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <TouchableOpacity onPress={toggleScanned} style={styles.button}>
          <Text style={styles.buttonText}> 인식하기 </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  cameraSection: {
    flex: 1,
  },
  button: {
    backgroundColor: "#FFD600",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});
