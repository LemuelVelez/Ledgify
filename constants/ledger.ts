import { SelectOption } from "@/components/ledger/DropdownField";
import { Fee, Institution, Payment, User } from "@/types/ledger";

export const ROLE_OPTIONS: SelectOption[] = [
  { label: "Superadmin", value: "superadmin" },
  { label: "Admin", value: "admin" },
  { label: "Payer", value: "payer" },
  { label: "Bursar", value: "bursar" },
];

export const INSTITUTIONS: Institution[] = [
  { id: "inst-jrmsu", name: "JRMSU Tampilisan", campus: "Main Institution" },
  { id: "inst-demo", name: "Demo Institution", campus: "Sandbox" },
];

export const INSTITUTION_OPTIONS: SelectOption[] = INSTITUTIONS.map((institution) => ({
  label: institution.name,
  value: institution.id,
}));

export const PROGRAM_OPTIONS: SelectOption[] = [
  { label: "All Programs", value: "All Programs" },
  { label: "BS Information Systems", value: "BS Information Systems" },
  { label: "BS Computer Science", value: "BS Computer Science" },
  { label: "BS Information Technology", value: "BS Information Technology" },
  { label: "BS Business Administration", value: "BS Business Administration" },
];

export const YEAR_LEVEL_OPTIONS: SelectOption[] = [
  { label: "N/A", value: "N/A" },
  { label: "1st Year", value: "1st Year" },
  { label: "2nd Year", value: "2nd Year" },
  { label: "3rd Year", value: "3rd Year" },
  { label: "4th Year", value: "4th Year" },
];

export const FEE_CATEGORY_OPTIONS: SelectOption[] = [
  { label: "Registration Fee", value: "registration" },
  { label: "Monthly Fee", value: "monthly" },
  { label: "Project Fee", value: "project" },
];

export const FEE_NAME_OPTIONS: SelectOption[] = [
  { label: "Registration Fee", value: "Registration Fee" },
  { label: "Monthly Fee", value: "Monthly Fee" },
  { label: "Project Fee", value: "Project Fee" },
  { label: "Laboratory Fee", value: "Laboratory Fee" },
  { label: "Organization Fee", value: "Organization Fee" },
  { label: "Capstone Project Fund", value: "Capstone Project Fund" },
];

export const PROJECT_OPTIONS: SelectOption[] = [
  { label: "General Ledger", value: "General Ledger" },
  { label: "Capstone Project", value: "Capstone Project" },
  { label: "Research Project", value: "Research Project" },
  { label: "Community Extension", value: "Community Extension" },
  { label: "Seminar Fund", value: "Seminar Fund" },
];

export const DAY_OPTIONS: SelectOption[] = Array.from({ length: 28 }, (_, index) => {
  const day = String(index + 1);
  return { label: `Day ${day}`, value: day };
});

export const MONTH_OPTIONS: SelectOption[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month) => ({ label: month, value: month }));

export const RECORD_STATUS_OPTIONS: SelectOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const PAYMENT_STATUS_OPTIONS: SelectOption[] = [
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Void", value: "void" },
];

export const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { label: "Cash", value: "cash" },
  { label: "GCash", value: "gcash" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Check", value: "check" },
  { label: "Other", value: "other" },
];

export const SEED_USERS: User[] = [
  {
    id: "user-superadmin",
    name: "System Superadmin",
    email: "superadmin@ledgify.app",
    role: "superadmin",
    program: "All Programs",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-admin",
    name: "Institution Admin",
    email: "admin@ledgify.app",
    role: "admin",
    program: "All Programs",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-bursar",
    name: "Campus Bursar",
    email: "bursar@ledgify.app",
    role: "bursar",
    program: "All Programs",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-payer-1",
    name: "Lemuel Velez",
    email: "lemuel@student.ledgify.app",
    role: "payer",
    program: "BS Information Systems",
    yearLevel: "3rd Year",
    status: "active",
  },
  {
    id: "user-payer-2",
    name: "Reynel Mira",
    email: "reynel@student.ledgify.app",
    role: "payer",
    program: "BS Information Systems",
    yearLevel: "3rd Year",
    status: "active",
  },
];

export const SEED_FEES: Fee[] = [
  {
    id: "fee-registration",
    institutionId: "inst-jrmsu",
    category: "registration",
    name: "Registration Fee",
    program: "All Programs",
    projectName: "General Ledger",
    amount: 500,
    dueDay: "1",
    status: "active",
  },
  {
    id: "fee-monthly",
    institutionId: "inst-jrmsu",
    category: "monthly",
    name: "Monthly Fee",
    program: "All Programs",
    projectName: "General Ledger",
    amount: 250,
    dueDay: "5",
    status: "active",
  },
  {
    id: "fee-project",
    institutionId: "inst-jrmsu",
    category: "project",
    name: "Capstone Project Fund",
    program: "BS Information Systems",
    projectName: "Capstone Project",
    amount: 1500,
    dueDay: "15",
    status: "active",
  },
];

export const SEED_PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    payerId: "user-payer-1",
    feeId: "fee-registration",
    month: "June",
    amount: 500,
    method: "cash",
    status: "paid",
    collectedById: "user-bursar",
    referenceNo: "LGF-0001",
  },
  {
    id: "pay-2",
    payerId: "user-payer-1",
    feeId: "fee-monthly",
    month: "June",
    amount: 125,
    method: "gcash",
    status: "partial",
    collectedById: "user-bursar",
    referenceNo: "LGF-0002",
  },
  {
    id: "pay-3",
    payerId: "user-payer-2",
    feeId: "fee-project",
    month: "June",
    amount: 1500,
    method: "bank_transfer",
    status: "paid",
    collectedById: "user-bursar",
    referenceNo: "LGF-0003",
  },
];
