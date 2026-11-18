import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import { colors } from "@/theme";

type Coords = { latitude: number; longitude: number };

// Default position (Luanda) used when permission is denied
const DEFAULT_COORDS: Coords = { latitude: -8.8383, longitude: 13.2344 };
const ZOOM = { latitudeDelta: 0.005, longitudeDelta: 0.005 };

export default function LocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type, description } = useLocalSearchParams<{ type: string; description: string }>();

  const mapRef = useRef<MapView>(null);
  const manualRef = useRef(false);
  const [manual, setManual] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [accuracy, setAccuracy] = useState(30);

  useEffect(() => {
    let subscription: ExpoLocation.LocationSubscription | null = null;
    let cancelled = false;

    async function startTracking() {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos da sua localização para enviar o socorro.");
        setCoords(DEFAULT_COORDS);
        return;
      }

      const sub = await ExpoLocation.watchPositionAsync(
        {
          accuracy: ExpoLocation.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (position) => {
          if (manualRef.current) return;
          const next = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoords(next);
          setAccuracy(position.coords.accuracy ?? 30);
          mapRef.current?.animateToRegion({ ...next, ...ZOOM }, 500);
        }
      );

      if (cancelled) sub.remove();
      else subscription = sub;
    }

    startTracking();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  function enableManualMode() {
    manualRef.current = true;
    setManual(true);
  }

  function pickManually(coordinate: Coords) {
    enableManualMode();
    setCoords(coordinate);
  }

  async function resumeTracking() {
    manualRef.current = false;
    setManual(false);
    try {
      const position = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });
      const next = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCoords(next);
      setAccuracy(position.coords.accuracy ?? 30);
      mapRef.current?.animateToRegion({ ...next, ...ZOOM }, 500);
    } catch {
      Alert.alert("Erro", "Não foi possível obter a sua localização.");
    }
  }

  function confirm() {
    // TODO: send to the API -> { type, description, ...coords }
    console.log({ type, description, ...coords });
    router.replace("/incidents");
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.red} size="large" />
        <Text style={styles.muted}>A obter localização...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <Text style={styles.muted}>
        {manual
          ? "Toque no mapa para escolher outro ponto"
          : "Sua localização será enviada automaticamente"}
      </Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{ ...coords, ...ZOOM }}
        onPress={(event) => pickManually(event.nativeEvent.coordinate)}
      >
        <Marker coordinate={coords} pinColor={colors.red} />
        {!manual && (
          <Circle
            center={coords}
            radius={accuracy}
            fillColor="rgba(59,130,246,0.2)"
            strokeColor="rgba(59,130,246,0.6)"
          />
        )}
      </MapView>

      <View style={styles.coordsBox}>
        <View style={styles.coordsRow}>
          <Ionicons name="navigate-circle" size={18} color={colors.blue} />
          <Text style={styles.coordsText}>Latitude: {coords.latitude.toFixed(4)}</Text>
        </View>
        <View style={styles.coordsRow}>
          <Ionicons name="navigate-circle" size={18} color={colors.blue} />
          <Text style={styles.coordsText}>Longitude: {coords.longitude.toFixed(4)}</Text>
        </View>
      </View>

      <Button title="Confirmar localização" icon="checkmark-circle" onPress={confirm} />
      {manual ? (
        <Button
          title="Usar GPS em tempo real"
          icon="locate"
          variant="secondary"
          onPress={resumeTracking}
        />
      ) : (
        <Button
          title="Alterar localização"
          icon="create-outline"
          variant="secondary"
          onPress={enableManualMode}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  muted: { color: colors.muted },
  map: { flex: 1, borderRadius: 14 },
  coordsBox: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 6 },
  coordsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  coordsText: { color: colors.text },
});