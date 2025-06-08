import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProjectDetailScreen = () => {
  const [donationAmount, setDonationAmount] = useState("");

  // Dummy project data
  const project = {
    title: "Solar Power for Rural Schools",
    description:
      "This project aims to provide solar kits to schools in off-grid villages to ensure uninterrupted education.",
    coverImage: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
    budget: "$10,000",
    impact:
      "Reduce carbon emissions and enable quality education in 5+ schools.",
    creator: "Jane Doe",
    createdAt: "June 5, 2025",
  };

  const handleDonate = () => {
    console.log(`Donated ${donationAmount}`);
    // Add logic to integrate with payment gateway
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.creator}>
          By {project.creator} • {project.createdAt}
        </Text>
        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>{project.description}</Text>
        <Text style={styles.sectionLabel}>Budget</Text>
        <Text style={styles.description}>{project.budget}</Text>
        <Text style={styles.sectionLabel}>Expected Environmental Impact</Text>
        <Text style={styles.description}>{project.impact}</Text>

        <View style={styles.donateSection}>
          <Text style={styles.sectionLabel}>Support this Project</Text>
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            value={donationAmount}
            onChangeText={setDonationAmount}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleDonate} style={styles.donateButton}>
            <Text style={styles.donateText}>Donate</Text>
          </TouchableOpacity>
          <Text style={styles.transparencyNote}>
            We value transparency. Your donations are secure and fully
            traceable.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FCFA",
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#14B869",
    marginBottom: 4,
  },
  creator: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  sectionLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  donateSection: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
    marginBottom: 12,
  },
  donateButton: {
    backgroundColor: "#14B869",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  donateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  transparencyNote: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    lineHeight: 18,
  },
});
