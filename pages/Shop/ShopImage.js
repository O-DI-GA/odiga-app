import React from "react";
import { StyleSheet, View, Image, FlatList, Dimensions } from "react-native";

import { getRequest } from "../../utils/api/api";

const { width } = Dimensions.get("window");

export default function ShopImage({ route }) {
    const { id } = route.params || {}; // 선택한 가게의 id
    const [images, setImages] = React.useState([]); // 받아온 이미지를 상태로 관리

    const fetchShopImage = async () => {
        try {
            const response = await getRequest(`api/v1/store/${id}/images`);
            // console.log("가게 이미지 조회 api:", response);

            if (response.httpStatusCode === 200 && Array.isArray(response.data)) {
                // API 응답의 이미지를 상태로 설정
                const formattedImages = response.data.map((item, index) => ({
                    id: index.toString(), // 각 이미지의 고유 ID
                    src: { uri: item.storeImagesUrl }, // 네트워크 이미지를 위한 URI 객체
                }));
                setImages(formattedImages);
            }
        } catch (err) {
            console.error("가게 이미지 불러오기 오류:", err);
        }
    };

    React.useEffect(() => {
        fetchShopImage();
    }, [id]);

    return (
        <FlatList
            data={images}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image source={item.src} style={styles.image} />
                </View>
            )}
            keyExtractor={(item) => item.id}
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