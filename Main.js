import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./component/Header";
import NavBar from "./component/NavBar";

const Main = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.label}>내 웨이팅</Text>
      <Text style={styles.label}>현재 내 주변에서 웨이팅 가장 많은 곳</Text>
      <Text style={styles.label}>후기 많은 순</Text>
      <Text style={styles.label}>인기순</Text>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Main;
