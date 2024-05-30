import React from "react";
import { StyleSheet, View, Image, FlatList, Dimensions } from "react-native";

import shushi_01 from "../../component/test_img/sushi_01.jpg";
import test_img from "../../component/test_img/test_img.jpg";
import test_img2 from "../../component/test_img/test_img2.jpg";

const { width } = Dimensions.get("window");

const images = [
    { id: 1, src: shushi_01 },
    { id: 2, src: test_img },
    { id: 3, src: test_img2 },
    { id: 4, src: shushi_01 },
    { id: 5, src: test_img2 },
    { id: 6, src: test_img },
    { id: 7, src: shushi_01 },
];

export default function ShopImage() {
    return (
        <FlatList
            data={images}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image source={item.src} style={styles.image} />
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 15,
        paddingHorizontal: 1,
    },
    imageContainer: {
        flex: 1,
        flexDirection: "column",
        margin: 2,
        height: width / 2 - 4,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 20,
    },
});
