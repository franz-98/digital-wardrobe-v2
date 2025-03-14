
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
  // Add navigation props
  currentIndex?: number;
  totalItems?: number;
  // Add confirm single item prop
  onConfirmSingle?: () => void;
}

const DialogActions = ({ 
  onCancel, 
  onSave, 
  currentIndex, 
  totalItems,
  onConfirmSingle
}: DialogActionsProps) => {
  const isMultipleItems = totalItems && totalItems > 1;
  
  const handleConfirmAndNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Confirm and next clicked");
    if (onConfirmSingle) {
      onConfirmSingle();
    }
  };

  return (
    <DialogFooter className="gap-2 mt-4 pt-2 border-t">
      <Button 
        variant="outline" 
        onClick={onCancel} 
        type="button" 
        className="flex-1"
      >
        Annulla
      </Button>
      
      {isMultipleItems ? (
        <>
          {/* For multiple items, show appropriate button based on position */}
          {currentIndex !== undefined && totalItems && currentIndex < totalItems - 1 ? (
            <Button 
              onClick={handleConfirmAndNext} 
              className="gap-1 flex-1 min-h-[44px]"
              type="button"
            >
              <Check className="h-4 w-4" /> Conferma e Prossimo
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            /* On last item, show final save button */
            <Button 
              onClick={onSave} 
              className="gap-1 flex-1 min-h-[44px]"
              type="button"
            >
              <Check className="h-4 w-4" /> Conferma Tutti
            </Button>
          )}
        </>
      ) : (
        /* For single item, just show confirm button */
        <Button 
          onClick={onSave} 
          className="gap-1 flex-1 min-h-[44px]"
          type="button"
        >
          <Check className="h-4 w-4" /> Conferma
        </Button>
      )}
    </DialogFooter>
  );
};

export default DialogActions;
