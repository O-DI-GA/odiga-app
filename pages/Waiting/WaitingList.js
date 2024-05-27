import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import NavBar from "../../component/NavBar";
import ReserveContainer from "../../component/ReserveContainer";
import ModalComponent from "../../component/ModalComponent";

const WaitingList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handlePress = (shop) => {
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
              code: "ABC123",
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
              code: "XYZ789",
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
              code: "RES456",
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
