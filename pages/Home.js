import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

function Home() {
  return (
    <ImageBackground
      source={require("../assets/LoadingImg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.odigaText}>ODIGA</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Create New Account</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 150,
  },
  odigaText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#424242",
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  signupText: {
    color: "#959494",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
