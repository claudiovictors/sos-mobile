import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import { colors } from "@/theme";

const EMERGENCY_TYPES = [
  { id: "fire", label: "Incêndio", icon: "flame", color: colors.red },
  { id: "traffic-accident", label: "Acidente de viação", icon: "car", color: colors.blue },
  { id: "rescue", label: "Resgate", icon: "person", color: colors.green },
  { id: "other", label: "Outro", icon: "ellipsis-horizontal", color: colors.muted },
] as const;

export default function EmergencyType() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [type, setType] = useState<string>("fire");
  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.hint}>Selecione o tipo de ocorrência</Text>

        <View style={styles.grid}>
          {EMERGENCY_TYPES.map((item) => {
            const active = type === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setType(item.id)}
                style={[styles.card, active && { borderColor: item.color }]}
              >
                <Ionicons name={item.icon} size={34} color={item.color} />
                <Text style={styles.cardText}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Descrição (opcional)</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Informe mais detalhes sobre a ocorrência..."
          placeholderTextColor={colors.muted}
          multiline
          style={styles.input}
        />

        <View style={styles.flex} />
        <Button
          title="Continuar"
          onPress={() => router.push({ pathname: "/location", params: { type, description } })}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 16, gap: 12 },
  hint: { color: colors.muted },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    height: 110,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardText: { color: colors.text, fontWeight: "600" },
  label: { color: colors.text, fontWeight: "600", marginTop: 8 },
  input: {
    minHeight: 100,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    padding: 12,
    textAlignVertical: "top",
  },
});