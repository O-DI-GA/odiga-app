import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

const WaitingContainer = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
          <Text style={styles.waitCnt}>18</Text>
          <View style={styles.textContainer}>
            <Text style={styles.shopName}>가게 이름</Text>
            <Text style={styles.waitText}>
              지금 앞에 <Text style={styles.waitBold}>18팀</Text> 남았어요!
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.waitCnt}>18</Text>
          <View style={styles.textContainer}>
            <Text style={styles.shopName}>가게 이름</Text>
            <Text style={styles.waitText}>
              지금 앞에 <Text style={styles.waitBold}>18팀</Text> 남았어요!
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.waitCnt}>18</Text>
          <View style={styles.textContainer}>
            <Text style={styles.shopName}>가게 이름</Text>
            <Text style={styles.waitText}>
              지금 앞에 <Text style={styles.waitBold}>18팀</Text> 남았어요!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  box: {
    width: 260,
    height: 150,
    backgroundColor: "#FFF9C4",
    marginRight: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  waitCnt: {
    fontSize: 200,
    fontWeight: "900",
    color: "#FFC107",
    position: "absolute",
    right: -20,
    bottom: -50,
    letterSpacing: -15, // 숫자 간격 줄이기
  },
  textContainer: {
    flex: 1,
    marginBottom: 5,
    marginLeft: 5,
  },
  shopName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  waitText: {
    fontSize: 16,
    color: "#000000",
  },
  waitBold: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default WaitingContainer;
