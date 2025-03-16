
import React from "react";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ItemInference } from "../types";
import { InferredItemDisplay } from "./index";
import DialogFooterActions from "./DialogFooterActions";

interface SingleInferenceDialogContentProps {
  selectedItem: ItemInference;
  onConfirm: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
  onOpenChange: (open: boolean) => void;
}

const SingleInferenceDialogContent = ({
  selectedItem,
  onConfirm,
  onCancel,
  onFieldChange,
  clothingCategories,
  onOpenChange
}: SingleInferenceDialogContentProps) => {
  return (
    <DialogContent 
      className="max-w-md max-h-[90vh] overflow-y-auto"
      enableDismissOnScroll={false}
      dismissThreshold={999999}
      showDismissIndicator={false}
    >
      <DialogHeader className="pb-2">
        <DialogTitle className="text-lg font-medium">Conferma Riconoscimento</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Conferma o modifica le informazioni per questo indumento.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          <InferredItemDisplay 
            item={selectedItem}
            onFieldChange={onFieldChange}
            clothingCategories={clothingCategories}
          />
        </div>
      </div>

      <DialogFooterActions 
        onCancel={onCancel} 
        onConfirm={onConfirm} 
      />
    </DialogContent>
  );
};

export default SingleInferenceDialogContent;
