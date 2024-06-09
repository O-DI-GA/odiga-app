import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import NavBar from "../component/NavBar";
import { getRequest } from "../utils/api/api";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      // 위치 서비스가 활성화되어 있는지 확인
      const { locationServicesEnabled } =
        await Location.getProviderStatusAsync();
      if (!locationServicesEnabled) {
        Alert.alert(
          "위치 서비스 비활성화",
          "위치 서비스가 비활성화되어 있습니다. 위치 서비스를 켜주세요.",
          [{ text: "확인" }]
        );
        return;
      }

      // 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // 현재 위치 가져오기
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01, // 줌 레벨
        longitudeDelta: 0.01, // 줌 레벨
      });
      console.log("Current Location:", currentLocation.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchStoresData = async () => {
      if (region) {
        const radius = calculateRadius();
        const fetchedStores = await fetchStores(
          region.latitude,
          region.longitude,
          radius
        );
        setStores(fetchedStores);
      }
    };
    fetchStoresData();
  }, [region]);

  const calculateRadius = () => {
    // 현재 반경 계산
    if (!region) return null;

    const { latitudeDelta, longitudeDelta, latitude } = region;

    // 위도와 경도를 거리로 변환하는 데 사용하는 상수
    const LATITUDE_DEGREE_TO_KM = 111.32; // 1도 위도의 거리는 약 111.32킬로미터
    const longitudeDegreeToKm =
      LATITUDE_DEGREE_TO_KM * Math.cos((latitude * Math.PI) / 180);

    // delta 값을 사용하여 화면의 반경 계산
    const radiusInKm =
      Math.sqrt(
        Math.pow(latitudeDelta * LATITUDE_DEGREE_TO_KM, 2) +
          Math.pow(longitudeDelta * longitudeDegreeToKm, 2)
      ) / 2;

    return radiusInKm * 1000; // 미터로 변환
  };

  // 현재 위치와 반경 정보를 받아와서 가게 데이터를 가져오는 함수
  const fetchStores = async (latitude, longitude, radius) => {
    try {
      const fetchData = await getRequest(
        `api/v1/stores?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      console.log("fetchData:", fetchData);
      if (fetchData && fetchData.data) {
        return fetchData.data.stores;
      } else {
        console.error("Valid data was not returned");
        return [];
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

  const radius = calculateRadius();

  if (location === null) {
    return (
      <View style={styles.loadingContainer}>
        <NavBar />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const userLocation = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.005, // 초기 줌 레벨
    longitudeDelta: 0.005, // 초기 줌 레벨
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={userLocation}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Location"
          description="location description"
        />
        {stores.map((store, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={store.description}
          />
        ))}
      </MapView>
      <NavBar />
      {radius && (
        <View style={styles.radiusContainer}>
          <Text style={styles.radiusText}>
            현재 반경: {radius.toFixed(2)} m
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  radiusContainer: {
    position: "absolute",
    bottom: 100,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  radiusText: {
    fontSize: 16,
  },
});

export default Map;
