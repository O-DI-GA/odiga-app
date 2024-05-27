import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import NavBar from "../component/NavBar";

const Map = () => {
  return (
    <ImageBackground
      source={require("../assets/mapimg.png")} // 가짜 지도
      style={styles.background}
    >
      <View style={styles.overlay}>
        <NavBar />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Map;
