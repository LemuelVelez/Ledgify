import { ComponentType } from "react";

import {
  AdminDashboardScreen,
  BursarDashboardScreen,
  PayerDashboardScreen,
  SuperadminDashboardScreen,
} from "@/components/ledger/RoleDashboard";
import { useLedger } from "@/providers/LedgerProvider";
import { Role } from "@/types/ledger";

const roleDashboardScreens: Record<Role, ComponentType> = {
  superadmin: SuperadminDashboardScreen,
  admin: AdminDashboardScreen,
  bursar: BursarDashboardScreen,
  payer: PayerDashboardScreen,
};

export default function DashboardScreen() {
  const { currentUser } = useLedger();
  const RoleDashboardScreen = roleDashboardScreens[currentUser.role];

  return <RoleDashboardScreen />;
}
