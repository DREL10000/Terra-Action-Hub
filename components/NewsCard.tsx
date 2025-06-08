import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NewsCardProps {
  title: string;
  id: number;
  description: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, image }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.cover} />

      <View style={styles.content}>
        <Text style={styles.heading} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    backgroundColor: "#F7FCFA",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cover: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D1C14",
  },
  description: {
    fontSize: 14,
    color: "#4F9673",
    marginTop: 4,
  },
});
