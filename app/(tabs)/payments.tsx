import { CrudScreen, FieldConfig } from "@/components/ledger/CrudScreen";
import { ScreenShell } from "@/components/ledger/ScreenShell";
import { MONTH_OPTIONS, PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/constants/ledger";
import { useLedger } from "@/providers/LedgerProvider";
import { Payment } from "@/types/ledger";
import { formatCurrency, getLabel } from "@/utils/ledger";

const payerPaymentFieldKeys = new Set<keyof Payment>(["feeId", "month", "amount", "method", "referenceNo"]);

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
  const isPayer = currentUser.role === "payer";
  const canManagePayments = ["superadmin", "admin", "bursar"].includes(currentUser.role);
  const canCreatePayment = canManagePayments || isPayer;
  const records = isPayer ? payments.filter((payment) => payment.payerId === currentUser.id) : payments;

  const allFields: FieldConfig<Payment>[] = [
    { key: "payerId", label: "Payer", type: "dropdown", options: payerOptions, required: true },
    { key: "feeId", label: "Fee", type: "dropdown", options: feeOptions, required: true },
    { key: "month", label: "Month", type: "dropdown", options: MONTH_OPTIONS, required: true },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "method", label: "Payment method", type: "dropdown", options: PAYMENT_METHOD_OPTIONS, required: true },
    { key: "status", label: "Payment status", type: "dropdown", options: PAYMENT_STATUS_OPTIONS, required: true },
    { key: "collectedById", label: "Collected by", type: "dropdown", options: collectorOptions, required: true },
    { key: "referenceNo", label: "Reference no.", type: "text" },
  ];

  const fields = isPayer ? allFields.filter((field) => payerPaymentFieldKeys.has(field.key)) : allFields;

  const makeInitialPayment = (): Payment => ({
    id: "",
    payerId: isPayer ? currentUser.id : payerOptions[0]?.value ?? "",
    feeId: feeOptions[0]?.value ?? "",
    month: "April",
    amount: 0,
    method: "cash",
    status: "paid",
    collectedById: collectorOptions[0]?.value ?? currentUser.id,
    referenceNo: "",
  });

  const createPaymentRecord = (payment: Payment) => {
    createPayment({
      ...payment,
      payerId: isPayer ? currentUser.id : payment.payerId,
      status: isPayer ? "paid" : payment.status,
      collectedById: isPayer ? collectorOptions[0]?.value ?? currentUser.id : payment.collectedById,
    });
  };

  return (
    <ScreenShell title="Payments" subtitle="Cash and e-wallet payment records" currentRole={currentUser.role}>
      <CrudScreen
        addLabel={isPayer ? "Pay fee" : "Add payment"}
        emptyText="No payment records yet."
        readOnlyText="This role can only review assigned payment records."
        fields={fields}
        records={records}
        makeInitial={makeInitialPayment}
        onCreate={createPaymentRecord}
        onUpdate={updatePayment}
        onDelete={deletePayment}
        canCreate={canCreatePayment}
        canUpdate={canManagePayments}
        canDelete={canManagePayments}
        renderTitle={(payment) => getLabel(payerOptions, payment.payerId)}
        renderSubtitle={(payment) => `${getLabel(feeOptions, payment.feeId)} • ${payment.month}`}
        renderMeta={(payment) =>
          `${formatCurrency(payment.amount)} • ${getLabel(PAYMENT_METHOD_OPTIONS, payment.method)} • ${getLabel(
            PAYMENT_STATUS_OPTIONS,
            payment.status,
          )}`
        }
      />
    </ScreenShell>
  );
}
