import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import React from "react";

const DATA = [
    { id: "1", name: "양념갈비", price: "9,000원" },
    { id: "2", name: "냉면", price: "6,000원" },
    { id: "3", name: "소고기", price: "13,000원" },
];

export default function MenuBox() {
    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {DATA.map((item) => (
                <View key={item.id} style={styles.item}>
                    <Image
                        source={require("../assets/icon.png")}
                        style={styles.image}
                    />
                    <View style={styles.info}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 5,
    },
    item: {
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        fontSize: 14,
        color: "#888",
    },
});
