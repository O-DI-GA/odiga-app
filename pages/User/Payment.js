import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NavBar from "../../component/NavBar";
import { getRequest } from "../../utils/api/api";

// 더미 데이터
const dummyOrder = {
  date: "2024년 11월 18일",
};

function Payment({ route }) {
  const { storeId, orderId, storeName } = route.params;

  const [tableOrderMenu, setTableOrderMenu] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState();

  React.useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await getRequest(
          `api/v1/table/${storeId}/order/${orderId}/payment`
        );
        console.log("결제 내역 데이터:", response);
        setTableOrderMenu(response.data.tableOrderMenus);
        setTotalPrice(response.data.totalTableOrderPrice);
      } catch (err) {
        console.log("결제 요청 에러 : ", err);
      }
    };

    fetchPaymentData();
  }, [storeId, orderId]);

  // 더미데이터
  const { order = JSON.stringify(dummyOrder) } = route.params || {};
  const orderDetails = order ? JSON.parse(order) : {};

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemName}>{item.menuName}</Text>
        <Text style={styles.price}>{item.menuTotalPrice}원</Text>
      </View>
      <Text style={styles.quantity}>{item.menuCount}개</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.title}>{storeName}</Text>
        </View>
        <Text style={styles.visitDate}>방문 날짜: {orderDetails.date}</Text>
        <Text style={styles.title}>결제 내역</Text>
        <FlatList
          data={tableOrderMenu}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.totalContainer}>
          <View style={styles.rowSpace}>
            <Text style={styles.totalText}>총 이용 금액</Text>
            <Text style={styles.totalAmount}>{totalPrice}원</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>결제하기</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  box: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 70,
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
  paymentTime: {
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    padding: 5,
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 10,
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
    flexDirection: "column",
    gap: 5,
  },
  itemName: {
    fontSize: 16,
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
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentMethods: {
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: "#FFD600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 55,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Payment;
