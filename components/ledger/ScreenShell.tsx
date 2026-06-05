import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ROLE_OPTIONS } from "@/constants/ledger";
import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { Role } from "@/types/ledger";
import { getLabel } from "@/utils/ledger";

type ScreenShellProps = {
  title: string;
  subtitle: string;
  currentRole: Role;
  children: ReactNode;
};

export function ScreenShell({ title, subtitle, currentRole, children }: ScreenShellProps) {
  const { currentUser, signOut } = useLedger();

  const handleSignOut = () => {
    signOut();
    router.replace("../auth");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.accountCard}>
            <View style={styles.accountIcon}>
              <Ionicons name="person-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.accountTextWrap}>
              <Text style={styles.accountName} numberOfLines={1}>
                {currentUser.name}
              </Text>
              <Text style={styles.accountRole}>{getLabel(ROLE_OPTIONS, currentRole)}</Text>
            </View>
            <Pressable style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            </Pressable>
          </View>
        </View>
        <View style={styles.body}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  titleWrap: {
    flex: 1,
    minWidth: 220,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  subtitle: {
    marginTop: 5,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  accountCard: {
    flexGrow: 1,
    maxWidth: 320,
    minWidth: 250,
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  accountIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
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
  accountRole: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  signOutButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
  },
});
