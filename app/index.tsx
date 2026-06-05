import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";

const featureCards = [
  {
    icon: "receipt-outline",
    title: "Organized fee records",
    description: "Track registration, monthly, tutorial, and project fees in a clean school ledger.",
  },
  {
    icon: "card-outline",
    title: "Cash or e-wallet",
    description: "Record payer transactions through the app using the supported payment methods.",
  },
  {
    icon: "analytics-outline",
    title: "Clear collection view",
    description: "Review balances, payment history, and recent collections without manual paper logs.",
  },
] satisfies {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}[];

const quickStats = [
  { value: "2", label: "Payment methods" },
  { value: "4", label: "Workspaces" },
  { value: "1", label: "School ledger" },
];

export default function WelcomeScreen() {
  const { isAuthenticated } = useLedger();

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.logoWrap}>
              <Ionicons name="bookmarks-outline" size={32} color={colors.primary} />
            </View>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark-outline" size={15} color={colors.primary} />
              <Text style={styles.badgeText}>Secure fee tracker</Text>
            </View>
          </View>

          <View style={styles.heroTextWrap}>
            <Text style={styles.eyebrow}>Welcome to Ledgify</Text>
            <Text style={styles.title}>A pleasant way to track school fees.</Text>
            <Text style={styles.subtitle}>
              Ledgify helps JEWELS CHRISTIAN BAPTIST SCHOOL INC. organize fee records and payer payments through one simple mobile workspace.
            </Text>
          </View>

          <View style={styles.statsGrid}>
            {quickStats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.primaryButton} onPress={() => router.push("./auth")}>
            <Text style={styles.primaryButtonText}>Get started</Text>
            <Ionicons name="arrow-forward" size={19} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.featureGrid}>
          {featureCards.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
    gap: spacing.lg,
    padding: spacing.xl,
  },
  heroCard: {
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  heroTopRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  logoWrap: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: colors.primarySoft,
  },
  badge: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  heroTextWrap: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    maxWidth: 760,
    color: colors.text,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -1.3,
    lineHeight: 50,
  },
  subtitle: {
    maxWidth: 740,
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 160,
    minHeight: 88,
    justifyContent: "center",
    gap: 3,
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.background,
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  primaryButton: {
    minHeight: 56,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
  featureGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  featureCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 260,
    minWidth: 230,
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  featureIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: colors.primarySoft,
  },
  featureTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
