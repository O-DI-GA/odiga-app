import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/Ionicons";

function KeepBtn() {
    const [keepState, setKeepState] = React.useState(false);

    // 찜 버튼 클릭
    const handlePress = () => {
        setKeepState(!keepState);
    };
    return (
        <Shadow startColor={"#06333610"}>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.keepBtn}>
                    <Icon
                        name={keepState ? "heart" : "heart-outline"}
                        size={20}
                        color={keepState ? "#FFD600" : "#000000"}
                        style={{ margin: 0 }}
                    />
                </View>
            </TouchableOpacity>
        </Shadow>
    );
}

const styles = StyleSheet.create({
    keepBtn: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 35,
        height: 33,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
    },
});

export default KeepBtn;
