import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Main from "./pages/Main";
import WaitingList from "./pages/Waiting/WaitingList";
import QRScan from "./component/QRScan";
import Map from "./pages/Map";
import MyPage from "./pages/User/MyPage";
import UsageHistory from "./pages/User/UsageHistory";
import KeepHistory from "./pages/User/KeepHistory";
import Reviews from "./pages/User/Reviews";
import Setting from "./pages/User/Setting";

import ShopDetail from "./pages/Shop/ShopDetail";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center", // 헤더 타이틀 가운데 정렬
          headerTransparent: true, // 헤더 투명하게
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
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
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Map" component={Map} options={{ title: "" }} />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ title: "마이페이지" }}
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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
