import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function formatTimeStamp(timestamp) {
  const relativeTime = format(timestamp, "MMM dd, yyyy h:mm a");
  return relativeTime;
}

const SocialFeedScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    if (user) {
      getProfileId();
      getPosts();
    }
  }, [user]);

  const getProfileId = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`id`)
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfileId(data.id);
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
        .select(
          `id, activity, created_at, user_id, profile_id, profiles(full_name)`
        );
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

  const handleAddPost = async () => {
    if (!newActivity.trim()) {
      Alert.alert("Oops", "Please write something to post!");
      return;
    }

    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            activity: newActivity,
            user_id: user.id,
            profile_id: profileId,
          },
        ])
        .select();

      if (data) {
        await getPosts();
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

    setNewActivity("");
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={() => router.push(`/(profile)/${item.user_id}`)}>
          <Text style={styles.userName}> {item.profiles.full_name}</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{formatTimeStamp(item.created_at)}</Text>
      </View>
      <Text style={styles.activityText}>{item.activity}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="What action did you take?"
          value={newActivity}
          onChangeText={setNewActivity}
          style={styles.input}
          multiline
          maxLength={280}
        />
        <TouchableOpacity style={styles.postButton} onPress={handleAddPost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

export default SocialFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: "#f2f5f7",
    borderRadius: 12,
    padding: 12,
  },
  input: {
    minHeight: 60,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    textAlignVertical: "top",
    color: "#333",
  },
  postButton: {
    marginTop: 10,
    backgroundColor: "#14B869",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  postCard: {
    backgroundColor: "#E5F4EA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userName: {
    fontWeight: "700",
    fontSize: 16,
    color: "#14B869",
  },
  timestamp: {
    color: "#666",
    fontSize: 12,
  },
  activityText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  likeButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  liked: {
    backgroundColor: "#14B869",
  },
  likeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
