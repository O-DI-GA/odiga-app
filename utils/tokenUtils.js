import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTokenFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem("tokens");
    if (value !== null) {
      const tokens = JSON.parse(value);
      const accessToken = tokens.accessToken;
      return accessToken;
    } else {
      console.log("토큰 존재 X : return null");
      return null;
    }
  } catch (err) {
    console.log("토큰 가져오기 오류 : ", err);
  }
};
