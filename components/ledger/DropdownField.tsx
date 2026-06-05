import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

export type SelectOption = {
  label: string;
  value: string;
};

type DropdownFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export function DropdownField({ label, value, options, onChange }: DropdownFieldProps) {
  const [visible, setVisible] = useState(false);
  const selected = useMemo(() => options.find((option) => option.value === value), [options, value]);

  const choose = (nextValue: string) => {
    onChange(nextValue);
    setVisible(false);
  };

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={[styles.triggerText, !selected && styles.placeholder]} numberOfLines={1}>
          {selected?.label ?? "Select"}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.muted} />
      </Pressable>

      <Modal animationType="fade" transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalWrap}>
          <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || "Select option"}</Text>
              <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
                <Ionicons name="close" size={20} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.optionsWrap} showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    style={[styles.option, isSelected && styles.selectedOption]}
                    onPress={() => choose(option.value)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{option.label}</Text>
                    {isSelected ? <Ionicons name="checkmark-circle" size={20} color={colors.primary} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },
  trigger: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  triggerText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  placeholder: {
    color: colors.muted,
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
    maxHeight: "78%",
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
    fontSize: 18,
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
  optionsWrap: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  option: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  selectedOptionText: {
    color: colors.primary,
  },
});
