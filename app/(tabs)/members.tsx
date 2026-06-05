import { CrudScreen, FieldConfig } from "@/components/ledger/CrudScreen";
import { RoleAccessNotice } from "@/components/ledger/RoleAccessNotice";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import { PROGRAM_OPTIONS, RECORD_STATUS_OPTIONS, ROLE_OPTIONS, YEAR_LEVEL_OPTIONS } from "@/constants/ledger";
import { useLedger } from "@/providers/LedgerProvider";
import { User } from "@/types/ledger";
import { getLabel } from "@/utils/ledger";

export default function MembersScreen() {
  const { currentUser, users, createUser, updateUser, deleteUser } = useLedger();
  const canViewMembers = ["superadmin", "admin"].includes(currentUser.role);
  const canManageMembers = currentUser.role === "superadmin";

  const fields: FieldConfig<User>[] = [
    { key: "role", label: "Role", type: "dropdown", options: ROLE_OPTIONS, required: true },
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email", type: "text", required: true },
    { key: "program", label: "Grade level", type: "dropdown", options: PROGRAM_OPTIONS, required: true },
    { key: "yearLevel", label: "Age group", type: "dropdown", options: YEAR_LEVEL_OPTIONS, required: true },
    { key: "status", label: "Status", type: "dropdown", options: RECORD_STATUS_OPTIONS, required: true },
  ];

  const makeInitialUser = (): User => ({
    id: "",
    name: "",
    email: "",
    role: "payer",
    program: "All Levels",
    yearLevel: "N/A",
    status: "active",
  });

  return (
    <ScreenShell title="Members" subtitle="Superadmin, admin, payer, and bursar records" currentRole={currentUser.role}>
      {canViewMembers ? (
        <CrudScreen
          addLabel="Add member"
          emptyText="No member records yet."
          readOnlyText="Admins can review member records. Only superadmins can add, edit, or delete users."
          fields={fields}
          records={users}
          makeInitial={makeInitialUser}
          onCreate={createUser}
          onUpdate={updateUser}
          onDelete={deleteUser}
          canCreate={canManageMembers}
          canUpdate={canManageMembers}
          canDelete={canManageMembers}
          renderTitle={(user) => user.name || "New member"}
          renderSubtitle={(user) => `${getLabel(ROLE_OPTIONS, user.role)} • ${user.program}`}
          renderMeta={(user) => `${user.email} • ${getLabel(RECORD_STATUS_OPTIONS, user.status)}`}
        />
      ) : (
        <RoleAccessNotice
          title="Members are not available for this account"
          description="Sign in with an administrator account to manage member records."
          icon="lock-closed-outline"
        />
      )}
    </ScreenShell>
  );
}
