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

import * as ImagePicker from "expo-image-picker";

import { getTokenRequest, putRequest } from "../../utils/api/api";
import { useNavigation } from "@react-navigation/native";

// 화면 크기
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 2;
const imageHeight = imageWidth;

export default function EditProfile() {
    const navigation = useNavigation();

    const [nickname, setNickname] = React.useState(); // 현재 닉네임
    const [profileImageUrl, setProfileImageUrl] = React.useState(); // 현재 이미지 주소

    const [changeName, setChangeName] = React.useState(""); // 바꿀 닉네임
    const [imageUrl, setImageUrl] = React.useState(""); // 바꿀 이미지 주소

    // 권한 요청
    const [status, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();

    const uploadImage = async () => {
        // 권한 확인
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });

        if (result.canceled) {
            return null;
        }

        console.log(result);
        handleImagePickerResult(result);
    };

    // img uri 가져오기
    const handleImagePickerResult = (result) => {
        if (result && result.assets && result.assets.length > 0) {
            const { uri } = result.assets[0];
            setImageUrl(uri);
        }
    };

    // 현재 사용자 정보 불러오기
    React.useEffect(() => {
        // 마이페이지 API
        const getProfile = async () => {
            try {
                const response = await getTokenRequest("api/v1/user/profile");
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

    // 프로필 수정하기
    const onProfileChange = async () => {
        console.log("바꿀 이미지 주소 : ", imageUrl);
        const formData = new FormData();
        if (imageUrl) {
            const filename = imageUrl.split("/").pop();
            // const match = /\.(\w+)$/.exec(filename);
            // const fileType = match ? `image/${match[1]}` : `image`;
            formData.append("profileImageUrl", {
                uri: imageUrl,
                name: filename,
                type: "image/jpg",
            });
        }
        formData.append("nickname", changeName || nickname);
        console.log("formData: ", JSON.stringify(formData, null, 2));

        try {
            const response = await putRequest(
                "api/v1/user/profile/edit",
                formData
            );
            console.log("프로필 업데이트 응답 : ", response);
            if (response.httpStatusCode) {
                navigation.navigate("MyPage");
            }
        } catch (err) {
            console.log("프로필 업데이트 오류 : ", err);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.profileContainer}
                onPress={() => {
                    uploadImage();
                }}>
                <Image
                    source={{ uri: imageUrl ? imageUrl : profileImageUrl }}
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
                    onChangeText={setChangeName}
                    placeholder={nickname}
                    placeholderTextColor="#8E8E93"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        onProfileChange();
                    }}>
                    <Text> 저장하기 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancleButton}
                    onPress={() => {
                        navigation.navigate("MyPage");
                    }}>
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
        right: -20,
        bottom: -30,
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
