import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../component/NavBar";

import { getTokenRequest } from "../../utils/api/api";
import defaultProfileImage from "../../assets/defaultProfileImage.png";
import { useAuth } from "../../utils/AuthContext";
import { logoutAPI } from "../../utils/useAuthUtils";

const MyPage = () => {
  const navigation = useNavigation();

  const [nickname, setNickname] = React.useState();
  const [profileImageUrl, setProfileImageUrl] = React.useState();
  const { isLogged, setIsLogged } = useAuth();

  React.useEffect(() => {
    // 마이페이지 API
    const getProfile = async () => {
      if (isLogged) {
        try {
          const response = await getTokenRequest("api/v1/user/profile");
          console.log("마이페이지 응답 : ", response);

          const { nickname, profileImageUrl } = response.data;
          setNickname(nickname);
          setProfileImageUrl(profileImageUrl);
        } catch (err) {
          console.log(err);
          setIsLogged(false);
        }
      }
    };
    getProfile();
  }, [isLogged]);

  const handleLogout = async () => {
    await logoutAPI(setIsLogged);
    navigation.navigate("Main");
  };

  const handleMenuPress = (screen) => {
    if (isLogged) {
      navigation.navigate(screen);
    } else {
      Alert.alert("로그인 필요", "로그인 후 이용해 주세요.", [
        { text: "확인" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.profileContainer}>
          <Image
            source={
              isLogged && profileImageUrl
                ? { uri: profileImageUrl }
                : defaultProfileImage
            }
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            {isLogged ? (
              <>
                <Text style={styles.nickname}>{nickname}</Text>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}>
                  <Text style={styles.profileButtonText}>프로필 수정</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginPrompt}>로그인 후 이용해주세요.</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => handleMenuPress("UsageHistory")}>
            <Text style={styles.menuItem}>이용{"\n"}내역</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => handleMenuPress("KeepHistory")}>
            <Text style={styles.menuItem}>찜{"\n"}내역</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => handleMenuPress("Reviews")}>
            <Text style={styles.menuItem}>리뷰{"\n"}관리</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => handleMenuPress("Setting")}>
            <Text style={styles.menuItem}>설정</Text>
          </TouchableOpacity>
        </View>
        {isLogged && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        )}
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
  box: {
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 40,
  },
  profileInfo: {
    flexDirection: "column",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileButton: {
    backgroundColor: "#FFD600",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  profileButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginPrompt: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 25,
    flexWrap: "wrap",
  },
  menuItemContainer: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 20,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyPage;
