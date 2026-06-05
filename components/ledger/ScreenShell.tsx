import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { DropdownField } from "@/components/ledger/DropdownField";
import { ROLE_OPTIONS } from "@/constants/ledger";
import { colors, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { Role } from "@/types/ledger";

type ScreenShellProps = {
  title: string;
  subtitle: string;
  currentRole: Role;
  children: ReactNode;
};

export function ScreenShell({ title, subtitle, currentRole, children }: ScreenShellProps) {
  const { setCurrentRole } = useLedger();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.roleSelect}>
            <DropdownField
              label=""
              value={currentRole}
              options={ROLE_OPTIONS}
              onChange={(value) => setCurrentRole(value as Role)}
            />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  subtitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  roleSelect: {
    width: 142,
  },
  body: {
    flex: 1,
  },
});
