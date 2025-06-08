import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress?: () => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={[styles.pressable]}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#B8E0CC",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    color: "#0D1C14",
    fontSize: 14,
    fontWeight: "medium",
  },
});
