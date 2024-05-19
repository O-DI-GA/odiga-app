import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import Icon from "react-native-vector-icons/Ionicons";

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
      {/* 찜 컴포넌트 */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>찜 내역</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  totalCount: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
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
