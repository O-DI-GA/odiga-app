import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/logoBackground.png")}
        style={styles.logo}
      />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <TouchableOpacity>
        <Icon
          name="bell-o"
          size={25}
          color="#97A2B0"
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginTop: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#E6EBF2",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  notificationIcon: {
    marginLeft: 10,
  },
});

export default Header;
