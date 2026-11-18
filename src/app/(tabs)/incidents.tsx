import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

const STEPS = [
  { title: "Pedido recebido", time: "10:24", done: true },
  { title: "Verificação da ocorrência", time: "10:26", done: true },
  { title: "Equipa atribuída", time: "10:32", done: true },
  { title: "A caminho do local", time: "10:34", done: true },
  { title: "No local", time: "--", done: false },
  { title: "Concluída", time: "--", done: false },
];

export default function Incidents() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingTop: insets.top + 16, gap: 16 }}
    >
      <Text style={styles.header}>Acompanhar ocorrência</Text>

      <View style={styles.card}>
        <Ionicons name="flame" size={30} color={colors.red} />
        <View style={{ flex: 1 }}>
          <Text style={styles.code}>EM-2025-0012</Text>
          <Text style={styles.description}>Incêndio em residência</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Em atendimento</Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 20 }}>
        {STEPS.map((step) => (
          <View key={step.title} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: step.done ? colors.green : colors.border }]}>
              <Ionicons
                name={step.done ? "checkmark" : "ellipse-outline"}
                size={16}
                color={colors.text}
              />
            </View>
            <View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.time}>{step.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { color: colors.text, fontSize: 18, fontWeight: "700" },
  card: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "rgba(225,29,46,0.15)",
    borderRadius: 14,
    padding: 14,
  },
  code: { color: colors.text, fontWeight: "700" },
  description: { color: colors.muted, marginTop: 2 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  badgeText: { color: colors.text, fontSize: 12, fontWeight: "600" },
  row: { flexDirection: "row", gap: 14, alignItems: "center" },
  dot: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  stepTitle: { color: colors.text, fontWeight: "600" },
  time: { color: colors.muted, fontSize: 12 },
});