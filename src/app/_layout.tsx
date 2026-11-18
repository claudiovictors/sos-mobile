import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="emergency-type" options={{ title: "Tipo de emergência" }} />
        <Stack.Screen name="location" options={{ title: "Localização da ocorrência" }} />
        <Stack.Screen name="help" options={{ title: "Ajuda e suporte" }} />
      </Stack>
    </>
  );
}