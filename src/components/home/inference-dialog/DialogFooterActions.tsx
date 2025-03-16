
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ItemInference } from "../types";

interface DialogFooterActionsProps {
  onCancel: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
}

const DialogFooterActions = ({
  onCancel,
  onConfirm
}: DialogFooterActionsProps) => {
  return (
    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-3 pt-4 border-t">
      <Button 
        variant="outline" 
        onClick={onCancel} 
        type="button"
        className="flex-1 text-gray-500 border-gray-300 h-11 touch-manipulation"
      >
        <X className="h-4 w-4 mr-1" /> Annulla
      </Button>
      <Button 
        onClick={onConfirm} 
        className="flex-1 bg-blue-500 hover:bg-blue-600 h-11 touch-manipulation"
      >
        <Check className="h-4 w-4 mr-1" /> Conferma
      </Button>
    </DialogFooter>
  );
};

export default DialogFooterActions;
