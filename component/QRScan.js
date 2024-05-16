import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "./Header";
import NavBar from "./NavBar";

const QRScan = () => {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <View style={styles.container}>
      <Header />
      <Text>QR코드 스캔 화면</Text>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
