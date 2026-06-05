import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { SEED_FEES, SEED_PAYMENTS, SEED_USERS } from "@/constants/ledger";
import { Fee, Payment, Role, User } from "@/types/ledger";
import { createId } from "@/utils/ledger";

type LedgerContextValue = {
  activeInstitutionId: string;
  setActiveInstitutionId: (institutionId: string) => void;
  currentUser: User;
  setCurrentRole: (role: Role) => void;
  users: User[];
  fees: Fee[];
  payments: Payment[];
  payerOptions: { label: string; value: string }[];
  collectorOptions: { label: string; value: string }[];
  feeOptions: { label: string; value: string }[];
  createUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  createFee: (fee: Fee) => void;
  updateFee: (fee: Fee) => void;
  deleteFee: (id: string) => void;
  createPayment: (payment: Payment) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (id: string) => void;
};

const LedgerContext = createContext<LedgerContextValue | null>(null);

type LedgerProviderProps = {
  children: ReactNode;
};

export function LedgerProvider({ children }: LedgerProviderProps) {
  const [activeInstitutionId, setActiveInstitutionId] = useState("inst-jrmsu");
  const [currentRole, setCurrentRole] = useState<Role>("superadmin");
  const [users, setUsers] = useState(SEED_USERS);
  const [fees, setFees] = useState(SEED_FEES);
  const [payments, setPayments] = useState(SEED_PAYMENTS);

  const currentUser = useMemo(() => {
    return users.find((user) => user.role === currentRole) ?? users[0];
  }, [currentRole, users]);

  const payerOptions = useMemo(() => {
    return users
      .filter((user) => user.role === "payer" && user.status === "active")
      .map((user) => ({ label: user.name, value: user.id }));
  }, [users]);

  const collectorOptions = useMemo(() => {
    return users
      .filter((user) => ["superadmin", "admin", "bursar"].includes(user.role) && user.status === "active")
      .map((user) => ({ label: `${user.name} (${user.role})`, value: user.id }));
  }, [users]);

  const feeOptions = useMemo(() => {
    return fees
      .filter((fee) => fee.institutionId === activeInstitutionId && fee.status === "active")
      .map((fee) => ({ label: `${fee.name} - ₱${fee.amount}`, value: fee.id }));
  }, [activeInstitutionId, fees]);

  const value = useMemo<LedgerContextValue>(() => {
    return {
      activeInstitutionId,
      setActiveInstitutionId,
      currentUser,
      setCurrentRole,
      users,
      fees,
      payments,
      payerOptions,
      collectorOptions,
      feeOptions,
      createUser: (user) => setUsers((current) => prependRecord(current, user)),
      updateUser: (user) => setUsers((current) => updateRecord(current, user)),
      deleteUser: (id) => setUsers((current) => current.filter((user) => user.id !== id)),
      createFee: (fee) => setFees((current) => prependRecord(current, fee)),
      updateFee: (fee) => setFees((current) => updateRecord(current, fee)),
      deleteFee: (id) => setFees((current) => current.filter((fee) => fee.id !== id)),
      createPayment: (payment) => setPayments((current) => prependRecord(current, payment)),
      updatePayment: (payment) => setPayments((current) => updateRecord(current, payment)),
      deletePayment: (id) => setPayments((current) => current.filter((payment) => payment.id !== id)),
    };
  }, [activeInstitutionId, collectorOptions, currentUser, feeOptions, fees, payerOptions, payments, users]);

  return <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>;
}

export function useLedger() {
  const context = useContext(LedgerContext);

  if (!context) {
    throw new Error("useLedger must be used inside LedgerProvider");
  }

  return context;
}

function prependRecord<T extends { id: string }>(records: T[], record: T) {
  const nextRecord = record.id ? record : { ...record, id: createId() };
  return [nextRecord, ...records];
}

function updateRecord<T extends { id: string }>(records: T[], record: T) {
  return records.map((item) => (item.id === record.id ? record : item));
}
