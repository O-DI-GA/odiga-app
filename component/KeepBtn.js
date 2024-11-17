import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  postTokenRequest,
  deleteRequest,
  getTokenRequest,
} from "../utils/api/api";

function KeepBtn({ storeId, onLikeCountChange }) {
  const [keepState, setKeepState] = useState(false);

  // 찜 상태 초기화
  const fetchKeepState = async () => {
    try {
      const response = await getTokenRequest("api/v1/user/like/list");
      if (response && response.data) {
        const isKept = response.data.some((item) => item.storeId === storeId);
        setKeepState(isKept);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchKeepState();
  }, [storeId]);

  const handlePress = async () => {
    try {
      let response;
      if (keepState) {
        // DELETE 요청
        response = await deleteRequest(`api/v1/user/like/${storeId}`);
      } else {
        // POST 요청
        response = await postTokenRequest(`api/v1/user/like/${storeId}`, null);
      }

      if (
        response &&
        (response.httpStatusCode === 201 || response.httpStatusCode === 201)
      ) {
        setKeepState(!keepState);
        if (onLikeCountChange) {
          onLikeCountChange(keepState ? -1 : 1); // 카운트 증가/감소
        }
      } else {
        Alert.alert("오류", "찜 상태를 변경하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error changing keep state:", error);
    }
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
