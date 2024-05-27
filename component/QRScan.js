import React from "react";
import { View, StyleSheet, Text } from "react-native";
import NavBar from "./NavBar";

const QRScan = () => {
  return (
    <View style={styles.container}>
      <Text>QR코드 스캔 화면</Text>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default QRScan;
