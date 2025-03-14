
import React from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
  // Add navigation props
  currentIndex?: number;
  totalItems?: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
  // Add confirm single item prop
  onConfirmSingle?: () => void;
}

const DialogActions = ({ 
  onCancel, 
  onSave, 
  currentIndex, 
  totalItems,
  onNavigate,
  onConfirmSingle
}: DialogActionsProps) => {
  const isMultipleItems = totalItems && totalItems > 1;
  
  // If we have multiple items and are not on the last one,
  // show "Conferma e Prossimo" button
  const handleConfirmAndNext = () => {
    if (onConfirmSingle) {
      onConfirmSingle();
    }
    
    if (onNavigate && currentIndex !== undefined && totalItems && currentIndex < totalItems - 1) {
      onNavigate('next');
    }
  };

  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel} type="button">
        Annulla
      </Button>
      
      {isMultipleItems ? (
        <>
          {/* For multiple items, individual confirmation button */}
          {currentIndex !== undefined && totalItems && currentIndex < totalItems - 1 ? (
            <Button onClick={handleConfirmAndNext} className="gap-1">
              <Check className="h-4 w-4" /> Conferma e Prossimo
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            /* On last item, show final save button */
            <Button onClick={onSave} className="gap-1">
              <Check className="h-4 w-4" /> Conferma Tutti
            </Button>
          )}
        </>
      ) : (
        /* For single item, just show confirm button */
        <Button onClick={onSave} className="gap-1">
          <Check className="h-4 w-4" /> Conferma
        </Button>
      )}
    </DialogFooter>
  );
};

export default DialogActions;
