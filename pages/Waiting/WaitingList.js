import { React, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import ReserveContainer from "../../component/ReserveContainer";

const WaitingList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handlePress = (shop) => {
    setSelectedShop(shop);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>내 웨이팅 정보</Text>
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="현재 5팀 남았어요!"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              statusMsg: "현재 5팀 남았어요!",
              type: "waiting",
            })
          }
        />
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="현재 8팀 남았어요!"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              statusMsg: "현재 8팀 남았어요!",
              type: "waiting",
            })
          }
        />
        <Text style={styles.label}>내 예약 정보</Text>
        <ReserveContainer
          imageUrl="#"
          shopName="가게 이름"
          statusMsg="5월 5일 18시"
          onPress={() =>
            handlePress({
              shopName: "가게 이름",
              date: "5월 5일",
              time: "18시",
              numPeople: "6명",
              type: "reservation",
            })
          }
        />
      </ScrollView>
      <NavBar />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            {selectedShop && selectedShop.type === "waiting" && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedShop.shopName}</Text>
                  <Text style={styles.modalMessage}>
                    {selectedShop.statusMsg}
                  </Text>
                </View>
                <Text style={styles.modalCodeLabel}>내 인증코드</Text>
                <Text style={styles.modalCode}>Z4C6BS</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>웨이팅 취소</Text>
                </TouchableOpacity>
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
                <Text style={styles.modalCode}>Z4C6BS</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>예약 취소</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 110,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
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
    fontSize: 16,
  },
  modalCodeLabel: {
    fontSize: 16,
    marginVertical: 15,
  },
  modalCode: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#FFD600",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default WaitingList;
