import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import NavBar from "../../component/NavBar";
import KeepBtn from "../../component/KeepBtn";

const DATA = [
  {
    id: "1",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "2",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "3",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "4",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "5",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "6",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
  {
    id: "7",
    category: "양식",
    name: "가게 이름",
    image: require("../../assets/icon.png"),
  },
];

const KeepHistory = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <KeepBtn />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>총 {DATA.length}개</Text>
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
  totalCount: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  category: {
    fontSize: 16,
    color: "#666",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "auto",
  },
});

export default KeepHistory;
