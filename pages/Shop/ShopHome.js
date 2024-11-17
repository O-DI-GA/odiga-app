import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { getRequest } from "../../utils/api/api";

export default function ShopHome({ route }) {
  const { id } = route.params || {}; // 선택한 가게의 id

  const navigation = useNavigation();
  const [storeInfo, setStoreInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // id가 없으면 바로 종료

        const fetchInfo = await getRequest(`api/v1/store/${id}`);
        const storeInfo = fetchInfo.data;
        setStoreInfo(storeInfo);
        // console.log(storeInfo);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.stateView}>
          <View style={styles.stateContainer}>
            <Text style={styles.stateName}> 웨이팅 현황 </Text>
            <Text style={styles.state}> {storeInfo.waitingCount}팀 </Text>
          </View>
          <View style={styles.stateContainer}>
            <Text style={styles.stateName}> 빈 테이블 현황 </Text>
            <Text style={styles.state}>{storeInfo.emptyTableCount} 테이블</Text>
          </View>
        </View>
        <View style={styles.homeContainer}>
          <View style={styles.homeInfo}>
            <Text style={styles.infoName}> 전체 테이블 수 </Text>
            <Text style={styles.info}>{storeInfo.tableCount}개 </Text>
          </View>
          <View style={styles.homeInfo}>
            <Text style={styles.infoName}> 운영시간 </Text>
            <Text style={styles.info}>
              월 9:00 ~ 20:00{"\n"}화 9:00 ~ 20:00{"\n"}수 9:00 ~ 20:00
              {"\n"}목 9:00 ~ 20:00{"\n"}금 9:00 ~ 20:00{"\n"}토 9:00 ~ 20:00
            </Text>
          </View>
          <View style={styles.homeInfo}>
            <Text style={styles.infoName}> 휴무일 </Text>
            <Text style={styles.info}>일 </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stateView: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 90,
  },
  stateContainer: {
    alignItems: "center",
    gap: 20,
  },
  stateName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  state: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF9900",
  },
  homeContainer: {
    flex: 1,
    gap: 30,
    marginBottom: 30,
  },
  homeInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  infoName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    width: 170,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
