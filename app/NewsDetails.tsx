import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

const NewsDetailsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1749221836725-494abefcd2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={styles.cover}
      />

      <Text style={styles.title}>Climate Crisis Reaches Tipping Point</Text>

      <Text style={styles.date}>Published: June 7, 2025</Text>

      <Text style={styles.description}>
        The global climate crisis has reached a critical point, experts say.
        With rising temperatures, melting ice caps, and increasing natural
        disasters, urgent action is required. Scientists warn that without
        immediate intervention, the effects on ecosystems, agriculture, and
        coastal communities will become irreversible. Communities around the
        world are being encouraged to adopt sustainable practices and reduce
        carbon emissions.
      </Text>
    </ScrollView>
  );
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0D1C14",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
});
