import { postRequest } from "./api/api";
import { storeTokens } from "./tokenUtils";

// 로그인 API
export async function loginAPI(loginData) {
  console.log(`로그인 :`, loginData); // login Data 콘솔 확인
  const response = await postRequest("api/v1/user/auth/login", loginData);
  if (response.httpStatusCode === 200) {
    await storeTokens(response.data.accessToken, response.data.refreshToken);
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
