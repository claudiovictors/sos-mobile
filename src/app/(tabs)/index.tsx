import { View, Text, StyleSheet, Linking } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { colors } from "@/theme";

// Which part of the photo stays visible when it is cropped
const BACKGROUND_POSITION = { top: "0%", left: "50%" } as const;

// Dark at the top and bottom, clear in the middle (focus on the image)
const GRADIENT_COLORS = [
  "rgba(10,15,28,0.95)",
  "rgba(10,15,28,0.65)",
  "rgba(10,15,28,0.10)",
  "rgba(10,15,28,0.55)",
  "rgba(10,15,28,1)",
] as const;

const GRADIENT_LOCATIONS = [0, 0.28, 0.5, 0.75, 1] as const;

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/background.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition={BACKGROUND_POSITION}
      />
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={GRADIENT_LOCATIONS}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.title}>Bombeiros Angola</Text>
          <Text style={styles.subtitle}>Sua segurança é a nossa prioridade</Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Pedir Socorro"
            icon="alert-circle"
            onPress={() => router.push("/emergency-type")}
          />
          <Button
            title="Ligar para o 115"
            icon="call"
            variant="secondary"
            onPress={() => Linking.openURL("tel:115")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 80,
  },
  header: { alignItems: "center", gap: 8 },
  logo: { width: 170, height: 170 },
  title: { color: colors.text, fontSize: 36, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 18 },
  actions: { gap: 12, paddingBottom: 16 },
});