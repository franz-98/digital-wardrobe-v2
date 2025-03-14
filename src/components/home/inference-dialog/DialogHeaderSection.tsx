
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DialogHeaderSectionProps {
  totalItems: number;
  className?: string;
}

const DialogHeaderSection = ({ totalItems, className }: DialogHeaderSectionProps) => {
  return (
    <DialogHeader className={cn("", className)}>
      <DialogTitle>Conferma Riconoscimento</DialogTitle>
      <DialogDescription>
        {totalItems > 1 
          ? `Sono stati riconosciuti ${totalItems} articoli. Quelli con confidenza >75% saranno aggiunti automaticamente.` 
          : 'Conferma o modifica le informazioni per questo indumento.'}
      </DialogDescription>
    </DialogHeader>
  );
};

export default DialogHeaderSection;
