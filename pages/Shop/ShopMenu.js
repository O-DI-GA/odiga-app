import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React from "react";
import MenuBox from "../../component/MenuBox";
import { useNavigation } from "@react-navigation/native";

import { getRequest } from "../../utils/api/api";

export default function ShopMenu({ route }) {
    const navigation = useNavigation();
    const { id } = route.params || {}; // 선택한 가게의 id

    const [menus, setMenus] = React.useState([]);

    React.useEffect(() => {
        const fetchMenus = async () => {
            try {
                // 가게 메뉴 API
                const response = await getRequest(`api/v1/store/${id}/menus`);
                setMenus(response.data);
            } catch (error) {
                console.log("가게 메뉴 에러 : ", error);
            }
        };
        fetchMenus();
    }, [id]);

    const renderCategory = ({ item }) => (
        <View style={styles.categoryView}>
            <Text style={styles.categoryName}>{item.categoryName}</Text>
            <MenuBox menuItems={item.menuList} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={menus}
                renderItem={renderCategory}
                keyExtractor={(category) => category.categoryName}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Reservation")}>
                    <Text style={styles.buttonText}>예약하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Waiting")}>
                    <Text style={styles.buttonText}>웨이팅하기</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#FFFFFF",
        padding: 5,
        marginTop: 30,
    },
    button: {
        backgroundColor: "#FFD700",
        width: 170,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
