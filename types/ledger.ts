export type Role = "superadmin" | "admin" | "payer" | "bursar";

export type RecordStatus = "active" | "inactive";

export type FeeCategory = "registration" | "monthly" | "project";

export type PaymentStatus = "paid" | "partial" | "unpaid" | "void";

export type PaymentMethod = "cash" | "e_wallet";

export type Institution = {
  id: string;
  name: string;
  campus: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  program: string;
  yearLevel: string;
  status: RecordStatus;
};

export type Fee = {
  id: string;
  institutionId: string;
  category: FeeCategory;
  name: string;
  program: string;
  projectName: string;
  amount: number;
  dueDay: string;
  status: RecordStatus;
};

export type Payment = {
  id: string;
  payerId: string;
  feeId: string;
  month: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  collectedById: string;
  referenceNo: string;
};
