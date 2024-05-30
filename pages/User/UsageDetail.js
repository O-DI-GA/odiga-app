import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import NavBar from "../../component/NavBar";

const UsageDetail = ({ route }) => {
  const { item } = route.params;
  const { name, date, time, details } = item;

  const isWaiting = item.type === "웨이팅";
  const typeTextStyle = [
    styles.typeText,
    {
      color: isWaiting ? "#000000" : "#FFFFFF",
      backgroundColor: isWaiting ? "#FFF9C4" : "#E57373",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={require("../../assets/icon.png")} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.quantity}>{item.quantity}개</Text>
        <Text style={styles.price}>{item.price}원</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.title}>{name}</Text>
          <Text style={typeTextStyle}>{item.type}</Text>
        </View>
        <Text style={styles.visitDate}>방문 날짜: {date}</Text>
        <Text style={styles.visitTime}>결제 시간: {time}</Text>
        <Text style={styles.title}>결제 내역</Text>
        <FlatList
          data={details}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.totalContainer}>
          <View style={styles.rowSpace}>
            <Text style={styles.totalText}>총 이용 금액</Text>
            <Text style={styles.totalAmount}>540,000원</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.paymentMethod}>결제 방식</Text>
            <Text style={styles.paymentMethod}>카카오페이</Text>
          </View>
        </View>
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
  box: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  typeText: {
    fontSize: 14,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  visitDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  visitTime: {
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 0,
    paddingTop: 20,
    borderTopWidth: 3,
    borderStyle: "dotted",
    borderColor: "#E0E0E0",
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentMethod: {
    fontSize: 16,
    color: "#757575",
  },
});

export default UsageDetail;
