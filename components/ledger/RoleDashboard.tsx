import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DropdownField } from "@/components/ledger/DropdownField";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import { StatCard } from "@/components/ledger/StatCard";
import {
  ENROLLMENT_AGE_REQUIREMENTS,
  INSTITUTION_OPTIONS,
  INSTITUTIONS,
  TUTORIAL_COURSES,
} from "@/constants/ledger";
import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { Payment } from "@/types/ledger";
import { formatCurrency, getCollectionTotal, getLabel, getPaymentStatusCount } from "@/utils/ledger";

export function SuperadminDashboardScreen() {
  const dashboard = useDashboardData();

  return (
    <DashboardFrame title="Superadmin Dashboard" subtitle="Full access to Ledgify fee management">
      <InstitutionCard />
      <View style={styles.statsGrid}>
        <StatCard label="Collected" value={formatCurrency(dashboard.collectedTotal)} icon="cash-outline" />
        <StatCard label="Partial" value={formatCurrency(dashboard.partialTotal)} icon="time-outline" />
        <StatCard label="Users" value={String(dashboard.users.length)} icon="people-outline" />
        <StatCard label="Active fees" value={String(dashboard.activeFees.length)} icon="wallet-outline" />
      </View>
      <View style={styles.infoGrid}>
        <RoleOverviewCard />
        <AcademicProgramsCard />
      </View>
      <RecentPaymentsCard payments={dashboard.recentPayments} />
    </DashboardFrame>
  );
}

export function AdminDashboardScreen() {
  const dashboard = useDashboardData();

  return (
    <DashboardFrame title="Admin Dashboard" subtitle="Manage school fee setup and daily records">
      <InstitutionCard />
      <View style={styles.statsGrid}>
        <StatCard label="Active fees" value={String(dashboard.activeFees.length)} icon="wallet-outline" />
        <StatCard label="Paid records" value={String(dashboard.paidCount)} icon="checkmark-circle-outline" />
        <StatCard label="Payers" value={String(dashboard.payerOptions.length)} icon="person-outline" />
        <StatCard label="Collectors" value={String(dashboard.collectorOptions.length)} icon="people-outline" />
      </View>
      <View style={styles.infoGrid}>
        <TutorialCard />
        <EnrollmentCard />
      </View>
      <RecentPaymentsCard payments={dashboard.recentPayments} />
    </DashboardFrame>
  );
}

export function BursarDashboardScreen() {
  const dashboard = useDashboardData();

  return (
    <DashboardFrame title="Bursar Dashboard" subtitle="Record collections and monitor payer balances">
      <View style={styles.statsGrid}>
        <StatCard label="Collected" value={formatCurrency(dashboard.collectedTotal)} icon="cash-outline" />
        <StatCard label="Partial" value={formatCurrency(dashboard.partialTotal)} icon="time-outline" />
        <StatCard label="Paid records" value={String(dashboard.paidCount)} icon="checkmark-circle-outline" />
        <StatCard label="Payment records" value={String(dashboard.payments.length)} icon="receipt-outline" />
      </View>
      <View style={styles.infoGrid}>
        <DashboardSectionCard title="Collection workspace" icon="calculator-outline">
          <Text style={styles.sectionMeta}>Create and update payment records from the Payments tab.</Text>
          <View style={styles.roleGrid}>
            <InfoPill label="Payers" value={String(dashboard.payerOptions.length)} />
            <InfoPill label="Collectors" value={String(dashboard.collectorOptions.length)} />
          </View>
        </DashboardSectionCard>
        <TutorialCard />
      </View>
      <RecentPaymentsCard payments={dashboard.recentPayments} />
    </DashboardFrame>
  );
}

export function PayerDashboardScreen() {
  const dashboard = useDashboardData();
  const ownPayments = dashboard.payments.filter((payment) => payment.payerId === dashboard.currentUser.id);
  const ownPaidTotal = getCollectionTotal(ownPayments, "paid");
  const ownPartialTotal = getCollectionTotal(ownPayments, "partial");

  return (
    <DashboardFrame title="Payer Dashboard" subtitle="View your assigned fees and payment history">
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="person-circle-outline" size={26} color={colors.primary} />
        </View>
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroLabel}>Signed in as</Text>
          <Text style={styles.schoolName}>{dashboard.currentUser.name}</Text>
          <Text style={styles.schoolAddress}>{dashboard.currentUser.program} • {dashboard.currentUser.yearLevel}</Text>
        </View>
      </View>
      <View style={styles.statsGrid}>
        <StatCard label="Paid total" value={formatCurrency(ownPaidTotal)} icon="checkmark-circle-outline" />
        <StatCard label="Partial total" value={formatCurrency(ownPartialTotal)} icon="time-outline" />
        <StatCard label="My records" value={String(ownPayments.length)} icon="receipt-outline" />
        <StatCard label="Active fees" value={String(dashboard.activeFees.length)} icon="wallet-outline" />
      </View>
      <View style={styles.infoGrid}>
        <EnrollmentCard />
        <TutorialCard />
      </View>
      <RecentPaymentsCard payments={ownPayments.slice(0, 4)} />
    </DashboardFrame>
  );
}

function DashboardFrame({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const { currentUser } = useLedger();

  return (
    <ScreenShell title={title} subtitle={subtitle} currentRole={currentUser.role}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ScreenShell>
  );
}

function InstitutionCard() {
  const { activeInstitutionId, setActiveInstitutionId } = useLedger();
  const activeInstitution = INSTITUTIONS.find((institution) => institution.id === activeInstitutionId);

  return (
    <View style={styles.heroCard}>
      <View style={styles.heroIcon}>
        <Ionicons name="school-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.heroTextWrap}>
        <Text style={styles.heroLabel}>Active institution</Text>
        <Text style={styles.schoolName}>{activeInstitution?.name}</Text>
        <Text style={styles.schoolAddress}>{activeInstitution?.campus}</Text>
        <View style={styles.institutionSelect}>
          <DropdownField
            label=""
            value={activeInstitutionId}
            options={INSTITUTION_OPTIONS}
            onChange={setActiveInstitutionId}
          />
        </View>
      </View>
    </View>
  );
}

function RoleOverviewCard() {
  const dashboard = useDashboardData();

  return (
    <DashboardSectionCard title="Role overview" icon="people-outline">
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{dashboard.currentUser.role}</Text>
      </View>
      <View style={styles.roleGrid}>
        <InfoPill label="Users" value={String(dashboard.users.length)} />
        <InfoPill label="Payers" value={String(dashboard.payerOptions.length)} />
        <InfoPill label="Collectors" value={String(dashboard.collectorOptions.length)} />
        <InfoPill label="Fee types" value={String(dashboard.feeOptions.length)} />
      </View>
    </DashboardSectionCard>
  );
}

function AcademicProgramsCard() {
  return (
    <DashboardSectionCard title="Academic records" icon="clipboard-outline">
      <Text style={styles.sectionMeta}>Summer tutorial and AY 2025-2026 enrollment are available for Kinder to Grade 6.</Text>
      <View style={styles.chipGrid}>
        <InfoChip label="Registration fees" />
        <InfoChip label="Monthly fees" />
        <InfoChip label="Project fees" />
      </View>
    </DashboardSectionCard>
  );
}

function TutorialCard() {
  return (
    <DashboardSectionCard title="Summer Tutorial 2025" icon="book-outline">
      <Text style={styles.sectionMeta}>April 28, 2025 - May 29, 2025</Text>
      <Text style={styles.sectionMeta}>Open for Kinder to Grade 6</Text>
      <View style={styles.chipGrid}>
        {TUTORIAL_COURSES.map((course) => (
          <InfoChip key={course} label={course} />
        ))}
      </View>
    </DashboardSectionCard>
  );
}

function EnrollmentCard() {
  return (
    <DashboardSectionCard title="AY 2025-2026 Enrollment" icon="clipboard-outline">
      <Text style={styles.sectionMeta}>Requirement: Birth Certificate (NSO)</Text>
      <View style={styles.chipGrid}>
        {ENROLLMENT_AGE_REQUIREMENTS.map((requirement) => (
          <InfoChip key={requirement} label={requirement} />
        ))}
      </View>
    </DashboardSectionCard>
  );
}

function RecentPaymentsCard({ payments }: { payments: Payment[] }) {
  const { feeOptions, payerOptions } = useLedger();

  return (
    <DashboardSectionCard title="Recent payments" icon="receipt-outline">
      {payments.length === 0 ? (
        <Text style={styles.sectionMeta}>No payment records yet.</Text>
      ) : (
        payments.map((payment) => (
          <View key={payment.id} style={styles.paymentRow}>
            <View style={styles.paymentIcon}>
              <Ionicons name="card-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.paymentTextWrap}>
              <Text style={styles.paymentTitle}>{getLabel(payerOptions, payment.payerId)}</Text>
              <Text style={styles.paymentMeta}>
                {getLabel(feeOptions, payment.feeId)} • {payment.month}
              </Text>
            </View>
            <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
          </View>
        ))
      )}
    </DashboardSectionCard>
  );
}

function DashboardSectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name={icon} size={20} color={colors.muted} />
      </View>
      {children}
    </View>
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

function InfoChip({ label }: { label: string }) {
  return (
    <View style={styles.infoChip}>
      <Ionicons name="checkmark-circle" size={15} color={colors.primary} />
      <Text style={styles.infoChipText}>{label}</Text>
    </View>
  );
}

function useDashboardData() {
  const ledger = useLedger();
  const activeFees = ledger.fees.filter((fee) => fee.institutionId === ledger.activeInstitutionId && fee.status === "active");
  const collectedTotal = getCollectionTotal(ledger.payments, "paid");
  const partialTotal = getCollectionTotal(ledger.payments, "partial");
  const paidCount = getPaymentStatusCount(ledger.payments, "paid");
  const recentPayments = ledger.payments.slice(0, 4);

  return {
    ...ledger,
    activeFees,
    collectedTotal,
    partialTotal,
    paidCount,
    recentPayments,
  };
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    alignSelf: "stretch",
    gap: spacing.md,
    paddingBottom: 118,
  },
  heroCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.lg,
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
    minWidth: 230,
  },
  heroLabel: {
    marginBottom: 8,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  schoolName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 24,
  },
  schoolAddress: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  institutionSelect: {
    marginTop: spacing.md,
  },
  statsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.md,
  },
  infoGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.md,
  },
  sectionCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 340,
    minWidth: 240,
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  sectionTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  sectionMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  infoChip: {
    flexGrow: 1,
    flexBasis: 150,
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
  },
  infoChipText: {
    flex: 1,
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
  },
  badge: {
    alignSelf: "flex-start",
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
    alignItems: "stretch",
    gap: spacing.sm,
  },
  infoPill: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 144,
    minWidth: 132,
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
    lineHeight: 16,
  },
  paymentAmount: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
});
