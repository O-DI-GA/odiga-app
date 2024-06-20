import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./utils/AuthContext";
import * as Linking from "expo-linking";

import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Main from "./pages/Main";
import WaitingList from "./pages/Waiting/WaitingList";
import QRScan from "./component/QRScan";
import Map from "./pages/Map";
import MyPage from "./pages/User/MyPage";
import EditProfile from "./pages/User/EditProfile";
import UsageHistory from "./pages/User/UsageHistory";
import KeepHistory from "./pages/User/KeepHistory";
import Reviews from "./pages/User/Reviews";
import Setting from "./pages/User/Setting";
import Reservation from "./pages/Waiting/Reservation";
import Waiting from "./pages/Waiting/Waiting";
import UsageDetail from "./pages/User/UsageDetail";
import Payment from "./pages/User/Payment";

import ShopDetail from "./pages/Shop/ShopDetail";
import ShopHome from "./pages/Shop/ShopHome";
import ShopImage from "./pages/Shop/ShopImage";
import ShopMenu from "./pages/Shop/ShopMenu";
import ShopReview from "./pages/Shop/ShopReview";
import ShopCart from "./pages/Shop/ShopCart";

const Stack = createStackNavigator();

function App() {
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const linking = {
    prefixes: [Linking.createURL("/"), "odiga://"],
    config: {
      screens: {
        Payment: "payment",
      },
    },
  };

  return (
    <AuthProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerTitleAlign: "center", // 헤더 타이틀 가운데 정렬
            headerTransparent: false, // 헤더 불투명하게
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "로그인" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "회원가입" }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WaitingList"
            component={WaitingList}
            options={{ title: "웨이팅 목록" }}
          />
          <Stack.Screen
            name="QRScan"
            component={QRScan}
            options={{
              title: "QR 코드 스캔",
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#000000",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: "", headerTransparent: true }} // Map 화면에서만 헤더 투명하게
          />
          <Stack.Screen
            name="MyPage"
            component={MyPage}
            options={{ title: "마이페이지" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: "프로필 수정" }}
          />
          <Stack.Screen
            name="UsageHistory"
            component={UsageHistory}
            options={{ title: "이용 내역" }}
          />
          <Stack.Screen
            name="KeepHistory"
            component={KeepHistory}
            options={{ title: "찜 내역" }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{ title: "리뷰 관리" }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ title: "설정" }}
          />
          <Stack.Screen
            name="ShopDetail"
            component={ShopDetail}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen name="ShopHome" component={ShopHome} />
          <Stack.Screen name="ShopImage" component={ShopImage} />
          <Stack.Screen name="ShopMenu" component={ShopMenu} />
          <Stack.Screen name="ShopReview" component={ShopReview} />
          <Stack.Screen
            name="ShopCart"
            component={ShopCart}
            options={{ title: "장바구니" }}
          />
          <Stack.Screen
            name="Reservation"
            component={Reservation}
            options={{ title: "예약" }}
          />
          <Stack.Screen
            name="Waiting"
            component={Waiting}
            options={{ title: "웨이팅" }}
          />
          <Stack.Screen
            name="UsageDetail"
            component={UsageDetail}
            options={{ title: "이용 내역" }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ title: "결제" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
