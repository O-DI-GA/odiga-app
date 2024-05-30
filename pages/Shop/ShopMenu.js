import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import MenuBox from "../../component/MenuBox";

export default function ShopMenu() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.categoryView}>
                <Text style={styles.categoryName}> 카테고리 이름1 </Text>
                <MenuBox />
            </View>
            <View>
                <Text style={styles.categoryName}> 카테고리 이름2 </Text>
                <MenuBox />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        height: "100%",
    },
    categoryView: {
        flex: 1,
    },
    categoryName: {
        flex: 1,
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 15,
    },
});
