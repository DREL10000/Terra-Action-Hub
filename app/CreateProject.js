import React, { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreateProjectScreen = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [impact, setImpact] = useState("");

  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    if (user) {
      getProfileId();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!title || !description || !budget || !impact) {
      alert("Please fill out all fields");
      return;
    }
  };

  const getProfileId = async () => {
    try {
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
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create a New Project</Text>

      <Text style={styles.label}>Project Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Clean Water Project"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Project Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe your project..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Budget ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 5000"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <Text style={styles.label}>Expected Environmental Impact</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Reduce carbon emissions by 10%"
        value={impact}
        onChangeText={setImpact}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Project</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#e1f6f0",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#14B869",
    fontWeight: "600",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#14B869",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
