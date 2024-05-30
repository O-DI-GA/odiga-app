import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MenuBox from "../../component/MenuBox";
import { useNavigation } from "@react-navigation/native";

export default function ShopMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.categoryView}>
          <Text style={styles.categoryName}> 카테고리 이름1 </Text>
          <MenuBox />
        </View>
        <View>
          <Text style={styles.categoryName}> 카테고리 이름2 </Text>
          <MenuBox />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("Reservation")}
          >
            예약하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("Waiting")}
          >
            웨이팅하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: "100%",
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
