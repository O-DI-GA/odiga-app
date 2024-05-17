import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import WaitingContainer from "../component/WaitingContainer";
import ShopContainer from "../component/ShopContainer";

const Main = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.label}>내 웨이팅</Text>
                <WaitingContainer />
                <Text style={styles.label}>
                    현재 내 주변에서 웨이팅 가장 많은 곳
                </Text>
                <ShopContainer type="waiting" />
                <Text style={styles.label}>후기 많은 순</Text>
                <ShopContainer type="review" />
                <Text style={styles.label}>인기순</Text>
                <ShopContainer type="popular" />
            </ScrollView>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 110,
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollContent: {
        paddingLeft: 20,
    },
});

export default Main;
