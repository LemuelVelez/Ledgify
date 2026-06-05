import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { User } from "@/types/ledger";

const featureCards = [
  {
    icon: "receipt-outline",
    title: "Track fee records",
    description: "Monitor registration, monthly, tutorial, and project fees in one clean workspace.",
  },
  {
    icon: "card-outline",
    title: "Cash or e-wallet",
    description: "Let payers submit payment records through the app using cash or e-wallet.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Role-based access",
    description: "Open the correct tools automatically after signing in with an active account.",
  },
] satisfies {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}[];

export default function WelcomeScreen() {
  const { isAuthenticated, signIn, users } = useLedger();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  const activeUsers = users.filter((user) => user.status === "active");

  const submitLogin = () => {
    const didSignIn = signIn(email, password);

    if (!didSignIn) {
      setError("Enter an active account email and password.");
      return;
    }

    setError("");
    router.replace("/dashboard");
  };

  const fillEmail = (user: User) => {
    setEmail(user.email);
    setError("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboardWrap}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.logoWrap}>
              <Ionicons name="bookmarks-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.eyebrow}>Welcome to Ledgify</Text>
            <Text style={styles.title}>Fee tracking made simple.</Text>
            <Text style={styles.subtitle}>
              Track school fee records and let payers submit cash or e-wallet payments from one secure app.
            </Text>

            <View style={styles.featureGrid}>
              {featureCards.map((feature) => (
                <View key={feature.title} style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Ionicons name={feature.icon} size={18} color={colors.primary} />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.authCard}>
            <View style={styles.authHeader}>
              <Text style={styles.authTitle}>Sign in</Text>
              <Text style={styles.authSubtitle}>Use an active school account to continue.</Text>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="name@school.app"
                placeholderTextColor={colors.muted}
                style={styles.input}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError("");
                }}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.passwordField}>
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={secureEntry}
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setError("");
                  }}
                />
                <Pressable style={styles.eyeButton} onPress={() => setSecureEntry((current) => !current)}>
                  <Ionicons name={secureEntry ? "eye-outline" : "eye-off-outline"} size={19} color={colors.muted} />
                </Pressable>
              </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable style={styles.primaryButton} onPress={submitLogin}>
              <Text style={styles.primaryButtonText}>Sign in</Text>
              <Ionicons name="arrow-forward" size={19} color={colors.white} />
            </Pressable>

            <View style={styles.accountSection}>
              <Text style={styles.accountTitle}>Available accounts</Text>
              <View style={styles.accountGrid}>
                {activeUsers.map((user) => (
                  <Pressable key={user.id} style={styles.accountCard} onPress={() => fillEmail(user)}>
                    <View style={styles.accountIcon}>
                      <Ionicons name="person-outline" size={17} color={colors.primary} />
                    </View>
                    <View style={styles.accountTextWrap}>
                      <Text style={styles.accountName}>{user.name}</Text>
                      <Text style={styles.accountEmail}>{user.email}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardWrap: {
    flex: 1,
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
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  logoWrap: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    maxWidth: 700,
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1.2,
    lineHeight: 48,
  },
  subtitle: {
    maxWidth: 680,
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  featureGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  featureCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 230,
    minWidth: 210,
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.background,
  },
  featureIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
  },
  featureTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  authCard: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  authHeader: {
    gap: 5,
  },
  authTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  authSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  fieldWrap: {
    gap: 8,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  input: {
    minHeight: 54,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: colors.background,
  },
  passwordField: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  eyeButton: {
    width: 50,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800",
  },
  primaryButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
  accountSection: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  accountTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  accountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  accountCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 260,
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  accountIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
  },
  accountTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  accountName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  accountEmail: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
});
