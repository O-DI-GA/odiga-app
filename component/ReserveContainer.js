import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { deleteRequest } from "../utils/api/api";

const ReserveContainer = ({
  imageUrl,
  shopName,
  type,
  waitingCnt,
  date,
  time,
  numPeople,
  onPress,
  waitingId,
  onCancel,
}) => {
  // 웨이팅 || 예약 취소하기
  const handleCancleClick = async () => {
    // console.log(type === "reservation" ? "예약 취소" : "웨이팅 취소");
    // console.log(`waiting id : ${waitingId}`); // 웨이팅 아이디 확인
    try {
      const response = await deleteRequest(`api/v1/user/waiting/${waitingId}`);
      console.log("웨이팅 취소 응답:", response);
      onCancel(); // 취소 후 새로고침
    } catch (error) {
      console.error("웨이팅 취소 에러:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.shopContainer}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.shopName} numberOfLines={1} ellipsizeMode="tail">
            {shopName}
          </Text>
          <Text style={styles.statusMsg}>
            {type === "waiting"
              ? `현재 ${waitingCnt}팀 남았어요!`
              : `${date} ${time} 예약`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() =>
            onPress({
              imageUrl,
              shopName,
              type,
              waitingCnt,
              date,
              time,
              numPeople,
            })
          }
        >
          <Icon name="arrow-right" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          type === "reservation" && styles.reservationCancelButton,
        ]}
        onPress={handleCancleClick}
      >
        <Text
          style={[
            styles.buttonText,
            type === "reservation" && styles.reservationCancelButtonText,
          ]}
        >
          {type === "reservation" ? "예약 취소" : "웨이팅 취소"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 9,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  shopContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusMsg: {
    fontSize: 15,
    color: "#FF9900",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
  },
  arrowIcon: {
    fontSize: 20,
    color: "#ffffff",
    backgroundColor: "#042628",
    borderRadius: 10,
    padding: 5,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFD600",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  reservationCancelButton: {
    backgroundColor: "#F7F5F0",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  reservationCancelButtonText: {
    color: "#000000",
  },
});

export default ReserveContainer;
