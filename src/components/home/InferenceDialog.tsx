
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { ItemInference } from "./types";
import SingleInferenceDialogContent from "./inference-dialog/SingleInferenceDialogContent";

interface InferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: ItemInference | null;
  onConfirm: () => void;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const InferenceDialog = ({
  open,
  onOpenChange,
  selectedItem,
  onConfirm,
  onFieldChange,
  clothingCategories
}: InferenceDialogProps) => {
  if (!selectedItem) return null;

  // Enhanced cancel handler to properly close the dialog
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  };

  // Enhanced confirm handler
  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SingleInferenceDialogContent 
        selectedItem={selectedItem}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onFieldChange={onFieldChange}
        clothingCategories={clothingCategories}
        onOpenChange={onOpenChange}
      />
    </Dialog>
  );
};

export default InferenceDialog;
