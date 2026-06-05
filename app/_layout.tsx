import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LedgerProvider } from "@/providers/LedgerProvider";

export default function RootLayout() {
  return (
    <LedgerProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </LedgerProvider>
  );
}
