import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

/**
 * API 통신 추가하기
 *  1. 가게 id prpos로 받기?
 */

function KeepBtn() {
    const [keepState, setKeepState] = React.useState(false);

    // 찜 버튼 클릭
    const handlePress = () => {
        setKeepState(!keepState);
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <View>
                <Icon
                    name={keepState ? "heart" : "heart-outline"}
                    size={23}
                    color={keepState ? "#FFD600" : "#000000"}
                />
            </View>
        </TouchableOpacity>
    );
}

export default KeepBtn;
