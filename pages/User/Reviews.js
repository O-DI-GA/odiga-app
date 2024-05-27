import React from "react";
import { View, StyleSheet, Text } from "react-native";
import NavBar from "../../component/NavBar";

const Reviews = () => {
  return (
    <View style={styles.container}>
      <Text>리뷰 관리 화면</Text>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 80,
  },
});

export default Reviews;
