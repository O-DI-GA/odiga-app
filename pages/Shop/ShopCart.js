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

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeMenu(item.menuId)}>
      <Icon name="delete" color="#ffffff" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Text style={styles.menuText}> 고른 메뉴 </Text>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.menuId.toString()}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ShopMenu")}>
          <Text style={styles.buttonText}>+ 더 담으러 가기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.waitingButton}
        onPress={() => navigation.navigate("Waiting")}>
        <Text style={styles.buttonText}>웨이팅하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 8,
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
});
