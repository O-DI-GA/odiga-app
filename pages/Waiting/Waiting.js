import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Waiting = () => {
  const [people, setPeople] = useState(2);
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Tortilla Chips",
      quantity: 2,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Avocado",
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "New Menu",
      quantity: 3,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Tortilla Chips",
      quantity: 2,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Avocado",
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      name: "New Menu",
      quantity: 3,
      image: "https://via.placeholder.com/50",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(20000);

  const handleQuantityChange = (id, amount) => {
    setMenu(
      menu.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      )
    );
  };

  const handlePeopleChange = (amount) => {
    setPeople(Math.max(0, people + amount));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>가게 이름</Text>
      </View>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>인원수</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePeopleChange(-1)}>
            <Ionicons name="remove-circle-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.peopleCount}>{people}</Text>
          <TouchableOpacity onPress={() => handlePeopleChange(1)}>
            <Ionicons name="add-circle-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>고른 메뉴</Text>
        {menu.map((item) => (
          <View key={item.id} style={styles.menuItemContainer}>
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Image
                  source={require("../../component/test_img/test_img2.jpg")}
                  style={styles.menuItemImage}
                />
                <Text style={styles.menuItemText}>{item.name}</Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.id, -1)}
                >
                  <Ionicons name="remove-circle-outline" size={24} />
                </TouchableOpacity>
                <Text style={styles.menuItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <Ionicons name="add-circle-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addMoreButton}>
          <Text style={styles.addMoreButtonText}>+ 더 담으러 가기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalPriceText}>총 주문금액</Text>
        <Text style={styles.totalPriceAmount}>
          {totalPrice.toLocaleString("ko-KR")}원
        </Text>
      </View>
      <TouchableOpacity style={styles.waitingButton}>
        <Text
          style={styles.waitingButtonText}
          onPress={() => console.log("웨이팅하기")}
        >
          웨이팅하기
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 80,
  },
  header: {
    alignItems: "flex-start",
    marginVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  peopleCount: {
    marginHorizontal: 8,
    fontSize: 18,
  },
  menuItemContainer: {
    borderRadius: 16,
    marginVertical: 8,
    backgroundColor: "#FFF", // 배경색 없으면 그림자 이상해짐
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItemQuantity: {
    marginHorizontal: 8,
    fontSize: 18,
  },
  addMoreButton: {
    alignItems: "center",
    marginTop: 16,
  },
  addMoreButtonText: {
    backgroundColor: "#F7F5F0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  totalPriceText: {
    fontSize: 20,
  },
  totalPriceAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  waitingButton: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  waitingButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Waiting;
