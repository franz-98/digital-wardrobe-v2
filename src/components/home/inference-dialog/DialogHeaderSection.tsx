
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogHeaderSectionProps {
  totalItems: number;
}

const DialogHeaderSection = ({ totalItems }: DialogHeaderSectionProps) => {
  return (
    <DialogHeader>
      <DialogTitle>Conferma Riconoscimento</DialogTitle>
      <DialogDescription>
        {totalItems > 1 
          ? `Sono stati riconosciuti ${totalItems} articoli. Conferma o modifica le informazioni per ciascuno.` 
          : 'Conferma o modifica le informazioni per questo indumento.'}
      </DialogDescription>
    </DialogHeader>
  );
};

export default DialogHeaderSection;
