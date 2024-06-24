import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NavBar from "../../component/NavBar";
import { useNavigation } from "@react-navigation/native";

const USAGE_DETAILS = [
  { id: "1", name: "Red Cabbage", quantity: 2, price: 180000 },
  { id: "2", name: "Red Cabbage", quantity: 2, price: 180000 },
  { id: "3", name: "Red Cabbage", quantity: 2, price: 180000 },
];

const DATA = [
  {
    id: "1",
    type: "웨이팅",
    name: "구들 마라탕",
    date: "2024년 6월 24일",
    time: "20시 23분 45초",
    details: USAGE_DETAILS,
  },
  {
    id: "2",
    type: "웨이팅",
    name: "신전 떡볶이",
    date: "2024년 6월 24일",
    time: "18시 45분 23초",
    details: USAGE_DETAILS,
  },
  {
    id: "3",
    type: "예약",
    name: "온감",
    date: "2024년 6월 30일",
    time: "18시 0분 0초",
    details: USAGE_DETAILS,
  },
];

const UsageHistory = () => {
  const navigation = useNavigation();
  const [infoWidth, setInfoWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    if (layoutWidth > 0) {
      setInfoWidth(layoutWidth);
    }
  }, [layoutWidth]);

  const renderItem = ({ item }) => {
    const isWaiting = item.type === "웨이팅";
    const typeTextStyle = [
      styles.typeText,
      {
        color: isWaiting ? "#000000" : "#FFFFFF",
        backgroundColor: isWaiting ? "#FFF9C4" : "#E57373",
      },
    ];

    const handleLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setLayoutWidth(width);
    };

    const isLongName = infoWidth > 0 && item.name.length > infoWidth / 15; // infoWidth 기준으로 이름 길이 결정
    const nameStyle = isLongName ? styles.longName : styles.name; // 길이를 기준으로 스타일 적용

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("UsageDetail", { item })}
      >
        <Image source={require("../../assets/icon.png")} style={styles.image} />
        <View style={styles.info} onLayout={handleLayout}>
          <View style={styles.nameRow}>
            <Text
              style={nameStyle}
              numberOfLines={isLongName ? 1 : undefined}
              ellipsizeMode={isLongName ? "tail" : undefined}
            >
              {item.name}
            </Text>
            <Text style={typeTextStyle}>{item.type}</Text>
          </View>
          <Text style={styles.date}>방문 날짜: {item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  longName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    width: "70%",
  },
  typeText: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default UsageHistory;
