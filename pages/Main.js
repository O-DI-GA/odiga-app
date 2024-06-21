import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import WaitingContainer from "../component/WaitingContainer";
import ShopContainer from "../component/ShopContainer";
import { useAuth } from "../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../utils/store/cartStore";

const Main = () => {
  const { isLogged } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const navigation = useNavigation();

  //확인용
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("메인화면으로 이동 시 다시 데이터 불러옴");
      clearCart();
    });
    return unsubscribe;
  }, [navigation]);

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
