import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LedgerProvider } from "@/providers/LedgerProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LedgerProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </LedgerProvider>
    </SafeAreaProvider>
  );
}
