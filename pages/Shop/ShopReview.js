import { FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ReviewBox from "../../component/ReviewBox";
import { getRequest } from "../../utils/api/api";

export default function ShopReview({ route, navigation }) {
  const { id } = route.params || {}; // 선택한 가게의 id

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getRequest(`api/v1/guest/store/${id}/reviews`);
        console.log("API Response:", response);
        if (response.data) {
          const validReviews = response.data.filter(
            (review) => review.reviewId
          );
          setReviews(validReviews);
        } else {
          console.error("Error fetching reviews:", response.error);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식으로 변환
  };

  return (
    <FlatList
      style={styles.list}
      data={reviews}
      renderItem={({ item }) => (
        <ReviewBox
          key={item.reviewId}
          date={formatDate(item.createDate)} // 날짜만 전달
          star={item.rating}
          content={item.content}
          photo={item.imageUrl}
          nickname={item.userNickname}
          userProfileImageUrl={item.userProfileImageUrl}
          navigation={navigation}
        />
      )}
      keyExtractor={(item) => item.reviewId.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});
