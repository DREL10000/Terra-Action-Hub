import { AuthProvider } from "@/hooks/useAuth";
import { myTheme } from "@/utils/theme";
import { ThemeProvider } from "@react-navigation/native";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={myTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </AuthProvider>
  );
}
