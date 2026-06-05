import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors, radius, spacing } from "@/constants/theme";

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabs: Record<string, { title: string; icon: TabIconName; focusedIcon: TabIconName }> = {
  dashboard: { title: "Home", icon: "grid-outline", focusedIcon: "grid" },
  fees: { title: "Fees", icon: "wallet-outline", focusedIcon: "wallet" },
  payments: { title: "Payments", icon: "receipt-outline", focusedIcon: "receipt" },
  members: { title: "Members", icon: "people-outline", focusedIcon: "people" },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 58,
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.lg,
          height: 66,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          shadowOpacity: 0.12,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 8,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, focused, size }) => {
          const item = tabs[route.name] ?? tabs.dashboard;
          return <Ionicons name={focused ? item.focusedIcon : item.icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: tabs.dashboard.title, tabBarLabel: () => null }} />
      <Tabs.Screen name="fees" options={{ title: tabs.fees.title, tabBarLabel: () => null }} />
      <Tabs.Screen name="payments" options={{ title: tabs.payments.title, tabBarLabel: () => null }} />
      <Tabs.Screen name="members" options={{ title: tabs.members.title, tabBarLabel: () => null }} />
    </Tabs>
  );
}
