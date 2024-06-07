import { postRequest } from "./api/api";
import { getTokenFromStorage } from "./tokenUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 로그인 API
export async function loginAPI(loginData) {
  console.log(`로그인 :`, loginData); // login Data 콘솔 확인
  const response = await postRequest("api/v1/user/auth/login", loginData);
  // console.log(response);
  if (response.httpStatusCode === 200) {
    AsyncStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
    return "success";
  } else if (response.httpStatusCode === 400) {
    return "notMatch";
  } else {
    return "notExist";
  }
}

// 회원가입 API
export async function registerAPI(registerData) {
  console.log(`회원가입 : `, registerData);
}

// 토큰 가져오기
export const getTokenFromStroage = async () => {
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
