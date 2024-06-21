import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ModalComponent from "./ModalComponent";
import { useAuth } from "../utils/AuthContext";

const WaitingContainer = ({ waitingData, onWaitingCanceled }) => {
  const [shops, setShops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const { isLogged } = useAuth();

  const loadData = async () => {
    const data = waitingData;
    setShops(data);
  };

  useEffect(() => {
    if (isLogged) {
      loadData();
    }
  }, [isLogged, waitingData]);

  useEffect(() => {
    if (!modalVisible && isLogged) {
      loadData();
    }
  }, [modalVisible, isLogged]);

  const handlePress = (shop) => {
    setSelectedShop(shop);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedShop(null);
  };

  if (!isLogged) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginPrompt}>로그인 후 이용해주세요</Text>
      </View>
    );
  }

  if (isLogged && shops.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noShopsPrompt}>가게가 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {shops.map((shop) => (
          <TouchableOpacity
            key={shop.waitingId}
            style={styles.box}
            onPress={() =>
              handlePress({
                shopName: shop.storeName,
                type: "waiting",
                waitingCnt: shop.previousWaitingCount,
                waitingId: shop.waitingId,
              })
            }
          >
            <Text style={styles.waitCnt}>{shop.previousWaitingCount}</Text>
            <View style={styles.textContainer}>
              <Text
                style={styles.shopName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {shop.storeName}
              </Text>
              <Text style={styles.waitText}>
                지금 앞에{" "}
                <Text style={styles.waitBold}>
                  {shop.previousWaitingCount}팀
                </Text>{" "}
                남았어요!
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedShop && (
        <ModalComponent
          modalVisible={modalVisible}
          selectedShop={selectedShop}
          onRequestClose={closeModal}
          isMain={true}
          onWaitingCanceled={onWaitingCanceled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  box: {
    width: 260,
    height: 150,
    backgroundColor: "#FFF9C4",
    marginRight: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  waitCnt: {
    fontSize: 200,
    fontWeight: "900",
    color: "#FFC107",
    position: "absolute",
    right: -20,
    bottom: -50,
    letterSpacing: -15,
  },
  textContainer: {
    flex: 1,
    marginBottom: 5,
    marginLeft: 5,
  },
  shopName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  waitText: {
    fontSize: 16,
    color: "#000000",
  },
  waitBold: {
    fontWeight: "bold",
    fontSize: 22,
  },
  loginPrompt: {
    fontSize: 20,
    textAlign: "center",
  },
  noShopsPrompt: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default WaitingContainer;
