import { CrudScreen, FieldConfig } from "@/components/ledger/CrudScreen";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import { MONTH_OPTIONS, PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/constants/ledger";
import { useLedger } from "@/providers/LedgerProvider";
import { Payment } from "@/types/ledger";
import { formatCurrency, getLabel } from "@/utils/ledger";

export default function PaymentsScreen() {
  const {
    currentUser,
    payments,
    createPayment,
    updatePayment,
    deletePayment,
    feeOptions,
    payerOptions,
    collectorOptions,
  } = useLedger();

  const fields: FieldConfig<Payment>[] = [
    { key: "payerId", label: "Payer", type: "dropdown", options: payerOptions, required: true },
    { key: "feeId", label: "Fee", type: "dropdown", options: feeOptions, required: true },
    { key: "month", label: "Month", type: "dropdown", options: MONTH_OPTIONS, required: true },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "method", label: "Payment method", type: "dropdown", options: PAYMENT_METHOD_OPTIONS, required: true },
    { key: "status", label: "Payment status", type: "dropdown", options: PAYMENT_STATUS_OPTIONS, required: true },
    { key: "collectedById", label: "Collected by", type: "dropdown", options: collectorOptions, required: true },
    { key: "referenceNo", label: "Reference no.", type: "text" },
  ];

  const makeInitialPayment = (): Payment => ({
    id: "",
    payerId: payerOptions[0]?.value ?? "",
    feeId: feeOptions[0]?.value ?? "",
    month: "June",
    amount: 0,
    method: "cash",
    status: "paid",
    collectedById: collectorOptions[0]?.value ?? "",
    referenceNo: "",
  });

  return (
    <ScreenShell title="Payments" subtitle="Collection records and payer balances" currentRole={currentUser.role}>
      <CrudScreen
        addLabel="Add payment"
        emptyText="No payment records yet."
        fields={fields}
        records={payments}
        makeInitial={makeInitialPayment}
        onCreate={createPayment}
        onUpdate={updatePayment}
        onDelete={deletePayment}
        renderTitle={(payment) => getLabel(payerOptions, payment.payerId)}
        renderSubtitle={(payment) => `${getLabel(feeOptions, payment.feeId)} • ${payment.month}`}
        renderMeta={(payment) => `${formatCurrency(payment.amount)} • ${getLabel(PAYMENT_STATUS_OPTIONS, payment.status)}`}
      />
    </ScreenShell>
  );
}
