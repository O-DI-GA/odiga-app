import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

const ToggleSwitch = ({ isEnabled, onToggle }) => {
  const [animation] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const toggleSwitch = () => {
    Animated.timing(animation, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onToggle(!isEnabled);
    });
  };

  const toggleColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f0f0f0", "#ffd600"],
  });

  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.toggleContainer}>
      <Animated.View
        style={[styles.toggleBackground, { backgroundColor: toggleColor }]}
      >
        <Animated.View
          style={[
            styles.toggleCircle,
            { transform: [{ translateX: circlePosition }] },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const Setting = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isCameraEnabled, setCameraEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>알림</Text>
        <ToggleSwitch
          isEnabled={isNotificationEnabled}
          onToggle={setNotificationEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>위치 정보</Text>
        <ToggleSwitch
          isEnabled={isLocationEnabled}
          onToggle={setLocationEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>카메라 권한</Text>
        <ToggleSwitch isEnabled={isCameraEnabled} onToggle={setCameraEnabled} />
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
    width: 55,
    height: 33,
    borderRadius: 25,
    justifyContent: "center",
    padding: 3,
  },
  toggleBackground: {
    flex: 1,
    borderRadius: 25,
    justifyContent: "center",
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
});

export default Setting;
