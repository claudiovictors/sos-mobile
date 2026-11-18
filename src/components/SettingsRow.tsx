import type { ComponentProps, ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  icon: IconName;
  title: string;
  subtitle?: string;
  iconColor?: string;
  onPress?: () => void;
  right?: ReactNode;
};

export function SettingsRow({
  icon,
  title,
  subtitle,
  iconColor = colors.text,
  onPress,
  right,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.muted} /> : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { flex: 1 },
  title: { color: colors.text, fontWeight: "600", fontSize: 15 },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
});