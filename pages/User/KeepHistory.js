import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import NavBar from "../../component/NavBar";
import KeepBtn from "../../component/KeepBtn";
import { getTokenRequest } from "../../utils/api/api";

const KeepHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTokenRequest("api/v1/user/like/list");
        console.log(response);
        if (response && response.data) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.storeTitleImageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.category}>{item.storeCategory}</Text>
        <Text style={styles.name}>{item.storeName}</Text>
      </View>
      {/* <KeepBtn/> */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>총 {data.length}개</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.storeId.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  totalCount: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  category: {
    fontSize: 16,
    color: "#666",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "auto",
  },
});

export default KeepHistory;
