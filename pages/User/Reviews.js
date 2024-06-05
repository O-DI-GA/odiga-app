import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import NavBar from "../../component/NavBar";
import ReviewBox from "../../component/ReviewBox";

const Reviews = ({ navigation }) => {
  // 가상의 리뷰 데이터
  const reviews = [
    { id: 1, author: "John Doe", content: "Great restaurant!" },
    { id: 2, author: "Jane Smith", content: "Excellent service!" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>총 {reviews.length}개</Text>
      <FlatList
        style={styles.list}
        data={reviews}
        renderItem={({ item }) => (
          <ReviewBox
            key={item.id}
            author={item.author}
            content={item.content}
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
