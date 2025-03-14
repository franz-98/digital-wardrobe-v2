
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
import { useMultipleInferenceDialog } from "@/hooks/useMultipleInferenceDialog";

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

  // Function to handle field changes and propagate to parent
  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    handleFieldChange(field, value);
  };

  // Check if current item is confirmed
  const isCurrentItemConfirmed = confirmedItems.has(currentIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-sm md:max-w-md max-h-[90vh] overflow-hidden flex flex-col"
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
