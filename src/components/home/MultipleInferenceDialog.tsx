import React from "react";
import { ItemInference } from "./types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeaderSection } from "./inference-dialog/index";

interface MultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialog = ({ 
  open, 
  onOpenChange,
  inferredItems,
  onConfirm,
  clothingCategories 
}: MultipleInferenceDialogProps) => {
  
  // Handle auto-processing when dialog opens
  React.useEffect(() => {
    if (open && inferredItems.length > 0) {
      // Automatically process items based on confidence threshold
      onConfirm(inferredItems);
      
      // Close the dialog immediately as we don't need user interaction
      onOpenChange(false);
    }
  }, [open, inferredItems, onConfirm, onOpenChange]);

  // Dialog is still defined but won't actually be shown to users
  // We keep this structure to maintain compatibility with existing code
  return (
    <Dialog open={false} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeaderSection 
          totalItems={inferredItems.length} 
          className="px-4 pt-4 sm:px-6 sm:pt-6"
        />
        <div className="p-4">
          <p>Processing items automatically...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
