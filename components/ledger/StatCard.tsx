import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

type StatCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={19} color={colors.primary} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47.8%",
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  value: {
    marginTop: 2,
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },
});
