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
        <TouchableOpacity style={styles.buttonContainer}>
          <Button title="Login" onPress={() => {}} />
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
    color: "#ffffff",
    borderRadius: 5,
    overflow: "hidden",
  },
  signupText: {
    color: "#959494",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
