import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function MenuBox({ menuItems, onPress }) {
  React.useEffect(() => {
    // console.log("메뉴박스 : ", menuItems);
  }, []);

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.menuName}</Text>
        </View>
        <Text style={styles.price}>{item.menuPrice.toLocaleString()}원</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.menuId.toString()}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text>메뉴가 존재하지 않습니다.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: "#888",
  },
});
