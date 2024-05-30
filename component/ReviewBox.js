import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import profile from "../assets/icon.png";
import sushi_01 from "./test_img/sushi_01.jpg";
import test_img from "./test_img/test_img.jpg";
import test_img2 from "./test_img/test_img2.jpg";

const review = [
    {
        id: 1,
        date: "2024년 5월 10일",
        star: 4,
        content: "맛있어요^^ 정말^^ 최고의..맛!",
        photo: sushi_01,
        nickname: "김형준",
        store: "명륜진사갈비",
        profile: profile,
    },
    {
        id: 2,
        date: "2024년 5월 12일",
        star: 3,
        content: "전 그저 그랬네요~",
        photo: test_img,
        nickname: "동영배",
        profile: profile,
    },
    {
        id: 3,
        date: "2024년 5월 27일",
        star: 5,
        content: "너무 맛있습니다",
        photo: test_img2,
        nickname: "강대성",
        profile: profile,
    },
    {
        id: 4,
        date: "2024년 5월 30일",
        star: 2,
        content: "너무 더워요",
        photo: test_img,
        nickname: "권지용",
        profile: profile,
    },
];

const ReviewContainer = ({ item }) => {
    // 평점 별 찍기
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < Math.floor(item.star) ? (
            <Icon key={index} name="star" size={18} color="#FFD600" />
        ) : (
            <Icon key={index} name="staro" size={18} color="#FFD600" />
        )
    );

    return (
        <View style={styles.reviewContainer}>
            <View>
                <View style={styles.user}>
                    <Image source={item.profile} style={styles.profile} />
                    <Text>{item.nickname}</Text>
                </View>
                <Text style={styles.date}>작성 일자 : {item.date}</Text>
            </View>
            <Image source={item.photo} style={styles.reviewPhoto} />
            <View style={styles.starContainer}>{stars}</View>
            <Text> {item.content} </Text>
        </View>
    );
};

const ReviewBox = () => {
    return (
        <FlatList
            data={review}
            renderItem={({ item }) => <ReviewContainer item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
        />
    );
};

export default ReviewBox;

const styles = StyleSheet.create({
    flatListContainer: {
        flexGrow: 1,
        paddingVertical: 30,
        gap: 20,
    },
    reviewContainer: {
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-between",
        borderWidth: 1,
        padding: 20,
        borderColor: "#ccc",
        gap: 20,
    },
    date: {
        fontSize: 11,
    },
    starContainer: {
        flexDirection: "row",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        width: "100%",
        gap: 10,
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 100,
    },
    reviewPhoto: {
        maxWidth: "100%",
        height: 150, // 고정된 높이 설정
        maxHeight: 200, // 최대 높이 설정
        resizeMode: "cover",
    },
});
