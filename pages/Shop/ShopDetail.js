import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

/* API 통신
    1. 선택한 가게의 id 받아오기
    2. 가게 id로 api 요청 보내기
    → 지금은 mock 데이터
    3. 지도 모달 띄우기
*/

import { shpoList } from "../../assets/ShopList";
import KeepBtn from "../../component/KeepBtn";

import ShopHome from "./ShopHome";
import ShopMenu from "./ShopMenu";
import ShopImage from "./ShopImage";
import ShopReview from "./ShopReview";

const ShopDetail = ({ route, navigation }) => {
  const { id } = route.params; // 선택한 가게의 id

  // 메뉴 이동
  const router = useRoute();
  const [activeMenu, setActiveMenu] = React.useState(router.name);
  const [selectedMenu, setSelectedMenu] = React.useState("home");

  React.useEffect(() => {
    setActiveMenu(router.name);
  }, [router.name]);

  // mock 데이터에서 가게 찾기 → API 요청하는 로직으로 수정 필요
  const shop = shpoList.find((item) => item.id === id);

  // 평점 별 찍기
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < Math.floor(shop.star) ? (
      <Icon key={index} name="star" size={18} />
    ) : (
      <Icon key={index} name="staro" size={18} />
    )
  );

  const ShopInfoButton = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.infoBtn} onPress={handleCall}>
        <Icons name="call-outline" size={23} color={"#424242"} />
        <Text style={styles.infoTxt}> 전화 </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoBtn}>
        <Icons name="map-outline" size={23} color={"#424242"} />
        <Text style={styles.infoTxt}> 위치 </Text>
      </TouchableOpacity>
      <View style={styles.infoBtn}>
        <KeepBtn />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>{shop.keep}</Text>
      </View>
    </View>
  );

  // 전화 걸기
  const handleCall = () => {
    // 전화번호가 있는 경우에만 전화 걸기
    if (shop.tel) {
      Linking.openURL(`tel:${shop.tel}`);
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
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={shop.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{shop.category}</Text>
        <Text style={styles.name}>{shop.name}</Text>
        <View style={styles.starContainer}>
          {stars}
          <Text style={styles.star}>{shop.star}</Text>
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
          <RenderComponent />
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
  imageContainer: { flex: 1 },
  image: {
    width: "100%",
    height: "100%",
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
  category: {
    marginBottom: 6,
  },
  name: {
    fontWeight: "bold",
    fontSize: 28,
    margin: -5,
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
});

export default ShopDetail;
