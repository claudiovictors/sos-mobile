import { Children, type ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Linking,
  Share,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { SettingsRow } from "@/components/SettingsRow";
import { useStoredBoolean } from "@/hooks/useStoredBoolean";
import { colors } from "@/theme";

const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

function Section({ title, children }: { title: string; children: ReactNode }) {
  const items = Children.toArray(children);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {items.map((child, index) => (
          <View key={index}>
            {index > 0 && <View style={styles.divider} />}
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useStoredBoolean("pref:notifications", true);
  const [autoLocation, setAutoLocation] = useStoredBoolean("pref:auto-location", true);

  async function handleShare() {
    try {
      await Share.share({
        message:
          "Conheça a app Bombeiros Angola: peça socorro com GPS e acompanhe o atendimento. Em caso de emergência, ligue 115.",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível partilhar a aplicação.");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingTop: insets.top + 24, paddingBottom: 32, gap: 20 }}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={52} color={colors.muted} />
        </View>
        <Text style={styles.name}>Visitante</Text>
        <Text style={styles.subtitle}>Sem conta · uso anónimo</Text>
      </View>

      <Section title="Emergência">
        <SettingsRow
          icon="call"
          iconColor={colors.red}
          title="Ligar para o 115"
          subtitle="Bombeiros Angola"
          onPress={() => Linking.openURL("tel:115")}
        />
        <SettingsRow
          icon="alert-circle"
          title="Minhas ocorrências"
          subtitle="Acompanhar o atendimento"
          onPress={() => router.push("/incidents")}
        />
        <SettingsRow
          icon="share-social"
          title="Partilhar a aplicação"
          onPress={handleShare}
        />
      </Section>

      <Section title="Preferências">
        <SettingsRow
          icon="notifications"
          title="Notificações"
          subtitle="Avisos sobre ocorrências"
          onPress={() => setNotifications(!notifications)}
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.red }}
              thumbColor={colors.text}
            />
          }
        />
        <SettingsRow
          icon="locate"
          title="Localização automática"
          subtitle="Usar o GPS ao pedir socorro"
          onPress={() => setAutoLocation(!autoLocation)}
          right={
            <Switch
              value={autoLocation}
              onValueChange={setAutoLocation}
              trackColor={{ false: colors.border, true: colors.red }}
              thumbColor={colors.text}
            />
          }
        />
        <SettingsRow
          icon="settings"
          title="Permissões do telemóvel"
          subtitle="Localização e notificações"
          onPress={() => Linking.openSettings()}
        />
      </Section>

      <Section title="Ajuda e informações">
        <SettingsRow
          icon="help-circle"
          title="Ajuda e suporte"
          subtitle="Perguntas frequentes"
          onPress={() => router.push("/help")}
        />
        <SettingsRow
          icon="information-circle"
          title="Versão da app"
          right={<Text style={styles.version}>v{APP_VERSION}</Text>}
        />
      </Section>

      <Text style={styles.footer}>Em caso de emergência, ligue 115.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  profileHeader: { alignItems: "center", gap: 6 },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  name: { color: colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 13 },
  section: { gap: 8 },
  sectionTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 62 },
  version: { color: colors.muted, fontWeight: "600" },
  footer: { color: colors.muted, textAlign: "center", fontSize: 12 },
});