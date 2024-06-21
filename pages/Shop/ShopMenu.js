import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import MenuBox from "../../component/MenuBox";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from "../../utils/api/api";
import useCartStore from "../../utils/store/cartStore";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default function ShopMenu({ route }) {
  const navigation = useNavigation();
  const { id } = route.params || {}; // 선택한 가게의 id
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const addMenu = useCartStore((state) => state.addMenu); // 장바구니에 메뉴 추가하기

  const cart = useCartStore((state) => state.cart);

  // 메뉴 총합
  const totalMenuCount = cart.reduce(
    (total, item) => total + item.menuCount,
    0
  );

  React.useEffect(() => {
    const fetchMenus = async () => {
      try {
        // 가게 메뉴 API
        const response = await getRequest(`api/v1/store/${id}/menus`);
        setMenus(response.data);
      } catch (error) {
        console.log("가게 메뉴 에러 : ", error);
      }
    };
    fetchMenus();
  }, [id]);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryView}>
      <Text style={styles.categoryName}>{item.categoryName}</Text>
      <MenuBox
        menuItems={item.menuList}
        onPress={(menu) => setSelectedMenu(menu)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menus}
        renderItem={renderCategory}
        keyExtractor={(category) => category.categoryName}
      />

      {selectedMenu && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedMenu}
          onRequestClose={() => setSelectedMenu(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {selectedMenu.menuName}을(를) 담겠습니까?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.buttonAddMenu}
                    onPress={() => {
                      addMenu(selectedMenu);
                      setSelectedMenu(null);
                    }}>
                    <Text style={styles.textStyle}>담기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => setSelectedMenu(null)}>
                    <Text style={styles.textStyle}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <TouchableOpacity
        style={styles.cartIcon}
        onPress={() => navigation.navigate("ShopCart")}>
        {totalMenuCount > 0 && (
          <View style={styles.cartCount}>
            <Text>{totalMenuCount}</Text>
          </View>
        )}
        <Icon name="bag" size={30} color={"#505050"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: "100%",
    position: "relative",
  },
  categoryView: {
    flex: 1,
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 5,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#FFD600",
    width: 170,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#E6EBF2",
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonAddMenu: {
    backgroundColor: "#FFD600",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
  },
  buttonClose: {
    backgroundColor: "#E6EBF2",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  cartIcon: {
    position: "absolute",
    bottom: 25,
    right: 0,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    elevation: 3,
  },
  cartCount: {
    position: "absolute",
    bottom: 35,
    right: -12,
    fontSize: 13,
    backgroundColor: "#FFD600",
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
