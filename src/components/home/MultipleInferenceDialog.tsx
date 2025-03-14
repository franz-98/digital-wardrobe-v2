
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
  ItemDisplaySection,
  PaginationControls
} from "./inference-dialog";
import { useMultipleInferenceDialog } from "@/hooks/multiple-inference-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  onFieldChange,
  clothingCategories,
  onConfirm
}: MultipleInferenceDialogProps) => {
  const isMobile = useIsMobile();
  
  // Wrap all this in a conditional to prevent hook inconsistency during renders
  // Only render the content if the dialog is open and there are items
  if (!open || !inferredItems.length) return null;
  
  const {
    currentIndex,
    currentItem,
    totalItems,
    confirmedItems,
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

  const isCurrentItemConfirmed = confirmedItems.has(currentIndex);

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
        <DialogHeaderSection 
          totalItems={totalItems} 
          className="px-4 pt-4 sm:px-6 sm:pt-6"
        />

        <NavigationControls 
          currentIndex={currentIndex}
          totalItems={totalItems}
          onNavigate={handleNavigate}
          className="px-4 sm:px-6"
        />

        <ScrollArea className="flex-1 p-0 overflow-auto">
          <div className="px-4 py-2 sm:px-6">
            <ItemDisplaySection 
              currentItem={currentItem}
              onFieldChange={handleCurrentItemChange}
              clothingCategories={clothingCategories}
              isConfirmed={isCurrentItemConfirmed}
            />
          </div>
        </ScrollArea>

        <PaginationControls
          currentIndex={currentIndex}
          totalItems={totalItems}
          onPageChange={handleNavigate}
          confirmedItems={confirmedItems}
          className="px-4 sm:px-6"
        />

        <DialogActions 
          onCancel={handleCancel} 
          onSave={handleSave}
          currentIndex={currentIndex}
          totalItems={totalItems}
          onConfirmSingle={handleConfirmSingleItem}
          className="p-4 sm:p-6"
          confirmLabel="Conferma"
          cancelLabel="Annulla"
        />
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
