import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const WaitingList = () => {
  const [activeTab, setActiveTab] = useState("clock");
  return (
    <View style={styles.container}>
      <Header />
      <Text>웨이팅 목록 화면</Text>
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

export default WaitingList;
