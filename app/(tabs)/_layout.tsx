import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { Role } from "@/types/ledger";

type TabIconName = keyof typeof Ionicons.glyphMap;
type TabRoute = "dashboard" | "fees" | "payments" | "members";

const tabs: Record<TabRoute, { title: string; icon: TabIconName; focusedIcon: TabIconName }> = {
  dashboard: { title: "Home", icon: "grid-outline", focusedIcon: "grid" },
  fees: { title: "Fees", icon: "wallet-outline", focusedIcon: "wallet" },
  payments: { title: "Payments", icon: "receipt-outline", focusedIcon: "receipt" },
  members: { title: "Members", icon: "people-outline", focusedIcon: "people" },
};

const roleTabs: Record<Role, TabRoute[]> = {
  superadmin: ["dashboard", "fees", "payments", "members"],
  admin: ["dashboard", "fees", "payments", "members"],
  bursar: ["dashboard", "payments"],
  payer: ["dashboard", "payments"],
};

export default function TabLayout() {
  const { currentUser, isAuthenticated } = useLedger();
  const availableTabs = roleTabs[currentUser.role];

  if (!isAuthenticated) {
    return <Redirect href="../auth" />;
  }

  const isTabAvailable = (routeName: string) => availableTabs.includes(routeName as TabRoute);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: false,
        tabBarButton: isTabAvailable(route.name) ? undefined : () => null,
        tabBarIconStyle: {
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
        },
        tabBarItemStyle: {
          height: 46,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: spacing.xs,
          paddingVertical: 0,
          borderRadius: radius.lg,
        },
        tabBarStyle: {
          position: "absolute",
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.lg,
          height: 64,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          shadowOpacity: 0.12,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 8,
          paddingTop: 6,
          paddingBottom: 6,
          paddingHorizontal: spacing.sm,
        },
        tabBarIcon: ({ color, focused }) => {
          const item = tabs[route.name as TabRoute] ?? tabs.dashboard;
          return <Ionicons name={focused ? item.focusedIcon : item.icon} size={focused ? 23 : 22} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: tabs.dashboard.title, href: isTabAvailable("dashboard") ? "/dashboard" : null }}
      />
      <Tabs.Screen name="fees" options={{ title: tabs.fees.title, href: isTabAvailable("fees") ? "/fees" : null }} />
      <Tabs.Screen
        name="payments"
        options={{ title: tabs.payments.title, href: isTabAvailable("payments") ? "/payments" : null }}
      />
      <Tabs.Screen
        name="members"
        options={{ title: tabs.members.title, href: isTabAvailable("members") ? "/members" : null }}
      />
    </Tabs>
  );
}
