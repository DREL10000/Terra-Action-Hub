import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface UploadButtonProps {
  title: string;
  onPress: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.imagePicker} onPress={onPress}>
      <Text style={styles.imagePickerText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
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
});
