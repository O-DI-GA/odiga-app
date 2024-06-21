import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import useCartStore from "../../utils/store/cartStore";
import { postTokenRequest } from "../../utils/api/api";

import { useNavigation } from "@react-navigation/native";

const Waiting = ({ route }) => {
  const { storeId, storeName } = route.params;
  const cart = useCartStore((state) => state.cart);

  const [people, setPeople] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("111111");

  const navigation = useNavigation();

  // 확인용
  // React.useEffect(() => {
  //   console.log(`가게 번호 : ${storeId}, 가게 이름 : ${storeName}`);
  //   console.log(`장바구니 : ${JSON.stringify(cart, null, 2)}`);
  // }, []);

  // 인원 수 변경
  const handlePeopleChange = (amount) => {
    setPeople(Math.max(1, people + amount));
  };

  // 인증번호 토글
  const toggleModal = () => {
    setModalVisible(true);
  };

  // 장바구니 렌더링
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
      <View style={styles.menuInfo}>
        <Text style={styles.bold}>{item.menuName}</Text>
        <Text style={styles.text}>{item.menuPrice}원</Text>
      </View>
      <View style={styles.quantityBox}>
        <Text>{item.menuCount}</Text>
      </View>
    </View>
  );

  // 총 주문 금액
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.menuPrice * item.menuCount,
      0
    );
  };

  // 웨이팅 등록
  const postWaiting = async () => {
    const data = {
      peopleCount: people,
      registerMenus: cart,
    };
    console.log("data : ", data);
    try {
      const response = await postTokenRequest(
        `api/v1/user/waiting/${storeId}`,
        data
      );
      console.log("웨이팅 등록 : ", response);
      const responseData = response.data;
      if (response.httpStatusCode === 201) {
        setCode(responseData.waitingCode);
        toggleModal();
      } else {
        Alert.alert(`웨이팅 등록에 실패했습니다. \n재시도 해주세요`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{storeName}</Text>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>인원수</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.quantityMinusBox}
            onPress={() => handlePeopleChange(-1)}>
            <Icon name="minus" size={13} color={"#CCD4DE"} />
          </TouchableOpacity>
          <Text style={styles.peopleCount}>{people}</Text>
          <TouchableOpacity
            style={styles.quantityPlusBox}
            onPress={() => handlePeopleChange(1)}>
            <Icon name="plus" size={13} color={"#70B9BE"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}> 고른 메뉴 </Text>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.menuId.toString()}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>총 주문 금액</Text>
          <Text style={styles.totalPriceText}>{getTotalPrice()}원</Text>
        </View>
        <TouchableOpacity
          style={styles.waitingButton}
          onPress={() => postWaiting()}>
          <Text style={styles.waitingButtonText}>웨이팅하기</Text>
        </TouchableOpacity>
      </View>

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
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Main");
              }}>
              <Text style={styles.okButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginHorizontal: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    marginLeft: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 8,
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
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  bold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityPlusBox: {
    borderWidth: 1,
    borderColor: "#70B9BE",
    padding: 2,
    borderRadius: 5,
  },
  quantityMinusBox: {
    borderWidth: 1,
    borderColor: "#CCD4DE",
    padding: 2,
    borderRadius: 5,
  },
  waitingButton: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
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
    felx: 1,
    width: 250,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
  },
  okButton: {
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#FFD600",
    paddingHorizontal: 30,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  okButtonText: {
    fontSize: 15,
    color: "#000000",
  },
  modalCodeLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  modalCode: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
  },
  cartItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 5,
    marginHorizontal: 8,
    backgroundColor: "#FFF",
    elevation: 5,
    gap: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  quantityBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    marginRight: 30,
  },
  menuSection: {
    flex: 1,
    gap: 10,
  },
  bottom: {
    marginHorizontal: 8,
    marginTop: 15,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Waiting;
