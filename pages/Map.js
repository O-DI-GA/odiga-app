import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import NavBar from "../component/NavBar";
import { getRequest } from "../utils/api/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("waiting");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);

  const navigation = useNavigation(); // Navigation 객체 가져오기

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
        Alert.alert("권한 거부", "위치 권한이 거부되었습니다.");
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
    })();
  }, []);

  const fetchStoresData = async (region) => {
    if (region) {
      const radius = calculateRadius(region);
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

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterModalVisible(false);
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
            }}
        >
          {stores.map((store) => (
              <Marker
                  key={store.storeId}
                  coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude,
                  }}
              >
                <Callout onPress={() => navigation.navigate("ShopDetail", { id: store.storeId })}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{store.storeName}</Text>
                    <Text style={styles.calloutDescription}>
                      {selectedFilter === "waiting"
                          ? `웨이팅 수: ${store.waitingCount}`
                          : `빈자리 수: ${store.emptyTableCount}`}
                    </Text>
                    <TouchableOpacity style={styles.calloutButton}>
                      <Text style={styles.calloutButtonText}>이동하기</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
          ))}
        </MapView>
        <NavBar />
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
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  calloutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Map;