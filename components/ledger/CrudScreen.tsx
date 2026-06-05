import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { DropdownField, SelectOption } from "@/components/ledger/DropdownField";
import { colors, radius, spacing } from "@/constants/theme";
import { createId } from "@/utils/ledger";

export type FieldConfig<T> = {
  key: keyof T;
  label: string;
  type: "text" | "number" | "dropdown";
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
};

type CrudScreenProps<T extends { id: string }> = {
  addLabel: string;
  emptyText: string;
  readOnlyText?: string;
  records: T[];
  fields: FieldConfig<T>[];
  makeInitial: () => T;
  onCreate: (record: T) => void;
  onUpdate: (record: T) => void;
  onDelete: (id: string) => void;
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  renderTitle: (record: T) => string;
  renderSubtitle: (record: T) => string;
  renderMeta: (record: T) => string;
};

export function CrudScreen<T extends { id: string }>({
  addLabel,
  emptyText,
  readOnlyText,
  records,
  fields,
  makeInitial,
  onCreate,
  onUpdate,
  onDelete,
  canCreate = true,
  canUpdate = true,
  canDelete = true,
  renderTitle,
  renderSubtitle,
  renderMeta,
}: CrudScreenProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const title = editingRecord ? "Edit record" : addLabel;
  const showActions = canUpdate || canDelete;

  const requiredMissing = useMemo(() => {
    return fields.some((field) => field.required && !String(form[String(field.key)] ?? "").trim());
  }, [fields, form]);

  const openCreate = () => {
    if (!canCreate) {
      return;
    }

    const initial = makeInitial();
    setEditingRecord(null);
    setForm(toForm(initial, fields));
    setError("");
    setModalVisible(true);
  };

  const openEdit = (record: T) => {
    if (!canUpdate) {
      return;
    }

    setEditingRecord(record);
    setForm(toForm(record, fields));
    setError("");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingRecord(null);
    setError("");
  };

  const updateValue = (field: FieldConfig<T>, value: string) => {
    setForm((current) => ({ ...current, [String(field.key)]: value }));
  };

  const saveRecord = () => {
    if (requiredMissing) {
      setError("Complete all required selections.");
      return;
    }

    const base = editingRecord ?? { ...makeInitial(), id: createId() };
    const next = { ...base } as Record<string, unknown>;

    fields.forEach((field) => {
      const key = String(field.key);
      const value = form[key] ?? "";
      next[key] = field.type === "number" ? Number(value || 0) : value;
    });

    if (editingRecord) {
      onUpdate(next as T);
    } else {
      onCreate(next as T);
    }

    closeModal();
  };

  return (
    <View style={styles.container}>
      {canCreate ? (
        <Pressable style={styles.addButton} onPress={openCreate}>
          <Ionicons name="add" size={20} color={colors.white} />
          <Text style={styles.addButtonText}>{addLabel}</Text>
        </Pressable>
      ) : readOnlyText ? (
        <View style={styles.readOnlyCard}>
          <Ionicons name="eye-outline" size={20} color={colors.primary} />
          <Text style={styles.readOnlyText}>{readOnlyText}</Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {records.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="file-tray-outline" size={28} color={colors.muted} />
            <Text style={styles.emptyText}>{emptyText}</Text>
          </View>
        ) : (
          records.map((record) => (
            <View key={record.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleWrap}>
                  <Text style={styles.cardTitle}>{renderTitle(record)}</Text>
                  <Text style={styles.cardSubtitle}>{renderSubtitle(record)}</Text>
                </View>
                {showActions ? (
                  <View style={styles.actions}>
                    {canUpdate ? (
                      <Pressable style={styles.iconButton} onPress={() => openEdit(record)}>
                        <Ionicons name="create-outline" size={18} color={colors.primary} />
                      </Pressable>
                    ) : null}
                    {canDelete ? (
                      <Pressable style={styles.iconButton} onPress={() => onDelete(record.id)}>
                        <Ionicons name="trash-outline" size={18} color={colors.danger} />
                      </Pressable>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <Text style={styles.cardMeta}>{renderMeta(record)}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={closeModal}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalWrap}>
          <Pressable style={styles.backdrop} onPress={closeModal} />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={20} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
              {fields.map((field) => {
                const key = String(field.key);
                const value = form[key] ?? "";

                if (field.type === "dropdown") {
                  return (
                    <View key={key} style={styles.formField}>
                      <DropdownField
                        label={field.label}
                        value={value}
                        options={field.options ?? []}
                        onChange={(nextValue) => updateValue(field, nextValue)}
                      />
                    </View>
                  );
                }

                return (
                  <View key={key} style={[styles.fieldWrap, styles.formField]}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <TextInput
                      style={styles.input}
                      value={value}
                      onChangeText={(nextValue) => updateValue(field, nextValue)}
                      placeholder={field.placeholder ?? field.label}
                      placeholderTextColor={colors.muted}
                      keyboardType={field.type === "number" ? "numeric" : "default"}
                    />
                  </View>
                );
              })}

              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </ScrollView>

            <Pressable style={[styles.saveButton, requiredMissing && styles.disabledButton]} onPress={saveRecord}>
              <Text style={styles.saveButtonText}>{editingRecord ? "Save changes" : "Create record"}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function toForm<T extends { id: string }>(record: T, fields: FieldConfig<T>[]) {
  return fields.reduce<Record<string, string>>((current, field) => {
    const key = String(field.key);
    const value = record[field.key];
    current[key] = value === undefined || value === null ? "" : String(value);
    return current;
  }, {});
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  readOnlyCard: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primarySoft,
  },
  readOnlyText: {
    flex: 1,
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  list: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 112,
  },
  card: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 310,
    minWidth: 240,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  cardHeader: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  cardSubtitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  cardMeta: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  actions: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  emptyCard: {
    width: "100%",
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  modalWrap: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  modalCard: {
    width: "100%",
    maxWidth: 720,
    maxHeight: "88%",
    alignSelf: "center",
    padding: spacing.lg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.card,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  formField: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 280,
    minWidth: 240,
  },
  fieldWrap: {
    gap: 8,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  input: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: colors.background,
  },
  errorText: {
    width: "100%",
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.65,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
});
