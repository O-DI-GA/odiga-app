import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route.name);

  useEffect(() => {
    setActiveTab(route.name);
  }, [route.name]);

  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Main")}
        >
          <Icon
            name="home"
            size={25}
            color={activeTab === "Main" ? "#000000" : "#aaaaaa"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("WaitingList")}
        >
          <Icon
            name="clock-o"
            size={25}
            color={activeTab === "WaitingList" ? "#000000" : "#aaaaaa"}
          />
        </TouchableOpacity>
        <View style={styles.qrButtonWrapper}>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => navigation.navigate("QRScan")}
          >
            <Icon name="qrcode" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Map")}
        >
          <Icon
            name="map-marker"
            size={25}
            color={activeTab === "Map" ? "#000000" : "#aaaaaa"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyPage")}
        >
          <Icon
            name="user-o"
            size={25}
            color={activeTab === "MyPage" ? "#000000" : "#aaaaaa"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 9,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrButtonWrapper: {
    position: "absolute",
    top: -35,
    left: "50%",
    marginLeft: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
  qrButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#424242",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default NavBar;
