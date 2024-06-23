import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

import KeepBtn from "../../component/KeepBtn";

import ShopHome from "./ShopHome";
import ShopMenu from "./ShopMenu";
import ShopImage from "./ShopImage";
import ShopReview from "./ShopReview";

import { getRequest } from "../../utils/api/api";
import useCartStore from "../../utils/store/cartStore";

const ShopDetail = ({ route, navigation }) => {
  const { id } = route.params; // 선택한 가게의 id

  // 메뉴 이동
  const router = useRoute();
  const [activeMenu, setActiveMenu] = React.useState(router.name);
  const [selectedMenu, setSelectedMenu] = React.useState("home");

  const [storeInfo, setStoreInfo] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const setStoreName = useCartStore((state) => state.setStoreName);
  const setStoreId = useCartStore((state) => state.setStoreId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchInfo = await getRequest(`api/v1/store/${id}`);
        if (fetchInfo && fetchInfo.data) {
          const storeInfo = fetchInfo.data;
          setStoreInfo(storeInfo);
          setStoreName(storeInfo.storeName); // storeName을 store에 저장
          setStoreId(id); // storeId를 store에 저장
        } else {
          if (!fetchInfo) {
            console.error("fetchInfo is undefined");
          } else if (!fetchInfo.data) {
            console.error("fetchInfo.data is undefined");
          } else {
            console.error("Valid data was not returned");
          }
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    setActiveMenu(router.name);
  }, [router.name]);

  let stars;

  if (
    // storeInfo가 존재하고 averageRating이 0 이상인 경우
    !storeInfo ||
    (storeInfo.averageRating !== undefined && storeInfo.averageRating >= 0)
  ) {
    // 별점 아이콘을 출력
    stars = Array.from({ length: 5 }, (_, index) =>
      index < Math.floor(storeInfo.averageRating) ? (
        <Icon key={index} name="star" size={18} />
      ) : (
        <Icon key={index} name="staro" size={18} />
      )
    );
  } else {
    return <Text>Loading...</Text>; // 데이터가 아직 받아지지 않은 경우 "Loading..."을 출력
  }

  const ShopInfoButton = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.infoBtn} onPress={handleCall}>
        <Icons name="call-outline" size={23} color={"#424242"} />
        <Text style={styles.infoTxt}> 전화 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.infoBtn}
        onPress={() => setModalVisible(true)}
      >
        <Icons name="map-outline" size={23} color={"#424242"} />
        <Text style={styles.infoTxt}> 주소 </Text>
      </TouchableOpacity>
      <View style={styles.infoBtn}>
        <KeepBtn />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>
          {storeInfo.likeCount}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{storeInfo.address}</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  // 전화 걸기
  const handleCall = () => {
    // 전화번호가 있는 경우에만 전화 걸기
    if (storeInfo.phoneNumber) {
      Linking.openURL(`tel:${storeInfo.phoneNumber}`);
    } else {
      console.log("전화번호가 없습니다.");
    }
  };

  const MenuBtn = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[
          styles.menuBox,
          selectedMenu === "home" && styles.activeMenuBoxStart,
        ]}
        onPress={() => setSelectedMenu("home")}
      >
        <Text style={styles.menuText}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuBox,
          selectedMenu === "menu" && styles.activeMenuBox,
        ]}
        onPress={() => setSelectedMenu("menu")}
      >
        <Text style={styles.menuText}>메뉴</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuBox,
          selectedMenu === "image" && styles.activeMenuBox,
        ]}
        onPress={() => setSelectedMenu("image")}
      >
        <Text style={styles.menuText}>사진</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuBox,
          selectedMenu === "review" && styles.activeMenuBoxEnd,
        ]}
        onPress={() => setSelectedMenu("review")}
      >
        <Text style={styles.menuText}>리뷰</Text>
      </TouchableOpacity>
    </View>
  );

  let RenderComponent;
  switch (selectedMenu) {
    case "home":
      RenderComponent = ShopHome;
      break;
    case "menu":
      RenderComponent = ShopMenu;
      break;
    case "image":
      RenderComponent = ShopImage;
      break;
    case "review":
      RenderComponent = ShopReview;
      break;
    default:
      RenderComponent = ShopHome;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{storeInfo.storeCategory}</Text>
        <ScrollView horizontal style={styles.nameScroll}>
          <Text style={styles.name}>{storeInfo.storeName}</Text>
        </ScrollView>
        <View style={styles.starContainer}>
          {stars}
          <Text style={styles.star}>{storeInfo.averageRating}</Text>
        </View>
        <ShopInfoButton />
        <View
          style={{
            backgroundColor: "#F0F0F0",
            paddingVertical: 5,
            paddingHorizontal: 0,
            marginTop: 15,
            marginLeft: -50,
            width: "150%",
          }}
        ></View>
        <MenuBtn setSelectedMenu={setSelectedMenu} />
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <RenderComponent route={route} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
  },
  infoContainer: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    height: "95%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    zIndex: 1,
    padding: 30,
  },
  nameScroll: {
    maxHeight: 35,
  },
  category: {
    marginBottom: 6,
  },
  name: {
    fontWeight: "bold",
    fontSize: 28,
  },
  starContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "left",
  },
  star: {
    marginLeft: 5,
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 25,
    marginLeft: 10,
    flexDirection: "row",
  },
  infoBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTxt: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: -5,
  },
  menuContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: -30,
  },
  menuBox: {
    borderWidth: 1,
    paddingHorizontal: 35,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#D9D9D9",
  },
  activeMenuBoxStart: {
    borderTopWidth: 3,
    borderTopColor: "#000000",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#D9D9D9",
    borderBottomWidth: 0,
  },
  activeMenuBox: {
    borderTopWidth: 3,
    borderTopColor: "#000000",
    borderLeftColor: "#D9D9D9",
    borderRightColor: "#D9D9D9",
    borderBottomWidth: 0,
  },
  activeMenuBoxEnd: {
    borderTopWidth: 3,
    borderTopColor: "#000000",
    borderLeftColor: "#D9D9D9",
    borderRightColor: "#FFFFFF",
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 18,
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
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default ShopDetail;
