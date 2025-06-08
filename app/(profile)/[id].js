import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const projects = [
  {
    id: "2",
    title: "Tree Planting Drive",
    description: "Goal: 10,000 trees across rural schools by year-end.",
    coverImage: "https://source.unsplash.com/featured/?forest,trees",
  },
];

const ViewProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [avatar, setAvatar] = useState("");
  const [full_name, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      getProfile();
      getPosts();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`profession, bio, avatar, full_name`)
        .eq("user_id", id)
        .single();

      if (data) {
        console.log(id);
        console.log(data);
        setAvatar(data.avatar);
        setFullName(data.full_name);
        setProfession(data.profession);
        setBio(data.bio);
      }

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");
      let { data, error } = await supabase
        .from("posts")
        .select(`id, activity, created_at`)
        .eq("user_id", id);
      if (data) {
        setPosts(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (id === user?.id) {
    return <Redirect href="/(tabs)/profile" />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{full_name}</Text>
        <Text style={styles.profession}>{profession}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>

      <Text style={styles.sectionTitle}>Posts</Text>
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.postContent}>{post.activity}</Text>
          <Text style={styles.likes}> {post.created_at}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Projects</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <Image
            source={{ uri: project.coverImage }}
            style={styles.projectImage}
          />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FCFA",
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#14B869",
  },
  profession: {
    fontSize: 14,
    color: "#666",
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  postImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  likes: {
    fontSize: 12,
    color: "#777",
  },
  projectCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
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
  logoutButton: {
    marginTop: 24,
  },

  logoutButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "500",
  },
});
