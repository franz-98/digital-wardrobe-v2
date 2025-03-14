
import { useDialogState } from "./useDialogState";
import { useNavigation } from "./useNavigation";
import { useItemActions } from "./useItemActions";
import { UseMultipleInferenceDialogProps, UseMultipleInferenceDialogReturn } from "./types";

export function useMultipleInferenceDialog(props: UseMultipleInferenceDialogProps): UseMultipleInferenceDialogReturn {
  const {
    currentIndex,
    setCurrentIndex,
    currentItem,
    totalItems,
    itemsToAdd,
    setItemsToAdd,
    confirmedItems,
    setConfirmedItems
  } = useDialogState({
    open: props.open,
    inferredItems: props.inferredItems
  });

  const { handleNavigate } = useNavigation(
    currentIndex,
    setCurrentIndex,
    totalItems
  );

  const {
    handleCancel,
    handleSave,
    handleConfirmSingleItem,
    handleFieldChange
  } = useItemActions(
    currentIndex,
    totalItems,
    confirmedItems,
    setConfirmedItems,
    setCurrentIndex,
    itemsToAdd,
    setItemsToAdd,
    props.onOpenChange,
    props.onConfirm
  );

  return {
    currentIndex,
    currentItem,
    totalItems,
    confirmedItems,
    itemsToAdd,
    handleNavigate,
    handleCancel,
    handleSave,
    handleConfirmSingleItem,
    handleFieldChange
  };
}

export * from "./types";
