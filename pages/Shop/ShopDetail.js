import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Ionicons";

/* API 통신
    1. 선택한 가게의 id 받아오기
    2. 가게 id로 api 요청 보내기
    → 지금은 mock 데이터
    3. 지도 모달 띄우기
*/

import { shpoList } from "../../assets/ShopList";
import KeepBtn from "../../component/KeepBtn";

const ShopDetail = ({ route, navigation }) => {
    const { id } = route.params; // 선택한 가게의 id

    // mock 데이터에서 가게 찾기 → API 요청하는 로직으로 수정 필요
    const shop = shpoList.find((item) => item.id === id);

    // 평점 별 찍기
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < Math.floor(shop.star) ? (
            <Icon key={index} name="star" size={18} />
        ) : (
            <Icon key={index} name="staro" size={18} />
        )
    );

    const ShopInfoButton = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.infoBtn} onPress={handleCall}>
                <Icons name="call-outline" size={23} color={"#424242"} />
                <Text style={styles.infoTxt}> 전화 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoBtn}>
                <Icons name="map-outline" size={23} color={"#424242"} />
                <Text style={styles.infoTxt}> 위치 </Text>
            </TouchableOpacity>
            <View style={styles.infoBtn}>
                <KeepBtn />
                <Text style={{ fontSize: 18, marginLeft: 10 }}>
                    {" "}
                    {shop.keep}
                </Text>
            </View>
        </View>
    );

    // 전화 걸기
    const handleCall = () => {
        // 전화번호가 있는 경우에만 전화 걸기
        if (shop.tel) {
            Linking.openURL(`tel:${shop.tel}`);
        } else {
            console.log("전화번호가 없습니다.");
        }
    };

    const MenuBtn = () => (
        <View style={styles.menuContainer}>
            <TouchableOpacity>
                <Text> 홈 </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={shop.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.category}> {shop.category} </Text>
                <Text style={styles.name}> {shop.name} </Text>
                <View style={styles.starContainer}>
                    {stars}
                    <Text style={styles.star}> {shop.star}</Text>
                </View>
                <ShopInfoButton />
                <MenuBtn />
            </View>
            <View style={{ flex: 3, backgroundColor: "white" }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        flexDirection: "column",
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        position: "absolute",
        top: "25%",
        left: 0,
        right: 0,
        height: "70%",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        zIndex: 1,
        padding: 30,
    },
    category: {
        marginBottom: 6,
    },
    name: {
        fontWeight: "bold",
        fontSize: 30,
        margin: -5,
    },
    starContainer: {
        marginTop: 15,
        paddingLeft: 3,
        flexDirection: "row",
        alignItems: "left",
    },
    star: {
        marginLeft: 5,
        fontSize: 15,
    },
    buttonContainer: {
        marginTop: 25,
        marginLeft: 10,
        flexDirection: "row",
    },
    infoBtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    infoTxt: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: -5,
    },
    menuContainer: {
        marginTop: 15,
        paddingLeft: 3,
        flexDirection: "row",
        backgroundColor: "#FFF9C4",
    },
});

export default ShopDetail;
