import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "@react-navigation/native";

import KeepBtn from "./KeepBtn";
import { getRequest } from "../utils/api/api";

/* 추가할 기능
    1. API url props 추가하기
    2. 각 컨테이너 클릭 시 해당 가게의 상세페이지로 이동 link 추가하기
    3. 가게 이름 길면은 어떡함? ㅠㅜ
*/

const ShopContainer = ({ type }) => {
  const navigation = useNavigation();
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    console.log(type);
    const fetchData = async () => {
      try {
        // 위치 : 경산
        // const fetchList = await getRequest(
        //   `api/v1/store?longitude=128.7544&latitude=35.8306&orderCondition=${type}`
        // );
        // 위치 : LA
        const fetchList = await getRequest(
          `api/v1/store?longitude=-122.084&latitude=37.4219983&orderCondition=${type}`
        );
        const storeList = fetchList.data;
        setStoreList(storeList);
        console.log(fetchList);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}>
      {storeList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>가게가 없습니다.</Text>
        </View>
      ) : (
        storeList.map((data) => {
          return (
            <View key={data.storeId} style={styles.shadowWrapper}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() =>
                  navigation.navigate("ShopDetail", {
                    id: data.storeId,
                  })
                }>
                <Shadow key={data.storeId} startColor={"#06333610"}>
                  <View key={data.storeId} style={styles.container}>
                    <Image
                      style={styles.shopImg}
                      source={{ uri: data.storeTitleImage }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={{ fontSize: 10 }}> {data.category} </Text>
                      <Text style={styles.shopName}> {data.storeName} </Text>
                      {type === "WAITING" && (
                        <Text> 현재 {data.waitingCount}팀 웨이팅 중 </Text>
                      )}
                      {type === "REVIEW" && (
                        <Text> 리뷰 {data.reviewCount}개 </Text>
                      )}
                      {type === "LIKE" && <Text> 찜 {data.likeCount}개 </Text>}
                    </View>
                    <View style={styles.keepBtnContainer}>
                      <KeepBtn />
                    </View>
                  </View>
                </Shadow>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10,
    marginBottom: 10,
  },
  shadowWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flexShrink: 1,
    width: 200,
    height: 240,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f9f9f9",
    backgroundColor: "white",
    position: "relative",
  },
  shopImg: {
    resizeMode: "cover",
    width: 160,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 5,
    padding: 5,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -5,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  keepBtnContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    borderRadius: 10,
    width: 35,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default ShopContainer;

// mock data
const storeList = [
  {
    id: 1,
    category: "양식",
    name: "명륜진사갈비",
    image: require("./test_img/test_img.jpg"),
    waiting: 32,
    review: 190,
    keep: 182,
  },
  {
    id: 2,
    category: "양식",
    name: "스테이크",
    image: require("./test_img/test_img2.jpg"),
    waiting: 10,
    review: 199,
    keep: 18,
  },
  {
    id: 3,
    category: "분식",
    name: "떡볶이!",
    image: require("./test_img/test_img.jpg"),
    waiting: 22,
    review: 18,
    keep: 282,
  },
  {
    id: 4,
    category: "일식",
    name: "바밥초밥",
    image: require("./test_img/sushi_01.jpg"),
    waiting: 32,
    review: 52,
    keep: 82,
  },
];
