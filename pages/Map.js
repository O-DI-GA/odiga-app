import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import NavBar from "../component/NavBar";
import { getRequest } from "../utils/api/api";
import { Picker } from "@react-native-picker/picker";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("waiting");
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    (async () => {
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

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation.coords);
      const initialRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);
      setCurrentRegion(initialRegion);
      fetchStoresData(initialRegion); // 처음 지도 화면을 켰을 때 API 호출
      console.log(
        `현재 내 위치 위도: ${currentLocation.coords.latitude}, 경도: ${currentLocation.coords.longitude}`
      );
    })();
  }, []);

  const fetchStoresData = async (region) => {
    if (region) {
      const radius = calculateRadius(region);
      const { latitude, longitude } = region;
      console.log(`현재 지도의 위도: ${latitude}, 경도: ${longitude}`);
      const fetchedStores = await fetchStores(
        region.latitude,
        region.longitude,
        radius
      );
      setStores(fetchedStores);
    }
  };

  const calculateRadius = (region) => {
    if (!region) return null;
    const { latitudeDelta, longitudeDelta, latitude } = region;
    const LATITUDE_DEGREE_TO_KM = 111.32;
    const longitudeDegreeToKm =
      LATITUDE_DEGREE_TO_KM * Math.cos((latitude * Math.PI) / 180);
    const radiusInKm =
      Math.sqrt(
        Math.pow(latitudeDelta * LATITUDE_DEGREE_TO_KM, 2) +
          Math.pow(longitudeDelta * longitudeDegreeToKm, 2)
      ) / 2;
    return radiusInKm * 1000;
  };

  const fetchStores = async (latitude, longitude, radius) => {
    try {
      const fetchData = await getRequest(
        `api/v1/store/map?latitude=${latitude}&longitude=${longitude}`
      );
      console.log("fetchData:", fetchData);
      if (fetchData && fetchData.data) {
        return fetchData.data;
      } else {
        console.error("Valid data was not returned");
        return [];
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

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
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={userLocation}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={(region) => {
          setCurrentRegion(region);
          // fetchStoresData(region); // 지도 위치나 반경 바뀌면 새로 데이터 가져오기
        }}
      >
        {stores.map((store) => (
          <Marker
            key={store.storeId}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.storeName}
            description={
              selectedFilter === "waiting"
                ? `웨이팅 수: ${store.waitingCount}`
                : `빈자리 수: ${store.emptyTableCount}`
            }
          />
        ))}
      </MapView>
      <NavBar />
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>필터 선택: </Text>
        <Picker
          selectedValue={selectedFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="웨이팅 현황" value="waiting" />
          <Picker.Item label="빈자리 현황" value="empty" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.reload}
        onPress={() => fetchStoresData(currentRegion)} // 버튼 누르면 새로 데이터 가져오기
      >
        <Text>현 지도에서 검색</Text>
      </TouchableOpacity>
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
  filterContainer: {
    position: "absolute",
    bottom: 100,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
  reload: {
    position: "absolute",
    top: 40,
    backgroundColor: "#FFF9C4",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
