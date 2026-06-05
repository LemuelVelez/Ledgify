import { CrudScreen, FieldConfig } from "@/components/ledger/CrudScreen";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import {
  DAY_OPTIONS,
  FEE_CATEGORY_OPTIONS,
  FEE_NAME_OPTIONS,
  PROGRAM_OPTIONS,
  PROJECT_OPTIONS,
  RECORD_STATUS_OPTIONS,
} from "@/constants/ledger";
import { useLedger } from "@/providers/LedgerProvider";
import { Fee } from "@/types/ledger";
import { formatCurrency, getLabel } from "@/utils/ledger";

export default function FeesScreen() {
  const { activeInstitutionId, currentUser, fees, createFee, updateFee, deleteFee } = useLedger();
  const records = fees.filter((fee) => fee.institutionId === activeInstitutionId);
  const canManageFees = ["superadmin", "admin"].includes(currentUser.role);

  const fields: FieldConfig<Fee>[] = [
    { key: "category", label: "Fee category", type: "dropdown", options: FEE_CATEGORY_OPTIONS, required: true },
    { key: "name", label: "Fee name", type: "dropdown", options: FEE_NAME_OPTIONS, required: true },
    { key: "program", label: "Grade level", type: "dropdown", options: PROGRAM_OPTIONS, required: true },
    { key: "projectName", label: "Ledger group", type: "dropdown", options: PROJECT_OPTIONS },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "dueDay", label: "Due day", type: "dropdown", options: DAY_OPTIONS, required: true },
    { key: "status", label: "Status", type: "dropdown", options: RECORD_STATUS_OPTIONS, required: true },
  ];

  const makeInitialFee = (): Fee => ({
    id: "",
    institutionId: activeInstitutionId,
    category: "registration",
    name: "Enrollment Registration Fee",
    program: "All Levels",
    projectName: "Academic Year 2025-2026 Enrollment",
    amount: 0,
    dueDay: "1",
    status: "active",
  });

  return (
    <ScreenShell title="Fees" subtitle="Registration, monthly, tutorial, and project fees" currentRole={currentUser.role}>
      <CrudScreen
        addLabel="Add fee"
        emptyText="No fee records yet."
        readOnlyText="This role can review fee records but cannot change them."
        fields={fields}
        records={records}
        makeInitial={makeInitialFee}
        onCreate={(fee) => createFee({ ...fee, institutionId: activeInstitutionId })}
        onUpdate={updateFee}
        onDelete={deleteFee}
        canCreate={canManageFees}
        canUpdate={canManageFees}
        canDelete={canManageFees}
        renderTitle={(fee) => fee.name}
        renderSubtitle={(fee) => `${getLabel(FEE_CATEGORY_OPTIONS, fee.category)} • ${fee.program}`}
        renderMeta={(fee) => `${formatCurrency(fee.amount)} • Due every ${fee.dueDay}`}
      />
    </ScreenShell>
  );
}
