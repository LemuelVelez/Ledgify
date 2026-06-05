import { SelectOption } from "@/components/ledger/DropdownField";
import { Payment, PaymentStatus } from "@/types/ledger";

export function createId() {
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatCurrency(value: number) {
  const amount = Number.isFinite(value) ? value : 0;
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getLabel(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function getCollectionTotal(payments: Payment[], status?: PaymentStatus) {
  return payments
    .filter((payment) => (status ? payment.status === status : true))
    .reduce((sum, payment) => sum + payment.amount, 0);
}

export function getPaymentStatusCount(payments: Payment[], status: PaymentStatus) {
  return payments.filter((payment) => payment.status === status).length;
}
