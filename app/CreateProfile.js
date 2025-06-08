import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreateProfileScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = () => {
    if (!fullName || !profession) {
      Alert.alert("Error", "Please fill in full name and profession");
      return;
    }
    // Handle profile creation logic here
    Alert.alert(
      "Profile Created",
      `Name: ${fullName}\nProfession: ${profession}\nBio: ${bio || "N/A"}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      <TouchableOpacity style={styles.avatarPlaceholder}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>Tap to select avatar</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Profession"
        value={profession}
        onChangeText={setProfession}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio (optional)"
        value={bio}
        onChangeText={setBio}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => router.push("/news")}
      >
        <Text style={styles.submitButtonText}>Create Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#14B869",
    marginBottom: 30,
    textAlign: "center",
  },
  avatarPlaceholder: {
    alignSelf: "center",
    backgroundColor: "#E5F4EA",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#14B869",
  },
  avatarText: {
    color: "#14B869",
    fontWeight: "600",
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#14B869",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
