import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useStore from "../../utils/store/store";

const Waiting = ({ route }) => {
  const { storeId, storeName } = route.params;

  const [people, setPeople] = useState(2);

  const [totalPrice, setTotalPrice] = useState(20000);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("123456");

  // 확인용
  React.useEffect(() => {
    console.log(`가게 번호 : ${storeId}, 가게 이름 : ${storeName}`);
  }, []);

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

  const toggleModal = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{storeName}</Text>
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
      <TouchableOpacity style={styles.waitingButton} onPress={toggleModal}>
        <Text style={styles.waitingButtonText}>웨이팅하기</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalCodeLabel}>내 인증코드</Text>
            <Text style={styles.modalCode}>{code}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.okButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
  },
  okButton: {
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#FFD600",
    paddingHorizontal: 28,
    paddingVertical: 4,
  },
  okButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  modalCodeLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  modalCode: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
  },
});

export default Waiting;
