import type { ComponentProps } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  icon?: IconName;
};

export function Button({ title, onPress, variant = "primary", icon }: Props) {
  const primary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        pressed && { opacity: 0.8 },
      ]}
    >
      {icon && <Ionicons name={icon} size={20} color={colors.text} />}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 62,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primary: { backgroundColor: colors.red },
  secondary: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  text: { color: colors.text, fontWeight: "700", fontSize: 16 },
});