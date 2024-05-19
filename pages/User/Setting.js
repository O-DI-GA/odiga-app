import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const Setting = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isCameraEnabled, setCameraEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>알림</Text>
        <SwitchToggle
          switchOn={isNotificationEnabled}
          onPress={() => setNotificationEnabled(!isNotificationEnabled)}
          circleColorOff="#f4f3f4"
          circleColorOn="#ffffff"
          backgroundColorOn="#ffd600"
          backgroundColorOff="#767577"
          containerStyle={styles.toggleContainer}
          circleStyle={styles.toggleCircle}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>위치 정보</Text>
        <SwitchToggle
          switchOn={isLocationEnabled}
          onPress={() => setLocationEnabled(!isLocationEnabled)}
          circleColorOff="#f4f3f4"
          circleColorOn="#ffffff"
          backgroundColorOn="#ffd600"
          backgroundColorOff="#767577"
          containerStyle={styles.toggleContainer}
          circleStyle={styles.toggleCircle}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>카메라 권한</Text>
        <SwitchToggle
          switchOn={isCameraEnabled}
          onPress={() => setCameraEnabled(!isCameraEnabled)}
          circleColorOff="#f4f3f4"
          circleColorOn="#ffffff"
          backgroundColorOn="#ffd600"
          backgroundColorOff="#767577"
          containerStyle={styles.toggleContainer}
          circleStyle={styles.toggleCircle}
        />
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    fontSize: 18,
  },
  toggleContainer: {
    width: 50,
    height: 25,
    borderRadius: 25,
    padding: 5,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Setting;
