
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMultipleInferenceDialog } from "@/hooks/multiple-inference-dialog";
import { ItemInference } from "../types";
import MultipleInferenceDialogContent from "./MultipleInferenceDialogContent";

interface MultipleInferenceDialogContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  onFieldChange: (itemIndex: number, field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialogContainer = ({
  open,
  onOpenChange,
  inferredItems,
  onFieldChange,
  clothingCategories,
  onConfirm
}: MultipleInferenceDialogContainerProps) => {
  const isMobile = useIsMobile();
  
  // Use the custom hook to manage dialog state
  const {
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
  } = useMultipleInferenceDialog({
    open,
    onOpenChange,
    inferredItems,
    onConfirm
  });

  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    handleFieldChange(field, value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "max-w-md sm:max-w-lg md:max-w-xl flex flex-col p-0 max-h-[90vh] overflow-hidden",
          "bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800",
          isMobile ? "rounded-t-xl rounded-b-none m-0 w-full" : "rounded-xl"
        )}
        dismissThreshold={99999}
        enableDismissOnScroll={false}
        showDismissIndicator={false}
      >
        {currentItem && (
          <MultipleInferenceDialogContent
            currentIndex={currentIndex}
            currentItem={currentItem}
            totalItems={totalItems}
            confirmedItems={confirmedItems}
            onNavigate={handleNavigate}
            onCancel={handleCancel}
            onSave={handleSave}
            onConfirmSingle={handleConfirmSingleItem}
            onFieldChange={handleCurrentItemChange}
            clothingCategories={clothingCategories}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialogContainer;
