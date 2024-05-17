import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import ReserveContainer from "../../component/ReserveContainer";

const WaitingList = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.label}>내 웨이팅 정보</Text>
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="현재 5팀 남았어요!"
          onPress={() => console.log("가게 상세 페이지로 이동")}
        />
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="현재 8팀 남았어요!"
          onPress={() => console.log("가게 상세 페이지로 이동")}
        />
        <Text style={styles.label}>내 예약 정보</Text>
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="5월 5일 18시"
          onPress={() => console.log("가게 상세 페이지로 이동")}
        />
      </View>
      <NavBar />
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
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default WaitingList;
