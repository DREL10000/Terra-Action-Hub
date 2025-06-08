import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const projects = [
  {
    id: "1",
    title: "Plastic-Free Beach Campaign",
    description: "Educating communities on reducing plastic waste near oceans.",
    coverImage: "https://source.unsplash.com/featured/?beach,clean",
  },
  {
    id: "2",
    title: "Tree Planting Drive",
    description: "Goal: 10,000 trees across rural schools by year-end.",
    coverImage: "https://source.unsplash.com/featured/?forest,trees",
  },
];

const UserProjectsScreen = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/CreateProject")}
      >
        <Text style={styles.createButtonText}>Start a Project</Text>
      </TouchableOpacity>

      {projects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => router.push("/ProjectDetails")}
            >
              <Text style={styles.viewButtonText}>View Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default UserProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7FCFA",
  },
  createButton: {
    backgroundColor: "#14B869",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  projectCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
  },
  projectImage: {
    width: 100,
    height: "100%",
  },
  projectInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#14B869",
  },
  projectDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: "#14B869",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
