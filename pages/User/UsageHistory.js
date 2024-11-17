import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NavBar from "../../component/NavBar";
import { useNavigation } from "@react-navigation/native";
import { getTokenRequest } from "../../utils/api/api";

const UsageHistory = () => {
  const navigation = useNavigation();
  const [infoWidth, setInfoWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [usageHistory, setUsageHistory] = useState([]);

  // 이용 내역 불러오기
  const fetchHistory = async () => {
    try {
      const response = await getTokenRequest("api/v1/user/history");
      if (response.httpStatusCode === 200 && Array.isArray(response.data)) {
        const formattedData = response.data.map((item) => ({
          id: item.historyId.toString(),
          name: item.storeName,
          date: new Date(item.visitedAt).toLocaleDateString("ko-KR"),
          time: new Date(item.visitedAt).toLocaleTimeString("ko-KR"),
          type: "웨이팅", // 기본값. 필요 시 조건에 따라 변경 가능.
          details: item.menus.map((menu) => ({
            id: menu.menuId.toString(),
            name: menu.menuName,
            quantity: menu.menuCount,
            price: menu.menuPrice,
            image: menu.menuImage,
          })),
        }));
        setUsageHistory(formattedData);
      } else {
        console.error("Unexpected response format:", response);
        setUsageHistory([]); // 응답이 비정상일 때 빈 배열로 설정
      }
    } catch (err) {
      console.error("이용내역 호출 오류:", err);
      setUsageHistory([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    if (layoutWidth > 0) {
      setInfoWidth(layoutWidth);
    }
    fetchHistory();
  }, [layoutWidth]);

  const renderItem = ({ item }) => {
    const handleLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setLayoutWidth(width);
    };

    const isLongName = infoWidth > 0 && item.name.length > infoWidth / 15;
    const nameStyle = isLongName ? styles.longName : styles.name;

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("UsageDetail", { item })}
        >
          <Image source={{ uri: item.details[0]?.image }} style={styles.image} />
          <View style={styles.info} onLayout={handleLayout}>
            <View style={styles.nameRow}>
              <Text
                  style={nameStyle}
                  numberOfLines={isLongName ? 1 : undefined}
                  ellipsizeMode={isLongName ? "tail" : undefined}
              >
                {item.name}
              </Text>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
            <Text style={styles.date}>방문 날짜: {item.date}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  return (
      <View style={styles.container}>
        {usageHistory.length > 0 ? (
            <FlatList
                data={usageHistory}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>이용 내역이 없습니다.</Text>
            </View>
        )}
        <NavBar />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  longName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    width: "70%",
  },
  typeText: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#FFF9C4",
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default UsageHistory;