import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getTokenRequest } from "../../utils/api/api";

// 화면 크기
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 2;
const imageHeight = imageWidth;

export default function EditProfile() {
    const [nickname, setNickname] = React.useState();
    const [profileImageUrl, setProfileImageUrl] = React.useState();

    React.useEffect(() => {
        // 마이페이지 API
        const getProfile = async () => {
            try {
                const response = await getTokenRequest(
                    "api/v1/user/auth/profile"
                );
                console.log("프로필 수정 응답 : ", response);

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
            <TouchableOpacity style={styles.profileContainer}>
                <Image
                    source={{ uri: profileImageUrl }}
                    style={styles.profileImage}
                />
                <Icon
                    name="pencil-circle"
                    color="#FFD600"
                    size={60}
                    style={styles.editIcon}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.text}>닉네임</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={nickname}
                    placeholderTextColor="#8E8E93"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text> 저장하기 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancleButton}>
                    <Text> 취소하기 </Text>
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
    profileContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 100,
        marginTop: 100,
    },
    profileImage: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 16,
    },
    editIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    textContainer: {
        paddingHorizontal: 50,
        paddingVertical: 80,
    },
    text: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
    },
    buttonContainer: {
        paddingHorizontal: 50,
    },
    saveButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFD600",
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    cancleButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0",
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
});
