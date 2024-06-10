import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import NavBar from "../../component/NavBar";
import ReviewBox from "../../component/ReviewBox";
import { getTokenRequest } from "../../utils/api/api";

const Reviews = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getTokenRequest("api/v1/user/reviews");
        console.log("내가 쓴 리뷰 응답: ", response);
        if (response.data) {
          setReviews(response.data);
        } else {
          console.error("Error fetching reviews:", response.error);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식으로 변환
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>총 {reviews.length}개</Text>
      <FlatList
        style={styles.list}
        data={reviews}
        renderItem={({ item }) => (
          <ReviewBox
            key={item.reviewId}
            date={formatDate(item.createDate)}
            star={item.rating}
            content={item.content}
            photo={item.imageUrl}
            nickname={item.userNickname}
            store={item.store} // 가게이름
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  totalCount: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  list: {
    padding: 20,
  },
});

export default Reviews;
