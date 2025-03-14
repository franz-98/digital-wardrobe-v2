
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
  currentIndex?: number;
  totalItems?: number;
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
  
  const isLastItem = currentIndex !== undefined && totalItems 
    ? currentIndex >= totalItems - 1 
    : false;

  return (
    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-3 pt-4 border-t sticky bottom-0 bg-background pb-2 z-10">
      <Button 
        variant="outline" 
        onClick={onCancel} 
        type="button" 
        className="flex-1 h-10 sm:h-9"
        size="sm"
      >
        Annulla
      </Button>
      
      {isMultipleItems ? (
        <>
          {!isLastItem ? (
            <Button 
              onClick={onConfirmSingle} 
              className="gap-1 flex-1 min-h-[40px] sm:min-h-[36px] bg-green-600 hover:bg-green-700"
              type="button"
              size="sm"
            >
              <Check className="h-3 w-3" /> Conferma e Prossimo
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={onSave} 
              className="gap-1 flex-1 min-h-[40px] sm:min-h-[36px]"
              type="button"
              size="sm"
            >
              <Check className="h-3 w-3" /> Conferma Tutti
            </Button>
          )}
        </>
      ) : (
        <Button 
          onClick={onSave} 
          className="gap-1 flex-1 min-h-[40px] sm:min-h-[36px]"
          type="button"
          size="sm"
        >
          <Check className="h-3 w-3" /> Conferma
        </Button>
      )}
    </DialogFooter>
  );
};

export default DialogActions;
