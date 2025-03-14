
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
  onConfirmSingle: () => void;
  currentIndex: number;
  totalItems: number;
  className?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const DialogActions = ({
  onCancel,
  onSave,
  onConfirmSingle,
  currentIndex,
  totalItems,
  className,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel"
}: DialogActionsProps) => {
  return (
    <div className={cn("flex justify-between gap-3 border-t pt-4", className)}>
      <Button
        variant="secondary"
        onClick={onCancel}
        className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground rounded-full h-11 font-medium"
      >
        <X className="mr-1 h-4 w-4" />
        {cancelLabel}
      </Button>
      
      {totalItems > 1 ? (
        <>
          <Button
            onClick={onConfirmSingle}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full h-11 font-medium"
          >
            <Check className="mr-1 h-4 w-4" />
            {confirmLabel}
          </Button>
          
          <Button
            onClick={onSave}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-full h-11 font-medium"
          >
            <Save className="mr-1 h-4 w-4" />
            {confirmLabel} tutti
          </Button>
        </>
      ) : (
        <Button
          onClick={onConfirmSingle}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full h-11 font-medium"
        >
          <Check className="mr-1 h-4 w-4" />
          {confirmLabel}
        </Button>
      )}
    </div>
  );
};

export default DialogActions;
