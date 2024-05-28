import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import NavBar from "../../component/NavBar";
import ReserveContainer from "../../component/ReserveContainer";
import ModalComponent from "../../component/ModalComponent";

const generateRandomCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // I,1,O,0 비슷해서 제외
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const WaitingList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handlePress = (shop) => {
    shop.code = generateRandomCode();
    setSelectedShop(shop);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>내 웨이팅 정보</Text>
        <ReserveContainer
          imageUrl={require("../../assets/icon.png")}
          shopName="가게 이름"
          type="waiting"
          waitingCnt={5}
          code="ABC123"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              type: "waiting",
              waitingCnt: 5,
            })
          }
        />
        <ReserveContainer
          imageUrl={require("../../assets/icon.png")}
          shopName="가게 이름"
          type="waiting"
          waitingCnt={8}
          code="XYZ789"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              type: "waiting",
              waitingCnt: 8,
            })
          }
        />
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
    paddingTop: 80,
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
});

export default WaitingList;
