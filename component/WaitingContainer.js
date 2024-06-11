import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getTokenRequest } from "../utils/api/api";
import ModalComponent from "./ModalComponent";

const WaitingContainer = () => {
  const [shops, setShops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTokenRequest("api/v1/user/waiting/my");
        console.log("Fetched data:", response);
        if (response.httpStatusCode === 200 && Array.isArray(response.data)) {
          setShops(response.data);
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePress = (shop) => {
    setSelectedShop(shop);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedShop(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {shops.map((shop) => (
          <TouchableOpacity
            key={shop.waitingId}
            style={styles.box}
            onPress={() => handlePress(shop)}
          >
            <Text style={styles.waitCnt}>{shop.previousWaitingCount}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.shopName}>{shop.storeName}</Text>
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
});

export default WaitingContainer;
