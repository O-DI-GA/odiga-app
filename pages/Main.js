import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import WaitingContainer from "../component/WaitingContainer";
import ShopContainer from "../component/ShopContainer";
import { useAuth } from "../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../utils/store/cartStore";
import { getTokenRequest, getRequest } from "../utils/api/api";
import * as Location from "expo-location";

const Main = () => {
  const { isLogged } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const navigation = useNavigation();
  const [waitingData, setWaitingData] = useState([]);
  const [waitingShops, setWaitingShops] = useState([]);
  const [reviewShops, setReviewShops] = useState([]);
  const [likeShops, setLikeShops] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    // console.log("당겨서 새로고침");
    setIsRefreshing(true);
    await fetchAllData();
    setIsRefreshing(false);
  };

  //확인용
  const cart = useCartStore((state) => state.cart);

  const fetchData = async () => {
    try {
      const response = await getTokenRequest("api/v1/user/waiting/my");
      // console.log("Fetched data:", response);
      if (response.httpStatusCode === 200 && Array.isArray(response.data)) {
        return response.data;
      } else {
        // console.log("Unexpected data format:", response);
        return [];
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  };

  const fetchShopData = async (type) => {
    try {
      const { locationServicesEnabled } =
        await Location.getProviderStatusAsync();
      if (!locationServicesEnabled) {
        Alert.alert(
          "위치 서비스 비활성화",
          "위치 서비스가 비활성화되어 있습니다. 위치 서비스를 켜주세요.",
          [{ text: "확인" }]
        );
        return [];
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한 거부", "위치 권한이 거부되었습니다.");
        return [];
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      const response = await getRequest(
        `api/v1/store?longitude=${longitude}&latitude=${latitude}&orderCondition=${type}`
      );
      // console.log(`메인에서 불러온 가게 목록 (${type}):`, response.data);
      if (response && response.data) {
        return response.data;
      } else {
        console.log("Valid data was not returned");
        return [];
      }
    } catch (error) {
      console.log("Fetching error:", error);
      return [];
    }
  };

  const fetchAllData = async () => {
    // console.log("메인화면으로 이동 시 다시 데이터 불러옴");
    const waitingData = await fetchData();
    setWaitingData(waitingData);
    clearCart();
    const waitingShops = await fetchShopData("WAITING");
    setWaitingShops(waitingShops);
    const reviewShops = await fetchShopData("REVIEW");
    setReviewShops(reviewShops);
    const likeShops = await fetchShopData("LIKE");
    setLikeShops(likeShops);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAllData);
    fetchAllData();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <Text style={styles.label}>내 웨이팅</Text>
        <WaitingContainer
          waitingData={waitingData}
          onWaitingCanceled={fetchAllData}
        />
        <Text style={styles.label}>현재 내 주변에서 웨이팅 가장 많은 곳</Text>
        <ShopContainer type="WAITING" shops={waitingShops} />
        <Text style={styles.label}>리뷰 많은 순</Text>
        <ShopContainer type="REVIEW" shops={reviewShops} />
        <Text style={styles.label}>인기순</Text>
        <ShopContainer type="LIKE" shops={likeShops} />
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
