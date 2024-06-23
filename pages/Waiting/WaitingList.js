import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import NavBar from "../../component/NavBar";
import ReserveContainer from "../../component/ReserveContainer";
import ModalComponent from "../../component/ModalComponent";
import { getTokenRequest } from "../../utils/api/api";
import { useAuth } from "../../utils/AuthContext";
import { deleteRequest } from "../../utils/api/api";

import { LogBox } from "react-native";

const WaitingList = () => {
  const [shops, setShops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const { isLogged } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  LogBox.ignoreAllLogs(); // 경고 메세지 차단

  const handleRefresh = async () => {
    console.log("당겨서 새로고침");
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const fetchData = async () => {
    try {
      const response = await getTokenRequest("api/v1/user/waiting/my");
      console.log("Fetched data:", response);
      if (response.httpStatusCode === 200 && Array.isArray(response.data)) {
        setShops(response.data);
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchData();
    }
  }, [isLogged]);

  const handlePress = (shop) => {
    setSelectedShop(shop);
    setModalVisible(true);
  };

  const handleCancel = async (waitingId) => {
    try {
      await deleteRequest(`api/v1/user/waiting/${waitingId}`);
      fetchData(); // 웨이팅 취소 후 데이터를 다시 불러옴
    } catch (error) {
      console.error("웨이팅 취소 에러:", error);
    }
  };

  if (!isLogged) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginPrompt}>로그인 후 이용해주세요</Text>
        <NavBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <Text style={styles.label}>내 웨이팅 정보</Text>
        {shops.length > 0 ? (
          shops.map((shop) => (
            <ReserveContainer
              imageUrl={{ uri: shop.storeTitleImage }}
              shopName={shop.storeName}
              type="waiting"
              waitingCnt={shop.previousWaitingCount}
              waitingId={shop.waitingId}
              onPress={() =>
                handlePress({
                  shopName: shop.storeName,
                  type: "waiting",
                  waitingCnt: shop.previousWaitingCount,
                  waitingId: shop.waitingId,
                })
              }
              onCancel={() => handleCancel(shop.waitingId)}
            />
          ))
        ) : (
          <Text style={styles.noShopsText}>
            현재 웨이팅 중인 가게가 없습니다.
          </Text>
        )}
        <Text style={styles.label}>내 예약 정보</Text>
        <ReserveContainer
          imageUrl={require("../../assets/icon.png")}
          shopName="가게 이름"
          type="reservation"
          date="5월 5일"
          time="18시"
          numPeople="6명"
          code="RES456"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              type: "reservation",
              date: "5월 5일",
              time: "18시",
              numPeople: "6명",
            })
          }
        />
      </ScrollView>
      <NavBar />

      <ModalComponent
        modalVisible={modalVisible}
        selectedShop={selectedShop}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 110,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  loginPrompt: {
    fontSize: 20,
    textAlign: "center",
  },
  noShopsText: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});

export default WaitingList;
