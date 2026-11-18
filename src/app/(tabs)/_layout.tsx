import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          height: 60 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom + 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size + 3} />
          ),
        }}
      />
      <Tabs.Screen
        name="incidents"
        options={{
          title: "Ocorrências",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={size + 3} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size + 3} />
          ),
        }}
      />
    </Tabs>
  );
}