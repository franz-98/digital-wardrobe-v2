
import React from "react";
import { 
  Dialog, 
  DialogContent,
} from "@/components/ui/dialog";
import { ItemInference } from "./types";
import { 
  NavigationControls, 
  DialogActions,
  DialogHeaderSection,
  ItemDisplaySection
} from "./inference-dialog";
import { useMultipleInferenceDialog } from "@/hooks/multiple-inference-dialog";

interface MultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  onFieldChange: (itemIndex: number, field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialog = ({
  open,
  onOpenChange,
  inferredItems,
  onConfirm,
  onFieldChange,
  clothingCategories
}: MultipleInferenceDialogProps) => {
  const {
    currentIndex,
    currentItem,
    totalItems,
    confirmedItems,
    scrollAreaRef,
    handleNavigate,
    handleCancel,
    handleSave,
    handleConfirmSingleItem,
    handleFieldChange
  } = useMultipleInferenceDialog({
    open,
    onOpenChange,
    inferredItems,
    onConfirm
  });

  if (!inferredItems.length) return null;

  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    handleFieldChange(field, value);
  };

  const isCurrentItemConfirmed = confirmedItems.has(currentIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md sm:max-w-lg md:max-w-xl overflow-visible flex flex-col p-4 sm:p-6"
      >
        <DialogHeaderSection totalItems={totalItems} />

        <NavigationControls 
          currentIndex={currentIndex}
          totalItems={totalItems}
          onNavigate={handleNavigate}
        />

        <ItemDisplaySection 
          currentItem={currentItem}
          onFieldChange={handleCurrentItemChange}
          clothingCategories={clothingCategories}
          scrollAreaRef={scrollAreaRef}
          isConfirmed={isCurrentItemConfirmed}
        />

        <DialogActions 
          onCancel={handleCancel} 
          onSave={handleSave}
          currentIndex={currentIndex}
          totalItems={totalItems}
          onConfirmSingle={handleConfirmSingleItem}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
