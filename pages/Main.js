import React, { useEffect } from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import WaitingContainer from "../component/WaitingContainer";
import ShopContainer from "../component/ShopContainer";
import { useAuth } from "../utils/AuthContext";

const Main = () => {
  const { isLogged, setIsLogged } = useAuth();

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 데이터 다시 로드
    if (isLogged) {
      console.log("User is logged in, fetching data...");
      // fetchData();
    }
  }, [isLogged]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>내 웨이팅</Text>
        <WaitingContainer />
        <Text style={styles.label}>현재 내 주변에서 웨이팅 가장 많은 곳</Text>
        <ShopContainer type="WAITING" />
        <Text style={styles.label}>리뷰 많은 순</Text>
        <ShopContainer type="REVIEW" />
        <Text style={styles.label}>인기순</Text>
        <ShopContainer type="LIKE" />
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 110,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingLeft: 20,
  },
});

export default Main;
