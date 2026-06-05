import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useLedger } from "@/providers/LedgerProvider";
import { Role } from "@/types/ledger";

type TabIconName = keyof typeof Ionicons.glyphMap;
type TabRoute = "dashboard" | "fees" | "payments" | "members";

type FloatingTabBarProps = BottomTabBarProps & {
  availableTabs: TabRoute[];
};

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

function FloatingTabBar({ state, navigation, availableTabs }: FloatingTabBarProps) {
  const visibleRoutes = state.routes.filter((route) => availableTabs.includes(route.name as TabRoute));

  return (
    <View pointerEvents="box-none" style={styles.floatingTabWrap}>
      <View style={styles.floatingTabBar}>
        {visibleRoutes.map((route) => {
          const item = tabs[route.name as TabRoute] ?? tabs.dashboard;
          const focused = state.routes[state.index]?.key === route.key;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={item.title}
              style={({ pressed }) => [
                styles.tabButton,
                focused && styles.activeTabButton,
                pressed && styles.pressedTabButton,
              ]}
              onPress={onPress}
            >
              <Ionicons
                name={focused ? item.focusedIcon : item.icon}
                size={focused ? 23 : 22}
                color={focused ? colors.primary : colors.muted}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const { currentUser } = useLedger();
  const availableTabs = roleTabs[currentUser.role];

  const isTabAvailable = (routeName: string) => availableTabs.includes(routeName as TabRoute);

  return (
    <Tabs tabBar={(props) => <FloatingTabBar {...props} availableTabs={availableTabs} />} screenOptions={{ headerShown: false }}>
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

const styles = StyleSheet.create({
  floatingTabWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: spacing.lg,
    alignItems: "center",
    paddingHorizontal: spacing.xl + spacing.sm,
  },
  floatingTabBar: {
    width: "82%",
    maxWidth: 430,
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    maxWidth: 64,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
  },
  activeTabButton: {
    backgroundColor: colors.primarySoft,
  },
  pressedTabButton: {
    opacity: 0.75,
  },
});
