import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <View style={styles.container}>
      <Header />
      <Text>마이페이지 화면</Text>
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

export default MyPage;
