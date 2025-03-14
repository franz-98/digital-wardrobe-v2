
import React from "react";
import { Check, X } from "lucide-react";
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

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  const handleConfirmSingle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onConfirmSingle) onConfirmSingle();
  };

  return (
    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-3 pt-4 border-t sticky bottom-0 bg-background pb-2 z-10">
      <Button 
        variant="outline" 
        onClick={handleCancel} 
        type="button" 
        className="flex-1 h-10 text-gray-500 border-gray-300"
        size="sm"
      >
        <X className="h-4 w-4 mr-1" /> Annulla
      </Button>
      
      {isMultipleItems ? (
        <>
          {!isLastItem ? (
            <Button 
              onClick={handleConfirmSingle} 
              className="flex-1 min-h-[40px] sm:min-h-[36px] bg-blue-500 hover:bg-blue-600"
              type="button"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1" /> Conferma
            </Button>
          ) : (
            <Button 
              onClick={handleSave} 
              className="flex-1 min-h-[40px] sm:min-h-[36px] bg-blue-500 hover:bg-blue-600"
              type="button"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1" /> Conferma Tutti
            </Button>
          )}
        </>
      ) : (
        <Button 
          onClick={handleSave} 
          className="flex-1 min-h-[40px] sm:min-h-[36px] bg-blue-500 hover:bg-blue-600"
          type="button"
          size="sm"
        >
          <Check className="h-4 w-4 mr-1" /> Conferma
        </Button>
      )}
    </DialogFooter>
  );
};

export default DialogActions;
