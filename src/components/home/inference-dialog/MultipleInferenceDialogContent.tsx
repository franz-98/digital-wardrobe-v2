
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ItemInference } from "../types";
import { 
  NavigationControls, 
  DialogActions,
  DialogHeaderSection,
  ItemDisplaySection,
  PaginationControls
} from "./index";

interface MultipleInferenceDialogContentProps {
  currentIndex: number;
  currentItem: ItemInference;
  totalItems: number;
  confirmedItems: Set<number>;
  onNavigate: (directionOrPage: 'prev' | 'next' | number) => void;
  onCancel: () => void;
  onSave: () => void;
  onConfirmSingle: () => void;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialogContent = ({
  currentIndex,
  currentItem,
  totalItems,
  confirmedItems,
  onNavigate,
  onCancel,
  onSave,
  onConfirmSingle,
  onFieldChange,
  clothingCategories
}: MultipleInferenceDialogContentProps) => {
  const isCurrentItemConfirmed = confirmedItems.has(currentIndex);

  return (
    <>
      <DialogHeaderSection 
        totalItems={totalItems} 
        className="px-4 pt-4 sm:px-6 sm:pt-6"
      />

      <NavigationControls 
        currentIndex={currentIndex}
        totalItems={totalItems}
        onNavigate={onNavigate}
        className="px-4 sm:px-6"
      />

      <ScrollArea className="flex-1 p-0 overflow-auto">
        <div className="px-4 py-2 sm:px-6">
          <ItemDisplaySection 
            currentItem={currentItem}
            onFieldChange={onFieldChange}
            clothingCategories={clothingCategories}
            isConfirmed={isCurrentItemConfirmed}
          />
        </div>
      </ScrollArea>

      <PaginationControls
        currentIndex={currentIndex}
        totalItems={totalItems}
        onPageChange={onNavigate}
        confirmedItems={confirmedItems}
        className="px-4 sm:px-6"
      />

      <DialogActions 
        onCancel={onCancel} 
        onSave={onSave}
        currentIndex={currentIndex}
        totalItems={totalItems}
        onConfirmSingle={onConfirmSingle}
        className="p-4 sm:p-6"
        confirmLabel="Conferma"
        cancelLabel="Annulla"
      />
    </>
  );
};

export default MultipleInferenceDialogContent;
