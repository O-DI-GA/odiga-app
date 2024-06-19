import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import NavBar from "../../component/NavBar";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

const getStatusText = (status) => {
  switch (status) {
    case "granted":
      return "허용";
    case "denied":
    case "undetermined":
    default:
      return "허용 안함";
  }
};

const Setting = () => {
  const [notificationStatus, setNotificationStatus] = useState("loading");
  const [locationStatus, setLocationStatus] = useState("loading");
  const [cameraStatus, setCameraStatus] = useState("loading");
  const [loading, setLoading] = useState(true);

  const checkPermissions = async () => {
    // 현재 권한 상태 가져오기
    const { status: notifStatus } = await Notifications.getPermissionsAsync();
    setNotificationStatus(notifStatus);

    const { status: locStatus } =
      await Location.getForegroundPermissionsAsync();
    setLocationStatus(locStatus);

    const { status: camStatus } = await Camera.getCameraPermissionsAsync();
    setCameraStatus(camStatus);
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        await checkPermissions();
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handlePressNotification = async () => {
    if (notificationStatus === "granted") {
      openAppSettings();
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "denied") {
        openAppSettings();
      } else {
        setNotificationStatus(status);
      }
    }
  };

  const handlePressLocation = async () => {
    if (locationStatus === "granted") {
      openAppSettings();
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "denied") {
        openAppSettings();
      } else {
        setLocationStatus(status);
      }
    }
  };

  const handlePressCamera = async () => {
    if (cameraStatus === "granted") {
      openAppSettings();
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "denied") {
        openAppSettings();
      } else {
        setCameraStatus(status);
      }
    }
  };

  const openAppSettings = () => {
    Alert.alert(
      "설정 열기",
      "처음 권한 요청을 거부했거나, 이미 허용된 권한을 다시 거부하려는 경우 설정으로 이동해야 합니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "설정 열기",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handlePressNotification}
      >
        <Text style={styles.settingText}>알림 권한</Text>
        <Text style={styles.statusText}>
          {getStatusText(notificationStatus)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handlePressLocation}
      >
        <Text style={styles.settingText}>위치 권한</Text>
        <Text style={styles.statusText}>{getStatusText(locationStatus)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={handlePressCamera}>
        <Text style={styles.settingText}>카메라 권한</Text>
        <Text style={styles.statusText}>{getStatusText(cameraStatus)}</Text>
      </TouchableOpacity>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  statusText: {
    fontSize: 18,
    color: "#777",
  },
});

export default Setting;
