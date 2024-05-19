import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const UsageHistory = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>이용 내역 화면</Text>
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

export default UsageHistory;
