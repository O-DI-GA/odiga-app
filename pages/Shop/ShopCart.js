import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import useStore from "../../utils/store/store";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

export default function ShopCart() {
  const navigation = useNavigation();

  const cart = useStore((state) => state.cart);
  const storeName = useStore((state) => state.storeName);
  const storeId = useStore((state) => state.storeId);

  const updateMenuCount = useStore((state) => state.updateMenuCount);
  const removeMenu = useStore((state) => state.removeMenu);

  const renderCartItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.cartItem}>
        <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
        <View style={styles.menuInfo}>
          <Text style={styles.bold}>{item.menuName}</Text>
          <Text style={styles.text}>{item.menuPrice}원</Text>
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityMinusBox}
            onPress={() => updateMenuCount(item.menuId, item.quantity - 1)}>
            <Icon name="minus" size={13} color={"#CCD4DE"} />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityPlusBox}
            onPress={() => updateMenuCount(item.menuId, item.quantity + 1)}>
            <Icon name="plus" size={13} color={"#70B9BE"} />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  // 삭제 버튼
  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeMenu(item.menuId)}>
      <Icon name="delete" color="#ffffff" size={20} />
    </TouchableOpacity>
  );

  // 총 주문 금액
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.menuPrice * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emoji}> 😿 </Text>
          <Text style={styles.emptyText}>장바구니가 비었습니다.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}> 메뉴 담으러 가기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.menuText}>고른 메뉴</Text>
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.menuId.toString()}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>+ 더 담으러 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <View style={styles.totalPrice}>
              <Text style={styles.totalPriceText}>총 주문 금액</Text>
              <Text style={styles.totalPriceText}>{getTotalPrice()}원</Text>
            </View>
            <TouchableOpacity
              style={styles.waitingButton}
              onPress={() => {
                navigation.navigate("Waiting", {
                  storeId: storeId,
                  storeName: storeName,
                });
              }}>
              <Text style={styles.goWaiting}>웨이팅 등록 하러 가기</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    flexGrow: 1,
  },
  menuText: {
    marginVertical: 10,
    fontSize: 15,
    marginHorizontal: 8,
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
  menuInfo: {
    gap: 5,
  },
  bold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#F7F5F0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
  },
  waitingButton: {
    backgroundColor: "#FFD600",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  quantityControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    marginRight: 12,
  },
  quantityMinusBox: {
    borderWidth: 1,
    borderColor: "#CCD4DE",
    padding: 2,
    borderRadius: 5,
  },
  quantityPlusBox: {
    borderWidth: 1,
    borderColor: "#70B9BE",
    padding: 2,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 1,
    marginVertical: 18,
    marginRight: 5,
  },
  bottom: {
    marginHorizontal: 8,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goWaiting: {
    fontWeight: "bold",
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 30,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 50,
  },
});
