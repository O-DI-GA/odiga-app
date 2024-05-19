import "react-native-gesture-handler";
import React from "react";
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

import ShopDetail from "./pages/Shop/ShopDetail";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false, // 헤더 숨김
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="WaitingList" component={WaitingList} />
                <Stack.Screen name="QRScan" component={QRScan} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="MyPage" component={MyPage} />

                <Stack.Screen name="ShopDetail" component={ShopDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
