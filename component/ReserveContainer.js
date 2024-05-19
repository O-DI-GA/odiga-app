import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const ReserveContainer = ({ imageUrl, shopName, statusMsg, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.shopName}>{shopName}</Text>
        <Text style={styles.statusMsg}>{statusMsg}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="arrow-right" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    height: 70,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusMsg: {
    fontSize: 15,
    color: "#000000",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  arrowIcon: {
    fontSize: 20,
    color: "#ffffff",
    backgroundColor: "#042628",
    borderRadius: 10,
    padding: 5,
  },
});

export default ReserveContainer;
