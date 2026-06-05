import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DropdownField } from "@/components/ledger/DropdownField";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import { StatCard } from "@/components/ledger/StatCard";
import { INSTITUTION_OPTIONS } from "@/constants/ledger";
import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { formatCurrency, getCollectionTotal, getLabel, getPaymentStatusCount } from "@/utils/ledger";

export default function DashboardScreen() {
  const {
    activeInstitutionId,
    setActiveInstitutionId,
    fees,
    payments,
    users,
    currentUser,
    feeOptions,
    payerOptions,
    collectorOptions,
  } = useLedger();

  const activeFees = fees.filter((fee) => fee.institutionId === activeInstitutionId && fee.status === "active");
  const collectedTotal = getCollectionTotal(payments, "paid");
  const partialTotal = getCollectionTotal(payments, "partial");
  const paidCount = getPaymentStatusCount(payments, "paid");
  const recentPayments = payments.slice(0, 4);

  return (
    <ScreenShell title="Ledgify" subtitle="Institution fee management" currentRole={currentUser.role}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="business-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroLabel}>Active institution</Text>
            <DropdownField
              label=""
              value={activeInstitutionId}
              options={INSTITUTION_OPTIONS}
              onChange={setActiveInstitutionId}
            />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Collected" value={formatCurrency(collectedTotal)} icon="cash-outline" />
          <StatCard label="Partial" value={formatCurrency(partialTotal)} icon="time-outline" />
          <StatCard label="Paid records" value={String(paidCount)} icon="checkmark-circle-outline" />
          <StatCard label="Active fees" value={String(activeFees.length)} icon="wallet-outline" />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Role overview</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{currentUser.role}</Text>
            </View>
          </View>
          <View style={styles.roleGrid}>
            <InfoPill label="Users" value={String(users.length)} />
            <InfoPill label="Payers" value={String(payerOptions.length)} />
            <InfoPill label="Collectors" value={String(collectorOptions.length)} />
            <InfoPill label="Fee types" value={String(feeOptions.length)} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent payments</Text>
            <Ionicons name="receipt-outline" size={20} color={colors.muted} />
          </View>
          {recentPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentRow}>
              <View style={styles.paymentIcon}>
                <Ionicons name="card-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.paymentTextWrap}>
                <Text style={styles.paymentTitle}>{getLabel(payerOptions, payment.payerId)}</Text>
                <Text style={styles.paymentMeta}>{getLabel(feeOptions, payment.feeId)} • {payment.month}</Text>
              </View>
              <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: 108,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  heroTextWrap: {
    flex: 1,
  },
  heroLabel: {
    marginBottom: 8,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  sectionCard: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  roleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  infoPill: {
    width: "48%",
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  infoLabel: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  paymentIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  paymentTextWrap: {
    flex: 1,
  },
  paymentTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  paymentMeta: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  paymentAmount: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
});
