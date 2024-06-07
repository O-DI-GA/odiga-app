import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ReviewContainer = ({ item, navigation, type, onDelete, onEdit }) => {
  const isMyReview = type === "myReview";

  const handleDelete = async () => {
    try {
      await deleteRequest(`api/v1/reviews/${item.reviewId}`); // 수정
      onDelete(item.reviewId);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = async (updatedReview) => {
    try {
      await putRequest(`api/v1/reviews/${item.reviewId}`, updatedReview); // 수정
      onEdit(updatedReview);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  // 평점 별 찍기
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < Math.floor(item.rating) ? (
      <Icon key={index} name="star" size={18} color="#FFD600" />
    ) : (
      <Icon key={index} name="staro" size={18} color="#FFD600" />
    )
  );

  return (
    <View style={styles.reviewContainer}>
      {isMyReview ? (
        <Text style={styles.storeName}>{item.store}</Text>
      ) : (
        <View style={styles.user}>
          <Image
            source={{ uri: item.userProfileImageUrl }}
            style={styles.profile}
          />
          <Text>{item.userNickname}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.date}>작성 일자 : {item.createDate}</Text>
        {isMyReview && (
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={styles.editButton}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.deleteButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.reviewPhoto} />
      <View style={styles.starContainer}>{stars}</View>
      <Text>{item.content}</Text>
    </View>
  );
};

const ReviewBox = ({
  date,
  star,
  content,
  photo,
  nickname,
  userProfileImageUrl,
  navigation,
}) => {
  const item = {
    createDate: date,
    rating: star,
    content: content,
    imageUrl: photo,
    userNickname: nickname,
    userProfileImageUrl: userProfileImageUrl,
  };

  return <ReviewContainer item={item} navigation={navigation} />;
};

export default ReviewBox;

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    gap: 20,
  },
  reviewContainer: {
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 20,
    borderColor: "#ccc",
    borderRadius: 16,
    gap: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 13,
  },
  starContainer: {
    flexDirection: "row",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    width: "100%",
    gap: 10,
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  reviewPhoto: {
    maxWidth: "100%",
    height: 150, // 고정된 높이 설정
    maxHeight: 200, // 최대 높이 설정
    resizeMode: "cover",
  },
  storeName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "#FFF9c4",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#FFF9c4",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
