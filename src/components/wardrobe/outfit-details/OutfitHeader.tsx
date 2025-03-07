
import React from 'react';
import { X } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OutfitHeaderProps {
  outfitName: string;
  itemCount: number;
  dismissProgress?: number;
}

const OutfitHeader = ({ outfitName, itemCount, dismissProgress = 0 }: OutfitHeaderProps) => {
  return (
    <DialogHeader className="px-6 pt-6 pb-0">
      <div className="flex items-center justify-between mb-2">
        <DialogTitle className="text-lg font-semibold">{outfitName}</DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>
      <DialogDescription>
        {itemCount} items in this outfit
        {dismissProgress > 0 && dismissProgress < 60 && (
          <span className="ml-2 text-xs opacity-60">
            Pull down to close ({Math.round(dismissProgress)}%)
          </span>
        )}
      </DialogDescription>
    </DialogHeader>
  );
};

export default OutfitHeader;
