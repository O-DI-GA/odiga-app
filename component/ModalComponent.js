import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { getTokenRequest } from "../utils/api/api";

const ModalComponent = ({ modalVisible, selectedShop, onRequestClose }) => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    console.log(selectedShop);
    const fetchData = async () => {
      try {
        const response = await getTokenRequest(
          `api/v1/user/waiting/my/${selectedShop.waitingId}`
        );
        console.log("웨이팅 상세:", response);
        if (response.httpStatusCode === 200 && response.data) {
          setShops(response.data);
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (selectedShop && modalVisible) {
      fetchData();
    }
  }, [selectedShop, modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {selectedShop && selectedShop.type === "waiting" && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{shops.storeName}</Text>
                <Text style={styles.modalMessage}>
                  현재{" "}
                  <Text style={styles.highlightText}>
                    {shops.previousWaitingCount}팀{" "}
                  </Text>
                  남았어요!
                </Text>
              </View>
              <Text style={styles.modalCodeLabel}>내 인증코드</Text>
              <Text style={styles.modalCode}>{shops.waitingCode}</Text>
            </>
          )}
          {selectedShop && selectedShop.type === "reservation" && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedShop.shopName}</Text>
                <Text style={styles.modalMessage}>
                  날짜: {selectedShop.date}
                </Text>
                <Text style={styles.modalMessage}>
                  시간: {selectedShop.time}
                </Text>
                <Text style={styles.modalMessage}>
                  인원수: {selectedShop.numPeople}
                </Text>
              </View>
              <Text style={styles.modalCodeLabel}>내 인증코드</Text>
              <Text style={styles.modalCode}>{shops.waitingCode}</Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C4C4C4",
    paddingHorizontal: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000000",
  },
  modalHeader: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingLeft: 20,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
  },
  modalCodeLabel: {
    fontSize: 16,
    marginVertical: 15,
  },
  modalCode: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  highlightText: {
    color: "#FF9900",
    fontWeight: "bold",
  },
});

export default ModalComponent;
