import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
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
    const typeContainerStyle = [
      styles.type,
      { backgroundColor: isWaiting ? "#FFF9C4" : "#E57373" },
    ];
    const typeTextStyle = [
      styles.typeText,
      { color: isWaiting ? "#000000" : "#FFFFFF" },
    ];

    return (
      <View style={styles.item}>
        <View style={typeContainerStyle}>
          <Text style={typeTextStyle}>{item.type}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>방문 날짜: {item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
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
    elevation: 2,
  },
  type: {
    width: 60,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  typeText: {
    textAlign: "center",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
  },
});

export default UsageHistory;
