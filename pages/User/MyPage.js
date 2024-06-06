import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../component/NavBar";

import { getTokenRequest } from "../../utils/api/api";

const MyPage = () => {
    const navigation = useNavigation();

    const [nickname, setNickname] = React.useState();
    const [profileImageUrl, setProfileImageUrl] = React.useState();

    React.useEffect(() => {
        // 마이페이지 API
        const getProfile = async () => {
            try {
                const response = await getTokenRequest(
                    "api/v1/user/auth/profile"
                );
                console.log("마이페이지 응답 : ", response);

                const { nickname, profileImageUrl } = response.data;

                setNickname(nickname);
                setProfileImageUrl(profileImageUrl);
            } catch (err) {
                console.log(err);
            }
        };
        getProfile();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: profileImageUrl }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.nickname}>{nickname}</Text>
                        <TouchableOpacity style={styles.profileButton}>
                            <Text style={styles.profileButtonText}>
                                프로필 수정
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuItemContainer}
                        onPress={() => navigation.navigate("UsageHistory")}>
                        <Text style={styles.menuItem}>이용{"\n"}내역</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItemContainer}
                        onPress={() => navigation.navigate("KeepHistory")}>
                        <Text style={styles.menuItem}>찜{"\n"}내역</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItemContainer}
                        onPress={() => navigation.navigate("Reviews")}>
                        <Text style={styles.menuItem}>리뷰{"\n"}관리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItemContainer}
                        onPress={() => navigation.navigate("Setting")}>
                        <Text style={styles.menuItem}>설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    box: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        borderRadius: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        marginRight: 40,
    },
    profileInfo: {
        flexDirection: "column",
    },
    nickname: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    profileButton: {
        backgroundColor: "#FFD600",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
    },
    profileButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 25,
        flexWrap: "wrap",
    },
    menuItemContainer: {
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    menuItem: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default MyPage;
