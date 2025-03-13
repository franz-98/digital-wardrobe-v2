
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const DialogActions = ({ onCancel, onSave }: DialogActionsProps) => {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel} type="button">
        Annulla
      </Button>
      <Button onClick={onSave} className="gap-1">
        <Check className="h-4 w-4" /> Conferma
      </Button>
    </DialogFooter>
  );
};

export default DialogActions;
