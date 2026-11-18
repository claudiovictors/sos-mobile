import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import { colors } from "@/theme";

const FAQ_ITEMS = [
  {
    question: "Como peço socorro?",
    answer:
      "Na tela inicial toque em «Pedir Socorro», escolha o tipo de ocorrência, confirme a localização e envie o pedido.",
  },
  {
    question: "Para que serve a localização?",
    answer:
      "O GPS envia a sua posição automaticamente para a equipa chegar mais depressa. Se necessário, pode ajustar o ponto tocando no mapa.",
  },
  {
    question: "E se estiver sem internet?",
    answer:
      "O envio do pedido precisa de ligação à internet. Sem internet, ligue diretamente para o 115.",
  },
  {
    question: "Como acompanho a ocorrência?",
    answer:
      "No separador «Ocorrências» vê todas as etapas do atendimento, desde o pedido recebido até à conclusão.",
  },
  {
    question: "Preciso de criar conta?",
    answer: "Não. Pode usar a aplicação sem criar conta nem iniciar sessão.",
  },
];

export default function Help() {
  const insets = useSafeAreaInsets();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.heading}>Perguntas frequentes</Text>

        {FAQ_ITEMS.map((item, index) => {
          const open = openIndex === index;
          return (
            <Pressable
              key={item.question}
              onPress={() => setOpenIndex(open ? null : index)}
              style={styles.item}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.question}>{item.question}</Text>
                <Ionicons
                  name={open ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.muted}
                />
              </View>
              {open && <Text style={styles.answer}>{item.answer}</Text>}
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Ligar para o 115"
          icon="call"
          onPress={() => Linking.openURL("tel:115")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 12 },
  heading: { color: colors.text, fontSize: 18, fontWeight: "700", marginBottom: 4 },
  item: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 10,
  },
  itemHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  question: { flex: 1, color: colors.text, fontWeight: "600", fontSize: 15 },
  answer: { color: colors.muted, lineHeight: 20 },
  footer: { padding: 16 },
});