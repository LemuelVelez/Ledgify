import { SelectOption } from "@/components/ledger/DropdownField";
import { Fee, Institution, Payment, User } from "@/types/ledger";

export const ROLE_OPTIONS: SelectOption[] = [
  { label: "Superadmin", value: "superadmin" },
  { label: "Admin", value: "admin" },
  { label: "Payer", value: "payer" },
  { label: "Bursar", value: "bursar" },
];

export const INSTITUTIONS: Institution[] = [
  {
    id: "inst-jewels",
    name: "JEWELS CHRISTIAN BAPTIST SCHOOL INC",
    campus: "7114, Poblacion East, Salug, Zamboanga del Norte",
  },
];

export const INSTITUTION_OPTIONS: SelectOption[] = INSTITUTIONS.map((institution) => ({
  label: institution.name,
  value: institution.id,
}));

export const PROGRAM_OPTIONS: SelectOption[] = [
  { label: "All Levels", value: "All Levels" },
  { label: "Nursery", value: "Nursery" },
  { label: "Kinder 1", value: "Kinder 1" },
  { label: "Kinder 2", value: "Kinder 2" },
  { label: "Grade 1", value: "Grade 1" },
  { label: "Grade 2", value: "Grade 2" },
  { label: "Grade 3", value: "Grade 3" },
  { label: "Grade 4", value: "Grade 4" },
  { label: "Grade 5", value: "Grade 5" },
  { label: "Grade 6", value: "Grade 6" },
];

export const YEAR_LEVEL_OPTIONS: SelectOption[] = [
  { label: "N/A", value: "N/A" },
  { label: "3-4 years old", value: "3-4 years old" },
  { label: "4-5 years old", value: "4-5 years old" },
  { label: "5-6 years old", value: "5-6 years old" },
  { label: "Kinder to Grade 6", value: "Kinder to Grade 6" },
];

export const FEE_CATEGORY_OPTIONS: SelectOption[] = [
  { label: "Registration Fee", value: "registration" },
  { label: "Monthly Fee", value: "monthly" },
  { label: "Project Fee", value: "project" },
];

export const FEE_NAME_OPTIONS: SelectOption[] = [
  { label: "Enrollment Registration Fee", value: "Enrollment Registration Fee" },
  { label: "Monthly School Fee", value: "Monthly School Fee" },
  { label: "Summer Tutorial Fee", value: "Summer Tutorial Fee" },
  { label: "Reading Comprehension & Writing", value: "Reading Comprehension & Writing" },
  { label: "Numeracy Skills", value: "Numeracy Skills" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "Project Fee", value: "Project Fee" },
];

export const PROJECT_OPTIONS: SelectOption[] = [
  { label: "Academic Year 2025-2026 Enrollment", value: "Academic Year 2025-2026 Enrollment" },
  { label: "Summer Tutorial 2025", value: "Summer Tutorial 2025" },
  { label: "Reading Comprehension & Writing", value: "Reading Comprehension & Writing" },
  { label: "Numeracy Skills", value: "Numeracy Skills" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "General School Ledger", value: "General School Ledger" },
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
  { label: "E-Wallet", value: "e_wallet" },
];

export const TUTORIAL_COURSES = ["Reading Comprehension & Writing", "Numeracy Skills", "Mathematics"];

export const ENROLLMENT_AGE_REQUIREMENTS = ["Nursery: 3-4 years old", "Kinder 1: 4-5 years old", "Kinder 2: 5-6 years old"];

export const SEED_USERS: User[] = [
  {
    id: "user-superadmin",
    name: "JCBSI Superadmin",
    email: "superadmin@jcbsi.ledgify.app",
    role: "superadmin",
    program: "All Levels",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-admin",
    name: "School Admin",
    email: "admin@jcbsi.ledgify.app",
    role: "admin",
    program: "All Levels",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-bursar",
    name: "School Bursar",
    email: "bursar@jcbsi.ledgify.app",
    role: "bursar",
    program: "All Levels",
    yearLevel: "N/A",
    status: "active",
  },
  {
    id: "user-payer-1",
    name: "Kinder 1 Payer",
    email: "kinder1.payer@jcbsi.ledgify.app",
    role: "payer",
    program: "Kinder 1",
    yearLevel: "4-5 years old",
    status: "active",
  },
  {
    id: "user-payer-2",
    name: "Grade 3 Payer",
    email: "grade3.payer@jcbsi.ledgify.app",
    role: "payer",
    program: "Grade 3",
    yearLevel: "Kinder to Grade 6",
    status: "active",
  },
];

export const SEED_FEES: Fee[] = [
  {
    id: "fee-enrollment-registration",
    institutionId: "inst-jewels",
    category: "registration",
    name: "Enrollment Registration Fee",
    program: "All Levels",
    projectName: "Academic Year 2025-2026 Enrollment",
    amount: 500,
    dueDay: "28",
    status: "active",
  },
  {
    id: "fee-monthly-school",
    institutionId: "inst-jewels",
    category: "monthly",
    name: "Monthly School Fee",
    program: "All Levels",
    projectName: "General School Ledger",
    amount: 750,
    dueDay: "5",
    status: "active",
  },
  {
    id: "fee-summer-tutorial",
    institutionId: "inst-jewels",
    category: "project",
    name: "Summer Tutorial Fee",
    program: "Kinder to Grade 6",
    projectName: "Summer Tutorial 2025",
    amount: 1200,
    dueDay: "28",
    status: "active",
  },
];

export const SEED_PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    payerId: "user-payer-1",
    feeId: "fee-enrollment-registration",
    month: "April",
    amount: 500,
    method: "cash",
    status: "paid",
    collectedById: "user-bursar",
    referenceNo: "JCBSI-0001",
  },
  {
    id: "pay-2",
    payerId: "user-payer-1",
    feeId: "fee-monthly-school",
    month: "May",
    amount: 375,
    method: "e_wallet",
    status: "partial",
    collectedById: "user-bursar",
    referenceNo: "JCBSI-0002",
  },
  {
    id: "pay-3",
    payerId: "user-payer-2",
    feeId: "fee-summer-tutorial",
    month: "April",
    amount: 1200,
    method: "e_wallet",
    status: "paid",
    collectedById: "user-bursar",
    referenceNo: "JCBSI-0003",
  },
];
