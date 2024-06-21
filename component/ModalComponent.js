import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getTokenRequest, deleteRequest } from "../utils/api/api";

const ModalComponent = ({
  modalVisible,
  selectedShop,
  onRequestClose,
  isMain,
  onWaitingCanceled,
}) => {
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

  // 웨이팅 취소
  const handleCancleClick = async () => {
    Alert.alert(
      "웨이팅 취소 확인",
      "정말 웨이팅을 취소하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            try {
              const response = await deleteRequest(
                `api/v1/user/waiting/${shops.waitingId}`
              );
              console.log("웨이팅 취소 응답:", response);
              if (response.httpStatusCode === 200) {
                Alert.alert("웨이팅이 취소 되었습니다.");
                if (onWaitingCanceled) {
                  onWaitingCanceled();
                }
                onRequestClose(); // 모달 창 닫기
              }
            } catch (err) {
              console.error("웨이팅 취소 에러:", err);
            }
          },
        },
        {
          text: "아니요",
          onPress: () => console.log("웨이팅 취소 동작 취소"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

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
              <View>
                <Text style={styles.modalCodeLabel}>내 인증코드</Text>
                <Text style={styles.modalCode}>{shops.waitingCode}</Text>
              </View>
              {isMain && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleCancleClick}
                >
                  <Text style={styles.cancelText}>웨이팅 취소</Text>
                </TouchableOpacity>
              )}
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
    gap: 10,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
  },
  modalCodeLabel: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 25,
  },
  modalCode: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  highlightText: {
    color: "#FF9900",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FFD600",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 16,
    marginBottom: 30,
  },
});

export default ModalComponent;
