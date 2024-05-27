import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const DATA = [
  { id: "1", type: "웨이팅", name: "가게이름", date: "2024년 5월 12일" },
  { id: "2", type: "웨이팅", name: "가게이름", date: "2024년 5월 12일" },
  { id: "3", type: "예약", name: "가게이름", date: "2024년 5월 12일" },
];

const UsageHistory = () => {
  const renderItem = ({ item }) => {
    const isWaiting = item.type === "웨이팅";
    const typeTextStyle = [
      styles.typeText,
      {
        color: isWaiting ? "#000000" : "#FFFFFF",
        backgroundColor: isWaiting ? "#FFF9C4" : "#E57373",
      },
    ];

    return (
      <View style={styles.item}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={typeTextStyle}>{item.type}</Text>
          </View>
          <Text style={styles.date}>방문 날짜: {item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용 내역</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  typeText: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default UsageHistory;
